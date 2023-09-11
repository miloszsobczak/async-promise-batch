import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import asyncRunner from 'async-promise-batch';

const App: React.FC = () => {
    const [result, setResult] = useState<Array<number | string | null>>([]);
    const [sequence, setSequence] = useState<Array<number | string>>([]);

    // Define an array of promises with varying execution times.
    const promises: Array<() => Promise<number | string>> = [
        () => new Promise(resolve => {
            setSequence(prevSequence => [...prevSequence, 'Calling promise 1']);
            setTimeout(() => {
                setSequence(prevSequence => [...prevSequence, 'Resolving promise with 1']);
                resolve(1);
            }, 10);
        }),
        () => new Promise(resolve => {
            setSequence(prevSequence => [...prevSequence, 'Calling promise 2']);
            setTimeout(() => {
                setSequence(prevSequence => [...prevSequence, 'Resolving promise with 2']);
                resolve(2);
            }, 200);
        }),
        () => new Promise(resolve => {
            setSequence(prevSequence => [...prevSequence, 'Calling promise 3']);
            setTimeout(() => {
                setSequence(prevSequence => [...prevSequence, 'Resolving promise with "3"']);
                resolve('3');
            }, 30);
        }),
        () => new Promise(resolve => {
            setSequence(prevSequence => [...prevSequence, 'Calling promise 4']);
            setTimeout(() => {
                setSequence(prevSequence => [...prevSequence, 'Resolving promise with 4']);
                resolve(4);
            }, 40);
        }),
    ];

    // Function to run the promises in batches and update the result.
    const runPromises = async (batchSize: number) => {
        setSequence([]); // Clear the sequence when running new promises.
        const newResult = await asyncRunner<number | string | null>(promises, batchSize);
        setResult(newResult);
    };

    // Function to reset the result and sequence.
    const reset = () => {
        setResult([]);
        setSequence([]);
    };

    return (
        <article style={{ width: '600px', margin: '20px auto' }}>
            <h1>
                <a
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        display: 'flex',
                        alignContent: 'center',
                    }}
                    href="https://github.com/miloszsobczak/async-promise-batch/"
                    target="_blank"
                >
                    <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E"
                        alt={'GitHub'}
                    />
                    <span style={{
                        marginLeft: '10px',
                    }}>async-promise-batch</span>
                </a>
            </h1>
            <div>
                <h2>Demo</h2>
                <p>This interactive demo showcases the usage of the <b>async-promise-batch</b> library.</p>
            </div>
            <hr style={{
                borderColor: '#ccc',
                borderStyle: 'solid',
                margin: '30px 0',
            }} />
            <h3>Example Input Promises</h3>
            <p>Let's consider a set of promises with varying execution times:</p>
            <pre>
                {`const promises: Array<() => Promise<number | string>> = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 10)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 200)),
  () => new Promise(resolve => setTimeout(() => resolve('3'), 30)),
  () => new Promise(resolve => setTimeout(() => resolve(4), 40)),
];`}
            </pre>
            <p>We can execute them in batches of 2 using the following code:</p>
            <pre>
                {'<button onClick={() => {\n'}
                {'    const batchSize = 2;\n'}
                {'    const result = await asyncRunner<number | string>(promises, batchSize);\n\n'}
                {'    console.log(result);\n'}
                {'}}>\n'}
            </pre>
            <hr style={{
                borderColor: '#ccc',
                borderStyle: 'solid',
                margin: '30px 0',
            }} />
            <button onClick={() => runPromises(2)}>Run</button>
            <button
                style={{
                    marginLeft: '10px',
                }}
                onClick={reset}>
                Reset
            </button>
            <h3>Result</h3>
            <p>As demonstrated, the promises are executed in batches of 2:</p>
            <p>Each batch runs in parallel, but the next batch waits until the previous one completes.</p>
            <p>The promises are executed in the order they are passed to the function.</p>
            <ul>
                {sequence.map((item, index) => (
                    <li key={index} style={{
                        marginRight: '10px',
                    }}>{item}</li>
                ))}
            </ul>
            <pre>
                {JSON.stringify(result, null, 4)}
            </pre>
            <hr style={{
                borderColor: '#ccc',
                borderStyle: 'solid',
                margin: '30px 0',
            }} />
            <h3>Acknowledgements</h3>
            <p>The codebase is somewhat intricate due to the necessity of experimenting with Generators, Iterators, and AsyncIterators which play a crucial role in managing promise execution.</p>
            <p>It serves as a practical playground for exploring the capabilities of these technologies and demonstrating how they can be used to optimize the execution of asynchronous tasks.</p>

            <footer>
                <hr style={{
                    borderColor: '#ccc',
                    borderStyle: 'solid',
                    margin: '30px 0',
                }} />
                <p>
                    &copy; 2023 <a
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                        target="_blank"
                        href="https://miloszsobczak.pl">Milosz Sobczak</a>
                </p>
            </footer>
        </article>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
