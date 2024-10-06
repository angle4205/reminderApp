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

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }

}
