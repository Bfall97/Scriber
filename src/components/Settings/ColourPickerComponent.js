import React from 'react'
import styled from 'styled-components'
import { SliderPicker } from 'react-color'
import './ThemeSettingsForm.scss'
import Tooltip from '@material-ui/core/Tooltip'

class ColourPickerComponent extends React.Component {
  state = {
    displayColorPicker: false,
    color: '',
    currentColour: '',
  };



  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
  };
  
  getCurrentThemeValue = () => {
    return getComputedStyle(document.documentElement).getPropertyValue(this.props.variable)
  }

  handleColourChangeComplete=(color, variable)=>{
    document.documentElement.style.setProperty(variable, color.hex); 
    this.setState({ currentColour: color.hex });
  }
  render() {
      const ColourPickerBtn = styled.div`
        height: 14px;
        width: 34px;
        border: 2px solid whitesmoke;
        border-radius: 5px;
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)';
        backgroundColour: ${this.state.currentColour}
        padding: '5px';
        margin: 10px;
        min-width: 30px;
        min-height: 12px;
      `
      const ColourPickContainer = styled.div`
        padding: 5px;
        display: inline-block;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        vertical-align: center;
      `

    return (
      <ColourPickContainer
      onMouseLeave={()=>{this.setState({colourPickView: false})}}
      >
              {this.state.colourPickView ? 

              <SliderPicker
                color={getComputedStyle(document.documentElement).getPropertyValue(this.props.variable)}
                onChangeComplete={(color)=>{this.handleColourChangeComplete(color, this.props.variable)}}
                className='colour-picker'
                />
                : null}
               <Tooltip title="Colour Picker">
                  <ColourPickerBtn 
                    onClick={()=>{this.setState({colourPickView: !this.state.colourPickView})}} 
                    style={{backgroundColor : this.getCurrentThemeValue()}}
                  />
                 </Tooltip> 
              <input 
                  type="text" 
                  value={getComputedStyle(document.documentElement).getPropertyValue(this.props.variable)}
                  onChange={()=>this.handleChange} 
                />

      </ColourPickContainer>
    )
  }
}

export default ColourPickerComponent
