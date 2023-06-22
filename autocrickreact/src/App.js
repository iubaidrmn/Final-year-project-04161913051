// React Import
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components Import
import Login from './components/login';
import TeamsList from './components/TeamsList';
import Signup from './components/signup';
import NewsFeed from './components/newsfeed';
import Tournament from './components/tournament_form';
import PlayerInMatch from './components/player_in_match_form';
import Match from './components/match_form';
import TeamDashboard from './components/team_dashboard';
import Post from './components/post_form';
import Team from './components/team_form';
import TeamMemers from './components/team_members_form';
import TournamentList from './components/TournamentList';
import MatchUpdate from './components/match_update_form';
<<<<<<< HEAD
=======
import UpdateUser from './components/update_user';
>>>>>>> 001e218200956072b475495ecb86f7f9a3bc8ef5

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TeamsList" element={<TeamsList />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/PlayerInMatch" element={<PlayerInMatch />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/TeamDashboard" element={<TeamDashboard />} />
        <Route path="/CreatePost" element={<Post />} />
        <Route path="/CreateTeam" element={<Team />} />
        <Route path="/CreateTeamMembers" element={<TeamMemers />} />
        <Route path="/TournamentList" element={<TournamentList />} />
        <Route path="/MatchUpdate" element={<MatchUpdate />} />
<<<<<<< HEAD
=======
        <Route path="/UpdateUser" element={<UpdateUser />} />
>>>>>>> 001e218200956072b475495ecb86f7f9a3bc8ef5
      </Routes>
    </Router>
  );
}

export default App;