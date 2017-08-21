const Router = require('koa-router')
const router = new Router();
var index = require('./index');
var user = require('./users');

module.exports = function (app) {
   app.use(index.routes(), index.allowedMethods());
   app.use(user.routes(), user.allowedMethods());
}