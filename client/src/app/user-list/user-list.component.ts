import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DirectiveModule } from '../directives/directive.module';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, DirectiveModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input("data") data: any;
}
