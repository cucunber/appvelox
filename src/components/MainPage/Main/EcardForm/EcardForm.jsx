import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './EcardForm.module.css';

export default function EcardForm(props) {
    const [active, setActive] = React.useState(false);

    return (
        <NavLink to={props.route} className={`${s.wrapper} ${active ? s.active : ""}`} onMouseOver={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
            <div className={s.body}>
                <div className={s.svgBody}>
                    {props.svg}
                </div>
                <div className={s.info}>
                    <div className={s.title}>
                        <h1>{props.title}</h1>
                        <div className={s.underline}></div>
                    </div>
                    <div className={s.items}>
                        {props.children}
                    </div>
                </div>
            </div>
        </NavLink>
    )
}