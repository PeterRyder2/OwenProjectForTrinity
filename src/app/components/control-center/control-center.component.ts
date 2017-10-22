import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-control-center',
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.scss']
})
export class ControlCenterComponent implements OnInit {

  constructor(public settings: SettingsService, private router: Router) { }

  ngOnInit() {

  }

  continue() {
    this.router.navigate([this.settings.skipId ? 'AutoProcedure' : 'Procedure']);
  }

}
