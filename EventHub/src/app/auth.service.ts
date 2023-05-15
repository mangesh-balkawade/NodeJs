import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService 
{

  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  loginUser(user:any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token') //token kadhun takal
    this._router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')  
    //     boolean operator ahe   !!
  }
  // application madhalya local storage madhali key ahe ka nay chk karat 
}
