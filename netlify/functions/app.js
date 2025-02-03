// netlify/functions/app.js
const serverless = require('serverless-http'); // This package converts Express apps into a format suitable for serverless
const app = require('../../index'); // This imports your Express app from index.js (adjust the path if needed)

// Export the handler that Netlify will use as the serverless function entry point
module.exports.handler = serverless(app);
