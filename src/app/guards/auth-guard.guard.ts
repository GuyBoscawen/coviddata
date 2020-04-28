import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { DataService } from 'src/app/core/data.service';

@Injectable()
export class AuthGuardGuard implements CanActivate, CanActivateChild {

    constructor(
        private dataService: DataService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (typeof this.dataService.user_id === 'undefined') {
            this.router.navigate(['/login/']);
            return false;
        } else {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
    }

}
