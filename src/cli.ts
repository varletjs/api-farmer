#!/usr/bin/env node
import { Command } from 'commander'
import { getCliVersion } from './utils'

const program = new Command()

program.version(getCliVersion())

program.action(async () => {
  const { generate } = await import('./generate')

  return generate()
})

program.parse()
