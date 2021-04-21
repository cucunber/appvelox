import {setInit, setError} from './ExampleDataReducer';

const CHECK_CODE = "CHECK_CODE";
const SET_CODE = "SET_CODE";
const SET_CONFIRMED_CODE = "SET_CONFIRMED_CODE";
const CHANGE_PASS = " CHANGE_PASS";

let initialState = {
    changePass: false,
    confirmed: false,
    code: null,
    codes: [
        123456,
        654321
    ]
}

const RecoveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CODE: {
            console.log(action.code)
            return {
                ...state, code: action.code
            }
        }
        case SET_CONFIRMED_CODE: {
            return {
                ...state, confirmed: action.status
            }
        }
        case CHANGE_PASS: {
            return{
                ...state, changePass: action.status
            }
        }
        default: {
            return state
        }
    }
}

const setCode = (code) => ({
    type: SET_CODE, code
})

const setConfirmedCode = (status) => ({
    type: SET_CONFIRMED_CODE, status
})

const ChangePass = (status) => ({
    type: CHANGE_PASS, status
})

export const sendUserCode = () => (dispatch) => {
    let promise = new Promise(resolve => setTimeout(() => resolve(initialState.codes[Math.floor(Math.random() * 2)]), 1000))
    promise.then(data => {
        dispatch(setConfirmedCode(false))
        dispatch(setCode(data))
    })
}

export const checkCode = (code, checkCode) => (dispatch) => {
    dispatch(setInit(true))
    let promise = new Promise((resolve, reject) => setTimeout(() => checkCode === parseInt(code) ? resolve({status: false}): reject({status: true, error: 404, msg: "неверный код,"}), 2000))
    promise.then(data => {
        dispatch(setInit(false))
        dispatch(setError({status:false}))
        dispatch(setConfirmedCode(true))
        setTimeout(()=>dispatch(setConfirmedCode(false)),2000)
    }).catch((data)=>{
        dispatch(setInit(false))
        dispatch(setError(data))
    })
}

export const setPassword = (pass1, pass2) => (dispatch) =>{
    if(pass1===pass2){
        dispatch(setInit(true))
        let promise = new Promise((resolve)=>setTimeout(()=>resolve(true), 2000));
        promise.then(data =>{ 
            dispatch(setInit(false))
            dispatch(setError({status:false}))
            dispatch(ChangePass(data))})
            setTimeout(()=>dispatch(ChangePass(false)), 3000)
    }else{
        dispatch(setError({
            status: true,
            error: 404,
            msg: "пароли не совпадают"
        }))
    }
}

export default RecoveryReducer;