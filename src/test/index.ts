import chai from 'chai';
import chalk from 'chalk';
import dir from "node-dir";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runTest(testPath: string) {
    const imported = await import(testPath);
    console.log("Running", testPath);
    let params: any = undefined;
    if (imported.before)
        params = await imported.before();
    try {
        await imported.run(params);
    } catch (err) {
        if (err instanceof chai.AssertionError) {
            console.log(chalk.red("Assertion error"));
            console.log(err);
        }
    }
    if (imported.after)
        await imported.after(params);
}

export async function runAll() {
    console.log("Finding tests");
    let tests = await dir.promiseFiles(__dirname);
    tests = tests.filter(t => /\.test\.js$/.test(t));
    for (const testPath of tests) {
        await runTest(testPath);
    }
    console.log(chalk.green("All tests seem to have passed."));
}