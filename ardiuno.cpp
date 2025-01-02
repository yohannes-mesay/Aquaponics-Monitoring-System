#include <OneWire.h>
#include <DallasTemperature.h>

// Define pins
#define ONE_WIRE_BUS 2     // DS18B20 data pin
#define FAN_PIN 3          // Fan control pin
#define PUMP_PIN 4         // Pump control pin

// Temperature thresholds
#define TEMP_HIGH 30.0     // Temperature to turn fan on (in Celsius)
#define TEMP_LOW 25.0      // Temperature to turn fan off (in Celsius)

// Pump timing (in milliseconds)
#define PUMP_ON_TIME 60000        // Pump runs for 1 minute
#define PUMP_OFF_TIME 60000     // Pump stays off for 1 minutes
                                 // Total cycle = 2 minutes

// Setup OneWire and DallasTemperature instances
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

unsigned long previousPumpMillis = 0;
bool isPumpOn = false;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  
  // Set pin modes
  pinMode(FAN_PIN, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);
  
  // Start temperature sensor
  sensors.begin();
  
  // Initially turn off both devices
  digitalWrite(FAN_PIN, LOW);
  digitalWrite(PUMP_PIN, LOW);
}

void loop() {
  // Request temperature reading
  sensors.requestTemperatures();
  float currentTemp = sensors.getTempCByIndex(0);
  
  // Control fan based on temperature
  if (currentTemp >= TEMP_HIGH) {
    digitalWrite(FAN_PIN, HIGH);
    Serial.println("Fan ON");
  } else if (currentTemp <= TEMP_LOW) {
    digitalWrite(FAN_PIN, LOW);
    Serial.println("Fan OFF");
  }
  
  // Control pump based on time intervals
  unsigned long currentMillis = millis();
  
  if (!isPumpOn && (currentMillis - previousPumpMillis >= PUMP_OFF_TIME)) {
    // Turn pump on
    digitalWrite(PUMP_PIN, HIGH);
    isPumpOn = true;
    previousPumpMillis = currentMillis;
    Serial.println("Pump ON");
  }
  else if (isPumpOn && (currentMillis - previousPumpMillis >= PUMP_ON_TIME)) {
    // Turn pump off
    digitalWrite(PUMP_PIN, LOW);
    isPumpOn = false;
    previousPumpMillis = currentMillis;
    Serial.println("Pump OFF");
  }
  
  // Print temperature reading
  Serial.print("Temperature: ");
  Serial.print(currentTemp);
  Serial.println(" °C");
  
  delay(1000); // Small delay to prevent too frequent readings
}