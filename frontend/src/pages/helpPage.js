import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from '../styles/helpPage.module.css';

/*const HelpPage = () => {
    return (
      <div>
       ///content
      </div>
    );
  };
  
  export default HelpPage;*/


const HelpPage = () => {

    // const navigate = useNavigate();

    // const handleNavigate = (path) => {
    //     navigate(path);
    // };

    return (

        <section className={styles.help}>
            <section className={styles.faqContainer}>
                <h1>
                    Frequently asked questions?
                </h1>
                <div className={styles.tab}>
                    <input type="checkbox" name="acc" id="acc1" />
                    <label for="acc1">
                        <h2>01</h2>
                        <h3>Question 1?</h3>
                    </label>
                    <div className={styles.answer}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor similique beatae culpa, perferendis provident molestias
                            sapiente ipsa exercitationem dicta ullam autem modi. Excepturi
                            facere voluptatibus dolor delectus distinctio sequi. Vel?
                        </p>
                    </div>
                </div>

                <div className={styles.tab}>
                    <input type="checkbox" name="acc" id="acc2" />
                    <label for="acc2">
                        <h2>02</h2>
                        <h3>Question 2?</h3>
                    </label>
                    <div className={styles.answer}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor similique beatae culpa, perferendis provident molestias
                            sapiente ipsa exercitationem dicta ullam autem modi. Excepturi
                            facere voluptatibus dolor delectus distinctio sequi. Vel?
                        </p>
                    </div>
                </div>

                <div className={styles.tab}>
                    <input type="checkbox" name="acc" id="acc3" />
                    <label for="acc3">
                        <h2>03</h2>
                        <h3>Question 3?</h3>
                    </label>
                    <div className={styles.answer}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor similique beatae culpa, perferendis provident molestias
                            sapiente ipsa exercitationem dicta ullam autem modi. Excepturi
                            facere voluptatibus dolor delectus distinctio sequi. Vel?
                        </p>
                    </div>
                </div>

                <div className={styles.tab}>
                    <input type="checkbox" name="acc" id="acc4" />
                    <label for="acc4">
                        <h2>04</h2>
                        <h3>Question 4?</h3>
                    </label>
                    <div className={styles.answer}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor similique beatae culpa, perferendis provident molestias
                            sapiente ipsa exercitationem dicta ullam autem modi. Excepturi
                            facere voluptatibus dolor delectus distinctio sequi. Vel?
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.form_overlay} id="contact">
                <h2>Contact Us</h2>
                <form>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required />

                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" required />

                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required />

                    <label for="message">Message</label>
                    <textarea id="message" name="message" placeholder="Your Message" required></textarea>

                    <button type="submit">Send Message</button>
                </form>
            </section>
        </section>
        // </div>
    );
};

export default HelpPage;