import { host, port } from '@framework/env'
import bootstrap from './bootstrap'
import { logger } from '@server/utils'


async function start(): Promise<void> {
  logger.info('Create server')
  const server = await bootstrap()
  server.listen(port, host)
  logger.info(`Server start at ${host}:${port}`)
}

start()
