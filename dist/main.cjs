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
  DECR: () => DECR,
  DECRBY: () => DECRBY,
  DEL: () => DEL,
  EXPIRE: () => EXPIRE,
  GET: () => GET,
  HDEL: () => HDEL,
  HGET: () => HGET,
  HGETALL: () => HGETALL,
  HLEN: () => HLEN,
  HMGET: () => HMGET,
  HSET: () => HSET,
  INCR: () => INCR,
  INCRBY: () => INCRBY,
  INCRBYFLOAT: () => INCRBYFLOAT,
  KEYS: () => KEYS,
  LPUSH: () => LPUSH,
  PEXPIRE: () => PEXPIRE,
  PTTL: () => PTTL,
  RedisXClient: () => RedisXClient,
  SET: () => SET,
  TTL: () => TTL,
  ZRANGE: () => ZRANGE,
  createClient: () => createClient,
  custom: () => custom,
  replyTransform: () => replyTransform2
});
module.exports = __toCommonJS(main_exports);

// dist/esm/transaction/command.js
var TransactionCommand = class {
  index;
  schema;
  constructor(index, schema) {
    this.index = index;
    this.schema = schema;
  }
};

// dist/esm/utils.js
function isPlainObject(value) {
  return typeof value === "object" && value !== null && Array.isArray(value) !== true && value.constructor === Object && Object.getPrototypeOf(value) === Object.prototype;
}
function dummyReplyTransform(result) {
  return result;
}
function stringBulkToObject(values) {
  const object = {};
  for (let index = 0; index < values.length; index += 2) {
    object[values[index]] = values[index + 1];
  }
  return object;
}

// dist/esm/types.js
function isSchema(value) {
  return isPlainObject(value) && value.kind === "#schema";
}

// dist/esm/transaction/proxy.js
function isStructure(value) {
  return isStructurePlain(value) || value instanceof Map;
}
function isStructurePlain(value) {
  return Array.isArray(value) || isPlainObject(value);
}
function createProxy(target, handler) {
  if (isStructurePlain(target)) {
    return createProxyPlain(target, handler);
  }
  if (target instanceof Map) {
    return createProxyMap(target, handler);
  }
  throw new TypeError("Invalid structure type.");
}
function createProxyPlain(target, handler) {
  for (const key of Reflect.ownKeys(target)) {
    const value_new = processValue(
      Reflect.get(target, key),
      void 0,
      handler
    );
    if (value_new) {
      Reflect.set(target, key, value_new);
    }
  }
  return new Proxy(target, {
    set(opTarget, prop, value, receiver) {
      return Reflect.set(
        opTarget,
        prop,
        processValue(value, Reflect.get(opTarget, prop), handler) ?? value,
        receiver
      );
    }
  });
}
function createProxyMap(target, handler) {
  for (const [key, value] of target.entries()) {
    const value_new = processValue(value, void 0, handler);
    if (value_new) {
      target.set(key, value_new);
    }
  }
  return new Proxy(target, {
    get(opTarget, prop, receiver) {
      if (prop === "set") {
        return function(key, value2) {
          return opTarget.set(
            key,
            processValue(value2, opTarget.get(prop), handler) ?? value2
          );
        };
      }
      const value = Reflect.get(opTarget, prop, receiver);
      if (typeof value === "function") {
        return value.bind(opTarget);
      }
      return value;
    }
  });
}
function processValue(value, value_old, handler) {
  if (value_old instanceof TransactionCommand) {
    throw new TypeError(
      "Do not delete commands already added to transaction. When you delete a command from transaction data, you might think that the command would not be executed, but this is not true. Because of this, doing so might lead to unexpected results."
    );
  }
  if (isSchema(value)) {
    return handler.schema(value);
  }
  if (isStructure(value)) {
    return createProxy(value, handler);
  }
}

// dist/esm/transaction/transform.js
function transformData(data, result) {
  const data_transformed = {};
  for (const key of Object.keys(data)) {
    const value = data[key];
    data_transformed[key] = transformDataElement(value, result);
  }
  return data_transformed;
}
function transformDataElement(element, result) {
  if (element === void 0) {
    return void 0;
  }
  if (element instanceof TransactionCommand) {
    return element.schema.replyTransform(result[element.index]);
  }
  if (Array.isArray(element)) {
    return element.map(
      (element_nested) => transformDataElement(element_nested, result)
    );
  }
  if (element instanceof Map) {
    return new Map(
      [...element.entries()].map(([key, element_nested]) => [
        key,
        transformDataElement(element_nested, result)
      ])
    );
  }
  if (isPlainObject(element)) {
    return Object.fromEntries(
      Object.entries(element).map(([key, element_nested]) => [
        key,
        transformDataElement(element_nested, result)
      ])
    );
  }
}

