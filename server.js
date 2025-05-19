import app from './src/app.js';
import config from './src/config/index.js';

const port  = config().app.port;
const url = config().app.url;
console.log(config().app.url);

app.listen(port, () => {
  console.log(`Server listening at ${url}`);
});