import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private apiService: ApiService, private toast:ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const {username, password} = registerForm.value;
    console.log(username, password);
    
    this.apiService.register(username, password).subscribe(res => {
      console.log(res,'res....');
      if(res){
        this.toast.success('Registered succesfully','',{
          timeOut:1000
        })
        this.router.navigateByUrl('/login')
      }
      registerForm.reset();
    });

  }
}
