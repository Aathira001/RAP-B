import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  ragText = `Answers the query pertaining to your personal document.`;
  sentimentText = `Analysis the sentiment/emotion of the lyrics.`;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('hi')
  }

  navigateToChat(chatType: string): void {
    this.router.navigate(['/chat', chatType]);
  }
}
