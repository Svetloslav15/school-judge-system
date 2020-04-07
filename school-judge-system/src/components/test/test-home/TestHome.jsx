import React, {useState, useEffect} from 'react';
import NumberQuestion from './NumberQuestion';
import AnswerOption from './AnswerOption';
import testService from '../../../services/test-service';
import questionService from '../../../services/question-service';

const TestHome = ({id, match}) => {
    const [test, setTest] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const testId = match.params.id;
        testService.getTestById(testId)
            .then((data) => {
                setTest(data);
            });
        questionService.getQuestionsForTest(testId)
            .then((data) => {
                setQuestions(data);
            });
    }, []);

    return (
        <div className='col-sm-10 col-md-10 bg-transparent mx-auto my-5'>
            <div className='col-md-12 border-primary row mx-auto'>
                {questions.length}
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
                <div className='col-md-5 py-4 text-right'>
                    <p className='text-20'>Оставащо време:
                        <span className='text-25 font-weight-bold ml-3'> {test.time}</span>
                    </p>
                </div>
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

export default TestHome;