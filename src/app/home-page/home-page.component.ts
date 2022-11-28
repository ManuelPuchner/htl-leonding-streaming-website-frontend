import { HttpClient } from '@angular/common/http';
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
  members!: Member[]
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // this.teams = await getTeamsMock();
    this.http.get<Member[]>('/api/member').subscribe((members) => {
      this.members = members;
      console.log(this.members);
    });
  }
}
