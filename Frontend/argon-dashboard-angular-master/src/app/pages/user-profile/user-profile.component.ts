import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../layouts/admin-layout/services/user.service';
import { IUser } from '../../layouts/auth-layout/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
    console.log(`this.currentUser profile: `, this.currentUser);
    this.profileForm = this.formBuilder.group({
      firstName: [this.currentUser.firstName, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      email: [this.currentUser.email, Validators.required],
      userName: [''],
      address: [this.currentUser.address],
      country: [this.currentUser.country],
      state: [this.currentUser.state]
    });

  }

}
