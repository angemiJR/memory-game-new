import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/reset.css';
import '../styles/Sign-up.css';
//import LocalStorage from '../components/local-storage';


function SignUp() {
    //<LocalStorage/>
    //function LocalStorage() --> need to make this into an exportable function
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedPassword = JSON.parse(localStorage.getItem('password'));

        console.log(storedUser);
        console.log(storedPassword);

        const [user, setUser] = useState("");
        const [password, setPassword] = useState("");

        function handelUserChange (e) {
            setUser(e.target.value);
        }
        useEffect (() => {          //need this to be onclick
            localStorage.setItem('user', JSON.stringify(user));
        },[user]);

        function handlePasswordChange (e) {
            setPassword(e.target.value);
        }
        useEffect(() => {           //need this to be onclick
            localStorage.setItem('password', JSON.stringify(password));
        }, [password]);
    
    const navToLogin = useNavigate();

    const handleSignUpClick = () => {
        navToLogin('/login');
        useEffect(() => {
            localStorage.setItem('', JSON.stringify(info))
        })
    }
    return (
        <div className="signup__body">
            <div className='signup__body_marking marking-L'></div>
            <form action="">
                <div className="signup__form">
                    <div>
                        <label htmlFor="username">USERNAME</label>
                        <input type="text" id="username" name="username" value={user} onChange={handelUserChange} placeholder='Select a username' />
                    </div>
                    <div>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="text" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder='Select a password' />
                    </div>
                    <button onClick={handleSignUpClick}>SIGN UP</button>
                </div>
            </form>
            <div className='signup__body_marking marking-R'></div>
        </div>
    )
}

export default SignUp;