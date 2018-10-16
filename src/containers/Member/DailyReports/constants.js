const headerItems = ['ID', 'Emoticon', 'Issues', 'Date', 'Actions'];

// TODO : Write GraphQL Query to fetch reports data from DB and delete this constant
const items = [
  {
    id: '1',
    emoticon: '😂',
    issues: [{ name: 'communication' }, { name: 'Bug' }],
    date: '21/10/2018'
  },
  {
    id: '2',
    emoticon: '😠',
    issues: [
      { name: 'communication' },
      { name: 'Bug' },
      { name: 'Nonsense Customer' }
    ],
    date: '22/10/2018'
  }
];

export { headerItems, items };
