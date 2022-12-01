import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  members!: Member[]
  constructor(private memberService: MemberService) {}

  async ngOnInit() {
    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }
}
