import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { loadUsers, switchUser } from '../store/users.actions';
import { selectCurrentUser, selectUserList, selectUsers } from '../store/users.selectors';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private store: Store,
  ) {}

  loadUsers(): void {
    this.store.dispatch(loadUsers());
  }

  getUsers(): Observable<User[]> {
    return this.store.select(selectUsers);
  }

  switchUser(id: number): void {
    this.store.dispatch(switchUser({id}));
  }

  getCurrentUser(): Observable<User> {
    return this.store.select(selectCurrentUser);
  }

  selectUserList$ = (userId: number): Observable<List> => this.store.select(selectUserList(userId));
}
