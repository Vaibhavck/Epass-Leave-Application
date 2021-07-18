import { combineReducers } from 'redux';
import publicReducer from './publicReducer'

const rootReducer = combineReducers({
    public: publicReducer,
})


export default rootReducer;