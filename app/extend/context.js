module.exports = {
  // 覆盖renderReactClient方法
  renderReactClient(name, locals = {}, options = {}) {
    const config = this.app.config.reactssr;
    const layout = options.layout || config.layout;
    locals = this.app.react.mergeLocals(this, locals, options, false);
    options = Object.assign({}, options, { name, markup: true });
    const reactEngine = this.app.react;
    return renderPage.call(reactEngine, layout, locals, options, this).then(html => {
      this.body = html;
    });
  }  
};

function renderPage(layout, locals, options, ctx) {
  // 支持自定义 layout html 模板
  const result = /\.(html|htm|tpl)$/.test(layout) ? this.readFile(layout) : (/\.(ejs|nunjucks)$/.test(layout) ?
    this.readFile(layout).then(template => {
      const viewEngine = /\.(ejs)$/.test(layout) ? 'ejs' : 'nunjucks';
      const context = Object.assign({}, locals);
      return ctx.renderString(template, context, {
        viewEngine
      });
    }):
    this.render(layout, locals, options));
  return result.then(html => {
    locals = this.normalizeLocals(locals);
    return this.app.react.resource.inject(html, options.name, locals, options);
  });
}
