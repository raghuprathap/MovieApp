import { async, getTestBed, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { LoginService } from './login.service';

describe("Login Service ",() => {
	let backend: MockBackend;
	let service: LoginService;

	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if(connection.request.url === 'api/user/login'){
				const responseOptions = new ResponseOptions(options);
				let response = new Response(responseOptions);
				connection.mockRespond(response);
			}
		});
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				BaseRequestOptions,
				MockBackend,
				LoginService,
				{
					deps: [
						MockBackend,
						BaseRequestOptions
					],
					provide: Http,
					useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
						return new Http(backend, defaultOptions);
					}
				}
			]
		})
		const testbed = getTestBed();
		backend = testbed.get(MockBackend);
		service = testbed.get(LoginService);
	}));

	it('should return "Authentication successfull" message', () => {
		setupConnections(backend, {
      body: {
      	success: true,
	      message: 'Authentication successfull',
	      userInfo: {
	      	firstName: "abc", 
	      	lastName: "def"
      	}
      }
    });

    service.login("abc@gmail.com", "123").subscribe(response => {
    	expect(response.success).toBe(true);
    	expect(response.message).toBe("Authentication successfull");
    })
	});
})