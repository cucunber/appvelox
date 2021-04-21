import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { addUserToData } from '../../../redux/ExampleDataReducer';
import MyDatePicker from '../../forms/DatePicker/DatePicker';
import Password from '../../forms/PasswordInput/PasswordInput';
import StaticInput from '../../forms/StaticInput/StaticInput';
import s from './Registration.module.css';

function Step(props) {
    return (
        <div className={s.stepRow} onClick={() => props.canChange && props.setForm(props.step)}>
            <span className={s.stepCircle} style={{ background: `linear-gradient(90deg, #5749b3 0%, #5749b3 ${props.done}%, #fff ${props.done}%, #fff 100%)` }}>
                <span className={props.disactive ? s.circleNameDisactive : s.circleName}>{props.done >= "100" ? <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.20832 11.6555C4.64425 11.6555 4.1008 11.435 3.69491 11.0361L0.163509 7.56586C-0.0519297 7.35416 -0.0549204 7.00788 0.15678 6.79254C0.36848 6.57711 0.714763 6.57401 0.930202 6.78571L4.4615 10.2559C4.68313 10.4737 4.98776 10.5838 5.29741 10.5581C5.60705 10.5322 5.88935 10.3733 6.0719 10.1219L13.0106 0.565433C13.188 0.321048 13.53 0.266788 13.7744 0.444202C14.0188 0.621723 14.073 0.963733 13.8956 1.20812L6.95694 10.7644C6.58715 11.2737 6.01539 11.5958 5.3882 11.648C5.32817 11.653 5.26803 11.6555 5.20832 11.6555Z" fill="black" />
                </svg>
                    : props.step}</span>
            </span>
            <span className={`${s.stepName} ${props.disactive ? s.disactive : ""}`}>{props.name}</span>
        </div>
    )
}

function Validate(props) {
    return (
        <span className={`${s.validate} ${props.accept ? s.accept : ""}`}>
            <span className={s.before}></span>
            <span className={s.after}></span>
            <p > {props.name} </p>
        </span>
    )
}

