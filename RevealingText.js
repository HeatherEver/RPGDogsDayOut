class RevealingText {
  constructor(config) {
    // existing element that we'll pass in
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    //two bits of state
    this.timeout = null;
    //done revealing the message
    this.isDone = false;
  }

  revealOneCharacter(list) {
    //grab and remove first character
    const next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  //changes all characters to visible
  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((s) => {
      s.classList.add("revealed");
    });
  }

  init() {
    // splitting the characters into separate elements
    let characters = [];
    this.text.split("").forEach((character) => {
      //Create each span, add to element in DOM
      let span = document.createElement("span");
      span.textContent = character;
      this.element.appendChild(span);

      //Add this span to our internal state Array
      characters.push({
        span,
        //if character is equal to a space don't delay
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
