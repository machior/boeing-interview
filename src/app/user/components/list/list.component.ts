import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../../models/list.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() selectedUser: User;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
  }

  get userItems$(): Observable<List> {
    return this.userService.selectUserList$(this.selectedUser.id);
  }
}
