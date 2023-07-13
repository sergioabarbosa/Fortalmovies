import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaFilmesComponent } from './lista-filmes.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ListaFilmesComponent', () => {
  let component: ListaFilmesComponent;
  let fixture: ComponentFixture<ListaFilmesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ListaFilmesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFilmesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on ngOnInit', () => {
    const mockResponse = {
      results: [
        { title: 'Movie 1', id: 1, poster_path: 'poster1.jpg', overview: 'Overview 1', trailer_id: '123', curtirFilme: false },
        { title: 'Movie 2', id: 2, poster_path: 'poster2.jpg', overview: 'Overview 2', trailer_id: '456', curtirFilme: false }
      ],
      total_pages: 5
    };

    component.ngOnInit();

    const request = httpMock.expectOne('https://api.themoviedb.org/3/discover/movie?api_key=ac5afd43078071e91af4565d776850ed&region=BR&sort_by=popularity.desc&language=pt-BR&page=1');
    request.flush(mockResponse);

    expect(component.filmes).toEqual(mockResponse.results);
    expect(component.totalPaginas).toEqual(mockResponse.total_pages);
  });

  it('should like a movie and make a POST request', () => {
    const mockMovie: any = { title: 'Movie 1', id: 1, curtirFilme: false };

    // Simulate authenticated user with token
    localStorage.setItem('jwt', 'mockToken');

    component.curtirFilme(mockMovie);

    const request = httpMock.expectOne('http://localhost:3000/movies/1/like');
    expect(request.request.method).toBe('POST');
    request.flush({});

    // Check if the movie was liked successfully
    expect(mockMovie.curtirFilme).toBe(true);
  });

  it('should handle error when liking a movie', () => {
    const mockMovie: any = { title: 'Movie 1', id: 1, curtirFilme: false };

    // Simulate authenticated user with token
    localStorage.setItem('jwt', 'mockToken');

    component.curtirFilme(mockMovie);

    const request = httpMock.expectOne('http://localhost:3000/movies/1/like');
    expect(request.request.method).toBe('POST');
    request.error(new ErrorEvent('Network error'));

    // Check if the movie is still not liked due to the error
    expect(mockMovie.curtirFilme).toBe(false);
  });

  it('should handle missing JWT token', () => {
    const mockMovie: any = { title: 'Movie 1', id: 1, curtirFilme: false };

    // Remove JWT token from local storage
    localStorage.removeItem('jwt');

    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.curtirFilme(mockMovie);

    // Check if error messages were logged and alert message was shown
    expect(console.error).toHaveBeenCalledWith('Token JWT não encontrado. Usuário não autenticado.');
    expect(window.alert).toHaveBeenCalledWith('Você precisa estar autenticado para curtir um filme.');
  });
});
