import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import NumberQuestion from './NumberQuestion';
import AnswerOption from './AnswerOption';
import testService from '../../../services/test-service';
import questionService from '../../../services/question-service';
import {setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions} from '../../../store/actions/test-actions';
import Timer from "./Timer";

const TestHome = ({
                      id, match, currentUser,
                      currentQuestion, questions, answeredQuestions,
                      setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions
                  }) => {
    const [test, setTest] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currQuestions, setQuestions] = useState([]);
    let [timeLeft, setTimeLeft] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [openAnswerInput, setAnswerInput] = useState('');
    const [isLoaded, setLoaded] = useState(false);
    const [optionsToDisplay, setOptionsToDisplay] = useState([]);
    const [submition, setSubmition] = useState({
        points: 0,
        date: new Date(),
        userId: currentUser.uid,
        status: 'В момента се решава',
        answers: []
    });

    useEffect(() => {
        if (!isLoaded) {
            setLoaded(true);
            const testId = match.params.id;
            handleData(testId);
        }
        displayOptions();
    }, [activeOption, currentQuestion]);

    const handleData = (testId) => {
        testService.getTestById(testId)
            .then(data => {
                setTest(data);
                setSubmition({...submition, testId: data.id});
                setTimeLeft(+data.time * 60);
            });

        questionService.getQuestionsForTest(testId)
            .then(data => {
                setQuestions(data);
                setCurrentQuestion(data[currentQuestionIndex]);
                addQuestions(data);
            });
    };

    const changeQuestion = () => {
        if (activeOption || openAnswerInput) {
            let answer = {
                points: 0,
                note: '',
                questionId: currentQuestion.id,
                content: activeOption ? currentQuestion.options[activeOption] : openAnswerInput
            };
            setSubmition({...submition, answers: submition.answers.concat(answer)});
            addQuestionToAnsweredQuestions(currentQuestion.id);
        }
        setActiveOption(null);
        setAnswerInput(null);
        if (currentQuestionIndex + 1 >= currQuestions.length) {
            alert('Ти реши всички въпроси');
        }
        else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(currQuestions[currentQuestionIndex + 1]);
        }
    };

    const changeQuestionFromNav = (index) => {
        setCurrentQuestionIndex(index);
        setCurrentQuestion(currQuestions[index]);
        setActiveOption(null);
        setAnswerInput('');

        for (let currIndex = submition.answers.length - 1; currIndex >= 0; currIndex--) {
            let currEl = submition.answers[currIndex];
            if (currEl.questionId === currQuestions[index].id) {
                if (currQuestions[index].type === 'choosable') {
                    let optionIndex = currQuestions[index].options.indexOf(currEl.content);
                    setActiveOption(optionIndex);
                }
                else {
                    setAnswerInput(currEl.content);
                }
            }
        }
    };

    const timeIsOver = () => {
        alert('Времето свърши!');
    };

    const changeActiveOption = (index) => {
        setActiveOption(index);
    };

    const displayQuestionNav = () => {
        const result = [];
        for (let index = 0; index < currQuestions.length; index++) {
            if (answeredQuestions.filter(x => x === currQuestions[index].id).length === 0) {
                result.push(<NumberQuestion key={index} type='red' value={index + 1}
                                            changeCurrentQuestion={changeQuestionFromNav}/>);
            }
            else {
                result.push(<NumberQuestion key={index} type='green' value={index + 1}
                                            changeCurrentQuestion={changeQuestionFromNav}/>);
            }
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
                                              toggleActiveOption={changeActiveOption}
                                              isActive={index === activeOption}
                    />)
                }
                setOptionsToDisplay(result);
            }
        }
    };
    console.log(answeredQuestions);
    return (
        <div className='col-sm-10 col-md-10 bg-transparent mx-auto my-5'>
            <div className='col-md-12 border-primary row mx-auto'>
                <div className='col-md-7 row'>
                    {currQuestions && displayQuestionNav()}
                </div>
                <Timer time={timeLeft} timeIsOver={timeIsOver}/>
            </div>
            <div className='col-md-12 row bg-gray-light border-primary-all-but-top pl-0 pt-3 pb-3 pr-3 mx-auto'>
                <div className='col-md-10 z-index-10 mx-auto mb-4'>
                    <h2 className='text-27'>{currentQuestion.content}</h2>
                </div>
                <div className="quest-bg-shape"/>
                <div className='row col-md-10 mx-auto'>
                    {currentQuestion.type === 'choosable' ? (optionsToDisplay) :
                        (<div className="md-form col-md-10 mx-auto z-index-10 bg-white">
                            <textarea id="answer-input" className="md-textarea form-control" rows="6"
                                      onChange={(event) => setAnswerInput(event.target.value)}
                                      value={openAnswerInput}
                            />
                            <label htmlFor="answer-input">Въведи отговор...</label>
                        </div>)}
                </div>
                <button onClick={changeQuestion} className="btn btn-primary rounded z-index-10 mx-auto sm-mt-2">
                    <i className="fas fa-arrow-circle-right"/>
                </button>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    currentQuestion: state.test.currentQuestion,
    questions: state.test.questions,
    answeredQuestions: state.test.answeredQuestions
});

export default connect(mapStateToProps, {setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions})(TestHome);