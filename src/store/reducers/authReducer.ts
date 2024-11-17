import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type IAuthStore = {
    isLogin: boolean
    username: string
    password: string
    privateKeyword: string
}
const initialState: IAuthStore = {
    isLogin: false,
    username: "admin",
    password: "123456",
    privateKeyword: 'key123'
}
const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true
        },
        logout: (state) => {
            state.isLogin = initialState.isLogin
        },
        updatePassword: (state, action: PayloadAction<{ password: string }>) => {
            state.password = action.payload.password
        }
    }
})

export const { login, logout, updatePassword } = authReducer.actions
export default authReducer.reducer