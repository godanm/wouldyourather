import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import QuestionDetails from './QuestionDetails';
import LeaderBoard from './Leaderboard';
import Poll from './Poll';
import PageNotFound from './PageNotFound';



import handleGetInitialData from '../actions/common';

class App extends Component {
        componentDidMount() {
            this.props.dispatch(handleGetInitialData());
        }
    render() {
        const {loading} = this.props;
        return (
            <BrowserRouter>
                <Fragment>
                    <div className="container" >
                        {
                            loading===true ?
                                null :
                                <Switch>
                                    <Route exact path='/' component={Login}/>
                                    <Route path='/dashboard' component={Dashboard}/>
                                    <Route path='/questionDetails/:questionId' component={QuestionDetails}/>
                                    <Route path='/leaderBoard' component={LeaderBoard}/>
                                    <Route path='/add' component={Poll}/>
                                    <Route path='/404' component={PageNotFound} />
                                    <Route path="*" component={PageNotFound} />


                                </Switch>
                        }
                    </div>
                </Fragment>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({users}) {
    return {
        loading: users===null
    }
}

export default connect(mapStateToProps)(App);