#include "Temperature.h"
#include <stdlib.h>
module TemperatureC {
	uses {
		interface Boot;
		interface Leds;
	}
	uses {
		interface AMSend as RadioSend;
		interface AMSend as SerialSend;
		
		interface Receive as RadioReceive;
		interface Receive as SerialReceive;
		
		interface SplitControl as RadioControl; 
		interface SplitControl as SerialControl;
		
		interface CC2420Packet;
		interface Read<uint16_t>;
		
		interface Timer<TMilli> as RunningTimer;

		
	}
}

implementation {
	
	bool _radioBusy=FALSE; 
	message_t _RadioSendPacket;
	message_t _SerialSendPacket;
	
	NodeToNodeMsg_t buffer;
	NodeToNodeMsg_t* TempPacket;
	NodeToNodeMsg_t* incomingPacket;
	
	uint16_t _tableCounter=0;
	uint16_t _SourceID;
	uint16_t Power=20;
	uint16_t _Temperature;
	int i=0;
	uint16_t _LedNumber;
	uint16_t _Counter=0;
	uint16_t _Seq=0;
	
	uint16_t _Rssi;
	
	task void Serialmsgsend();
	task void Radiomsgsend();
	
 	bool receivedBefore[5];


	void setItReceived(int16_t id){
		receivedBefore[id] = TRUE;
	}

	bool checkIfReceived(int16_t id){
		
		if(receivedBefore[id]){
			return TRUE;
		}
		
		return FALSE;
	}


	task void Radiomsgsend(){
		if (_radioBusy==FALSE) {
			TempPacket=(NodeToNodeMsg_t *)( call RadioSend.getPayload(&_RadioSendPacket,sizeof(NodeToNodeMsg_t)));
			TempPacket->Counter=buffer.Counter;
			TempPacket->SourceID=buffer.SourceID;
			TempPacket->DestID=buffer.DestID;
			TempPacket->Temperature=buffer.Temperature;
			call CC2420Packet.setPower( &_RadioSendPacket, Power);
			if (call RadioSend.send(AM_BROADCAST_ADDR, &_RadioSendPacket, sizeof(NodeToNodeMsg_t))== SUCCESS) {
				//call Leds.led1Toggle();					
				_radioBusy = TRUE;
			} 
			else {
				post Radiomsgsend();
			}
		} 
		else {
			post Radiomsgsend();
		}
	}


    task void Serialmsgsend(){
		TempPacket=(NodeToNodeMsg_t *)( call SerialSend.getPayload(&_SerialSendPacket,sizeof(NodeToNodeMsg_t)));
		TempPacket->Counter=buffer.Counter;
		TempPacket->SourceID=buffer.SourceID;
		TempPacket->DestID=buffer.DestID;
		TempPacket->Temperature=buffer.Temperature;
		call SerialSend.send(AM_BROADCAST_ADDR, &_SerialSendPacket, sizeof(NodeToNodeMsg_t));	
	}
	event void Boot.booted() {
		call RadioControl.start(); 
		call SerialControl.start();
	}
	event void RadioControl.startDone(error_t err) {    
		if (err == SUCCESS) { 

			call RunningTimer.startPeriodic(8000);
		}
		else {  
			call RadioControl.start();// Try to start it again if failed
		}
	}
	event void Read.readDone(error_t result, uint16_t data) {
		if (result == SUCCESS){
			_Seq++;
			_Temperature=data;
			buffer.Counter=_Seq;
			buffer.Temperature=_Temperature;
			buffer.SourceID=TOS_NODE_ID;
			buffer.DestID=0;
			if (TOS_NODE_ID != 0) {				
				post Radiomsgsend();
			}
			else  {
				post Serialmsgsend();
			}			
		}
	}
	event void RadioSend.sendDone(message_t* msg, error_t error) {
		if ( &_RadioSendPacket == msg) {
			_radioBusy = FALSE;
		}
		
		
	}

	event message_t* SerialReceive.receive(message_t* msg, void* payload, uint8_t len) {

	}


	event void SerialSend.sendDone(message_t* msg, error_t error) {
		
	}

	event void SerialControl.startDone(error_t err) {	
		if (err == SUCCESS) {	
		}
		else {
			call SerialControl.start();
		}
	}
	event void SerialControl.stopDone(error_t err) {
		
	}
	event void RadioControl.stopDone(error_t err) {
		
	}
	event message_t* RadioReceive.receive(message_t* msg, void* payload, uint8_t len) { // SerialSend - RadioSend - Read
		if (len == sizeof(NodeToNodeMsg_t)) { 	
			//call Leds.led0On(); 
			incomingPacket = (NodeToNodeMsg_t *)payload;  
			_Counter=incomingPacket->Counter;
			_SourceID=incomingPacket->SourceID;

			if (!checkIfReceived(incomingPacket->SourceID)) {// check whether the Packet is new or old
				
				buffer.Counter=incomingPacket->Counter;
				buffer.SourceID=incomingPacket->SourceID;
				buffer.Temperature=incomingPacket->Temperature;
				buffer.DestID=incomingPacket->DestID;
				_Seq=_Counter;  
				
				if (incomingPacket->DestID!=TOS_NODE_ID){ 
					//call Leds.led0Toggle();
					// read codes
					if (call RadioSend.send(AM_BROADCAST_ADDR, msg , sizeof(NodeToNodeMsg_t))== SUCCESS) {
						//call Leds.led1Toggle();					
						_radioBusy = TRUE;
					} 
				}
				
				if (incomingPacket->DestID==TOS_NODE_ID && TOS_NODE_ID==0)  {
					setItReceived(incomingPacket->SourceID);
					post Serialmsgsend();
				}
			}
		}
		return msg;
	}

	event void RunningTimer.fired( ) {  
		 call Read.read();
	}
}


