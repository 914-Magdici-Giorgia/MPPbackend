module.exports = {
  "transform": {
    "^.+\\.js$": "babel-jest"
  },
  "testEnvironment": "jest-environment-node",
  "moduleFileExtensions": ["js"],
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "transformIgnorePatterns": [
      "/node_modules/"
    ],
};