import { Team } from "../team";

const teams: Team[] = [
  {
    name: 'Team 1',
    description: undefined,
    image: undefined,
    members: [
      {
        id: 1,
        name: 'Member 1',
        tags: [{ id: 1, name: 'Tag 1', color: '#ff000' }],
      },
      {
        id: 2,
        name: 'Member 2',
        tags: [
          { id: 3, name: 'Tag 3', color: '#ff000' },
          { id: 4, name: 'Tag 4', color: '#00ff00' },
        ],
      },
      {
        id: 3,
        name: 'Member 3',
        tags: [
          { id: 5, name: 'Tag 5', color: '#ff000' },
          { id: 6, name: 'Tag 6', color: '#00ff00' },
        ],
      },
    ],
  },
  {
    name: 'Team 2',
    description: undefined,
    image: undefined,
    members: [
      {
        id: 1,
        name: 'Member 1',
        tags: [
          { id: 1, name: 'Tag 1', color: '#ff000' },
          { id: 5, name: 'Tag 5', color: '#ff000' },
          { id: 7, name: 'Tag 7', color: '#ff000' },
        ],
      },
      {
        id: 2,
        name: 'Member 2',
        tags: [],
      },
      {
        id: 3,
        name: 'Member 3',
        tags: [
          { id: 5, name: 'Tag 5', color: '#ff000' },
          { id: 6, name: 'Tag 6', color: '#00ff00' },
        ],
      },
    ],
  },
];

export async function getTeamsMock(): Promise<Team[]> {
  return teams;
}
