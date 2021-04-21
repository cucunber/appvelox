import React from 'react';
import s from './StaticInput.module.css';

export default function StaticInput(props){
    const [onFocus, setOnFocus] = React.useState(false);
    return(
        <div className={`${s.wrapper} ${props.error ? s.error : ""}`}>
            <label className={`${s.passLabel} ${(onFocus || props.value) ? s.activeLabel : ""}`} htmlFor={`input${props.num}`}>{props.name}</label>
            <input id={`input${props.num}`} className={s.formInput} onChange={props.inputHandler} value={props.value} type={props.type} onFocus={()=>setOnFocus(true)} onBlur={()=>setOnFocus(false)}/>
        </div>
    )
}

StaticInput.defaultProps = {
    type: "text",
    error: false,
}