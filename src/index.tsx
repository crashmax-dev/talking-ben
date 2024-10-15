/* @refresh reload */
import { render } from 'solid-js/web'

import { App } from './App.js'
import { splashScreen } from './SplashScreen.js'

import './index.scss'

const root = document.querySelector('#root')

splashScreen.init()
splashScreen.onInit(() => {
  document.body.classList.add('background')
  render(() => <App />, root!)
})
