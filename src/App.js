import './App.css';
import Chatroom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './Modals/AddRoomModal';

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
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
