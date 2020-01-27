// Come back to this sometime when you actually know wtf you're doing.
// This component produces a colourcomponent for each possible theme variable. Allowing a user to create a custom theme.


import React, { Component } from 'react'
import ColourPickerComponent from './ColourPickerComponent'
import './ThemeSettingsForm.scss'

const setting = require('electron').remote.require('electron-settings')

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
      let colourVariables = ['titlebarBG',
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
    // Grab all the variables with their value and put it in an object
    let coloursToSave = new Object;
    coloursToSave.name=this.props.themeName
      
    var htmlStyles = window.getComputedStyle(document.querySelector("html"))
      for(var i = 0; i < colourVariables.length; i++) {
        coloursToSave[colourVariables[i]] = htmlStyles.getPropertyValue("--" + colourVariables[i]);
      }
        this.setState({
          customTheme : coloursToSave,
        })
        
        let currSavedThemes = setting.get('customThemes:savedThemes')
        
        // if no themes have been added to the list already..
        if (currSavedThemes === undefined){
          currSavedThemes = [this.state.customTheme]
          setting.set('customThemes',{ 
            savedThemes: currSavedThemes
          })
        }else{
          setting.set('customThemes',{ 
<<<<<<< HEAD
            savedThemes: savedThemes.push(this.state.customTheme)
=======
            savedThemes: setting.get('customThemes:savedThemes').push(this.state.customTheme)
>>>>>>> parent of 72b801b... Merge branch 'master' of https://github.com/Bfall97/Noted2
          })
        }

        // setting.set('customThemes',{ 
        //   savedThemes: currSavedThemes
        // })
      event.preventDefault();
    }
  
    render() {
      //TODO: Abstract this the labels in the form.
      return (
        <form onSubmit={this.handleSubmit}>
            <div className='setting-input'>
            <h5>Main Theme Settings</h5>

            <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Primary Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--primaryBackground'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Secondary Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--secondaryBackground'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Editor Pane Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--editorBackground'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Preview Pane Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--textDisplay'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Primary Accent Colour</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--primaryAccent'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Secondary Accent Colour</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--secondaryAccent'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Primary Text Colour</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--primaryTextColor'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Secondary Text Colour</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--secondaryTextColor'/>
              </label>
            
            <h5>TitleBar Theme Settings</h5>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarBG'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Border</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarBorder'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Foreground</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarForeground'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Dropdown Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarDropDownBG'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Dropdown Border</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarDropDownBorder'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Dropdown Selection</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarDropDownSelection'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Dropdown Seperator</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarDropDownSeperator'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Button Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarButtonBG'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>TitleBar Button Border</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--titlebarButtonBorder'/>
              </label>

              <h5>Side Navigator + Bottom Bar Theme Settings</h5>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side/Bottom Nav Main Gradient 1</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--primaryGradient'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side/Bottom Nav Main Gradient 2</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--secondaryGradient'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Bottom Bar Border</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--bottomBarBorder'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side Nav Main Icon and Text</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--sideNavMainText'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side Nav Search Box Text</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--sideNavSearchBoxText'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side Nav Search Box Border</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--sideNavSearchBorder'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side Nav Sub Menu Background</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--sideNavSubMenuBG'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Side Nav Sub Menu Text Accent</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--sideNavSubMenuTextAccent'/>
              </label>


              <h5>Scroll Bar Theme Settings</h5>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Scroll Bar Track</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--scrollbarTrack'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Scroll Bar Thumb</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--scrollbarThumb'/>
              </label>

              <label>
                <div className='header-container'>
                  <div className='header'>
                    <h6>Scroll Bar Thumb</h6>
                  </div>
                </div>
                <ColourPickerComponent variable='--scrollbarThumbHover'/>
              </label>


              <input className='save-btn' type="button" value="Save" onClick={this.handleSubmit} />
            </div>

        </form>
      );
    }
}

export default ThemeSettingsForm



