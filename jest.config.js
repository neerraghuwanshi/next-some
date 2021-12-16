module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["./jest.setup.js"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^#components(.*)$": ["<rootDir>/components$1"],
        "^#helpers(.*)$": ["<rootDir>/helpers$1"],
        "^#HOCs(.*)$": ["<rootDir>/HOCs$1"],
        "^#hooks(.*)$": ["<rootDir>/hooks$1"],
        "^#public(.*)$": ["<rootDir>/public$1"],
        "^#sockets(.*)$": ["<rootDir>/sockets$1"],
        "^#store(.*)$": ["<rootDir>/store$1"],
        "^#styles(.*)$": ["<rootDir>/styles$1"],
        "^#test(.*)$": ["<rootDir>/test$1"],
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
    },
};