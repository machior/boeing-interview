import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private httpService: HttpClient) {
  }

  getUsers(): Observable<{ users: User[] }> {
    return this.httpService.get<{ users: User[] }>('../../../assets/mocks/users.json');
  }

  getUserList(userId: number): Observable<List> {
    return this.httpService.get<List>(`../../../assets/mocks/user${userId}List.json`);
  }
}
