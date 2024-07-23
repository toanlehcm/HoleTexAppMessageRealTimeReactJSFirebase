import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { auth } from '../../Firebase/config'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDocument, generateKeywords } from '../../Firebase/services'

const { Title } = Typography

const fbProvider = new FacebookAuthProvider();
fbProvider.addScope('email');

const googleProvider = new GoogleAuthProvider();

export default function Login() {

  const handleFBLogin = async (provider) => {
    try {
      const { additionalUserInfo, user } = await signInWithPopup(auth, provider);

      if (additionalUserInfo?.isNewUser) {
        addDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName?.toLowerCase())
        });
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          console.error('Popup closed by user. Please try again.');
          break;
        case 'auth/network-request-failed':
          console.error('Network error. Please check your internet connection.');
          break;
        default:
          console.error('Error during sign in:', error);
      }
    }
  }

  return (
    <div>
      <Row justify={'center'} style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>Fun Chat</Title>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={() => handleFBLogin(googleProvider)}>Login by Google</Button>
          <Button style={{ width: '100%' }} onClick={() => handleFBLogin(fbProvider)}>Login by Facebook</Button>
        </Col>
      </Row>
    </div >
  )
}
