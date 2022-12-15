process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = 3001;
require('./webpack.config');
require('react-scripts/scripts/start');