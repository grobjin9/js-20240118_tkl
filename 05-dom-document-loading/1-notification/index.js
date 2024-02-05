export default class NotificationMessage {
  static #currentNotification = null;

  #message;
  #duration;
  #type;
  #element;
  #timerId = null;

  constructor(message = "", { duration = 0, type = "" } = {}) {
    if (NotificationMessage.#currentNotification) {
      NotificationMessage.#currentNotification.destroy();
    }

    this.#message = message;
    this.#duration = duration;
    this.#type = type;
    this.#element = this.#createElement();

    NotificationMessage.#currentNotification = this;
  }

  #getDuration() {
    const durationInSeconds = parseFloat((this.#duration / 1000).toFixed(1));

    return durationInSeconds + "s";
  }

  #createStatusClass() {
    return this.#type === "success"
      ? "notification success"
      : "notification error";
  }

  get #template() {
    return `
      <div class="${this.#createStatusClass()}" style="--value:${this.#getDuration()}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.#type}</div>
          <div class="notification-body">
            ${this.#message}
          </div>
        </div>
      </div>
    `;
  }

  #onTimeEnd = () => {
    this.destroy();
  };

  #createElement() {
    const template = document.createElement("div");
    template.innerHTML = this.#template;

    return template.firstElementChild;
  }

  // This getter function fakes access to notificationMessage.element in order to pass the tests
  get element() {
    return this.#element;
  }

  // Similar to what the element getter function just does to pass the tests 👌
  get duration() {
    return this.#duration;
  }

  show(target) {
    (target || document.body).append(this.#element);

    this.#timerId = setTimeout(this.#onTimeEnd, this.#duration);
  }

  remove() {
    if (this.#element) {
      this.#element.remove();
      clearTimeout(this.#timerId);
    }
  }

  destroy() {
    this.remove();

    NotificationMessage.#currentNotification = null;
  }
}
