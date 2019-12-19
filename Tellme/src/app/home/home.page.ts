import { Todo, TodoService } from './../services/todo.service';
import { UserService } from './../user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  i;
  public isLogin =  this.userSvc.getUID();
  todos: Todo[];
  tampung = [];
  private sub: Subscription;
  
  constructor(private localNotifications: LocalNotifications, private alertController: AlertController, private todoSvc: TodoService, private userSvc: UserService, private router: Router, private authSvc: AuthService) {}
  
  ngOnInit(){
    console.log(this.authSvc.isAuthenticated);
    if(this.isLogin == null){
      this.router.navigateByUrl('/auth');
    }
      // console.log('masuk sini');
      this.sub  = this.todoSvc.getTodos().subscribe(res => {
        console.log(res.length);  
        this.todos = res;

        for(this.i = 0; this.i<this.todos.length; this.i++){
          console.log(this.todos[this.i].title);
          if(this.todos[this.i].startDate<=new Date().getDate() || this.todos[this.i].endDate>=new Date().getDate()){
            console.log("keluar notifikasi");
            this.localNotifications.schedule({
              text: this.todos[this.i].title+"\n"+this.todos[this.i].note+"\n"+this.todos[this.i].address,
              trigger: {at: new Date(new Date().getTime() + 3600)},
              led: 'FF0000',
              sound: null
           });
           
          }
        }
        // console.log(this.todos.length);
      });
      // console.log(res.length);  
    //  console.log(this.todos.length);
  }
  // ionViewDidLoad(){
  //   // this.sub.unsubscribe();
  //   this.sub = this.todoSvc.getTodos().subscribe(res =>{
  //     this.todos = res;
  //   })
  // }
  // ionViewDidLeave(){
  //  this.sub.unsubscribe();
  // }
  ionViewWillEnter(){
   this.sub = this.todoSvc.getTodos().subscribe(res =>{
     this.todos = res;
   });
  }
  // ionViewDidEnter(){
  //   this.todoSvc.getTodos().subscribe(res => {
        
  //     this.todos = res;
  //   });

  // }

  onForm(){
    this.router.navigateByUrl('/form-schedule');
  }

  remove(item){
    this.todoSvc.removeTodo(item.id);
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Apakah anda yakin ingin keluar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.isLogin = null;
            this.userSvc.setUID();
            this.authSvc.logout();
            this.sub.unsubscribe();
            this.router.navigateByUrl('/auth');
          }
        }
      ]
    });

    await alert.present();
  }
} 
