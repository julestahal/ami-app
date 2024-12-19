import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importing CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Importing ReactiveFormsModule
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel,IonInput,IonButton, IonText, CommonModule, ReactiveFormsModule ],
})
export class LoginPage {
  loginForm: FormGroup;

  defaultUsername = 'user123';
  defaultPassword = 'password123';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username === this.defaultUsername && password === this.defaultPassword) {
        alert('Login successful!');
        this.router.navigate(['/device-tabs']);  // Navigate to DeviceTabsPage
      } else {
        alert('Invalid username or password.');
      }
    } else {
      alert('Please fill in the required fields.');
    }
  }
}