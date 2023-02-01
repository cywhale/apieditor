import Static from '@fastify/static'
import Helmet from '@fastify/helmet'
import { join } from 'desm'

export default async function (fastify, opts, next) {

  fastify.register(Helmet, {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https:"],
        frameAncestors: [
          'https://nodeeco.firebaseapp.com/',
          'https://odbsso.oc.ntu.edu.tw/'
        ],
        frameSrc: [
          'https://nodeeco.firebaseapp.com/',
          'https://odbsso.oc.ntu.edu.tw/'
        ],
        scriptSrc: ["'self'", "https:", "'unsafe-eval'", "'unsafe-inline'"],
        connectSrc: ["'self'", "https:"],
        imgSrc: ["'self'", "https:", "data:"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'"
        ]
      }
    }
  })

  //if (fastify.conf.port !== fastify.conf.devTestPort) { // for testing
  fastify.register(Static, {
        root: join(import.meta.url, '../..', '../build'),
        prefix: '/apieditor/',
        //prefixAvoidTrailingSlash: true,
        list: true,
        cacheControl: false,
        wildcard: false, //after Static6.7: https://github.com/fastify/fastify-static/pull/357
        //maxAge: 31536000000 //in ms
  })
  //}
/*
  fastify.get('/apieditor', function (req, reply) {
    reply.sendFile('index.html') //, { join(import.meta.url, '../../..', 'build') })
  })*/
}
