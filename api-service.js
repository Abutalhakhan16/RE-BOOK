/**
 * ReBook API Service
 * Handles all API communication with the backend
 */

const API_URL = 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.token = localStorage.getItem('authToken') || null;
  }

  // Helper method to make requests
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  async getUserPublicProfile(userId) {
    return this.request(`/auth/user/${userId}`);
  }

  // Books endpoints
  async getAllBooks(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/books?${params.toString()}`);
  }

  async getBook(id) {
    return this.request(`/books/${id}`);
  }

  async createBook(bookData) {
    return this.request('/books', {
      method: 'POST',
      body: JSON.stringify(bookData)
    });
  }

  async updateBook(id, bookData) {
    return this.request(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData)
    });
  }

  async deleteBook(id) {
    return this.request(`/books/${id}`, {
      method: 'DELETE'
    });
  }

  async getUserBooks(userId) {
    return this.request(`/books/user/${userId}`);
  }

  // eBooks endpoints
  async getAllEbooks(filters = {}) {
    const params = new URLSearchParams(filters);
    return this.request(`/ebooks?${params.toString()}`);
  }

  async getEbook(id) {
    return this.request(`/ebooks/${id}`);
  }

  async publishEbook(ebookData) {
    return this.request('/ebooks', {
      method: 'POST',
      body: JSON.stringify(ebookData)
    });
  }

  async updateEbook(id, ebookData) {
    return this.request(`/ebooks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ebookData)
    });
  }

  async deleteEbook(id) {
    return this.request(`/ebooks/${id}`, {
      method: 'DELETE'
    });
  }

  async getUserEbooks(userId) {
    return this.request(`/ebooks/user/${userId}`);
  }

  async recordEbookDownload(ebookId) {
    return this.request(`/ebooks/${ebookId}/download`, {
      method: 'POST'
    });
  }

  async rateEbook(ebookId, ratingData) {
    return this.request(`/ebooks/${ebookId}/rate`, {
      method: 'POST',
      body: JSON.stringify(ratingData)
    });
  }

  // Utility methods
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}

// Create singleton instance
const apiService = new APIService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = apiService;
}
