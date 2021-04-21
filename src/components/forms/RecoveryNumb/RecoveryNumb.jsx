import React, { useEffect } from 'react';
import s from './RecoveryNumb.module.css';

export default function RecoveryNumb(props){
    const ref = React.useRef();
    useEffect(()=>
        props.addRef(ref),[]);
    return(
        <input tabIndex={props.tbIndex} ref={ref} className={`${s.style} ${props.error ? s.error : ""}`} type="number" value={props.value} onKeyDown={props.onBackspaceDown} />
    )
}