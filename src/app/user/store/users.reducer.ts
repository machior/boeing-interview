import {createReducer, on} from '@ngrx/store';
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

  on(UsersActions.addItemToUserList, (state, { id, content, title }) => ({
    ...state,
    usersLists: addItemToListItem([...state.usersLists], id, content, title)
  })),
);

const addItemToListItem = ([...usersLists]: List[], id: number, content: string, title: string) => {
  console.log('usersLists', usersLists);
  return usersLists.map(userList => {
    if (userList.userId === id) {
      return {
        userId: userList.userId,
        items: [
          ...userList.items,
          {
            content,
            title,
            id: getNextId(userList)
          }
        ]
      }
    }
    return userList;
  })
}

const getNextId = (userList: List) => {
  if (!userList.items.length) {
    return 0;
  }

  const lastMaxId = userList.items.map(item => item.id);
  return Math.max.apply(null, lastMaxId) + 1;
}
