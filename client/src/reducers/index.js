import { combineReducers } from "@reduxjs/toolkit";

import posts from'./posts'
import auth from './auth.js'
export default combineReducers({
    posts:posts, auth:auth
})