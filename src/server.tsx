const appConfig = require('../config/main')

import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'mobx-react'
import { StaticRouter } from 'react-router-dom'
import createMemoryHistory from 'history/createMemoryHistory'

import Routes from 'routes'
import Store from 'store'

import Html from 'containers/html'
const manifest = require('../build/manifest.json')

const express = require('express')
const path = require('path')
const compression = require('compression')
const favicon = require('serve-favicon')

const app = express()

app.use(compression())

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../config/webpack/dev')
  const webpackCompiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }))

  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('*', async(req, res) => {
  const store = new Store(createMemoryHistory(req.originalUrl))

  await store.initFetch(req.url)

  const context: any = {}
  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes/>
      </StaticRouter>
    </Provider>,
  )
  if (context.url) {
    res.writeHead(302, { Location: context.url })
    res.end()
  }
  else {
    res.status(200).send(renderHTML(markup, store))
  }
})

app.listen(appConfig.port, appConfig.host, (err) => {
  if (err)
    console.error(err)

  else
    console.info(`\n\n Listening at http://${appConfig.host}:${appConfig.port}\n`)
})

function renderHTML(markup: string, store: any) {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} manifest={manifest} store={store} />,
  )

  return `<!doctype html> ${html}`
}
