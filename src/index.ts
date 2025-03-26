/**
 * A class for parsing command-line arguments, flags, options, and passthrough arguments.
 * It processes the raw arguments provided via `process.argv` and categorizes them into
 * different groups such as arguments, flags, options, and passthrough arguments.
 */
export default class ArgParser {
  /**
   * Stores the list of arguments (positional parameters) passed to the command.
   */
  private _args: string[];

  /**
   * Stores the list of flags (single-dash options) passed to the command.
   */
  private _flags: string[];

  /**
   * Stores the key-value pairs of options (double-dash options) passed to the command.
   */
  private _options: Record<string, string>;

  /**
   * Stores the list of passthrough arguments (arguments after `--`).
   */
  private _passthrough: string[];

  /**
   * Stores the raw arguments passed to the command, excluding the first two elements of `process.argv`.
   */
  private _raw: string[];

  /**
   * Gets the list of arguments (positional parameters).
   */
  public get args(): string[] {
    return this._args;
  }

  /**
   * Gets the list of flags (single-dash options).
   */
  public get flags(): string[] {
    return this._flags;
  }

  /**
   * Gets the key-value pairs of options (double-dash options).
   */
  public get options(): Record<string, string> {
    return this._options;
  }

  /**
   * Gets the list of passthrough arguments (arguments after `--`).
   */
  public get passthrough(): string[] {
    return this._passthrough;
  }

  /**
   * Gets the raw arguments passed to the command.
   */
  public get raw(): string[] {
    return this._raw;
  }

  /**
   * Constructs an instance of `ArgParser` and initializes the internal properties.
   * Automatically parses the raw arguments provided via `process.argv`.
   */
  constructor() {
    this._args = [];
    this._flags = [];
    this._options = {};
    this._passthrough = [];
    this._raw = process.argv.slice(2);

    this.parse();
  }

  /**
   * Parses the raw arguments and categorizes them into arguments, flags, options, and passthrough arguments.
   * Handles the following cases:
   * - Arguments after `--` are treated as passthrough arguments.
   * - Double-dash options (`--key=value` or `--key value`) are stored as key-value pairs in the `options` object.
   * - Single-dash flags (`-f`) are stored in the `flags` array.
   * - Positional arguments are stored in the `args` array.
   */
  private parse(): void {
    let option: boolean = false;
    let key: string = '';
    let val: string = '';
    let passthrough: boolean = false;

    for (let i = 0; i < this._raw.length; i++) {
      let arg = this._raw[i] ?? '';

      if (passthrough) {
        this.passthrough.push(arg);
      } else if (option) {
        val = arg;
        this.options[key] = val;
        option = false;
      } else if (arg === '--') {
        passthrough = true;
      } else if (arg.startsWith('--')) {
        if (arg.includes('=')) {
          let parts = arg.split('=');
          key = parts[0]!.substring(2);
          val = parts[1]!;
          this.options[key] = val;
        } else {
          key = arg.substring(2);
          option = true;
        }
      } else if (arg.startsWith('-')) {
        this.flags.push(arg.substring(1));
      } else {
        this.args.push(arg);
      }
    }
  }
}
