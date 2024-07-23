import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';

import { auth } from '../../Firebase/config'
import { AuthContext } from '../../Context/AuthProvider'
import { AppContext } from '../../Context/AppProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username{
    color: white;
    margin-left: 5px
    }
  `;

function UserInfo() {
  const { userData: { displayName, photoURL } } = useContext(AuthContext)
  const { clearState } = useContext(AppContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL} >
          {photoURL ? '' : displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>

      <Button
        ghost
        onClick={() => {
          // Clear state in App Provider when logout
          clearState();
          auth.signOut()
        }}
      >
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
}

export default UserInfo;