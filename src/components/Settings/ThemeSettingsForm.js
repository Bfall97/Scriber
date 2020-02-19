// Come back to this sometime when you actually know wtf you're doing.
// This component produces a colourcomponent for each possible theme variable. Allowing a user to create a custom theme.


import React, { Component } from 'react'
import ColourPickerComponent from './ColourPickerComponent'
import './ThemeSettingsForm.scss'

const setting = require('electron').remote.require('electron-settings')
const colourVariables = ['titlebarBG',
      'titlebarBorder',
      'titlebarForeground',
      'titlebarButtonBG',
      'titlebarButtonBorder',
      'titlebarDropDownBG',
      'titlebarDropDownBorder',
      'titlebarDropDownSelection',
      'titlebarDropDownSeperator',
      'primaryBackground',
      'secondaryBackground',
      'textDisplay',
      'primaryAccent',
      'secondaryAccent',
      'primaryTextColor',
      'secondaryTextColor',
      'sideNavMainText',
      'sideNavHover',
      'sideNavSearchBoxText',
      'sideNavSearchBorder',
      'sideNavSubMenuTextAccent',
      'sideNavSubMenuBG',
      'editorBackground',
      'editorForeground',
      'editorSelection',
      'editorComment',
      'editorKeyword',
      'editorNumber',
      'editorString',
      'editorVariable1',
      'editorVariable2',
      'editorHeader',
      'editorCursor',
      'editorLineNumber',
      'editorGutter',
      'editorAttributeProperty',
      'editorBracket',
      'editorTag',
      'editorLink',
      'editorMatchBracketColor',
      'editorMatchBracketBG',
      'editorGutterBorder',
      'buttonHover',
      'secondaryContrast',
      'mobileStep',
      'scrollbarTrack', 
      'scrollbarThumb', 
      'scrollbarThumbHover', 
      'bottomBarBorder',
      'primaryGradient', 
      'secondaryGradient', 
      'resizerBackground',
      'resizerAccent',
      'resizerBorder',
      'previewAnchor',
      'previewAnchorHover',
      'previewHeader1',
      'previewHeader2',
      'previewHeader3',
      'previewHeader4',
      'previewHeader5',
      'previewHeader6',
      'previewHorizontalRule',
      'previewHorizontalRuleInner',
      'previewBlockQoute',
      'previewBlockQouteBG',
      'previewTableBorder',
      'previewTableRowBG',
      'previewTableRow2BG',
      'previewTableHeaderBorder',
      'previewTableTDBorder',
      'previewCodeBlockBorder'
    ];
class ThemeSettingsForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '',
                    customTheme : {},
                };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
     // Create object representing new theme
      let coloursToSave = {};
      coloursToSave.name=this.props.themeName

      //Collecting chosen colours
      var htmlStyles = window.getComputedStyle(document.querySelector("html"))
        for(var i = 0; i < colourVariables.length; i++) {
          coloursToSave[colourVariables[i]] = htmlStyles.getPropertyValue("--" + colourVariables[i]);
        }

        this.setState({
          customTheme : coloursToSave,
        },()=>{

          let currSavedThemes = setting.get('customThemes:savedThemes')

          // if no themes have been added to the list already..
          if (currSavedThemes === undefined || currSavedThemes.length === 0){
            currSavedThemes = [this.state.customTheme]
            setting.set('customThemes',{ 
              savedThemes: currSavedThemes
            })
          }else{
            setting.set('customThemes',{ 
              savedThemes: setting.get('customThemes:savedThemes').push(this.state.customTheme)
            })
          }
          // console.log(this.state.customTheme)
          console.log(setting.get('customThemes.savedThemes'))
        })

        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div className='setting-input'>
            <h5>Main Theme Settings</h5>
        
            {
            colourVariables.map(variable=>{
            return(<label>
              <div className='header-container'>
                <div className='header'>
                  <h6>{variable.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</h6>
                </div>
              </div>
              <ColourPickerComponent variable={'--'+variable}/>
            </label>)
            })}

              <input className='save-btn' type="button" value="Save" onClick={this.handleSubmit} />
            </div>

        </form>
      );
    }
}

export default ThemeSettingsForm



