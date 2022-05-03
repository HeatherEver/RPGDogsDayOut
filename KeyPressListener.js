class KeyPressListener {
  constructor(keyCode, callback) {
    // once callback is called this will be false and then callback won't run again until this is true
    let keySafe = true;

    // listens for the key to be pressed down
    this.keydownFunction = function (event) {
      if (event.code === keyCode) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };

    // listens for the key to be unpressed
    this.keyupFunction = function (event) {
      if (event.code === keyCode) {
        keySafe = true;
      }
    };
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  // stops listening
  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
