class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    // element we are going to append to the dom
    this.element = null;
  }

  // creates a div
  createElement() {
    //Create the element
    this.element = document.createElement("div");
    // add a class to the element
    this.element.classList.add("TextMessage");

    //the inner HTML we will inject with some text
    this.element.innerHTML = `
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Next</button>
      `;

    this.element.querySelector("button").addEventListener("click", () => {
      //Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.actionListener.unbind();
      this.done();
    });
  }

  done() {
    // removes element from screen
    this.element.remove();
    // calls onComplete
    this.onComplete();
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}
