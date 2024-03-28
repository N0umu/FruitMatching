import { combineReducers } from 'redux'
import userReducer from './reducer/UserReducer'
import leaderboardReducer from './reducer/LeaderboardReducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    userReducer,
    leaderboardReducer
})

const store = configureStore({ reducer: rootReducer})

export default store