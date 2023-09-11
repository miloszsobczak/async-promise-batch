// eslint-disable-next-line no-undef
module.exports = {
    rootDir: './',
    testEnvironment: 'node',
    testMatch: [
        '<rootDir>/**/__tests__/**/*.test.ts'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    collectCoverage: true,
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover'
    ],
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    coveragePathIgnorePatterns: [
        '../../node_modules/',
    ],
    testPathIgnorePatterns: [
        '../../node_modules/',
    ],
    modulePathIgnorePatterns: [
        '../../node_modules/',
    ]
};
