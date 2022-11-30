import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';


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

  tags: Tag[] = [];
  tagColor: string = '#969696';

  constructor(
    authService: AuthService,
    private formBuilder: FormBuilder,
    private tagService: TagService,
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
    let member = { ...this.newMemberForm.value, tagIds: this.tagIds };

    this.http.post('/api/member', member).subscribe((response) => {
      console.log(response);
    });
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
    var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? darkColor : lightColor;
  }
}
