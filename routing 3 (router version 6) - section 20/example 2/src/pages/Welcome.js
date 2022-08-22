import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New user</Link>
      <Outlet />    {/* place where nested content will be displayed ("Welcome, new user!" from app.js) */}
    </section>
  );
};

export default Welcome;
