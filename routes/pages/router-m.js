const Router = require('koa-router');

//router.prefix('/routerM');
let home = new Router();

home.get('/', async(ctx)=>{
   let html = `
      <ul>
         <li><a href="/page/helloworld">/page/helloworld</a></li>
         <li><a href="/page/404">/page/404</a></li>
      </ul>
   `
   ctx.body = html
});

let page = new Router();
page.get('/', async(ctx)=>{
   ctx.body = 'page index!'
}).get('/404', async(ctx)=>{
   ctx.body = '404 page!';
}).get('/helloworld', async(ctx)=>{
   ctx.body = 'helloworld page';
});

let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

module.exports = router