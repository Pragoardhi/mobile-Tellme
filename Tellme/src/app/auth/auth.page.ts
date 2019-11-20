import { SignupPage } from './signup/signup.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private modalCtrl: ModalController, private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(f: NgForm) {
    this.authSvc.login(f.value.email, f.value.pwd).subscribe(resp => {
      if(resp.idToken){
        console.log(resp);
        this.router.navigateByUrl('/home');
      }else{
        console.log('login failed');
      }
    },
    errorResp => {
      console.log(errorResp);
      console.log('login failed');
    });
  }

  async onViewRegister() {
    const modal = await this.modalCtrl.create({
      component: SignupPage
    });
    return await modal.present();
  }

}
