import * as actionTypes from '../actions/action-types';

const INITIAL_STATE = {
    questions: [],
    currentQuestion: 0,
    answeredQuestions: [],
    isTimerWorking: true,
    isTestStarted: false
};

const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.payload.currentQuestion
            };
        case actionTypes.ADD_QUESTIONS: {
            return {
                ...state,
                questions: action.payload.questions
            };
        }
        case actionTypes.ADD_QUESTION_TO_ANSWERED_QUESTIONS: {
            return {
                ...state,
                answeredQuestions: Array.from(new Set(state.answeredQuestions.concat(action.payload.question)))
            };
        }
        case actionTypes.CHANGE_TIMER_WORKING: {
            return {
                ...state,
                isTimerWorking: action.payload.isTimerWorking
            }
        }
        default :
            return state;
    }
};

export default testReducer;