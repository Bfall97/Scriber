import React from 'react'
import './IconMenu.scss'

const SideExplorerIconMenu = (props) => {
    return (
        <div className='icon-menu'>
        {props.icons.map((icon,index) =>
            <div className='icon' key={index}>{icon}</div>
        )}
        </div>
    )
}

export default SideExplorerIconMenu
