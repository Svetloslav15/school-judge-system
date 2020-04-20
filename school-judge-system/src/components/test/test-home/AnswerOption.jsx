import React, {useState, useEffect} from 'react';

const letters = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЧШЩЪЬЮЯ';

const AnswerOption = ({value, index, toggleActiveOption, isActive, isSuccess, isIncorrect}) => {
    const [isHovered, setHovered] = useState(false);

    useEffect(() => {
        setHovered(isActive);
    }, [isActive]);

    const toggleActive = () => {
        toggleActiveOption(index);
        setHovered(isActive);
    };

    const displayIfSuccess = () => {
        if (isIncorrect) {
            return (
                <p className='text-25 text-white z-index-10 col-md-12 mx-auto bg-danger p-2 mb-2 cursor-pointer'>
                    {letters[index]}) {value}
                </p>
            )
        }
        if (isSuccess) {
            return (
                <p className='text-25 text-white z-index-10 col-md-12 mx-auto bg-success p-2 mb-2 cursor-pointer'>
                    {letters[index]}) {value}
                </p>
            )
        }
    };

    return (
        <React.Fragment>
            {isSuccess || isIncorrect ? (displayIfSuccess()) : (
                !isHovered ?
                    <p className='text-25 text-black z-index-10 col-md-12 mx-auto bg-white p-2 mb-2 cursor-pointer'
                       onClick={toggleActive}>{letters[index]}) {value}</p>
                    : <p className='text-25 text-white z-index-10 col-md-12 mx-auto bg-primary p-2 mb-2 cursor-pointer'
                         onClick={toggleActive}>{letters[index]}) {value}</p>
            )}
        </React.Fragment>
    )
};

export default AnswerOption;