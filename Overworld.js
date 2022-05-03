class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      // sort the values so the smaller y values are upfront so the northern characters will be drawn before southern characters
      // to makes sure they are layered correctly
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  //new method
  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      // checks for a cutscene at a certain position
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // this.map.startCutscene([
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "npcA", type: "walk", direction: "up" },
    //   { who: "hero", type: "stand", direction: "right" },
    //   { who: "npcA", type: "walk", direction: "left" },
    //   { type: "textMessage", text: "HELLO MASSIVE CAT!" },
    //   { type: "textMessage", text: "HELLO SAM!" },
    //   { who: "hero", type: "walk", direction: "left" },

    //   { who: "npcB", type: "stand", direction: "right" },
    //   { who: "npcA", type: "stand", direction: "up", time: 800 },
    // ]);
  }
}
