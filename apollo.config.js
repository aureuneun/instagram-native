module.exports = {
  client: {
    includes: ['./**/*.{tsx,ts}'],
    tagname: 'gql',
    service: {
      name: 'instagram',
      url: 'http://localhost:4000/graphql',
    },
  },
};
