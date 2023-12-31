/* eslint-env jest */

import { join } from 'path'
import { nextBuild, nextExportDefault } from 'next-test-utils'

const appDir = join(__dirname, '../')

describe('Export cli prints progress info', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    let buildStdout
    let exportStdout
    beforeAll(async () => {
      const buildResult = await nextBuild(appDir, [], { stdout: true })
      buildStdout = buildResult.stdout
      const exportResult = await nextExportDefault(appDir, { stdout: true })
      exportStdout = exportResult.stdout
    })

    it('build: should log with internally passed statusMessage', async () => {
      const lines = buildStdout.split('\n')
      // Search `info  - Generating static pages (n/m)` line
      const found = lines.some((line) =>
        /Generating static pages \(\d+\/\d+\)/.test(line)
      )

      expect(found).toBeTruthy()
    })

    it('export: should log with default label', async () => {
      const lines = exportStdout.split('\n')
      // Search `info  - Exporting (n/m)` line
      const found = lines.some((line) => /Exporting \(\d+\/\d+\)/.test(line))

      expect(found).toBeTruthy()
    })
  })
})
