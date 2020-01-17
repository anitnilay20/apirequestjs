module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  "rootDir": ".",
  "coverageDirectory": "<rootDir>/__tests__/__coverage__/",
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__tests__/__mocks__/fileMock.js",
    "\\.(css|scss|less)$": "<rootDir>/__tests__/__mocks__/styleMock.js"
  },
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx"],
  "transformIgnorePatterns": [
    "/node_modules/"
  ],
  "testRegex": "/__tests__/.*\\.(ts|tsx)$",
  "moduleDirectories": [
    "node_modules"
  ],
  "globals": {
    "DEVELOPMENT": false,
    "FAKE_SERVER": false
  }
};