#include <Wire.h> 

#define MCPAdress 0x20

#define GPA   0x12  
#define GPB   0x13

#define IODIRA 0x00
//#define IODIRB 0x07

#define LOWMCP B00000000
#define HIGHMCP B11111111

void writeBlockData(uint8_t cmd, uint8_t data);

void setup() {
  pinMode(D4, OUTPUT);
  Serial.begin(9600);

  delay(1000);

  Wire.begin(D1, D2);
  Wire.beginTransmission(MCPAdress);
  Wire.write(IODIRA);
  Wire.write(0x00);
  Wire.endTransmission();
  
//  Wire.setClock(200000);
//  writeBlockData(IODIRA, 0); //define as porta 0 como output
//  writeBlockData(GPA, LOWMCP); //Define a 
//  writeBlockData(GP1, LOWMCP); //Define a
}

void loop() {
  Wire.beginTransmission(0x20);
  Wire.write(0x12);
  Wire.write((byte)0xAA);
  Wire.endTransmission();
  delay(3000);
  Wire.beginTransmission(0x20);
  Wire.write(0x12);
  Wire.write((byte)0x55);
  Wire.endTransmission();
  delay(3000);
}


void writeBlockData(uint8_t cmd, uint8_t data) {
  /*
    OUTPUT: 0x00
    INPUT: 0xFF
  */
  Wire.beginTransmission(MCPAdress);
  Wire.write(cmd);
  Wire.write(data);
  Wire.endTransmission();
  delay(10);
}
