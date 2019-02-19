const seo = {
  title: 'demo',
  keywords: 'demo',
  description: 'demo'
}
module.exports = app => {
  return class DemoController extends app.Controller {
    async index() {
      const { ctx } = this;
      await ctx.render('demoApp/index.js', {
        seo
      });
    }

    async clientIndex() {
      const { ctx } = this;
      await ctx.renderClient('demoApp/index.js', {
        seo
      });
    }
    

    async list() {
      const { ctx } = this;
      await ctx.render('demoList/index.js', {
        seo
      });
    }

    async client() {
      const { ctx } = this;
      await ctx.renderClient('demoList/index.js', {
        seo
      });
    }
  };
};
