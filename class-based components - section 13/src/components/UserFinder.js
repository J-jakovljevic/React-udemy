import { Fragment, Component } from "react";
import classes from "./UserFinder.module.css";
import Users from "./Users";
import UsersContext from "../store/users-context";
import ErrorBoundary from "../components/ErrorBoundary";

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // runs only once, when component is rendered for the first time
    // Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    // will be automaticaly called whenever this component is re-evaluated
    // (last snapshot, prev snapshot before update)
    if (prevState.searchTerm !== this.state.searchTerm) {
      // if searchTerm changed
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}
/*
const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type="search" onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};
*/

export default UserFinder;
