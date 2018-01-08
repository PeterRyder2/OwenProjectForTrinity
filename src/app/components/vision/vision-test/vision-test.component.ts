import { VisionTestState } from '../../../enums/VisionTestState.enum';
import { Direction, VisionCalibrationImage, VisionTestImage, makeCanvasHighRes } from '../../../lib/Image';
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
  @ViewChild('CalibrationCanvas') calCanvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  calCanvas: HTMLCanvasElement;

  Direction = Direction;
  StateRef = VisionTestState;
  state = State.Initializing;
  testData: VisionTestData;

  activeKey = '';
  calibrationSize = 0.5;
  pixelAcuity = 6;
  pixelAmount = 0;
  distance = 100;

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    // this.calCanvas = this.calCanvasRef.nativeElement;
    makeCanvasHighRes(this.canvas);
    // makeCanvasHighRes(this.calCanvas);
    this.testData = new VisionTestData();
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.state = State.WaitingForInput;
    this.calibratePuxels(this.pixelAcuity);
    // this.drawCard(this.calibrationSize);
  }

  changeSize(addition: number) {
    this.drawCard(this.calibrationSize += this.calibrationSize + addition > 1 ? 0 : this.calibrationSize + addition < 0.2 ? 0 : addition)
  }

  calibrate() {
    let PS = 53.98 / Math.round(this.calCanvas.width * this.calibrationSize);
    let D = this.distance;
    let PA = 6 * 60 * 2 * Math.atan((PS / 2 / (D * 10)) * 180 / Math.PI);
    PA = +(Math.round((PA + 'e+2') as any) + 'e-2')
    let minDistance = Math.ceil(PS / (Math.tan(8 / (6 * 60 * 2)) * 2 / (180 / Math.PI)) / 10);
    let optDistance = Math.ceil(PS / (Math.tan(6 / (6 * 60 * 2)) * 2 / (180 / Math.PI)) / 10);
    console.log('needed: ' + minDistance)
    console.log(PS, D, PA);
    this.calibratePuxels(this.pixelAcuity = PA);
  }

  calibratePuxels(PA: number) {
    let list = [6, 12, 18, 24, 36, 48, 60, 96];
    this.testData.puxels = [];
    for (let i = 0; i < list.length; i++) {
      const puxel = Math.floor(list[i] / PA);
      if (puxel > 0)
        this.testData.puxels.push(puxel);
    }
    this.testData.activeTrial = {
      trail: 1,
      responses: [],
      puxel: this.testData.puxels.length - 1,
      phase: 1
    }
    this.newDirection();
  }

  drawCard(size: number) {
    this.pixelAmount = Math.round(this.calCanvas.width * this.calibrationSize);
    let ctx = this.calCanvas.getContext('2d');
    this.clearCanvas(ctx);
    let img = new VisionCalibrationImage(this.calCanvas.width, this.calCanvas.height, size);
    ctx.putImageData(img.toImageData(), 0, 0);
  }

  clearCanvas(ctx?: CanvasRenderingContext2D) {
    ctx = ctx || this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  newDirection() {
    this.testData.activeDirection = Math.round((Math.random() * 100)) % 4;
    this.drawC();
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
        if (direction != null) {
          this.state = State.Pause;
          this.clearCanvas();
          await Util.Delay(0)
          this.state = State.WaitingForInput;
          return this.continueTrial(direction);
        }
        break;
      default:
        break;
    }
    return false;
  }

  continueTrial(direction: Direction) {
    this.testData.activeTrial.responses.push(this.testData.activeDirection == direction);
    if (this.isTrialOver()) {
      let res: VisionTestTrialResponse = Util.extend(this.testData.activeTrial, { correct: this.evalTrial() })
      this.testData.responses.push(res);
      if (this.isPhaseOver()) {
        let nextPhase = this.nextPhase();
        if (nextPhase === false) {
          this.state = State.Finished;
          return {
            result: this.evaluate()
          }
        } else
          this.testData.activeTrial = nextPhase;
      } else {
        let nextTrial = this.nextTrial();
        if (nextTrial === false) {
          let nextPhase = this.nextPhase();
          if (nextPhase === false) {
            this.state = State.Finished;
            return {
              result: this.evaluate()
            }
          } else
            this.testData.activeTrial = nextPhase;
        } else
          this.testData.activeTrial = nextTrial;
        this.newDirection();
      }
    } else {
      this.testData.activeTrial.trail++;
      this.newDirection();
    }
    return false;
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
    if (this.testData.activeTrial.phase > 1 && this.testData.responses.last().correct && this.testData.activeTrial.puxel == 0)
      return false
    else if (this.testData.activeTrial.phase < 3) {
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
  activeTrial: VisionTestTrial;
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
