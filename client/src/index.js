import React from "react";
import './index.css'
import reactDom from "react-dom"
import { Provider } from "react-redux";
import { createStore,applyMiddleware,compose } from "@reduxjs/toolkit";
import  thunk  from "redux-thunk";
import reducers from './reducers/index.js'

import App from "./App"

const store = createStore(reducers,compose(applyMiddleware(thunk)))

reactDom.render(<Provider store={store}>
                    <App/>
                </Provider>,
                document.getElementById("root"))