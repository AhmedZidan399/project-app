import { AfterViewInit, Component, Input, signal } from '@angular/core';
import Swiper from 'swiper';

// swiper
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from './swiper-slide/swiper-slide';

@Component({
  selector: 'app-billboard',
  imports: [SwiperSlide],
  templateUrl: './billboard.html',
  styleUrl: './billboard.scss',
})
export class Billboard implements AfterViewInit {
  protected readonly title = signal('project-app');

  swipers = Array.from({ length: 2 });

  ngAfterViewInit(): void {
    this.initSwipers();
  }

  private initSwipers() {
    Swiper.use([Navigation, Pagination]);

    // main swiper in header
    new Swiper('.main-swiper', {
      loop: true,
      speed: 500,
      navigation: {
        nextEl: '.swiper-arrow-next',
        prevEl: '.swiper-arrow-prev',
      },
    });

    // testimonial swiper
    new Swiper('.testimonial-swiper', {
      loop: true,
      speed: 500,
      navigation: {
        nextEl: '.swiper-arrow-next',
        prevEl: '.swiper-arrow-prev',
      },
    });
  }
}
