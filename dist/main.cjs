"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/main.js
var main_exports = {};
__export(main_exports, {
  RedisXClient: () => RedisXClient
});
module.exports = __toCommonJS(main_exports);

// dist/esm/transaction.base.js
var RedisXTransactionBase = class {
  redisTransaction;
  #commands = [];
  constructor(redisTransaction) {
    this.redisTransaction = redisTransaction;
  }
  /**
   * Returns the number of commands in the transaction queue.
   * @returns -
   */
  get queue_length() {
    return this.#commands.length;
  }
  /**
   * Adds a command to the transaction.
   * @param command_arguments Command with its arguments.
   * @returns Command result.
   */
  addCommand(...command_arguments) {
    this.redisTransaction.addCommand(command_arguments.map((value) => typeof value === "string" ? value : String(value)));
    this.#commands.push({});
    return this;
  }
  /**
   * Assigns the result of the last command to a key in the result object.
   * @param key Key to assign the result to.
   * @returns -
   */
  as(key) {
    const last_command = this.#commands.at(-1);
    if (!last_command) {
      throw new Error("To use as() method, you must add a command first.");
    }
    last_command.key = key;
    return this;
  }
  /**
   * Executes the transaction and returns the result.
   * @returns Result of the transaction. The result is a tuple with the results of each command in the transaction. Optionally, the result can have additional keys assigned with the `as()` method.
   */
  async execute() {
    const result = await this.redisTransaction.exec();
    for (const [index, command] of this.#commands.entries()) {
      const command_result = result[index];
      if (command.output) {
        result[index] = command.output(command_result, command.modificator);
      }
      if (command.key) {
        result[command.key] = command_result;
      }
    }
    return result;
  }
  /**
   * @protected
   * @param module -
   * @param args -
   * @returns -
   */
  _addModuleCommand(module2, args) {
    const [command_arguments, modificator] = module2.input(...args);
    this.redisTransaction.addCommand(command_arguments);
    this.#commands.push({
      output: module2.output,
      modificator
    });
    return this;
  }
};

// dist/esm/commands/string/get.js
var get_exports = {};
__export(get_exports, {
  input: () => input
});
function input(key) {
  return [[
    "GET",
    key
  ]];
}

// dist/esm/commands/string/set.js
var set_exports = {};
__export(set_exports, {
  input: () => input2
});
function input2(key, value, options) {
  const command_arguments = [
    "SET",
    key,
    value
  ];
  let modifier;
  if (options) {
    if (options.NX) {
      command_arguments.push("NX");
    } else if (options.XX) {
      command_arguments.push("XX");
    }
    if (options.EX) {
      command_arguments.push("EX", String(options.EX));
    } else if (options.PX) {
      command_arguments.push("PX", String(options.PX));
    } else if (options.EXAT) {
      command_arguments.push("EXAT", String(options.EXAT));
    } else if (options.PXAT) {
      command_arguments.push("PXAT", String(options.PXAT));
    } else if (options.KEEPTTL) {
      command_arguments.push("KEEPTTL");
    }
    if (options.GET) {
      command_arguments.push("GET");
      modifier = "GET";
    }
  }
  return [
    command_arguments,
    modifier
  ];
}

// dist/esm/commands/zset/zrange.js
var zrange_exports = {};
__export(zrange_exports, {
  input: () => input3,
  output: () => output
});
function input3(key, start, stop, options) {
  const command_arguments = [
    "ZRANGE",
    key,
    String(start),
    String(stop)
  ];
  let modifier;
  if (options) {
    if (options.REV) {
      command_arguments.push("REV");
    }
    if (options.LIMIT) {
      command_arguments.push("LIMIT", String(options.LIMIT[0]), String(options.LIMIT[1]));
    }
    if (options.BYSCORE) {
      command_arguments.push("BYSCORE");
    } else if (options.BYLEX) {
      command_arguments.push("BYLEX");
    }
    if (options.WITHSCORES) {
      command_arguments.push("WITHSCORES");
      modifier = "WITHSCORES";
    }
  }
  return [
    command_arguments,
    modifier
  ];
}
function output(result, modifier) {
  if (modifier === "WITHSCORES") {
    const map = /* @__PURE__ */ new Map();
    for (let index = 0; index < result.length; index += 2) {
      map.set(result[index], Number.parseFloat(result[index + 1]));
    }
    return map;
  }
  return result;
}

// dist/esm/transaction.js
var RedisXTransaction = class extends RedisXTransactionBase {
  GET(...args) {
    return this._addModuleCommand(get_exports, args);
  }
  SET(...args) {
    return this._addModuleCommand(set_exports, args);
  }
  ZRANGE(...args) {
    return this._addModuleCommand(zrange_exports, args);
  }
};

// dist/esm/client.base.js
var RedisXClientBase = class {
  redisClient;
  constructor(redisClient) {
    this.redisClient = redisClient;
  }
  /**
   * Sends a command to the Redis server.
   * @param command_arguments Command with its arguments.
   * @returns Command result.
   */
  sendCommand(...command_arguments) {
    return this.redisClient.sendCommand(command_arguments.map((value) => typeof value === "string" ? value : String(value)));
  }
  /**
   * Creates a transaction.
   * @returns -
   */
  createTransaction() {
    return new RedisXTransaction(this.redisClient.multi());
  }
  /**
   * @protected
   * @param module -
   * @param args -
   * @returns -
   */
  async _sendModuleCommand(module2, args) {
    const [command_arguments, modificator] = module2.input(...args);
    const result = await this.redisClient.sendCommand(command_arguments);
    if (module2.output) {
      return module2.output(result, modificator);
    }
    return result;
  }
};

// dist/esm/client.js
var RedisXClient = class extends RedisXClientBase {
  async GET(...args) {
    return this._sendModuleCommand(get_exports, args);
  }
  async SET(...args) {
    return this._sendModuleCommand(set_exports, args);
  }
  async ZRANGE(...args) {
    return this._sendModuleCommand(zrange_exports, args);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisXClient
});
