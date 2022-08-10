import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  constructor() {           // here we do initialization
    super();
    this.state = {          // state is always an object!!
      showUsers: true
    };        
  }

  toggleUsersHandler() {
    // this.state.showUsers = false;    // NOT!
    this.setState((curState) => {         // react merge this update with existing state (in constructor)
                                         // (it doesn't override the state like in useState)
        return { showUsers: !curState.showUsers };
    });     
                                          
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>   {/* we're adding bind() bcs .this must refers to the surrounding class
                                                                and that is not done by default when method is called upon event like click*/}
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

/*
const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

  const toggleUsersHandler = () => {
    setShowUsers((curState) => !curState);
  };

  const usersList = (
    <ul>
      {DUMMY_USERS.map((user) => (
        <User key={user.id} name={user.name} />
      ))}
    </ul>
  );

  return (
    <div className={classes.users}>
      <button onClick={toggleUsersHandler}>
        {showUsers ? 'Hide' : 'Show'} Users
      </button>
      {showUsers && usersList}
    </div>
  );
};
*/

export default Users;
