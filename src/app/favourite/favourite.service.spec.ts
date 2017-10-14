import { async, getTestBed, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, Response, ResponseOptions, BaseRequestOptions, XHRBackend } from '@angular/http';

import { FavouriteService } from './favourite.service';

describe("Favourite Service ",() => {
	let backend: MockBackend;
	let service: FavouriteService;

	function setupConnection(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if(connection.request.url === 'api/movie/view'){
				const responseOptions = new ResponseOptions(options);
				let response = new Response(responseOptions);
				connection.mockRespond(response);
			}
		});
	}
	
	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if(connection.request.url === 'api/movie/delete'){
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
				FavouriteService,
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
		service = testbed.get(FavouriteService);
	}));

	describe('Get Favourite movie list', () => {

		it('should return Favourite Movie List', () => {
			setupConnection(backend, {
	      body: {
	      	success: true,
		      data: [
	          { id: 0, title: 'Movie 0' },
	          { id: 1, title: 'Movie 1' },
	          { id: 2, title: 'Movie 2' },
	          { id: 3, title: 'Movie 3' },
	        ]
	      }
	    });
	    service.deleteMovie("1").subscribe(response => {
	    	expect(response.success).toBe(true);
				expect(response.data).not.toBeNull();
			});
		});

	});

	describe('Delete Favourite movie', () => {

		it('should return "Movie is deleted successfully" message', () => {
			setupConnections(backend, {
	      body: {
	      	success: true,
		      message: 'Movie is deleted successfully'
	      }
	    });
	    service.deleteMovie("1").subscribe(response => {
	    	expect(response.success).toBe(true);
	    	expect(response.message).toBe("Movie is deleted successfully");
	    })
		});

	});

});