
module.exports = app => {
  app.get('/', app.controller.demo.index.index);
  app.get('/home', app.controller.demo.index.index);
  app.get('/about', app.controller.demo.index.index);
  app.get('/clientindex', app.controller.demo.index.clientIndex);
  app.get('/clientabout', app.controller.demo.index.clientIndex);
  
  app.get('/list', app.controller.demo.index.list);
  app.get('/client', app.controller.demo.index.client);
};
