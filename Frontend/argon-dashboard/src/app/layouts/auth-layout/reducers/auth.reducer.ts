import { ActionParent } from '../actions/auth-action';
import { AuthActionTypes } from '../enums/auth-action-types.enum';
import { ILogin, ISignup } from '../service/auth.service';

export class Auth {
    login: any;
    signup: any;
}


export const initialState: Auth = {
    login: {},
    signup: {}
};


export function AuthReducer(state = initialState, action: ActionParent) {
    switch(action.type) {
        default: return state;
    }
}