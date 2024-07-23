import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Button, Tooltip, Avatar, Form, Input, Alert } from 'antd';
import Message from './Message';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../Firebase/services';
import useFirestore from '../../hooks/useFirestore';

const WrapperStyled = styled.div`
  height: 100vh;
`;

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

function ChatWindow() {
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
  const { userData: { uid, photoUrl, displayName } } = useContext(AuthContext)
  const [inputValue, setInputValue] = React.useState('')
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleOnSubmit = () => {
    addDocument('message', { text: inputValue, uid, photoUrl, roomId: selectedRoom.id, displayName });

    form.resetFields(['message']);

    // Focus to input again after submit.
    if (inputRef?.current) {
      setTimeout(() => { inputRef.current.focus() });
    }
  };

  const condition = useMemo(() => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id
  }), [selectedRoom.id])

  const messages = useFirestore('messages', condition);

  useEffect(() => {
    // Scroll to bottom after message changed.
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [messages])

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className='header__info'>
              <p className='header__title'>{selectedRoom.name}</p>
              <span className='header__description'>{selectedRoom.description}</span>
            </div>

            <ButtonGroupStyled>
              <Button icon={<UserAddOutlined />} type='text'>Mời</Button>
              <Avatar.Group size='small' maxCount={2}>
                <Tooltip title="A"><Avatar>A</Avatar></Tooltip>
                <Tooltip title="B"><Avatar>B</Avatar></Tooltip>
                <Tooltip title="C"><Avatar>C</Avatar></Tooltip>
                <Tooltip title="D"><Avatar>D</Avatar></Tooltip>
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>

          <ContentStyled>
            <MessageListStyled></MessageListStyled>

            <FormStyled form={form}>
              <Form.Item name='message'>
                <Input ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder='Nhập tin nhắn...'
                  bordered={false}
                  autoComplete='off' />
              </Form.Item>

              <Button type='primary' onClick={handleOnSubmit} >Gửi</Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message='Hãy chọn phòng'
          type='info'
          showIcon
          style={{ margin: 5 }}
          closeable
        />
      )}

    </WrapperStyled >
  );
}

export default ChatWindow