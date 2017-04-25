// index.js
// Crear las variables que vamos a usar después
const server = require('server');
const { get, post } = server.router;
const { file } = server.reply;
const checkData = require('./check-data.js');



// Esta función se ejecuta cuando arduino o raspberry pi envían datos
// al servidor y envía estos datos al navegador
const recordData = ctx => {

  // La variable data es un objeto con este formato:
  // { "temperature": 25.43, "light": 15.6 }
  const data = ctx.req.body;

  // Cada vuelta del loop es para una propiedad:
  // 0: temperatura, 1: luz, etc.
  for (let type in data) {
    let value = data[type];

    // Comprobar que el tipo de datos Y el valor son válidos
    checkData(type, value);

    // Enviar los datos al navegador usando el protocolo websockets
    ctx.io.emit(type, { value });
  }
};



const routes = [
  get('*', file('index.html')),
  post('/', recordData)
];



server({ connect: { csrf: false } }, routes);
