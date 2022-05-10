//pizza-dex list of all our pizzas

window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

//pizza-dex - a big object containing a list of all our pizzas
window.Pizzas = {
  s001: {
    name: "Slice Samurai",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s001.png",
    icon: "/images/icons/spicy.png",
  },
  v001: {
    name: "Call Me Kale",
    type: PizzaTypes.veggie,
    src: "/images/characters/pizzas/v001.png",
    icon: "/images/icons/veggie.png",
  },
  f001: {
    name: "Portobello Express",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/f001.png",
    icon: "/images/icons/fungi.png",
  },
};
