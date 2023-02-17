import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../member';
import { pickTextColorBasedOnBgColorAdvanced } from '../colorUtil';
import { MemberService } from '../member.service';


@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {

  @Input()
  isAdminPage: boolean = false;

  @Input()
  member!: Member;

  @Input()
  small: boolean = false;

  @Input()
  adminMode: boolean = false;

  constructor(private memberService: MemberService) {}

  pickTextColorBasedOnBgColorAdvanced(
    bgColor: string,
    lightColor: string,
    darkColor: string
  ) {
    return pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor);
  }


  editAction() {
    console.log('edit');
    alert('not implemented');
  }

  deleteAction() {
    this.memberService.removeMember(this.member);
  }
}
