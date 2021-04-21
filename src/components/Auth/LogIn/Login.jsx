import React from 'react';
import s from './Login.module.css';
import Password from '../../forms/PasswordInput/PasswordInput';
import StaticInput from '../../forms/StaticInput/StaticInput';
import { useDispatch, useSelector } from 'react-redux';
import { enterUser } from '../../../redux/ExampleDataReducer';
import { NavLink } from 'react-router-dom';

export default function Login() {
    const [showPass, setShowPass] = React.useState(false);
    const [login, setLogin] = React.useState('');
    const [pass, setPass] = React.useState('');

    const data = useSelector(state=>state.example)
    const error = useSelector(state => state.example.error)
    const dispatch = useDispatch();

    function loginHandler(e) {
        e.preventDefault()
        setLogin(e.target.value)
    }

    function passHandler(e) {
        e.preventDefault()
        setPass(e.target.value)
    }

    function onSubmit(e) {
        dispatch(enterUser(login, pass,data))
        e.preventDefault()
    }

    return (
        <section className={s.wrapper}>
            <main className={s.main}>
                <form className={s.form} onSubmit={onSubmit}  onKeyDown={(e) => e.keyCode === 13 && onSubmit(e)}>
                    <h2 className={s.formTitle}>Вход</h2>
                    <h4 className={s.formSubtitle}>У Вас нет аккаунта? <NavLink to="/auth/registration" className={`${s.formSubtitle} ${s.ligthBlue}`} >Зарегестрироваться</NavLink ></h4>
                    <StaticInput error={error.status} value={login} num={1} inputHandler={loginHandler} name="Почта или телефон" />
                    <Password error={error.status} setShowPass={setShowPass} num={1} pass={pass} passHandler={passHandler} showPass={showPass} name={"Пароль"}/>
                    <h4 className={`${s.formSubtitle} ${s.left}`}>Забыли пароль? <NavLink to="/auth/code" className={`${s.formSubtitle} ${s.ligthBlue}`}>Восстановить</NavLink></h4>

                    <div className={`${s.errors} ${error.status && s.activeError}`}>{error.msg}</div>

                    <input disabled={(login && pass) ? false : true} type="submit" className={s.formSubmit} value="Войти" />
                </form>
            </main>
        </section>
    )
}