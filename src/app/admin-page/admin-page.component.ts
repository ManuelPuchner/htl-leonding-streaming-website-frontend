import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { ColorPickerService } from 'ngx-color-picker';
import { MemberService } from '../member.service';
import { Member } from '../member';
import { pickTextColorBasedOnBgColorAdvanced } from '../colorUtil';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  passwordForm;
  newMemberForm;
  newTagForm;
  authService;

  tagIds: number[] = [];
  members: Member[] = [];

  tags: Tag[] = [];
  tagColor: string = '#969696';

  constructor(
    authService: AuthService,
    private formBuilder: FormBuilder,
    private tagService: TagService,
    private memberService: MemberService,
    private cpService: ColorPickerService,
    private http: HttpClient
  ) {
    this.authService = authService;
    this.passwordForm = this.formBuilder.group({
      password: '',
    });
    this.newMemberForm = this.formBuilder.group({
      name: '',
      description: '',
      image: '',
    });

    this.newTagForm = this.formBuilder.group({
      name: '',
      color: '',
    });

    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags;
    });

    this.memberService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  ngOnInit(): void {
    this.newTagForm.patchValue({ color: this.tagColor });
  }

  colorChange(color: string) {
    this.tagColor = color;
    this.newTagForm.patchValue({ color });
  }

  updateTags(tags: Tag[]) {
    let tagIds = tags.map((t) => t.id);
    this.tagIds = tagIds;
  }

  onSubmit() {
    let password = <string>this.passwordForm.value.password;
    this.authService.login(password);
  }

  onSubmitMember() {
    let member: Member = {
      name: <string>this.newMemberForm.value.name,
      description: <string>this.newMemberForm.value.description,
      image: <string>this.newMemberForm.value.image,
      tagIds: this.tagIds,
    };

    this.memberService.addMember(member);
    this.newMemberForm.reset();
  }

  removeTag(tag: Tag) {
    this.tagService.removeTag(tag);
  }

  onSubmitTag() {
    this.tagService.addTag(<Tag>this.newTagForm.value);
    this.newTagForm.reset();
  }

  pickTextColorBasedOnBgColorAdvanced(
    bgColor: string,
    lightColor: string,
    darkColor: string
  ) {
    return pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor);
  }

  deleteMember(member: Member) {
    this.memberService.removeMember(member);
  }

  editMember(member: Member) {
    console.log('edit member', member);
  }
}
