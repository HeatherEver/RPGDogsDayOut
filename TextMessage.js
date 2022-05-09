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
        <p class="TextMessage_p">
        </p>
        <button class="TextMessage_button">Next</button>
      `;

    //Init the typewriter effect
    this.revealingText = new RevealingText({
      // the element we want to fill with the p tags
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text,
    });

    this.element.querySelector("button").addEventListener("click", () => {
      //Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }
}
