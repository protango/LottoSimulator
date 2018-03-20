import { Injectable } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';


@Injectable()
export class PaypalService {
	private authConfig: AuthConfig = {
		// Url of the Identity Provider
		issuer: 'https://api.sandbox.paypal.com/v1/oauth2/token',
		// URL of the SPA to redirect the user to after login
		redirectUri: window.location.origin,
		// The SPA's id. The SPA is registerd with this id at the auth-server
		clientId: 'AZwiAJSghrMBGIkPcSeHi9uvtfMg1BSgRD9WKC8Nz-DjsO4ChJqF7-0WvNyktvbdgtD5KqtY35xafcCT',
		// set the scope for the permissions the client should request
		// The first three are defined by OIDC. The 4th is a usecase-specific one
		dummyClientSecret: 'EJs6tOlWjr-Rzq_ZjKqfKl54j3E6QBHx1vduNd2gUtyP36T8cyIZsdoevYoZNGkUwEhpbMp3zmRVrPjz'
	}
	constructor(private oauthService: OAuthService) { 
		this.configureWithNewConfigApi();
	}
    private configureWithNewConfigApi() {
		this.oauthService.configure(this.authConfig);
		this.oauthService.tokenValidationHandler = new JwksValidationHandler();
		this.oauthService.loadDiscoveryDocumentAndTryLogin();
	  }
}
