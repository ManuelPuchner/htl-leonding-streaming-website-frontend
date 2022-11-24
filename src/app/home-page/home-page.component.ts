import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { getMembersMock } from './member-mock';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  members!: Member[];

  constructor() {}

  async ngOnInit() {
    this.members = await getMembersMock();
  }
}
