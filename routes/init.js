const Router = require('koa-router')
const router = new Router();
var index = require('./index');
var user = require('./users');
var routerM = require('./pages/router-m');
var request = require('./pages/request');

module.exports = function (app) {
   app.use(index.routes(), index.allowedMethods());
   app.use(user.routes(), user.allowedMethods());
   //=======路由中间件========================
   app.use(routerM.routes(), routerM.allowedMethods());
   //=========请求方式==========================
   //request
   app.use(request.routes(), request.allowedMethods());
}