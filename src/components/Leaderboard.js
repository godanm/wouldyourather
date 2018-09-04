import React, { Component } from 'react';
import {connect} from 'react-redux';
import Nav from './Nav';
import {sortUsers} from '../selectors';



class Leaderboard extends Component {

    render() {
        const {usersList, user, authedUser} = this.props;
        console.log('authedUser::',authedUser);
        return <div>
            <Nav user={user}/>
            <table width-="50%" align="center">
                <thead>
                <tr>
                    <td>
                        <div className="container" width="50%" align="left">
                            <div className="panel-group" width="200px">
                                <div className="panel panel-primary" align="center">
                                    <div className="panel-heading">Leader Board</div>
                                    <div className="panel-body">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr className="highlight">
                                                <th><strong>Avatar</strong></th>
                                                <th><strong>Name</strong></th>
                                                <th><strong>Total Questions Asked</strong></th>
                                                <th><strong>Total Questions Answered</strong></th>
                                            </tr>
                                            {usersList.map((user) => (
                                                <tr className="clickable-row" key={user.id}>
                                                    <th align="center"><img className="avatar" src={user.avatarURL} alt={user.name}/></th>
                                                    <th align="center">{user.name}</th>
                                                    <th align="center">{user.questions.length}</th>
                                                    <th align="center">{Object.keys(user.answers).length}</th>
                                                </tr>
                                            ))}
                                            </thead>
                                        </table>
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


export default connect(mapStateToProps)(Leaderboard)