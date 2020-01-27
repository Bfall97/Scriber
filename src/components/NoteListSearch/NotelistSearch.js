import React from 'react'
import TextField from '@material-ui/core/TextField'
import { TextInput } from 'grommet'

// const suggestions = this.props.data.map((entry) => entry.name)
const NotelistSearch = (props) => {

      const [value, setValue] = React.useState("");
    
      const onChange = event => setValue(event.target.value);
    
      const onSelect = event => setValue(event.suggestion);
     

    
      return (
              <TextInput
                value={value}
                dropProps={{ height: "small" }}
                onChange={onChange}
                onSelect={onSelect}
                suggestions={props.data.map((entry) => entry.name)}
              />

      );
    }


export default NotelistSearch
