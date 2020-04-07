import React, {useState, useEffect} from 'react';
import testService from '../../services/test-service';
import StartTestModal from './StartTestModal';

const Home = () => {
    const [activeTests, setActiveTests] = useState([]);
    const [archivedTests, setArchivedTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        testService.getTests()
            .then((data) => {
                let currActive = [];
                let currArchived = [];
                for (let test of data) {
                    if (test.status === "active") {
                        currActive.push(test);
                    }
                    else {
                        currArchived.push(test);
                    }
                }
                setActiveTests(currActive);
                setLoading(false);
                setArchivedTests(currArchived);
            });
    }, []);

    const displayActiveTests = (tests) => (
        tests.map((x, i) => (<StartTestModal key={i} id={x.id}>
            <li className="row d-flex list-group-item">
                <div className="col-md-8">{x.name}</div>
                <div className="col-md-3 max-width-40">
                    <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                </div>
            </li>
        </StartTestModal>))
    );

    const displayArchivedTests = (tests) => (
        tests.map((x, i) => (<li key={i} className="row d-flex list-group-item">{x.name}</li>))
    );
    console.log(activeTests);

    return (
        <div className='row mx-auto my-3 jumbotron container home-div-container'>
            <h1 className='mx-auto'>School Judge</h1>
            <div className='col-md-12'>
                <div className="md-form mx-auto text-center col-md-6 px-1 my-4">
                    <input type="text" id="form1" className="form-control"/>
                    <label htmlFor="form1">Търси тест...</label>
                    <button className="btn btn-primary btn-md mx-auto">
                        <i className="fas fa-search fa-md"/>
                    </button>
                </div>
            </div>
            <div className="col-md-12 row pt-5">
                <div className="col-md-6 mr-auto">
                    <h4 className="text-center">Активни тестове</h4>
                    <hr className="hr-home"/>
                    <ul className="list-group list-group-flush test-listing-div">
                        {activeTests && displayActiveTests(activeTests)}
                        {loading && <li className="list-group-item text-center h4">Зареждане...</li>}
                    </ul>
                </div>
                <div className="col-md-5 ml-auto">
                    <h4 className="text-center">Предишни тестове</h4>
                    <hr className="hr-home"/>
                    <ul className="list-group list-group-flush test-listing-div">
                        {archivedTests && displayArchivedTests(archivedTests)}
                        {loading && <li className="list-group-item text-center h4">Зареждане...</li>}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Home;