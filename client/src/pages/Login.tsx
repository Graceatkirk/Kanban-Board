import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Submitting login data:', loginData);
      const data = await login(loginData);
      console.log('Login response:', data);
      
      if (data.token) {
        console.log('Token received, calling Auth.login');
        Auth.login(data.token);
      } else {
        console.log('No token in response');
        setError('Login failed - no token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
