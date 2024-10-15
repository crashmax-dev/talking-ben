/* @refresh reload */
import { render } from 'solid-js/web'

import { App } from './app.jsx'
import { splashScreen } from './splash-screen.js'

import '@/styles/main.scss'

const root = document.querySelector('#root')

splashScreen.init()
splashScreen.onInit(() => {
  document.body.classList.add('background')
  render(() => <App />, root!)
})
