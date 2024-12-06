import { useState } from 'react';
import '../styles/reset.css';
import '../styles/Sign-up.css';

function SignUp() {
    const [userInfo, setUserInfo] = useState();
    function addUserInfo () {
        
    }
    return (
        <div className="signup__body">
        <div className='signup__body_marking marking-L'></div>
        <form action="">
            <div className="signup__form">
                <div>
                    <label htmlFor="username">USERNAME</label>
                    <input type="text" id="username" name="username" placeholder='Select a username' />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input type="text" id="password" name="password" placeholder='Select a password' />
                </div>
                <button onClick={addUserInfo}>SIGN UP</button>
            </div>
        </form>
        <div className='signup__body_marking marking-R'></div>
    </div>
    )
}

export default SignUp;