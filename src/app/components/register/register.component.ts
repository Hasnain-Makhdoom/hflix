import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor (private userService: UserService, private router: Router) {
    this.formRegister = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {}

  onSubmit () {
    this.userService.register(this.formRegister.value)
      .then(response => {
        console.log(response);
        this.router.navigate([ '/login' ]);
      })
      .catch(error => console.log(error));
  }

}
