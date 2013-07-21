COMPONENT=TemperatureAppC
BUILD_EXTRA_DEPS += Temperature.class
CLEAN_EXTRA = *.class TemperatureMsg.java 
CFLAGS += -I$(TOSDIR)/lib/printf
#CFLAGS += -DNEW_PRINTF_SEMANTICS

//CFLAGS += -DCC2420_DEF_RFPOWER=1
DEFAULT_LOCAL_GROUP = 3

TemperatureMsg.java: 
	mig java -target=telosb -java-classname=TemperatureMsg Temperature.h NodeToNodeMsg -o $@

Temperature.class: $(wildcard *.java) TemperatureMsg.java
	javac *.java

include $(MAKERULES)
