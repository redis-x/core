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
  createClient: () => createClient
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
  async useCommand(command) {
    const result = await this.redisClient.sendCommand(command.args);
    if (command.replyTransform) {
      return command.replyTransform(result);
    }
    return result;
  }
  GET(key) {
    return this.useCommand(input(key));
  }
  SET(key, value, options) {
    return this.useCommand(input2(key, value, options));
  }
};

// dist/esm/main.js
function createClient(redisClient) {
  return new RedisXClient(redisClient);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createClient
});
