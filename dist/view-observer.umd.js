!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):e.viewObserver=r()}(this,function(){"use strict";function e(e){return Array.isArray(e)?e:[e]}var r=function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")},n=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}();return function(){function t(e){var n=this;return r(this,t),this.intersectionObserver=new IntersectionObserver(function(e,r){e.forEach(function(e){var t=e.target;if(n.subscribers.has(t)){var i=n.subscribers.get(t);e.isIntersecting&&void 0!==i.enterCallback?(i.enterCallback(e),i.once&&(r.unobserve(t),n.subscribers.delete(i))):void 0!==i.leaveCallback&&i.leaveCallback(e)}})},e),this.subscribers=new Map,this}return n(t,[{key:"observe",value:function(r){var n=this;return e(r).forEach(function(e){return n.intersectionObserver.observe(e)}),this}},{key:"unobserve",value:function(r){var n=this;return e(r).forEach(function(e){return n.intersectionObserver.unobserve(e)}),this}},{key:"subscribe",value:function(r,n,t){var i=this;return e(r).forEach(function(e){return i.subscribers.set(e,{once:!1,enterCallback:n,leaveCallback:t})}),this}},{key:"subscribeOnce",value:function(r,n){var t=this;return e(r).forEach(function(e){return t.subscribers.set(e,{once:!0,enterCallback:n})}),this}},{key:"disconnect",value:function(){this.intersectionObserver.disconnect()}},{key:"takeRecords",value:function(){return this.intersectionObserver.takeRecords()}}]),t}()});
