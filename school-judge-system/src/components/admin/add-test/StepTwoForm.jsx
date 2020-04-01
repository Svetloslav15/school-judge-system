import React, {useState, useEffect} from 'react';

const letters = 'АБВГДЕЖЗИЙКЛМНОПРС';

const StepTwoForm = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [currentOption, setCurrentOption] = useState();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        console.log(options);
    }, [options]);

    const addNewOption = () => {
        if (currentOption !== '') {
            setOptions(options.concat(currentOption));
            setCurrentOption('');
        }
    };

    const displayOptions = () => (
        options.map((x, i) => <p key={i} className='my-1 col-md-12'>
            <span className='font-weight-bold'>{letters[i]}</span>: {x}
        </p>)
    );

    return (
        <div className='container col-md-11 mx-auto'>
            <div className='row'>
                <p>Добавени въпроси: <span className='font-weight-bold'>{questions.length}</span></p>
            </div>
            <div className='row'>
                <div className="md-form col-md-6">
                    <textarea className="md-textarea form-control" id="question-input" rows="4"
                              onChange={(event) => setCurrentQuestion({
                                  ...currentQuestion,
                                  content: event.target.value
                              })}
                    />
                    <label htmlFor="question-input">Въпрос...</label>
                </div>
                <div className="md-form col-md-6">
                    <select className="browser-default custom-select"
                            onChange={(event) => {
                                setCurrentQuestion({...currentQuestion, type: event.currentTarget.value});
                            }}>
                        <option value='choosable' defaultValue='choosable'>Въпрос с избираем отговор</option>
                        <option value='openAnswer'>Въпрос със свободен отговор</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                {displayOptions()}
                <div className="md-form col-md-10">
                    <input type="text" className="form-control validate" id='option-input'
                           onChange={(event) => setCurrentOption(event.target.value)}
                    />
                    <label htmlFor="option-input">Добави възможен отговор</label>
                </div>
                <div className='col-md-2 text-left'>
                    <button type="button" onClick={addNewOption} className="btn blue-gradient px-3 mb-2 btn-md">
                        Добави
                    </button>
                </div>
            </div>
        </div>
    )
};
export default StepTwoForm;