// import ArgParser from 'clarp';
import ArgParser from '../dist/index.js';
import { assert } from 'console';
import * as readline from 'readline';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
// });

let p = new ArgParser();

// let inputData = '';

// rl.on('line', (line) => {
//     inputData += line + '\n';
// });

// rl.on('close', () => {
//     console.log('Received data from pipe:');
//     console.log(inputData);
// });

// console.log(inputData);


//console.log(p);



assert(p.args.includes('arg1'), 'arg1 is not present');
assert(p.args.includes('arg2'), 'arg2 is not present');
assert(!(p.args.includes('arg3')), 'arg3 is present');

assert(p.flags.includes('flag1'), 'flag1 is not present');
assert(p.flags.includes('flag2'), 'flag2 is not present');
assert(!(p.flags.includes('flag3')), 'flag3 is present');

assert(p.options['option1'] !== undefined && p.options['option1'] !== null, 'option1 does not contain data');
assert(p.options['option2'] !== undefined && p.options['option2'] !== null, 'option2 does not contain data');
assert(p.options['option3'] === undefined, 'option3 contains data but it should not exist');

assert(p.passthrough.length > 0, 'passthrough does not contain data');

assert(p.raw.length === 11, `Expected raw args length to be 11, but got ${p.raw.length}`);

p.pipe.then((data: any) => {
    assert(data.length > 0, 'Pipe data is empty');
    // console.log('Pipe data:', data);
}).catch((error: any) => {
    console.error('Error while waiting for pipe to resolve:', error);
});

console.log(p);


// console.log('All tests passed!');
