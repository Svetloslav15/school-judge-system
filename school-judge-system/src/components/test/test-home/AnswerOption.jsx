import React, {useState} from 'react';

const AnswerOption = () => {
    const [isHovered, setHovered] = useState(false);
    return (
        <React.Fragment>
            {
                !isHovered ?
                    <p className='text-25 text-black z-index-10 col-md-12 mx-auto bg-white p-2 mb-2'
                       onClick={() => setHovered(!isHovered)}>Б) dcsmk</p>
                    : <p className='text-25 text-white z-index-10 col-md-12 mx-auto bg-primary p-2 mb-2'
                         onClick={() => setHovered(!isHovered)}>Б) dcsmk</p>
            }
        </React.Fragment>
    )
};

export default AnswerOption;