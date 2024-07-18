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
    this.redisTransaction.addCommand(
      command_arguments.map(
        (value) => typeof value === "string" ? value : String(value)
      )
    );
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
  return [["GET", key]];
}

// dist/esm/commands/string/set.js
var set_exports = {};
__export(set_exports, {
  input: () => input2
});
function input2(key, value, options) {
  const command_arguments = ["SET", key, value];
  let modifier;
  if (options) {
    if (options.NX) {
      command_arguments.push("NX");
    }
    if (options.XX) {
      command_arguments.push("XX");
    }
    if (options.EX) {
      command_arguments.push("EX", String(options.EX));
    }
    if (options.PX) {
      command_arguments.push("PX", String(options.PX));
    }
    if (options.EXAT) {
      command_arguments.push("EXAT", String(options.EXAT));
    }
    if (options.PXAT) {
      command_arguments.push("PXAT", String(options.PXAT));
    }
    if (options.KEEPTTL) {
      command_arguments.push("KEEPTTL");
    }
    if (options.GET) {
      command_arguments.push("GET");
      modifier = "GET";
    }
  }
  return [command_arguments, modifier];
}

// dist/esm/commands/string/incr.js
var incr_exports = {};
__export(incr_exports, {
  input: () => input3
});
function input3(key) {
  return [["INCR", key]];
}

// dist/esm/commands/string/incrbyfloat.js
var incrbyfloat_exports = {};
__export(incrbyfloat_exports, {
  input: () => input4,
  output: () => output
});
function input4(key, increment) {
  return [["INCRBYFLOAT", key, String(increment)]];
}
function output(result) {
  return Number.parseFloat(result);
}

// dist/esm/commands/string/incrby.js
var incrby_exports = {};
__export(incrby_exports, {
  input: () => input5
});
function input5(key, increment) {
  return [["INCRBY", key, String(increment)]];
}

// dist/esm/commands/string/decrby.js
var decrby_exports = {};
__export(decrby_exports, {
  input: () => input6
});
function input6(key, decrement) {
  return [["DECRBY", key, String(decrement)]];
}

// dist/esm/commands/string/decr.js
var decr_exports = {};
__export(decr_exports, {
  input: () => input7
});
function input7(key) {
  return [["DECR", key]];
}

// dist/esm/commands/hash/hset.js
var hset_exports = {};
__export(hset_exports, {
  input: () => input8
});
function input8(key, arg1, arg2) {
  const command_arguments = ["HSET", key];
  if (typeof arg1 === "string") {
    command_arguments.push(arg1, String(arg2));
  } else {
    for (const [field, value] of Object.entries(arg1)) {
      command_arguments.push(field, String(value));
    }
  }
  return [command_arguments];
}

// dist/esm/commands/hash/hgetall.js
var hgetall_exports = {};
__export(hgetall_exports, {
  input: () => input9,
  output: () => output2
});

// dist/esm/utils.js
function stringBulkToObject(values) {
  const object = {};
  for (let index = 0; index < values.length; index += 2) {
    object[values[index]] = values[index + 1];
  }
  return object;
}

// dist/esm/commands/hash/hgetall.js
function input9(key) {
  return [["HGETALL", key]];
}
function output2(result) {
  return stringBulkToObject(result);
}

// dist/esm/commands/hash/hget.js
var hget_exports = {};
__export(hget_exports, {
  input: () => input10
});
function input10(key, field) {
  return [["HGET", key, field]];
}

// dist/esm/commands/hash/hmget.js
var hmget_exports = {};
__export(hmget_exports, {
  input: () => input11,
  output: () => output3
});
function input11(key, arg1, ...args) {
  let fields_array = [];
  if (typeof arg1 === "string") {
    fields_array = args;
    fields_array.unshift(arg1);
  } else if (Array.isArray(arg1)) {
    fields_array = arg1;
  } else {
    fields_array = [...arg1];
  }
  return [["HMGET", key, ...fields_array], JSON.stringify(fields_array)];
}
function output3(result, modificator) {
  const fields = JSON.parse(modificator);
  const output6 = {};
  for (const [index, field] of fields.entries()) {
    const value = result[index];
    if (value !== void 0) {
      output6[field] = value;
    }
  }
  return output6;
}

