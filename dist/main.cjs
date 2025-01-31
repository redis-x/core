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

// dist/esm/commands/string/get.js
function input(key) {
  return {
    kind: "#schema",
    args: [
      "GET",
      key
    ]
  };
}

// dist/esm/commands/string/set.js
function input2(key, value, options) {
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
    args: [
      "SET",
      key,
      String(value),
      ...args_options
    ]
  };
}

// dist/esm/commands/generic/del.js
function input3(...keys) {
  return {
    kind: "#schema",
    args: [
      "DEL",
      ...keys
    ]
  };
}

// dist/esm/commands/scripting/eval.js
function input4(script, keys, args) {
  const command_args = [
    "EVAL",
    script,
    String(keys.length),
    ...keys.map(String)
  ];
  if (args) {
    command_args.push(...args.map(String));
  }
  return {
    kind: "#schema",
    args: command_args
  };
}

// dist/esm/client.js
var RedisXClient = class {
  redisClient;
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(redisClient) {
    this.redisClient = redisClient;
  }
  async sendCommand(command, ...args) {
    return await this.redisClient.sendCommand([
      command,
      ...args.map(String)
    ]);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async useCommand(command) {
    const result = await this.redisClient.sendCommand(command.args);
    if (command.replyTransform) {
      return command.replyTransform(result);
    }
    return result;
  }
  // MARK: commands
  /**
   * Get the value of key.
   *
   * If the key does not exist `null` is returned.
   *
   * An error is returned if the value stored at key is not a string, because GET only handles string values.
   * - Available since: 1.0.0.
   * - Time complexity: O(1).
   * @param key Key to get.
   * @returns The value of key, or `null` when key does not exist.
   */
  GET(key) {
    return this.useCommand(input(key));
  }
  SET(key, value, options) {
    return this.useCommand(input2(key, value, options));
  }
  /**
   * Removes the specified keys.
   *
   * A key is ignored if it does not exist.
   * - Available since: 1.0.0.
   * - Time complexity: O(N) where N is the number of keys that will be removed. When a key to remove holds a value other than a string, the individual complexity for this key is O(M) where M is the number of elements in the list, set, sorted set or hash.
   * @param keys Keys to delete.
   * @returns The number of keys that were removed.
   */
  DEL(...keys) {
    return this.useCommand(input3(...keys));
  }
  /**
   * Invoke the execution of a server-side Lua script.
   * - Available since: 2.6.0.
   * - Time complexity: Depends on the script that is executed.
   * @param script Script's source code.
   * @param keys Keys accessed by the script.
   * @param args Arguments passed to the script.
   * @returns Value returned by the script.
   */
  EVAL(script, keys, args) {
    return this.useCommand(input4(script, keys, args));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisXClient
});
