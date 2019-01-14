module.exports = {
  jest(config) {
    // eslint-disable-next-line no-param-reassign
    config.moduleNameMapper = {
      '^react-native$': 'react-native-web',
      localforage: '<rootDir>/mocks/localforageMock.js',
      '../dictionaries/dictionary.json': '<rootDir>/mocks/dictionary.json',
      '../dictionaries/exact-match.json': '<rootDir>/mocks/exact-match.json',
      '../dictionaries/greek-match.json': '<rootDir>/mocks/greek-match.json',
      '../dictionaries/latin-match.json': '<rootDir>/mocks/latin-match.json',
    };

    return config;
  },
};
