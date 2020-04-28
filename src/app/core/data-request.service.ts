import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'src/environments/environment';

@Injectable()
export class DataRequestService {

    private testUrl = environment.apiTestUrl;
    private loginUrl = environment.apiLoginUrl;

    constructor(
        private http: HttpClient,
    ) { }

    makeGetRequest(url: string, headers: HttpHeaders, timeout: number = 60000, responseType: any = 'json') {
        console.log(url)
        return this.http.get<any>(url, { responseType, headers })
    }

    getTest(email, password): Observable<any[]> {

        let requestParams = "?email=" + email + "&password=" + password;
        return this.makeGetRequest(this.testUrl + requestParams, this.buildHeaders());
    }


    login(email, password): Observable<any[]> {
        let requestParams = "?email=" + email + "&password=" + password;
        return this.makeGetRequest(this.loginUrl + requestParams, this.buildHeaders());
    }

    buildHeaders() {
        return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + '123');
    }
}
