class OverworldEvent {
  //passed in from gameObject line 48
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  //method includes a resolver - a function that it can call to tell the system that the event is done
  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve) {
    //this pulls up the reference to the gameObject i.e npc2
    const who = this.map.gameObjects[this.event.who];
    who.startBehaviour(
      {
        map: this.map,
      },
      {
        type: "walk",
        //we are storing the direction on the event
        direction: this.event.direction,
        retry: true,
      }
    );

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = (e) => {
      //is the event that we saw the one that we care about
      if (e.detail.whoId === this.event.who) {
        //we don't want to listen anymore
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        //resolve our promise
        resolve();
      }
    };
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    // checks to see if the instructions contain faceHero, so the NPC will face the hero
    if (this.event.faceHero) {
      // this.event.faceHere will be the ID
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(
        //finds the hero's direction and passes that into oppositeDirection
        this.map.gameObjects["hero"].direction
      );
    }

    // text comes from overworld event config object
    const message = new TextMessage({
      text: this.event.text,
      // to be called when the player has acknowledged the message (clicked button/pressed enter)
      onComplete: () => resolve(),
    });
    // we need to pass init a DOM container where we want to send our message
    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
      resolve();

      sceneTransition.fadeOut();
    });
  }

  battle(resolve) {
    const battle = new Battle({
      onComplete: () => {
        resolve();
      },
    });
    battle.init(document.querySelector(".game-container"));
  }

  // kicks of an instructional method
  init() {
    return new Promise((resolve) => {
      //dynamically call whatever method is defined that was passed into overworldEvent
      //call it with resolve
      this[this.event.type](resolve);
    });
  }
}
