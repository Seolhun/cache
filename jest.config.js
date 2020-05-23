module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts?(x)$/,
        warnOnly: true,
      },
    },
  },
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.dist/'],
  testMatch: ['<rootDir>/__test__/**/*.(test|spec).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
