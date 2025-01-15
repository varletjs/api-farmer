import { loadConfig } from 'unconfig'
import { GenerateOptions } from './generate'

export type Config = GenerateOptions

export function defineConfig(config: Config) {
  return config
}

export async function getConfig(): Promise<Config> {
  const { config } = await loadConfig<Config>({
    sources: [
      {
        files: 'api-farmer.config',
      },
    ],
  })

  return config ?? {}
}
