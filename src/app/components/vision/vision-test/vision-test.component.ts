import { VisionTestState } from '../../../enums/VisionTestState.enum';
import { Direction, VisionCalibrationImage, VisionTestImage, makeCanvasHighRes } from '../../../lib/Image';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ITestComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { Util } from '../../../lib/util';
import { LanguageService } from '../../../services/language.service';
import { ProcedureService } from '../../../services/procedure.service';
import { ConfigService } from '../../../services/config.service';

let State = VisionTestState;

@Component({
  selector: 'snscg-vision-test',
  templateUrl: './vision-test.component.html',
  styleUrls: ['./vision-test.component.scss']
})
export class VisionTestComponent implements OnInit, OnDestroy, ITestComponent {

  @ViewChild('canvas') set canvasRef(ref: ElementRef) {
    if (ref) {
      setTimeout(() => {
        this.canvas = ref.nativeElement;
        makeCanvasHighRes(this.canvas);
        this.newDirection();
      }, 0);
    }
  }
  @ViewChild('CalibrationCanvas') set calCanvasRef(ref: ElementRef) {
    if (ref) {
      setTimeout(() => {
        this.calCanvas = ref.nativeElement;
        makeCanvasHighRes(this.calCanvas);
        if (this.calibrationSize == -1)
          this.calibrationSize = Math.round(this.calCanvas.width * 0.8);
        this.drawCard(this.calibrationSize);
      }, 0);
    }
  }
  @Output() disableContinueChanged = new EventEmitter<boolean>(false);

  canvas: HTMLCanvasElement;
  calCanvas: HTMLCanvasElement;

  Direction = Direction;
  StateRef = VisionTestState;
  state = State.Initializing;
  testData: VisionTestData;

  activeKey = '';
  calibrationSize = -1;
  pixelAcuity = 6;
  pixelAmount = 0;
  distance = 100;

  get language() {
    return this.languageService.components.vision.test;
  }

  constructor(public languageService: LanguageService, public configService: ConfigService) {
    this.testData = new VisionTestData();
  }

  subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void {
    this.disableContinueChanged.subscribe(cb);
    this.disableContinueChanged.emit(true);
  }

