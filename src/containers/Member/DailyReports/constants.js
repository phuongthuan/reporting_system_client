const headerItems = ['ID', 'Emoji', 'Issues', 'Date', 'Actions'];

// TODO : Write GraphQL Query to fetch reports data from DB and delete this constant
const items = [
  {
    id: '1',
    emoticon: '😂',
    issues: [{ id: 1, name: 'communication' }, { id: 2, name: 'Bug' }],
    date: '21/10/2018'
  },
  {
    id: '2',
    emoticon: '😠',
    issues: [
      { id: 1, name: 'communication' },
      { id: 2, name: 'Bug' },
      { id: 3, name: 'Customer' }
    ],
    date: '22/10/2018'
  }
];

export { headerItems, items };
