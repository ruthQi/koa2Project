const Router = require('koa-router');
//get方式
let getM = new Router();
getM.get('/', async(ctx)=>{
   let url = ctx.url;
   let request = ctx.request;
   //从上下文的request中获取
   let req_query = request.query;
   let req_querystring = request.querystring;
   //从上下文中获取
   let ctx_query = ctx.query
   let ctx_querystring = ctx.querystring

   ctx.body = {
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring
   }
})
//post方式
let postM = new Router();
postM.get('/', async(ctx)=>{
   console.log(ctx.url)
   if(ctx.url === '/post' && ctx.method === 'GET'){
      let html = `
         <h1>koa2 request post demo</h1>
         <form method="POST" action="/post">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>nickName</p>
            <input name="nickName" /><br/>
            <p>email</p>
            <input name="email" /><br/>
            <button type="submit">submit</button>
         </form>
      `
      ctx.body = html
   }else{
      ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
   }
});
postM.post('/', async(ctx)=>{
   console.log(ctx.url)
   if(ctx.url === '/post' && ctx.method === 'POST'){
      //未使用koa-bodyparser
      //let postData = await parsePostData(ctx);
      //使用koa-bodyparser
      let postData = ctx.request.body;
      ctx.body = postData;

   }else{
      ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
   }
})
//解析上下文里node原生请求的POST参数
//在未使用koa-bodyparser时才有效，addListener才有效，
//使用了koa-bodyparser之后，addListener函数无效
function parsePostData( ctx) {
   return new Promise((resolve, reject)=>{
      try{
         let postdata = '';
         //ctx.req获取的是node.js原生HTTP请求对象
         //ctx.request获取的是context经过封装的请求对象
         ctx.req.addListener('data', function(data){
            //console.log(data)
            postdata += data;
         });
         ctx.req.addListener('end', ()=>{
            //console.log('4444444444')
            let parseData = parseQueryStr( postdata )
            resolve( parseData )
         })
      }catch(err){
         reject(err);
      }
   })
}
//将POST请求参数字符串解析成JSON
function parseQueryStr(queryStr){
   //console.log(queryStr)
   let queryData = {};
   let queryStrList = queryStr.split('&');
   console.log(queryStrList);
   for (  let [ index, queryStr ] of queryStrList.entries()  ) {
      let itemList = queryStr.split('=')
      queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
   }
   return queryData;
}
//post中间件

let router = new Router();
router.use('/get', getM.routes(), getM.allowedMethods());
router.use('/post', postM.routes(), postM.allowedMethods());
module.exports = router