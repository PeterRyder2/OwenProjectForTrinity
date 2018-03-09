import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { IDescriptionComponent, ITestResponse, IInputData } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';
import { makeCanvasHighRes, VisionCalibrationImage } from '../../../lib/Image';

@Component({
  selector: 'snscg-vision-test-description',
  templateUrl: './vision-test-description.component.html',
  styleUrls: ['./vision-test-description.component.scss']
})
export class VisionTestDescriptionComponent implements OnInit, OnDestroy, IDescriptionComponent {

  @ViewChild('CalibrationCanvas') set calCanvasRef(ref: ElementRef) {
    if (ref) {
      setTimeout(() => {
        this.calCanvas = ref.nativeElement;
      }, 0);
    }
  }
  @ViewChild('CalibrationCanvasContainer') set calCanvasContainerRef(ref: ElementRef) {
    if (ref) {
      setTimeout(() => {
        this.calCanvasContainer = ref.nativeElement;
        this.scaleCalCanvas();
        window.addEventListener('resize', () => {
          this.scaleCalCanvas();
        })
      }, 50);
    }
  }

  @Output() disableContinueChanged = new EventEmitter<boolean>(false);

  calCanvas: HTMLCanvasElement;
  calCanvasContainer: HTMLDivElement;

  page = 0;

  calibrationSize = 300;
  pixelAcuity = 6;
  pixelAmount = 0;
  minDistance = 40;
  optDistance = 60;
  _distance = 50;
  set distance(val: number) {
    this._distance = val;
    if (this._distance < this.minDistance)
      this.disableContinueChanged.emit(true);
    else
      this.disableContinueChanged.emit(false);
  }
  get distance() {
    return this._distance;
  }

  get language() {
    return this.languageService.components.vision.testDescription;
  }

  constructor(public languageService: LanguageService) { }

  subscribeContinueDisabled(cb: (isDisaled: boolean) => void): void {
    this.disableContinueChanged.subscribe(cb);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.disableContinueChanged.emit(false);
  }

  scaleCalCanvas() {
    // scale width first
    let el = this.calCanvasContainer.firstElementChild as HTMLDivElement;
    let availiblewidth = document.getElementsByClassName('description').item(0).clientWidth;
    let width = 2 * (el.offsetWidth + 40);
    let remainingWidth = availiblewidth - width;
    this.calCanvas.width = remainingWidth;
    this.calCanvas.height = Math.round(remainingWidth * (53.98 / 85.60));
    makeCanvasHighRes(this.calCanvas);
    this.calibrationSize = Math.round(this.calCanvas.width * 0.8);
    this.drawCard(this.calibrationSize);

    // scale height if necessary
    let availibleHeight = document.getElementsByClassName('description').item(0).clientHeight;
    let outers = document.getElementsByClassName('outer');
    let height = 0;
    for (let i = 0; i < outers.length; i++) {
      height += (outers.item(i) as HTMLDivElement).offsetHeight;
    }
    let remainingHeight = availibleHeight - height;
    if (this.calCanvas.offsetHeight > remainingHeight) {
      this.calCanvas.height = remainingHeight;
      this.calCanvas.width = Math.round(remainingHeight * (85.60 / 53.98));
      makeCanvasHighRes(this.calCanvas);
      this.calibrationSize = Math.round(this.calCanvas.width * 0.8);
      this.drawCard(this.calibrationSize);
    }
  }

  scaleSize(num: number) {
    return Math.round(num * this.calCanvas.width);
  }

  changeSize(addition: number) {
    this.drawCard(this.calibrationSize += this.calibrationSize + addition > this.calCanvas.width ? 0 : this.calibrationSize + addition < 50 ? 50 : addition)
  }

  drawCard(size: number) {
    this.pixelAmount = this.calibrationSize;
    let ctx = this.calCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.calCanvas.width, this.calCanvas.height)
    let img = new VisionCalibrationImage(this.calCanvas.width, this.calCanvas.height, size);
    ctx.putImageData(img.toImageData(), 0, 0);
  }

  calibrateDistance() {
    let PS = 85.6 / this.calibrationSize;
    console.log('calibrationSize: ' + this.calibrationSize)
    console.log('PS: ' + PS)
    this.minDistance = Math.ceil(PS / 2 / (Math.tan(12 / (6 * 60 * 2)) / (180 / Math.PI)) / 10);
    this.optDistance = Math.ceil(PS / 2 / (Math.tan(6 / (6 * 60 * 2)) / (180 / Math.PI)) / 10);
    console.log('minDistance: ' + this.minDistance)
    console.log('optDistance: ' + this.optDistance)
    if (this.minDistance > 50)
      this.distance = this.minDistance;
    else if (this.optDistance < 50)
      this.minDistance = this.optDistance = this.distance = 50;
    else
      this.minDistance = this.distance = 50;
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
  }

  continue = async (): Promise<boolean | IInputData[]> => {
    switch (this.page) {
      case 0:
        this.page++;
        return false;
      case 1:
        this.calibrateDistance();
        this.page++;
        return false;
      case 2:
        if (this.minDistance <= this.distance) {
          this.calibratePixelAcuity();
          this.page++;
        }
        return false;
      case 3:
        return [
          {
            identifier: 'pixelAcuity',
            data: this.pixelAcuity
          },
          {
            identifier: 'distance',
            data: this.distance
          },
          {
            identifier: 'calibrationSize',
            data: this.calibrationSize
          }
        ]
    }
  }
}
