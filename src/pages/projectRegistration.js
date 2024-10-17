import React, { useState } from 'react';
import styles from '../styles/projectRegistration.module.css';
// import {app} from '../firebase';
import { db, storage, auth } from '../firebase';
// import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import moment from 'moment';

const ProjectRegistration = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [raised, setRaised] = useState('0');
    const [deadline, setDeadline] = useState('');
    const [phone, setPhone] = useState('');
    const [images, setImages] = useState([]);
    const [evidence, setEvidence] = useState('');
    const [bankHolder, setBankHolder] = useState('');
    const [bank, setBank] = useState('');
    const [branch, setBranch] = useState('');
    const [accNumber, setAccNumber] = useState('');
    const [projectType, setProjectType] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const today = moment().format('YYYY-MM-DD');


    const [loading, setLoading] = useState(false);

    const handleProject = async (e) => {
        e.preventDefault();

        if (!projectType) {
            console.log("Please select a project type");
            toast.error("Select a project type");
            return;
        }

        if (checkbox === false) {
            console.log("Please agree to the terms");
            toast.error("Please agree to the terms");
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            console.log("Invalid phone number");
            toast.error("Invalid phone number");
            return;
        }

        if (bank === "") {
            console.log("Please select a valid bank");
            toast.error("Please select a bank");
            return;
        }

        auth.onAuthStateChanged(async (user) => {
            if (user) {

                setLoading(true);

                try {
                    const imageUrls = await Promise.all(
                        [...images].map(async (image) => {
                            const imageRef = ref(storage, `images/${image.name}`);
                            await uploadBytes(imageRef, image);
                            return await getDownloadURL(imageRef);
                        })
                    );

                    const evidenceUrls = await Promise.all(
                        [...evidence].map(async (evidence) => {
                            const evidenceRef = ref(storage, `evidence/${evidence.name}`);
                            await uploadBytes(evidenceRef, evidence);
                            return await getDownloadURL(evidenceRef);
                        })
                    );

                    const collectionName = projectType === 'healthCare' ? "Health Care" : "Disaster Relief";

                    const docRef = await addDoc(collection(db, collectionName), {
                        owner: user.uid,
                        projectName: projectName,
                        description: description,
                        amount: amount,
                        raised: raised,
                        deadline: deadline,
                        phone: phone,
                        images: imageUrls,
                        evidence: evidenceUrls,
                        projectType: projectType,
                        bankDetails: {
                            bankHolder: bankHolder,
                            bank: bank,
                            branch: branch,
                            accNumber: accNumber
                        },
                        verified: false,
                    });

                    console.log("Document written with ID: ", docRef.id);
                    toast.success('Project registered successfully');

                    const userDocRef = doc(db, "users", user.uid);
                    await updateDoc(userDocRef, {
                        campaigns: [...(user.campaigns || []), { type:collectionName, project:docRef.id, date: today}]
                    });


                } catch (error) {
                    console.error('Error uploading images:', error);
                    toast.error('Failed to upload images');
                    return;
                } finally {
                    setLoading(false);
                }
            } else {
                toast.error("No user is logged in");
            }
        });


    }

    const handleProjectTypeChange = (e) => {
        setProjectType(e.target.value);
    }

    return (
        <section className={styles.form_container}>
            <h2>Register Your Fundraising Project</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleProject} method="post" enctype="multipart/form-data">
                    <div className={styles.radioGroup}>
                        <div className={styles.form_group_tick}>
                            <input className={styles.form_check_input} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="healthCare" onChange={handleProjectTypeChange} />
                            <label className={styles.form_check_label} htmlFor="inlineRadio1">Health Care</label>
                        </div>
                        <div className={styles.form_group_tick}>
                            <input className={styles.form_check_input} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="disasterRelief" onChange={handleProjectTypeChange} />
                            <label className={styles.form_check_label} htmlFor="inlineRadio2">Disaster Relief</label>
                        </div>
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="project-name">Project Name:</label>
                        <input type="text" id="project-name" name="project-name" required onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="description">Brief Description:</label>
                        <textarea id="description" name="description" rows="4" required onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="amount">Amount to Raise:</label>
                        <input type="number" id="amount" name="amount" required onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="raised">Amount Raised So Far:</label>
                        <input type="number" id="raised" name="raised" required onChange={(e) => setRaised(e.target.value)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="deadline">Deadline:</label>
                        <input type="date" id="deadline" name="deadline" required onChange={(e) => setDeadline(e.target.value)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="phone">Telephone Number:</label>
                        <input type="tel" id="phone" name="phone" required onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="images">Images:</label>
                        <input type="file" id="images" name="images" accept="image/*" multiple required onChange={(e) => setImages(e.target.files)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="evidence">Evidence Document:</label>
                        <input type="file" id="evidence" name="evidence" accept=".pdf,.doc,.docx" multiple required onChange={(e) => setEvidence(e.target.files)} />
                    </div>
                    <div className={styles.form_group}>
                        <label htmlFor="bank-details">Bank Details:</label>
                        <input className={styles.url_text} type="text" id="name" name="Name" placeholder="Account holder's name" onChange={(e) => setBankHolder(e.target.value)} required/>
                        <select id="inputState" className={styles.url_text} title='Select a bank' onChange={(e) => setBank(e.target.value)}>
                                    <option value="invalid" selected disabled>Choose...</option>
                                    <option value="Bank of Ceylon">Bank of Ceylon</option>
                                    <option value="Sampath Bank">Sampath Bank</option>
                                    <option value="Commercial Bank">Commercial Bank</option>
                                    <option value="Hatton National Bank">Hatton National Bank</option>
                                    <option value="Nation's Trust Bank">Nation's Trust Bank</option>
                                </select>
                        <input className={styles.url_text} type="text" id="other-social-media" title='Enter the branch name' placeholder="Branch name" onChange={(e) => setBranch(e.target.value)} required/>
                        <input className={styles.url_text} type="text" id="acc-number" placeholder="Account Number" onChange={(e) => setAccNumber(e.target.value)}/>
                    </div>
                    <div className={styles.form_check}>
                        <div className={styles.checkboxContainer}>
                            <input className={styles.form_check_input} type="checkbox" checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} />
                            <label className={styles.form_check_label} htmlFor="flexCheckCheckedDisabled">
                                I hereby declare that the information provided is accurate.
                            </label>
                        </div>
                    </div>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
            )}

        </section>

    );
}

export default ProjectRegistration;
