import React, { useState } from "react";
import styles from "../styles/homeRegistration.module.css";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";

const HomeRegistration = () => {
  const [homeName, setHomeName] = useState("");
  const [tel, setTel] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  //   const [email, setEmail] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [images, setImages] = useState([]);
  const [homeType, setHomeType] = useState(""); // State to track selected home type
  const [checkbox, setCheckbox] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const [loading, setLoading] = useState(false);

  const handleHome = async (e) => {
    e.preventDefault();

    if (!homeType) {
      toast.error("Select a home type");
      return;
    }

    if (!district) {
      toast.error("Please select a district");
      return;
    }

    if (!checkbox) {
      toast.error(
        "You must agree to the terms and conditions before signing up."
      );
      return;
    }

    if (!/^\d{10}$/.test(tel)) {
      toast.error("Mobile number must be exactly 10 digits long");
      return;
    }

    if (!bank) {
      toast.error("Please select a bank");
      return;
    }

    setLoading(true);

    try {
      // Image upload - converting to base64 strings for Ballerina API
      const imageBase64Urls = await Promise.all(
        [...images].map(async (image) => await convertToBase64(image))
      );

      // Send data to Ballerina backend
      const projectData = {
        projectName: homeName,
        description: description,
        phone: tel,
        images: imageBase64Urls, // base64 encoded image data
        projectType: homeType === "childHome" ? "children" : "adults",
        bankDetails: {
          bankHolder: bankHolder,
          bank: bank,
          branch: branch,
          accNumber: accNumber,
        },
        verified: false,
        createdDate: today,
        address: address,
        city: city,
        district: district,
        owner: "user_uid_placeholder", // Replace with real user ID
      };

      const response = await axios.post(
        "http://localhost:9090/fundraising/newHomeProject",
        projectData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Project registered successfully!");
    } catch (error) {
      toast.error("Failed to register the project");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e) => setImages(e.target.files);
  const handleHomeTypeChange = (e) => setHomeType(e.target.value);

  return (
    <section className={styles.form_container}>
      <h2>Register a Children's/ Adults' home</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleHome}>
          <div className={styles.radioGroup}>
            <div className={styles.form_group_tick}>
              <input
                className={styles.form_check_input}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="childHome"
                onChange={handleHomeTypeChange}
              />
              <label className={styles.form_check_label} htmlFor="inlineRadio1">
                Children's Home
              </label>
            </div>
            <div className={styles.form_group_tick}>
              <input
                className={styles.form_check_input}
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="parentHome"
                onChange={handleHomeTypeChange}
              />
              <label className={styles.form_check_label} htmlFor="inlineRadio2">
                Adult's Home
              </label>
            </div>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="project-name">Home Name:</label>
            <input
              type="text"
              id="project-name"
              name="project-name"
              required
              onChange={(e) => setHomeName(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="description">Telephone</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <div className={styles.form_group}>
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="inputState" className="form_label">
                District
              </label>
              <select
                id="inputState"
                className="form_select"
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="invalid" selected disabled>
                  Choose...
                </option>
                <option value="Colombo">Colombo</option>
                <option value="Galle">Galle</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Hambanthota">Hambanthota</option>
                <option value="Matara">Matara</option>
                <option value="Badulla">Badulla</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Kagalle">Kagalle</option>
                <option value="Madakalapuwa">Madakalapuwa</option>
                <option value="Ampara">Ampara</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Matale">Matale</option>
                <option value="Kandy">Kandy</option>
                <option value="Nuwaraeliya">Nuwaraeliya</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Mannar">Mannar</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mullaitivu">Mullaitivu</option>
              </select>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="bank-details">Bank Details:</label>
              <input
                className={styles.url_text}
                type="text"
                id="name"
                name="Name"
                placeholder="Account holder's name"
                onChange={(e) => setBankHolder(e.target.value)}
                required
              />
              <select
                id="inputState"
                className={styles.url_text}
                title="Select a bank"
                onChange={(e) => setBank(e.target.value)}
              >
                <option value="invalid" selected disabled>
                  Choose...
                </option>
                <option value="Bank of Ceylon">Bank of Ceylon</option>
                <option value="Sampath Bank">Sampath Bank</option>
                <option value="Commercial Bank">Commercial Bank</option>
                <option value="Hatton National Bank">
                  Hatton National Bank
                </option>
                <option value="Nation's Trust Bank">Nation's Trust Bank</option>
              </select>
              <input
                className={styles.url_text}
                type="text"
                id="other-social-media"
                title="Enter the branch name"
                placeholder="Branch name"
                onChange={(e) => setBranch(e.target.value)}
                required
              />
              <input
                className={styles.url_text}
                type="text"
                id="acc-number"
                placeholder="Account Number"
                onChange={(e) => setAccNumber(e.target.value)}
              />
            </div>

            {/* <div className={styles.form_group}>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                If you have a website, link for the website
              </label>
              <input
                type="url"
                className={styles.form_control}
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="social-media">Social Media Profiles:</label>
              <input
                className={styles.url_text}
                type="url"
                id="facebook"
                name="facebook"
                placeholder="Facebook"
                onChange={(e) => setFacebook(e.target.value)}
              />
              <input
                className={styles.url_text}
                type="url"
                id="instagram"
                name="instagram"
                placeholder="Instagram"
                onChange={(e) => setInstagram(e.target.value)}
              />
              <input
                className={styles.url_text}
                type="url"
                id="other-social-media"
                name="other-social-media"
                placeholder="Others"
                onChange={(e) => setSocialMedia(e.target.value)}
              />
            </div> */}
            <div className={styles.form_group}>
              <label htmlFor="inputAddress" className="form-label">
                Images
              </label>
              <div>
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  onChange={handleImageChange}
                  multiple
                  required
                />
              </div>
            </div>
            <div className={styles.form_group}>
              <div className={styles.checkboxContainer}>
                <input
                  className={styles.form_check_input}
                  type="checkbox"
                  id="checkbox"
                  checked={checkbox}
                  onChange={(e) => setCheckbox(e.target.checked)}
                />
                <label
                  className={styles.form_check_label}
                  htmlFor="flexCheckCheckedDisabled"
                >
                  I hereby declare that the information provided is accurate.
                </label>
              </div>
            </div>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default HomeRegistration;
