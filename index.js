const server = require('server');
const { get, post } = server.router;
const fs = require('mz/fs');

const validTypes = [
  'temperature',
  'light'
];

const sendIndex = async ctx => {
  const index = await fs.readFile(__dirname + '/index.html', 'utf8');
  ctx.res.send(index);
};

// Format of the data:
// POST: { "temperature": 25.43 }
const recordData = ctx => {
  const data = ctx.req.params.body;
  for (let type in data) {
    let value = data[type];

    if (!validTypes.include(type)) {
      throw new Error(`Unexpected data ${type}; expecting ${validTypes}`);
    }
    if (typeof data[type] !== 'number') {
      throw new Error(`Sent ${typeof body} instead of a numeric value`);
    }

    ctx.io.emit(type, { value });
  }
};

server({ connect: { csrf: false } },
  get('/', sendIndex),
  post('/', recordData)
);
