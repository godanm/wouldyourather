import React, {Component} from 'react';
import { Redirect,Link} from 'react-router-dom';



class Nav extends Component {

    render() {
        const {user} = this.props;

        if ((user === null) || (user === undefined)) {
            return <Redirect to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>
        }
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="">Would You Rather?</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="/dashboard">Home</Link></li>
                        <li><Link to="/leaderBoard">Leader Board</Link></li>
                        <li><Link to="/add">Create Poll</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/"><span className="glyphicon glyphicon-user"></span> Logout</a></li>
                        <li><a href=""><span className="glyphicon glyphicon-log-in"></span> {user.name}</a></li>
                    </ul>
                </div>
            </nav>
    )
    }
}

export default Nav;