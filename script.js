const input = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const types = document.getElementById("types");

const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const attackData = document.getElementById("attack-data");
const defenseData = document.getElementById("defense-data");
const spAttData = document.getElementById("sp-attack-data");
const spDefenseData = document.getElementById("sp-defense-data");
const speedData = document.getElementById("speed-data");
const searchBtn = document.getElementById("search-button");
const baseData = document.getElementsByClassName("base-data");

const colors = {
  Pyrolynx: ["#EC6C4E"],
  Aquoroc: ["#43A0F6", "#BAAA66"],
  Voltadon: ["#F7CB4B", "#9E93F1"],
  Floraspine: ["#78CC55", "#C68BB7"],
  Cryostag: ["#66CCF8", "#ED99ED"],
  Terradon: ["#DFBA52", "#8898F7"],
  Emberapod: ["#EC6C4E", "#AABB3A"],
  Lunaclaw: ["#B59682", "#EA62A2"],
  Quillquake: ["#DFBA52", "#ABAABB"],
  Mystifin: ["#43A0F6", "#9995D0"],
  Dracilume: ["#EC6C4E", "#9E93F1"],
  Thornaconda: ["#78CC55", "#B59682"],
  Frostbyte: ["#66CCF8", "#F7CB4B"],
  Graviboa: ["#BAAA66", "#EA62A2"],
  Zephyreon: ["#8898F7", "#ED99ED"],
  Blazebore: ["#EC6C4E", "#DFBA52"],
  Brontogale: ["#8898F7", "#BAAA66"],
  Shadeelisk: ["#B59682", "#C68BB7"],
  Titanule: ["#ABAABB", "#43A0F6"],
  Faegis: ["#ED99ED", "#ABAABB"],
};
const fetchCreature = async () => {
  let parse = await fetch(
    "https://rpg-creature-api.freecodecamp.rocks/api/creatures"
  );

  let data = await parse.json();

  const found = data.find(
    (d) => d.name === input.value || d.id === Number(input.value)
  );
  console.log("found", found);

  if (!found) {
    alert("Creature not found");
    return;
  } else {
    let individual = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${found.id}`
    );
    let response = await individual.json();

    creatureName.textContent = response.name;
    creatureId.textContent = ` #${response.id}`;
    weight.textContent = ` Weight: ${response.weight}`;
    height.textContent = ` Height: ${response.height}`;
    specialName.textContent = response.special.name;
    specialDescription.textContent = response.special.description;
    types.innerHTML = ``;
    response.types.forEach((type, i) => {
      types.innerHTML += `<div class="type" id="${i}">${type.name}</div>`;

      console.log("d", document.getElementById(`${i}`), i);
      document.getElementById(`${i}`).style.backgroundColor = `${
        colors[input.value][i]
      }`;
    });

    const stats = response.stats;
    const baseArray = Array.from(baseData);

    for (let i = 0; i < baseArray.length; i++) {
      baseArray[i].textContent = stats[i].base_stat;
    }
  }

  input.value = "";
};

searchBtn.addEventListener("click", fetchCreature);
