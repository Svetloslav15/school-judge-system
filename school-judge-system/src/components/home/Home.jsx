import React from 'react';

const Home = () => {
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
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест по мат - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест по мат - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест dsvsvfdvsdvsdvsfffffffffffffffпо мат - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест пfvbggggggggggо мат - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест sdfffffffпо мат - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                        <li className="row d-flex list-group-item">
                            <div className="col-md-8">Тест - Биляна Поповска</div>
                            <div className="col-md-3 max-width-40">
                                <button className="btn btn-outline-primary btn-md mr-auto">Влез</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-md-5 ml-auto">
                    <h4 className="text-center">Предишни тестове</h4>
                    <hr className="hr-home"/>
                    <ul className="list-group list-group-flush test-listing-div">
                        <li className="list-group-item">Тест по мат - <span
                            className="font-weight-bold">Биляна Поповска</span></li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Home;