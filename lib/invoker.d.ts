import { DI, Injectable } from "./dependency-injection";
export interface Invoker {
    invoke(di: DI): object;
}
export declare class InvokerFactory {
    static instance: InvokerFactory;
    create(ctor: Injectable): Invoker;
}
