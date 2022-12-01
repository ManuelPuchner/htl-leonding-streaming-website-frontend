import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from '../tag';
import { TagService } from '../tag.service';
import { pickTextColorBasedOnBgColorAdvanced } from '../colorUtil';


@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss'],
})
export class TagSelectorComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];

  @Output()
  tagsChangedEvent = new EventEmitter<Tag[]>();

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private tagService: TagService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      map((tag) => {
        if (typeof tag === 'string') {
          return this.allTags.filter((t) =>
            t.name.toLowerCase().includes(tag.toLowerCase())
          );
        } else {
          return this.allTags;
        }
      })
    );

    this.tagService.getTags().subscribe((tags) => {
      this.allTags = tags;
    });
  }

  add(event: MatChipInputEvent): void {
    const tagName = (event.value || '').trim();

    if (tagName) {
      alert('not implemented');
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
    this.onTagsChanged();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.onTagsChanged();
  }

  reset() {
    this.tags = [];
    this.onTagsChanged();
  }

  onTagsChanged() {
    this.tagsChangedEvent.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);

    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);

    this.onTagsChanged();
  }

  pickTextColorBasedOnBgColorAdvanced(
    bgColor: string,
    lightColor: string,
    darkColor: string
  ) {
    return pickTextColorBasedOnBgColorAdvanced(bgColor, lightColor, darkColor);
  }
}
