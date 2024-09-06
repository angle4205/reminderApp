import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-animations',
  templateUrl: './animations.page.html',
  styleUrls: ['./animations.page.scss'],
  // HOW TO MAKE ANIMATION
  animations: [
    //Trigger: String Name, Array [States and transition]
    //in this case @myvisibility is the tag for this animation
    trigger('myvisibility', [
      // Creation of states (visible, invisible)
      state('invisible', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      // Transition beetween states
      transition('invisible => visible', animate('60s')),
      transition('visible => invisible', animate('1s'))
    ])
    //A
  ]
})
export class AnimationsPage implements OnInit {

  // Put NavController on the constructor method parameter
  constructor(public navCtrl: NavController) { }
  //Animation variable (also, initial state of it)
  visibleState = 'invisible';
  //Animation method, switches the 
  toggleVisible() {
    this.visibleState = (this.visibleState == 'invisible') ? 'visible' : 'invisible';
  }

  ngOnInit() {
  }
  
}