function ThirdForm(props) {
    const [surname, setSurname] = React.useState('')
    const [name, setName] = React.useState('')
    const [secondName, setSecondName] = React.useState('')
    const [logNumber, setLogNumber] = React.useState('')

    function surnameHandler(e) {
        e.preventDefault()
        setSurname(e.target.value)
    }

    function nameHandler(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function secondNameHandler(e) {
        e.preventDefault()
        setSecondName(e.target.value)
    }

    function numberHandler(e) {
        e.preventDefault()
        setLogNumber(e.target.value)
    }

    useEffect(() => {
        let newData = {
            surname: surname !== '' ? surname : '',
            name: name !== '' ? name : '',
            secondName: secondName ? secondName : '',
            number: logNumber
        }
        props.setThirdForm(newData)
    }, [surname, name, secondName, logNumber])

    return (
        <div className={s.form}>
            <p style={{ lineHeight: "17px", fontSize: "14px", margin: "15px 0" }}>
                Укажите данные вашего представителя (например, член семьи) или иного лица для экстренного информирования
            </p>
            <StaticInput name="Фамилия" num={10} inputHandler={surnameHandler} value={surname} />
            <StaticInput name="Имя" num={11} inputHandler={nameHandler} value={name} />
            <StaticInput name="Отчество" num={12} inputHandler={secondNameHandler} value={secondName} />
            <StaticInput type={"number"} value={logNumber} num={13} inputHandler={numberHandler} name="Телефон" />
            <button className={s.nextBtn} disabled={!(surname && logNumber && secondName && secondName)} onClick={(e) => {
                props.onSubmit(e)
                e.preventDefault()
            }} onKeyDown={(e) => e.keyCode === 13 && (surname && logNumber && secondName && secondName) && props.onSubmit(e)}>{!(surname && logNumber && secondName && secondName) ? "Заполните все поля" : "Зарегистрироваться"}</button>
        </div>
    )
}

function SecondForm(props) {
    const [surname, setSurname] = React.useState('')
    const [name, setName] = React.useState('')
    const [secondName, setSecondName] = React.useState('')
    const [registration, setRegistration] = React.useState('')
    const [livePlace, setLivePlace] = React.useState('')
    const [sex, setSex] = React.useState(true)
    const [date, setDate] = React.useState('')

    function surnameHandler(e) {
        e.preventDefault()
        setSurname(e.target.value)
    }

    function nameHandler(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function secondNameHandler(e) {
        e.preventDefault()
        setSecondName(e.target.value)
    }

    function registrationHandler(e) {
        e.preventDefault()
        setRegistration(e.target.value)
    }

    function livePlaceHandler(e) {
        e.preventDefault()
        setLivePlace(e.target.value)
    }

    useEffect(() => {
        let newData = {
            surname: surname !== '' ? surname : '',
            name: name !== '' ? name : '',
            secondName: secondName ? secondName : '',
            sex: sex,
            date: date !== '' ? date : '',
            registration: registration !== '' ? registration : '',
            livePlace: livePlace !== '' ? livePlace : '',
        }
        props.setSecondForm(newData)
    }, [surname, name, secondName, sex, date, registration, livePlace])
    return (
        <div className={s.form} style={{ overflow: "visible" }}>
            <StaticInput name="Фамилия" num={5} inputHandler={surnameHandler} value={surname} />
            <StaticInput name="Имя" num={6} inputHandler={nameHandler} value={name} />
            <StaticInput name="Отчество" num={7} inputHandler={secondNameHandler} value={secondName} />
            <div className={s.sexPicker}>
                <div className={s.sexPickerBody}>
                    <span>Пол:</span>
                    <div className={`${s.sexCircle} ${!sex ? s.sexActive : ''}`} onClick={() => setSex(false)}>
                        <span>М</span>
                    </div>
                    <div className={`${s.sexCircle} ${sex ? s.sexActive : ''}`} onClick={() => setSex(true)}>
                        <span>Ж</span>
                    </div>
                </div>
                <MyDatePicker setDate={setDate} />
            </div>
            <StaticInput name="Адрес регистрации" num={8} inputHandler={registrationHandler} value={registration} />
            <StaticInput name="Адрес места жительства" num={9} inputHandler={livePlaceHandler} value={livePlace} />
            <button style={{maxWidth: props.width+"px"}} className={s.nextBtn} disabled={!(surname && name && secondName && date && registration && livePlace)} onClick={(e) => {
                e.preventDefault()
                props.setForm(3)
            }} onKeyDown={(e) => e.keyCode === 13 && (surname && name && secondName && date && registration && livePlace) && props.setForm(3)}>{!(surname && name && secondName && date && registration && livePlace) ? "Заполните все поля" : "Далее"}</button>
        </div>
    )
}

function FirstForm(props) {
    const [isValidate, setIsValidate] = React.useState(true)
    const [login, setLogin] = React.useState('')
    const [logNumber, setLogNumber] = React.useState('')
    const [pass1, setPass1] = React.useState('')
    const [pass2, setPass2] = React.useState('')
    const [showPass1, setShowPass1] = React.useState(false)
    const [showPass2, setShowPass2] = React.useState(false)
    const [wasActive, setWasActive] = React.useState(false)
    const [check, setCheck] = React.useState(false)
    const [oLat, setOLat] = React.useState(false)

    const [hasA, setHasA] = React.useState(false)
    const [hasDot, setHasDot] = React.useState(false)

    const [lower, setLower] = React.useState(false)
    const [upper, setUpper] = React.useState(false)
    const [number, setNumber] = React.useState(false)
    const [length, setLength] = React.useState(false)

    const flags = [lower, upper, number, length]
    const validators = ["Прописная буква", "Заглавная буква", "Число", "Длина не менее 8 символов"]

    function checkEmail(email) {
        if (email.search('@') !== -1) {
            setHasA(true)
        } else {
            setHasA(false)
        }
        if (email.indexOf('.') !== -1) {
            setHasDot(true)
        } else {
            setHasDot(false)
        }
        if (email.search(/[а-я]/i) === -1) {
            setOLat(true)
        } else {
            setOLat(false)
        }
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

    function loginHandler(e) {
        e.preventDefault()
        if (!wasActive) {
            setWasActive(true)
        }
        checkEmail(e.target.value)
        setLogin(e.target.value)
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

    function numberHandler(e) {
        e.preventDefault()
        setLogNumber(e.target.value)
    }

    useEffect(() => {
        if (pass1 === pass2 && (lower && lower && number && length)) {
            setIsValidate(false)
        } else {
            setIsValidate(true)
        }
    }, [pass1, pass2])

    useEffect(() => {
        let newData = {
            login: (login !== '' && (hasA && hasDot && oLat)) ? login : '',
            number: logNumber !== '' ? logNumber : '',
            password: (pass1 === pass2 && (lower && lower && number && length)) ? pass1 : '',
            check: check || '',
        }
        props.setFirstForm(newData)
    }, [login, logNumber, pass1, pass2, check])

    const error = { status: false }
    return (
        <div className={s.form}>
            <StaticInput error={((!hasA || !hasDot || !oLat) && wasActive)} value={login} num={1} inputHandler={loginHandler} name="Почта" />
            <div className={`${s.notMatchEmail} ${((!hasA || !hasDot) && wasActive) && s.activeNotMatch}`}>
                <span>Неверно введена почта</span>
            </div>
            <StaticInput type={"number"} error={error.status} value={logNumber} num={2} inputHandler={numberHandler} name="Телефон" />
            <Password error={error.status} setShowPass={setShowPass1} num={1} pass={pass1} passHandler={pass1Handler} showPass={showPass1} name={"Пароль"} />
            <Password error={error.status} setShowPass={setShowPass2} num={2} pass={pass2} passHandler={pass2Handler} showPass={showPass2} name={"Повторите пароль"} />
            <div className={s.itemsWrapper} style={{maxWidth: props.width+"px"}}>
                <div style={{width: props.width*2+"px"}} className={`${s.slider} ${!isValidate ? s.disactiveValid : ""}`}>
                    <div className={s.sliderItem} style={{maxWidth: props.width+"px"}}>
                        <div className={s.validateRow}>
                            {validators.map((item, key) => <Validate key={`val${key}`} name={item} accept={flags[key]} />)}
                            <div className={`${s.notMatch} ${pass1 !== pass2 && s.activeNotMatch}`}>
                                <span>Пароли не совпадают</span>
                            </div>
                        </div>

                    </div>
                    <div className={s.sliderItem} style={{maxWidth: props.width+"px"}}>
                        <div className={s.check}>
                            <input type="checkbox" checked={check} onChange={() => setCheck(!check)} id="cb3" /> <label htmlFor="cb3">Я согласен на:</label>
                        </div>
                        <div>
                            <a className={` ${s.formSubtitle} ${s.ligthBlue} ${s.tag}`} href="#" target="_blank">Обработку персональных данных (ФЗ 152)</a>
                            <p className={`${s.formSubtitle} ${s.tag}`} >Передачу персональных данных третьим лицам</p>
                            <p className={`${s.formSubtitle} ${s.tag}`} >Обращение для информирования и напоминания</p>
                            <button style={{maxWidth: props.width+"px"}} className={s.nextBtn} disabled={!(login && logNumber && check)} onClick={(e) => {
                                e.preventDefault()
                                props.setForm(2)
                            }} onKeyDown={(e) => e.keyCode === 13 && (login && logNumber && check) && props.setForm(2)}>{!(login && logNumber && check) ? "Заполните все поля" : "Далее"}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default function Registration(props) {

    const [firstFormData, setfirstForm] = React.useState({})
    const [secondFormData, setSecondForm] = React.useState({})
    const [thirdFormData, setThirdForm] = React.useState({})
    const [currentForm, setCurrentForm] = React.useState(1)

    const registered = useSelector(state => state.example.registered)
    const data = useSelector(state => state.example.users)
    const dispatch = useDispatch();

    function onSubmit(e) {
        dispatch(addUserToData(firstFormData, secondFormData, thirdFormData, data.length))
        e.preventDefault()
    }

    const [height, setHeight] = React.useState(350);
    useEffect(() => { setHeight(document.getElementById('form').clientWidth) })

    console.log(height)
    return (
        <section className={s.wrapper}>
            {registered && <Redirect to="/" />}
            <main className={s.main}>
                <h2 className={s.formTitle}>Регистрация</h2>
                <h4 className={s.formSubtitle}>У Вас уже есть аккаунт? <NavLink to="/" className={`${s.formSubtitle} ${s.ligthBlue}`} >Войти</NavLink ></h4>
                <div className={s.steps}>
                    <Step setForm={setCurrentForm} canChange={true} done={firstFormData.valid() * 25} name={"Данные для входа"} step={1} />
                    <span className={s.lineWrapper}>
                        <span className={`${s.lineBack} ${(currentForm === 2 || secondFormData.valid() - 2 > 0) ? s.full : ''}`}></span>
                    </span>
                    <Step setForm={setCurrentForm} canChange={secondFormData.valid() > 2} done={(secondFormData.valid() - 2) * 20} name={"Личная информация"} step={2} disactive={secondFormData.valid() === 2} />
                    <span className={s.lineWrapper}>
                        <span className={`${s.lineBack} ${(currentForm === 3 || thirdFormData.valid() > 0) ? s.full : ''}`}></span>
                    </span>
                    <Step done={thirdFormData.valid() * 25} setForm={setCurrentForm} canChange={thirdFormData.valid()} name={"Представители"} step={3} disactive={thirdFormData.valid() > 0 ? false : currentForm !== 3 ? true : false} />
                </div>
                <form id="form" className={s.form} onSubmit={onSubmit} onKeyDown={(e) => e.keyCode === 13 && firstFormData.valid() === 4 && secondFormData.valid() === 7 && thirdFormData.valid() === 4 && onSubmit(e)}>
                    <div className={s.formsWrapper} style={{ maxWidth: height + "px", minWidth: height + "px"}}>
                        <div className={s.formsSlider} style={{ width: height * 3 + "px", left: currentForm === 1 ? "0" : currentForm === 2 ? "-100%" : currentForm === 3 ? "-200%" : "0" }}>
                            <div className={s.formsSliderItem} style={{ maxWidth: height + "px", width: height + "px" }}>
                                <FirstForm setForm={setCurrentForm} setFirstForm={setfirstForm} width={height}/>
                            </div>
                            <div className={s.formsSliderItem} style={{ maxWidth: height + "px", width: height + "px" }}>
                                <SecondForm setForm={setCurrentForm} setSecondForm={setSecondForm} width={height}/>
                            </div>
                            <div className={s.formsSliderItem} style={{ maxWidth: height + "px", width: height + "px" }}>
                                <ThirdForm setForm={setCurrentForm} setThirdForm={setThirdForm} onSubmit={onSubmit} />
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </section>
    )
}