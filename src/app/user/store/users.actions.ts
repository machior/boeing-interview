import {createAction, props} from '@ngrx/store';
import { List } from '../models/list.model';
import {User} from '../models/user.model';

const actionsPrefix = '[Users]';
export const loadUsers = createAction(`${actionsPrefix} Load Users`);
export const loadUserSuccess = createAction(`${actionsPrefix} Load Users Success`, props<{ [key: number]: User }>());
export const loadUsersLists = createAction(`${actionsPrefix} Load Users List`, props<{ usersIds: number[] }>());
export const loadUsersListsSuccess = createAction(`${actionsPrefix} Load Users Success List`, props<{ usersLists: List[] }>());
export const addItemToUserList = createAction(`${actionsPrefix} Add Item To User List`, props<{ id: number, content: string, title: string }>());
export const switchUser = createAction(`${actionsPrefix} Switch User`, props<{id: number}>());




