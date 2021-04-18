import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadUsers, loadUserSuccess} from './users.actions';
import {map, switchMap} from 'rxjs/operators';
import {UserApiService} from '../services/user-api.service';
import { User } from '../models/user.model';


@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => this.userApiService.getUsers()),
    map((users) => formatUsersList(users.users)),
    map((users) => loadUserSuccess(users)),
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
