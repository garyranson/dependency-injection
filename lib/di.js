System.register(["./invoker", "./resolver"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var invoker_1, resolver_1, _instance, DI;
    return {
        setters: [
            function (invoker_1_1) {
                invoker_1 = invoker_1_1;
            },
            function (resolver_1_1) {
                resolver_1 = resolver_1_1;
            }
        ],
        execute: function () {
            _instance = null;
            DI = (function () {
                function DI() {
                    this._resolvers = new Map();
                    this._invokers = new Map();
                }
                DI.instance = function () {
                    return _instance || (_instance = new DI());
                };
                DI.instance2 = function () {
                    return _instance || (_instance = new DI());
                };
                DI.prototype.get = function (ctor) {
                    return ((this._resolvers.get(ctor) || this._createResolver(ctor)).get(this));
                };
                DI.prototype.invoke = function (ctor) {
                    return (this._invokers.get(ctor) || this._createInvoker(ctor)).invoke(this);
                };
                DI.prototype._createResolver = function (ctor) {
                    var resolver = new resolver_1.SingletonResolver(ctor);
                    this._resolvers.set(ctor, resolver);
                    return resolver;
                };
                DI.prototype._createInvoker = function (ctor) {
                    var invoker = invoker_1.InvokerFactory.instance.create(ctor);
                    this._invokers.set(ctor, invoker);
                    return invoker;
                };
                return DI;
            }());
            exports_1("DI", DI);
        }
    };
});
//# sourceMappingURL=di.js.map