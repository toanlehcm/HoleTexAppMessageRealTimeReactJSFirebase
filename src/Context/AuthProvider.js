import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/config';
import { Spin } from 'antd';

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  // When login successful, this function will be called.
  const navigate = useNavigate();


  // Listen event login successful or fail.
  useEffect(() => {
    // Assign unsubscribe to clear event.
    const unsubscribe = onAuthStateChanged(auth, (userDataLogin) => {
      if (userDataLogin) {
        const { displayName, email, uid, photoURL } = userDataLogin;
        setUserData(displayName, email, uid, photoURL);
        setIsLoading(false);
        navigate('/');
        return;
      }
      //Reset user data.
      setUserData({})
      setIsLoading(false);
      navigate('/login')
    });

    // Clear function.
    return () => { unsubscribe() };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userData }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;