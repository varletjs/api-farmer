import { lint, fmt, staged } from 'rattail/vite-plus'
import { defineConfig } from 'vite-plus'

const ignores = ['**/fixtures/**/apis/generated/**']

export default defineConfig({
  pack: {
    entry: ['src/index.ts', 'src/cli.ts'],
    dts: true,
    shims: true,
  },

  staged: staged(),

  lint: lint({ ignores }),

  fmt: fmt({ ignores }),
})
