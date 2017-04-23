System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function buildInjectDependencies(ctor) {
        var dependencies = [];
        while (typeof ctor === "function") {
            if (ctor.hasOwnProperty("_inject")) {
                dependencies.push.apply(dependencies, getDependencies(ctor._inject));
            }
            ctor = Object.getPrototypeOf(ctor);
        }
        return dependencies;
    }
    function getDependencies(inject) {
        return typeof Array.isArray(inject) ? inject : inject();
    }
    var InvokerFactory, InvokerImpl;
    return {
        setters: [],
        execute: function () {
            InvokerFactory = (function () {
                function InvokerFactory() {
                }
                InvokerFactory.prototype.create = function (ctor) {
                    return new InvokerImpl(ctor, buildInjectDependencies(ctor));
                };
                return InvokerFactory;
            }());
            InvokerFactory.instance = new InvokerFactory();
            exports_1("InvokerFactory", InvokerFactory);
            InvokerImpl = (function () {
                function InvokerImpl(ctor, injects) {
                    this.ctor = ctor;
                    this.injects = injects;
                }
                InvokerImpl.prototype.invoke = function (di) {
                    var i = this.injects;
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
                };
                InvokerImpl.prototype.dynamic = function (di) {
                    var args = [];
                    for (var _i = 0, _a = this.injects; _i < _a.length; _i++) {
                        var arg = _a[_i];
                        args.push(di.get(arg));
                    }
                    return Reflect.construct(this.ctor, args);
                };
                return InvokerImpl;
            }());
        }
    };
});
//# sourceMappingURL=invoker.js.map