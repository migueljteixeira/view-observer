import unflatten from "./utils";

export default class {
  constructor(options) {
    this.intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const node = entry.target;

          if (this.subscribers.has(node)) {
            const subscriber = this.subscribers.get(node);
            subscriber.callback(entry);

            if (subscriber.once) {
              observer.unobserve(node);
              this.subscribers.delete(subscriber);
            }
          }
        });
      },
      options
    );

    this.subscribers = new Map();

    return this;
  }

  observe(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.observe(node));

    return this;
  }

  unobserve(nodes) {
    unflatten(nodes).forEach(node => this.intersectionObserver.unobserve(node));

    return this;
  }

  subscribe(nodes, callback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, {
        once: false,
        callback
      })
    );

    return this;
  }

  subscribeOnce(nodes, callback) {
    unflatten(nodes).forEach(node =>
      this.subscribers.set(node, {
        once: true,
        callback
      })
    );

    return this;
  }

  disconnect() {
    this.intersectionObserver.disconnect();
  }

  takeRecords() {
    return this.intersectionObserver.takeRecords();
  }
}
