import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  selectedDays: string[] = [];
  repeatWeekly: boolean = false;
  locationBased: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  repeatSelect() {
    this.repeatWeekly = this.selectedDays.length > 0;
    this.locationBased = this.selectedDays.includes('location');
  }

}
