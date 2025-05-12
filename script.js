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
    console.log(found.id);
    let individual = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${found.id}`
    );
    let resp = await individual.json();

    creatureName.textContent = resp.name;
    creatureId.textContent = ` #${resp.id}`;
    weight.textContent = ` Weight: ${resp.weight}`;
    height.textContent = ` Height: ${resp.height}`;
    specialName.textContent = resp.special.name;
    specialDescription.textContent = resp.special.description;
    types.innerHTML = ``;
    resp.types.forEach((type) => {
      types.innerHTML += `<button>${type.name}</button`;
    });

    const stats = resp.stats;
    const baseArray = Array.from(baseData);

    for (let i = 0; i < baseArray.length; i++) {
      baseArray[i].textContent = stats[i].base_stat;
    }
  }

  //   let matchingApi = fetch(
  //     "https://rpg-creature-api.freecodecamp.rocks/api/creature/pyrolynx"
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => console.log("d", data));

  //   matchingApi.then((result) => console.log(result));
};
searchBtn.addEventListener("click", fetchCreature);
