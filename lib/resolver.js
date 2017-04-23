System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SingletonResolver;
    return {
        setters: [],
        execute: function () {
            SingletonResolver = (function () {
                function SingletonResolver(ctor) {
                    this.ctor = ctor;
                }
                SingletonResolver.prototype.get = function (di) {
                    return this.instance || (this.instance = di.invoke(this.ctor));
                };
                return SingletonResolver;
            }());
            exports_1("SingletonResolver", SingletonResolver);
        }
    };
});
//# sourceMappingURL=resolver.js.map