import React from 'react'
import { Box, AccordionPanel, Accordion } from 'grommet'
import './SideExplorerContentMenu.scss'

// Grab Theme Colours for Accordion

const SideExplorerContentMenu = (props) => {
   

    return (
        props.navOpen ? 
        <Box fill='horizontal' className='content-menu-box'>
        {/* <Accordion margin={{"left":"50px"}}
        > 
            <AccordionPanel 
                style={{textTransform: 'capitalize'}}
                label= { props.active + " Notes"}
                alignSelf='center'
            > */}
                {props.children}
            {/* </AccordionPanel> */}
        {/* </Accordion> */}
        </Box>
        :
        null
    )
}

export default SideExplorerContentMenu
