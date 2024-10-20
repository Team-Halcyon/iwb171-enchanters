import React, { useState, useEffect } from 'react';
import styles from '../styles/project.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'boxicons';


const Project = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { project } = location.state || {}; // Extract the project from state
    const [ownerName, setOwnerName] = useState(''); // State to store the owner's name
    const [imageUrls, setImageUrl] = useState([]); // State to store the image URLs
    const [activeTab, setActiveTab] = useState(1);
    const [comments, setComments] = useState(''); // New comment input state
    const [allComments, setAllComments] = useState([]); // Store all comments
    const [email, setEmail] = useState(''); 

    console.log(project);
    
    const collectionName = project.projectType === "healthCare" ? "Health Care" : "Disaster Relief";

    useEffect(() => {
        
        const fetchProject = async () => {
            try {
            const response = await fetch('http://localhost:9090/fundraising/projects/${project.owner}');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setProjects(data); 
            } catch (error) {
            console.error('Error fetching projects', error);
            }
        };
            
        // const collectionName = project.projectType === "healthCare" ? "Health Care" : "Disaster Relief";

        const fetchImageUrls = async () => {
            try {
                const docRef = doc(db, collectionName, project.id); // Replace with correct collection and project ID
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const images = docSnap.data().images || [];
                    setImageUrl(images);
                } else {
                    console.log("No images found!");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const docRef = doc(db, collectionName, project.id); // Replace with correct collection and project ID
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const commentsData = docSnap.data().comments || [];
                    setAllComments(commentsData); // Set fetched comments
                } else {
                    console.log("No comments found!");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchProject();
        fetchImageUrls();
        fetchComments();
    }, [project, project.owner, project.id, collectionName]);

    // Handle adding a new comment
    const addComment = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                const userName = userDocSnap.exists() ? userDocSnap.data().name : "Anonymous";

                const newComment = {
                    name: userName,
                    comment: comments
                };

                const docRef = doc(db, "Health Care", project.id);
                await updateDoc(docRef, {
                    comments: arrayUnion(newComment)
                });

                setAllComments(prevComments => [...prevComments, newComment]);
                setComments('');
                console.log("Comment added successfully");
            } else {
                console.log("User not authenticated");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Function to navigate to the donation box
    const handleNavigate = (project) => {
        // const docRef = doc(db, collectionName, project.id);
        // navigate('/donationBox', { state: { docRef, collectionName: collectionName} });
        // const docRef = doc(db, "Health Care", project.id);
        navigate('/donationBox', { state: { projectID: project.id, collectionName: "Health Care" } });
    };

    // Handle tab switching
    const handleTabs = (index) => {
        setActiveTab(index);
    };

    if (!project) {
        return <p>No project data found.</p>;
    }

    return (
        <section>
            <section className={styles.heading}>
                <h1>{project.name}<i className={`${styles.fas} ${styles.fa_check_circle}`}></i></h1>
                <p><b>Fundraising campaign by {ownerName}</b></p>
            </section>
            <div className={styles.container}>
                <div className={styles.middle}>
                    <div className={styles.project}>
                        <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} className={styles.carouselBox}>
                            {imageUrls.map((url, index) => (
                                <div key={index}>
                                    <img src={url} alt={`${project.name} ${index + 1}`} className={styles.carousel} />
                                </div>
                            ))}
                        </Carousel>

                        <div className={styles.story_updates}>
                            <div className={styles.tabs}>
                                <button className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`} onClick={() => handleTabs(1)}><h2>Story</h2></button>
                                <button className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`} onClick={() => handleTabs(2)}><h2>Updates</h2></button>
                            </div>
                            <div className={styles.content_box}>
                                <div className={`${styles.content} ${activeTab === 1 ? styles.active : ''}`}>
                                    <p>{project.description}</p>
                                </div>
                                <div className={`${styles.content} ${activeTab === 2 ? styles.active : ''}`}>
                                    {project.updates ? (
                                        <p>{project.updates}</p>
                                    ) : (
                                        <p className={styles.none}>No updates yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className={styles.comments_section}>
                        <h2>Words of Support</h2>
                        <div className={styles.comment_form}>
                            <textarea
                                placeholder="Leave a message..."
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            ></textarea>
                            <button onClick={addComment}>Post Message</button>
                        </div>

                        <div className={styles.comments_list}>
                            {allComments.length > 0 ? (
                                allComments.map((comment, index) => (
                                    <div key={index} className={styles.comment}>
                                        <img src="userprofile.jpg" alt={comment.name} />
                                        <div className={styles.comment_info}>
                                            <p><b>{comment.name}</b></p>
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.none}>No comments yet. Be the first to leave a message!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.side_strip}>
                    <div className={styles.donation_box}>
                        <h1>Rs.{project.raised}</h1>
                        <p><b>raised of Rs.{project.need}</b></p>
                        <div className={styles.progress_bar}>
                            <div className={styles.progress} style={{ width: `${(project.raised / project.need) * 100}%` }}></div>
                        </div>
                        <p className={styles.status}><b>{((project.raised / project.need) * 100).toFixed(0)}% funded</b></p>
                        <button className={styles.donate} onClick={() => handleNavigate(project)}><h2>Donate Now</h2></button>
                        <button className={styles.share}>
                            <i class='bx bxl-facebook-circle'></i>
                            <i class='bx bxl-instagram' ></i>
                            <i class='bx bxl-whatsapp' ></i>
                            <b> Share with Friends</b>
                        </button>
                    </div>

                    <div className={styles.home_project_info}>
                        <h2>CONTACT DETAILS</h2>
                        <div className={styles.profile_content}>
                            <p className={styles.info_title}>Bank Details</p>
                            <p className={styles.info}>{project.bankDetails ? (
                                    <>
                                        {project.bankDetails.bankHolder}<br/>
                                        {project.bankDetails.accNumber}<br/>
                                        {project.bankDetails.bank}<br/>
                                        {project.bankDetails.branch}
                                    </>
                                ) : (
                                    'No bank details available.'
                                )}</p>
                        </div>
                        <hr className={styles.styled_line} />
                        <div className={styles.profile_content}>
                            <p className={styles.info_title}>Telephone Number</p>
                            <p className={styles.info}>+94{project.phone}</p>
                        </div>
                        <hr className={styles.styled_line} />
                        <div className={styles.profile_content}>
                            <p className={styles.info_title}>Email Address</p>
                            <p className={styles.info}>{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Project;
