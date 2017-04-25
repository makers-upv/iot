// Los tipos de datos y gráficas que permitimos
const validTypes = ['temperature', 'light'];


// Comprobar que los datos que se envían son válidos
module.exports = (type, value) => {

  // Si es de un tipo que no está en "validTypes" tirar un error
  if (!validTypes.include(type)) {
    throw new Error(`Unexpected data ${type}; expecting ${validTypes}`);
  }

  // Si es un valor que no es un número tirar un error
  if (typeof data[type] !== 'number') {
    throw new Error(`Sent ${typeof body} instead of a numeric value`);
  }
};
