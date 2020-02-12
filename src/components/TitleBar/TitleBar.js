import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { TitleBar } from 'electron-react-titlebar'
import './title-styles.css'
import menuTemplate from './menu-template.js'

const titlebar = () => {
  return (
    <TitleBar menu={menuTemplate} />
  )

  }
export default titlebar


