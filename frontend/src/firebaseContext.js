// src/contexts/FirebaseContext.js
import React, { createContext, useContext } from 'react';
import { auth, db } from './firebase';

const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
