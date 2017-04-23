import {DI, Injectable} from "./dependency-injection";
export interface Resolver {
  get(di: DI): object;
}

export class SingletonResolver implements Resolver {
  private instance: object;

  constructor(private ctor: Injectable) {
  }

  get(di: DI) {
    return this.instance || (this.instance = di.invoke(this.ctor));
  }
}