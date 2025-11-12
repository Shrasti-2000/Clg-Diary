import { configureStore} from '@reduxjs/toolkit'
import auth  from "./auth/authSlice"
import admin from "../features/admin/adminSlice" 
import products from "../features/products/productSlice"
import events from "../features/event/eventSlice"
import comments from "../features/comment/commentSlice"
import message from "../features/messages/messageSlice"

const store = configureStore({
    reducer : {auth, admin, products, events, comments, message}
})




export default store