const router = require('koa-router')();

router.prefix('/jsonp')

router.get('/', function (ctx, next) {
   let returnData = {
      success: true,
      data: {
         text: 'this is a jsonp api',
         time: new Date().getTime(),
      }
  }
   ctx.body = returnData;
})

module.exports = router;