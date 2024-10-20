import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  taskTitle: string = '';
  taskDescription: string = '';
  taskDate: string = '';
  weeklyTime: string = '';
  selectedDays: string[] = [];
  repeatWeekly: boolean = false;
  locationBased: boolean = false;
  locationRange: number = 0;
  selectedColor: string = '';
  selectedIcon: string = '';
  icons: string[] = [
    'checkmark-circle',
    'alarm',
    'star',
    'heart',
    'rocket',
    'home',
    'settings',
    'person',
    'trash',
    'folder',
    'search',
    'checkmark',
    'happy',
    'sad',
    'camera',
    'chatbubbles',
    'information-circle',
    'arrow-back',
    'arrow-forward',
    'fitness',
    'barbell',
    'bicycle',
    'walk',
    'body',
    'water',
    'medkit',
    'heart',
    'medal',
    'flame',
    'football'
  ];

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  repeatSelect() {
    this.repeatWeekly = this.selectedDays.length > 0;
    this.locationBased = this.selectedDays.includes('location');
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  extractTime(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }

  async saveToStorage(newTask: any) {
    let storedTasks = await this.storage.get('tasks');
    if (storedTasks === null) {
      storedTasks = [];
    }
    storedTasks.push(newTask);
    await this.storage.set('tasks', storedTasks);
  }

  async saveTask() {
    const task = {
      taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
      specificDate: this.taskDate,
      weeklyTime: this.extractTime(this.weeklyTime),
      weeklyDays: this.selectedDays,
      repeatWeekly: this.repeatWeekly,
      locationBased: this.locationBased,
      locationRange: this.locationRange,
      taskColor: this.selectedColor,
      taskIcon: this.selectedIcon
    };
    await this.saveToStorage(task);
  }

}
