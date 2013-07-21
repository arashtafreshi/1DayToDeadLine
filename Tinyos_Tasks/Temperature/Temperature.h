#ifndef Temperature_H
#define Temperature_H

typedef nx_struct NodeToNodeMsg {
	nx_uint16_t Counter;
	nx_uint16_t DestID;
	nx_uint16_t Temperature;
	nx_uint16_t SourceID;	
}NodeToNodeMsg_t;



//typedef nx_struct AckMsg {
	//nx_uint16_t AckSenderID;
//}AckMsg_t;

enum {
	AM_NODETONODEMSG = 0x89, 


	RSSI_THRESHOLD = 10,
};
#endif /* Temperature_H */
