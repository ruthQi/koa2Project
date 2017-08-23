const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const staticSrc = require('koa-static');
const jsonp = require('koa-jsonp');

const router = require('./routes/init');

// error handler
onerror(app)

// 对于POST请求的处理, koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
//可以通过ctx.request.body获取
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//使用json()或者jsonp()，二者选择其一
/*app.use(json());*/
app.use(jsonp());//jsonp中间件
app.use(logger());
app.use(staticSrc(__dirname + '/public/dist'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//=========路由中间件===============================
//如果共存的话，路由中间件应该放在原始路由之前，才可生效。否则的话，原始路由都会拦截，报404
require('./routes/init')(app);
//===================================================
//=============原生路由=============================
function render(page){
   return new Promise((resolve, reject)=>{
      let viewUrl = `./views/router/${page}`;
      fs.readFile(viewUrl, 'binary', (err, data)=>{
         if(err){
            reject(err);
         }else{
            resolve(data);
         }
      })
   })
}

async function route(url){
   let view = '404.ejs';
   switch(url){
      case '/router':
         view = 'index.ejs';
         break;
      case '/router/index':
         view = 'index.ejs';
         break;
      case '/router/todo':
         view = 'todo.ejs';
         break;
      case '/router/404':
         view = '404.ejs';
         break;
      default:
         break;
   }
   let html = await render(view);
   return html;
}

app.use(async(ctx)=>{
   //获取路径url
   let url = ctx.request.url;
   let html = await route(url);
   ctx.body = html;
})
//==================================================



module.exports = app
