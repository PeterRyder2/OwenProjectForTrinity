import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date: any;

  constructor() { }

  ngOnInit() {
    this.date = new Date();
  }

}
