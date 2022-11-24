import { Member } from '../member';

let members: Member[] = [
  {
    id: 1,
    name: 'John',
    tags: [
      {
        id: 1,
        name: 'tag1',
      },
      {
        id: 2,
        name: 'tag2',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane',
    tags: [
      {
        id: 2,
        name: 'tag2',
      },
      {
        id: 3,
        name: 'tag3',
      },
    ],
  },
  {
    id: 3,
    name: 'Bob',
    tags: [
      {
        id: 1,
        name: 'tag1',
      },
      {
        id: 3,
        name: 'tag3',
      },
    ],
  },
];

export async function getMembersMock() {
  return members;
}
