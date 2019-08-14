const fastCsv = require("fast-csv");

let verbose = false;
let veryVerbose = false;

function processRow(row, headers) {
  const result = {};

  // Use the headers to reassemble the object
  for (let i = 0; i < headers.length; i++) {
    let key = headers[i];
    result[key] = row[i];
  }

  // Split Classes string ("Warlock, Wizard") into array (["Warlock", "Wizard"])
  if (result.hasOwnProperty("Classes")) {
    result["Classes"] = result["Classes"].split(",").map(f => f.trim());
  }

  if (result.hasOwnProperty("At Higher Levels")) {
    // Remove empty "At Higher Levels" properties
    if (result["At Higher Levels"].trim().length === 0) {
      delete result["At Higher Levels"];
    } else {
      // Remove leading text for readability
      if (
        result["At Higher Levels"]
          .toLowerCase()
          .trim()
          .indexOf("at higher levels") === 0
      ) {
        result["At Higher Levels"] = result["At Higher Levels"]
          .slice("At Higher Levels.".length + 1)
          .trim();
      }
    }
  }

  // Cast Level into a number
  if (result.hasOwnProperty("Level")) {
    result["Level"] = parseInt(result["Level"][0]) || 0; // 0 Takes care of [C]antrip
  }

  return result;
}

const readCsv = fileUrl =>
  new Promise(function(resolve, reject) {
    const rows = [];
    const errors = [];
    let headers = [];
    fastCsv
      .parseFile(fileUrl, {
        // headers: true,
        delimiter: ",",
        quote: '"'
      })
      .on("error", error => reject(error))
      .on("data", row => {
        if (!headers || !headers.length) {
          headers = row;
          if (verbose) console.log(headers);
          return;
        }
        if (row.length !== headers.length) {
          errors.push(row);
          return;
        }
        rows.push(processRow(row, headers));
      })
      .on("end", count => resolve({ count, rows, errors }));
  });

function sortData(rows, { _verbose = false, _veryVerbose = false } = {}) {
  const byClass = {};
  const byLevel = {};

  for (const row of rows) {
    // Sort by level
    if (byLevel.hasOwnProperty(row.Level)) {
      byLevel[row.Level].push(row);
    } else {
      byLevel[row.Level] = [row];
    }

    for (const className of row.Classes) {
      // Sort by class
      if (byClass.hasOwnProperty(className)) {
        byClass[className].all.push(row);
      } else {
        byClass[className] = { all: [row] };
      }

      // Sort by level per class
      if (byClass[className].hasOwnProperty(row.Level)) {
        byClass[className][row.Level].push(row);
      } else {
        byClass[className][row.Level] = [row];
      }
    }
  }

  if (verbose || _verbose) {
    for (const level of Object.keys(byLevel).sort()) {
      console.log(`Level: ${level}, #: ${byLevel[level].length}`);
    }
  }

  if (verbose || _verbose) {
    for (const className in byClass) {
      console.log(`Class: ${className}`);
      let levels = Object.keys(byClass[className]).sort();
      const all = levels.pop();
      const cantrips = levels.pop();
      levels = [cantrips, ...levels];
      // console.log('Levels', levels);
      for (const spellLevel of levels) {
        console.log(
          `   Level ${spellLevel}: #: ${byClass[className][spellLevel].length}`
        );
        if (veryVerbose || _veryVerbose) {
          for (const spell of byClass[className][spellLevel]) {
            console.log(`       Name: ${spell.Name}`);
          }
        }
      }
    }
  }

  return {
    byLevel,
    byClass
  };
}

function chooseRandom(num, array, unique = true) {
  // console.log(`chooseRandom(${num}, ${array.length})`);
  let picks = [];
  for (var i = 0; i < num; i++) {
    let slot = Math.floor(Math.random() * array.length);
    let pick = array[slot];
    if (!unique) {
      // Don't bother checking to see if we've already picked this spell
      picks.push(pick);
    } else {
      if (picks.indexOf(pick) > -1) {
        i--; // Don't insert into picks and repick. Could potentially cause infinite loop
      } else {
        picks.push(pick);
      }
    }
  }
  return picks;
}

function generateSpellbook(
  byClass,
  { numSpells = 15, minLevel = 1, maxLevel = 9, _verbose = false } = {}
) {
  const randomWizardSpells = chooseRandom(
    numSpells,
    byClass.Wizard.all.filter(
      spell =>
        spell.hasOwnProperty("Level") &&
        spell.Level >= minLevel &&
        spell.Level <= maxLevel
    )
  );
  if (verbose || _verbose)
    console.log(
      `Random Wizard Spellbook [${numSpells} spells between ${minLevel} and ${maxLevel}]`,
      randomWizardSpells.map(n => `${n.Level}: ${n.Name}`).sort()
    );
  return randomWizardSpells;
}

const warlockTable = [
  // Array Index = Warlock Level - 1
  // [ Spells Known, Spell Slot Level ]
  [2, 1],
  [3, 1],
  [4, 2],
  [5, 2],
  [6, 3],
  [7, 3],
  [8, 4],
  [9, 4],
  [10, 5],
  [10, 5],
  [11, 5],
  [11, 5],
  [12, 5],
  [12, 5],
  [13, 5],
  [13, 5],
  [14, 5],
  [14, 5],
  [15, 5],
  [15, 5]
];

function generateWarlockSpellList(
  byClass,
  { warlockLevel = 1, extraSpells = [], _verbose = false } = {}
) {
  // eg first level gets slot [0]
  if (warlockLevel < 1 || warlockLevel > 20)
    throw new Error(`Invalid warlock level: ${warlockLevel}`);

  const [spellsKnown, spellLevel] = warlockTable[warlockLevel - 1];

  const isCastable = spell => spell.Level && spell.Level <= spellLevel;
  const spellList = [
    ...byClass.Warlock.all.filter(isCastable),
    ...extraSpells.filter(isCastable)
  ];
  const myList = chooseRandom(spellsKnown, spellList);

  if (verbose || _verbose)
    console.log(
      `Random Warlock Spell List [Level: ${warlockLevel}, Known: ${spellsKnown}, Slot: ${spellLevel}]`,
      myList.map(({ Level, Name }) => `${Level}: ${Name}`).sort()
    );
  return myList;
}

async function main() {
  // verbose = true;
  // veryVerbose = true;

  try {
    const { count, rows, errors } = await readCsv("./data/Spells.csv");
    console.log(
      `Read ${count} rows resulting in ${rows.length} data and ${
        errors.length
      } errors`
    );

    const { byLevel, byClass } = sortData(rows);
    console.log('=== Wakangas Spellbook ===');
    generateSpellbook(byClass, {
      numSpells: 15,
      minLevel: 2,
      maxLevel: 9,
      _verbose: true
    });

    const FiendExpandedSpellsList = [
      "Burning Hands",
      "Command",
      "Blindness/Deafness",
      "Scorching Ray",
      "Fireball",
      "Stinking Cloud",
      "Fire Shield",
      "Wall of Fire",
      "Flame Strike",
      "Hallow"
    ];
    const extraSpells = rows.filter(
      spell => FiendExpandedSpellsList.indexOf(spell.Name) >= 0
    );

    for (const color of ["Green", "Blue", "Purple", "Red", "Orange", "Gold"]) {
      console.log(`=== Grung Color: ${color} ===`);
      generateWarlockSpellList(byClass, {
        warlockLevel: 6,
        extraSpells,
        _verbose: true
      });
    }
  } catch (err) {
    console.error(err);
  }
}

main();
