import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit, OnDestroy {

  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
    console.log(this.currentYear);
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
