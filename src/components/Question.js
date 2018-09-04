import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';


class Question extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId:'',
            route:'',
        }
    }

    render() {
        let self=this;
        const {question,user} = this.props;
        const answer = user.answers[question.id];

        if (this.state.route !== '') {
            return <Redirect to={this.state.route+question.id}/>
        }

        if (question === null) {
            return (<p>This question does not exist</p>)
        }
        return (
        <tbody>
                <tr className="clickable-row" onClick={self.handleClick.bind(self,question.id)}>
                    <td width="33%">Would you rather?</td>
                    <td width="33%" className={answer === 'optionOne' ? 'alert alert-success' : ''}>
                       {question.optionOne.text}
                        </td>
                    <td width="33%" className={answer === 'optionTwo' ? 'alert alert-success' : ''}>{question.optionTwo.text}</td>
                </tr>
            </tbody>
        )
    }
    handleClick = () => {
        this.setState({route: '/questionDetails/'});
    };

}
function mapStateToProps({questions},{id}){
    const question = questions[id];
    return {
        question: question ? question : null,
    }
}



export default connect(mapStateToProps)(Question)