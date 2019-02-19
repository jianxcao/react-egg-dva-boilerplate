const path = require('path');
const { getModelPath } = require('./utils')
module.exports = function(source) {
  this.cacheable();
  const resourcePath = this.resourcePath.replace(/\\/g, '\\\\');
  const cwd = process.cwd();
  let importModels = [];
  let strModel = [];

  const relativePath = path.relative(cwd, resourcePath);
  // 入口文件强制要求在app/web/page下
  if (!relativePath.startsWith('app/web/page')) {
    return '';
  }

  // 导入全局包
  // 路径写死，如果需要扩展，请在loader上加参数
  const globalBasePath =  path.join(cwd, 'app/web/models');
  let modelsPaths =  getModelPath(globalBasePath);
  let res = getPathStr(globalBasePath, modelsPaths);
  importModels = importModels.concat(res.import);
  strModel = strModel.concat(res.name);

  let curPath = path.dirname(relativePath);
  while(path.relative(curPath, 'app/web')) {
    let basePath = path.join(cwd, curPath, 'models');
    modelsPaths =  getModelPath(basePath);
    res = getPathStr(cwd, modelsPaths);
    importModels = importModels.concat(res.import);
    strModel = strModel.concat(res.name);
    curPath = path.dirname(curPath);
  }

  strModel = `[${strModel.join(',')}]`
  const stri = `
    const connectDva = require('asset/js/connectDva');
    const resource = require('${resourcePath}');
    ${importModels.join(';')};
    const models = ${strModel};
    if (module.hot) {
      module.hot.accept();
    }
    export default connectDva['default'](models, resource.dvaOpt, resource.routers)(resource['default']);
  `;
  return stri;
};

function getPathStr (basePath, modelsPaths) {
  return modelsPaths.reduce((res, cur) => {
    const name = cur.replace(basePath, '')
    .replace(/\//g, '$').replace('.', '$');
    res.name.push(name);
    res.import.push(`import ${name} from '${cur}'`);
    return res;
  }, {
    name: [],
    import: []
  });
}