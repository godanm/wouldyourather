import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import { Redirect} from 'react-router-dom';
import {handleAddQuestion} from '../actions/questions';
import {Button,FormGroup,FormControl,ControlLabel} from 'react-bootstrap';
import {sortUsers} from "../selectors";


class Poll extends Component {
    constructor(props) {
        super(props);
        this.handleOptionOneChange = this.handleOptionOneChange.bind(this);
        this.handleOptionTwoChange = this.handleOptionTwoChange.bind(this);
        this.state = {
            optionone: '',
            optiontwo: '',
            toDashboard: false,

        };

    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.optionone.value === '' || this.optiontwo.value === '') {
            return;
        }
        const {authedUser} = this.props;
        this.props.handleAddQuestion({
            authedUser,
            optionOne: this.optionone.value,
            optionTwo: this.optiontwo.value
        }).then(()=> {
            // redirect to home page
            this.setState({
                toDashboard: true,
            });
        });


    };
    getValidationState = (e) => {
        if ((this.state.optionone.length === 0) || (this.state.optiontwo.length === 0))return 'error';
        else if ((this.state.optionone.length > 0) && (this.state.optiontwo.length > 0)) return 'success';
        return null;
    }
    handleOptionOneChange(e) {
        this.setState({ optionone: this.optionone.value });
    }
    handleOptionTwoChange(e) {
        this.setState({ optiontwo: this.optiontwo.value });
    }
    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard'/>
        }
        const {authedUser} = this.props;
        return <div>
            <Nav user={authedUser}/>
            <table width-="50%" align="center">
                <thead>
                <tr>
                    <td width="50%">
                        <div className="container" width="50%" align="left">
                            <div className="panel-group" width="200px">
                                <div className="panel panel-primary">
                                    <div className="panel-heading" align="center">Would you rather?</div>
                                    <div className="panel-body"> </div>
                                    <div className="panel-body">
                                        <form>
                                            <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
                                                <ControlLabel>Option 1</ControlLabel>
                                                <FormControl inputRef={node => this.optionone = node} type="text" placeholder="Enter Option 1"  value={this.state.value}  onChange={this.handleOptionOneChange}/>
                                                <ControlLabel>Option 2</ControlLabel>
                                                <FormControl inputRef={node => this.optiontwo = node} type="text"  placeholder="Enter Option 2" value={this.state.value}  onChange={this.handleOptionTwoChange}/>
                                            </FormGroup>
                                        </form>
                                    </div>
                                    <div className="panel-body" align="center">
                                        <Button type="submit" variant="raised" color="primary" onClick={this.handleSubmit} className="btn-primary">
                                            Submit
                                        </Button>
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

function mapStateToProps(state) {
    const currentUser = state.users[state.authedUser];
    return {
        usersList: sortUsers(state),
        authedUser: state.authedUser===''? null : state.authedUser,
        user: currentUser ? currentUser : null,

    }

}
function mapDispatchToProps(dispatch) {
    return {
        handleAddQuestion: (obj)=>dispatch(handleAddQuestion(obj)),
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Poll));
