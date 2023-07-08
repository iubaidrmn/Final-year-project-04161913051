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
import UpdateUser from './components/update_user';
import MatchesList from './components/MatchesList';
import PostsList from './components/PostsList';
import TournamentStats from './components/statistics_screens/tournament_stats';
import MatchStats from './components/statistics_screens/match_stats';
import Homepage from './components/homepage';
import TournamentScreen from './components/tournament_screen';
import MatchScoring from './components/match_scoring';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Dashboard / Newsfeed Routes */}
        <Route path="/TeamDashboard" element={<TeamDashboard />} />
        <Route path="/NewsFeed" element={<NewsFeed />} />
        {/* List Routes */}
        <Route path="/PostsList" element={<PostsList />} />
        <Route path="/TeamsList" element={<TeamsList />} />
        <Route path="/MatchesList" element={<MatchesList />} />
        <Route path="/TournamentList" element={<TournamentList />} />
        {/* Forms Route (For Edit and Add) */}
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/PlayerInMatch" element={<PlayerInMatch />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/CreatePost" element={<Post />} />
        <Route path="/CreateTeam" element={<Team />} />
        <Route path="/CreateTeamMembers" element={<TeamMemers />} />
        {/* Update Routes */}
        <Route path="/MatchUpdate" element={<MatchUpdate />} />
        <Route path="/UpdateUser" element={<UpdateUser />} />
        {/* Stats */}
        <Route path="/TournamentStats" element={<TournamentStats />} />
        <Route path="/MatchStats" element={<MatchStats />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/TournamentScreen" element={<TournamentScreen />} />
        <Route path="/MatchScoring" element={<MatchScoring />} />
      </Routes>
    </Router>
  );
}

export default App;