"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonResolver = (function () {
    function SingletonResolver(ctor) {
        this.ctor = ctor;
    }
    SingletonResolver.prototype.get = function (di) {
        return this.instance || (this.instance = di.invoke(this.ctor));
    };
    return SingletonResolver;
}());
exports.SingletonResolver = SingletonResolver;
//# sourceMappingURL=resolver.js.map