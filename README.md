# Motondroid
App em React Native com o microcontrolador ESP8266 com objetivo de realizar partida, acionar pisca, farol e buzina da moto.

## Funcionamento base:
O microcontrolador iniciará um Acess Point Wifi, um servidor HTTP local e estabelecer uma comunicação socket - tudo em linguagem do 
arduino. O celular conectado a esse Acess Point abrirá o app Motondroid que será a interface que acionara eventos socket para o microcontrolador.

## Configurando o ESP8266
  * [Ambiente de desenvolvimento versão: 1.8.20](https://www.arduino.cc/en/software)
  * [Instalação da placa](https://arduino-esp8266.readthedocs.io/en/latest/installing.html)
  
### Dependencias ESP8266
Algumas dependencias foram necessárias para o desenvolvimento do código pro ESP8266:
  * [ESP8266WiFi](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html)
  * [ESP8266WebServer](https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WebServer)
  * [JSON](https://github.com/bblanchon/ArduinoJson)
  * [WebSocketsServer](https://github.com/khoih-prog/WebSockets_Generic)


