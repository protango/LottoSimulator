import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MoneydataService {

	constructor(private http: HttpClient) { }
	configUrl = 'https://api.fixer.io/latest';

	getConfig() {
		return this.http.get(this.configUrl);
	}
}
