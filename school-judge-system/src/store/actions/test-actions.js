import * as actionTypes from './action-types';

export const setCurrentQuestion = (question) => {
    return {
        type: actionTypes.SET_CURRENT_QUESTION,
        payload: {
            currentQuestion: question
        }
    }
};

export const addQuestions = (questions) => {
    return {
        type: actionTypes.ADD_QUESTIONS,
        payload: {
            questions: questions
        }
    }
};

export const addQuestionToAnsweredQuestions = (question) => {
    return {
        type: actionTypes.ADD_QUESTION_TO_ANSWERED_QUESTIONS,
        payload: {
            question: question
        }
    }
};