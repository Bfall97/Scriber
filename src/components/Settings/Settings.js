import React, { Component } from 'react'
import { Route, Link, Switch } from "react-router-dom";
import { Moon } from 'styled-icons/boxicons-regular/Moon'
import { Sun } from 'styled-icons/boxicons-regular/Sun'
import { Heart } from 'styled-icons/boxicons-regular/Heart'
import { Glasses } from 'styled-icons/fa-solid/Glasses'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper';
import { Settings as SettingsIcon } from 'styled-icons/octicons/Settings'
import ThemeSettingsForm from './ThemeSettingsForm'
import './Settings.scss'


// TODO: Finish Settings Page
//  TODO: Remove custom theming.

const setting = require('electron').remote.require('electron-settings')
const smalltalk = require('smalltalk');

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // settingsView: false,
      themeSettingsView: false,
      activeTheme : setting.get('currentTheme.theme'),
      createdThemeName: '',
      customThemes: []
    }
    this.toggleTheme = this.toggleTheme.bind(this)
    // setting.get('customThemes.savedThemes')
  }

    // Handle Theme Change
    toggleTheme=(theme) => {

      Object.keys(this.state.activeTheme).forEach((key)=>{
        document.documentElement.style.removeProperty('--'+key,this.state.activeTheme[key])
      })

      setting.set('currentTheme',{
        theme:theme,
      })
      setting.get('customThemes.savedThemes').map((i)=>{
        // if(i === theme){
          //Set theme as active
          this.setState({
            activeTheme : i
          })
          
          var varTrig = document.querySelectorAll(".js-update-variable");
          for(var i = 0; i < varTrig.length; i++){
            console.log(varTrig[i])
            varTrig[i].addEventListener("change", function(){
            document.documentElement.style.setProperty("--" + this.dataset.variable, this.value);
          });
          }

        // }
      })
      


      document.documentElement.setAttribute('data-theme', theme)
      console.log('switching themes...')
      document.documentElement.classList.add('theme-transition')
      document.documentElement.setAttribute('data-theme', theme)
      window.setTimeout(function () {
        document.documentElement.classList.remove('theme-transition')
      }, 600)
  }

  toggleCustomTheme = themeObj => {

    setting.set('currentTheme',{
      theme:themeObj,
    })
    // Setting new variable values with transition
    document.documentElement.setAttribute('data-theme', themeObj.name)
    document.documentElement.classList.add('theme-transition')
    Object.keys(themeObj).forEach(key=>{
      let cssVariable = '--'+key
      let cssVal = themeObj[key]
      document.documentElement.style.setProperty(cssVariable,cssVal)
    })
    window.setTimeout(function () {
      document.documentElement.classList.remove('theme-transition')
    }, 600)
   
    this.setState({
      activeTheme:themeObj
    })
  }

    customThemeList=()=>{
      setting.get('customThemes.savedThemes').map((themeObj, index)=>{
          this.setState(state => ({
            customThemes: state.customThemes.concat(themeObj)
          }))
          
      })
      }

    newTheme=()=>{
      this.setState({themeSettingsView:true})
      smalltalk
        .prompt('Theme Name', 'Lets start with a name for your theme:', '')
        .then((value) => {
        this.setState({createdThemeName: value})
      })
        .catch(() => {
        console.log('cancel');
      });
    }

//TODO: Add Scrollbar, your CSS sucks!
  
  render() {
    const ThemeIcons =
    <React.Fragment>
          <Moon dark onClick={() => this.toggleTheme('dark')} size='22' className='dark-theme'/>
          <Sun light onClick={() => this.toggleTheme('light')} size='22'className='light-theme' />
          <Heart femme onClick={() => this.toggleTheme('femme')} size='22'className='femme-theme' />
          <Glasses office onClick={() => this.toggleTheme('office')} size='22'className='office-theme' />
        </React.Fragment>

    return (
      <React.Fragment>
      <div className='settings-container'>
        <button onClick={this.props.settingsScreen}>Back</button>
        <h2>Settings</h2>
        <div className='theme-settings'>
          <h4>Built-in Themes</h4>
          { ThemeIcons }
          <div className='custom-theme-form'>
             <h4>Custom Themes</h4>
              {setting.get('customThemes.savedThemes').map((themeObj,index)=>{
                 return (
                    <button
                     className='custom-theme-list-item-active'
                     onClick = {()=>this.toggleCustomTheme(themeObj)}
                     key={index}>
                     {themeObj.name}
                   </button>)
              })}
              <button onClick={this.newTheme}>New</button>
             
             {this.state.themeSettingsView ?
                <ThemeSettingsForm themeName={this.state.createdThemeName}/>
             :
                null
            }
        </div>
      </div>
    </div> 
     </React.Fragment>   
    )
  }
}
