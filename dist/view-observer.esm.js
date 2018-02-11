function unflatten(array) {
  return Array.isArray(array) ? array : [array];
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _class = function () {
  function _class(options) {
    var _this = this;

    classCallCheck(this, _class);

    this.intersectionObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var node = entry.target;

        if (_this.subscribers.has(node)) {
          var subscriber = _this.subscribers.get(node);
          subscriber.callback(entry);

          if (subscriber.once) {
            observer.unobserve(node);
            _this.subscribers.delete(subscriber);
          }
        }
      });
    }, options);

    this.subscribers = new Map();

    return this;
  }

  createClass(_class, [{
    key: "observe",
    value: function observe(nodes) {
      var _this2 = this;

      unflatten(nodes).forEach(function (node) {
        return _this2.intersectionObserver.observe(node);
      });

      return this;
    }
  }, {
    key: "unobserve",
    value: function unobserve(nodes) {
      var _this3 = this;

      unflatten(nodes).forEach(function (node) {
        return _this3.intersectionObserver.unobserve(node);
      });

      return this;
    }
  }, {
    key: "subscribe",
    value: function subscribe(nodes, callback) {
      var _this4 = this;

      unflatten(nodes).forEach(function (node) {
        return _this4.subscribers.set(node, {
          once: false,
          callback: callback
        });
      });

      return this;
    }
  }, {
    key: "subscribeOnce",
    value: function subscribeOnce(nodes, callback) {
      var _this5 = this;

      unflatten(nodes).forEach(function (node) {
        return _this5.subscribers.set(node, {
          once: true,
          callback: callback
        });
      });

      return this;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.intersectionObserver.disconnect();
    }
  }, {
    key: "takeRecords",
    value: function takeRecords() {
      return this.intersectionObserver.takeRecords();
    }
  }]);
  return _class;
}();

export default _class;
