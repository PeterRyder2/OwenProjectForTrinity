import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-fake-result',
  templateUrl: './fake-result.component.html',
  styleUrls: ['./fake-result.component.scss']
})
export class FakeResultComponent implements OnInit {

  name = '';

  constructor() { }

  ngOnInit() {
  }

}
