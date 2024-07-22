import './App.css';
import Chatroom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chatroom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
