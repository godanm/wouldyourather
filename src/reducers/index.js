import {combineReducers} from 'redux';
import users from './users';
import questions from './questions';
import authedUser from './authUser';

export default combineReducers({
    users,
    questions,
    authedUser,
});