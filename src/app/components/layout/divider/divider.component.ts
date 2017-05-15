import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'snscg-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  @Input() vertical = false;
  @Input() thickness = 1;
  @Input() length = '100%';
  @Input() color = '#020202';

  @ViewChild('divider') divider: ElementRef;

  constructor() { }

  ngOnInit() {
    if (this.vertical) {
      (<HTMLDivElement>this.divider.nativeElement).style.width = this.thickness + 'px';
      (<HTMLDivElement>this.divider.nativeElement).style.height = this.length;
    } else {
      (<HTMLDivElement>this.divider.nativeElement).style.width = this.length;
      (<HTMLDivElement>this.divider.nativeElement).style.height = this.thickness + 'px';
    }
    (<HTMLDivElement>this.divider.nativeElement).style.backgroundColor = this.color;
  }

}
