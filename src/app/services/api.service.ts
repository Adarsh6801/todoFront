import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token:string=''
  private jwtToken$= new BehaviorSubject<string>(this.token)
  private API_URL='http://localhost:3000/api';
  constructor(private http:HttpClient, private router: Router, private toast:ToastrService) {
    const fetchedToken=localStorage.getItem('act')
    if(fetchedToken){
      this.token=atob(fetchedToken);
      this.jwtToken$.next(this.token)
    }
  }

  get jwtUserToken():Observable<string>{
    return this.jwtToken$.asObservable();
  }

  // get all todos 
  getAllTodos():Observable<any>{
    return this.http.get(`${this.API_URL}/todo`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    });
  }
  // login user 
  login(username:string,password:string){
    return this.http.post(`${this.API_URL}/auth/login`,{username,password})
    .subscribe((res:any)=>{
      this.token=res.token;
      if(this.token){
        this.toast.success('Login successful, redirecting now....','',{
          timeOut:700,
          positionClass:'toast-top-center'
        }).onHidden.toPromise().then(()=>{
          this.jwtToken$.next(this.token)
          localStorage.setItem('act',btoa(this.token));
          this.router.navigateByUrl('/').then();
        })
      }
    },(err:HttpErrorResponse)=>console.log(err.message))
  }
}
