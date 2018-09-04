import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';
import { Button,FormControl} from 'react-bootstrap';
import {addAuthorizedUser} from "../actions/authUser";
import {getUserValues} from '../selectors';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId:'',
            route:'',
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.addAuthorizedUser(this.inputNode.value);
        this.setState({route: '/dashboard'});
    };



    render() {
        const {users} = this.props;
        if (this.state.route !== '') {
            return <Redirect to={this.state.route}/>
        }
        return <div align="center" width="200px">
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="">Would You Rather?</a>
                    </div>
                </div>
            </nav>
            <FormControl componentClass="select" placeholder="select" width="100px" inputRef={node => this.inputNode = node}>
                <option value="Select...">Select...</option>
                {users.map((user,i) => (
                    <option value={user.id} key={i}>{user.name}</option>
                    ))}
            </FormControl>
            <br/>
            <Button type="submit" variant="raised" color="primary" onClick={this.handleLogin} className="btn-primary">
                Login
            </Button>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        users: getUserValues(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addAuthorizedUser: (id)=>dispatch(addAuthorizedUser(id)),
    }
}


export default (connect(mapStateToProps, mapDispatchToProps)(Login))
