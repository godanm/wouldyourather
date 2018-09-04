import React, { Component } from 'react';
import {connect} from 'react-redux';
import Question from './Question';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import { sortQuestions } from '../selectors';
import {ToggleButtonGroup,ToggleButton} from 'react-bootstrap';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionvalue: 1,
            displayAnswered:false,
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClick = (e) => {
        this.state.optionvalue = e;
        if (e === 2) {
            this.state.displayAnswered = true;
        }else {
            this.state.displayAnswered = false;
        }
        this.forceUpdate();
    };


    render() {

        const {questions, user} = this.props;
        if ((user === null) || (user === undefined)) {
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }
        const answered = Object.keys(user.answers)
            .sort((a,b)=>user.answers[b].timestamp-user.answers[a].timestamp);
        const unanswered = questions.filter((qId)=>!answered.includes(qId));

        return <div>
            <Nav user={user}/>
            <div align="right">
                <ToggleButtonGroup name="group" value={this.state.optionvalue} onChange={this.handleClick.bind(this)}>
                    <ToggleButton name="groupOptions" value={1}>Unanswered</ToggleButton>
                    <ToggleButton name="groupOptions" value={2}>Answered</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {this.state.displayAnswered ? (
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr className="highlight">
                            <th colSpan={3}><h2 align="center"><strong>Answered</strong></h2></th>
                        </tr>
                        </thead>
                        {answered.map((questionId) => (
                            <Question key={questionId} id={questionId} user={user}/>
                        ))}
                    </table>
                ) :
                <table className="table table-striped table-hover">
                    <thead>
                    <tr className="highlight">
                        <th colSpan={3}><h2 align="center"><strong>UnAnswered</strong></h2></th>
                    </tr>
                    </thead>
                    {unanswered.map((questionId) => (
                        <Question key={questionId} id={questionId} user={user}/>
                    ))}
                </table>
            }
        </div>
    }
}

function mapStateToProps(state) {
    const currentUser = state.users[state.authedUser];
    return {
        questions: sortQuestions(state),
        user: currentUser ? currentUser : null,
    }

}
export default (connect(mapStateToProps)(Dashboard));