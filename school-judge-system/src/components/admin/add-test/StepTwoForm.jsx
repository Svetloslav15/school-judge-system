import React, {useState} from 'react';
import idGenerator from '../../../utils/id-generator';

const letters = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЧШЩЪЬЮЯ';

const StepTwoForm = ({handleStepTwoForm}) => {
    const [questions, setQuestions] = useState([]);
    const [questionType, setQuestionType] = useState('choosable');
    const [questionContent, setQuestionContent] = useState('');
    const [currentOption, setCurrentOption] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');

    const addNewOption = () => {
        if (currentOption !== '') {
            setOptions(options.concat(currentOption));
            setCurrentOption('');
        }
    };

    const addQuestion = () => {
        if (questionContent !== '') {
            if (questionType === 'choosable' && correctAnswer !== '') {
                if (options.length >= 2) {
                    const question = {
                        id: idGenerator(),
                        content: questionContent,
                        type: questionType,
                        options,
                        correctAnswer
                    };
                    setQuestions(questions.concat(question));
                    setQuestionType('choosable');
                    setCorrectAnswer('');
                    setQuestionContent('');
                    setOptions([]);
                    setError('');
                    return;
                }
                return setError('Трябва да въведете поне 2 възможни отговора!');
            }
            else if (questionType === 'openAnswer') {
                const question = {
                    id: idGenerator(),
                    content: questionContent,
                    type: questionType,
                };
                setQuestions(questions.concat(question));
                setQuestionType('openAnswer');
                setCorrectAnswer('');
                setQuestionContent('');
                setError('');
                return;
            }
            return setError('Трябва да изберете правилен отговор!');
        }
        return setError('Трябва да въведете въпрос!');
    };

    const handleSubmit = () => {
        if (questions.length > 0) {
            handleStepTwoForm(questions);
        }
        else {
            setError('Трябва да добавите поне 1 въпрос.')
        }
    };

    const displayOptions = () => (
        options.map((x, i) => <p key={i} className='my-1 col-md-12'>
            <span className='font-weight-bold'>{letters[i]}</span>: {x}
        </p>)
    );

    const displayOptionsInSelect = () => (
        options.map((x, i) => <option key={i} defaultValue={x} value={x}>{x}</option>)
    );

    return (
        <div className='container col-md-11 mx-auto'>
            <div className='row'>
                <p>Добавени въпроси: <span className='font-weight-bold'>{questions.length}</span></p>
            </div>
            <div className='row'>
                <div className="md-form col-md-6">
                    <textarea className="md-textarea form-control" id="question-input" rows="4"
                              onChange={(event) => setQuestionContent(event.target.value)}
                              value={questionContent}
                    />
                    <label htmlFor="question-input">Въпрос...</label>
                </div>
                <div className="md-form col-md-6">
                    <p>Вид на въпроса: </p>
                    <select className="browser-default custom-select"
                            onChange={(event) => {
                                setQuestionType(event.currentTarget.value);
                            }}>
                        <option value='choosable' defaultValue='choosable'>Въпрос с избираем отговор</option>
                        <option value='openAnswer'>Въпрос със свободен отговор</option>
                    </select>
                    {questionType === 'choosable' && (<div className='mt-2'>
                        <p>Изберете правилния отговор: </p>
                        <select defaultValue={'Изберете правилния отговор'} className="browser-default custom-select"
                                onChange={(event) => {
                                    setCorrectAnswer(event.currentTarget.value)
                                }}>
                            {displayOptionsInSelect()}
                        </select>
                    </div>)}
                </div>
            </div>
            {questionType === 'choosable' && (<div className='row'>
                {displayOptions()}
                <div className="md-form col-md-10">
                    <input type="text" className="form-control validate" id='option-input'
                           value={currentOption}
                           onChange={(event) => setCurrentOption(event.target.value)}
                    />
                    <label htmlFor="option-input">Добави възможен отговор</label>
                </div>
                <div className='col-md-2 text-left'>
                    <button type="button" onClick={addNewOption} className="btn btn-outline-primary px-3 mb-2 btn-md">
                        Добави Отговор
                    </button>
                </div>
            </div>)}
            <p className={(!error && 'd-none') + " text-center form-text text-danger"}>
                {error}
            </p>
            <div className='col-md-12 text-center'>
                <button type="button" onClick={addQuestion} className="btn blue-gradient btn-md px-3 mb-2">
                    Добави Въпрос
                </button>
                <button type="button" className="btn btn-primary ml-5"
                        onClick={handleSubmit}>
                    Напред <i className="fas fa-arrow-circle-right text-white ml-2"/>
                </button>
            </div>
        </div>
    )
};
export default StepTwoForm;