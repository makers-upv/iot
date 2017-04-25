// Simula un arduino o similar

module.exports = (name, { io, initial, size, interval }) => {

  // Generar números aleatorios para publicar
  setInterval(() => {
    initial = initial + size * Math.random() - size / 2;
    io.emit(name, initial);
  }, interval);
}
