import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  animations: [

    trigger('slideUp', [

      state('hidden', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),

      transition('hidden => visible', animate('1s ease-out')),
    ])
  ]
})
export class TasksPage implements OnInit {

  constructor(public navCtrl: NavController, private storage: Storage) { }

  public slideState = 'hidden';
  public tasks: any[] = [];

  async ngOnInit() {
    await this.storage.create();
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
    this.tasks = await this.storage.get('tasks') || [];
  }

  filterWeeklyDays(days: string[]): string[] {
    return days ? days.filter(day => day !== 'location') : [];
  }

  formatTime(timeString: string): string {
    if (!timeString || timeString === "NaN:NaN") return "";
    const [hours, minutes] = timeString.split(':').map(Number);
    const isPM = hours >= 12;
    const adjustedHours = hours % 12 || 12;
    const period = isPM ? 'PM' : 'AM';
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

}
