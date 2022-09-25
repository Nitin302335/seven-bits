import {Action} from '@ngrx/store';
import { AuthActionTypes } from '../enums/auth-action-types.enum';

export class ActionParent implements Action {
    type: any;
    payload: any;
}


export class AuthAction implements ActionParent {
    type: AuthActionTypes;
    constructor(public payload: any) {

    }
}
