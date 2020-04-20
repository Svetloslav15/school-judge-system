import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import submitionService from '../../../services/submition-service';

import Navigation from '../../common/navigation/Navigation';
import NumberQuestion from '../../test/test-home/NumberQuestion';
import AnswerOption from '../../test/test-home/AnswerOption';

const CorrectTest = ({history, match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [submition, setSubmition] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        if (isLoading) {
            submitionService.getSubmitionWithQuestions(match.params.id)
                .then((data) => {
                    setIsLoading(false);
                    setSubmition(data);
                    setCurrentQuestion(data.answers[0].question);
                })
        }
    }, []);

    const changeQuestionFromNav = (index) => {
        setCurrentQuestionIndex(index);
        setCurrentQuestion(submition.answers[index].question);
    };

    const displayQuestionNav = () => {
        const result = [];
        for (let index = 0; index < submition.answers.length; index++) {
            result.push(<NumberQuestion key={index} type='green' value={index + 1}
                                        changeCurrentQuestion={() => changeQuestionFromNav(index)}/>);
        }
        return result;
    };

    const displayOptions = () => {
        if (currentQuestion) {
            if (currentQuestion.type === 'choosable') {
                let result = [];
                for (let index = 0; index < currentQuestion.options.length; index++) {
                    console.log((!submition.answers[currentQuestionIndex].IsCorrected) && (currentQuestion.options[index] === submition.answers[currentQuestionIndex].content));
                    result.push(<AnswerOption key={index}
                                              value={currentQuestion.options[index]}
                                              index={index}
                                              isSuccess={currentQuestion.correctAnswer === currentQuestion.options[index]}
                                              isIncorrect={(!submition.answers[currentQuestionIndex].IsCorrected) && (currentQuestion.options[index] === submition.answers[currentQuestionIndex].content)}
                    />)
                }
                return result;
            }
        }
    };

    return (
        <div>
            <div className='bg-image'>
                <Navigation/>
                {isLoading ? <p className="h2 text-center my-5">Зареждане...</p> : (
                    <div className='col-sm-10 col-md-10 bg-transparent mx-auto my-5'>
                        <div className='col-md-12 border-primary row mx-auto'>
                            <div className='col-md-7 row'>
                                {submition && displayQuestionNav()}
                            </div>
                        </div>
                        <div
                            className='col-md-12 row bg-gray-light border-primary-all-but-top pl-0 pt-3 pb-3 pr-3 mx-auto'>
                            <div className='col-md-10 z-index-10 mx-auto mb-4'>
                                <h2 className='text-27'>{currentQuestion && currentQuestion.content}</h2>
                            </div>
                            <div className="quest-bg-shape"/>
                            {currentQuestion && (<div className='row col-md-10 mx-auto'>
                                {currentQuestion.type === 'choosable' ? (displayOptions()) :
                                    (<div className="md-form col-md-10 mx-auto z-index-10 bg-white">
                            <textarea id="answer-input" className="md-textarea form-control"
                                      rows="6"
                                      value={''}/>
                                    </div>)
                                }
                            </div>)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default withRouter(CorrectTest);