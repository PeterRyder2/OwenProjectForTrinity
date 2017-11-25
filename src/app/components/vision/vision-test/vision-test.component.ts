import { VisionTestState } from '../../../enums/VisionTestState.enum';
import { Direction, VisionTestImage } from '../../../lib/Image';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITestComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { Util } from '../../../lib/util';

let State = VisionTestState;

@Component({
  selector: 'snscg-vision-test',
  templateUrl: './vision-test.component.html',
  styleUrls: ['./vision-test.component.scss']
})
export class VisionTestComponent implements OnInit, OnDestroy, ITestComponent {

  @ViewChild('canvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;

  Direction = Direction;
  state = State.Initializing;
  testData: VisionTestData;

  activeKey = '';

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.makeHighRes(this.canvas);
    this.testData = new VisionTestData();
    this.newDirection();
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.state = State.WaitingForInput;
  }

  newDirection() {
    this.testData.activeDirection = Math.round((Math.random() * 100)) % 4;
    this.drawC();
  }

  makeHighRes(c: HTMLCanvasElement) {
    let ctx = c.getContext('2d');
    // finally query the various pixel ratios
    let devicePixelRatio = window.devicePixelRatio || 1;
    let backingStoreRatio = (ctx as any).webkitBackingStorePixelRatio ||
      (ctx as any).mozBackingStorePixelRatio ||
      (ctx as any).msBackingStorePixelRatio ||
      (ctx as any).oBackingStorePixelRatio ||
      (ctx as any).backingStorePixelRatio || 1;
    let ratio = devicePixelRatio / backingStoreRatio;
    // upscale canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

      let oldWidth = c.width;
      let oldHeight = c.height;
      c.width = Math.round(oldWidth * ratio);
      c.height = Math.round(oldHeight * ratio);
      c.style.width = oldWidth + 'px';
      c.style.height = oldHeight + 'px';
      // now scale the context to counter
      // the fact that we've manually scaled
      // our canvas element
      ctx.scale(ratio, ratio);
    }
  }


  drawC() {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    let img = new VisionTestImage(this.testData.activePuxel);
    img.drawC(this.testData.activeDirection);
    ctx.putImageData(img.toImageData(), this.canvas.width / 2 - this.testData.activePuxel * 2.5, this.canvas.height / 2 - this.testData.activePuxel * 2.5);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
  }

  right() {
    let d = Math.round((Math.random() * 100)) % 4;
    while (d !== this.testData.activeDirection) {
      d = Math.round((Math.random() * 100)) % 4;
    }
    this.continue(d);
  }

  wrong() {
    let d = Math.round((Math.random() * 100)) % 4;
    while (d === this.testData.activeDirection) {
      d = Math.round((Math.random() * 100)) % 4;
    }
    this.continue(d);
  }

  async continue(direction?: Direction): Promise<ITestResponse> {
    switch (this.state) {
      case State.Initializing:
        break;
      case State.WaitingForInput:
        if (direction != null)
          this.continueTrial(direction);
        break;
      default:
        break;
    }
    return null;
  }

  continueTrial(direction: Direction) {
    this.testData.activeTrial.responses.push(this.testData.activeDirection == direction);
    if (this.isTrialOver()) {
      let res: VisionTestTrialResponse = Util.extend(this.testData.activeTrial, { correct: this.evalTrial() })
      this.testData.responses.push(res);
      if (this.isPhaseOver()) {
        let nextPhase = this.nextPhase();
        if (nextPhase === false)
          this.state = State.Finished;
        else
          this.testData.activeTrial = nextPhase;
      } else {
        let nextTrial = this.nextTrial();
        if (nextTrial === false) {
          let nextPhase = this.nextPhase();
          if (nextPhase === false)
            this.state = State.Finished;
          else
            this.testData.activeTrial = nextPhase;
        } else
          this.testData.activeTrial = nextTrial;
        this.newDirection();
      }
    } else {
      this.testData.activeTrial.trail++;
      this.newDirection();
    }
  }

  isTrialOver() {
    let bo = this.testData.activeTrial.phase == 1 ? 2 : 3;
    if (this.testData.activeTrial.trail > bo)
      return true;
    if (this.testData.activeTrial.responses.countOf((val => val)) >= bo)
      return true;
    if (this.testData.activeTrial.responses.countOf((val => !val)) >= (this.testData.activeTrial.phase == 1 ? bo : bo - 1))
      return true;
    return false;
  }

  isPhaseOver() {
    if (this.testData.activeTrial.phase == 1)
      if (this.testData.responses.last().correct === false)
        return true;
      else
        return false;
    else
      if (this.testData.responses.last().correct === false && this.testData.responses.last(1).correct === false && this.testData.responses.last(1).phase == this.testData.activeTrial.phase)
        return true;
      else
        return false;
  }

  evalTrial() {
    let bo = this.testData.activeTrial.phase == 1 ? 2 : 3;
    if (this.testData.activeTrial.responses.countOf((val => val)) >= bo)
      return true;
    else
      return false;
  }

  nextTrial() {
    let newTrial: VisionTestTrial;
    if (this.testData.activeTrial.puxel > 0)
      if (this.testData.responses.last().correct)
        newTrial = {
          trail: 1,
          responses: [],
          puxel: this.testData.activeTrial.puxel - (this.testData.activeTrial.phase == 1 ? this.testData.activeTrial.puxel > 1 ? 2 : 1 : 1),
          phase: this.testData.activeTrial.phase
        }
      else
        newTrial = {
          trail: 1,
          responses: [],
          puxel: this.testData.activeTrial.puxel,
          phase: this.testData.activeTrial.phase
        }
    else
      return false;
    return newTrial;
  }

  nextPhase() {
    let newTrial: VisionTestTrial;
    if (this.testData.activeTrial.phase < 3) {
      if (this.testData.activeTrial.puxel < this.testData.puxels.length - 2)
        newTrial = {
          trail: 1,
          responses: [],
          puxel: this.testData.activeTrial.puxel + (this.testData.responses.last().correct ? 0 : 2),
          phase: this.testData.activeTrial.phase + 1
        }
      else if (this.testData.activeTrial.puxel < this.testData.puxels.length - 1)
        newTrial = {
          trail: 1,
          responses: [],
          puxel: this.testData.activeTrial.puxel + (this.testData.responses.last().correct ? 0 : 1),
          phase: this.testData.activeTrial.phase + 1
        }
      else
        newTrial = {
          trail: 1,
          responses: [],
          puxel: this.testData.activeTrial.puxel,
          phase: this.testData.activeTrial.phase + 1
        }
    } else
      return false;
    return newTrial;
  }

  evaluate() {
    let min = this.testData.puxels.length;
    for (let res of this.testData.responses) {
      if (res.phase !== 1) {
        if (res.correct && (res.puxel + 1) < min) {
          min = res.puxel + 1;
        }
      }
    }
    return min;
  }

  subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void {
  }

  draw() {
    // let ctx = this.canvas.getContext('2d');
    // let vti = new VisionTestImage(10);
    // let date1 = Date.now();
    // for (let i = 0; i < 1000; i++) {
    //   vti.drawC(Direction.top);
    //   ctx.putImageData(vti.toImageData(), 0, 0);
    // }
    // let date2 = Date.now();
    // for (let i = 0; i < 1000; i++) {
    //   ctx.fillStyle = 'black';
    //   ctx.fillRect(0, 0, 99, 99);
    //   ctx.fillStyle = 'white';
    //   ctx.fillRect(1, 1, 99, 98);
    // }
    // let date3 = Date.now();
    // ctx.fillStyle = 'white';
    // ctx.strokeStyle = '#000';
    // ctx.lineWidth = 1;
    // ctx.lineJoin = ''
    // for (let i = 0; i < 1000; i++) {
    //   ctx.fillRect(0, 0, 99, 99);
    //   this.drawLine(ctx, [{ x: 99, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 99 }, { x: 99, y: 99 }]);
    // }
    // let date4 = Date.now();
    // console.log(date2 - date1, date3 - date2, date4 - date3);
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

class VisionTestData {
  get activePuxel() {
    return this.puxels[this.activeTrial.puxel]
  }
  puxels = [
    1,
    2,
    3,
    4,
    6,
    8,
    10,
    16
  ]
  activeDirection: Direction;
  activeTrial: VisionTestTrial = {
    trail: 1,
    responses: [],
    puxel: this.puxels.length - 1,
    phase: 1
  };
  responses: VisionTestTrialResponse[] = []
}

interface VisionTestTrial {
  trail: number;
  phase: number;
  responses: boolean[];
  puxel: number;
}

interface VisionTestTrialResponse extends VisionTestTrial {
  correct: boolean;
}
