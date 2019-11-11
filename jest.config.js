module.exports = {
  projects: [
    {
      displayName: 'test'
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/*.js']
    }
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix']
};
