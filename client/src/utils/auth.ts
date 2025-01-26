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
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      
      // Check if the token is expired
      // exp is in seconds, Date.now() is in milliseconds
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    window.location.assign('/'); // Redirect to home page
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();