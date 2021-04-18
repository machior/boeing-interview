import {Action, createReducer, on} from '@ngrx/store';
import * as UsersActions from './users.actions';
import {User} from '../models/user.model';
import { List } from '../models/list.model';

export const usersFeatureKey = 'users';

export interface State {
  users: { [key: number]: User };
  currentUserId?: number;
  usersLists?: List[];
}

export const initialState: State = {
  users: {},
  currentUserId: 1
};


export const reducer = createReducer(
  initialState,

  on(UsersActions.loadUserSuccess, (state, users) => ({
    ...state,
    users,
    currentUserId: 1
  })),

  on(UsersActions.switchUser, (state, {id}) => ({
    ...state,
    currentUserId: id,
  })),

  on(UsersActions.loadUsersListsSuccess, (state, { usersLists }) => ({
    ...state,
    usersLists
  })),
);
