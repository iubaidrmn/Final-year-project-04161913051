const API_BASE_URL = 'http://localhost:8000/api';

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


export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/`);
    if (!response.ok) {
      throw new Error('Error loading users.');
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    throw new Error('Error loading users.');
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
