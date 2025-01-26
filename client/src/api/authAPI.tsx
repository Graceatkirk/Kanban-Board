import { UserLogin } from "../interfaces/UserLogin";

const API_URL = 'http://localhost:3001';  // Hardcoded for testing

const login = async (userInfo: UserLogin) => {
  try {
    console.log('Attempting login to:', `${API_URL}/auth/login`);
    console.log('With credentials:', userInfo);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export { login };