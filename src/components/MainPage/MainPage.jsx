import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import Appointments from './Appointments/Appointments';
import Header from './Header/Header';
import DoctorsCard from './Main/DoctorsCard/DoctorsCard';
import Profile from './Main/Profile/Profile';
import s from './MainPage.module.css';
import Navbar from './Navbar/Navbar';

function NewTitle(props) {
    return (
        props.nav ?
            <NavLink to={props.nav} className={`${s.newTitleRow}  ${props.active ? s.activeTitle : ""}`}>
                {props.svg}
                <h1 className={s.newTitle}>{props.title}</h1>
            </NavLink>
            :
            <div className={`${s.newTitleRow}  ${props.active ? s.activeTitle : ""}`}>
                {props.svg}
                <h1 className={s.newTitle}>{props.title}</h1>
            </div>

    )
}

NewTitle.defaultProps = {
    nav: null
}

export default function MainPage(props) {
    const data = useSelector(state => state.profile.data)
    const location = useLocation()
    const titles = [{ path: "/profile", title: "Записи на прием", svg: null, nav: null }, { path: "/doctors", title: "Врачи и клиники", svg: null, nav: null }, { path: "/messages", title: "Сообщение", svg: null, nav: null }, { path: "/tests", title: "Тесирование", svg: null, nav: null }, { path: "/welltoknow", title: "Полезно знать", svg: null, nav: null }, {
        path: "/profile/appointments", title: "Мои запись", svg: <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.49021 13.7135C6.03153 13.7135 5.58274 13.5346 5.24546 13.1969L0.581486 8.52714C-0.240704 7.70412 -0.240704 6.36489 0.581486 5.54174L5.24546 0.872132C5.75097 0.365937 6.50697 0.216522 7.17137 0.491456C7.83343 0.765427 8.26121 1.40318 8.26121 2.11592V6.3664H17.2618C17.6501 6.3664 17.9649 6.6813 17.9649 7.06966C17.9649 7.45803 17.6501 7.77279 17.2618 7.77279H8.26121C7.48571 7.77279 6.85482 7.1419 6.85482 6.3664V2.11592C6.85482 1.90526 6.70005 1.81847 6.63359 1.79086C6.56574 1.76285 6.39202 1.7141 6.24041 1.86598L1.57644 6.53559C1.30164 6.81066 1.30164 7.25822 1.57644 7.53342L6.24041 12.203C6.39202 12.3548 6.56574 12.306 6.63345 12.278C6.70005 12.2505 6.85482 12.1638 6.85482 11.9531V10.4403C6.85482 10.0519 7.16958 9.73701 7.55795 9.73701C7.94632 9.73701 8.26107 10.0519 8.26107 10.4403V11.9531C8.26107 12.6658 7.83329 13.3034 7.17123 13.5774C6.95027 13.669 6.719 13.7135 6.49021 13.7135Z" fill="black" />
        </svg>, nav: "/profile"
    }]

    const [currentLocation, setCurrentLocation] = React.useState(location.pathname)
    React.useEffect(() => setCurrentLocation(location.pathname), [location.pathname])
    
    return (
        <section className={s.wrapper}>
            <header className={s.header}>
                <Header data={data} />
            </header>
            <main className={s.main}>
                <div className={s.titles}>
                    {titles.map((item, key) => <NewTitle key={`title${key}`} nav={item.nav} svg={item.svg} active={item.path === currentLocation} title={item.title} />)}
                </div>
                <Switch>
                    <Route exact path="/profile" render={() => <Profile data={data} />} />
                    <Route exact path="/profile/appointments" render={() => <Appointments data={data} />} />
                </Switch>
            </main>
            <div className={s.logo}>
                <h1>Лого</h1>
            </div>
            <nav className={s.nav}>
                <Navbar />
            </nav>
        </section>
    )
}