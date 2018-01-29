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
        makeCanvasHighRes(this.calCanvas);
        this.calibrationSize = Math.round(this.calCanvas.width * 0.8);
        this.drawCard(this.calibrationSize);
      }, 0);
    }
  }
  @Output() disableContinueChanged = new EventEmitter<boolean>(false);

  calCanvas: HTMLCanvasElement;

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

  calibrate() {
    let PS = 85.6 / this.calibrationSize;
    console.log('calibrationSize: ' + this.calibrationSize)
    console.log('PS: ' + PS)
    let D = this.distance;
    let PA = 6 * 60 * 2 * Math.atan((PS/2 / (D * 10))) * 180 / Math.PI;
    console.log('D: ' + D)
    console.log('PA1: ' + PA)
    PA = +(Math.round((PA + 'e+2') as any) + 'e-2')
    console.log('PA2: ' + PA)
    this.minDistance = Math.ceil(PS/2 / (Math.tan(12 / (6 * 60 * 2)) / (180 / Math.PI)) / 10);
    this.optDistance = Math.ceil(PS/2 / (Math.tan( 6 / (6 * 60 * 2)) / (180 / Math.PI)) / 10);
    if (this.minDistance > 50)
      this.distance = this.minDistance;
    else if (this.optDistance < 50)
      this.minDistance = this.optDistance = this.distance = 50;
    else
      this.minDistance = this.distance = 50;
    this.pixelAcuity = PA
    // this.calibratePuxels(this.pixelAcuity = PA);
  }

  continue = async (): Promise<boolean | IInputData[]> => {
    switch (this.page) {
      case 0:
        this.page++;
        return false;
      case 1:
        this.calibrate();
        this.page++;
        return false;
      case 2:
        if (this.minDistance <= this.distance)
          this.page++;
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
