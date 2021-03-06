import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUserstate = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsers = createSelector(
  selectUserstate,
  state => Object.values(state.users),
);

export const selectUserList = (userId: number) =>
  createSelector(selectUserstate, state => state.usersLists?.find(userList => userList.userId === userId)) ?? null;


export const selectCurrentUser = createSelector(
  selectUserstate,
  state => state.users[state.currentUserId]
);
