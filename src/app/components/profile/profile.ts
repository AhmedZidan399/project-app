import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  constructor(private router: Router) {}
  islogged: any;
  // check login
  ngOnInit(): void {
    this.islogged = JSON.parse(localStorage.getItem('user')!);
    if (!this.islogged) {
      this.router.navigate(['/products']);
      setTimeout(() => {
        document.querySelector('.signUpBtn')?.dispatchEvent(new Event('click'));
      }, 1000);
    }
  }
}
