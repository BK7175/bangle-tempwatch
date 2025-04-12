// Puck.js Temperature Sender via BLE
// Sends temperature data every 10 seconds using the Health Thermometer BLE service

function sendTemp() {
  let temp = E.getTemperature().toFixed(1);
  let msg = JSON.stringify({ t: temp });

  NRF.setAdvertising({}, { name: "Puck.js", connectable: true });

  NRF.on('connect', function(addr) {
    NRF.setServices({
      0x1809: { // Health Thermometer Service
        0x2A1C: { // Temperature Measurement Characteristic
          value: [0],
          readable: true,
          notify: true,
          indicate: true,
          onWrite: function(evt) {
            console.log("Written to");
          }
        }
      }
    }, { advertise: ['1809'] });

    setInterval(() => {
      let data = new TextEncoder().encode(msg);
      NRF.updateServices({
        0x1809: {
          0x2A1C: {
            value: data,
            notify: true
          }
        }
      });
      console.log("Sent:", msg);
    }, 10000);
  });
}

sendTemp();