import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/reset.css';
import '../styles/Sign-up.css';

function SignUp() {

    const [info, setInfo] = useState({ //defines the object to be stored
        username: "",
        password: ""
    });

    const handelUsernameChange = (e) => {   //updates the username
        let updatedValue = {};
        updatedValue = {username:e.target.value}
        setInfo(info => ({
            ...info,
            ...updatedValue
        }));
    }
    const handelPasswordChange = (e) => {   //updates the password
        let updatedValue = {};
        updatedValue = {password:e.target.value}
        setInfo(info => ({
            ...info,
            ...updatedValue
        }));
    }
    const navToLogin = useNavigate();

    const handleSignUpClick = () => {
        localStorage.setItem("info", JSON.stringify(info)); //submits the info as wth the key of 'info' to local storage
        navToLogin('/login');
    }

    return (
        <div className="signup__body">
            <div className='signup__body_marking marking-L'></div>
            <form action="">
                <div className="signup__form">
                    <div>
                        <label htmlFor="username">USERNAME</label>
                        <input type="text" id="username" name="username" onChange={handelUsernameChange} placeholder='Select a username' />
                    </div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="text" id="password" name="password" onChange={handelPasswordChange} placeholder='Select a password' />
                    </div>
                    <button onClick={handleSignUpClick}>SIGN UP</button>
                </div>
            </form>
            <div className='signup__body_marking marking-R'></div>
        </div>
    );
}

export default SignUp;