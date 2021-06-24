import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRes } from '../models/Auth/UserRes';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  public userName: any;
  public password: any;

  public user!: UserRes;

  ngOnInit(): void {

  }

  onHandleSubmit(): void {
    console.log(`username: ${this.userName}, password: ${this.password}.`);

    this.onHandleLogin(this.userName, this.password);
  }

  onHandleLogin(userName: string, password: string): any {
    const path = 'https://localhost:44332/api/v1/auth';
    const formData: any = new FormData();
    formData.append('UserName', userName);
    formData.append('Password', password);
    this.http.post<UserRes>(path, formData).subscribe(
      (data) => {
        this.user = data;
        if (data) {
          console.log(this.user);
          alert('Login is success.');
          const dataLogin = {
            isLogin: true,
            token: data.token,
          }
          localStorage.setItem('dataLogin', JSON.stringify(dataLogin));
          return this.router.navigate(['/home']);
        }
        return false;
      },
      (error) => {
        alert('Username or Password is invalid.');
        return false;
      }
    );


  }
}
