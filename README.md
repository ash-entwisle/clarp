# Command-Line Arguments Parser

The goal of this project is to provide a simple way to parse command line arguments.
It should parse the arguments in a way that is easy to use and understand
and leave the implementation of commands, subcommands and options/flags to the implementer.

## Installation

TODO

## Format

```bash
echo \"This is Piped Data\" | command arg1 -flag1 arg2 --option1 "option1 value" -flag2  -- passthrough arguments "are useful"
```

### Arguments

Arguments are the values that are passed to the command,
they are the values that are not preceded by a flag or option
and are not the passthrough arguments.

### Flags

Flags are simple boolean values, they are either present or not.
They are preceded by a single dash `-`.
They are used to indicate the presence of a certain feature or option.
If you want to pass a value to a flag, you should use an [option](#options) instead.

### Options

Options are key-value pairs. They are preceded by two dashes `--`.
They are used to pass a value to a certain feature or option.
If the value contains spaces, it should be enclosed in quotes (`"`/`\`/`'`)
and will end at the next un-escaped quote.
If the value is not enclosed in quotes, it will end at the next space.

### Passthrough Arguments

Passthrough arguments are the values that are passed after a `--`.
They are not processed by the parser
and will be returned as a list of strings for the implementer to use.

### Piped Data

Piped data is the data that is passed to the command through a pipe (`|`).
It is not processed by the parser and stored in `this.pipe`.

## Usage

```ts
import ArgParser from 'clarp';

// Create a new ArgParser instance
const p = new ArgParser();

// bobs yer uncle
console.log(p);
```

## Testing

Running `npm run test` will test ArgParser with the arguments defined [here](#format).
It should say all tests have passed (you can find the tests in `./src/test.ts`)
and you should get the following output:

```txt
ArgParser {
  _args: [ 'arg1', 'arg2' ],
  _flags: [ 'flag1', 'flag2' ],
  _options: { option1: 'option1 value', option2: 'this is also valid' },
  _passthrough: [ 'passthrough', 'arguments', 'are useful' ],
  _raw: [
    'arg1',
    '-flag1',
    'arg2',
    '--option1',
    'option1 value',
    '-flag2',
    '--option2=this is also valid',
    '--',
    'passthrough',
    'arguments',
    'are useful'
  ]
}
```
