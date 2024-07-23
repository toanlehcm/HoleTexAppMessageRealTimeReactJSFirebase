import React, { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import { Form, Modal, Input } from 'antd';
import { addDocument } from '../Firebase/services';

function AddRoomModal(props) {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const { userData: { uid } } = useContext(AuthContext)
  const [form] = Form.useForm();

  const handleOk = () => {
    // Handle logic add new room to firestore.
    addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

    // Reset form value.
    form.resetFields();

    setIsAddRoomVisible(false);
  }

  const handleCancel = () => {
    //  Reset form value.
    form.resetFields();

    setIsAddRoomVisible(false);
  }

  return (
    <div>
      <Modal
        title='Tạo phòng'
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='Tên phòng' name='name'>
            <Input placeholder='Nhập tên phòng' />
          </Form.Item>

          <Form.Item label='Mô tả' name='description'>
            <Input.TextArea placeholder='Nhập mô tả' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoomModal;