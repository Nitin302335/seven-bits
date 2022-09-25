import { Component, OnInit } from '@angular/core';
import {select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddUserAction, RemoveUserAction } from '../../layouts/admin-layout/actions/add-user-actions';
import { UserModel } from '../../layouts/admin-layout/reducers/user.reducer';
import { UserService } from '../../layouts/admin-layout/services/user.service';
import { IUser } from '../../layouts/auth-layout/service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // users: Observable<UserModel[]>;
  users: IUser[];
  isDeleteSuccess = false;
  totalPage: number;
  pages: number[];
  paginationPayload = {
    page: 1,
    pageSize: 5,
    sorting: {
      column: "createdAt",
      direction: "desc"
    }
  }

  constructor(private store: Store<{users: any}>,
    private userService: UserService) {
    // store.pipe(select('users')).subscribe(values => {
    //   console.log('store values', values);
    //   this.users = values;
    // });
  }

  editUser() {
    console.log('AddUser');
    const newUser = new UserModel();
    newUser.firstName = "firstUser";
    this.store.dispatch(new AddUserAction(newUser));
  }

  removeUser(user) {
    this.userService.deleteUser(user._id).subscribe(response => {
      this.isDeleteSuccess = true;
      this.getUser(this.paginationPayload);
    }, (error) => {
      console.log("error: ", error);
    });
  }

  ngOnInit(): void {
    this.getUser(this.paginationPayload);
  }

  changePage(page) {
    this.paginationPayload.page = page;
    this.getUser(this.paginationPayload);
  }

  getUser(paginationPayload) {
    this.userService.getUsers(paginationPayload).subscribe(response => {
      this.users = response?.data?.items || this.users;
      this.totalPage = Math.ceil(response?.data?.total / this.paginationPayload.pageSize);
      this.pages = Array(this.totalPage).fill(0).map((x, i) => i+1);
    }, (error) => {
      console.log("error: ", error);
    });
  }

  closeModel() {
    this.isDeleteSuccess = false;
  }

};