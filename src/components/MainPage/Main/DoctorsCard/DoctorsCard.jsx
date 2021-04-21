import React, { useEffect } from 'react';
import s from './DoctorsCard.module.css';
import nullDoctor from '../../../../assets/imgs/nullDoctor.png';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../../forms/Preloader/Preloader';
import { delAppointment } from '../../../../redux/ProfileReducer';


export const returnDay = (date) => {
    const days = ["Воскресень", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const parts = date.split('.')
    const requiredDate = new Date(parts[2], parts[1] - 1, parts[0]).getDay()
    return days[requiredDate]
}

export const returnSmallDate = (date) => {
    return date.slice(0, 6) + date.slice(8, 10)
}

export default function DoctorsCard(props) {
    const [del, setDel] = React.useState(true)

    const dispatch = useDispatch()
    const isFetching = useSelector(state=>state.profile.isFetching)

    function acceptHandler(e, id){
        e.preventDefault()
        dispatch(delAppointment(id))
    }

    useEffect(()=>!isFetching && setDel(true),[isFetching])

    return (
        <section className={s.wrapper}>
            <div className={`${s.preloader} ${isFetching && !del ? s.showPreloader : ""}`}>
                <Preloader />
            </div>
            <div className={s.date}>
                <h3>{returnDay(props.data.date.date)} {returnSmallDate(props.data.date.date)} | {props.data.date.time}</h3>
                <p>{props.data.place.hospital}</p>
                <p>{props.data.place.adress}</p>
            </div>
            <div className={s.doctor}>
                <div className={s.doctorImg}>
                    <img src={props.data.doctor.img ? props.data.doctor.img : nullDoctor} alt="" />
                </div>
                <div className={s.doctorInfo}>
                    <h4>{props.data.doctor.name}</h4>
                    <p>{props.data.doctor.job}</p>
                </div>
                <div className={s.btns}>
                    {del ?
                        <button onClick={()=>setDel(false)} className={s.cancel}>Отменить</button> :
                        <div className={s.optionBtns}>
                            <button className={s.accept} onClick={(e)=>acceptHandler(e,props.data.id)}></button>
                            <button className={s.decline} onClick={()=>setDel(true)}></button>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

DoctorsCard.defaultProps = {

}