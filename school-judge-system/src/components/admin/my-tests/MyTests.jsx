import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Navigation from '../../common/navigation/Navigation';
import testService from '../../../services/test-service';

const $ = window.$;

const MyTests = (props) => {
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState([]);

    useEffect(() => {
        getTestsFotThisUser();
    }, []);

    const getTestsFotThisUser = () => {
        testService.getTests()
            .then((data) => {
                let result = [];
                for (let test of data) {
                    if (test.authorId === props.currentUser.uid) {
                        result.push(test);
                    }
                }
                setTests(result);
                setLoading(false);
            });
    };

    const displayTests = (tests) => (
        tests.map((x, i) => (<li key={i} className="d-flex list-group-item col-md-12 row">
            <p className="col-md-6 p">{x.name}</p>
            {x.status === "active" ? <p className="col-md-2 p text-success">Активен</p> :
                <p className="col-md-2 p text-danger">Архивиран</p>
            }
            <div className="col-md-4 mx-auto row">
                {
                    x.status === 'active' ?
                        <button className="btn p-2 button-size-42 btn-outline-danger btn-md" data-toggle="tooltip"
                                data-placement="top" title="Архивирай теста">
                            <i className="fas fa-archive fa-lg"/>
                        </button> :
                        <button className="btn p-2 button-size-42 btn-success btn-md" data-toggle="tooltip"
                                data-placement="top" title="Направи теста активен">
                            <i className="fas fa-calendar-plus fa-lg"/>
                        </button>
                }

                <button className="btn p-2 button-size-42 btn-warning btn-md" data-toggle="tooltip"
                        data-placement="top" title="Промени теста">
                    <i className="fas fa-edit fa-lg"/>
                </button>
                <button className="btn p-2 button-size-42 btn-danger btn-md" data-toggle="tooltip"
                        data-placement="top" title="Изтрий теста">
                    <i className="fas fa-trash-alt fa-lg"/>
                </button>
                <button className="btn p-2 button-size-42 btn-primary btn-md" data-toggle="tooltip"
                        data-placement="top" title="Виж резултати">
                    <i className="fas fa-chart-pie fa-md"/>
                </button>
            </div>
        </li>))
    );

    $('[data-toggle="tooltip"]').tooltip();

    return (
        <div className='bg-image'>
            <Navigation/>
            <div className="col-md-10 mx-auto my-3 bg-light-gray border-primary">
                <h2 className="h2 text-center my-4">Мойте тестове</h2>
                <div className="col-md-12 mx-auto mb-5">
                    <ul className="list-group list-group-flush col-md-11 mx-auto">
                        <li className="d-flex list-group-item col-md-12 row bg-primary text-white">
                            <h5 className="col-md-6 h5 font-weight-semi-bold">Име на теста</h5>
                            <h5 className="col-md-2 h5 font-weight-semi-bold">Статус</h5>
                            <h5 className="col-md-4 h5">Действия</h5>
                        </li>
                        {tests && displayTests(tests)}
                        {loading && <p className="h2 text-center my-5">Зареждане...</p>}
                    </ul>
                </div>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(MyTests);