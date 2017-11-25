"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invoker_1 = require("./invoker");
var resolver_1 = require("./resolver");
var _instance = null;
var DI = (function () {
    function DI() {
        this._resolvers = new Map();
        this._invokers = new Map();
    }
    // noinspection JSUnusedGlobalSymbols
    DI.instance = function () {
        return _instance;
    };
    DI.resolve = function (ctor) {
        return _instance.get(ctor);
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
DI._instance = new DI();
exports.DI = DI;
//# sourceMappingURL=di.js.map