var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.js
var main_exports = {};
__export(main_exports, {
  RedisXClient: () => RedisXClient
});
module.exports = __toCommonJS(main_exports);

// src/x-commands/tools/ping.js
function* ping() {
  return yield ["PING"];
}

// src/x-commands/hash/set.js
function* set(key, field, value) {
  return yield [
    "HSET",
    key,
    field,
    value
  ];
}

// src/x-commands/hash/append.js
var v = __toESM(require("valibot"), 1);

// src/utils/lodash/isObjectLike.js
function isObjectLike(value) {
  return Boolean(value) && typeof value === "object";
}

// src/utils/lodash/isPlainObject.js
var objectTag = "[object Object]";
function isHostObject(value) {
  let result = false;
  if (value != null && typeof value.toString !== "function") {
    try {
      result = Boolean(String(value));
    } catch {
    }
  }
  return result;
}
function overArgument(function_, transform) {
  return function(arg) {
    return function_(transform(arg));
  };
}
var functionProto = Function.prototype;
var objectProto = Object.prototype;
var functionToString = functionProto.toString;
var { hasOwnProperty } = objectProto;
var objectCtorString = functionToString.call(Object);
var objectToString = objectProto.toString;
var getPrototype = overArgument(Object.getPrototypeOf, Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  const proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && Ctor instanceof Ctor && functionToString.call(Ctor) == objectCtorString;
}

// src/x-commands/hash/append.js
var valueValidator = v.union(
  [
    v.record(
      v.string(),
      v.any()
    ),
    v.map(
      v.string(),
      v.any()
    )
  ],
  'Argument "values" must be an object or a Map.'
);
function* append(key, values) {
  const args = [
    "HSET",
    key
  ];
  values = v.parse(
    valueValidator,
    values
  );
  const iterable_target = isPlainObject(values) ? Object.entries(values) : values;
  for (const [field, value] of iterable_target) {
    args.push(field, value);
  }
  return yield args;
}

// src/x-commands/hash/get-all.js
function* getAll(key) {
  const result = yield [
    "HGETALL",
    key
  ];
  const response = {};
  for (let index = 0; index < result.length; index += 2) {
    response[result[index]] = result[index + 1];
  }
  return response;
}

// src/x-commands/key/delete.js
function* delete_(...keys) {
  return yield [
    "DEL",
    ...keys
  ];
}
function* remove(...keys) {
  return yield [
    "DEL",
    ...keys
  ];
}

// src/x-commands/key/expire.js
function* expire(key, timeout) {
  return yield [
    "EXPIRE",
    key,
    timeout
  ];
}

// src/x-commands/list/unshift.js
function* unshift(key, ...values) {
  const args = [
    "LPUSH",
    key
  ];
  if (values.length === 1) {
    args.push(
      values[0]
    );
  } else {
    for (let index = values.length - 1; index >= 0; index--) {
      args.push(
        values[index]
      );
    }
  }
  return yield args;
}

