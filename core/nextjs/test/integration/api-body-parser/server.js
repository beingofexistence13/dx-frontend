const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const dir = __dirname
const port = process.env.PORT || 3000

const app = next({ dev, dir })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json({ limit: '5mb' }))

  server.all('*', (req, res) => {
    req.fromCustomServer = true
    handleNextRequests(req, res)
  })

  server.listen(port, (err) => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})
