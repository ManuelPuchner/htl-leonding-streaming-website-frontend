import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { Team } from '../team';
import { getTeamsMock } from './team_mock';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  teams!: Team[];


  constructor() {}

  async ngOnInit() {
    this.teams = await getTeamsMock();
  }
}