// dist/esm/commands/hash/hlen.js
var hlen_exports = {};
__export(hlen_exports, {
  input: () => input12
});
function input12(key) {
  return [["HLEN", key]];
}

// dist/esm/commands/hash/hdel.js
var hdel_exports = {};
__export(hdel_exports, {
  input: () => input13
});
function input13(key, arg1, ...args) {
  let fields_array = [];
  if (typeof arg1 === "string") {
    fields_array = args;
    fields_array.unshift(arg1);
  } else if (Array.isArray(arg1)) {
    fields_array = arg1;
  } else {
    fields_array = [...arg1];
  }
  return [["HDEL", key, ...fields_array]];
}

// dist/esm/commands/zset/zrange.js
var zrange_exports = {};
__export(zrange_exports, {
  input: () => input14,
  output: () => output4
});
function input14(key, start, stop, options) {
  const command_arguments = ["ZRANGE", key, String(start), String(stop)];
  let modifier;
  if (options) {
    if (options.REV) {
      command_arguments.push("REV");
    }
    if (options.BYSCORE) {
      command_arguments.push("BYSCORE");
    }
    if (options.BYLEX) {
      command_arguments.push("BYLEX");
    }
    if (options.LIMIT) {
      command_arguments.push(
        "LIMIT",
        String(options.LIMIT[0]),
        String(options.LIMIT[1])
      );
    }
    if (options.WITHSCORES) {
      command_arguments.push("WITHSCORES");
      modifier = "WITHSCORES";
    }
  }
  return [command_arguments, modifier];
}
function output4(result, modifier) {
  if (modifier === "WITHSCORES") {
    const result_withscores = [];
    for (let index = 0; index < result.length; index += 2) {
      result_withscores.push({
        value: result[index],
        score: Number.parseFloat(result[index + 1])
      });
    }
    return result_withscores;
  }
  return result;
}

// dist/esm/commands/keyspace/pexpire.js
var pexpire_exports = {};
__export(pexpire_exports, {
  input: () => input15
});
function input15(key, seconds, options) {
  const command_arguments = ["PEXPIRE", key, String(seconds)];
  if (options) {
    if (options.NX) {
      command_arguments.push("NX");
    }
    if (options.XX) {
      command_arguments.push("XX");
    }
    if (options.GT) {
      command_arguments.push("GT");
    }
    if (options.LT) {
      command_arguments.push("LT");
    }
  }
  return [command_arguments];
}

// dist/esm/commands/keyspace/pttl.js
var pttl_exports = {};
__export(pttl_exports, {
  input: () => input16
});
function input16(key) {
  return [["PTTL", key]];
}

// dist/esm/commands/keyspace/ttl.js
var ttl_exports = {};
__export(ttl_exports, {
  input: () => input17
});
function input17(key) {
  return [["TTL", key]];
}

// dist/esm/commands/keyspace/expire.js
var expire_exports = {};
__export(expire_exports, {
  input: () => input18
});
function input18(key, seconds, options) {
  const command_arguments = ["EXPIRE", key, String(seconds)];
  if (options) {
    if (options.NX) {
      command_arguments.push("NX");
    }
    if (options.XX) {
      command_arguments.push("XX");
    }
    if (options.GT) {
      command_arguments.push("GT");
    }
    if (options.LT) {
      command_arguments.push("LT");
    }
  }
  return [command_arguments];
}

// dist/esm/commands/keyspace/keys.js
var keys_exports = {};
__export(keys_exports, {
  input: () => input19,
  output: () => output5
});
function input19(pattern) {
  return [["KEYS", pattern]];
}
function output5(result) {
  return new Set(result);
}

