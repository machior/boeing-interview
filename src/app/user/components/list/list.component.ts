import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { List, ListItem } from '../../models/list.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() selectedUser: User;

  sorted = false;
  addItemForm: FormGroup = this.fb.group({
    title: '',
    content: ''
  });

  constructor(private readonly userService: UserService, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  fixedUserItems(items: ListItem[]): ListItem[] {
    const itemsCopy = [...items];

    !this.sorted
      ? items
      : itemsCopy.sort((a,b) =>
        (a.title > b.title)
        ? 1
        : ((b.title > a.title)
          ? -1
          : 0)
        );

    return itemsCopy;
  }

  addItem(): void {
    console.log(this.addItemForm);
  }

  get userItems$(): Observable<List> {
    return this.userService.selectUserList$(this.selectedUser.id);
  }

  get sortButtonText(): 'unsort by title' | 'sort by title' {
    return this.sorted ? 'unsort by title' : 'sort by title';
  }
}
