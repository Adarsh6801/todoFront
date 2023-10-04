import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   username:string=''
  showMenu:boolean=true;
  constructor(private apiService:ApiService) {
    
  }
  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe(token=>{
      if(token){
        const decode:{username:string,password:string}= jwt_decode(token)
        this.username=decode.username
      }
      if(this.username){
        this.showMenu=false;
      }else{
        this.showMenu=true;
      }
    })
  }
  // logot button
  logout(){
    this.username='';
    this.apiService.logout()
  }
}
