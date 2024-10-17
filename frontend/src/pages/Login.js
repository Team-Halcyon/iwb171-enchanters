import React, {useState} from 'react';
import styles from '../styles/login.module.css';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import 'boxicons';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in successfully");
            window.location.href = "/home";
            toast.success("User logged in successfully", {position: "top-center", hideProgressBar: true});
        } catch (error) {
            console.log(error);
            toast.error("Login failed: Invalid credentials", {position: "bottom-center", hideProgressBar: true});
        }
    }

    const togglePassword = () => {
        var passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }


    return (
        <section className={styles.container}>
            <div className={styles.form_box}>
                <div className={styles.form_value}>
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className={styles.inputbox}>
                            <box-icon  name='envelope' color="#fff"></box-icon>
                            <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className={styles.inputbox}>
                            <box-icon name='show-alt' color="#fff" className={styles.showPassword} onClick={togglePassword} title="Show Password"></box-icon>
                            <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className={styles.forget}>
                            <label><input type="checkbox" id="remember-me" /> Remember Me</label>
                            {/* Later should add a anchor */}
                            <span>Forgot Password</span>
                        </div>
                        <button className={styles.submit} type="submit" >Log In</button>
                        <div className={styles.register}>
                            <p>Don't have an account? <Link to="/select">Sign Up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
