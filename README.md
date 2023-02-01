# apieditor
clone from [swagger-api/swagger-editor](https://github.com/swagger-api/swagger-editor), using @next branch, with some trials/modifications

#### Client
npm run build:app

- problems:

  1. cannot make it served on subdirectory (manifest will returned as index.html?) but can on root /
  2. solved by serving by fastify server. But another problem in src/plugins/editor-monaco/after-load.js is:

```
baseUrl: document.baseURI || location.href
//this.baseUrl make fetching /apidom.worker.js and editor.worker.js 404.
//--> ew URL('./static/js/apidom.worker.js', document.baseURI).toString() work for this problem

```

#### Server (Fastify)
npm run prod

- just use fastify-static to serve bundles of client

