import express from 'express';
import path from 'path';
import morgan from 'morgan';

const port = process.env.PORT || 3013;

/** Webpack imports ***/
import webpack from 'webpack';
import config from './webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const compiler = webpack(config);
const webpackOptions = {
  publicPath: config.output.publicPath,
  quiet: false,
  // hides all the bundling file names
  noInfo: true,
  // adds color to the terminal
  stats: {
    colors: true,
  },
};

const app = express();
app.use(morgan('dev'));
app.use(webpackMiddleware(compiler, webpackOptions));
app.use(webpackHotMiddleware(compiler));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, 'localhost', () => {
  console.log(`Listening on port ${port}...`);
});

export default app;
