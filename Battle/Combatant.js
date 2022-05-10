class Combatant {
  constructor(config, battle) {
    //iterate through all the config keys
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
  }

  //GETTER
  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    //if percent is more than 0 return percent, otherwise return 0
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100;
  }

  //GETS from battle.js the activeCombatants
  get isActive() {
    return this.battle.activeCombatants[this.team] === this.id;
  }

  createElement() {
    // create a new element - new div with className of 'combatant'
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    //paragraph with combatant name
    this.hudElement.innerHTML = `
        <p class="Combatant_name">${this.name}</p>
        <p class="Combatant_level"></p>
        <div class="Combatant_character_crop">
          <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
        </div>
        <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
        <svg viewBox="0 0 26 3" class="Combatant_life-container">
          <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
          <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
        </svg>
        <svg viewBox="0 0 26 2" class="Combatant_xp-container">
          <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
          <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
        </svg>
        <p class="Combatant_status"></p>
      `;

    //adding the pizzas to the screen to battle
    this.pizzaElement = document.createElement("img");
    this.pizzaElement.classList.add("Pizza");
    //all defined in our pizza-dex in Content
    this.pizzaElement.setAttribute("src", this.src);
    this.pizzaElement.setAttribute("alt", this.name);
    this.pizzaElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      ".Combatant_life-container > rect"
    );

    this.xpFills = this.hudElement.querySelectorAll(
      ".Combatant_xp-container > rect"
    );
  }

  //this is what's going to fill in our stateful values in the DOM
  update(changes = {}) {
    //Update anything incoming
    //for any key in the changes object that comes in
    //go ahead and set the key to the value
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    //Update active flag to show the correct pizza & hud
    this.hudElement.setAttribute("data-active", this.isActive);
    this.pizzaElement.setAttribute("data-active", this.isActive);

    //Update HP & XP percent fills
    this.hpFills.forEach((rect) => (rect.style.width = `${this.hpPercent}%`));
    this.xpFills.forEach((rect) => (rect.style.width = `${this.xpPercent}%`));

    //Update level on screen
    this.hudElement.querySelector(".Combatant_level").innerText = this.level;
  }

  init(container) {
    this.createElement();
    //inject the elements that these created
    container.appendChild(this.hudElement);
    container.appendChild(this.pizzaElement);
    this.update();
  }
}
