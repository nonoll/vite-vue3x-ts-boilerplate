# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 폴더 구조

```bash
.
├── .dev                  # 개발 관련
│   ├── build               # build 설정
│   ├── mocks               # mock api
│   └── secrets             # secrets key
├── .storybook            # storybook
├── .vscode               # vscode
│   ├── extensions.json
│   └── settings.json
└── .workflows            # workflows
│   ├── dooray              # dooray
│   ├── nhn-cdn-deploy      # nhn cloud cdn 배포 설정
│   ├── swagger             # swagger
│   ├── translate           # 다국어 - google sheet 연동 구성
│   └── utils               # workflows 에서 사용할 util
├── public
│   └── favicon.ico
├── src
│   ├── @types            # typescript definitions
│   │   └── env.d.ts
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── composables
│   ├── configs
│   ├── constants
│   ├── decorators
│   ├── directives
│   ├── layouts
│   ├── mixins
│   ├── models
│   │   ├── components
│   │   └── views
│   ├── modules
│   │   └── external
│   │       └── native-app
│   ├── plugins
│   ├── polyfills
│   ├── repository
│   │   ├── controllers
│   │   ├── definitions
│   │   └── types
│   ├── router
│   │   └── guard
│   ├── services
│   ├── styles
│   ├── translate
│   ├── utils
│   ├── views
│   ├── App.vue
│   └── main.ts
├── stories
├── tests
├── .editorconfig
├── .env
├── .env[env]
├── .gitignore
├── .nvmrc
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
