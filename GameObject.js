class GameObject {
  // config is similar to props in react!
  constructor(config) {
    // when objects are created this will get set
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0; // position of object
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    //
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/blackCat2.png",
    });

    // listen for the behaviour loops
    this.behaviourLoop = config.behaviourLoop || [];
    // keeps track of which behaviour are we on right now
    this.behaviourLoopIndex = 0;

    // ready to accept talking
    this.talking = config.talking || [];
  }

  mount(map) {
    console.log("mounting!");
    this.isMounted = true;
    map.addWall(this.x, this.y);

    //If we have a behaviour, kick off after a short delay
    setTimeout(() => {
      this.doBehaviourEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviourEvent(map) {
    //Don't do anything if there is a more important cutscene or I don't have config to do anything
    //anyway.
    if (
      map.isCutscenePlaying ||
      this.behaviourLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    //Setting up our event with relevant info
    let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
    //Sets who this is for
    eventConfig.who = this.id;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    //Wait until the event has finished i.e walking to the left
    await eventHandler.init();

    //Setting the next event to fire
    this.behaviourLoopIndex += 1;
    //if we get to the end of our loop, lets reset the count to run again
    if (this.behaviourLoopIndex === this.behaviourLoop.length) {
      this.behaviourLoopIndex = 0;
    }

    //Do it again!
    this.doBehaviourEvent(map);
  }
}
