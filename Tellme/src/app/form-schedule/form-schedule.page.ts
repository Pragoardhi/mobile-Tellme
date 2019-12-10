import { Todo, TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.page.html',
  styleUrls: ['./form-schedule.page.scss'],
})
export class FormSchedulePage implements OnInit {

  todo: Todo = {
    title: 'mantap',
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    note: 'ini mantap sekali'
  }

  constructor(
    private router: Router, 
    private todoService:TodoService,
    private navController: NavController) { }

  todoId = null;

  ngOnInit() {
  }

  async saveTodo(){
    if(this.todoId){
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        this.navController.navigateBack('home');
      })
    }else{
      this.todoService.addTodo(this.todo).then(() => {
        this.navController.navigateBack('home');
      });
    }
  }

  onLocation(){
    this.router.navigateByUrl('/location');
  }

  onBackHome(){
    this.router.navigateByUrl('/home');
  }

}
