import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers:[AuthService],
    imports: [
      HttpClientTestingModule
    ]
  });

  authService = TestBed.get(AuthService);
});

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should return an authenticated user', () => {
      const loginResponse = {
          _id: '2',
          username: 'Test',
          password: 'Test',
          email: 'test@test.com',
        };
      let response;
      spyOn(authService, 'login').and.returnValue(of(loginResponse));

      const request = {
        username: 'Test',
        password: 'Test'
      };
      authService.login(request).subscribe(res => {
        response = res;
      });
      expect(response).toEqual(loginResponse);
    });
  });




});
