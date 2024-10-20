import React, { useState, useEffect } from 'react';
import styles from '../styles/elders.module.css';
import 'boxicons';

const ChildernHome = () => {
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        const fetchChildrenHomes = async () => {
          try {
            const response = await axios.get('http://localhost:9090/fundraising/childrenHomes');
            setProjects(response.data); 
          } catch (error) {
            console.error('Error fetching projects', error);
          }
        };
      
        fetchChildrenHomes(); 
      }, []);

    return (
        <div>
            <section className={styles.title}>
                <h2>Every Child Deserves a Safe and Loving Home</h2>
            </section>

            <section className={styles.product_container}>
                {projects.map((project) => (
                    <div className={styles.box} key={project.id}>
                        {project.image && project.image.length > 0 ? (
                            <img src={project.image[0]} alt={project.homeName} className={styles.project_image} />
                        ) : (
                            <img src="/child.jpeg" alt="default_project_image" className={styles.project_image} />
                        )}
                        <div className={styles.content}>
                            <h3>{project.homeName}</h3>
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