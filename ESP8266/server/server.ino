#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <string>
#include <WebSocketsServer_Generic.h>

//#define inFarolBaixo     D0
//#define inFarolAlto      D1
//#define inSetaDireita    D2
//#define inSetaEsquerda   D5
//#define inSetaDesligada  D6
#define injecao          D0
#define btnCotarCorrente D1
#define painel           D3
#define btnMotor         D4
#define btnBuzina        D7

//#define ledFarolAlto     D4
//#define ledSetaDireita   D7
//#define ledSetaEsquerda  D8

using namespace std;

//WifiAP
const char* ssid = "Motondroid";
const char* password = "@87827fS";
WiFiServer wifiServer(3333);

//Server
ESP8266WebServer server(80);
void restServerRouting();

//SocketEvent
WebSocketsServer webSocket = WebSocketsServer(81);
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length);

String converter(uint8_t *str);
void handleBtn();

uint8_t idUserSocket = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 


  //Configs wifi
  WiFi.mode(WIFI_AP);// Working mode only as Acess Point 
  WiFi.softAP(ssid, password);
  wifiServer.begin();
  Serial.println("Wifi Server started"); 
  Serial.println(WiFi.softAPIP());
  Serial.println(WiFi.localIP());  //Print the local IP to access the server
  Serial.println("Wifi started");

  //Config server https;
  restServerRouting();
  server.begin();
  Serial.println("HTTP server started");

 //Config socket;
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  //Prototipo da moto
//  digitalWrite(inFarolBaixo, LOW);
//  digitalWrite(inFarolAlto, LOW);
//  digitalWrite(inSetaDireita, LOW);
//  digitalWrite(inSetaEsquerda, LOW);
//  digitalWrite(inSetaDesligada, LOW);

  digitalWrite(injecao, LOW);
  digitalWrite(painel, HIGH);
  digitalWrite(btnMotor, HIGH);
  digitalWrite(btnCotarCorrente, LOW);
  digitalWrite(btnBuzina, HIGH);
//  
//  digitalWrite(ledFarolAlto, LOW);
//  digitalWrite(ledSetaDireita, LOW);
//  digitalWrite(ledSetaEsquerda, LOW);
  
//  pinMode(inFarolBaixo, INPUT);
//  pinMode(inFarolAlto, INPUT);
//  pinMode(inSetaDireita, INPUT);
//  pinMode(inSetaEsquerda, INPUT);
//  pinMode(inSetaDesligada, INPUT);
    pinMode(injecao, INPUT);

    
    pinMode(painel, OUTPUT);
    pinMode(btnMotor, OUTPUT);
    pinMode(btnCotarCorrente, OUTPUT);
    pinMode(btnBuzina, OUTPUT);
//  pinMode(ledFarolAlto, OUTPUT);
//  pinMode(ledSetaDireita, OUTPUT);
//  pinMode(ledSetaEsquerda, OUTPUT);
}

void loop() {
  server.handleClient();
  webSocket.loop();
//  controlesMoto();
}

