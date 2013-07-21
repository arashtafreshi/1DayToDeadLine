
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import net.tinyos.message.*;
import net.tinyos.packet.*;
import net.tinyos.util.*;

public class Temperature implements MessageListener {

  private MoteIF moteIF;
  
  public Temperature(MoteIF moteIF) {
    this.moteIF = moteIF;
    this.moteIF.registerListener(new TemperatureMsg(), this);
  }

  public void sendPackets() {
    
  }

  @Override
  public void messageReceived(int to, Message message) {
    TemperatureMsg msg = (TemperatureMsg)message;
    
    TemperatureMsg tempmsg = (TemperatureMsg)message;
    int neighbors;
    int MoteID = tempmsg.get_SourceID();
    int Temp = tempmsg.get_Temperature();
    try {
        Connection con;
        PreparedStatement pst;

        String url = "jdbc:mysql://localhost/wsn_lab";
        String user = "root";
        String password = "";
        con = (Connection) DriverManager.getConnection(url, user, password);
        pst = (PreparedStatement) con.prepareStatement("INSERT INTO temperature(MoteID,Temp) VALUES("+MoteID+","+Temp+")");
        pst.executeUpdate();
        con.close();
} 
catch (SQLException ex) {
    //Logger.getLogger(NewJFrame.class.getName()).log(Level.SEVERE, null, ex);
}
    
    
    
  }
  
  private static void usage() {
    System.err.println("usage: Temperature [-comm <source>]");
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
    Temperature serial = new Temperature(mif);
    serial.sendPackets();
  }


}
