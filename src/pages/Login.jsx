import '../styles/reset.css';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    const storedInfo = JSON.parse(localStorage.getItem("info"))  //grabs local storage using the key
    const [loginInfo, setLoginInfo] = useState({        //set's up a matching object
        username: "",
        password: ""
    });
    console.log(storedInfo);
    const handelUsernameChange = (e) => {   //updates the username
        let updatedValue = {};
        updatedValue = { username: e.target.value }
        setLoginInfo(loginInfo => ({
            ...loginInfo,
            ...updatedValue
        }));
    }
    const handelPasswordChange = (e) => {   //updates the password
        let updatedValue = {};
        updatedValue = { password: e.target.value }
        setLoginInfo(loginInfo => ({
            ...loginInfo,
            ...updatedValue
        }));
    }
    console.log(loginInfo);
    const navigateToGame = useNavigate();

    const handleLogin = () => {
        storedInfo === loginInfo ?    //something is wrong with this matching, it get's the same console.log() putout but somethow they are not equal.
        navigateToGame('/game') : alert("Incorrect credantials, please try again.");
         
    }
    return (
        <div className="login__body">
            <form action="">
                <div className="login__form">
                    <div>
                        <label htmlFor="username">USERNAME</label>
                        <input type="text" id="username" name="username" onChange={handelUsernameChange} placeholder='Enter username here' />
                    </div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="text" id="password" name="password" onChange={handelPasswordChange} placeholder='Enter password here' />
                    </div>
                    <button onClick={handleLogin}>LOG IN</button>
                </div>
            </form>
        </div>
    );
}


export default Login;