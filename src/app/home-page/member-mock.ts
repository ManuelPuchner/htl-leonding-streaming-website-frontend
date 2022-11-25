import { Member } from '../member';

let members: Member[] = [
  {
    id: 1,
    name: 'John',
    tags: [
      {
        id: 1,
        name: 'tag1',
        color: '#ff0000'
      },
      {
        id: 2,
        name: 'tag2',
        color: '#ff0000'
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
        color: '#ff0000'
      },
      {
        id: 3,
        name: 'tag3',
        color: '#00ff00'
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
        color: '#00ff00'
      },
      {
        id: 3,
        name: 'tag3',
        color: '#00ff00'
      },
    ],
  },
];

export async function getMembersMock() {
  return members;
}
