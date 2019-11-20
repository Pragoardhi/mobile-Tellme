import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.page.html',
  styleUrls: ['./form-schedule.page.scss'],
})
export class FormSchedulePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLocation(){
    this.router.navigateByUrl('/location');
  }

  onBackHome(){
    this.router.navigateByUrl('/home');
  }

}
