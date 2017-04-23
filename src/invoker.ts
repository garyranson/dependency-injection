import {DI, Injectable, InjectCallback} from "./dependency-injection";

export interface Invoker {
  invoke(di: DI): object;
}

export class InvokerFactory {
  static instance: InvokerFactory = new InvokerFactory();

  create(ctor: Injectable): Invoker {
    return new InvokerImpl(ctor, buildInjectDependencies(ctor));
  }
}

class InvokerImpl implements Invoker {
  constructor(private ctor: Injectable, private injects: Injectable[]) {
  }

  invoke(di: DI): object {
    const i = this.injects;
    switch (i.length) {
      case 0:
        return new this.ctor();
      case 1:
        return new this.ctor(di.get(i[0]));
      case 2:
        return new this.ctor(di.get(i[0]), di.get(i[1]));
      case 3:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]));
      case 4:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]), di.get(i[3]));
      case 5:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]), di.get(i[3]), di.get(i[4]));
      case 6:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]), di.get(i[3]), di.get(i[4]), di.get(i[5]));
      case 7:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]), di.get(i[3]), di.get(i[4]), di.get(i[5]), di.get(i[6]));
      case 8:
        return new this.ctor(di.get(i[0]), di.get(i[1]), di.get(i[2]), di.get(i[3]), di.get(i[4]), di.get(i[5]), di.get(i[6]), di.get(i[7]));
      default:
        return this.dynamic(di);
    }
  }

  dynamic(di: DI): object {
    const args = [];
    for (let arg of this.injects) {
      args.push(di.get(arg));
    }
    return Reflect.construct(this.ctor, args);
  }
}


function buildInjectDependencies(ctor: Injectable): Injectable[] {
  let dependencies = [];
  while (typeof ctor === "function") {
    if (ctor.hasOwnProperty("_inject")) {
      dependencies.push(...getDependencies(ctor._inject));
    }
    ctor = Object.getPrototypeOf(ctor);
  }
  return dependencies;
}

function getDependencies(inject: Injectable[] | InjectCallback): Injectable[] {
  return typeof Array.isArray(inject) ? <Injectable[]>inject : (<InjectCallback>inject)();
}