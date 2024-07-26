
// export type InputReturnType<T extends (string | void) = void> = [ string[], T? ];
// export type CommandModule = {
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	input: (...args: any[]) => InputReturnType<any>,
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	output?: (result: any, modificator?: any) => unknown,
// }

export interface BaseSchema {
	args: string[];
	replyTransform: (result: unknown) => unknown;
}
export type InferReply<T extends BaseSchema> = T['replyTransform'] extends Required<BaseSchema>['replyTransform'] ? ReturnType<T['replyTransform']> : never;

export type Mutable<T> = {
	-readonly [key in keyof T]: T[key];
}

export type ExactlyOneFrom<T, K extends keyof T = keyof T> = K extends keyof T ? { [P in K]: T[P] } & Partial<Record<Exclude<keyof T, K>, never>> : never;
export type OneOrNoneFrom<T, K extends keyof T = keyof T> = ExactlyOneFrom<T, K> | Partial<Record<keyof T, never>>;

export type TheseFieldsOrNone<T> = T | Partial<Record<keyof T, never>>;
