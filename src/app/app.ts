import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// components
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Svgs } from './components/svgs/svgs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Svgs],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
