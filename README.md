# koa2-res
koa2 response 增加控制函数

```javascript
const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const res = require('koa2-res');

app.use(res);

router
  .get('/', (ctx, next) => {
    console.log(`${ctx.context_key}`, 'this is a');
    ctx.success({a: 1}, 201, 'this is a')
  })
  .get('/404', (ctx, next) => {
     console.log(`${ctx.context_key}`, '404 not found');
     ctx.fail(404, 'not found!');
  })

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log(`Server is running on port 3000`);
```
