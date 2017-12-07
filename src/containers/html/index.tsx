import * as React from 'react'
import { Helmet } from 'react-helmet'
import { toJS } from 'mobx'
import Store from 'store'

interface IHtmlProps {
  manifest?: any
  markup?: string
  store?: Store
}

export default class Html extends React.Component<IHtmlProps> {
  resolve(files) {
    return files.map(src => !this.props.manifest[src] && '/public/' + this.props.manifest[src]).filter(file => file)
  }

  render() {
    const head = Helmet.rewind()
    const { markup, store } = this.props

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {
            this.resolve(['vendor.css', 'app.css']).map((src, key) =>
              <link key={key} rel='stylesheet' type='text/css' href={src} />,
            )
          }
          <link rel='shortcut icon' href='/favicon.ico' />
        </head>
        <body>
          <main id='app' dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(toJS(store))};` }} charSet='UTF-8' />
          {
            this.resolve(['vendor.js', 'app.js']).map((src, key) => 
              <script src={src} key={key}/>
            )
          }
        </body>
      </html>
    )
  }
}