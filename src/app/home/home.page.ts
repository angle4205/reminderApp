import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../services/my-service.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],

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
export class HomePage implements OnInit {

  username: string = 'Username';
  quote: string = '';
  author: string = '';
  errorMessage: string = '';
  public slideState = 'hidden';

  constructor(private userService: UserService, private apiService: ApiService) { }

  ngOnInit() {
    // My Service / User service
    this.username = this.userService.getUserName();
    // API Service
    this.apiService.getQuoteOfTheDay().subscribe(
      response => {
        if (response.contents && response.contents.quotes.length > 0) {
          this.quote = response.contents.quotes[0].quote;
          this.author = response.contents.quotes[0].author;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No quote available.';
        }
      },
      error => {
        console.error('Error fetching quote of the day', error);
        this.errorMessage = 'Error fetching quote of the day';
        console.log('unable to fetch quotes in local server?, use proxy instead: ionic serve --proxy-config proxy.conf.json')
      }
    );
    // Animation slide
    setTimeout(() => {
      this.slideState = 'visible';
    }, 500);
  }

}
