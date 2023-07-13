import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: { login: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login() on button click', () => {
    spyOn(component, 'login');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should navigate to "/movies" on successful login', () => {
    const mockResponse = { access_token: 'mockToken' };
    spyOn(authService, 'login').and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');

    component.login();

    expect(authService.login).toHaveBeenCalledWith(component.username, component.password);
    expect(localStorage.getItem('jwt')).toBe('mockToken');
    expect(router.navigate).toHaveBeenCalledWith(['/movies']);
  });
});
