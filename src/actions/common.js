import {getAllUsers} from './users';
import {getAllQuestions} from './questions';

import {getInitialData} from '../utils/API';

export default function handleGetInitialData() {
    return (dispatch) => {
        getInitialData().then(({users, questions})=>{
            dispatch(getAllUsers(users));
            dispatch(getAllQuestions(questions));
        })
    }
}