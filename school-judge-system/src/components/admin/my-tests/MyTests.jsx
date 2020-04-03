import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import firebase from '../../../firebase';

const $ = window.$;

const MyTests = (props) => {
    const [testsRef, setTestsRef] = useState(firebase.database().ref('/tests'));
    const [tests, setTests] = useState();

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
        getTestsFotThisUser();
    }, []);

    const getTestsFotThisUser = () => {
        testsRef.once('value').then(function(snapshot) {
            let tests = [];
            let testObject = snapshot.val();
            for (let test of Object.keys(testObject)) {
                if (testObject[test].authorId === props.currentUser.uid) {
                    tests.push(testObject[test]);
                }
            }
            setTests(tests);
        });
    };

    return (
        <div className="col-md-10 mx-auto my-3 bg-light-gray border-primary">
            <h2 className="h2 text-center my-4">Мойте тестове</h2>
            <div className="col-md-12 mx-auto mb-5">
                <ul className="list-group list-group-flush col-md-11 mx-auto">
                    <li className="d-flex list-group-item col-md-12 row bg-primary text-white">
                        <h5 className="col-md-6 h5 font-weight-semi-bold">Име на теста</h5>
                        <h5 className="col-md-2 h5 font-weight-semi-bold">Статус</h5>
                        <h5 className="col-md-4 h5">Действия</h5>
                    </li>
                    <li className="d-flex list-group-item col-md-12 row">
                        <p className="col-md-6 p">Тест по математика - алгебрични уравнения</p>
                        <p className="col-md-2 p text-success">Активен</p>
                        <div className="col-md-4 mx-auto row">
                            <button className="btn p-2 button-size-42 btn-outline-danger btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Архивирай теста">
                                <i className="fas fa-archive fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-warning btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Промени теста">
                                <i className="fas fa-edit fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-danger btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Изтрий теста">
                                <i className="fas fa-trash-alt fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-primary btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Виж резултати">
                                <i className="fas fa-chart-pie fa-md"/>
                            </button>
                        </div>
                    </li>
                    <li className="d-flex list-group-item col-md-12 row">
                        <p className="col-md-6 p">Тест по математика - алгебрични уравнения</p>
                        <p className="col-md-2 p text-danger">Архивиран</p>
                        <div className="col-md-4 mx-auto row">
                            <button className="btn p-2 button-size-42 btn-success btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Направи теста активен">
                                <i className="fas fa-archive fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-warning btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Промени теста">
                                <i className="fas fa-edit fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-danger btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Изтрий теста">
                                <i className="fas fa-trash-alt fa-md"/>
                            </button>
                            <button className="btn p-2 button-size-42 btn-primary btn-md" data-toggle="tooltip"
                                    data-placement="top" title="Виж резултати">
                                <i className="fas fa-chart-pie fa-md"/>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
};
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(MyTests);