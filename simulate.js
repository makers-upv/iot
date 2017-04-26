// Simula un arduino o similar

module.exports = (name, { io, initial, size, interval, min = 0, max = Infinity }) => {

  // Generar números aleatorios para publicar
  setInterval(() => {
    initial = initial + size * Math.random() - size / 2;
    if (initial < min) initial = min;
    if (initial > max) initial = max;
    io.emit(name, initial);
  }, interval);
}
