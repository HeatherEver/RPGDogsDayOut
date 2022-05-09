class SceneTransition {
  constructor() {
    this.element = null;
  }
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("SceneTransition");
  }

  //adds a classname to our element - fade-out which is in our css
  fadeOut() {
    this.element.classList.add("fade-out");
    this.element.addEventListener(
      "animationend",
      () => {
        this.element.remove();
      },
      { once: true }
    );
  }

  init(container, callback) {
    this.createElement();
    container.appendChild(this.element);

    //this will unbind immediately after being run
    this.element.addEventListener(
      "animationend",
      () => {
        callback();
      },
      { once: true }
    );
  }
}
