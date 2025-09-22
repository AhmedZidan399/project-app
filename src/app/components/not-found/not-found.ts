import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// lottie lib
import lottie from 'lottie-web';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements AfterViewInit {
  ngAfterViewInit(): void {
    const container = document.querySelector('.lottie-animation');
    if (container) {
      const animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d987597c-7676-4424-8817-7fca6dc1a33e/BVrFXsaeui.json',
      });
    } else {
      console.error("Lottie animation container not found.");
    }
  }
}
