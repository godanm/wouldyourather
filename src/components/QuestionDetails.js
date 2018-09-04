import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import moment from 'moment';
import {Button,ButtonGroup} from 'react-bootstrap';
import {handleSaveAnswer} from "../actions/questions";


class QuestionDetails extends Component {
    constructor(props) {
        super(props);
        this.handleOptionClick = this.handleOptionClick.bind(this);

        this.state = {
            toDashboard: false,
            answerOption:'',

        }
    }


    handleClick = (e) => {
        const {question, authedUser} = this.props;
        this.props.handleSaveAnswer({
            authedUser: authedUser.id,
            qid: question.id,
            answer: this.state.answerOption
        }).then((res)=>{
            //redirect to home page - now the poll detail shows up as answered
            this.setState({
                toDashboard:true
            });
        });
        this.forceUpdate();
    };
    handlehomeClick = (e) => {
        this.setState({
            toDashboard:true
        });
    }
    handleOptionClick = (e) => {
        document.all('optionOne').className = '';
        document.all('optionTwo').className = '';
        e.target.className = 'btn-primary';
        this.state.answerOption = e.target.name;
    };

    render() {
        let answerOnePercentage = 0;
        let answerTwoPercentage = 0;
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard'/>
        }
        const {question, users, authedUser} = this.props;

        if ((question === null) || (question === undefined)) {
            return <Redirect to={{
                pathname: "/",
                value:0,
                state: { from: this.props.location }
            }}/>
        }
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        answerOnePercentage = Math.round((question.optionOne.votes.length / totalVotes)*100);
        answerTwoPercentage = Math.round((question.optionTwo.votes.length / totalVotes)*100);
        const author =  users[question.author];
        const answerOption = authedUser.answers[question.id] ? authedUser.answers[question.id] : '';
        this.state.answerOption= answerOption ? answerOption : null;
        return <div>
            <Nav user={authedUser}/>
            <table width-="100%" align="center">
                <thead>
                    <tr>
                        <td>
                            <div className="container" width="100%" align="left">
                                <div className="panel-group">
                                    <div className="panel panel-primary">
                                        <div className="panel-heading">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <td align="left">
                                            Author: {author.name}<br/>{moment(question.timestamp).format('dddd, MMMM Do h:mm A')}
                                                    </td>
                                                    <td align="right">
                                                    <img className="avatar" src={author.avatarURL} alt={author.name}/>
                                                    </td>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="panel-body"> Would you rather?</div>
                                        <div className="panel-body">
                                            <ButtonGroup name="group">
                                                    <Button name="optionOne" onClick={this.handleOptionClick} className={answerOption === 'optionOne' ? 'btn-primary': null}>{question.optionOne.text}
                                                    </Button>
                                                <Button name="optionTwo" onClick={this.handleOptionClick} className={answerOption === 'optionTwo' ? 'btn-primary': null}>{question.optionTwo.text}</Button>
                                            </ButtonGroup>
                                        </div>
                                        {this.state.answerOption ? (
                                                <div className="panel-body">
                                                    <Button type="submit" variant="raised" color="primary"
                                                            onClick={this.handlehomeClick} className="btn-primary">
                                                        Home
                                                    </Button>
                                                </div>
                                            ) :
                                            <div className="panel-body">
                                                <Button type="submit" variant="raised" color="primary"
                                                        onClick={this.handleClick} className="btn-primary">
                                                    Submit
                                                </Button>
                                            </div>
                                        }
                                        <div className="panel-body">
                                            <strong>Total Votes: </strong>{totalVotes}<br/>
                                            <strong>% of '{question.optionOne.text}' votes: </strong>{answerOnePercentage}<br/>
                                            <strong>% of '{question.optionTwo.text}' votes: </strong>{answerTwoPercentage}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    }
}
function mapStateToProps({questions, users, authedUser}, props){
    const {questionId} = props.match.params;
    const currentUser = users[authedUser];
    return {
        question: questions[questionId] ? questions[questionId] : null,
        users,
        authedUser: currentUser===''? null : currentUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveAnswer: (obj)=>dispatch(handleSaveAnswer(obj)),
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(QuestionDetails));
