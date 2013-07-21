/**
 * This class is automatically generated by mig. DO NOT EDIT THIS FILE.
 * This class implements a Java interface to the 'NeighborsTableMsg'
 * message type.
 */

public class NeighborsTableMsg extends net.tinyos.message.Message {

    /** The default size of this message type in bytes. */
    public static final int DEFAULT_MESSAGE_SIZE = 8;

    /** The Active Message type associated with this message. */
    public static final int AM_TYPE = 137;

    /** Create a new NeighborsTableMsg of size 8. */
    public NeighborsTableMsg() {
        super(DEFAULT_MESSAGE_SIZE);
        amTypeSet(AM_TYPE);
    }

    /** Create a new NeighborsTableMsg of the given data_length. */
    public NeighborsTableMsg(int data_length) {
        super(data_length);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg with the given data_length
     * and base offset.
     */
    public NeighborsTableMsg(int data_length, int base_offset) {
        super(data_length, base_offset);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg using the given byte array
     * as backing store.
     */
    public NeighborsTableMsg(byte[] data) {
        super(data);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg using the given byte array
     * as backing store, with the given base offset.
     */
    public NeighborsTableMsg(byte[] data, int base_offset) {
        super(data, base_offset);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg using the given byte array
     * as backing store, with the given base offset and data length.
     */
    public NeighborsTableMsg(byte[] data, int base_offset, int data_length) {
        super(data, base_offset, data_length);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg embedded in the given message
     * at the given base offset.
     */
    public NeighborsTableMsg(net.tinyos.message.Message msg, int base_offset) {
        super(msg, base_offset, DEFAULT_MESSAGE_SIZE);
        amTypeSet(AM_TYPE);
    }

    /**
     * Create a new NeighborsTableMsg embedded in the given message
     * at the given base offset and length.
     */
    public NeighborsTableMsg(net.tinyos.message.Message msg, int base_offset, int data_length) {
        super(msg, base_offset, data_length);
        amTypeSet(AM_TYPE);
    }

    /**
    /* Return a String representation of this message. Includes the
     * message type name and the non-indexed field values.
     */
    public String toString() {
      String s = "Message <NeighborsTableMsg> \n";
      try {
        s += "  [Counter=0x"+Long.toHexString(get_Counter())+"]\n";
      } catch (ArrayIndexOutOfBoundsException aioobe) { /* Skip field */ }
      try {
        s += "  [DestID=0x"+Long.toHexString(get_DestID())+"]\n";
      } catch (ArrayIndexOutOfBoundsException aioobe) { /* Skip field */ }
      try {
        s += "  [Neighbors=0x"+Long.toHexString(get_Neighbors())+"]\n";
      } catch (ArrayIndexOutOfBoundsException aioobe) { /* Skip field */ }
      try {
        s += "  [SourceID=0x"+Long.toHexString(get_SourceID())+"]\n";
      } catch (ArrayIndexOutOfBoundsException aioobe) { /* Skip field */ }
      return s;
    }

    // Message-type-specific access methods appear below.

    /////////////////////////////////////////////////////////
    // Accessor methods for field: Counter
    //   Field type: int, unsigned
    //   Offset (bits): 0
    //   Size (bits): 16
    /////////////////////////////////////////////////////////

    /**
     * Return whether the field 'Counter' is signed (false).
     */
    public static boolean isSigned_Counter() {
        return false;
    }

    /**
     * Return whether the field 'Counter' is an array (false).
     */
    public static boolean isArray_Counter() {
        return false;
    }

    /**
     * Return the offset (in bytes) of the field 'Counter'
     */
    public static int offset_Counter() {
        return (0 / 8);
    }

    /**
     * Return the offset (in bits) of the field 'Counter'
     */
    public static int offsetBits_Counter() {
        return 0;
    }

    /**
     * Return the value (as a int) of the field 'Counter'
     */
    public int get_Counter() {
        return (int)getUIntBEElement(offsetBits_Counter(), 16);
    }

    /**
     * Set the value of the field 'Counter'
     */
    public void set_Counter(int value) {
        setUIntBEElement(offsetBits_Counter(), 16, value);
    }

    /**
     * Return the size, in bytes, of the field 'Counter'
     */
    public static int size_Counter() {
        return (16 / 8);
    }

    /**
     * Return the size, in bits, of the field 'Counter'
     */
    public static int sizeBits_Counter() {
        return 16;
    }

    /////////////////////////////////////////////////////////
    // Accessor methods for field: DestID
    //   Field type: int, unsigned
    //   Offset (bits): 16
    //   Size (bits): 16
    /////////////////////////////////////////////////////////

    /**
     * Return whether the field 'DestID' is signed (false).
     */
    public static boolean isSigned_DestID() {
        return false;
    }

    /**
     * Return whether the field 'DestID' is an array (false).
     */
    public static boolean isArray_DestID() {
        return false;
    }

    /**
     * Return the offset (in bytes) of the field 'DestID'
     */
    public static int offset_DestID() {
        return (16 / 8);
    }

    /**
     * Return the offset (in bits) of the field 'DestID'
     */
    public static int offsetBits_DestID() {
        return 16;
    }

    /**
     * Return the value (as a int) of the field 'DestID'
     */
    public int get_DestID() {
        return (int)getUIntBEElement(offsetBits_DestID(), 16);
    }

    /**
     * Set the value of the field 'DestID'
     */
    public void set_DestID(int value) {
        setUIntBEElement(offsetBits_DestID(), 16, value);
    }

    /**
     * Return the size, in bytes, of the field 'DestID'
     */
    public static int size_DestID() {
        return (16 / 8);
    }

    /**
     * Return the size, in bits, of the field 'DestID'
     */
    public static int sizeBits_DestID() {
        return 16;
    }

    /////////////////////////////////////////////////////////
    // Accessor methods for field: Neighbors
    //   Field type: int, unsigned
    //   Offset (bits): 32
    //   Size (bits): 16
    /////////////////////////////////////////////////////////

    /**
     * Return whether the field 'Neighbors' is signed (false).
     */
    public static boolean isSigned_Neighbors() {
        return false;
    }

    /**
     * Return whether the field 'Neighbors' is an array (false).
     */
    public static boolean isArray_Neighbors() {
        return false;
    }

    /**
     * Return the offset (in bytes) of the field 'Neighbors'
     */
    public static int offset_Neighbors() {
        return (32 / 8);
    }

    /**
     * Return the offset (in bits) of the field 'Neighbors'
     */
    public static int offsetBits_Neighbors() {
        return 32;
    }

    /**
     * Return the value (as a int) of the field 'Neighbors'
     */
    public int get_Neighbors() {
        return (int)getUIntBEElement(offsetBits_Neighbors(), 16);
    }

    /**
     * Set the value of the field 'Neighbors'
     */
    public void set_Neighbors(int value) {
        setUIntBEElement(offsetBits_Neighbors(), 16, value);
    }

    /**
     * Return the size, in bytes, of the field 'Neighbors'
     */
    public static int size_Neighbors() {
        return (16 / 8);
    }

    /**
     * Return the size, in bits, of the field 'Neighbors'
     */
    public static int sizeBits_Neighbors() {
        return 16;
    }

    /////////////////////////////////////////////////////////
    // Accessor methods for field: SourceID
    //   Field type: int, unsigned
    //   Offset (bits): 48
    //   Size (bits): 16
    /////////////////////////////////////////////////////////

    /**
     * Return whether the field 'SourceID' is signed (false).
     */
    public static boolean isSigned_SourceID() {
        return false;
    }

    /**
     * Return whether the field 'SourceID' is an array (false).
     */
    public static boolean isArray_SourceID() {
        return false;
    }

    /**
     * Return the offset (in bytes) of the field 'SourceID'
     */
    public static int offset_SourceID() {
        return (48 / 8);
    }

    /**
     * Return the offset (in bits) of the field 'SourceID'
     */
    public static int offsetBits_SourceID() {
        return 48;
    }

    /**
     * Return the value (as a int) of the field 'SourceID'
     */
    public int get_SourceID() {
        return (int)getUIntBEElement(offsetBits_SourceID(), 16);
    }

    /**
     * Set the value of the field 'SourceID'
     */
    public void set_SourceID(int value) {
        setUIntBEElement(offsetBits_SourceID(), 16, value);
    }

    /**
     * Return the size, in bytes, of the field 'SourceID'
     */
    public static int size_SourceID() {
        return (16 / 8);
    }

    /**
     * Return the size, in bits, of the field 'SourceID'
     */
    public static int sizeBits_SourceID() {
        return 16;
    }

}
