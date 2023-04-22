#include "DHT.h"

#define DHTPIN 2

#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const int micPin = A0;

void setup() {
  Serial.begin(9600);
  Serial.println("Inicio");
  pinMode(micPin, INPUT);
  dht.begin();
}

void loop() {
  delay(250);
  int sound = analogRead(micPin);

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  Serial.print(h, 1);
  Serial.print(",");
  Serial.print(t, 1);
  Serial.print(",");
  Serial.println(sound);

}
