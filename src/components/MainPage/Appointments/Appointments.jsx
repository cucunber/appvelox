import React, { useEffect } from 'react';
import s from './Appointments.module.css';
import MyCalendare from '../../forms/Calendare/Calendare';
import DoctorsCard from '../Main/DoctorsCard/DoctorsCard';

export default function Appointments(props){
    const [data, setData] = React.useState(props.data.appointments)

    useEffect(()=>setData(props.data.appointments), [props.data.appointments])
    return(
        <section className={s.wrapper}>
            <div className={s.appointments}>
            {
                data !== props.data.appointments &&
                <div className={s.showAll} onClick={()=>setData(props.data.appointments)}>
                    <span>Показать все записи</span>
                </div>
            }
                <div className={s.appointmentsRow}>
                    {data.map((item, key) => <DoctorsCard key={`card${key}`} data={item} />)}
                </div>
            </div>
            <div className={s.calendare}>
                <MyCalendare appoints={props.data.appointments} setDate={setData}/>
            </div>
        </section>
    )
}