import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private httpService: HttpClient) {
  }

  getUsers(): Observable<{ users: User[] }> {
    return this.httpService.get<{ users: User[] }>('../../../assets/mocks/users.json');
  }
}
