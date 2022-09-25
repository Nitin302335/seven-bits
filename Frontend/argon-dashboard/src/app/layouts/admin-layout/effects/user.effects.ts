// import { Injectable } from '@angular/core';
// import { createEffect, ofType, Actions  } from '@ngrx/effects';
// import { map, exhaustMap } from 'rxjs/operators';
// import { getUsers, setUsers } from '../actions/add-user-actions';
// import { UserService } from '../services/user.service';


// @Injectable()
// export class UserEffects {
//     // submit object with props
//     // => use object props to call HTTP service
//     // =>
//     constructor(private actions$: Actions, private userService: UserService) { }

//     getUsers$ = createEffect(
//         () =>
//             this.actions$.pipe(
//                 ofType(getUsers as any),
//                 map(action => action.data),
//                 exhaustMap(
//                     (obj) => this.userService.getUsers(obj).pipe(
//                         map(resp => {
//                             setUsers({ users: resp })
//                         })
//                     )
//                 )
//             )
//     );
// }