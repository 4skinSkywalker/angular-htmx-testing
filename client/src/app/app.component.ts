import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DirectiveModule } from './directives/directive.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, DirectiveModule, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test';
}
