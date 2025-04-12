let temp = "--.-", heartRate = "N/A", steps = "0", battery = "100", dateStr = "Loading...";
let gatt;
let batteryColor = "#00FF00"; // green color for battery by default
let timeColor = "#333333"; // Dark grey for time

// Update time and date
function updateDateTime() {
  let d = new Date();
  dateStr = d.getFullYear() + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()] +
            " " + d.getDate() + " (" + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()] + ")";
  g.setFont("6x8", 2);
  g.setColor(timeColor);
  g.drawString(dateStr, 10, 10);
  
  let colon = (Math.floor(getTime()) % 2) ? ":" : " ";
  let timeStr = ("0" + d.getHours()).substr(-2) + colon + ("0" + d.getMinutes()).substr(-2);
  g.setFont("Vector", 40);
  g.drawString(timeStr, 10, 40);
}

function updateStats() {
  temp = "22.5";
  heartRate = "72";
  steps = "12000";
  battery = Math.floor(E.getBattery());

  batteryColor = battery < 20 ? "#FF0000" : "#00FF00";

  g.setFont("6x8", 2);
  g.setColor(timeColor);

  g.drawString("Temp: " + temp + "°C", 10, 90);
  g.drawString("HR: " + heartRate + " bpm", 10, 115);
  g.drawString("Steps: " + steps, 10, 140);
  g.drawString("Battery: " + battery + "%", 10, 165);
  g.setColor(batteryColor);
  g.fillRect(140, 160, 140 + battery, 170);
}

function animateBackground() {
  let t = (getTime() % 2) / 2;
  let shade = Math.round(255 * t);
  g.setColor(shade, shade, shade);
  g.fillRect(0, 0, 240, 240);
}

function draw() {
  animateBackground();
  updateDateTime();
  updateStats();
}

setInterval(draw, 1000);
draw();