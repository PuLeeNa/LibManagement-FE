import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/booklib/api/auth` || 'http://localhost:8081/booklib/api/auth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
    }
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async validateToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      await axios.post(`${API_URL}/validate`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
}

export default new AuthService();