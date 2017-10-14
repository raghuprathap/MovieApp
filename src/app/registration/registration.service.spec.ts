import { async, getTestBed, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { RegistrationService } from './registration.service';

describe("Registration Service ",() => {
	let backend: MockBackend;
	let service: RegistrationService;

	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if(connection.request.url === 'api/user/register'){
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
				RegistrationService,
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
		service = testbed.get(RegistrationService);
	}));

	it('should return "successfully registered" message', () => {
		setupConnections(backend, {
      body: {
      	success: true,
	    	message: 'Successfully registered'
      }
    });

    service.register("abc", "def", "abc@gmail.com", "123").subscribe(response => {
    	expect(response.success).toBe(true);
    	expect(response.message).toBe("Successfully registered");
    })
	});
})