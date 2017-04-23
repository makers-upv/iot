const socket = io();
const ctx = document.getElementById('temperature').getContext('2d');
const charts = {};

const init = new Date();

const updateChart = ({ type, x, y }) => {
  let set = charts[type].config.data.datasets[0];
  if (set.data.length > 200) {
    set.data = set.data.slice(-200);
  }
  set.data.push({ x, y });
  charts[type].update();
};

socket.on('temperature', data => {
  updateChart({ type: 'temperature', x: new Date(), y: data.value });
});

setInterval(() => {
  let set = charts.temperature.config.data.datasets[0];
  let y = (set.data[set.data.length - 1] || { y: 25 }).y + Math.random() - 0.5;
  updateChart({ type: 'temperature', x: new Date(), y  });
}, 100);


charts.temperature = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Temperatura',
      pointRadius: 0,
      data: []
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'time',
        time: { displayFormats: { quarter: 'HH:MM:SS' } }
      }],
      yAxes: [{
        ticks: { beginAtZero:true, max: 50 }
      }]
    }
  }
});
