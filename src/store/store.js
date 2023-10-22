import {configureStore} from "@reduxjs/toolkit"
import emailReducer from "../slice/email"
import emailDetailReducer from "../slice/emailDetail"

export const store = configureStore({
    reducer : {
        email : emailReducer,
        emailDetail : emailDetailReducer
    }
}) 