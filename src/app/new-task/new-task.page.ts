import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  selectedDays: string[] = [];
  repeatWeekly: boolean = false;
  locationBased: boolean = false;
  selectedColor: string = '';
  selectedIcon: string = '';
  icons: string[] = ['checkmark-circle', 'alarm', 'star', 'heart', 'rocket'];

  constructor() { }

  ngOnInit() {
  }

  repeatSelect() {
    this.repeatWeekly = this.selectedDays.length > 0;
    this.locationBased = this.selectedDays.includes('location');
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

}
