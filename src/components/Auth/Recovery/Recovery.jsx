import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { setPassword } from '../../../redux/RecoveryReducer';
import Password from '../../forms/PasswordInput/PasswordInput';
import s from './Recovery.module.css';

export default function Recovery(props) {
    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')
    const [showPass1, setShowPass1] = React.useState(false)
    const [showPass2, setShowPass2] = React.useState(false)
    const [lower, setLower] = React.useState(false)
    const [upper, setUpper] = React.useState(false)
    const [number, setNumber] = React.useState(false)
    const [length, setLength] = React.useState(false)
    const dispatch = useDispatch();
    const error = useSelector(state => state.example.error)
    const changed = useSelector(state => state.recovery.changePass)

    const flags = [lower, upper, number, length]
    const validators = ["Прописная буква", "Заглавная буква", "Число", "Длина не менее 8 символов"]

    function Validate(props) {
        return (
            <span className={`${s.validate} ${props.accept ? s.accept : ""}`}>
                <span className={s.before}></span>
                <span className={s.after}></span>
                <p > {props.name} </p>
            </span>
        )
    }

    function checkPass(pass) {
        String(pass)
        if (pass.search(/[a-z]/) !== -1) {
            setLower(true)
        } else {
            setLower(false)
        }
        if (pass.search(/[A-Z]/) !== -1) {
            setUpper(true)
        } else {
            setUpper(false)
        }
        if (pass.search(/[0-9]/) !== -1) {
            setNumber(true)
        } else {
            setNumber(false)
        }
        if (pass.length >= 8) {
            setLength(true)
        } else {
            setLength(false)
        }
    }

    function pass1Handler(e) {
        e.preventDefault()
        checkPass(e.target.value)
        setPass1(e.target.value)
    }

    function pass2Handler(e) {
        e.preventDefault()
        setPass2(e.target.value)
    }

    function handlerSubmit(e) {
        dispatch(setPassword(pass1, pass2))
        e.preventDefault()
    }

    return (
        <main className={`${s.wrapper} ${error ? s.error : ""}`}>
            <form onSubmit={handlerSubmit} onKeyDown={(e) => e.keyCode === 13 && handlerSubmit(e)} className={s.form}>
                <h2 className={s.formTitle}>Восстановление пароля</h2>
                <h4 className={s.formSubtitle}>Придумайте новый пароль</h4>
                <div className={s.passwordsRow}>
                    <Password error={error.status} setShowPass={setShowPass1} num={1} pass={pass1} passHandler={pass1Handler} showPass={showPass1} name={"Новый пароль"} />
                    <Password error={error.status} setShowPass={setShowPass2} num={2} pass={pass2} passHandler={pass2Handler} showPass={showPass2} name={"Повторите пароль"} />
                </div>
                <div className={s.validateRow}>
                    {validators.map((item, key) => <Validate key={`val${key}`} name={item} accept={flags[key]} />)}
                </div>
                <div className={`${s.errors} ${error.status && s.activeError}`}>{error.msg}</div>
                <input disabled={(pass1 && pass2 && lower && upper && number && length) ? false : true} type="submit" className={s.formSubmit} value="Изменить пароль" />
                <div className={`${s.okey} ${changed ? s.showMsg : ""}`}>Пароль успешно изменен. Перенаправляем на страницу входа...</div>
                {changed && <Redirect to="/auth"/>}
            </form>
        </main>
    )
}