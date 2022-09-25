import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HomePageForm } from './home.page.form';

const API_KEY = environment.weatherConfig.API_KEY;
const API_URL = environment.weatherConfig.API_URL;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: FormGroup;

  // vars for weatherApi
  weatherTemp: any;
  temp: any;
  today = new Date();
  name: any;
  weatherDetails: any;
  icon: any;

  constructor(
    public httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = new HomePageForm(this.formBuilder).createForm();
    this.loadData('London');
  }

  show() {
    const city = this.form.get('name').value;
    this.loadData(city);
  }

  loadData(city) {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    this.httpClient
      .get(`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`)
      .subscribe(
        (results) => {
          // console.log(results])
          this.weatherTemp = results['main'];
          this.temp = this.weatherTemp.temp.toFixed(0);
          this.name = results['name'];
          this.weatherDetails = results['weather'][0];
          this.icon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
        },
        (error) => {
          this.name = 'Please enter a valid city name';
          this.temp = '0';
          this.icon = 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png';
          this.weatherDetails = '';
          
        }
      );
  }
}
