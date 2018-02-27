import unflatten from "./utils";

class ViewObserver {
  constructor(options) {
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const node = entry.target;

        // If there are no subscribers, bail
        if (!this.subscribers.has(node)) return;

        const subscriber = this.subscribers.get(node);
        if (entry.isIntersecting && subscriber.enterCallback !== undefined) {
          subscriber.enterCallback(entry);

          if (subscriber.once) {
            observer.unobserve(node);
            this.subscribers.delete(subscriber);
          }
        } else if (subscriber.leaveCallback !== undefined) {
          subscriber.leaveCallback(entry);
        }
      });
    }, options);

    this.subscribers = new Map();

    return this;
  }

  /**
   * Adds an element (or a collection of elements) to the set of target elements
   * being watched by the IntersectionObserver
   *
   * @param {String|Array} nodes
   * @returns
   */
  observe(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.observe(node));

    return this;
  }

  /**
   * Stops observing the specified element (or a collection of elements)
   *
   * @param {String|Array} nodes
   * @returns
   */
  unobserve(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.unobserve(node));

    return this;
  }

  /**
   * Subscribes for changes in the observed elements.
   *
   * @param {String|Array} nodes
   * @param {Function} enterCallback
   * @param {Function} leaveCallback
   * @returns
   */
  subscribe(nodes, enterCallback, leaveCallback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, { once: false, enterCallback, leaveCallback })
    );

    return this;
  }

  /**
   * Subscribes for changes in the observed elements.
   *
   * @param {String|Array} nodes
   * @param {Function} enterCallback
   * @returns
   */
  subscribeOnce(nodes, enterCallback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, { once: true, enterCallback })
    );

    return this;
  }

  /**
   * Stops watching all of target elements for visibility changes.
   */
  disconnect() {
    this.intersectionObserver.disconnect();
  }

  /**
   * Returns an array of IntersectionObserverEntry objects, one for each targeted element
   * which has experienced an intersection change since the last time the intersections were checked
   */
  takeRecords() {
    return this.intersectionObserver.takeRecords();
  }
}

export default () => new ViewObserver();
