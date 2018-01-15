import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IDescriptionComponent, ITestResponse, IInputData } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';
import { makeCanvasHighRes, VisionCalibrationImage } from '../../../lib/Image';

@Component({
  selector: 'snscg-vision-test-description',
  templateUrl: './vision-test-description.component.html',
  styleUrls: ['./vision-test-description.component.scss']
})
export class VisionTestDescriptionComponent implements OnInit, IDescriptionComponent {

  @ViewChild('CalibrationCanvas') set calCanvasRef(ref: ElementRef) {
    if (ref) {
      this.calCanvas = ref.nativeElement;
      makeCanvasHighRes(this.calCanvas);
      this.drawCard(this.calibrationSize);
    }
  }
  calCanvas: HTMLCanvasElement;

  page = 0;

  calibrationSize = 100;
  pixelAcuity = 6;
  pixelAmount = 0;
  minDistance = 40;
  optDistance = 60;
  distance = 50;

  get language() {
    return this.languageService.components.vision.testDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  changeSize(addition: number) {
    this.drawCard(this.calibrationSize += this.calibrationSize + addition > 1 ? 0 : this.calibrationSize + addition < 0.2 ? 0 : addition);
  }

  drawCard(size: number) {
    this.pixelAmount = Math.round(this.calCanvas.width * this.calibrationSize);
    let ctx = this.calCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.calCanvas.width, this.calCanvas.height)
    let img = new VisionCalibrationImage(this.calCanvas.width, this.calCanvas.height, size);
    ctx.putImageData(img.toImageData(), 0, 0);
  }

  calibrate() {
    let PS = 53.98 / Math.round(this.calCanvas.width * this.calibrationSize);
    let D = this.distance;
    let PA = 6 * 60 * 2 * Math.atan((PS / 2 / (D * 10)) * 180 / Math.PI);
    PA = +(Math.round((PA + 'e+2') as any) + 'e-2')
    this.minDistance = Math.ceil(PS / (Math.tan(8 / (6 * 60 * 2)) * 2 / (180 / Math.PI)) / 10);
    this.optDistance = Math.ceil(PS / (Math.tan(6 / (6 * 60 * 2)) * 2 / (180 / Math.PI)) / 10);
    console.log('needed: ' + this.minDistance)
    console.log(PS, D, PA);
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
        if (this.minDistance < this.distance)
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
