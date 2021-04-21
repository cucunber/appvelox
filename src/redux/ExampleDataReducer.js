import { setCurrentUser, setInitUser } from './ProfileReducer';
import Malyshko from '../assets/imgs/Malyshko.png';
import Harkov from '../assets/imgs/Harkov.png';

const ADD_USER_TO_DATA = "ADD_USER_TO_DATA";
const SET_INIT = "SET_INIT";
const SET_ERROR = "SET_ERROR";
const SET_REGISTERED = "SET_REGISTERED";


let initialState = {
    initialized: false,
    registered: false,
    error: {
        status: false,
        numb: null,
        msg: ""
    },
    users: [
        { login: { login: "ivanov@gmail.com", password: "1234", number: 80000000000 }, personal: { surname: "Иванов", name: "Иван", secondName: "Иванович", sex: false, date: "18.04.2003", registration: "Санкт-Петербург", livePlace: "Санкт-Петербург", }, representatives: { surname: "Иванова", name: "Анна", surname: "Владимировна", number: 80001234567 }, img: null, appointments: [{ id: 1, date: { time: "15:30", date: "15.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: null, job: "Хирург" } }], id: 1 },
        { login: { login: "1", password: "1", number: 80000000001 }, personal: { surname: "Иванова", name: "Анная", secondName: "Владимировна", sex: true, date: "15.10.1076", registration: "Санкт-Петербург", livePlace: "Санкт-Петербург", }, representatives: { surname: "Сидоров", name: "Владимир", surname: "Константинович", number: 80007654321 }, img: null, appointments: [{ id: 1, date: { time: "15:30", date: "15.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: Malyshko, job: "Хирург" } }, { id: 2, date: { time: "15:30", date: "01.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: Malyshko, job: "Хирург" } }, { id: 3, date: { time: "15:30", date: "27.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: Malyshko, job: "Хирург" } }, { id: 4, date: { time: "18:30", date: "15.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Харьков В. С.", img: Harkov, job: "Терапевтическое отделение" } }], id: 2 }
    ]
}

const ExmapleDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_TO_DATA: {
            return {
                ...state, users: [...state.users, action.payload]
            }
        }
        case SET_INIT: {
            return {
                ...state, initialized: action.status
            }
        }
        case SET_ERROR: {
            return {
                ...state, error: action.error,
            }
        }
        case SET_REGISTERED: {
            return {
                ...state, registered: action.status
            }
        }

        default: {
            return state
        }
    }
}

const addEmailAndPassword = (data1, data2, data3, id) => ({
    type: ADD_USER_TO_DATA, payload: { login: data1, personal: data2, representatives: data3, img: null, appointments: [], id: id }
})

export const setInit = (status) => ({
    type: SET_INIT, status
})

export const setError = (error) => ({
    type: SET_ERROR, error
})

const setRegistered = (status) => ({
    type: SET_REGISTERED, status
})

export const addUserToData = (data1, data2, data3, id) => (dispatch) => {
    //create pseudo request to server
    dispatch(setInit(true))
    let request = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ status: false })
        }, 2000)
    })
    request.then(data => dispatch(addEmailAndPassword(data1, data2, data3, id))).then(data => dispatch(setInit(false))).then(data => dispatch(setRegistered(true))).then(data => setTimeout(() => dispatch(setRegistered(false)), 3000))
}

export const enterUser = (email, password, data) => (dispatch) => {
    dispatch(setInit(true))
    let request = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.users.some(item => item.login.login === email || item.login.number === email)) {
                if (data.users.some(item => (item.login.login === email || item.login.number === email) && item.login.password === password)) {
                    resolve({ status: false, data: data.users.find(item => (item.login.login === email || item.login.number === email) && item.login.password === password) })
                }
                else {
                    reject(
                        {
                            status: true,
                            numb: 404,
                            msg: "неверный логин или пароль"
                        }
                    )
                }
            } else {
                reject(
                    {
                        status: true,
                        numb: 404,
                        msg: "такой пользователь не зарегестрирован"
                    }
                )
            }
        }, 2000)
    })
    request.then(data => {
        dispatch(setInit(false))
        dispatch(setError({ status: false }))
        dispatch(setCurrentUser(data.data))
        dispatch(setInitUser(true))
    }).catch(data => {
        dispatch(setInit(false))
        dispatch(setError(data))
    })
}

export default ExmapleDataReducer;