// dist/esm/transaction.js
var RedisXTransaction = class {
  redisClient;
  #transaction;
  #commands = [];
  data;
  constructor(redisClient, data) {
    this.redisClient = redisClient;
    this.#transaction = redisClient.MULTI();
    this.data = createProxy(data, {
      schema: (value) => this.add(value)
    });
  }
  add(...schemas) {
    for (const schema of schemas) {
      this.#transaction.addCommand(schema.args);
      this.#commands.push(
        new TransactionCommand(this.#commands.length, schema)
      );
    }
    if (schemas.length === 1) {
      return this.#commands.at(-1);
    }
  }
  /**
   * Gets the number of commands in the transaction.
   * @returns -
   */
  get queue_length() {
    return this.#commands.length;
  }
  /**
   * Send the transaction to the Redis server.
   * @returns Transaction result.
   */
  async execute() {
    const result = await this.#transaction.exec();
    return transformData(this.data, result);
  }
};

// dist/esm/client.js
var RedisXClient = class {
  #redisClient;
  constructor(redisClient) {
    this.#redisClient = redisClient;
  }
  async execute(...commands) {
    if (commands.length === 1) {
      if (commands[0]) {
        const [{ args, replyTransform: replyTransform4 }] = commands;
        const result = await this.#redisClient.sendCommand(args);
        if (typeof replyTransform4 === "function") {
          return replyTransform4(result);
        }
        return result;
      }
    } else {
      const transaction = this.#redisClient.multi();
      const transforms = [];
      for (const command of commands) {
        transaction.addCommand(command.args);
        transforms.push(command.replyTransform);
      }
      const results = await transaction.exec();
      for (const [index, result] of results.entries()) {
        const transform = transforms[index];
        if (typeof transform === "function") {
          results[index] = transform(result);
        }
      }
      return results;
    }
  }
  /**
   * Creates a transaction with structured data.
   * @param data Transaction data. Do not pass any commands here, add them later instead.
   * @returns Transaction object.
   */
  createTransaction(data) {
    return new RedisXTransaction(this.#redisClient, data);
  }
};

// dist/esm/commands/hash/hdel.js
function HDEL(key, ...fields) {
  return {
    kind: "#schema",
    args: ["HDEL", key, ...fields.map(String)],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/hash/hget.js
function HGET(key, field) {
  return {
    kind: "#schema",
    args: ["HGET", key, field],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/hash/hgetall.js
function HGETALL(key) {
  return {
    kind: "#schema",
    args: ["HGETALL", key],
    replyTransform
  };
}
function replyTransform(result) {
  return stringBulkToObject(result);
}

// dist/esm/commands/hash/hlen.js
function HLEN(key) {
  return {
    kind: "#schema",
    args: ["HLEN", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/hash/hmget.js
function HMGET(key, ...fields) {
  const fields_string = fields.map(String);
  return {
    kind: "#schema",
    args: ["HMGET", key, ...fields_string],
    replyTransform: replyTransform2.bind(fields_string)
  };
}
function replyTransform2(result) {
  const output = {};
  for (const [index, field] of this.entries()) {
    const value = result[index];
    if (value !== void 0) {
      output[field] = value;
    }
  }
  return output;
}

// dist/esm/commands/hash/hset.js
function HSET(key, arg1, arg2) {
  const pairs = [];
  if (typeof arg1 === "string") {
    pairs.push(arg1, String(arg2));
  } else {
    for (const [field, value] of Object.entries(arg1)) {
      pairs.push(field, String(value));
    }
  }
  return {
    kind: "#schema",
    args: ["HSET", key, ...pairs],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/keyspace/del.js
function DEL(...keys) {
  return {
    kind: "#schema",
    args: ["DEL", ...keys],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/keyspace/expire.js
function EXPIRE(key, seconds, options) {
  const args_options = [];
  if (options) {
    if (options.NX) {
      args_options.push("NX");
    }
    if (options.XX) {
      args_options.push("XX");
    }
    if (options.GT) {
      args_options.push("GT");
    }
    if (options.LT) {
      args_options.push("LT");
    }
  }
  return {
    kind: "#schema",
    args: ["EXPIRE", key, String(seconds), ...args_options],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/keyspace/keys.js
function KEYS(pattern) {
  return {
    kind: "#schema",
    args: ["KEYS", pattern],
    replyTransform: replyTransform3
  };
}
function replyTransform3(result) {
  return new Set(result);
}

// dist/esm/commands/keyspace/pexpire.js
function PEXPIRE(key, seconds, options) {
  const args_options = [];
  if (options) {
    if (options.NX) {
      args_options.push("NX");
    }
    if (options.XX) {
      args_options.push("XX");
    }
    if (options.GT) {
      args_options.push("GT");
    }
    if (options.LT) {
      args_options.push("LT");
    }
  }
  return {
    kind: "#schema",
    args: ["PEXPIRE", key, String(seconds), ...args_options],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/keyspace/pttl.js
function PTTL(key) {
  return {
    kind: "#schema",
    args: ["PTTL", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/keyspace/ttl.js
function TTL(key) {
  return {
    kind: "#schema",
    args: ["TTL", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/list/lpush.js
function LPUSH(key, ...elements) {
  return {
    kind: "#schema",
    args: ["LPUSH", key, ...elements.map(String)],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/decr.js
function DECR(key) {
  return {
    kind: "#schema",
    args: ["DECR", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/decrby.js
function DECRBY(key, increment) {
  return {
    kind: "#schema",
    args: ["DECRBY", key, String(increment)],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/get.js
function GET(key) {
  return {
    kind: "#schema",
    args: ["GET", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/incr.js
function INCR(key) {
  return {
    kind: "#schema",
    args: ["INCR", key],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/incrby.js
function INCRBY(key, increment) {
  return {
    kind: "#schema",
    args: ["INCRBY", key, String(increment)],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/incrbyfloat.js
function INCRBYFLOAT(key, increment) {
  return {
    kind: "#schema",
    args: ["INCRBYFLOAT", key, String(increment)],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/string/set.js
function SET(key, value, options) {
  const args_options = [];
  if (options) {
    if (options.NX) {
      args_options.push("NX");
    }
    if (options.XX) {
      args_options.push("XX");
    }
    if (options.EX) {
      args_options.push("EX", String(options.EX));
    }
    if (options.PX) {
      args_options.push("PX", String(options.PX));
    }
    if (options.EXAT) {
      args_options.push("EXAT", String(options.EXAT));
    }
    if (options.PXAT) {
      args_options.push("PXAT", String(options.PXAT));
    }
    if (options.KEEPTTL) {
      args_options.push("KEEPTTL");
    }
    if (options.GET) {
      args_options.push("GET");
    }
  }
  return {
    kind: "#schema",
    args: ["SET", key, value, ...args_options],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/commands/zset/zrange.js
function ZRANGE(key, start, stop, options) {
  const args_options = [];
  if (options) {
    if (options.REV) {
      args_options.push("REV");
    }
    if (options.BYSCORE) {
      args_options.push("BYSCORE");
    }
    if (options.BYLEX) {
      args_options.push("BYLEX");
    }
    if (options.LIMIT) {
      args_options.push(
        "LIMIT",
        String(options.LIMIT[0]),
        String(options.LIMIT[1])
      );
    }
    if (options.WITHSCORES) {
      args_options.push("WITHSCORES");
    }
  }
  return {
    kind: "#schema",
    args: ["ZRANGE", key, String(start), String(stop), ...args_options],
    replyTransform: options?.WITHSCORES ? replyWithscoresTransform : dummyReplyTransform
  };
}
function replyWithscoresTransform(value) {
  const result_withscores = [];
  for (let index = 0; index < value.length; index += 2) {
    result_withscores.push({
      value: value[index],
      score: Number.parseFloat(value[index + 1])
    });
  }
  return result_withscores;
}

// dist/esm/commands.js
function custom(command, ...args) {
  return {
    kind: "#schema",
    args: [
      command,
      ...args.map(
        (value) => typeof value === "string" ? value : String(value)
      )
    ],
    replyTransform: dummyReplyTransform
  };
}

// dist/esm/main.js
function createClient(redisClient) {
  return new RedisXClient(redisClient);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DECR,
  DECRBY,
  DEL,
  EXPIRE,
  GET,
  HDEL,
  HGET,
  HGETALL,
  HLEN,
  HMGET,
  HSET,
  INCR,
  INCRBY,
  INCRBYFLOAT,
  KEYS,
  LPUSH,
  PEXPIRE,
  PTTL,
  RedisXClient,
  SET,
  TTL,
  ZRANGE,
  createClient,
  custom,
  replyTransform
});
