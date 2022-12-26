import Hero from './hero';
import Monster from './monster';
import Items from './items';
import Weapons from './weapons';

const savedGame = {
  heroes: {
    hunter: { health: 88, level: 22, weapons: [{ bow: { level: 20, type: 'rare' } }], armors: [] },
    warrior: { health: 100, level: 12, weapons: [{ sword: { level: 5, type: 'unic' } }], armors: [] },
  },
}

class Hunter extends Hero {constructor(props: any){super(props)}}

class Warrior extends Hero {constructor(props: any){super(props)}}

class Sceleton extends Monster {}

class Ghost extends Monster {}

const hero1 = new Hunter(savedGame.heroes.hunter);
const hero2 = new Warrior(savedGame.heroes.warrior);

const ghost1 = new Ghost();
const ghost2 = new Ghost();

const sceleton1 = new Sceleton();
const sceleton2 = new Sceleton();

const tree = new Items.tree();
const stone = new Items.stone();
const wall = new Items.wall();
const gate = new Items.gate();

const t = tree;
const w = wall;
const s = stone;
const g = gate;
const s1 = sceleton1;
const s2 = sceleton2;
const g1 = ghost1;
const g2 = ghost2;
const h1 = hero1;
const h2 = hero2;

const screen = [
  [w, w, w, w, g, g, w, w, w, w],
  [w, 0,s2, 0, 0, 0, 0,g1, 0, w],
  [w, 0, 0, 0, 0, 0, 0, 0, 0, w],
  [w, s, s, s, 0, 0, t, t, t, w],
  [w,s1, 0, 0, 0, 0, 0, 0, 0, w],
  [w, 0, 0, s, 0, 0, 0, 0, 0, w],
  [w, s, s, s, 0, 0, 0, 0, 0, w],
  [w, 0,h1, 0, 0, 0, 0,g2, 0, w],
  [w, 0, 0, 0, 0, 0, 0,h2, 0, w],
  [w, w, w, w, g, g, w, w, w, w],
]

const controller1 = () => {
  /*  действия пользователя  */
}

const controller2 = () => {
  /* движение внутри карты, взаимодействие моделей, изменение состояния моделей  */
}

const controller3 = () => {
  /* отрисовка карты в canvas после изменения screen */
}
