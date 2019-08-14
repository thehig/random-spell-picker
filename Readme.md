# Random Spell Picker

### Running spell-picker

1. Clone repository `git clone https://github.com/thehig/random-spell-picker.git`
1. Open terminal in repository folder
1. Run `npm start`

### Example Output

Generates two sets of output. One for creating a Spellbook with 15 random spells, and one for a Grung Warlock that I'm playing that changes color every 3 long rests, and has a different spell-list depending on the color

```
Read 472 rows resulting in 462 data and 9 errors
=== Wakangas Spellbook ===
Random Wizard Spellbook [15 spells between 2 and 9] [
  '2: Blindness/Deafness',
  '2: See Invisibility',
  "2: Snilloc's Snowball Swarm",
  '3: Fast Friends',
  '3: Gaseous Form',
  '3: Protection from Energy',
  '3: Slow',
  '4: Stone Shape',
  '5: Cone of Cold',
  '5: Hold Monster',
  '8: Demiplane',
  '8: Maddening Darkness',
  '9: Astral Projection',
  '9: Foresight',
  '9: Psychic Scream'
]
=== Grung Color: Green ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Cause Fear',
  '1: Comprehend Languages',
  '1: Unseen Servant',
  '2: Cloud of Daggers',
  '2: Mind Spike',
  '2: Shatter',
  '3: Enemies Abound'
]
=== Grung Color: Blue ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Armor of Agathys',
  '1: Hex',
  '2: Darkness',
  '3: Dispel Magic',
  '3: Enemies Abound',
  '3: Hunger of Hadar',
  '3: Vampiric Touch'
]
=== Grung Color: Purple ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Armor of Agathys',
  '1: Cause Fear',
  '1: Distort Value',
  '2: Blindness/Deafness',
  '3: Enemies Abound',
  '3: Magic Circle',
  '3: Major Image'
]
=== Grung Color: Red ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Illusory Script',
  '2: Mind Spike',
  '2: Scorching Ray',
  '2: Suggestion',
  '3: Enemies Abound',
  '3: Fireball',
  '3: Tongues'
]
=== Grung Color: Orange ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Arms of Hadar',
  '1: Unseen Servant',
  '2: Misty Step',
  '2: Ray of Enfeeblement',
  '3: Fly',
  '3: Hunger of Hadar',
  '3: Magic Circle'
]
=== Grung Color: Gold ===
Random Warlock Spell List [Level: 6, Known: 7, Slot: 3] [
  '1: Cause Fear',
  '2: Cloud of Daggers',
  '2: Mind Spike',
  '3: Fireball',
  '3: Hypnotic Pattern',
  '3: Magic Circle',
  '3: Stinking Cloud'
]
```

Note: CSV parsing errors [have been reported](https://github.com/TheGiddyLimit/TheGiddyLimit.github.io/issues/278)