import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface CustomerData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  getCustomers() {
    return this.http.get(`${this.baseUrl}/customer`);
  }
  registerCustomer(customerData: {
    name: string;
    surname: string;
    code: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return this.http.post(`${this.baseUrl}/customer/register`, customerData);
  }

  loginCustomer(customerData: CustomerData) {
    return this.http.post(`${this.baseUrl}/customer/login`, customerData);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCustomerInfo() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/customer/getInfo`, { headers });
  }
  updateProfile(updatedData: {
    name: string;
    surname: string;
    code: string;
    email: string;
    phone: string;
  }) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${this.baseUrl}/customer/updateProfile`,
      updatedData,
      { headers }
    );
  }
  updatePassword(updateData: { before: string; after: string }) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${this.baseUrl}/customer/updatePassword`,updateData,{ headers }
    );
  }
  getPackages() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/customer/getPackages`, { headers });
  }
  deleteProfile() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/customer/deleteProfile`, {
      headers,
    });
  }
}
