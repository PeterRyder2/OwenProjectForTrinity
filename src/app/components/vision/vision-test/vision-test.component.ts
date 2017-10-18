import { Direction, VisionTestImage } from '../../../lib/Image';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITestComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vision-test',
  templateUrl: './vision-test.component.html',
  styleUrls: ['./vision-test.component.scss']
})
export class VisionTestComponent implements OnInit, OnDestroy, ITestComponent {

  @ViewChild('canvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;

  activeKey = '';

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.draw();
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

  async continue(): Promise<ITestResponse> {
    return {
      result: 12
    }
  }
  subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void {
  }

  draw() {
    let ctx = this.canvas.getContext('2d');
    let vti = new VisionTestImage(100, 100);
    let date1 = Date.now();
    for (let i = 0; i < 1000; i++) {
      vti.drawC(Direction.top);
      ctx.putImageData(vti.toImageData(), 0, 0);
    }
    let date2 = Date.now();
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 99, 99);
      ctx.fillStyle = 'white';
      ctx.fillRect(1, 1, 99, 98);
    }
    let date3 = Date.now();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.lineJoin = ''
    for (let i = 0; i < 1000; i++) {
      ctx.fillRect(0, 0, 99, 99);
      this.drawLine(ctx, [{ x: 99, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 99 }, { x: 99, y: 99 }]);
    }
    let date4 = Date.now();
    console.log(date2 - date1, date3 - date2, date4 - date3);
  }

  drawLine(context: CanvasRenderingContext2D, points: { x: number, y: number }[]) {
    // TODO -
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++)
      context.lineTo(points[i].x, points[i].y);
    context.stroke();
    context.closePath();
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
