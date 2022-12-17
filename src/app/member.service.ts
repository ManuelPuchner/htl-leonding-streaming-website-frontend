import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  members: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
  array$: Observable<Member[]> = this.members.asObservable();

  constructor(private http: HttpClient) {
    this.http.get<Member[]>('/member').subscribe((members) => {
      this.members.next(members);
    });
  }

  getMembers(): Observable<Member[]> {
    return this.array$;
  }

  addMember(member: Member) {
    this.http
      .post<Member>('/member', member, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.array$.pipe(take(1)).subscribe((members) => {
            this.members.next([...members, <Member>response.body]);
          });
        } else {
          alert('Error adding member');
        }
      });
  }

  removeMember(member: Member) {
    this.http
      .delete(`/member/${member.id}`, {
        observe: 'response',
        withCredentials: true,
      })
      .subscribe((response) => {
        if (response.status === 200) {
          this.array$.pipe(take(1)).subscribe((members) => {
            this.members.next(members.filter((m) => m.id !== member.id));
          });
        } else {
          alert('Delete failed');
        }
      });
  }
}
