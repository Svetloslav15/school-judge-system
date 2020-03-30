import * as actionTypes from '../actions/action-types';

const initialState = {
    currentUser: null,
    isLoading: true
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }

};

export default userReducer;