import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebaseContext';
import { collection, onSnapshot } from "firebase/firestore";
import styles from '../styles/healthcare.module.css';
import { useNavigate } from 'react-router-dom';
// import { onBackgroundMessage } from 'firebase/messaging/sw';

const DisasterRelief = () => {
    const { db } = useFirebase(); // Access Firestore instance from context
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "Disaster Relief"),
            (snapshot) => {
                const projectsArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().projectName,
                    description: doc.data().description,
                    need: doc.data().amount,
                    raised: doc.data().raised,
                    owner: doc.data().owner,
                    imageUrls: doc.data().images,
                    bankDetails: doc.data().bankDetails,
                    phone: doc.data().phone,
                }));

                setProjects(projectsArray);
                console.log(projectsArray);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [db]);

    const handleNavigate = (project) => {
        navigate('/project', { state: { project } }); // Pass the project object in the state
    };

    return (
        <div>
            <section className={styles.title}>
                <h2>Help Us Bring Relief to Those in Need...</h2>
            </section>

            <section className={styles.card_container}>
                {projects.map((project) => (

                    <div className={styles.project_card} key={project.id}>
                        <div className={styles.image_container}>
                            {project.verified ? (
                                <img src="/images/verified.jpg" alt="verified" className={styles.verified_icon} />
                            ) : null}
                            {project.imageUrls && project.imageUrls.length > 0 ? (
                                <img src={project.imageUrls[0]} alt={project.name} className={styles.project_image} />
                            ) : (
                                <img src="/images/default.jpg" alt="default_project_image" className={styles.project_image} />
                            )}
                        </div>

                        <div className={styles.project_info}>
                            <span className={styles.category}>Disaster Relief</span>
                            <div onClick={() => handleNavigate(project)} className={styles.project_title}>
                                <h3>{project.name}</h3>
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.progress_bar}>
                                <div className={styles.progress} style={{ width: `${(project.raised / project.need) * 100}%` }}></div>
                            </div>
                            <p className={styles.status}>{((project.raised / project.need) * 100).toFixed(0)}% funded</p>
                            <p className={styles.funding}>Raised: LKR {project.raised}</p>
                            <p className={styles.needed}>Need: LKR {project.need}</p>
                        </div>
                        <button className={styles.donate_button} onClick={() => handleNavigate(project)}>Donate</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default DisasterRelief;