import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/signin">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/todo">Todo</Link>
    </div>
  );
};

export default Home;
