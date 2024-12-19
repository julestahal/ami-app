import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "Invalid username or password" for incorrect credentials', () => {
    component.loginForm.setValue({ username: 'wrong', password: 'wrong' });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Invalid username or password.');
  });

  it('should return "Login successful!" for correct credentials', () => {
    component.loginForm.setValue({ username: 'user123', password: 'password123' });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Login successful!');
  });
});
