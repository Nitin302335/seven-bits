import { Action, createAction, props } from '@ngrx/store';
import { UserActionTypes } from '../enums/user-action-types.enum';
import { UserModel } from '../reducers/user.reducer';

export class ActionParent implements Action {
    type: any;
    payload: any;
}


export class AddUserAction implements ActionParent {
    type = UserActionTypes.Add;
    constructor(public payload: any) {

    }
}

export class RemoveUserAction implements ActionParent {
    type = UserActionTypes.Delete;
    constructor(public payload: any) {

    }
}

// export const getUsers = createAction("getUsers", props<{ data: any }>());
// export const setUsers = createAction("setUsers", props<{ users: any }>());
