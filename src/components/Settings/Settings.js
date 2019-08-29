// Taken out until I know what I am doing.
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
    }
    this.toggleTheme = this.toggleTheme.bind(this)
    this.toggleTheme(setting.get('currentTheme.theme'))
    // setting.get('customThemes.savedThemes')
  }

    // Handle Theme Change
    toggleTheme=(theme) => {
      setting.set('currentTheme',{
        theme:theme,
      })
      setting.get('customThemes.savedThemes').map((i)=>{
        if(i === theme){
          //Set theme as active
          this.setState({
            activeTheme : i
          })
          
          var varTrig = document.querySelectorAll(".js-update-variable");
          for(var i = 0; i < varTrig.length; i++){
            varTrig[i].addEventListener("change", function(){
            document.documentElement.style.setProperty("--" + this.dataset.variable, this.value);
          });
          }

        }
      })
      document.documentElement.setAttribute('data-theme', theme)
      console.log('switching themes...')
      document.documentElement.classList.add('theme-transition')
      document.documentElement.setAttribute('data-theme', theme)
      window.setTimeout(function () {
        document.documentElement.classList.remove('theme-transition')
      }, 800)
  }

      customThemeList=()=>{
          // let themeList = setting.get('customThemes.savedThemes');
          return setting.get('customThemes.savedThemes').map((i,index) => (
            i == this.state.activeTheme ? 
            <li       // Conditionally render and 'active' class on the list item
              className='custom-theme-list-item-active'
              onClick = {()=>this.toggleTheme(i)}
              key={index}>
              {i}
            </li>
            :
            <li       
              className='custom-theme-list-item'
              onClick = {()=>this.toggleTheme(i)}
              key={index}>
              {i}
            </li>
          ))
        }

      newTheme=()=>{
        this.setState({themeSettingsView:true})
        smalltalk
          .prompt('Theme Name', 'Lets start with a name for your theme:', '')
          .then((value) => {
          // setting.set('customThemes',{ savedThemes: savedThemes.append(value)})
          this.setState({createdThemeName: value})
        })
          .catch(() => {
          console.log('cancel');
        });
      }

//TODO: Add Scrollbar, your CSS sucks!
  
  render() {
    // Which icon to display
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
        <h2>Settings</h2>
        <div className='theme-settings'>
          <h4>Themes</h4>
          { ThemeIcons }
          <div className='custom-theme-form'>
             <h4>Custom Themes</h4>
              {this.customThemeList()}
              <button onClick={this.newTheme}>New</button>
             
             {this.state.themeSettingsView ?
                <ThemeSettingsForm themeName={this.state.createdThemeName}/>
             :
                null
            }
        </div>
      </div>
    </div> 
      {/* <Tooltip title="Settings" aria-label="settings">
        <SettingsIcon size='22' className='settings-button' onClick={()=>{this.setState({settingsView: !this.state.settingsView})}} />
      </Tooltip> */}
     </React.Fragment>   
    )
  }
}
