import '../styles/reset.css';
import '../styles/Login.css'

function Login() {
 
    return (
        <div className="login__body">
        <form action="">
            <div className="login__form">
                <div>
                    <label htmlFor="username">USERNAME</label>
                    <input type="text" id="username" name="username" placeholder='Enter username here'/>
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input type="text" id="password" name="password" placeholder='Enter password here'/>
                </div>
                <button>LOG IN</button>
            </div>
        </form>
    </div>
    );

 }

 export default Login;