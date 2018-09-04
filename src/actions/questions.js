import {_getQuestions, _saveQuestionAnswer, _saveQuestion
    } from '../utils/_DATA.js';
import { showLoading, hideLoading } from 'react-redux-loading';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';


export function getAllQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

function saveAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

function addQuestion(authedUser, question) {
    return {
        type: ADD_QUESTION,
        authedUser,
        question,
    }
}

export function handleGetQuestions() {
    return (dispatch) => {
        return _getQuestions().then((questions)=>{
            dispatch(getAllQuestions(questions));
        })
    }
}

export function handleSaveAnswer({authedUser, qid, answer}) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestionAnswer({authedUser, qid, answer})
            .then(()=>{
                dispatch(saveAnswer(authedUser, qid, answer)); // modify users and questions
                dispatch(hideLoading());

            })
            .catch((e)=>{
                console.warn('Unable to save answer due to:', e);
                dispatch(hideLoading());
            });
    }

}

export function handleAddQuestion({authedUser, optionOne, optionTwo}) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: authedUser,
        }).then((formattedQ)=>{
            dispatch(addQuestion(authedUser, formattedQ));
            dispatch(hideLoading());
        })
    }
}

