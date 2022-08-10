import classes from './User.module.css';
import { Component } from 'react';

class User extends Component {
  render() {                                // ekvivalentno sa return statement u functional components
    return <li className={classes.user}>{this.props.name}</li>;     // this moze samo zbog extents Component
  };
}

/*const User = (props) => {               -->   functional component
    return <li className={classes.user}>{props.name}</li>;
};*/

export default User;
