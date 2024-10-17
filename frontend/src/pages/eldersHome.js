import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebaseContext';
import { collection, onSnapshot } from "firebase/firestore";
import styles from '../styles/elders.module.css';
import 'boxicons';
import { useNavigate } from 'react-router-dom';


const EldersHome = () => {
    const { db } = useFirebase(); // Access Firestore instance from context
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // For navigation


    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "Adults Home"),
            (snapshot) => {
                const projectsArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    homeType: doc.data().homeType,
                    name: doc.data().homeName,
                    address: doc.data().address,
                    description: doc.data().description,
                    owner: doc.data().owner,
                    imageUrls: doc.data().images,
                    bankDetails: doc.data().bankDetails,
                    phone: doc.data().telephone,
                    web: doc.data().email,
                }));

                setProjects(projectsArray);
                console.log(projectsArray);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [db]);

    const handleNavigate = (project) => {
        navigate('/singleHome', { state: { project } });
    };

    return (
        <div>
            <section className={styles.title}>
                <h2>Caring for Those Who Once Cared for Us</h2>
            </section>

            <section className={styles.product_container}>
                {projects.map((project) => (
                    <div className={styles.box} key={project.id}>
                        {project.imageUrls && project.imageUrls.length > 0 ? (
                            <img src={project.imageUrls[0]} alt={project.name} className={styles.project_image} />
                        ) : (
                            <img src="/elder.jpeg" alt="default_project_image" className={styles.project_image} />
                        )}

                        <div className={styles.content}>
                            <h3>{project.name}</h3>
                            <span >
                                <box-icon name='map' ></box-icon>{project.address}
                            </span>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.donate_button} onClick={() => handleNavigate(project)}>Donate</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default EldersHome;