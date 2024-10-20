import React, { useState, useEffect } from 'react';
import styles from '../styles/healthcare.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DisasterRelief = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchDisasterReleifProject = async () => {
            try {
              const response = await axios.get('http://localhost:9090/fundraising/disaster');
              setProjects(response.data); 
            } catch (error) {
              console.error('Error fetching projects', error);
            }
          };
          
          fetchDisasterReleifProject();
        }, []);
          

    const handleNavigate = (project) => {
        navigate('/project', { state: { project } }); // Pass the project object in the state
    };

    return (
        <div>
            <section className={styles.title}>
                <h2>Help Us Bring Relief to Those in amount...</h2>
            </section>

            <section className={styles.card_container}>
                {projects.map((project) => (

                    <div className={styles.project_card} key={project.id}>
                        <div className={styles.image_container}>
                            {project.verified ? (
                                <img src="/images/verified.jpg" alt="verified" className={styles.verified_icon} />
                            ) : null}
                            {project.images && project.images.length > 0 ? (
                                <img src={project.images[0]} alt={project.projectName} className={styles.project_image} />
                            ) : (
                                <img src="/images/default.jpg" alt="default_project_image" className={styles.project_image} />
                            )}
                        </div>

                        <div className={styles.project_info}>
                            <span className={styles.category}>Disaster Relief</span>
                            <div onClick={() => handleNavigate(project)} className={styles.project_title}>
                                <h3>{project.projectName}</h3>
                            </div>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.progress_bar}>
                                <div className={styles.progress} style={{ width: `${(project.raised / project.amount) * 100}%` }}></div>
                            </div>
                            <p className={styles.status}>{((project.raised / project.amount) * 100).toFixed(0)}% funded</p>
                            <p className={styles.funding}>Raised: LKR {project.raised}</p>
                            <p className={styles.amounted}>amount: LKR {project.amount}</p>
                        </div>
                        <button className={styles.donate_button} onClick={() => handleNavigate(project)}>Donate</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default DisasterRelief;