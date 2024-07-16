export type CommandModule = {
    input: (...args: any[]) => [string[], any?];
    output?: (result: any, modificator?: any) => any;
};
export type OnlyOneFrom<T, K extends keyof T = keyof T> = K extends keyof T ? {
    [P in K]?: T[P];
} & Partial<Record<Exclude<keyof T, K>, never>> : never;
export type InputReturnType<T extends (string | void) = void> = [string[], T?];
