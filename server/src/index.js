'use strict'
import Fastify from 'fastify'
//import Env from '@fastify/env'
//import S from 'fluent-json-schema'
import { join } from 'desm'
import configSecServ from './confighttps.js'
import srvapp from './srvapp.js'

const startServer = async () => {
  const PORT = process.env.PORT || 3100;
  const {key, cert, allowHTTP1} = await configSecServ()
  const fastify = Fastify({
      http2: true,
      trustProxy: true,
      https: {key, cert, allowHTTP1},
      requestTimeout: 5000,
      logger: true,
      ajv: {
        customOptions: {
          coerceTypes: 'array'
        }
      }
  })
/*
  fastify.register(Env, {
    //confKey: 'config',
    dotenv: {
      path: join(import.meta.url, '.env'), //`${__dirname}/.env`,
    //debug: true
    },
    schema: S.object()
      //.prop('NODE_ENV', S.string().required())
      .prop('COOKIE_SECRET', S.string().required())
      .prop('MONGO_CONNECT', S.string().required())
      .valueOf()
  }).ready((err) => {
    if (err) console.error(err)
  //console.log("fastify config: ", fastify.config)
  })
*/
  fastify.register(srvapp)

  fastify.listen({ port: PORT }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
}

startServer()
