const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const openapi2ts = require('openapi-typescript').default;
// const lodash = require('lodash-es');
// const { swaggerTypeTemplate, swaggerTypesTemplate, swaggerApiTemplate, swaggerRepositoryTemplate } = require('./templates/swagger-template');
const { controllerParser } = require('./parser');

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env')
});

const rootPath = process.cwd();
const swaggerDocsAlias = process.env.SWAGGER_DOCS_ALIAS.split(',');
const swaggerDocsAliasVersion = {};
const swaggerDocsUrl = process.env.SWAGGER_DOCS_URL.split(',');
const swaggerDocPath = process.env.SWAGGER_DOC_PATH;
const swaggerDefinitionsPath = process.env.SWAGGER_DEFINITIONS_PATH;
const swaggerTypesPath = process.env.SWAGGER_TYPES_PATH;
const swaggerControllersPath = process.env.SWAGGER_CONTROLLERS_PATH;
const swaggerSeePath = process.env.SWAGGER_SEE_PATH.split(',');

async function download() {
  console.log('download', 'swagger doc 다운로드');
  const docs = await Promise.all(swaggerDocsUrl.map(url => fetch(url).then(res => res.json())));

  docs.forEach((doc, index) => {
    const fileName = `${swaggerDocsAlias[index]}.spec.json`;
    const output = JSON.stringify(doc, null, 2).replace(/«/g, '<').replace(/»/g, '>');

    console.log(`${fileName} 생성`);
    fs.writeFileSync(path.resolve(rootPath, swaggerDocPath, fileName), output);
  });
}

async function createDefinitions() {
  console.log('createDefinitions', 'definitions 생성');

  for (const index in swaggerDocsAlias) {
    const name = swaggerDocsAlias[index];
    const definitionsFileName = `${name}.definitions.ts`;

    const fileName = `${name}.spec.json`;
    const filePath = path.resolve(rootPath, swaggerDocPath, fileName);
    const doc = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const output = await openapi2ts(doc, { prettierConfig: path.resolve(rootPath, '.prettierrc') });

    swaggerDocsAliasVersion[name] = Number((doc.swagger || doc.openapi).match(/^\d{1}/)[0]);

    console.log(`${definitionsFileName} 생성`);
    fs.writeFileSync(path.resolve(rootPath, swaggerDefinitionsPath, definitionsFileName), output);
  }
}

function createRepository() {
  console.log('createRepository', swaggerDocsAlias);

  swaggerDocsAlias.forEach((_, index) => {
    const alias = swaggerDocsAlias[index];
    const seePath = swaggerSeePath[index];
    const rawDefinitions = fs.readFileSync(path.resolve(rootPath, swaggerDocPath, `${alias}.spec.json`), 'utf8');
    const controllers = controllerParser(rawDefinitions, alias);

    Object.keys(controllers).forEach(controllerName => {
      const apis = controllers[controllerName];
      console.log('apis', apis);

      // ! e.g: AdminApprovalController > AdminApprovalRepository
      // const repositoryName = lodash.startCase(lodash.camelCase(controllerName)).replace(/controller$/i, 'Repository').replace(/\s/g, '');
      // // ! e.g: AdminApprovalController > admin-approval.repository
      // const fileName = lodash.kebabCase(controllerName).replace(/\-controller$/i, '.repository');
      // // ! e.g: admin-approval.repository.ts > admin-approval.types
      // const typesFileName = fileName.replace(/\.repository$/, '.types');

      // const templateData = { alias, controllerName, seePath, repositoryName, typesFileName };

      // const typeTemplates = apis.map(apiData => swaggerTypeTemplate({ ...templateData, ...apiData })).join('').replace(/\n+/g, '\n');
      // const typeData = swaggerTypesTemplate({ ...templateData, typeTemplates });
      // // ! e.g: approval.spec.json > src/repository/types/approval.definitions.ts
      // fs.writeFileSync(path.resolve(rootPath, `${swaggerTypesPath}/${alias}/${typesFileName}.ts`), typeData, 'utf-8');

      // const apiTemplates = apis.map(apiData => swaggerApiTemplate({ ...templateData, ...apiData })).join('');
      // const repositoryData = swaggerRepositoryTemplate({ ...templateData, apiTemplates });
      // // ! e.g: approval.spec.json > src/repository/controllers/approval/admin-approval.repository.ts
      // fs.writeFileSync(path.resolve(rootPath, `${swaggerControllersPath}/${alias}/${fileName}.ts`), repositoryData, 'utf-8');
    });
  });
}

Promise.resolve()
  // .then(download)
  // .then(createDefinitions)
  .then(createRepository)
  .catch(console.error);
