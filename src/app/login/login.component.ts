import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommanService } from '../comman.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    signupForm:any = FormGroup;
    users:any = [];


  constructor( private router: Router,
               private frmbuilder: FormBuilder,
               private commanservice: CommanService) { }


  ngOnInit(): void {
    this.signupForm = this.frmbuilder.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', [Validators.required]]
    })

    this.commanservice.getuser().subscribe((data:any) => {
        this.users =data;
    })

  }

  login(data: any) {

    if(data.email) {
        this.users.forEach((item:any) => {
           if(item.email === data.email && item.password === data.password)
           {
                localStorage.setItem("isloggedIn", "true");
                this.router.navigate(['products']);
           }
           else
           {
                localStorage.clear();
           }

        });
    }
  }


}
