import React, { useState, useEffect } from 'react';
import styles from '../styles/elders.module.css';
import 'boxicons';
import { useNavigate } from 'react-router-dom';


const EldersHome = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // For navigation


    useEffect(() => {
        const fetchAdultHomes = async () => {
          try {
            const response = await fetch('http://localhost:9090/fundraising/adultHomes');
            if (!response.ok) {
              throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setProjects(data); 
          } catch (error) {
            console.error('Error fetching projects', error);
          }
        };
    
        fetchAdultHomes(); 
      }, []); 

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
                        {project.image && project.image.length > 0 ? (
                            <img src={project.image[0]} alt={project.homeName} className={styles.project_image} />
                        ) : (
                            <img src="/elder.jpeg" alt="default_project_image" className={styles.project_image} />
                        )}

                        <div className={styles.content}>
                            <h3>{project.homeName}</h3>
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