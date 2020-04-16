import { Probe } from './probe'
export const port: number = Number(process.env.PORT) || 8080
export const host: string = process.env.HOST || '0.0.0.0'

export const nodeEnv = new Probe(process.env.NODE_ENV, {
  prod: value => value !== 'development' && value !== 'development',
  dev: value => value === 'development',
  local: value => value === 'local',
})
