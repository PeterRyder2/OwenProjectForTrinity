import { IdService } from './id.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class TestIdResolver implements Resolve<void> {
  constructor(private router: Router, private idService: IdService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    console.log('Aa', this.idService.isIdSet)
    if (!this.idService.isIdSet)
      this.router.navigate(['/identification', route.routeConfig.path]);
  }
}
