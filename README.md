# async-promise-batch

[![npm version](https://img.shields.io/npm/v/async-promise-batch.svg)](https://www.npmjs.com/package/async-promise-batch)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yourusername/async-promise-batch/blob/main/LICENSE)

Async Promise Batch is a powerful utility for managing and controlling the concurrency of promises in your JavaScript or TypeScript projects. It allows you to efficiently process asynchronous tasks in batches, making it ideal for scenarios where you want to limit the number of concurrently executing promises.

## Installation

You can install async-promise-batch using npm or yarn:

```sh
npm install async-promise-batch
```

or

```sh
yarn add async-promise-batch
```

## Features

- **Promise Concurrency Control:** Limit the number of concurrent promises being executed to prevent resource overload.
- **Batch Processing:** Efficiently process promises in batches, reducing resource consumption and improving performance.
- **Async Iterator:** Provides an async iterator interface for easy integration into your async workflows.
- **Customizable:** Configure the batch size and control how promises are processed.

## Usage

Here's a simple example of how to use async-promise-batch:

```typescript
import asyncPromiseBatch from 'async-promise-batch';

// Define an array of promise functions to execute
const promises = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 10)),
    () => new Promise(resolve => setTimeout(() => resolve(2), 200)),
    () => new Promise(resolve => setTimeout(() => resolve('3'), 30)),
    () => new Promise(resolve => setTimeout(() => resolve(4), 40)),
];

// Set the maximum number of concurrent promises (e.g., 2)
const concurrencyLimit = 2;

// Run the promises in batches with concurrency control
const results = await asyncPromiseBatch<number | string>(promises, concurrencyLimit);

console.log(results);
// [1, 2, '3', 4]
```

## License

This package is open-source and available under the MIT License. Feel free to use it in your projects and contribute to its development.

## Contributing

Contributions, bug reports, and feature requests are welcome! If you encounter any issues or have ideas for improvements, please [create an issue](https://github.com/miloszsobczak/async-promise-batch/issues) on GitHub.

## Acknowledgments

This package was inspired by the need for efficient promise concurrency control in JavaScript and TypeScript projects. Thanks to the open-source community for their contributions and ideas.

---

© 2023 Milo | [GitHub Repository](https://github.com/miloszsobczak/async-promise-batch)
