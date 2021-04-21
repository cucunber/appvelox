import React from 'react';
import s from './Tooltip.module.css';

export default function Tooltip(props){
    return(
        <div className={`${s.tooltip} ${props.active ? s.active : ''}`}>
            <span>{props.tooltip}</span>
        </div>
    )
}

Tooltip.defaultProps={
    tooltip: "I'm tooltip!"
}