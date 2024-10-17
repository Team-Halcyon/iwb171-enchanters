import React from 'react';
import styles from '../styles/styles.module.css';

const Footer = () => {
    return (
        <>
        <section className={styles.footer}>
                <div className={styles.footer_box}>
                    <img src="logo.jpg" alt="" />
                    <p>
                        Supporting Our Community <br />
                        Every Donation Makes a Difference in Sri Lanka.
                        Join us in our mission to uplift lives and create lasting change.
                        Together, we can build a brighter future for all
                    </p>

                </div>

                <div className={styles.footer_box}>
                    <h3>Follow us</h3>
                    <div className={styles.social}>
                        <li><span><i className='bx bxl-facebook-circle'></i>Facebook</span></li>
                        <li><span><i className='bx bxl-youtube'></i>You Tube</span></li>
                        <li><span><i className='bx bxl-instagram' ></i>Instagram</span></li>
                        <li><span><i className='bx bxl-blogger'></i>Blog</span></li>
                    </div>
                    {/* <div className={styles.social}>
                        <li><a href="#"><i className='bx bxl-facebook-circle'></i>Facebook</a></li>
                        <li><a href="#"><i className='bx bxl-twitter'></i>Twitter</a></li>
                        <li><a href="#"><i className='bx bxl-instagram' ></i>Instagram</a></li>
                        <li><a href="#"><i className='bx bxl-blogger'></i>Blog</a></li>
                    </div> */}
                </div>

                <div className={styles.footer_box }>
                    <h3>View guide</h3>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="payment.html">Donate</a></li>
                    <li><a href="#projects">Fundraise</a></li>
                    <li><a href="#review">Review</a></li>
                </div>

                <div className={styles.footer_box}>
                    <h3>Contact</h3>
                    <div className={styles.contact}>
                        <span><i className='bx bx-map'></i>335, Ruwan Maga, Dodangoda</span>
                        <span><i className='bx bxs-phone' ></i>+94 70 781 4534</span>
                        <span><i className='bx bx-envelope' ></i>athwela@gmail.com</span>
                    </div>
                </div>

            </section>
            <section className={styles.copyright}>
                <h3>................................................................................................................</h3>
                <h3>Copyright <i className='bx bxs-copyright'></i> Athwela 2024</h3>
            </section>
           
            </>
    );
};

export default Footer;