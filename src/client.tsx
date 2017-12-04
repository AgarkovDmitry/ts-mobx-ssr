import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import Routes from 'routes'
import Store from 'store'

declare global {
  interface Window{
    __INITIAL_STATE__: any
    store: Store
  }
  interface NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void
  }
}

const store = new Store(createBrowserHistory(), window.__INITIAL_STATE__)

if (process.env.NODE_ENV != 'production') window.store = store

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)