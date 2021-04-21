import React from 'react';
import s from './SuccessReg.module.css';
import doctors from '../../../assets/imgs/successReg.svg';
import logo from '../../../assets/imgs/logolight.png'

export default function SuccessReg() {
    return (
        <section className={s.wrapper}>
            <header className={s.header}>
                <h4 className={s.headerTitle}>Портал пациента</h4>
            </header>
            <main className={s.main}>
                <h2>Вы успешно зарегистрировались!</h2>
                <h4>Давайте приступим</h4>
                <img src={doctors} alt="" />
            </main>
            <footer className={s.footer}>
                <img src={logo} alt="" />
            </footer>
        </section>
    )
}