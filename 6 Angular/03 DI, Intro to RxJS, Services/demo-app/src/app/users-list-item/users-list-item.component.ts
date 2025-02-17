import { Component, Input } from '@angular/core';
import { User } from '../types/user';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.css'],
})
export class UsersListItemComponent {
  @Input() user: User | undefined = undefined;
}
