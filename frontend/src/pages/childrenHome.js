import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebaseContext';
import { collection, onSnapshot } from "firebase/firestore";
import styles from '../styles/elders.module.css';
import 'boxicons';

const ChildernHome = () => {
    const { db } = useFirebase(); // Access Firestore instance from context
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "Children's Home"),
            (snapshot) => {
                const projectsArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().homeName,
                    address: doc.data().address,
                    description: doc.data().description,
                    owner: doc.data().owner,
                    imageUrls: doc.data().images,
                }));

                setProjects(projectsArray);
                console.log(projectsArray);
            }
        );

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [db]);

    return (
        <div>
            <section className={styles.title}>
                <h2>Every Child Deserves a Safe and Loving Home</h2>
            </section>

            <section className={styles.product_container}>
                {projects.map((project) => (
                    <div className={styles.box} key={project.id}>
                        {project.imageUrls && project.imageUrls.length > 0 ? (
                            <img src={project.imageUrls[0]} alt={project.name} className={styles.project_image} />
                        ) : (
                            <img src="/child.jpeg" alt="default_project_image" className={styles.project_image} />
                        )}
                        <div className={styles.content}>
                            <h3>{project.name}</h3>
                            <span ><box-icon type='solid' name='map'></box-icon>{project.address}</span>

                        </div>
                        <div className={styles.actions}>

                            <span className={styles.donate_button}>Donate</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ChildernHome;