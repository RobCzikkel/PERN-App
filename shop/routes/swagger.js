const { serve, setup } = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
var express = require('express');
var swaggerRouter = express.Router();

// Loading via yml.safeLoad to avoid errors with special characters during processing
const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../swagger.yml'), 'utf8'));

// Serves Swagger API documentation to /docs url
swaggerRouter.get('/', serve, setup(swaggerDocument));

module.exports = swaggerRouter