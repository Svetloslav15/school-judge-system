import React from 'react';

const NumberQuestion = ({type, value}) => (
    <div className={type === 'green' ? 'green question-number-div text-center text-white m-1 py-1' : 'red question-number-div text-center text-white m-1 py-1'}>
        {value}
    </div>
);

export default NumberQuestion;