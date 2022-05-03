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
  // kicks of an instructional method
  init() {
    return new Promise((resolve) => {
      //dynamically call whatever method is defined that was passed into overworldEvent
      //call it with resolve
      this[this.event.type](resolve);
    });
  }
}
