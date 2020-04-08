import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import NumberQuestion from './NumberQuestion';
import AnswerOption from './AnswerOption';
import testService from '../../../services/test-service';
import questionService from '../../../services/question-service';
import {setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions} from '../../../store/actions/test-actions';
import Timer from "./Timer";

const TestHome = ({
                      id, match,
                      currentQuestion, questions, answeredQuestions,
                      setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions
                  }) => {
    const [test, setTest] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currQuestions, setQuestions] = useState([]);
    let [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const testId = match.params.id;
        handleData(testId);
    }, []);

    const handleData = (testId) => {
        testService.getTestById(testId)
            .then(data => {
                setTest(data);
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
        addQuestionToAnsweredQuestions(currentQuestion.id);
        if (currentQuestionIndex + 1 >= currQuestions.length) {
            alert('Ти реши всички въпроси');
        }
        else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(currQuestions[currentQuestionIndex + 1]);
        }
    };

    const timeIsOver = () => {
        alert('Времето свърши!');
    };

    const displayQuestionNav = () => {
        const result = [];
        for (let index = 0; index < currQuestions.length; index++) {
            if (answeredQuestions.filter(x => x === currQuestions[index].id).length === 0) {
                result.push(<NumberQuestion type='red' value={index + 1}/>);
            }
            else {
                result.push(<NumberQuestion type='green' value={index + 1}/>);
            }
        }
        return result;
    };

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
                    <AnswerOption/>
                    <AnswerOption/>
                    <AnswerOption/>
                    <AnswerOption/>
                </div>
                <button onClick={changeQuestion} className="btn btn-primary rounded z-index-10 mx-auto">
                    <i className="fas fa-arrow-circle-right"/>
                </button>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    currentQuestion: state.test.currentQuestion,
    questions: state.test.questions,
    answeredQuestions: state.test.answeredQuestions
});

export default connect(mapStateToProps, {setCurrentQuestion, addQuestions, addQuestionToAnsweredQuestions})(TestHome);