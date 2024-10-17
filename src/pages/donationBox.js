import React, { useState } from 'react';
import styles from '../styles/donationBox.module.css';
import { auth, db } from '../firebase';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import {useLocation } from 'react-router-dom';

const DonationBox = () => {
    const [amount, setAmount] = useState(null);
    // const [name, setName] = useState('');
    const today = moment().format('YYYY-MM-DD');
    const location = useLocation();
    const { projectID, collectionName } = location.state;


    const handleDonation = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);

                try {

                    await updateDoc(userDocRef, {
                        donations: [...(user.donations || []), { type:collectionName, project:projectID, date: today, amount: amount }]
                    });
                    console.log('Donation recorded successfully');
                } catch (error) {
                    console.error('Error recording donation: ', error);
                }
            } else {
                console.log('No user is logged in');
            }
        });
    };

    

    return (
        <section className={styles.donationBox}>
            <form className={styles.donation_container} onSubmit={handleDonation}>
                <div className={styles.donation_header}>
                    <h1>Secure Donation</h1>
                </div>
                <div className={styles.donation_options}>
                    <button type="button" className={styles.active}>Give once</button>
                    <button type="button">Monthly</button>
                </div>
                <div className={styles.amount_options}>
                    <button type="button" onClick={() => setAmount(12000)}>Rs 12K</button>
                    <button type="button" onClick={() => setAmount(6000)}>Rs 6,000</button>
                    <button type="button" onClick={() => setAmount(3500)}>Rs 3,500</button>
                    <button type="button" onClick={() => setAmount(3000)}>Rs 3,000</button>
                    <button type="button" onClick={() => setAmount(2500)}>Rs 2,500</button>
                    <button type="button" className={styles.active} onClick={() => setAmount(2000)}>Rs 2,000</button>
                </div>
                <div className={styles.custom_amount}>
                    <input classname={styles.value} type="number" placeholder="Rs.2000" onChange={(e) => setAmount(parseInt(e.target.value, 10))} />
                    <select className='currency'>
                        <option value="LKR">LKR</option>
                        <option value="USD">Dollars</option>
                    </select>
                </div>
                <div className={styles.dedicate_option}>
                    <input type="checkbox" id="dedicate"/>
                    <label htmlFor="dedicate">Dedicate this donation</label>
                </div>
                <button className={styles.donate_button} type="submit" >DONATE NOW</button>
            </form>
        </section>
    );
};

export default DonationBox;
