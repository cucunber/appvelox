import React, { useEffect } from 'react';
import s from './Auth.module.css';
import doctors from './../../assets/imgs/authDoctors.svg';
import doctors2 from './../../assets/imgs/doctors2.png'
import Login from './LogIn/Login';
import Preloader from '../forms/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, Router, useLocation } from 'react-router';
import Registration from './Registration/Registration';
import Recovery from './Recovery/Recovery';
import Header from './Header/Header';
import logo from '../../assets/imgs/logo.png';
import Code from './Recovery/Code/Code';
import SuccessReg from './SuccessReg/SuccessReg';

export default function Auth(props) {
    const [theme, setTheme] = React.useState(false);

    const init = useSelector(state => state.example.initialized)
    const registered = useSelector(state => state.example.registered)
    
    const location = useLocation();

    useEffect(() => location.pathname==="/registration" ? setTheme(true) : setTheme(false), [location.pathname])

    return (
        <section className={s.wrapper}>
            <div className={`${s.register} ${registered ? s.show : ""}`}>
                <SuccessReg />
            </div>
            <div className={s.loginWrapper}>
                <div className={`${s.preload} ${init ? s.showLoader : ""}`}>
                    <Preloader />
                </div>
                <div className={s.loginBody}>
                    <Header />
                    <div className={s.mainForm}>
                        <Switch>
                            <Route exact path="/registration" component={Registration} />
                            <Route exact path="/code" component={Code} />
                            <Route exact path="/recovery" component={Recovery} />
                            <Route exact path="/" component={Login} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                    <footer className={s.footer}>
                        <img src={logo} alt="appvelox" />
                    </footer>
                </div>

            </div>
            <div className={s.imgWrapper}>
                <div className={s.wellcomTitle}>
                    <h2 className={theme ? s.show1 : s.hide1}> Начните следить за своим здоровьем вместе с нами</h2>
                    <h2 className={!theme ? s.show2 : s.hide2}>Добро пожаловать!</h2>
                </div>
                <div className={s.imgBox}>
                    <img className={theme ? s.show1 : s.hide1} src={doctors2} alt="doctors"/>
                    <img className={!theme ? s.show2 : s.hide2} src={doctors} alt="doctors" />
                </div>
                <div className={s.wellcomSubtitle}>
                    <h4>Вместе с нами медицина стала проще!</h4>
                </div>
            </div>
        </section>
    )
}