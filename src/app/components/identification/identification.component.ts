import { IdService } from '../../services/id.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

  id = '';
  path: string;

  constructor(private router: Router, private route: ActivatedRoute, private idService: IdService) { }

  ngOnInit() {
    this.route.params.subscribe(parmas => { this.path = parmas.path });
  }

  setId() {
    if (this.id !== '' && this.path) {
      this.idService.id = this.id;
      this.router.navigate(['/' + this.path]);
    }
  }

}