  ngOnInit() {
    window.addEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.state = State.WaitingForInput;
    this.calibratePuxels(this.pixelAcuity);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',
      this.keyDownEventListener);
    window.addEventListener('keyup',
      this.keyUpEventListener);
    this.disableContinueChanged.emit(false);
    this.disableContinueChanged.unsubscribe();
  }

  changeSize(addition: number) {
    this.drawCard(this.calibrationSize += this.calibrationSize + addition > this.calCanvas.width ? 0 : this.calibrationSize + addition < 50 ? 0 : addition)
  }

  calibratePixelAcuity() {
    let PS = 85.6 / this.calibrationSize;
    let D = this.distance;
    let PA = 6 * 60 * 2 * Math.atan((PS / 2 / (D * 10))) * 180 / Math.PI;
    console.log('D: ' + D)
    console.log('PA1: ' + PA)
    PA = +(Math.round((PA + 'e+2') as any) + 'e-2')
    console.log('PA2: ' + PA)
    this.pixelAcuity = PA;

    this.calibratePuxels(PA);
  }

  calibratePuxels(PA: number) {
    let list = [6, 12, 18, 24, 36, 48, 60, 96];
    this.testData.puxels = [];
    for (let i = 0; i < list.length; i++) {
      const puxel = Math.floor(list[i] / PA);
      if (puxel > 0 && puxel != this.testData.puxels.last())
        this.testData.puxels.push(puxel);
    }
    this.testData.activeTrial = {
      trial: 1,
      responses: [],
      puxel: this.testData.puxels.length - 1,
      phase: 1
    }
  }

  drawCard(size: number) {
    this.pixelAmount = this.calibrationSize;
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

  continue = async (direction?: Direction): Promise<ITestResponse> => {
    switch (this.state) {
      case State.Initializing:
        break;
      case State.WaitingForInput:
        this.disableContinueChanged.emit(true);
        if (direction != null) {
          await this.pauseTrial();
          let isFin = this.continueTrial(direction);
          if (isFin && ProcedureService.continue) {
            this.disableContinueChanged.emit(false);
            ProcedureService.continue();
          }
        }
        break;
      case State.Finished:
        return this.testData.evaluate(this.pixelAcuity);
    }
    return false;
  }

  async pauseTrial() {
    this.state = State.Pause;
    this.clearCanvas();
    await Util.Delay(500)
    this.state = State.WaitingForInput;
  }

  continueTrial(direction: Direction) {
    this.testData.activeTrial.responses.push(this.testData.activeDirection === direction);
    if (this.isTrialOver() !== null) {
      this.testData.responses.push(Util.extend(this.testData.activeTrial, { correct: this.isTrialOver() }));
      if (this.isPhaseOver()) {
        let nextPhase = this.nextPhase();
        if (nextPhase !== false) {
          this.testData.activeTrial = nextPhase;
        } else {
          this.state = State.Finished;
          return true;
        }
      } else {
        this.testData.activeTrial = this.nextTrial();
      }
    } else {
      this.testData.activeTrial.trial++;
    }
    this.newDirection();
    return false;
  }

  isTrialOver() {
    switch (this.testData.activeTrial.phase) {
      case 1:
        if (this.testData.activeTrial.responses.countOf(val => val) >= 2)
          return true;
        if (this.testData.activeTrial.responses.countOf(val => !val) >= 2)
          return false;
      case 2:
      case 3:
        if (this.testData.activeTrial.responses.countOf(val => val) >= 3)
          return true;
        if (this.testData.activeTrial.responses.countOf(val => !val) >= 2)
          return false;
    }
    return null;
  }

  nextTrial() {
    switch (this.testData.activeTrial.phase) {
      case 1:
        return this.genTrial(1, this.testData.activeTrial.puxel - (this.testData.activeTrial.puxel == 1 ? 1 : 2));
      case 2:
        if (this.testData.responses.last().correct)
          return this.genTrial(2, this.testData.activeTrial.puxel - 1);
        else
          return this.genTrial(2, this.testData.activeTrial.puxel);
      case 3:
        if (this.testData.responses.last().correct)
          return this.genTrial(3, this.testData.activeTrial.puxel - 1);
        else
          return this.genTrial(3, this.testData.activeTrial.puxel);
    }
  }

  isPhaseOver() {
    if (this.testData.responses.last().correct && this.testData.activeTrial.puxel == 0)
      return true;
    switch (this.testData.activeTrial.phase) {
      case 1:
        return !this.testData.responses.last().correct
      case 2:
        if (this.testData.responses.last(1).phase == 1) return false;
        return !(this.testData.responses.last().correct || this.testData.responses.last(1).correct)
      case 3:
        if (this.testData.responses.last(1).phase == 2) return false;
        return !(this.testData.responses.last().correct || this.testData.responses.last(1).correct)
    }
  }

  nextPhase() {
    switch (this.testData.activeTrial.phase) {
      case 1:
        return this.genTrial(2, this.testData.threshold + (this.testData.threshold == this.testData.puxels.length - 1 ? 0 : 1));
      case 2:
        if (this.testData.activeTrial.puxel == 0 && (this.testData.responses.last().correct && this.testData.responses.last(1).correct)) return false;
        return this.genTrial(3, this.testData.threshold);
      case 3:
        return false;
    }
  }

  genTrial(phase, puxel): VisionTestTrial {
    return {
      phase: phase,
      puxel: puxel,
      trial: 1,
      responses: []
    }
  }

  keyDownEventListener = (e: KeyboardEvent) => {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowUp':
        this.activeKey = 'up';
        this.continue(Direction.top);
        break;
      case 'ArrowDown':
        this.activeKey = 'down';
        this.continue(Direction.bottom);
        break;
      case 'ArrowLeft':
        this.activeKey = 'left';
        this.continue(Direction.left);
        break;
      case 'ArrowRight':
        this.activeKey = 'right';
        this.continue(Direction.right);
        break;
      case '+':
        this.activeKey = '+';
        this.right();
        break;
      case '-':
        this.activeKey = '-';
        this.wrong();
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

  get threshold() {
    let threshold = this.puxels.length - 1;
    for (let i = this.responses.length - 1; i >= 0; i--) {
      if (this.responses[i].phase != this.activeTrial.phase)
        break;
      if (this.responses[i].correct) {
        threshold = this.responses[i].puxel;
        break;
      }
    }
    return threshold;
  }

  evaluate(pixelAcuity: number) {
    let threshold = -1;
    for (let i = this.responses.length - 1; i >= 0; i--) {
      if (this.responses[i].phase != this.activeTrial.phase)
        break;
      if (this.responses[i].correct) {
        threshold = this.responses[i].puxel;
        break
      }
    }
    return {
      result: {
        threshold: +(Math.round((this.puxels[this.threshold == -1 ? 0 : this.threshold] * pixelAcuity + 'e+2') as any) + 'e-2'),
        index: threshold
      }
    };
  }
}

interface VisionTestTrial {
  trial: number;
  phase: number;
  responses: boolean[];
  puxel: number;
}

interface VisionTestTrialResponse extends VisionTestTrial {
  correct: boolean;
}
