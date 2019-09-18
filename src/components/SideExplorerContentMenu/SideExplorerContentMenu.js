import React from 'react'
import { Box } from 'grommet'
import './SideExplorerContentMenu.scss'

const SideExplorerContentMenu = (props) => {
   

    return (
        props.navOpen ? 
        <Box fill='horizontal' className='content-menu-box'>
            {props.children}
        </Box>
        :
        null
    )
}

export default SideExplorerContentMenu