// src/x-commands/string/set.js
var v2 = __toESM(require("valibot"), 1);
var optionsValidator = v2.object(
  {
    existing: v2.optional(
      v2.boolean()
    ),
    expire: v2.optional(
      v2.union(
        [
          v2.literal("keep"),
          v2.object(
            {
              in: v2.number([
                v2.integer(),
                v2.minValue(0)
              ])
            },
            v2.never()
          ),
          v2.object(
            {
              in_ms: v2.number([
                v2.integer(),
                v2.minValue(0)
              ])
            },
            v2.never()
          ),
          v2.object(
            {
              at: v2.number([
                v2.integer(),
                v2.minValue(0)
              ])
            },
            v2.never()
          ),
          v2.object(
            {
              at_ms: v2.number([
                v2.integer(),
                v2.minValue(0)
              ])
            },
            v2.never()
          )
        ],
        'Property "expire" must be either "keep" or an object with one of the following properties: "in", "in_ms", "at", "at_ms".'
      )
    )
  },
  v2.never('Unknown property found in "options" argument. Only "existing" and "expire" are allowed.')
);
function* set2(key, value, options = {}) {
  options = v2.parse(
    optionsValidator,
    options
  );
  const args = [
    "SET",
    key,
    value
  ];
  switch (options.existing) {
    case true:
      args.push("XX");
      break;
    case false:
      args.push("NX");
      break;
  }
  if (options.expire === "keep") {
    args.push("KEEPTTL");
  } else if (options.expire !== void 0) {
    if (options.expire.in) {
      args.push(
        "EX",
        options.expire.in
      );
    } else if (options.expire.in_ms) {
      args.push(
        "PX",
        options.expire.in_ms
      );
    } else if (options.expire.at) {
      args.push(
        "EXAT",
        options.expire.at
      );
    } else if (options.expire.at_ms) {
      args.push(
        "PXAT",
        options.expire.at_ms
      );
    }
  }
  return yield args;
}

// src/x-commands/string/get.js
function* get(key) {
  return yield [
    "GET",
    key
  ];
}

// src/generated/single-commands.js
class RedisXClientToolsCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Returns the server's liveliness response.
   *
   * Complexity: O(1)
   * @async
   * @returns {Promise<"PONG">} Response from the Redis server.
   */
  ping() {
    return this.#parent._useGenerator(ping);
  }
};
class RedisXClientHashCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Sets the value of a field in a hash.
   *
   * Complexity: O(1)
   * @async
   * @param {string} key Key name.
   * @param {string} field Field name.
   * @param {RedisXCommandArgument} value Field value.
   * @returns {Promise<number>} 1 if the field was added, 0 if it was updated.
   */
  set(key, field, value) {
    return this.#parent._useGenerator(set, [key, field, value]);
  }
  /**
   * Sets the specified fields to their respective values in the hash stored at key.
   *
   * Complexity: O(1) for each field/value pair added.
   * @async
   * @param {string} key Key name.
   * @param {{ [key: string]: any } | Map<string, any>} values Field-value pairs.
   * @returns {Promise<number>} The number of fields that were added.
   */
  append(key, values) {
    return this.#parent._useGenerator(append, [key, values]);
  }
  /**
   * Returns all fields and values of the hash stored at key.
   *
   * Complexity: O(N) where N is the size of the hash.
   * @async
   * @param {string} key Key name.
   * @returns {Promise<{ [key: string]: any }>} The hash stored at key.
   */
  getAll(key) {
    return this.#parent._useGenerator(getAll, [key]);
  }
};
class RedisXClientKeyCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Removes the specified keys. A key is ignored if it does not exist.
   *
   * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   * @async
   * @param {...string} keys Key name.
   * @returns {Promise<number>} The number of keys that were removed.
   */
  delete_(...keys) {
    return this.#parent._useGenerator(delete_, [...keys]);
  }
  /**
   * Removes the specified keys. A key is ignored if it does not exist.
   *
   * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   * @async
   * @param {...string} keys Key name.
   * @returns {Promise<number>} The number of keys that were removed.
   */
  remove(...keys) {
    return this.#parent._useGenerator(remove, [...keys]);
  }
  /**
   * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
   *
   * Complexity: O(1)
   * @async
   * @param {string} key Key name.
   * @param {number} timeout Timeout in seconds.
   * @returns {Promise<number>} 0 if the timeout was not set; 1 if the timeout was set.
   */
  expire(key, timeout) {
    return this.#parent._useGenerator(expire, [key, timeout]);
  }
};
class RedisXClientListCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Insert all the specified values at the head of the list stored at key.
   *
   * Unlike LPUSH command, multiple elements are inserted as bulk, like Array.prototype.unshift() method.
   *
   * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
   * @async
   * @param {string} key Key name.
   * @param {RedisXCommandArgument[]} values Values to insert.
   * @returns {Promise<number>} The length of the list after the push operation.
   */
  unshift(key, values) {
    return this.#parent._useGenerator(unshift, [key, values]);
  }
};
class RedisXClientStringCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Sets the string value of a key, ignoring its type. The key is created if it doesn't exist.
   *
   * Complexity: O(1)
   * @async
   * @param {string} key Key name.
   * @param {RedisXCommandArgument} value Value to set.
   * @param {StringSetOptions} [options] -
   * @returns {Promise<"OK" | null>} "OK" if SET was executed correctly, otherwise null.
   */
  set(key, value, options) {
    return this.#parent._useGenerator(set2, [key, value, options]);
  }
  /**
   * Returns the string value of a key.
   *
   * Complexity: O(1)
   * @async
   * @param {string} key Key name.
   * @returns {Promise<string | null>} Value of the key or `null` when key does not exist.
   */
  get(key) {
    return this.#parent._useGenerator(get, [key]);
  }
};

