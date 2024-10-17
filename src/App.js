import './App.css';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirebaseProvider from './firebaseContext';
import Healthcare from './pages/healthcare';
import DisasterRelief from './pages/disasterRelief';
import EldersHome from './pages/eldersHome';
import ChildrenHome from './pages/childrenHome';
import Signup from './pages/signup';
import SignupOrganization from './pages/signupOrganization';
import Select from './pages/select';
import ProjectRegistration from './pages/projectRegistration';
import HomeRegistration from './pages/homeRegistration';
import SelectProject from './pages/selectProject';
import ProjectView from './pages/project';
import SingleHome from './pages/singleHome';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/userProfile';
import HelpPage from './pages/helpPage';  
import DonationBox from './pages/donationBox';


function App() {
 
  return (
    <FirebaseProvider>
      <div className="App">
        <Router>
          <header><Navbar /></header>

          <Routes>

            <Route path="/" element={<>
              <div><Home /></div>
              {/* <div><Home /></div> */}
              <footer><Footer /></footer></>} />
            <Route path="/home" element={<>
              <div><Home /></div>
              <footer><Footer /></footer></>} />
            <Route path="/select" element={
              <div><Select /></div>} />
            <Route path="/healthcare" element={<>
              <div><Healthcare /></div>
              <footer><Footer /></footer></>} />
              <Route path="/disasterRelief" element={<>
              <div><DisasterRelief /></div>
              <footer><Footer /></footer></>} />
              <Route path="/eldersHome" element={<>
              <div><EldersHome /></div>
              <footer><Footer /></footer></>} />
              <Route path="/childrenHome" element={<>
              <div><ChildrenHome /></div>
              <footer><Footer /></footer></>} />
            <Route path="/login" element={<div><Login /></div>} />
            <Route path="/signup" element={<div><Signup /></div>} />
            <Route path="/signupOrganization" element={<div><SignupOrganization /></div>} />
            <Route path="/selectProject" element={<div><SelectProject /></div>} />
            <Route path="/projectRegistration" element={<div><ProjectRegistration /></div>} />
            <Route path="/homeRegistration" element={<div><HomeRegistration /></div>} />
            <Route path="/project" element={<div><ProjectView /></div>} />
            <Route path="/singleHome" element={<div><SingleHome /></div>} />
            <Route path="/userProfile" element={<div><UserProfile /></div>} />
            
            <Route path="/helpPage" element={<div><HelpPage/></div>}/>
            <Route path="/donationBox" element={<div><DonationBox/></div>}/>
          </Routes>
          <ToastContainer />



        </Router>


      </div>
    </FirebaseProvider>


  );
}

export default App;
