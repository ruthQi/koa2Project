const router = require('koa-router')();

router.prefix('/jsonp')
//app.use(jsonp())引入jsonp()中间件才可解析为jsonp格式
router.get('/', function (ctx, next) {
   let returnData = {
      success: true,
      data: {
         text: 'this is a jsonp api',
         time: new Date().getTime(),
      }
  }
   ctx.body = returnData;//输出为{"success":true,"data":{"text":"this is a jsonp api","time":1503451800686}}
})

module.exports = router;