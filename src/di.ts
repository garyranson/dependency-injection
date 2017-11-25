import {Invoker, InvokerFactory} from "./invoker";
import {Resolver, SingletonResolver} from "./resolver";

export type InjectCallback = () => Injectable[];

export interface Injectable {
  new(...args): any;
  _inject?: Injectable[] | InjectCallback;
}

let _instance: DI = null;

export class DI {
  static _instance: DI = new DI();
  // noinspection JSUnusedGlobalSymbols
  static instance() {
    return _instance;
  }

  static resolve<T extends Injectable>(ctor: Injectable): T {
    return <T> _instance.get(ctor);
  }

  private _resolvers = new Map<Injectable, Resolver>();
  private _invokers  = new Map<Injectable, Invoker>();

  get(ctor: Injectable): object {
    return ((this._resolvers.get(ctor) || this._createResolver(ctor)).get(this));
  }

  invoke(ctor: Injectable): object {
    return (this._invokers.get(ctor) || this._createInvoker(ctor)).invoke(this);
  }

  private _createResolver(ctor: Injectable): Resolver {
    let resolver = new SingletonResolver(ctor);
    this._resolvers.set(ctor, resolver);
    return resolver;
  }

  private _createInvoker(ctor: Injectable): Invoker {
    const invoker = InvokerFactory.instance.create(ctor);
    this._invokers.set(ctor, invoker);
    return invoker;
  }
}