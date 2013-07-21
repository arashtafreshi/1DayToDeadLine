import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import net.tinyos.message.*;
import net.tinyos.packet.*;
import net.tinyos.util.*;

public class NeighborsTable implements MessageListener {

  private MoteIF moteIF;
  
  public NeighborsTable(MoteIF moteIF) {
    this.moteIF = moteIF;
    this.moteIF.registerListener(new NeighborsTableMsg(), this);
  }

  public void sendPackets() {
    
  }

  @Override
  public void messageReceived(int to, Message message) {
    NeighborsTableMsg msg = (NeighborsTableMsg)message;
    
    NeighborsTableMsg tempmsg = (NeighborsTableMsg)message;
    int neighbors;
    neighbors = tempmsg.get_Neighbors();
    try {
        Connection con;
        PreparedStatement pst;

        String url = "jdbc:mysql://localhost/wsn_lab";
        String user = "root";
        String password = "";
        con = (Connection) DriverManager.getConnection(url, user, password);
        String n = Integer.toString(tempmsg.get_Neighbors());
        for (int i=0 ; i<n.length() ; i++){
                char destChar = n.charAt(i);
                int destInt = Character.getNumericValue(destChar);
                pst = (PreparedStatement) con.prepareStatement("INSERT INTO neighbor(GroupID,SourceID,DestID) VALUES(1,2,"+destInt+")");
                pst.executeUpdate();
        }

} 
catch (SQLException ex) {
    //Logger.getLogger(NewJFrame.class.getName()).log(Level.SEVERE, null, ex);
}
    
    
    
  }
  
  private static void usage() {
    System.err.println("usage: NeighborsTable [-comm <source>]");
  }
  
  public static void main(String[] args) throws Exception {
    String source = null;
    if (args.length == 2) {
      if (!args[0].equals("-comm")) {
	usage();
	System.exit(1);
      }
      source = args[1];
    }
    else if (args.length != 0) {
      usage();
      System.exit(1);
    }
    
    PhoenixSource phoenix;
    
    if (source == null) {
      phoenix = BuildSource.makePhoenix(PrintStreamMessenger.err);
    }
    else {
      phoenix = BuildSource.makePhoenix(source, PrintStreamMessenger.err);
    }

    MoteIF mif = new MoteIF(phoenix);
    NeighborsTable serial = new NeighborsTable(mif);
    serial.sendPackets();
  }


}
