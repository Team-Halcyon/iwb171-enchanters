import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/select.module.css';

const Select = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };
    return (
        <section className={styles.select_container}>
        <div className={styles.form_box_select}>
            <div className={styles.form_value}>
                <form>
                    <h2>Are you an;</h2>
                    
                    <div className={styles.buttons_select}>
                        <button className = {styles.submit} type="button" onClick={() => handleNavigate('/signupOrganization')}>Organization</button>
                        <button className={styles.submit} type="button" onClick={() => handleNavigate('/signup')}>Individual</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    );
};

export default Select;