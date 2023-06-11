// React Import
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components Import
import Login from './components/login';
import UserList from './components/UserList';
import Signup from './components/signup';
import NewsFeed from './components/newsfeed';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
