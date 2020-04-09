import React from 'react';

const NumberQuestion = ({type, value, changeCurrentQuestion}) => (
    <div className={type === 'green' ? 'green question-number-div text-center text-white m-1 py-1 cursor-pointer' :
        'red question-number-div text-center text-white m-1 py-1 cursor-pointer'}
    onClick={() => changeCurrentQuestion(value - 1)}>
        {value}
    </div>
);

export default NumberQuestion;