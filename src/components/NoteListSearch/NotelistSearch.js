import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Input from '@material-ui/core/Input'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

const NotelistSearch = (handleSearchChange) => {
  const classes = useStyles()
  return (

    <Input
      id = "outlined-name"
      label='Search'
      placeholder = 'Search...'
      onChange={handleSearchChange}

    />)
}

export default NotelistSearch
