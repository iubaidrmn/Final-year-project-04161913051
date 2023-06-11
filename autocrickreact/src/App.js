// React Import
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components Import
import Login from './components/login';
import UserList from './components/UserList';
import Signup from './components/signup';
import NewsFeed from './components/newsfeed';
import Tournament from './components/tournament_form';
import PlayerInMatch from './components/player_in_match_form';
import Match from './components/match_form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/PlayerInMatch" element={<PlayerInMatch />} />
        <Route path="/Match" element={<Match />} />
      </Routes>
    </Router>
  );
}

export default App;