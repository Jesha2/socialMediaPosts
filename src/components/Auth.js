import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    
    console.log("submitHandler called");
    const body= {
      username,
      password
    }
    axios.post(register?'/register' : '/login', body)
          .then(res=> dispatch({ type: "LOGIN", payload: res.data }))
          .catch(err=> {
            if(err.response.data) {
              alert(err.response.data)
              console.log(err.response.data);
            }
            console.log("Error while registering/login "+err);
            //window.alert("Error while registering/login. Please try again")
          })
  }

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
      <input className="form-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="form-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        {/* <input className="form-input" /> */}
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
