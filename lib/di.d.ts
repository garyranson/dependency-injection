export declare type InjectCallback = () => Injectable[];
export interface Injectable {
    new (...args: any[]): any;
    _inject?: Injectable[] | InjectCallback;
}
export declare class DI {
    static _instance: DI;
    static instance(): DI;
    static resolve<T extends Injectable>(ctor: Injectable): T;
    private _resolvers;
    private _invokers;
    get(ctor: Injectable): object;
    invoke(ctor: Injectable): object;
    private _createResolver(ctor);
    private _createInvoker(ctor);
}
