module.exports = {
  displayName: 'test',
  verbose: true,
  testEnvironment: 'node',
  // preset: '@shelf/jest-mongodb',
  collectCoverageFrom: ['src/**/**.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
