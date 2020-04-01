import React, {useState} from 'react';
import {toast} from 'react-toastify';

const StepThreeForm = ({handleStepThreeForm}) => {
    const [pointsForPoor, setPointsForPoor] = useState({min: 0, max: 0});
    const [pointsForSatisfactory, setPointsForSatisfactory] = useState({min: 0, max: 0});
    const [pointsForGood, setPointsForGood] = useState({min: 0, max: 0});
    const [pointsForVeryGood, setPointsForVeryGood] = useState({min: 0, max: 0});
    const [pointsForExcellent, setPointsForExcellent] = useState({min: 0, max: 0});
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (pointsForPoor.min < pointsForPoor.max && pointsForSatisfactory.min < pointsForSatisfactory.max &&
            pointsForGood.min < pointsForGood.max && pointsForVeryGood.min < pointsForVeryGood.max &&
            pointsForExcellent.min < pointsForExcellent.max) {

            let pointsArr = [
                pointsForPoor.min, pointsForPoor.max,
                pointsForSatisfactory.min, pointsForSatisfactory.max,
                pointsForGood.min, pointsForGood.max,
                pointsForVeryGood.min, pointsForVeryGood.max,
                pointsForExcellent.min, pointsForExcellent.max];

            pointsArr = [...new Set(pointsArr)];

            if (pointsArr.length !== 10) {
                setError('Точките за всяка оценка трябва да са различни!');
            }
            if (pointsForPoor.max < pointsForSatisfactory.min && pointsForSatisfactory.min < pointsForGood.max &&
                pointsForGood.max < pointsForVeryGood.min && pointsForVeryGood.max < pointsForExcellent.min) {
                handleStepThreeForm({pointsForPoor, pointsForSatisfactory, pointsForGood, pointsForVeryGood, pointsForExcellent});
                toast.success(<div><i className="far fa-check-circle mr-3"/>Успешно добавихте нов тест!</div>);
                setPointsForPoor({min: 0, max: 0});
                setPointsForSatisfactory({min: 0, max: 0});
                setPointsForGood({min: 0, max: 0});
                setPointsForVeryGood({min: 0, max: 0});
                setPointsForExcellent({min: 0, max: 0});
                return setError('');
            }
            else {
                setError('Невалидни данни!');
            }
        }
        else {
            setError('Минамалният брой точки за оценка трябва да бъде по-малък от максималния брой!');
        }
    };

    return (
        <div>
            <h3 className='text-center pb-4'>Добавете скала за оценяване</h3>
            <div className='row '>
                <div className='col-md-2 row mx-auto'>
                    <label className="mb-0 ml-2" htmlFor="material-url">Слаб (2)</label>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">От: </span>
                        </div>
                        <input type="number" min='0' className="form-control"
                               onChange={event => setPointsForPoor({...pointsForPoor, min: +event.target.value})}
                               value={pointsForPoor.min}
                        />
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">До: </span>
                        </div>
                        <input type="text" min='0' className="form-control"
                               onChange={event => setPointsForPoor({...pointsForPoor, max: +event.target.value})}
                               value={pointsForPoor.max}
                        />
                    </div>
                </div>
                <div className='col-md-2 row mx-auto'>
                    <label className="mb-0 ml-2" htmlFor="material-url">Среден (3)</label>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">От: </span>
                        </div>
                        <input type="number" min='0' className="form-control"
                               onChange={event => setPointsForSatisfactory({
                                   ...pointsForSatisfactory,
                                   min: +event.target.value
                               })}
                               value={pointsForSatisfactory.min}
                        />
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">До: </span>
                        </div>
                        <input type="text" min='0' className="form-control"
                               onChange={event => setPointsForSatisfactory({
                                   ...pointsForSatisfactory,
                                   max: +event.target.value
                               })}
                               value={pointsForSatisfactory.max}
                        />
                    </div>
                </div>
                <div className='col-md-2 row mx-auto'>
                    <label className="mb-0 ml-2" htmlFor="material-url">Добър (4)</label>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">От: </span>
                        </div>
                        <input type="number" min='0' className="form-control"
                               onChange={event => setPointsForGood({
                                   ...pointsForGood,
                                   min: +event.target.value
                               })}
                               value={pointsForGood.min}/>
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">До: </span>
                        </div>
                        <input type="text" min='0' className="form-control"
                               onChange={event => setPointsForGood({
                                   ...pointsForGood,
                                   max: +event.target.value
                               })}
                               value={pointsForGood.max}/>
                    </div>
                </div>
                <div className='col-md-2 row mx-auto'>
                    <label className="mb-0 ml-2" htmlFor="material-url">Много добър (5)</label>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">От: </span>
                        </div>
                        <input type="number" min='0' className="form-control"
                               onChange={event => setPointsForVeryGood({
                                   ...pointsForVeryGood,
                                   min: +event.target.value
                               })}
                               value={pointsForVeryGood.min}/>
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">До: </span>
                        </div>
                        <input type="text" min='0' className="form-control"
                               onChange={event => setPointsForVeryGood({
                                   ...pointsForVeryGood,
                                   max: +event.target.value
                               })}
                               value={pointsForVeryGood.max}/>
                    </div>
                </div>
                <div className='col-md-2 row mx-auto'>
                    <label className="mb-0 ml-2" htmlFor="material-url">Отличен (6)</label>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">От: </span>
                        </div>
                        <input type="number" min='0' className="form-control"
                               onChange={event => setPointsForExcellent({
                                   ...pointsForExcellent,
                                   min: +event.target.value
                               })}
                               value={pointsForExcellent.min}/>
                    </div>
                    <div className="md-form input-group mt-0 mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text md-addon">До: </span>
                        </div>
                        <input type="text" min='0' className="form-control"
                               onChange={event => setPointsForExcellent({
                                   ...pointsForExcellent,
                                   max: +event.target.value
                               })}
                               value={pointsForExcellent.max}/>
                    </div>
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
    )
};

export default StepThreeForm;