import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthPage, SignupPage, ForgotPasswordPage],
  entryComponents: [SignupPage, ForgotPasswordPage]
})
export class AuthPageModule {}
