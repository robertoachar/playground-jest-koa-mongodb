module.exports = {
  projects: [
    {
      displayName: 'test',
      testEnvironment: 'node',
      preset: '@shelf/jest-mongodb'
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/*.js']
    }
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix']
};
