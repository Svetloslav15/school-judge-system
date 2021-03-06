import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import submisionService from '../../../services/submition-service';
import testService from '../../../services/test-service';

import Navigation from '../../common/navigation/Navigation';

const $ = window.$;

const TestSubmisions = ({match}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const testId = match.params.id;
            submisionService.getAllSubmitionsForTest(testId)
                .then((data) => {
                    testService.getTestById(data[0].testId)
                        .then((test) => {
                            if (test) {
                                data.maxPoints = test.pointsForExcellent.max;
                            }
                            setData(data);
                            setIsLoading(false);
                        });
                })
        }
    }, []);

    const displayData = (data) => (
        data.map((submition, index) => (
            <li key={index} className="d-flex list-group-item col-md-12 row">
                <p className="col-md-3 p">{submition.user.firstName} {submition.user.lastName}</p>
                <p className="col-md-1 p">{submition.user.studentClass}</p>
                <p className="col-md-2 p">{submition.grade}</p>
                <p className="col-md-2 p">{submition.points}/{data.maxPoints}</p>
                <p className="col-md-2 p text-danger">{submition.status}</p>
                {submition.status !== 'Преписвал' ? (<div className="col-md-2 mx-auto row">
                    <Link to={'/test/submitions/' + submition.id}>
                        <button className="btn p-2 btn-primary btn-md">
                            Провери тест
                        </button>
                    </Link>
                </div>) : ''}
            </li>)
        )
    );
    $('[data-toggle="tooltip"]').tooltip();

    return (
        <div>
            <div className='bg-image'>
                <Navigation/>
                <div className="col-md-10 mx-auto my-3 bg-light-gray border-primary">
                    <h2 className="h2 text-center my-4">Резултати</h2>
                    <div className="col-md-12 mx-auto mb-5">
                        <ul className="list-group list-group-flush col-md-11 mx-auto">
                            <li className="d-flex list-group-item col-md-12 row bg-primary text-white">
                                <h5 className="col-md-3 h5 font-weight-semi-bold">Ученик</h5>
                                <h5 className="col-md-1 h5 font-weight-semi-bold">Клас</h5>
                                <h5 className="col-md-2 h5 font-weight-semi-bold">Оценка</h5>
                                <h5 className="col-md-2 h5 font-weight-semi-bold">Точки</h5>
                                <h5 className="col-md-2 h5 font-weight-semi-bold">Статус</h5>
                                <h5 className="col-md-2 h5">Действия</h5>
                            </li>
                            {data ? (data.length === 0 ? (<p className="h4 text-center my-5">
                                Все още никой не е изпратил решение за този тест
                            </p>) : '') : ''}
                            {data && displayData(data)}
                            {isLoading && <p className="h4 text-center my-5">Зареждане...</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TestSubmisions;