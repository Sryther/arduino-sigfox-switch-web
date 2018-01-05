import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { MessageService } from '../messages/message.service';

import { DeviceStatus } from '../device-status/device-status';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
  open: Boolean = false;
  action_verbose: String = "Ouvrir";
  status: Boolean = false;
  last_communication: Date = new Date();
  mapping_action: Object = {
    "false": "Ouvrir",
    "true": "Fermer"
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.open = false;
    this.action_verbose = this.mapping_action[this.open.toString()];
  }

  ngOnInit() {
    this.getLastStatus();
  }

  toggle(event) {
    let that = this;
    this.open = !this.open;
    this.action_verbose = this.mapping_action[this.open.toString()];

    let action = '';
    if (this.open) {
      action = 'close';
    } else {
      action = 'open'
    }

    return this.http.post(environment.backend + '/api/sigfox/door/' + action, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .toPromise()
      .then(function <DeviceStatus>(response) {
        that.open = response.open;
        that.last_communication = response.last_communication;
      });
  }

  getLastStatus() {
    let that = this;

    return this.http.get(environment.backend + '/api/sigfox/door/status', {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .toPromise()
      .then(function (response) {
        that.open = !this.open;
        that.action_verbose = this.mapping_action[this.open.toString()];
      });
  }
}
