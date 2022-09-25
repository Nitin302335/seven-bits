import { createReducer, on } from '@ngrx/store';
import { ActionParent } from '../actions/add-user-actions';
import { UserActionTypes } from '../enums/user-action-types.enum';

export class UserModel {
    firstName: string
    lastName: string
    email: string
    address: string
    state: string
    country: string
    friends: number
    followers: number
    status: string
    role: string
    createdAt: Date
}

export interface State {
    users: UserModel[],
    result: any,
    isLoading: boolean,
    isLoadingSuccess: boolean,
    isLoadingFailed: boolean
}

export const initialState: State = {
    users: [
        {
            firstName: "Nitin",
            lastName: "Jetapara",
            email: "nitin@gmail.com",
            address: "Gandhinagar",
            state: "Gujrat",
            country: "India",
            friends: 123,
            followers: 123,
            status: "ACTIVE",
            role: "ADMIN",
            createdAt: new Date()
        }
    ],
    result: '',
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailed: false
};

// const reducer = createReducer(
//     initialState,
//     on(getUsers, (state, { data }) => ({ ...state, data: data })),
//     // on(fromFeature.throwError, (state, { message }) => ({ ...state, error: message })),
//     // on(fromFeature.setId, (state, { id }) => ({ ...state, id: id })),
//     // on(fromFeature.setData, (state, { data }) => ({ ...state, data: data })),
//     // on(fromFeature.requestId, (state) => ({ ...state })),
// );


export function UserReducer(state = initialState, action: ActionParent) {
    switch (action.type) {
        case UserActionTypes.Get:

            return {}
        case UserActionTypes.Add:
            console.log(`action`, action.payload)
            return [];
        case UserActionTypes.Delete:
            console.log(`action.payload : `, action.payload);
            // [...state.splice(action.payload, 1)];
            // console.log('state: ', state);
            return [];
        default: return state;
    }
    // return reducer(state, action);
}