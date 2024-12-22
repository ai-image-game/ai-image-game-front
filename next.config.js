// next.config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.production.local') });

console.log("###### ENVIRONMENT VARIABLES DURING BUILD:", process.env);

module.exports = {
    reactStrictMode: false,
};
