
export type CommandModule = {
	input: (...args: any[]) => [ string[], any? ],
	output?: (result: any, modificator?: any) => any,
}

export type ExactlyOneFrom<T, K extends keyof T = keyof T> = K extends keyof T ? { [P in K]: T[P] } & Partial<Record<Exclude<keyof T, K>, never>> : never;
export type OneOrNoneFrom<T, K extends keyof T = keyof T> = ExactlyOneFrom<T, K> | Partial<Record<keyof T, never>>;

export type TheseFieldsOrNone<T> = T | Partial<Record<keyof T, never>>;

export type InputReturnType<T extends (string | void) = void> = [ string[], T? ];
