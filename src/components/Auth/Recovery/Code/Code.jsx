import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { checkCode, sendUserCode } from '../../../../redux/RecoveryReducer';
import RecoveryNumb from '../../../forms/RecoveryNumb/RecoveryNumb';
import s from './Code.module.css';

export default function Code() {
    const [firstNumb, setFirstNumb] = React.useState('')
    const [secondNumb, setSecondNumb] = React.useState('')
    const [thirdNumb, setThirdNumb] = React.useState('')
    const [fourthNumb, setFourthNumb] = React.useState('')
    const [fifthNumb, setFifthNumb] = React.useState('')
    const [sixthNumb, setSixthNumb] = React.useState('')
    const error = useSelector(state => state.example.error);
    const dispatch = useDispatch();
    const [refs, setRefs] = React.useState([]);

    const code = useSelector(state=>state.recovery.code);
    const confirmed = useSelector(state=>state.recovery.confirmed);

    React.useEffect(() => dispatch(sendUserCode()), [])


   
    const handlers = [setFirstNumb, setSecondNumb, setThirdNumb, setFourthNumb, setFifthNumb, setSixthNumb]
    const values = [firstNumb, secondNumb, thirdNumb, fourthNumb, fifthNumb, sixthNumb]

    function handlerSubmit(e) {
        let res = values.reduce((acc, value) => acc + `${value}`, "")
        dispatch(checkCode(res, code))
        e.preventDefault()
    }

    function addRef(ref) {
        const newRefs = refs
        newRefs.push(ref);
        setRefs(newRefs)
    }

    function onBackspaceDown(id) {
        return function (e) {
            e.preventDefault()
            if (e.key === "Backspace" || e.key === "Delete") {
                if (id > 0) {
                    refs[id - 1].current.focus()
                    handlers[id - 1]('')
                } else {
                    refs[handlers.length - 1].current.focus()
                    handlers[handlers.length - 1]('')
                }
            } else if (e.target.value < 10 && e.target.value >= 0 && (parseInt(e.key) >= 1 && parseInt(e.key) <= 9)) {
                handlers[id](e.key)
                if (id < handlers.length - 1) {
                    refs[id + 1].current.focus()
                } else {
                    refs[0].current.focus()
                }
            } else if (e.key === "ArrowLeft") {
                if (id > 0) {
                    refs[id - 1].current.focus()
                } else {
                    refs[handlers.length - 1].current.focus()
                }
            } else if (e.key === "ArrowRight") {
                if (id < handlers.length - 1) {
                    refs[id + 1].current.focus()
                } else {
                    refs[0].current.focus()
                }
            }

        }

    }
    
    return (
        <main className={`${s.wrapper} ${error ? s.error : ""}`}>
            {confirmed && <Redirect to="/recovery" />}
            <form onSubmit={handlerSubmit} onKeyDown={(e) => e.keyCode === 13 && handlerSubmit(e)} className={s.form}>
                <h2 className={s.formTitle}>Восстановление пароля</h2>
                <h4 className={s.formSubtitle}>На ваш номер выслан код восстановления</h4>
                <div className={s.inputs}>
                    {handlers.map((item, key) => {
                        return <RecoveryNumb addRef={addRef} key={`rn${key + 1}`} tbIndex={key + 1} error={error.status} value={values[key]} onBackspaceDown={onBackspaceDown(key)} />
                    })}
                </div>
                <button className={`${s.formSubtitle} ${s.ligthBlue}`}>Повторить отправку кода</button>
                <div className={`${s.errors} ${error.status && s.activeError}`}>{error.msg}</div>
                <input disabled={(firstNumb && secondNumb && thirdNumb && fourthNumb && fifthNumb && sixthNumb) ? false : true} type="submit" className={s.formSubmit} value="Войти" />
                <button style={{ textDecoration: "none" }} className={`${s.formSubtitle} ${s.ligthBlue}`}>Другой способ восстановления</button>
            </form>
        </main>
    )
}