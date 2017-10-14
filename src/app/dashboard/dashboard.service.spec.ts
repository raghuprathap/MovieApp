import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DashboardService } from './dashboard.service';

describe("Dashboard Service ", () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				DashboardService,
				{
					provide: XHRBackend,
					useClass: MockBackend
				}
			]
		});
	});

	describe('Add Movie to your favourite list', () => {
		it('should return "Movie is added successfully" message', inject([DashboardService, XHRBackend], (dashboardService, mockBacked) => {
			const mockResponse = {
				success: true,
				message: 'Movie is added successfully'
			};

			mockBacked.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse)
				})))
			});

			const movie = {
				id: "101",
				title: "test",
				poster_path : "dummy",
				vote_average: "6",
				vote_count: "100",
				release_date: "test"
			}

			dashboardService.addToFavorite(movie).subscribe((response) => {
				expect(response.success).toBe(true);
				expect(response.message).toBe("Movie is added successfully");
			})
		}))
	})

	describe('get Movies List', () => {
		it('should return a Movie list ', inject([DashboardService, XHRBackend], (dashboardService, mockBacked) => {
			const mockResponse = {
				success: true,
				data: [
          { id: 0, title: 'Movie 0' },
          { id: 1, title: 'Movie 1' },
          { id: 2, title: 'Movie 2' },
          { id: 3, title: 'Movie 3' },
        ]
			};

			mockBacked.connections.subscribe((connection) => {
				connection.mockRespond(new Response(new ResponseOptions({
					body: JSON.stringify(mockResponse)
				})))
			});

			dashboardService.getMovies().subscribe((movies) => {
				expect(movies.success).toBe(true);
				expect(movies.data).not.toBeNull();
			})
		}))
	})
})