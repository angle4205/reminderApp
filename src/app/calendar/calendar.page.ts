import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
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
export class CalendarPage implements OnInit {
  isOpen = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  public slideState = 'hidden';

  ngOnInit() {
    this.loadReminders();
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }
  
  //Reminder Logic
  reminders: any[] = [];

  constructor(private reminderService: ReminderService) {}

  async loadReminders() {
    (await this.reminderService.getReminders()).subscribe(data => {
      this.reminders = data;
    });
  }
}
