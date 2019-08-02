import { React, ReactDOM } from 'react'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import menuTemplate from './menu-template.js'

const titlebar = ReactDOM.render(
  <TitleBar menu={menuTemplate} />,
  document.querySelector('title-bar')
)

export default titlebar