// src/generated/transaction-commands.js
class RedisXClientToolsTransactionCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Returns the server's liveliness response.
   *
   * Complexity: O(1)
   * @returns {RedisXTransaction} -
   */
  ping() {
    return this.#parent._useGenerator(ping);
  }
};
class RedisXClientHashTransactionCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Sets the value of a field in a hash.
   *
   * Complexity: O(1)
   * @param {string} key Key name.
   * @param {string} field Field name.
   * @param {RedisXCommandArgument} value Field value.
   * @returns {RedisXTransaction} -
   */
  set(key, field, value) {
    return this.#parent._useGenerator(set, [key, field, value]);
  }
  /**
   * Sets the specified fields to their respective values in the hash stored at key.
   *
   * Complexity: O(1) for each field/value pair added.
   * @param {string} key Key name.
   * @param {{ [key: string]: any } | Map<string, any>} values Field-value pairs.
   * @returns {RedisXTransaction} -
   */
  append(key, values) {
    return this.#parent._useGenerator(append, [key, values]);
  }
  /**
   * Returns all fields and values of the hash stored at key.
   *
   * Complexity: O(N) where N is the size of the hash.
   * @param {string} key Key name.
   * @returns {RedisXTransaction} -
   */
  getAll(key) {
    return this.#parent._useGenerator(getAll, [key]);
  }
};
class RedisXClientKeyTransactionCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Removes the specified keys. A key is ignored if it does not exist.
   *
   * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   * @param {...string} keys Key name.
   * @returns {RedisXTransaction} -
   */
  delete_(...keys) {
    return this.#parent._useGenerator(delete_, [...keys]);
  }
  /**
   * Removes the specified keys. A key is ignored if it does not exist.
   *
   * Keyword `delete` is reserved in JavaScript, so you can use `delete_` or `remove` instead.
   *
   * Complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash. Removing a single key that holds a string value is O(1).
   * @param {...string} keys Key name.
   * @returns {RedisXTransaction} -
   */
  remove(...keys) {
    return this.#parent._useGenerator(remove, [...keys]);
  }
  /**
   * Set a timeout on key. After the timeout has expired, the key will automatically be deleted.
   *
   * Complexity: O(1)
   * @param {string} key Key name.
   * @param {number} timeout Timeout in seconds.
   * @returns {RedisXTransaction} -
   */
  expire(key, timeout) {
    return this.#parent._useGenerator(expire, [key, timeout]);
  }
};
class RedisXClientListTransactionCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Insert all the specified values at the head of the list stored at key.
   *
   * Unlike LPUSH command, multiple elements are inserted as bulk, like Array.prototype.unshift() method.
   *
   * Complexity: O(1) for each element added, so O(N) to add N elements when the command is called with multiple arguments.
   * @param {string} key Key name.
   * @param {RedisXCommandArgument[]} values Values to insert.
   * @returns {RedisXTransaction} -
   */
  unshift(key, values) {
    return this.#parent._useGenerator(unshift, [key, values]);
  }
};
class RedisXClientStringTransactionCommands {
  /**
   * @type {import("../main").RedisXClient}
   */
  #parent;
  constructor(parent) {
    this.#parent = parent;
  }
  /**
   */
  /**
   * Sets the string value of a key, ignoring its type. The key is created if it doesn't exist.
   *
   * Complexity: O(1)
   * @param {string} key Key name.
   * @param {RedisXCommandArgument} value Value to set.
   * @param {StringSetOptions} [options] -
   * @returns {RedisXTransaction} -
   */
  set(key, value, options) {
    return this.#parent._useGenerator(set2, [key, value, options]);
  }
  /**
   * Returns the string value of a key.
   *
   * Complexity: O(1)
   * @param {string} key Key name.
   * @returns {RedisXTransaction} -
   */
  get(key) {
    return this.#parent._useGenerator(get, [key]);
  }
};

