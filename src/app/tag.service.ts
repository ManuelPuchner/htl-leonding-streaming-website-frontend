import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  array$: Observable<Tag[]> = this.tags.asObservable();

  constructor(private http: HttpClient) {
    http.get<Tag[]>('/tag').subscribe((tags) => {
      this.tags.next(tags);
    });
  }

  getTags(): Observable<Tag[]> {
    return this.array$;
  }

  addTag(tag: Tag) {
    this.http
      .post<Tag>('/tag', tag, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.array$.pipe(take(1)).subscribe((tags) => {
            this.tags.next([...tags, <Tag> response.body]);
          });
        } else {
          alert('Error adding tag');
        }
      });
  }

  removeTag(tag: Tag) {
    this.http
      .delete(`/tag/${tag.id}`, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.array$.pipe(take(1)).subscribe((tags) => {
            this.tags.next(tags.filter((t) => t.id !== tag.id));
          });
        } else {
          alert('Delete failed');
        }
      });
  }
}
