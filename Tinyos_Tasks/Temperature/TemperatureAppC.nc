#define NEW_PRINTF_SEMANTICS
#include "printf.h"
configuration TemperatureAppC {

}
implementation {
	//General Components
	components MainC;
	components LedsC;
	components TemperatureC as App;
	components CC2420ActiveMessageC;//component for setting the transmitting power

	components new TimerMilliC() as RunningTimer;
	
	//Radio Communication	
	components ActiveMessageC;
	components new AMSenderC(AM_NODETONODEMSG) as RAMSenderC;
	components new AMReceiverC(AM_NODETONODEMSG) as RAMReceiverC; 
	



	
	//App.Packet -> RAMSenderC;

	//Serial Communication
	components SerialActiveMessageC;  

	//Sense Component
	components new DemoSensorC() as Temperature;

	//Printf
	components PrintfC;
	components SerialStartC;

	// General Wiring	
	App.Boot->MainC;
	App.Leds->LedsC;
	App.CC2420Packet -> CC2420ActiveMessageC;
	App.RunningTimer->RunningTimer;

	//Radio wiring
	App.RadioSend -> RAMSenderC;
	App.RadioControl -> ActiveMessageC;
	App.RadioReceive ->RAMReceiverC;


	
	//Serial Wiring
	App.SerialControl-> SerialActiveMessageC;
	App.SerialReceive -> SerialActiveMessageC.Receive[AM_NODETONODEMSG];
	App.SerialSend -> SerialActiveMessageC.AMSend[AM_NODETONODEMSG];


	//Sense
	App.Read->Temperature;


	
}
