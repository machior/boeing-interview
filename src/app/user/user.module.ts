import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSwitchComponent } from './components/user-switch/user-switch.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListComponent } from './components/list/list.component';



@NgModule({
  declarations: [UserSwitchComponent, ListComponent],
  exports: [
    UserSwitchComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    EffectsModule.forFeature([UsersEffects]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
