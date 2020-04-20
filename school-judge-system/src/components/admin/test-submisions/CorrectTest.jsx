import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import submitionService from '../../../services/submition-service';
import testService from '../../../services/test-service';

import Navigation from '../../common/navigation/Navigation';
import NumberQuestion from '../../test/test-home/NumberQuestion';
import AnswerOption from '../../test/test-home/AnswerOption';

const CorrectTest = ({history, match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [submition, setSubmition] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [pointsForOpenAnswer, setPointsForOpenAnswer] = useState('');
    const [noteForOpenAnswer, setNoteForOpenAnswer] = useState('');

    useEffect(() => {
        if (isLoading) {
            submitionService.getSubmitionWithQuestions(match.params.id)
                .then((data) => {
                    setIsLoading(false);
                    setSubmition(data);
                    setCurrentQuestion(data.answers[0].question);
                })
        }
    }, [submition]);

    const checkIfAllQuestionsAreCorrected = () => {
        if (submition) {
            for (let answer of submition.answers) {
                if (!answer.hasOwnProperty('IsCorrected')) {
                    return false;
                }
            }
            return true;
        }
    };

    const submitCorrection = () => {
        let currSub = submition;
        currSub.answers[currentQuestionIndex].note = noteForOpenAnswer;
        currSub.answers[currentQuestionIndex].points = +pointsForOpenAnswer;
        currSub.answers[currentQuestionIndex].IsCorrected = true;
        currSub.points += +pointsForOpenAnswer;
        setSubmition({...currSub})
    };

    const saveCorrectionToDb = () => {
        submition.status = 'Проверен';
        for (let answer of submition.answers) {
            delete answer.question;
        }
        testService.getTestById(submition.testId)
            .then((test) => {
                if (submition.points >= test.pointsForExcellent.min && submition.points <= test.pointsForExcellent.max) {
                    submition.grade = 'Отличен (6)';
                }
                else if (submition.points >= test.pointsForVeryGood.min && submition.points <= test.pointsForVeryGood.max) {
                    submition.grade = 'Много добър (5)';
                }
                else if (submition.points >= test.pointsForGood.min && submition.points <= test.pointsForGood.max) {
                    submition.grade = 'Добър (4)';
                }
                else if (submition.points >= test.pointsForSatisfactory.min && submition.points <= test.pointsForSatisfactory.max) {
                    submition.grade = 'Среден (3)';
                }
                else if (submition.points >= test.pointsForPoor.min && submition.points <= test.pointsForPoor.max) {
                    submition.grade = 'Слаб (2)';
                }
                submitionService.updateSubmition(submition)
                    .then(() => {
                        history.push(`/test/results/${submition.testId}`);
                    })
            });
    };

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
                    <div className='col-sm-10 col-md-10 bg-white mx-auto my-5'>
                        <div className='col-md-12 border-primary row mx-auto'>
                            <div className='col-md-7 row'>
                                {submition && displayQuestionNav()}
                            </div>
                            {checkIfAllQuestionsAreCorrected() &&
                            (<div className='col-md-5 text-center'>
                                <p>Всички въпроси са проверени: </p>
                                <button onClick={saveCorrectionToDb} className='btn btn-primary btn-md'>
                                    <i className="fas fa-save fa-lg mr-2"/> Запиши промените
                                </button>
                            </div>)
                            }
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
                                        <div className="form-control my-3">
                                            <h6>Отговор:</h6>
                                            {submition.answers[currentQuestionIndex].content}
                                        </div>
                                        <div className="md-form md-outline">
                                            <textarea id="answer-input" className="md-textarea form-control"
                                                      rows="6"
                                                      value={noteForOpenAnswer}
                                                      onChange={(event) => setNoteForOpenAnswer(event.target.value)}
                                            />
                                            <label htmlFor="answer-input">Напиши коментар за отговора</label>
                                        </div>
                                        <div className="md-form">
                                            <input type="number" id="input-question-points" className="form-control"
                                                   value={pointsForOpenAnswer}
                                                   min={0}
                                                   max={+submition.answers[currentQuestionIndex].question.points}
                                                   onChange={(event) => setPointsForOpenAnswer(+event.target.value)}/>
                                            <label htmlFor="input-question-points">Точки за въпроса:</label>
                                        </div>
                                        <div className='col-md-12 text-center'>
                                            <button onClick={submitCorrection}
                                                    className='btn btn-outline-primary btn-md mx-auto mb-3'>
                                                Провери въпрос
                                            </button>
                                        </div>
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