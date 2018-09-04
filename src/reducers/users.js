import {GET_USERS} from '../actions/users';
import {SAVE_ANSWER} from '../actions/questions';
import merge from 'lodash/merge';


export default function users(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return merge({}, state, action.users);
        case SAVE_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        ...{[action.qid]: action.answer}
                    }
                }
            };
        default:
            return state

    }

}