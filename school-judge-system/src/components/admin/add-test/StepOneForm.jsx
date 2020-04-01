import React, {useState} from 'react';

const StepOneForm = ({handleStepOneForm}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [time, setTime] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = () => {
      if (name !== '' && password !== '' && time !== 0) {
          if (time < 5) {
              setError('Времето трябва да бъде поне 5 минути');
              return;
          }
          handleStepOneForm(name, password, time);
      }
      else {
          setError('Всички полета за задължителни!');
      }
    };

    return (
        <div>
            <div className='row col-md-12 mx-auto'>
                <div className="md-form col-md-4">
                    <input type="text" id="name-input" className="form-control"
                           onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="name-input">Име на теста</label>
                </div>
                <div className="md-form col-md-4">
                    <input type="text" id="password-input" className="form-control"
                           onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="password-input">Парола на теста</label>
                </div>
                <div className="md-form input-group col-md-4">
                    <input type="number" className="form-control" placeholder="Време за теста"
                           onChange={(event) => setTime(event.target.value)}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text md-addon">минути</span>
                    </div>
                </div>
                <p className={(!error && 'd-none') + " text-center form-text text-danger"}>
                    {error}
                </p>
                <div className='col-md-12 text-center'>
                    <button type="button" className="btn btn-primary"
                    onClick={handleSubmit}>
                        Напред <i className="fas fa-arrow-circle-right text-white ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default StepOneForm;