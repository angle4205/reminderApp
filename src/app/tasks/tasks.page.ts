import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
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

  constructor(public navCtrl: NavController) { }

  public slideState = 'hidden';

  ngOnInit() {
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }

}
