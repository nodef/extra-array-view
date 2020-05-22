export type lengthFn = () => number;
export type getFn<T> = (i: number) => T;
export type setFn<T> = (i: number, v: T) => void;
