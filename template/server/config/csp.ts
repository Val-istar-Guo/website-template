import { nodeEnv } from '@framework/env'


export default nodeEnv.swtich({
  prod: {} as any,
  default: {
    policy: {
      // Vue need 'unsafe-eval'
      'default-src': ['self', 'unsafe-eval', 'unsafe-inline', 'ws:', 'data:'],
    },
  } as any,
})
