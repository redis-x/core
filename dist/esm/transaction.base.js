export class RedisXTransactionBase {
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
        this.redisTransaction.addCommand(command_arguments.map((value) => typeof value === 'string' ? value : String(value)));
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
            throw new Error('To use as() method, you must add a command first.');
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
    _addModuleCommand(module, args) {
        const [command_arguments, modificator] = module.input(...args);
        this.redisTransaction.addCommand(command_arguments);
        this.#commands.push({
            output: module.output,
            modificator,
        });
        return this;
    }
}