// dist/esm/commands/keyspace/del.js
var del_exports = {};
__export(del_exports, {
  input: () => input20
});
function input20(...keys) {
  return [["DEL", ...keys]];
}

// dist/esm/transaction.js
var RedisXTransaction = class extends RedisXTransactionBase {
  GET(...args) {
    return this._addModuleCommand(get_exports, args);
  }
  SET(...args) {
    return this._addModuleCommand(set_exports, args);
  }
  INCR(...args) {
    return this._addModuleCommand(incr_exports, args);
  }
  INCRBYFLOAT(...args) {
    return this._addModuleCommand(incrbyfloat_exports, args);
  }
  INCRBY(...args) {
    return this._addModuleCommand(incrby_exports, args);
  }
  DECRBY(...args) {
    return this._addModuleCommand(decrby_exports, args);
  }
  DECR(...args) {
    return this._addModuleCommand(decr_exports, args);
  }
  HSET(...args) {
    return this._addModuleCommand(hset_exports, args);
  }
  HGETALL(...args) {
    return this._addModuleCommand(hgetall_exports, args);
  }
  HGET(...args) {
    return this._addModuleCommand(hget_exports, args);
  }
  HMGET(...args) {
    return this._addModuleCommand(hmget_exports, args);
  }
  HLEN(...args) {
    return this._addModuleCommand(hlen_exports, args);
  }
  HDEL(...args) {
    return this._addModuleCommand(hdel_exports, args);
  }
  ZRANGE(...args) {
    return this._addModuleCommand(zrange_exports, args);
  }
  PEXPIRE(...args) {
    return this._addModuleCommand(pexpire_exports, args);
  }
  PTTL(...args) {
    return this._addModuleCommand(pttl_exports, args);
  }
  TTL(...args) {
    return this._addModuleCommand(ttl_exports, args);
  }
  EXPIRE(...args) {
    return this._addModuleCommand(expire_exports, args);
  }
  KEYS(...args) {
    return this._addModuleCommand(keys_exports, args);
  }
  DEL(...args) {
    return this._addModuleCommand(del_exports, args);
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
    return this.redisClient.sendCommand(
      command_arguments.map(
        (value) => typeof value === "string" ? value : String(value)
      )
    );
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
  async INCR(...args) {
    return this._sendModuleCommand(incr_exports, args);
  }
  async INCRBYFLOAT(...args) {
    return this._sendModuleCommand(incrbyfloat_exports, args);
  }
  async INCRBY(...args) {
    return this._sendModuleCommand(incrby_exports, args);
  }
  async DECRBY(...args) {
    return this._sendModuleCommand(decrby_exports, args);
  }
  async DECR(...args) {
    return this._sendModuleCommand(decr_exports, args);
  }
  async HSET(...args) {
    return this._sendModuleCommand(hset_exports, args);
  }
  async HGETALL(...args) {
    return this._sendModuleCommand(hgetall_exports, args);
  }
  async HGET(...args) {
    return this._sendModuleCommand(hget_exports, args);
  }
  async HMGET(...args) {
    return this._sendModuleCommand(hmget_exports, args);
  }
  async HLEN(...args) {
    return this._sendModuleCommand(hlen_exports, args);
  }
  async HDEL(...args) {
    return this._sendModuleCommand(hdel_exports, args);
  }
  async ZRANGE(...args) {
    return this._sendModuleCommand(zrange_exports, args);
  }
  async PEXPIRE(...args) {
    return this._sendModuleCommand(pexpire_exports, args);
  }
  async PTTL(...args) {
    return this._sendModuleCommand(pttl_exports, args);
  }
  async TTL(...args) {
    return this._sendModuleCommand(ttl_exports, args);
  }
  async EXPIRE(...args) {
    return this._sendModuleCommand(expire_exports, args);
  }
  async KEYS(...args) {
    return this._sendModuleCommand(keys_exports, args);
  }
  async DEL(...args) {
    return this._sendModuleCommand(del_exports, args);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisXClient
});
