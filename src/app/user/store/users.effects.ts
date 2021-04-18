import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadUsersLists, loadUsersListsSuccess, loadUsers, loadUserSuccess} from './users.actions';
import {map, switchMap} from 'rxjs/operators';
import {UserApiService} from '../services/user-api.service';
import { User } from '../models/user.model';
import { forkJoin } from 'rxjs';


@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => this.userApiService.getUsers().pipe(
      map((users) => formatUsersList(users.users)),
      map((users) => loadUserSuccess(users)),
    )),
  ));

  loadUsersSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(loadUserSuccess),
      map((users) => loadUsersLists({ usersIds: Object.values(users).filter(user => typeof user === 'object').map((user: User) => user.id) })),
    ),
  );

  loadUsersLists$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsersLists),
    switchMap(({ usersIds }) => {
      return forkJoin(usersIds.map(userId => this.userApiService.getUserList(userId))).pipe(
        map((usersLists) => loadUsersListsSuccess({ usersLists })),
      )
    }),
  ));

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService
  ) {
  }

}

const formatUsersList = (usersList: User[]): { [key: number]: User } => {
  const usersObject = {};
  for (const user of usersList) {
    usersObject[user.id] = user;
  }
  return usersObject;
}
