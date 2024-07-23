import './App.css';
import Chatroom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './Modals/AddRoomModal';
import InviteMemberModal from './Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Chatroom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
