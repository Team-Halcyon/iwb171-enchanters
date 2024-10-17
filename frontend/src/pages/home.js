import React, { useEffect, useState } from 'react';
import styles from '../styles/styles.module.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';
// import { doc, getDoc} from 'firebase/firestore';

const Home = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(user);

// const getDocument = async (docId) => {
//   const docRef = doc(db, "users", docId); // Specify the collection and document ID
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     console.log("Collection path:", docRef.parent.path); // This gives you the collection path
//   } else {
//     console.log("No such document!");
//   }
// };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  // const [slideIndex, setSlideIndex] = useState(0);

  // const slides = [
  //   {
  //     image: '/project-img2.jpeg',
  //     caption: 'Join us in supporting a brave child\'s fight against cancer. Your generous donation can provide life-saving treatments and hope for a brighter, healthier future. Together, we can make a difference.'
  //   },
  //   {
  //     image: '/project-img3.jpg',
  //     caption: 'Help us equip underprivileged students with essential school supplies. Your contribution can empower their education and pave the way for a brighter future. Together, let\'s make learning accessible for all.'
  //   },
  //   {
  //     image: '/project-img1.jpg',
  //     caption: 'Support our mission to provide nutritious meals for elderly residents in need. Your donation can bring comfort and nourishment to those who deserve our care. Together, let\'s make a difference.'
  //   }
  // ];

  // const showSlides = () => {
  //   if (slideIndex >= slides.length) {
  //     setSlideIndex(0);
  //   } else if (slideIndex < 0) {
  //     setSlideIndex(slides.length - 1);
  //   }
  // };

  // const nextSlide = () => {
  //   setSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
  // };

  // const prevSlide = () => {
  //   setSlideIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  // };

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  //   return () => clearInterval(interval); // Clean up the interval on component unmount
  // }, [nextSlide]);

  // useEffect(() => {
  //   showSlides();
  // }, [slideIndex]);

  return (
    <div>
      <section className={styles.home} id="home">
        <div className={styles.homeText}>
          <h1>Donate to make a<br />Difference!!!</h1>
          <p>
            We seamlessly connect generous donors with those in need,
            ensuring secure and easy donation. By celebrating the
            power of micro-donations, we turn small contributions into a
            powerful force for change, fostering a community where
            every act of generosity makes a significant impact.
          </p>
          <div className={styles.buttons}>
            {(user) ? (
              <Link to="/selectProject" className={styles.btn}>Start Fundraising</Link>
            ) : (
              <Link to="/login" className={styles.btn}>Start Fundraising</Link>
            )}
            <a href="#projects" className={styles.btn}>Donate Now</a>
          </div>
        </div>

        {/* <div className="slider-container">
          <div className="slider" style={{ transform: `translateX(${-slideIndex * 100}%)`, display: 'flex', transition: 'transform 0.5s ease-in-out' }}>
        <div className={styles.sliderContainer}>
          <div className={styles.slider} style={{ transform: `translateX(${-slideIndex * 100}%)`, display: 'flex', transition: 'transform 0.5s ease-in-out' }}>
            {slides.map((slide, index) => (
              <div className={styles.slide} key={index} style={{ minWidth: '100%', boxSizing: 'border-box' }}>
                <img src={slide.image} alt={`Slide ${index + 1}`} />
                <div className={styles.caption}>{slide.caption}</div>
              </div>
            ))}
          </div>
          <button className="prev" onClick={prevSlide}>&#10094;</button>
          <button className="next" onClick={nextSlide}>&#10095;</button>
        </div> */}
      </section>

      <section className={styles.about} id="about">
        <section className={styles.description}>
          <div className={styles.aboutImg}>
            <img src="/about-img.webp" alt="What is අත්වැල" />
          </div>
          <div className={styles.aboutText}>
            <h2>What is අත්වැල...?</h2>
            <p>
              We are a group of undergraduates at the Department of Computer Science and Engineering,
              University of Moratuwa. Driven by a shared commitment to social welfare, we've crafted
              this platform with one clear purpose: to extend a helping hand where it's needed most.
              From providing a lifeline to children's and adults' homes through dedicated registration
              processes ensuring authenticity, to rallying support for urgent medical needs with transparent
              fundraising and real-time tracking, every initiative is rooted in empathy and empowered by technology.
              Together, we're not just building a website; we're fostering hope,
              resilience, and a brighter tomorrow for all.
            </p>
          </div>
        </section>

        <section className={styles.mission}>
          <div className={styles.missionText}>
            <h2>Our Mission</h2>
            <p>Our mission is to create a secure and transparent platform that bridges
              the gap between generous donors and those in need, fostering a spirit of
              giving and community support. We aim to empower individuals and organizations
              by providing a reliable space to share their stories and raise funds for meaningful causes,
              ensuring that every donation, no matter how small, contributes to making a significant impact.
              Through innovation, trust, and compassion, we strive to build a more connected and
              empathetic society where everyone has the opportunity to support and uplift one another.
            </p>
          </div>
          <div className={styles.missionImg}>
            <img src="/mission.jpg" alt="Our Mission" />
          </div>
        </section>

        <section>
          <div className={styles.statsBar}>
            <img src="/statbar-img.jpg" alt="Background" />
            <div className={styles.overlay}>
              <div className={styles.stat}>
                <h2>11</h2>
                <p>Months</p>
              </div>
              <div className={styles.stat}>
                <h2>LKR 246,598.53</h2>
                <p>Donations Raised</p>
              </div>
              <div className={styles.stat}>
                <h2>298</h2>
                <p>Donors</p>
              </div>
              <div className={styles.stat}>
                <h2>51</h2>
                <p>Projects</p>
              </div>
              <div className={styles.stat}>
                <h2>2</h2>
                <p>Companies</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.project} id="projects">
          <div className={styles.projectText}>
            <h2>Find Our Projects You Care About</h2>
          </div>
          <div className={styles.projectContainer}>
            <Link to="/healthcare">
              <div className={styles.imageContainer}>
                <img src="/health.png" alt="Healthcare" />
                <div className={styles.overlayText}><b><h3>Healthcare</h3></b></div>
              </div>
            </Link>
            <Link to="/disasterRelief">
              <div className={styles.imageContainer}>
                <img src="/disaster.png" alt="Disaster Relief" />
                <div className={styles.overlayText}><b><h3>Disaster Relief</h3></b></div>
              </div>
            </Link>

            <Link to="/childrenHome">
              <div className={styles.imageContainer}>
                <img src="/child.jpeg" alt="Children's Homes" />
                <div className={styles.overlayText}><b><h3>Children's Homes</h3></b></div>
              </div>
            </Link>
            <Link to="/eldersHome">
              <div className={styles.imageContainer}>
                <img src="/elder.jpeg" alt="Elders' Homes" />
                <div className={styles.overlayText}><b><h3>Elders' Homes</h3></b></div>
              </div>
            </Link>
          </div>
        </section>

        <section className={styles.review}>
          <div className={styles.title}>
            <h2>What people are saying about our charity activities</h2>
          </div>

          <div className={styles.customerContainer}>
            <div className={styles.box}>
              <h2>Sameera Silva</h2>
              <img src="/customer1.jpg" alt="Dinara de Silva" />
              <p>After my mother was diagnosed with a serious illness, we were struggling to cover her medical expenses.
                Halcyon gave us hope when we needed it most. Through the platform, we were able to quickly set up a fundraiser
                and share our story. We were able to afford the treatment, with the support we received from donors. My mother
                is now on her way to recovery. Thanks to Halcyon and everyone who donated!
              </p>
            </div>
            <div className={styles.box}>
              <h2>Ramesh Perera</h2>
              <img src="/customer2.jpg" alt="Ramesh Perera" />
              <p>I was always hesitant to donate online because of concerns about where my money would actually go.
                But Halcyon completely changed my perspective! The verification process for medical cases gave me
                confidence, and the platform’s transparency ensured I could see exactly how my contributions were making
                a difference. I love how easy it is to make even small donations, knowing they will collectively have a
                big impact. Halcyon has made giving so much more accessible and meaningful!
              </p>
            </div>
            <div className={styles.box}>
              <h2>Amasha Fernando</h2>
              <img src="/customer3.jpg" alt="Amasha Fernando" />
              <p>What I appreciate most about Halcyon is the ease of use and the sense of trust it builds.
                The secure payment gateway and real-time updates make me feel like I am truly a part of every
                campaign I support. It’s amazing to see the progress of each fundraiser and know that my donations,
                no matter how small, are contributing to someone's well-being. I would recommend this platform to anyone
                looking to make a positive impact in our community.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;

