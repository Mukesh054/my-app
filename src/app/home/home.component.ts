import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  profileForm: any;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.fb.group({
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
      aliases: this.fb.array([this.fb.control('')]),
    });
  }

  ngOnInit(): void {
    this.homeService.getProfileData().subscribe((x) => {
      console.log(x);
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    console.warn(this.profileForm.value);

    this.homeService.saveProfileData(this.profileForm.value).subscribe((x) => {
      console.log(x);
      this.router.navigate(['/about']);
    });
  }
}
