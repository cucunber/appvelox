import Malyshko from '../assets/imgs/Malyshko.png';
import Harkov from '../assets/imgs/Harkov.png';

const SET_INIT_USER = "SET_INIT_USER";
const ADD_APPOINTMENT = "ADD_APPOINTMENT";
const DEL_APPOINTMENT = "DEL_APPOINTMENT";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_IS_FETCHING = "SET_IS_FETCHING";


let initialState = {
    isFetching: false,
    intialized: false,
    data: { login: { login: "1", password: "1", number: 80000000001 }, personal: { surname: "Иванова", name: "Анная", secondName: "Владимировна", sex: true, date: "15.10.1076", registration: "Санкт-Петербург", livePlace: "Санкт-Петербург", }, representatives: { surname: "Сидоров", name: "Владимир", surname: "Константинович", number: 80007654321 }, img: null, appointments: [{ id: 1, date: { time: "15:30", date: "15.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: Malyshko, job: "Хирург" } }, { id: 2, date: { time: "15:30", date: "1.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: Malyshko, job: "Хирург" } }, { id: 3, date: { time: "15:30", date: "27.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Малушко Т.М.", img: null, job: "Хирург" } }, { id: 4, date: { time: "18:30", date: "15.06.2021" }, place: { hospital: "СПБ ГБУЗ \"Городская поликлиника №25\"", adress: "пр. Солидарности, д. 1, к. 1, лит. А" }, doctor: { name: "Харьков В. С.", img: Harkov, job: "Терапевтическое отделение" } }], id: 2 }

}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INIT_USER: {
            return {
                ...state, intialized: action.status
            }
        }
        case ADD_APPOINTMENT: {
            return {
                ...state, data: { ...state.data, appointments: [...state.data.appointments, action.appointment] }
            }
        }
        case DEL_APPOINTMENT: {
            return {
                ...state, data: {
                    ...state.data, appointments: state.data.appointments.filter(item => item.id !== action.id
                    )
                }
            }
        }
        case SET_CURRENT_USER: {
            return {
                ...state, data: action.data
            }
        }
        case DEL_APPOINTMENT: {
            return {
                ...state, data: { ...state.data }
            }
        }
        case SET_IS_FETCHING: {
            return {
                ...state, isFetching: action.status
            }
        }
        default: {
            return state
        }
    }
}

export const delAppointment = (id) => (dispatch) => {
    dispatch(setIsFetching(true))
    let request = new Promise(resolve => setTimeout(() => resolve(true), 2000))
    request.then(data => dispatch(setAppointment(id))).then(data => dispatch(setIsFetching(false)))
}

export const setCurrentUser = (data) => ({
    type: SET_CURRENT_USER, data
})

const setIsFetching = (status) => ({
    type: SET_IS_FETCHING, status
})

const addAppointment = (appointment) => ({
    type: ADD_APPOINTMENT, appointment
})

const setAppointment = (id) => ({
    type: DEL_APPOINTMENT, id
})

export const setInitUser = (status) => ({
    type: SET_INIT_USER, status
})

export default ProfileReducer;