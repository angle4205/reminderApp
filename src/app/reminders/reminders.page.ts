import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.page.html',
  styleUrls: ['./reminders.page.scss'],
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
export class RemindersPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  slideState='hidden';

  reminders: any[] = [];

  reminder = {
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  };

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.reminder, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<any>;
    if (ev.detail.role === 'confirm') {
      if (ev.detail.data.name && ev.detail.data.date && ev.detail.data.time) {
        this.reminders.push({ ...ev.detail.data });
      }
      this.resetReminder();
    }
  }

  submitReminder() {
    if (this.reminder.name && this.reminder.date && this.reminder.time) {
      this.reminders.push({
        name: this.reminder.name,
        description: this.reminder.description,
        date: this.reminder.date,
        time: this.reminder.time
      });
      this.resetReminder();
      this.confirm();
    } else {
      console.log('Reminder input missing');
    }
  }

  getFormattedDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
    // created this method to avoid an error in which the date was displayed incorrectly in the html
  }

  resetReminder() {
    this.reminder = {
      name: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5)
    };
  }

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }

}
