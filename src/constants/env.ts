import path from 'path-browserify'
import envJson from '@/../env.json'

interface ENV {
  username: string
  dir: string
}

const env: ENV[] = envJson
export const WORKSPACE = path.join(env[0].dir)
