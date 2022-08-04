import Card from '../UI/Card';
import classes from './UsersList.module.css';

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
        <ul>
        {props.users.map((user) => (   // map transformise user data u jsx elemente koji ce biti renderovani na dom 
            <li key={user.id}>
            {user.name} ({user.age} years old)
            </li>
        ))}
        
        </ul>
    </Card>
  );
};

export default UsersList;
