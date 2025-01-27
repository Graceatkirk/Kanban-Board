import { JwtPayload, jwtDecode } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  id?: string;
  username?: string;
}

class AuthService {
  getProfile(): CustomJwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<CustomJwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    const isValid = token !== null && !this.isTokenExpired(token);
    console.log('Checking if logged in:', { token: !!token, isValid });
    return isValid;
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      const isExpired = decoded.exp * 1000 < Date.now();
      console.log('Token expiration check:', { exp: decoded.exp, now: Date.now(), isExpired });
      return isExpired;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(idToken: string): void {
    console.log('Auth Service: Storing token and redirecting');
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    console.log('Auth Service: Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.assign('/login');
  }
}

export default new AuthService();