// src/utils/arguments.js
function updateArguments(command, args) {
  for (const [index, argument] of args.entries()) {
    if (typeof argument === "number" && Number.isNaN(argument) !== true) {
      args[index] = String(argument);
    } else if (Buffer.isBuffer(argument)) {
      args[index] = argument;
    } else if (argument instanceof ArrayBuffer) {
      args[index] = Buffer.from(argument);
    } else if (argument instanceof Int8Array || argument instanceof Uint8Array || argument instanceof Uint8ClampedArray || argument instanceof Int16Array || argument instanceof Uint16Array || argument instanceof Int32Array || argument instanceof Uint32Array || argument instanceof Float32Array || argument instanceof Float64Array || argument instanceof BigInt64Array) {
      args[index] = Buffer.from(argument.buffer);
    } else if (typeof argument !== "string") {
      const error = new TypeError(
        `Argument #${index + 1} of command "${command}" must be a string, non-NaN number, ArrayBuffer, TypedArray or NodeJS Buffer.`
      );
      error.command = command;
      error.arguments = args;
      throw error;
    }
  }
  return args;
}

// src/transaction.js
class RedisXTransaction {
  #multi;
  #generators = [];
  #queue_length = 0;
  #custom_names = null;
  /**
   * @param {RedisXClient} redisXClient -
   */
  constructor(redisXClient) {
    this.#multi = redisXClient._redisClient.MULTI();
    this.hash = new RedisXClientHashTransactionCommands(this);
    this.key = new RedisXClientKeyTransactionCommands(this);
    this.list = new RedisXClientListTransactionCommands(this);
    this.string = new RedisXClientStringTransactionCommands(this);
    this.tools = new RedisXClientToolsTransactionCommands(this);
  }
  /**
   * Number of commands added to the transaction.
   * @type {number}
   */
  get queue_length() {
    return this.#queue_length;
  }
  /**
   * Adds command to the transaction.
   * @param {string} command Command name.
   * @param {...RedisXCommandArgument} args Command arguments.
   * @returns {RedisXTransaction} -
   */
  addCommand(command, ...args) {
    updateArguments(command, args);
    this.#multi.addCommand([
      command,
      ...args
    ]);
    this.#queue_length++;
    return this;
  }
  /**
   * Adds a command to the transaction using internal generator function.
   * @protected
   * @param {Function} fn Generator function.
   * @param {any[]} args Arguments for the generator function.
   * @returns {RedisXTransaction} -
   */
  _useGenerator(fn, args) {
    const generator = fn(...args);
    this.#generators[this.#queue_length] = generator;
    const redis_args = generator.next().value;
    return this.addCommand(
      ...redis_args
    );
  }
  /**
   * @type {RedisXClientHashTransactionCommands}
   */
  hash;
  /**
   * @type {RedisXClientKeyTransactionCommands}
   */
  key;
  /**
   * @type {RedisXClientListTransactionCommands}
   */
  list;
  /**
   * @type {RedisXClientStringTransactionCommands}
   */
  string;
  /**
   * @type {RedisXClientToolsTransactionCommands}
   */
  tools;
  /**
   * Sets custom name for the command result.
   * @param {*} field_name -
   * @returns {RedisXTransaction} RedisClientTransaction instance.
   */
  as(field_name) {
    this.#custom_names ??= {};
    this.#custom_names[field_name] = this.#queue_length - 1;
    return this;
  }
  #sent = false;
  /**
   * Sends transaction to the Redis server and returns response.
   * @async
   * @returns {any[]} Array of responses from the Redis server. If named results are used, this keys will be added to the array.
   */
  async execute() {
    if (this.#sent) {
      throw new Error("Transaction already sent");
    }
    this.#sent = true;
    if (this.#queue_length === 0) {
      return [];
    }
    const result = await this.#multi.EXEC();
    for (const [index, generator] of this.#generators.entries()) {
      result[index] = generator.next(
        result[index]
      ).value;
    }
    const names = this.#custom_names;
    if (names) {
      for (const key of Object.keys(names)) {
        const index = names[key];
        result[key] = result[index];
      }
    }
    return result;
  }
};

