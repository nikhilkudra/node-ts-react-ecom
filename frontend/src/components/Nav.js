import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div style={{ position: "fixed", top: "0", width: "100%" }}>
      {/* <div>E Com</div> */}
      <img
        alt="logo"
        className="logo"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvFzBwQ4A4MJBEi3YQfdMPQaVk3MCdPyTSpH2LBv99Q2zgCLPXwqs7Cv8QNy2Ff_o1DcBM5yW0qfG__vx9B8Upf7Sgbg36tyZwJu1_rAUbiOZnypZo8YAi72Iz9VkGsx9JNXongzlvNncKPgPLoi9Yd9WSZkB01aTc69E67T28gB01YcF1yKOPrK_r/s1600/36.jpg"
      />
      {auth ? (
        <ul className="nav-ul">
          <li className="e-com-nav">E-comm</li>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link className="log-out" onClick={logout} to="/signup">
              Logout ({JSON.parse(user).username})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li className="e-com-nav">E-comm</li>
          <li className="nav-sign-up">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="nav-sign-up">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
