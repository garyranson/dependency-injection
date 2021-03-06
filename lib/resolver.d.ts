import { DI, Injectable } from "./di";
export interface Resolver {
    get(di: DI): object;
}
export declare class SingletonResolver implements Resolver {
    private ctor;
    private instance;
    constructor(ctor: Injectable);
    get(di: DI): object;
}
