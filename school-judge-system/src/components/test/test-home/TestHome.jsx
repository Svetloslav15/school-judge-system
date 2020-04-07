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
    const [currQuestions, setQuestions] = useState([]);
    let [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const testId = match.params.id;
        handleData(testId);
    }, []);

    const handleData = async (testId) => {
        let testData = await testService.getTestById(testId);
        setTest(testData);
        setTimeLeft(+testData.time * 60);
        let questionData = questionService.getQuestionsForTest(testId);
        setQuestions(questionData);
    };

    const timeIsOver = () => {
        //console.log('Времето свърши!');
    };

    return (
        <div className='col-sm-10 col-md-10 bg-transparent mx-auto my-5'>
            <div className='col-md-12 border-primary row mx-auto'>
                <div className='col-md-7 row'>
                    <NumberQuestion type='green' value={1}/>
                    <NumberQuestion type='red' value={2}/>
                    <NumberQuestion type='green' value={3}/>
                    <NumberQuestion type='green' value={4}/>
                    <NumberQuestion type='green' value={5}/>
                    <NumberQuestion type='green' value={6}/>
                    <NumberQuestion type='green' value={7}/>
                    <NumberQuestion type='green' value={8}/>
                    <NumberQuestion type='green' value={9}/>
                    <NumberQuestion type='green' value={10}/>
                    <NumberQuestion type='red' value={11}/>
                    <NumberQuestion type='red' value={12}/>
                    <NumberQuestion type='red' value={13}/>
                    <NumberQuestion type='red' value={14}/>
                    <NumberQuestion type='red' value={15}/>
                    <NumberQuestion type='red' value={16}/>
                    <NumberQuestion type='red' value={17}/>
                    <NumberQuestion type='red' value={18}/>
                    <NumberQuestion type='red' value={19}/>
                    <NumberQuestion type='red' value={20}/>
                </div>
              <Timer time={timeLeft} timeIsOver={timeIsOver}/>
            </div>
            <div className='col-md-12 row bg-gray-light border-primary-all-but-top pl-0 pt-3 pb-3 pr-3 mx-auto'>
                <div className='col-md-10 z-index-10 mx-auto mb-4'>
                    <h2 className='text-27'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Debitis eius eveniet officia quisquam soluta. Cupiditate dolorum error eveniet iure molestiae
                        nihil obcaecati possimus quas similique veniam? Dolores et minus ullam!</h2>
                </div>
                <div className="quest-bg-shape"/>
                <div className='row col-md-10 mx-auto'>
                    <AnswerOption/>
                    <AnswerOption/>
                    <AnswerOption/>
                    <AnswerOption/>
                </div>
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