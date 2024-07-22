import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { auth } from '../../Firebase/config'
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const { Title } = Typography

const fbProvider = new FacebookAuthProvider();
fbProvider.addScope('email');

export default function Login() {

  const handleFBLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      console.log('result', result);
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
          <Button style={{ width: '100%', marginBottom: 5 }}>Login by Google</Button>
          <Button style={{ width: '100%' }} onClick={handleFBLogin}>Login by Facebook</Button>
        </Col>
      </Row>
    </div >
  )
}
