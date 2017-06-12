import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'snscg-vision-test',
  templateUrl: './vision-test.component.html',
  styleUrls: ['./vision-test.component.scss']
})
export class VisionTestComponent implements OnInit, OnDestroy {

  activeKey = '';

  constructor() { }

  ngOnInit() {
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowUp':
        this.activeKey = 'up';
        break;
      case 'ArrowDown':
        this.activeKey = 'down';
        break;
      case 'ArrowLeft':
        this.activeKey = 'left';
        break;
      case 'ArrowRight':
        this.activeKey = 'right';
        break;

      default:
        break;
    }
  }

  keyUpEventListener = (e: KeyboardEvent) => {
    this.activeKey = '';
  }

}
