import AutoLoad from '@fastify/autoload'
import Cors from '@fastify/cors'
import UnderPressure from '@fastify/under-pressure'
import { join } from 'desm'

export default async function (fastify, opts) {

  fastify.decorate('conf', {
    node_env: process.env.NODE_ENV || 'development',
    //port: process.env.PORT || 3100,
  })

  fastify.register(UnderPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98,
    message: 'Warning: Under pressure!',
    retryAfter: Math.floor(Math.random() * (50 - 5 + 1) + 5),
    pressureHandler: (req, rep, type, value) => {
      if (type === underPressure.TYPE_HEAP_USED_BYTES) {
        fastify.log.warn(`too many heap bytes used: ${value}`)
      } else if (type === underPressure.TYPE_RSS_BYTES) {
        fastify.log.warn(`too many rss bytes used: ${value}`)
      }
      // if you omit this line, the request will be handled normally
      return getPromise().then(() => reply.send({hello: 'Warning: Maybe too much connections at this time, just wait...'}))
    }
  })

  fastify.register(Cors, (instance) => {
    return (req, callback) => {
      const corsOptions = {
        origin: true,
        credentials: true,
        preflight: true,
        preflightContinue: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Keep-Alive', 'User-Agent',
                         'Cache-Control', 'Authorization', 'DNT', 'X-PINGOTHER', 'Range'],
        exposedHeaders: ['Content-Range'],
        maxAge: 86400,
      };
      if (/^localhost$/m.test(req.headers.origin)) {
        corsOptions.origin = false
      }
      callback(null, corsOptions)
    }
  })
/*
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
    options: Object.assign({}, opts)
  })
*/
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    dirNameRoutePrefix: false,
    options: Object.assign({}, opts)
  })
}

