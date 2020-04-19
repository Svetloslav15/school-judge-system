import React, {useState, useEffect} from 'react';
import submisionService from '../../../services/submition-service';
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
                    setData(data);
                    setIsLoading(false);
                })
        }
    }, []);

    const displayData = (data) => (
        data.map((submision, index) => (
            <li key={index} className="d-flex list-group-item col-md-12 row">
                <p className="col-md-6 p">{submision.user.firstName} {submision.user.lastName}</p>
                <p className="col-md-4 p text-danger">{submision.status}</p>
                <div className="col-md-2 mx-auto row">
                    <button className="btn p-2 button-size-42 btn-primary btn-md" data-toggle="tooltip"
                            data-placement="top" title={"Виж резултата на " + submision.user.firstName}>
                        <i className="fas fa-search fa-lg"/>
                    </button>
                </div>
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
                                <h5 className="col-md-6 h5 font-weight-semi-bold">Ученик</h5>
                                <h5 className="col-md-4 h5 font-weight-semi-bold">Статус</h5>
                                <h5 className="col-md-2 h5">Действия</h5>
                            </li>
                            {data && displayData(data)}
                            {isLoading && <p className="h2 text-center my-5">Зареждане...</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TestSubmisions;