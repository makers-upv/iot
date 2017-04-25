const socket = io();
const ctx = document.getElementById('temperature').getContext('2d');

const charts = {
  temperature: new SmoothieChart({ maxValue: 50, minValue: 0 }),
  light: new SmoothieChart({ maxValue: 100, minValue: 0 })
};

charts.temperature.streamTo(document.getElementById("temperature"), 1000);
charts.light.streamTo(document.getElementById("light"), 1000);

// Data
const temperature = new TimeSeries();
const light = new TimeSeries();

socket.on('temperature', data => {
  temperature.append(new Date().getTime(), data);
});

socket.on('light', data => {
  light.append(new Date().getTime(), data);
});

// Add to SmoothieChart
charts.temperature.addTimeSeries(temperature, {
  strokeStyle: '#f55',
  fillStyle: 'rgba(255, 0, 0, 0.4)',
  lineWidth: 3
});

charts.light.addTimeSeries(light, {
  strokeStyle: '#ff5',
  fillStyle: 'rgba(255, 255, 255, 0.3)',
  lineWidth: 3
});