void restServerRouting() {
    server.on("/", HTTP_GET, []() {
        Serial.println("Request!!");
        server.send(200, "text/json", "{\"name\": \"OOI\"}");
    });

    server.on("/login", HTTP_POST, []() {
      Serial.println("POST: ");

      String message = "Body received: \n";
      message += server.arg("plain");
      message += "\n";

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, server.arg("plain"));

      const String username = doc["username"];
      const String password = doc["password"];
      
      if (username == "leofreedy" && password == "abc87827fS") {
        Serial.println("Liga painel");
        digitalWrite(painel, LOW);
        server.send(200, "text/json", "{\"status\": \"true\"}");
      } else {
        server.send(401, "text/json", "{\"status\": \"false\"}");
      }
      Serial.println(username);
      
    });
}
void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  idUserSocket = num;
//  Serial.println(type);
  (void) length;
     
  switch (type)
  {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;
      
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);

        // send message to client
        webSocket.sendTXT(num, "Connected");
      }
      break;
      
    case WStype_TEXT: {
        String strPainel = "offPainel";
        String strOnPartidaMoto = "onPartidaMoto";
        String strOffPartidaMoto = "offPartidaMoto";
        String strOnCortaCorrente = "onBtnCotarCorrente";
        String strOffCortaCorrente = "offBtnCotarCorrente";
        String strOnBuzina = "onBtnBuzina";
        String strOffBuzina = "offBtnBuzina";
        
        
//      String strFarolBaixo = "farolBaixo";
//      String strFarolAlto = "farolAlto";
//      String strSetaDireita = "setaDireita";
//      String strSetaEsquerda = "setaEsquerda";
//      String strSetaDesliga = "setaDesliga";
//      String strSetaAlerta = "setaAlerta";
//
        uint8_t * uintPainel = reinterpret_cast<uint8_t *> (&strPainel[0]);
        uint8_t * uintOnPartidaMoto = reinterpret_cast<uint8_t *> (&strOnPartidaMoto[0]);
        uint8_t * uintOffPartidaMoto = reinterpret_cast<uint8_t *> (&strOffPartidaMoto[0]);
        uint8_t * uintOnCortaCorrente = reinterpret_cast<uint8_t *> (&strOnCortaCorrente[0]);
        uint8_t * uintOffCortaCorrente = reinterpret_cast<uint8_t *> (&strOffCortaCorrente[0]);
        uint8_t * unitOnBuzina = reinterpret_cast<uint8_t *> (&strOnBuzina[0]);
        uint8_t * unitOffBuzina = reinterpret_cast<uint8_t *> (&strOffBuzina[0]);
//      uint8_t * uintFarolBaixo = reinterpret_cast<uint8_t *> (&strFarolBaixo[0]);
//      uint8_t * uintFarolAlto = reinterpret_cast<uint8_t *> (&strFarolAlto[0]);
//      uint8_t * uintSetaDireita = reinterpret_cast<uint8_t *> (&strSetaDireita[0]);
//      uint8_t * uintSetaEsquerda = reinterpret_cast<uint8_t *> (&strSetaEsquerda[0]);
//      uint8_t * uintSetaAlerta =   reinterpret_cast<uint8_t *> (&strSetaAlerta[0]);
//      uint8_t * uintSetaDesliga = reinterpret_cast<uint8_t *> (&strSetaDesliga[0]);


      //Painel, ao fechar o app é emitido um socket para desligar o painel
      if (strcmp(((char*)uintPainel), ((char *)payload)) == 0) {
        digitalWrite(painel, HIGH);
      }

       //Botão pra dar partida na moto.
      if (strcmp(((char*)uintOnPartidaMoto), ((char *)payload)) == 0) {
        digitalWrite(btnMotor, LOW);
      } else if (strcmp(((char*)uintOffPartidaMoto), ((char *)payload)) == 0) {
        digitalWrite(btnMotor, HIGH);
      }

      //Botão de cortar a correte da moto.
      if (strcmp(((char*)uintOnCortaCorrente), ((char *)payload)) == 0) {
        digitalWrite(btnCotarCorrente, HIGH);
      } else if (strcmp(((char*)uintOffCortaCorrente), ((char *)payload)) == 0) {
        digitalWrite(btnCotarCorrente, LOW);
      }

      //Botão da buzina.
      if (strcmp(((char*)unitOnBuzina), ((char *)payload)) == 0) {
        digitalWrite(btnBuzina, LOW);
      } else if (strcmp(((char*)unitOffBuzina), ((char *)payload)) == 0) {
        digitalWrite(btnBuzina, HIGH);
      }
      
//      if (strcmp(((char*)uintFarolBaixo), ((char *)payload)) == 0) {
//        digitalWrite(ledFarolBaixo, HIGH);
//        digitalWrite(ledFarolAlto, LOW);
////        webSocket.sendTXT(num, "farolBaixo");
//      } else if (strcmp(((char*)uintFarolAlto), ((char *)payload)) == 0) {
//        digitalWrite(ledFarolBaixo, LOW);
//        digitalWrite(ledFarolAlto, HIGH);
////        webSocket.sendTXT(num, "farolAlto");
//      } 
//      if (strcmp(((char*)uintSetaDireita), ((char *)payload)) == 0) {
//        digitalWrite(ledSetaDireita, HIGH);
//        digitalWrite(ledSetaEsquerda, LOW);
////        webSocket.sendTXT(num, "setaDireita");
//      } else if (strcmp(((char*)uintSetaEsquerda), ((char *)payload)) == 0) {
//        digitalWrite(ledSetaDireita, LOW);
//        digitalWrite(ledSetaEsquerda, HIGH);
////        webSocket.sendTXT(num, "setaEsquerda");
//      } else if (strcmp(((char*)uintSetaAlerta), ((char *)payload)) == 0) {
//        digitalWrite(ledSetaDireita, HIGH);
//        digitalWrite(ledSetaEsquerda, HIGH);
//      } else if (strcmp(((char*)uintSetaDesliga), ((char *)payload)) == 0) {
//        digitalWrite(ledSetaDireita, LOW);
//        digitalWrite(ledSetaEsquerda, LOW);
////        webSocket.sendTXT(num, "setaDesligada");
//      }
//      Serial.printf("%s", te);
//      Serial.printf("[%u] get Text: %s\n", num, payload);
    }
      // send message to client
      // webSocket.sendTXT(num, "message here");

      // send data to all connected clients
      // webSocket.broadcastTXT("message here");
      break;
      
    case WStype_BIN:
      Serial.printf("[%u] get binary length: %u\n", num, length);
      hexdump(payload, length);

      // send message to client
      // webSocket.sendBIN(num, payload, length);
      break;
  }
}

//void controlesMoto() {
//  bool statusFarolBaixo       = digitalRead(inFarolBaixo);
//  bool statusFarolAlto        = digitalRead(inFarolAlto);
//  bool statusSetaDireita      = digitalRead(inSetaDireita);
//  bool statusSetaEsquerda     = digitalRead(inSetaEsquerda);
//  bool statusSetaDesligada    = digitalRead(inSetaDesligada);
//  
//  if (statusFarolBaixo && !digitalRead(ledFarolBaixo)) {
//    digitalWrite(ledFarolBaixo, HIGH);
//    digitalWrite(ledFarolAlto, LOW);
//    Serial.println("FAROL BAIXO");
//    webSocket.sendTXT(idUserSocket, "farolBaixo");
//  }
//
//  if (statusFarolAlto && !digitalRead(ledFarolAlto)) {
//    digitalWrite(ledFarolBaixo, LOW);
//    digitalWrite(ledFarolAlto, HIGH);
//    Serial.println("FAROL ALTO");
//    webSocket.sendTXT(idUserSocket, "farolAlto");
//  }
//
//  if (statusSetaDireita) {
//    digitalWrite(ledSetaDireita, HIGH);
//    digitalWrite(ledSetaEsquerda, LOW);
//  }
//
//  if (statusSetaEsquerda) {
//    digitalWrite(ledSetaDireita, LOW);
//    digitalWrite(ledSetaEsquerda, HIGH);
//  }
//
//  if (statusSetaDesligada) {
//    digitalWrite(ledSetaDireita, LOW);
//    digitalWrite(ledSetaEsquerda, LOW);
//  }
//}
String converter(uint8_t *str){
    return String((char *)str);
}
