import { createSlice } from '@reduxjs/toolkit'

interface IAuthState {
    login: string
    password: string
    showPassword: boolean
    error: boolean
}

const initialState: IAuthState = {
    login: '',
    password: '',
    showPassword: false,
    error: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin(state, action){
            state.login = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
        toggleShowPassword(state){
            state.showPassword = !state.showPassword
        },
        setError(state, action) {
            state.error = action.payload
        },
        clearLogin(state) {
            state.login = ''
        }
    }
})

export const { setLogin, setPassword, toggleShowPassword, setError, clearLogin } =
    authSlice.actions

export default authSlice.reducer