// src/main.js
class RedisXClient {
  /**
   * @protected
   */
  _redisClient;
  /**
   * @param {any} redisClient Client created from "redis" package.
   */
  constructor(redisClient) {
    this._redisClient = redisClient;
    this.hash = new RedisXClientHashCommands(this);
    this.key = new RedisXClientKeyCommands(this);
    this.list = new RedisXClientListCommands(this);
    this.string = new RedisXClientStringCommands(this);
    this.tools = new RedisXClientToolsCommands(this);
  }
  /**
   * Sends a command to the Redis server.
   * @param {string} command Command name.
   * @param {...RedisXCommandArgument} args Command arguments.
   * @returns {Promise<any>} Response from the Redis server.
   */
  async sendCommand(command, ...args) {
    updateArguments(command, args);
    const result = await this._redisClient.sendCommand([
      command,
      ...args
    ]);
    return result;
  }
  /**
   * Sends a command to the Redis server using internal generator function.
   * @protected
   * @param {Function} fn Generator function.
   * @param {any[]} args Arguments for the generator function.
   * @returns {Promise<any>} Response from the Redis server.
   */
  async _useGenerator(fn, args) {
    const generator = fn(...args);
    const redis_args = generator.next().value;
    const result_raw = await this.sendCommand(
      ...redis_args
    );
    return generator.next(result_raw).value;
  }
  /**
   * @type {RedisXClientHashCommands}
   */
  hash;
  /**
   * @type {RedisXClientKeyCommands}
   */
  key;
  /**
   * @type {RedisXClientListCommands}
   */
  list;
  /**
   * @type {RedisXClientStringCommands}
   */
  string;
  /**
   * @type {RedisXClientToolsCommands}
   */
  tools;
  /**
   * Creates a new transaction.
   * @returns {RedisXTransaction} -
   */
  createTransaction() {
    return new RedisXTransaction(this);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisXClient
});
/**
 * @preserve
 * @typedef StringSetOptions
 * @property {boolean} [existing] If `true`, SET will only succeed if the key already exists (`XX` argument). If `false`, SET will only succeed if the key does not already exist (`NX` argument).
 * @property {"keep" | StringSetOptionsExpire} [expire] -
 */
/**
 * @preserve
 * @typedef StringSetOptionsExpire
 * @property {number} [in] Set the specified expire time in seconds.
 * @property {number} [in_ms] Set the specified expire time in milliseconds.
 * @property {number} [at] Set the specified Unix timestamp in seconds.
 * @property {number} [at_ms] Set the specified Unix timestamp in milliseconds.
 */
/**
 * @preserve
 * @typedef {string | number | ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | import('buffer').Buffer} RedisXCommandArgument
 */
