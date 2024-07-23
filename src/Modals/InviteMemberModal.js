import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { db } from '../Firebase/config';
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { AppContext } from '../Context/AppProvider';

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      // Reset previous options.
      setOptions([]);
      setFetching(true);

      // Promise call API, return new options.
      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      })
    }

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      // Clear when unmount.
      setOptions([])
    }
  }, [])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value} title={option.label}>
          <Avatar size='small' src={option.photoURL}>
            {option.photoURL ? '' : option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Select.Option>
      ))}
    </Select>
  )
}

async function fetchUserList(search, curMembers) {
  const q = query(
    collection(db, 'users'),
    where('keywords', 'array-contains', search?.toLowerCase()),
    orderBy('displayName'),
    limit(20) // Limit to 20 results.
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((opt) => !curMembers.includes(opt.value));
}

function InviteMemberModal(props) {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const [form] = Form.useForm();

  const handleOk = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    // update members in current room
    const roomRef = collection(db, 'rooms').doc(selectedRoomId);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form.resetFields();
    setValue([]);

    setIsInviteMemberVisible(false);
  };

  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMemberModal;