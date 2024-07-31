import { type BaseSchema } from "../types";
import { TransactionCommand } from "./command";
import { TransactionData } from "./types";
type StructurePlain = BaseSchema[] | Record<string, BaseSchema | undefined>;
type StructureMap = Map<string | symbol, BaseSchema | undefined>;
type Structure = TransactionData | StructurePlain | StructureMap;
type Handler = {
	schema: (value: BaseSchema) => TransactionCommand<BaseSchema>;
};
/**
 * Creates a proxy object.
 * @param target Target object.
 * @param handler Handler object.
 * @param handler.schema Function to handle schema objects.
 */
export declare function createProxy<const T extends Structure>(
	target: T,
	handler: Handler,
): T;
export {};
