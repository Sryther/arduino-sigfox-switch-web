import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";

import { DeviceStatus } from './device-status/device-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  SIGFOX_CALLBACKS_URL: String = environment.callbacks;
  title = environment.title;
  last_communication:Date = new Date(0);
  status: String = '';
  verbose_status:String = '';
  verbose_communication:String = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLastStatus();
  }

  getLastStatus() {
    let that = this;

    return this.http.get(environment.backend + 'api/sigfox/door/status', {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .toPromise()
      .then(function <DeviceStatus>(response) {
        that.setStatus(response.last_communication);
      })
  }

  setStatus(date) {
    let pastHour = new Date().getTime() - 3600 * 1000;
    let pastThreeHours = new Date().getTime() - 3600 * 3 * 1000;
    this.last_communication = new Date(date);

    if (this.last_communication.getTime() <= pastThreeHours) {
      this.setCriticalStatus();
    } else if (this.last_communication.getTime() <= pastHour) {
      this.setBadStatus();
    } else {
      this.setGoodStatus();
    }

    this.verbose_communication = 'Dernière communication le ' + this.last_communication.toLocaleString('fr-FR');
  }

  setGoodStatus() {
    this.status = 'good';
    this.verbose_status = 'En bonne santé';
  }

  setBadStatus() {
    this.status = 'bad';
    this.verbose_status = 'En mauvaise santé';
  }

  setCriticalStatus() {
    this.status = 'critical';
    this.verbose_status = 'Critique';
  }
}
