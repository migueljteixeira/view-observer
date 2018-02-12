import unflatten from "./utils";

export default class {
  constructor(options) {
    this.intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
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
      },
      options
    );

    this.subscribers = new Map();

    return this;
  }

  /**
   *
   *
   * @param {any} nodes
   * @returns
   */
  observe(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.observe(node));

    return this;
  }

  /**
   *
   *
   * @param {any} nodes
   * @returns
   */
  unobserve(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.unobserve(node));

    return this;
  }

  /**
   *
   *
   * @param {any} nodes
   * @param {any} enterCallback
   * @param {any} leaveCallback
   * @returns
   */
  subscribe(nodes, enterCallback, leaveCallback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, {
        once: false,
        enterCallback,
        leaveCallback
      })
    );

    return this;
  }

  /**
   *
   *
   * @param {any} nodes
   * @param {any} enterCallback
   * @returns
   */
  subscribeOnce(nodes, enterCallback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, {
        once: true,
        enterCallback
      })
    );

    return this;
  }

  /**
   *
   *
   */
  disconnect() {
    this.intersectionObserver.disconnect();
  }

  /**
   *
   *
   * @returns
   */
  takeRecords() {
    return this.intersectionObserver.takeRecords();
  }
}
