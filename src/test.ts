import ArgParser from 'clarp';
import { assert } from 'console';

let p = new ArgParser();

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

console.log(p);

console.log('All tests passed!');
