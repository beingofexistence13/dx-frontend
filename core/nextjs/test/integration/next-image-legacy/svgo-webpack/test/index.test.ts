/* eslint-env jest */

import { join } from 'path'
import {
  renderViaHTTP,
  findPort,
  launchApp,
  nextBuild,
  killApp,
} from 'next-test-utils'

const appDir = join(__dirname, '..')
let appPort
let app
let devOutput

describe('svgo-webpack with Image Component', () => {
  ;(process.env.TURBOPACK ? describe.skip : describe)('production mode', () => {
    it('should not fail to build invalid usage of the Image component', async () => {
      const { stderr, code } = await nextBuild(appDir, [], { stderr: true })
      expect(stderr).toBeFalsy()
      expect(code).toBe(0)
    })
  })

  describe('development mode', () => {
    beforeAll(async () => {
      devOutput = { stdout: '', stderr: '' }
      appPort = await findPort()
      app = await launchApp(appDir, appPort, {
        onStdout: (msg) => {
          devOutput.stdout += msg
        },
        onStderr: (msg) => {
          devOutput.stderr += msg
        },
      })
    })
    afterAll(() => killApp(app))

    it('should print error when invalid Image usage', async () => {
      await renderViaHTTP(appPort, '/', {})
      expect(devOutput.stderr).toBeFalsy()
    })
  })
})
