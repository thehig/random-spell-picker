# Random Spell Picker

### Running spell-picker

1. Clone repository `git clone https://github.com/thehig/random-spell-picker.git`
1. Download source data via export from [5etools spells](https://5etools.com/spells.html) by clicking "Table View" => "Download CSV" and save as `data/Spells.csv`
1. Open terminal in repository folder
1. Run `npm start`

### Example Output

Generates two sets of output. One for creating a Spellbook with 15 random spells, and one for a Grung Warlock that I'm playing that changes color every 3 long rests, and has a different spell-list depending on the color

```
Read 472 rows resulting in 471 data and 0 errors
=== Wakangas Spellbook ===
Random Wizard Spellbook [15 spells between 2 and 9] [
  '2: Gust of Wind',
  '3: Erupting Earth',
  '3: Gaseous Form',
  '3: Hypnotic Pattern',
  '3: Wall of Sand',
  "4: Evard's Black Tentacles",
  '5: Hold Monster',
  '5: Teleportation Circle',
  '5: Wall of Light',
  '6: Investiture of Stone',
  '6: Magic Jar',
  "7: Mordenkainen's Sword",
  '9: Astral Projection',
  '9: Gate',
  '9: Psychic Scream'
]
=== Grung Color: Green ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Cause Fear',
  '2: Cloud of Daggers',
  '2: Crown of Madness',
  '2: Invisibility',
  '2: Ray of Enfeeblement',
  '3: Counterspell',
  '3: Summon Lesser Demons'
]
=== Grung Color: Blue ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Burning Hands',
  '2: Cloud of Daggers',
  '2: Enthrall',
  '2: Hold Person',
  '3: Hunger of Hadar',
  '3: Hypnotic Pattern',
  '3: Summon Lesser Demons'
]
=== Grung Color: Purple ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Arms of Hadar',
  '1: Comprehend Languages',
  '1: Hex',
  '2: Blindness/Deafness',
  '2: Cloud of Daggers',
  '2: Darkness',
  '2: Invisibility'
]
=== Grung Color: Red ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Expeditious Retreat',
  '2: Enthrall',
  '2: Mind Spike',
  '2: Shadow Blade',
  '2: Suggestion',
  '3: Gaseous Form',
  '3: Summon Lesser Demons'
]
=== Grung Color: Orange ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Expeditious Retreat',
  '2: Cloud of Daggers',
  '2: Ray of Enfeeblement',
  '2: Spider Climb',
  '3: Fear',
  '3: Remove Curse',
  '3: Summon Lesser Demons'
]
=== Grung Color: Gold ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Distort Value',
  '1: Hellish Rebuke',
  '2: Blindness/Deafness',
  '3: Enemies Abound',
  '3: Fly',
  '3: Gaseous Form',
  '3: Incite Greed'
]
```