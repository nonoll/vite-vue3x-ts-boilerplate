const startCase = str => {
  return str.replace(new RegExp(/[-_]+/, 'g'), ' ')
            .replace(new RegExp(/[^\w\s]/, 'g'), '')
            .replace(
              new RegExp(/\s+(.)(\w*)/, 'g'),
              ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
            )
            .replace(new RegExp(/\w/), s => s.toUpperCase())
};
const camelCase = str => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

const sanitizeType = (type, param, components) => {
  if (param && param.schema) {
    return sanitizeType(param.schema.type);
  }

  switch (type) {
    case 'integer':
      return 'number';
    case 'string':
      if (param && param.enum) {
        return `string ${param.enum.reduce((acc, cur) => `${acc} | '${cur}'`, '')}`;
      }
      return 'string';
    case 'array':
      return `${sanitizeType(param ? param.items.type : 'unknown')}[]`;
    default:
      return 'unknown';
  }
};

const sanitizeDefault = (param) => {
  if (param.hasOwnProperty('default')) {
    switch (typeof param.default) {
      case 'number':
        return param.default + ' | ';
      default:
        return "'" + param.default + "'" + ' | ';
    }
  } else {
    return '';
  }
};

const sanitizeSchema = (schema) => {
  // const ref = (schema['$ref'] || (schema || {}).items['$ref'] || '').replace(/^\#\/definitions\//g, '');
  const ref = (schema['$ref'] || '').replace(/^\#\/definitions\//g, '');
  return `definitions['${ref}']`;
};

const sanitizeParams = (components, param, inType, apiUrl) => {
  if (param.in === inType) {
    const { name, required, schema } = param;
    const type = sanitizeType(param.type, param, components);
    const defaultData = sanitizeDefault(param);
    const definitions = schema ? sanitizeSchema(schema) : '';
    const ref = schema
      ? // ? (schema['$ref'] || (schema || {}).items['$ref'] || '').replace(/^\#\/definitions\//g, '').replace(/<|>/g, '')
        (schema['$ref'] || '').replace(/^\#\/components\/schemas\//g, '').replace(/<|>/g, '')
      : '';

    return { name, required, type, defaultData, definitions, ref };
  }
  return null;
};

const controllerParser = (rawDefinitions) => {
  const { tags, paths, components } = JSON.parse(rawDefinitions);

  // ! spec.json - tags 정의 기준으로 컨트롤러명 정의
  const tagControllerMap = tags.reduce((acc, tag) => {
    acc[tag.name] = tag.description.replace(/\s/g, '');
    return acc;
  }, {});

  const controllers = {};

  // ! api 기준 순회
  Object.keys(paths).forEach((apiUrl) => {
    const path = paths[apiUrl];
    // ! 각 api > method 단위 순회
    Object.keys(path).forEach((method) => {
      const apiTags = path[method].tags;
      const controllerName = tagControllerMap[apiTags[0]];

      // ! 한글명 케이스 체크
      if (!controllerName || /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(controllerName || '')) {
        // console.log('\x1b[33m%s\x1b[0m', 'controllerName not found: ', apiUrl, apiTags[0]);
        return;
      }

      const { operationId, summary, parameters, deprecated, responses = {} } = path[method];
      const apiMethod = method.toLowerCase();
      const hasRequestIds = (parameters || []).some((value) => value.in === 'path');
      const key = startCase(camelCase(controllerName)).replace(/\s/g, '');
      const requestTypes = (() => {
        const inPathParams = (() => {
          return (parameters || [])
            .map((param) => sanitizeParams(components, param, 'path'))
            .filter((v) => v)
            .map((data) => {
              const { name, required, defaultData, type } = data;

              return `${name}${required ? '' : '?'}: ${defaultData}${type};`;
            })
            .filter((v) => v)
            .join('\n  ');
        })();
        const inQuery = (() => {
          return (parameters || [])
            .map((param) => sanitizeParams(components, param, 'query'))
            .filter((v) => v)
            .map((data) => {
              const { name, required, defaultData, type } = data;

              return `${name}${required ? '' : '?'}: ${defaultData}${type};`;
            })
            .filter((v) => v)
            .join('\n  ');
        })();
        const inBody = (() => {
          return (parameters || [])
            .map((param) => sanitizeParams(components, param, 'body', apiUrl))
            .filter((v) => v)
            .map((data) => {
              const { name, required, defaultData, type, definitions } = data;

              if (definitions) {
                return { definitions, inPathParams: null };
              }

              return { definitions: null, inPathParams: `${name}${required ? '' : '?'}: ${defaultData}${type};` };
            })
            .filter((v) => v)[0];
        })();
        return {
          inPathParams,
          inQuery,
          inBody,
        };
      })();

      const responseTypes = (() => {
        if (responses[200] && responses[200].schema && responses[200].schema.$ref) {
          const ref = responses[200].schema.$ref;
          const refName = ref.replace(/\#\/definitions\//, '');
          const isApiResult = /^ApiResponses?/.test(ref) && refName !== 'ApiResponse<Void>';
          return `definitions['${refName}']` + `${isApiResult ? `['result']` : ''}`;
        } else {
          return null;
        }
      })();

      const isResponseVoid = (() => {
        return responseTypes && responseTypes.includes('ApiResponse<Void>');
      })();

      controllers[key] = controllers[key] || [];
      controllers[key].push({
        apiUrl,
        apiMethod,
        operationId,
        controllerName,
        summary,
        parameters,
        hasRequestIds,
        deprecated,
        requestTypes,
        responseTypes,
        isResponseVoid,
      });
    });
  });

  return controllers;
};

module.exports = {
  controllerParser
};
