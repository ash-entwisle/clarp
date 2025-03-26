export default class ArgParser {
  private _args: string[];
  private _flags: string[];
  private _options: Record<string, string>;
  private _passthrough: string[];
  private _raw: string[];

  public get args(): string[] {
    return this._args;
  }
  private set args(value: string[]) {
    this._args = value;
  }

  public get flags(): string[] {
    return this._flags;
  }
  private set flags(value: string[]) {
    this._flags = value;
  }

  public get options(): Record<string, string> {
    return this._options;
  }
  private set options(value: Record<string, string>) {
    this._options = value;
  }

  public get passthrough(): string[] {
    return this._passthrough;
  }
  private set passthrough(value: string[]) {
    this._passthrough = value;
  }

  public get raw(): string[] {
    return this._raw;
  }

  constructor() {
    this._args = [];
    this._flags = [];
    this._options = {};
    this._passthrough = [];
    this._raw = process.argv.slice(2);

    this.parse();
  }

  private parse() {
    let option: boolean = false;
    let key: string = '';
    let val: string = '';
    let passthrough: boolean = false;

    for (let i = 0; i < this._raw.length; i++) {
      // Pull out the argument from argv
      let arg = this._raw[i] ?? '';
      // console.log(`[${i}] arg: ${arg}`);

      // if we are after a --, then append the rest of the arguments to passthrough
      if (passthrough) {
        this.passthrough.push(arg);
      }

      // else if we are currently looking at an option, then set the value of the option and add it to the options object
      else if (option) {
        val = arg;
        this.options[key] = val;
        option = false;
      }

      // if the arg is --, then set passthrough to true
      else if (arg === '--') {
        passthrough = true;
      }

      // if the arg starts with --, then its the start of an option
      else if (arg.startsWith('--')) {
        // if it contains an equals, then split it into key and value and append it to the options object
        if (arg.includes('=')) {
          let parts = arg.split('=');

          key = parts[0]!.substring(2);
          val = parts[1]!;

          this.options[key] = val;
        }

        // else, set the key and set option to true
        else {
          key = arg.substring(2);
          option = true;
        }
      }

      // else if the arg starts with -, then its a flag, so append it to the flags array
      else if (arg.startsWith('-')) {
        this.flags.push(arg.substring(1));
      }

      // else, its an argument, so append it to the args array
      else {
        this.args.push(arg);
      }
    }
  }
}
