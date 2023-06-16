const API_BASE_URL = 'http://localhost:8000/api';

// Authentication Registration APIs
export const login = async (userData) => {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid login credentials');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const signup = async (userData) => {
  return fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

// Show list of Users APIs
export const getUsers = async (role_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/?role_id=${role_id}`);
    if (!response.ok) {
      throw new Error('Error loading users.');
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error('Error loading users.');
  }
};

export const getCoachNameOfTeam = async (coach_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getCoachNameOfTeam/?coach_id=${coach_id}`);
    if (!response.ok) {
      throw new Error('Error loading coach names.');
    }
    const data = await response.json();
    return data.coachNames;
  } catch (error) {
    throw new Error('Error loading coach names.');
  }
};

export const getRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/roles/`);
    if (!response.ok) {
      throw new Error('Error loading roles.');
    }
    const data = await response.json();
    return data.roles;
  } catch (error) {
    throw new Error('Error loading roles.');
  }
};

export const getTournaments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tournament_list/`);
    if (!response.ok) {
      throw new Error('Error loading Tournaments.');
    }
    const data = await response.json();
    return data.tournaments;
  } catch (error) {
    throw new Error('Error loading Tournaments.');
  }
};

export const getMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches_list/`);
    if (!response.ok) {
      throw new Error('Error loading Matches.');
    }
    const data = await response.json();
    return data.matches;
  } catch (error) {
    throw new Error('Error loading Matches.');
  }
};

export const getTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams_list/`);
    if (!response.ok) {
      throw new Error('Error loading Teams.');
    }
    const data = await response.json();
    return data.teams;
  } catch (error) {
    throw new Error('Error loading Teams.');
  }
};

export const getPlayerInMatchList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player_in_match_list/`);
    if (!response.ok) {
      throw new Error('Error loading Player In Match List.');
    }
    const data = await response.json();
    return data.players_in_match;
  } catch (error) {
    throw new Error('Error loading Player In Match List.');
  }
};

// Save Data in Mongo DB APIs
export const tournamentSave = async (tournamentData) => {
  return fetch(`${API_BASE_URL}/tournamentSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tournamentData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const matchSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/matchSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const playersInMatchSave = async (playersInMatchData) => {
  return fetch(`${API_BASE_URL}/playersInMatchSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playersInMatchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const postSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/postSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const teamSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/teamSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};

export const teamMembersSave = async (matchData) => {
  return fetch(`${API_BASE_URL}/teamMembersSave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid Input');
      }
    })
    .catch((error) => {
      throw new Error(error.error);
    });
};