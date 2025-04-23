`use strict`;



/* enums **********************************************/
const enum Types {
    Task,
    Target,
    Item,
    Armor,
    Weapon,
    ReligiousItem,
    /* LocationPreposition, */
    QuestLocation,
    Landmark,
    Terrain

    , _count
}

const enum Target {
    Any,

    Character,
    Monster,
    Item,
    Trap,
    Location

    , _count
}

const enum Task {
    Locate,
    Investigate,
    Reveal,
    Conceal,
    Enter,
    Exit,
    Appease,
    Taunt,
    Aid,
    Hinder,
    Activate,
    Deactivate,
    Acquire,
    Release

    , _count
}

const enum Item {
    Treasure,
    Headgear,
    Eyewear,
    Earwear,
    Neckwear,
    Bodywear,
    Adornment,
    Armor,
    Wristband,
    Glove,
    Ring,
    Belt,
    Footwear,
    Shield,
    Weapon,
    Artifact,
    Book,
    Charm,
    Container,
    Gem,
    Ingredient,
    Key,
    Document,
    Potion,
    ReligiousItem,
    Symbol,
    Scroll,
    Wand

    , _count
}

const enum Armor {
    Cloth,
    Quilt,
    Hide,
    Leather,
    Mail,
    Mesh,
    Plate

    , _count
}

const enum Weapon {
    Melee,
    Ranged

    , _count
}

const enum MeleeWeapon {
    Sword,
    Axe,
    Hammer,
    Spear,
    Club,
    Mace,
    Staff

    , _count
}

const enum RangedWeapon {
    Bow,
    Sling,
    Dart,
    ThrowingKnife,
    ThrowingStar

    , _count
}

const enum ReligiousItem {
    Ashes,
    Banner,
    Bell,
    Bone,
    Bottle,
    Candle,
    Censer,
    Cord,
    Cross,
    Cube,
    Cup,
    Disc,
    Egg,
    Feather,
    Hand,
    Heart,
    Horn,
    Lantern,
    Mirror,
    Orb,
    Phylactery,
    Scarab,
    Skull,
    Spike,
    Star

    , _count
}

const enum LocationPreposition {
    At,
    In,
    From,
    To

    , _count
}

const enum QuestLocation {
    Bar,
    Barn,
    Cave,
    Cemetery,
    Church,
    City,
    Docks,
    Domicile,
    Dungeon,
    Encampment,
    Fortress,
    Guild,
    Hospital,
    Inn,
    Landmark,
    MagicalArea,
    Repository,
    Ruins,
    School,
    Shrine,
    Store,
    Terrain

    , _count
}

const enum Landmark {
    Arch,
    Boulder,
    Bridge,
    Dome,
    Fountain,
    Garden,
    Gate,
    Gazebo,
    Grove,
    Monument,
    Obelisk,
    Platform,
    Pool,
    Sculpture,
    Signpost,
    Statue,
    Tree,
    Wall,
    Well

    , _count
}

const enum Terrain {
    Local, /* special case; see Cre() method */

    Aquatic,
    Plains,
    Desert,
    Forest,
    Wetlands,
    Hills,
    Mountains,
    Underground

    , _count
}



/* initialization **********************************************/
const Vowels: string = `aeiou`,
    VowelsLength: number = Vowels.length,
    Consonants: string = `bcdfghjklmnpqrstvwxyz`,
    ConsonantsLength: number = Consonants.length,
    ProperNamePercent: number = 1.0 / 3.0;

let isInitialized: boolean = false;
let TaskTargets: Target[] = [],
    TaskTypes: any[][] = [],
    CharacterTaskTypes: any[] = [],
    CharacterTasksLen: number,
    MonsterTaskTypes: any[] = [],
    MonsterTasksLen: number,
    ItemTaskTypes: any[] = [],
    ItemTasksLen: number,
    TrapTaskTypes: any[] = [],
    TrapTasksLen: number,
    LocationTaskTypes: any[] = [],
    LocationTasksLen: number,

    ItemTypes: any[][] = [],
    ArmorTypes: any[][] = [],
    WeaponTypes: any[][] = [],
    MeleeWeaponTypes: any[][] = [],
    RangedWeaponTypes: any[][] = [],
    ReligiousItemTypes: any[][] = [],
    LocationTypes: any[][] = [],
    LandmarkTypes: any[][] = [],
    TerrainTypes: any[][] = [],

    MaleNames: string[] = [],
    MaleNamesLength: number,
    FemaleNames: string[] = [],
    FemaleNamesLength: number,
    Surnames: string[] = [],
    SurnamesLength: number,
    NameParts: string[] = [],
    PersonPrefixParts: string[] = [],
    PersonSuffixParts: string[] = [],
    PlaceParts: string[] = [],
    UndesirablePhrases: string[] = [];



/* random number generator **********************************************/
const RNG: any = Math.random;

const Next1 = (min: number, max: number): number => {
    const minC: number = Math.ceil(min);
    return Math.floor(RNG() * (Math.floor(max) - minC) + minC);
};
const Next = (max: number): number => {
    return Next1(0, max);
};

const RandomLocation = (): string => {
    let id1: number = Next(QuestLocation._count),
        id2: number,
        result: string;
    if (id1 === QuestLocation.Landmark) {
        id2 = Next(LandmarkTypes[id1].length);
        result = LandmarkTypes[id2][Next(LandmarkTypes[id2].length)];
    } else {
        id2 = Next(LocationTypes[id1].length);
        result = LocationTypes[id2][Next(LocationTypes[id2].length)];
    }
    return `${TargetName(``)} ${result}`.trim();
};
const RandomValue = (values: string[]): string => {
    return (values === undefined ? `` : values[Next(values.length)]);
};



/* grammar **********************************************/
const Capital = (word: string): string => {
    return word.split(` `).map((w: string) =>
        w.substring(0, 1).toUpperCase() + w.substring(1)).join(` `);
};
const AorAn = (word: string): string => {
    return (Vowels.indexOf(word.substring(0, 1).toLowerCase()) > -1 ? `an` : `a`);
};
const Possessive = (word: string): string => {
    let result: string = `${word} ${((word.substring(word.length - 1) === `s`) ? `'` : `'s`)}`.trim();
    result = (result === `'s` ? `` : result);
    return result.replace(/\s/g, ``);
};



/* names **********************************************/
const PrefixSuffix = (prefixes: string[], suffixes: string[]): string => {
    let prefix: string,
        suffix: string;
    do {
        prefix = RandomValue(prefixes);
        suffix = RandomValue(suffixes);
    } while (prefix === suffix);
    return prefix + suffix;
};
const PersonsPlace = (person: string): string => {
    return `${Possessive(person)} ${RandomValue(PlaceParts)}`;
};
const PlaceOfPerson = (person: string): string => {
    return `${RandomValue(PlaceParts)} ${person}`;
};

const ProperName = (): string => {
    const apos: string = `'`;
    let name: string = ``,
        partCount: number,
        partCountLimit: number,
        prefix: string,
        randomName: string,
        hasUndesirablePhrase: boolean,
        isVowel: boolean,
        pos: number,
        i: number;

    Initialize();
    switch (Next(6)) {
        case 0:
            name += PrefixSuffix(PlaceParts, PlaceParts);
            break;
        case 1:
            switch (Next(8)) {
                case 0:
                case 1:
                    partCount = 1;
                    break;
                case 2:
                    partCount = 3;
                    break;
                default:
                    partCount = 2;
                    break;
            }
            partCountLimit = partCount - 1;
            for (i = 0; i < partCount; ++i) {
                prefix = RandomValue(PersonPrefixParts);
                name += (prefix);
                if (Next(12) === 0 && i < partCountLimit) {
                    name += apos;
                }
            }
            break;
        case 2:
            do {
                name = ``;
                hasUndesirablePhrase = false;
                partCount = Next1(2, 6);
                partCountLimit = partCount - 1;

                isVowel = (Next(2) === 0);
                for (i = 0; i < partCount; ++i) {
                    if (isVowel) {
                        pos = Next(VowelsLength);
                        name += (Vowels.substring(pos, pos + 1));
                        if (Next(16) === 0) {
                            pos = Next(VowelsLength);
                            name += (Vowels.substring(pos, pos + 1));
                        }
                    } else {
                        pos = Next(ConsonantsLength);
                        name += (Consonants.substring(pos, pos + 1));
                        if (Next(20) === 0 && i > 0) {
                            pos = Next(ConsonantsLength);
                            name += (Consonants.substring(pos, pos + 1));
                        }
                    }
                    isVowel = !isVowel;

                    if (Next(24) === 0 && i < partCountLimit) {
                        name += apos;
                    }
                }

                randomName = name + ``;
                UndesirablePhrases.forEach((phrase: string) => {
                    if (randomName.indexOf(phrase) > -1) {
                        hasUndesirablePhrase = true;
                    }
                });
            } while (hasUndesirablePhrase);
            break;
        default:
            switch (Next(3)) {
                case 0:
                    name += (RandomValue(MaleNames));
                    break;
                case 1:
                    name += (RandomValue(FemaleNames));
                    break;
                default:
                    name += (RandomValue(Surnames));
            }
    }

    return name;
}
const FullProperName = (): string => {
    Initialize();
    return ProperName() + ` ` + ProperName();
};

const TargetName = (place: string): string => {
    Initialize();
    switch (Next(8)) {
        case 0:
        case 1:
            return PersonsPlace(place);
        case 2:
            return PlaceOfPerson(place);
        case 3:
            let prefix: string,
                suffix: string,
                value: string;
            do {
                prefix = RandomValue(PlaceParts);
                suffix = RandomValue(PlaceParts);
            } while (prefix === suffix);
            do {
                value = RandomValue(PlaceParts);
            } while (value === prefix || value === suffix);
            return prefix + suffix + ` ` + value;
        default:
            return PrefixSuffix(PlaceParts, PlaceParts);
    }
};



/* create quest **********************************************/
const Cre = (): string => {
    /*
    steps...
        choose party`s starting location
        choose target
        choose task (based on target)
        choose target`s location (based on task)
        choose destination
        if necessary (based on task), choose additional waypoint locations
        flesh out the story
    */

    Initialize();
    const b: string = `<b>`,
        _b: string = `</b>`,
        br: string = `<br/>`,
        spacer: string = `&nbsp; &nbsp; &nbsp; &nbsp;`,
        wayPointPercent: number = 0.25,
        wayPointMaxCount: number = 5;
    let id: number,
        idx1: number,
        idx2: number,
        partyLoc: string,
        target: string,
        tasker: string[],
        task: string,
        targetLoc: any,
        destination: string,
        wayPointCount: number = 0,
        wayPoints: string[] = [],
        cre: string = ``,
        these: string,
        s: string;

    partyLoc = RandomLocation();

    target = `location`;
    id = Next(TaskTargets.length);
    switch (id) {
        case Target.Character:
            target = `character: ${(RNG() > ProperNamePercent ? ProperName() : FullProperName())}`;
            idx1 = Next(Task._count);
            tasker = CharacterTaskTypes[Next(CharacterTasksLen)];
            task = tasker[Next(tasker.length)];
            break;
        case Target.Monster:
            target = `monster`;
            idx1 = Next(Task._count);
            tasker = MonsterTaskTypes[Next(MonsterTasksLen)];
            task = tasker[Next(tasker.length)];
            break;
        case Target.Item:
            target = `item`;
            idx1 = Next(Task._count);
            tasker = ItemTaskTypes[Next(ItemTasksLen)];
            task = tasker[Next(tasker.length)];
            switch (idx1) {
                case Item.Armor:
                    idx2 = Next(Armor._count);
                    target = `${ArmorTypes[idx2][Next(ArmorTypes[idx2].length)]}`;
                    break;
                case Item.Weapon:
                    idx2 = Next(Weapon._count);
                    target = `${WeaponTypes[idx2][Next(WeaponTypes[idx2].length)]}`;
                    break;
                default: /* ReligiousItem */
                    idx2 = Next(ReligiousItem._count);
                    target = `${ReligiousItemTypes[idx2][Next(ReligiousItemTypes[idx2].length)]}`;
            }
            target = `${TargetName(target)}`;
            break;
        case Target.Trap:
            target = `trap`;
            idx1 = Next(Task._count);
            tasker = TrapTaskTypes[Next(TrapTasksLen)];
            task = tasker[Next(tasker.length)];
            break;
        default: /* Location */
            idx1 = Next(Task._count);
            tasker = LocationTaskTypes[Next(LocationTasksLen)];
            task = tasker[Next(tasker.length)];
    }

    do {
        targetLoc = RandomLocation();
    } while (targetLoc === partyLoc)
    do {
        destination = RandomLocation();
    } while (destination === partyLoc || destination === targetLoc)

    if (RNG() > wayPointPercent) {
        let wp: string;
        wayPointCount = Next(wayPointMaxCount);
        for (let i: number = 0; i < wayPointCount; i++) {
            do {
                wayPoints[i] = RandomLocation();
                wp = wayPoints[i];
            } while (wp === partyLoc || wp === targetLoc || wp === destination);
            wayPoints[i] = Capital(wp);
        }
    }

    partyLoc = Capital(partyLoc);
    target = Capital(target);
    task = Capital(task);
    targetLoc = Capital(targetLoc);
    destination = Capital(destination);

    cre += `You and your party will begin at ${b}the ${partyLoc}${_b}${br}`;
    cre += `Your target is ${b}${AorAn(target)} ${target}${_b}${br}`;
    cre += `Your task is to ${b}${task} the ${target}${_b}${br}`;
    cre += `You will find ${b}the ${target}${_b} at ${b}the ${targetLoc}${_b}${br}`;
    if (wayPointCount > 0) {
        these = (wayPointCount > 1 ? `these` : `this`);
        s = (wayPointCount > 1 ? `s` : ``);
        cre += `Along the way to ${b}the ${targetLoc}${_b}, you will journey to ${these} waypoint${s}...${br}`;
        wayPoints.forEach((wp: string) => {
            cre += `${spacer}${b}the ${wp}${_b}${br}`;
        });
    }
    cre += `You will bring ${b}the ${target}${_b} to ${b}the ${destination}${_b}${br}`;

    return cre;
};

const Initialize = (): void => {
    if (!isInitialized) {
        isInitialized = true;

        TaskTargets = [Target.Character, Target.Monster, Target.Item, Target.Trap, Target.Location];

        TaskTypes[Task.Locate] = [`discover`, `encounter`, `find`, `locate`, `meet with`, `navigate to`, `search for`, `seek out`, `track`];
        TaskTypes[Task.Investigate] = [`comprehend`, `explore`, `investigate`, `observe`, `search for`, `understand`, `watch`];
        TaskTypes[Task.Reveal] = [`expose`, `reveal`, `show`, `uncover`, `unveil`];
        TaskTypes[Task.Conceal] = [`alter`, `change`, `conceal`, `cover`, `disguise`, `erase`, `hide`, `manipulate`, `replace`];
        TaskTypes[Task.Enter] = [`enter`, `infiltrate`, `invade`, `penetrate`, `proceed into`];
        TaskTypes[Task.Exit] = [`break free from`, `depart from`, `escape from`, `exit`, `flee from`, `leave`];
        TaskTypes[Task.Appease] = [`appease`, `console`, `earn`, `fall for`, `forgive`, `hire`, `indulge`, `introduce`, `join`, `negotiate with`, `recruit`, `settle`];
        TaskTypes[Task.Taunt] = [`accuse`, `assign`, `belittle`, `betray`, `challenge`, `condemn`, `decry`, `detain`, `exact revenge upon`, `expose`, `force`, `frighten`, `incite`, `insult`, `interrogate`, `offend`, `punish`, `scare`, `steal from`, `swindle`, `taunt`, `torment`, `trick`, `upset`, `usurp`];
        TaskTypes[Task.Aid] = [`aid`, `assist`, `avenge`, `cure`, `defeat`, `defend`, `dispel`, `ease`, `equalize`, `expand`, `foil`, `guard`, `heal`, `help`, `improve`, `learn about`, `liberate`, `perfect`, `protect`, `rally against`, `reactivate`, `rebuild`, `reclaim`, `regain`, `reinstate`, `repair`, `repel`, `resist`, `restore`];
        TaskTypes[Task.Hinder] = [`arrest`, `beset`, `catch`, `conquer`, `damage`, `disrupt`, `enslave`, `exploit`, `hinder`, `limit`, `oppose`, `sabotage`, `shackle`];
        TaskTypes[Task.Activate] = [`activate`, `animate`, `become`, `build`, `commit`, `create`, `establish`, `forge`, `invent`, `start`, `use`];
        TaskTypes[Task.Deactivate] = [`assassinate`, `assault`, `attack`, `banish`, `battle`, `combat`, `deactivate`, `defeat`, `destroy`, `eliminate`, `end`, `eradicate`, `exterminate`, `fight`, `kill`, `murder`, `obliterate`, `ruin`, `shut down`, `stop`, `strike`];
        TaskTypes[Task.Acquire] = [`abscond with`, `acquire`, `barter with`, `buy`, `gather`, `get`, `harvest`, `recover`, `rescue`, `retrieve`, `steal`, `trade`];
        TaskTypes[Task.Release] = [`auction`, `deliver`, `escort`, `free`, `guide`, `release`, `return`, `save`, `sell`, `take`, `travel with`, `usher`];

        CharacterTaskTypes = [TaskTypes[Task.Locate], TaskTypes[Task.Appease], TaskTypes[Task.Taunt], TaskTypes[Task.Aid], TaskTypes[Task.Hinder], TaskTypes[Task.Release]];
        CharacterTasksLen = CharacterTaskTypes.length;
        MonsterTaskTypes = [TaskTypes[Task.Locate], TaskTypes[Task.Appease], TaskTypes[Task.Taunt], TaskTypes[Task.Hinder], TaskTypes[Task.Release]];
        MonsterTasksLen = MonsterTaskTypes.length;
        ItemTaskTypes = [TaskTypes[Task.Locate], TaskTypes[Task.Reveal], TaskTypes[Task.Conceal], TaskTypes[Task.Activate], TaskTypes[Task.Deactivate], TaskTypes[Task.Acquire], TaskTypes[Task.Release]];
        ItemTasksLen = ItemTaskTypes.length;
        TrapTaskTypes = [TaskTypes[Task.Locate], TaskTypes[Task.Investigate], TaskTypes[Task.Reveal], TaskTypes[Task.Conceal], TaskTypes[Task.Activate], TaskTypes[Task.Deactivate]];
        TrapTasksLen = TrapTaskTypes.length;
        LocationTaskTypes = [TaskTypes[Task.Locate], TaskTypes[Task.Investigate], TaskTypes[Task.Enter], TaskTypes[Task.Exit]];
        LocationTasksLen = LocationTaskTypes.length;

        ItemTypes[Item.Treasure] = [`coins`, `currency`, `dowry`, `gold`, `money`, `payment`, `prize`, `riches`, `treasure`, `wealth`];
        ItemTypes[Item.Headgear] = [`cap`, `circlet`, `coronet`, `cover`, `cowl`, `crown`, `diadem`, `hat`, `headband`, `headgear`, `helm`, `helmet`, `sallet`, `skullcap`, `veil`];
        ItemTypes[Item.Eyewear] = [`eyepatch`, `eyes`, `eyewear`, `glasses`, `goggles`, `lenses`, `mask`, `monocle`, `prism`, `spectacles`, `visor`];
        ItemTypes[Item.Earwear] = [`backvisor`, `ear hook`, `ear muff`, `earpiece`, `earplug`, `earring`, `earwear`];
        ItemTypes[Item.Neckwear] = [`amulet`, `bolo`, `cameo`, `choker`, `collar`, `locket`, `necklace`, `neckwear`, `pendant`, `periapt`, `shard`, `talisman`, `torc`];
        ItemTypes[Item.Bodywear] = [`bodywear`, `corset`, `rags`, `sark`, `shirt`, `skin`, `vest`];
        ItemTypes[Item.Adornment] = [`adornment`, `burnoose`, `cape`, `cloak`, `coat`, `drape`, `frock`, `mantle`, `robe`, `shawl`, `shroud`, `tabard`, `tunic`, `vestment`, `wrap`];
        ItemTypes[Item.Armor] = []
        ItemTypes[Item.Wristband] = [`armband`, `bangle`, `bracelet`, `bracer`, `manacle`, `shackle`, `strap`, `wristband`, `wristlet`];
        ItemTypes[Item.Glove] = [`gage`, `gauntlet`, `glove`, `mitt`];
        ItemTypes[Item.Ring] = [`annulet`, `band`, `circle`, `hoop`, `loop`, `ring`, `roundel`];
        ItemTypes[Item.Belt] = [`belt`, `chain`, `cincture`, `coil`, `cummerbund`, `girdle`, `sarong`, `sash`, `waistband`];
        ItemTypes[Item.Footwear] = [`anklets`, `boots`, `footwear`, `greaves`, `sandals`, `shoes`, `slippers`, `sollerets`];
        ItemTypes[Item.Shield] = [`buckler`, `scutum`, `shield`, `targe`];
        ItemTypes[Item.Weapon] = []
        ItemTypes[Item.Artifact] = [`artifact`, `carving`, `fetish`, `figurine`, `relic`, `remnant`, `statuette`, `totem`];
        ItemTypes[Item.Book] = [`book`, `codex`, `diary`, `grimoire`, `manual`, `notebook`, `tome`, `volume`];
        ItemTypes[Item.Charm] = [`badge`, `brooch`, `charm`, `clasp`, `crest`, `curio`, `emblem`, `medal`, `medallion`, `memento`, `ornament`, `plaque`, `token`, `trinket`];
        ItemTypes[Item.Container] = [`bag`, `barrel`, `bowl`, `box`, `cask`, `chest`, `container`, `crate`, `jar`, `jug`, `pouch`, `purse`, `reservoir`, `satchel`, `urn`, `vessel`];
        ItemTypes[Item.Gem] = [`bead`, `crystal`, `gem`, `gemstone`, `jewel`, `nugget`, `runestone`, `stone`];
        ItemTypes[Item.Ingredient] = [`component`, `compound`, `dust`, `essence`, `herb`, `incense`, `ingredient`, `material`, `powder`, `spice`];
        ItemTypes[Item.Key] = [`hinge`, `key`, `pin`, `plug`];
        ItemTypes[Item.Document] = [`dispatch`, `document`, `letter`, `message`, `note`, `writ`];
        ItemTypes[Item.Potion] = [`concoction`, `decanter`, `draught`, `elixir`, `flask`, `fluid`, `liquid`, `oil`, `ointment`, `poultice`, `potion`, `salve`, `vial`];
        ItemTypes[Item.ReligiousItem] = []
        ItemTypes[Item.Symbol] = [`brand`, `figure`, `glyph`, `icon`, `mark`, `rune`, `seal`, `sigil`, `sign`, `stamp`, `symbol`];
        ItemTypes[Item.Scroll] = [`papyrus`, `parchment`, `roll`, `scrawl`, `scroll`];
        ItemTypes[Item.Wand] = [`baton`, `rod`, `scepter`, `staff`, `verge`, `wand`];

        ArmorTypes[Armor.Cloth] = [`cloth armor`];
        ArmorTypes[Armor.Quilt] = [`quilt armor`];
        ArmorTypes[Armor.Hide] = [`hide armor`];
        ArmorTypes[Armor.Leather] = [`leather armor`];
        ArmorTypes[Armor.Mail] = [`mail armor`];
        ArmorTypes[Armor.Mesh] = [`mesh armor`];
        ArmorTypes[Armor.Plate] = [`plate armor`];

        WeaponTypes[Weapon.Melee] = [`melee weapon`];
        WeaponTypes[Weapon.Ranged] = [`ranged weapon`];

        MeleeWeaponTypes[MeleeWeapon.Sword] = [`bastard sword`, `broadsword`, `claymore`, `cutlass`, `falchion`, `flamberge`, `gladius`, `katana`, `longsword`, `rapier`, `saber`, `scimitar`, `shamshir`, `sword`, `zweihander`];
        MeleeWeaponTypes[MeleeWeapon.Axe] = [`axe`, `battle axe`, `broad axe`, `crescent axe`, `felling axe`, `greataxe`, `hand axe`, `hatchet`, `hunter's axe`, `pickaxe`, `tomahawk`, `viking axe`];
        MeleeWeaponTypes[MeleeWeapon.Hammer] = [`claw hammer`, `dwarven longhammer`, `hammer`, `mallet`, `sledgehammer`, `spiked hammer`, `warhammer`];
        MeleeWeaponTypes[MeleeWeapon.Spear] = [`halberd`, `javelin`, `naginata`, `pike`, `spear`];
        MeleeWeaponTypes[MeleeWeapon.Club] = [`bat`, `baton`, `club`, `ula`];
        MeleeWeaponTypes[MeleeWeapon.Mace] = [`mace`, `morning star`];
        MeleeWeaponTypes[MeleeWeapon.Staff] = [`polearm`, `quarterstaff`, `staff`];

        RangedWeaponTypes[RangedWeapon.Bow] = [`bow`, `composite bow`, `crossbow`, `longbow`, `reflex bow`, `shortbow`];
        RangedWeaponTypes[RangedWeapon.Sling] = [`sling`];
        RangedWeaponTypes[RangedWeapon.Dart] = [`dart`, `nail`, `poisoned dart`, `spike`];
        RangedWeaponTypes[RangedWeapon.ThrowingKnife] = [`throwing axe`, `throwing knife`];
        RangedWeaponTypes[RangedWeapon.ThrowingStar] = [`shuriken`, `throwing star`];

        ReligiousItemTypes[ReligiousItem.Ashes] = [`ashes`, `remains`, `vestiges`];
        ReligiousItemTypes[ReligiousItem.Banner] = [`banner`, `flag`, `pennant`, `streamer`];
        ReligiousItemTypes[ReligiousItem.Bell] = [`angelus`, `bell`, `chime`, `cloche`, `ringer`];
        ReligiousItemTypes[ReligiousItem.Bone] = [`bone`, `fossil`];
        ReligiousItemTypes[ReligiousItem.Bottle] = [`ampule`, `bottle`, `canteen`, `flask`, `phial`];
        ReligiousItemTypes[ReligiousItem.Candle] = [`candle`, `flame`, `tallow`];
        ReligiousItemTypes[ReligiousItem.Censer] = [`censer`, `thurible`];
        ReligiousItemTypes[ReligiousItem.Cord] = [`cord`, `line`, `rope`, `sennit`, `string`];
        ReligiousItemTypes[ReligiousItem.Cross] = [`cross`, `crucifix`];
        ReligiousItemTypes[ReligiousItem.Cube] = [`block`, `cube`, `square`];
        ReligiousItemTypes[ReligiousItem.Cup] = [`cup`, `goblet`, `grail`];
        ReligiousItemTypes[ReligiousItem.Disc] = [`disc`, `oval`, `plate`];
        ReligiousItemTypes[ReligiousItem.Egg] = [`egg`, `ovoid`];
        ReligiousItemTypes[ReligiousItem.Feather] = [`feather`, `quill`];
        ReligiousItemTypes[ReligiousItem.Hand] = [`hand`, `palm`];
        ReligiousItemTypes[ReligiousItem.Heart] = [`corazon`, `heart`, `sacred heart`];
        ReligiousItemTypes[ReligiousItem.Horn] = [`horn`, `shofar`];
        ReligiousItemTypes[ReligiousItem.Lantern] = [`lamp`, `lantern`, `light`];
        ReligiousItemTypes[ReligiousItem.Mirror] = [`looking-glass`, `mirror`, `reflector`, `speculum`];
        ReligiousItemTypes[ReligiousItem.Orb] = [`ball`, `globe`, `orb`];
        ReligiousItemTypes[ReligiousItem.Phylactery] = [`phylactery`, `receptacle`, `tefillin`];
        ReligiousItemTypes[ReligiousItem.Scarab] = [`beetle`, `scarab`];
        ReligiousItemTypes[ReligiousItem.Skull] = [`cranium`, `skull`];
        ReligiousItemTypes[ReligiousItem.Spike] = [`nail`, `peg`, `spike`];
        ReligiousItemTypes[ReligiousItem.Star] = [`pentacle`, `pentagram`, `star`];

        LocationTypes[QuestLocation.Bar] = [`bar`, `bistro`, `lounge`, `pub`, `saloon`, `tavern`];
        LocationTypes[QuestLocation.Barn] = [`barn`, `corral`, `shack`, `shed`, `stable`];
        LocationTypes[QuestLocation.Cave] = [`cave`, `den`, `depths`, `digs`, `grotto`, `mine`, `mines`, `pit`, `pits`, `shaft`, `shafts`, `tunnel`, `tunnels`];
        LocationTypes[QuestLocation.Cemetery] = [`boneyard`, `cemetery`, `golgotha`, `graveyard`, `mausoleum`, `necropolis`, `ossuary`, `tomb`];
        LocationTypes[QuestLocation.Church] = [`cathedral`, `chantry`, `chapel`, `church`, `fane`, `temple`, `monastery`, `tabernacle`];
        LocationTypes[QuestLocation.City] = [`city`, `precinct`, `town`, `village`, `ward`];
        LocationTypes[QuestLocation.Docks] = [`berth`, `docks`, `marina`, `pier`, `port`];
        LocationTypes[QuestLocation.Domicile] = [`domicile`, `estate`, `home`, `house`, `manor`, `mansion`, `residence`];
        LocationTypes[QuestLocation.Dungeon] = [`abyss`, `catacombs`, `caverns`, `chamber`, `crypt`, `den`, `depths`, `dungeon`, `hollows`, `labyrinth`, `lair`, `pit`, `tombs`];
        LocationTypes[QuestLocation.Encampment] = [`camp`, `campsite`, `encampment`, `hamlet`, `thorp`, `waystation`];
        LocationTypes[QuestLocation.Fortress] = [`castle`, `edifice`, `fort`, `fortress`, `guardpost`, `palace`, `tower`, `watchtower`];
        LocationTypes[QuestLocation.Guild] = [`clerics guild`, `fighters guild`, `guild`, `mages guild`, `merchants guild`, `thieves guild`];
        LocationTypes[QuestLocation.Hospital] = [`clinic`, `hospital`, `infirmary`, `wayhouse`];
        LocationTypes[QuestLocation.Inn] = [`arms`, `hostel`, `hotel`, `inn`, `lodge`, `resort`];
        LocationTypes[QuestLocation.Landmark] = []
        LocationTypes[QuestLocation.MagicalArea] = [`magic circle`, `magic portal`, `magical area`, `magical site`];
        LocationTypes[QuestLocation.Repository] = [`cache`, `repository`, `reserve`, `storehouse`, `warehouse`];
        LocationTypes[QuestLocation.Ruins] = [`debris`, `heap`, `rubble`, `ruins`, `waste`, `wreckage`];
        LocationTypes[QuestLocation.School] = [`academy`, `college`, `laboratory`, `library`, `museum`, `school`, `university`];
        LocationTypes[QuestLocation.Shrine] = [`altar`, `reliquary`, `sanctum`, `shrine`];
        LocationTypes[QuestLocation.Store] = [`market`, `shop`, `store`];
        LocationTypes[QuestLocation.Terrain] = []

        LandmarkTypes[Landmark.Arch] = [`arch`, `archway`];
        LandmarkTypes[Landmark.Boulder] = [`boulder`, `rock`];
        LandmarkTypes[Landmark.Bridge] = [`bridge`, `footbridge`];
        LandmarkTypes[Landmark.Dome] = [`dome`];
        LandmarkTypes[Landmark.Fountain] = [`fountain`, `spring`];
        LandmarkTypes[Landmark.Garden] = [`garden`];
        LandmarkTypes[Landmark.Gate] = [`fence`, `gate`];
        LandmarkTypes[Landmark.Gazebo] = [`gazebo`];
        LandmarkTypes[Landmark.Grove] = [`grove`, `orchard`];
        LandmarkTypes[Landmark.Monument] = [`monument`];
        LandmarkTypes[Landmark.Obelisk] = [`obelisk`];
        LandmarkTypes[Landmark.Platform] = [`platform`, `stand`];
        LandmarkTypes[Landmark.Pool] = [`pond`, `pool`];
        LandmarkTypes[Landmark.Sculpture] = [`artwork`, `sculpture`];
        LandmarkTypes[Landmark.Signpost] = [`signpost`];
        LandmarkTypes[Landmark.Statue] = [`statue`];
        LandmarkTypes[Landmark.Tree] = [`branches`, `tree`];
        LandmarkTypes[Landmark.Wall] = [`fence`, `wall`];
        LandmarkTypes[Landmark.Well] = [`well`];

        TerrainTypes[Terrain.Local] = []
        TerrainTypes[Terrain.Aquatic] = [`brine`, `deluge`, `drench`, `drink`, `eddy`, `flood`, `flush`, `fountain`, `gulp`, `pool`, `puddle`, `pump`, `rain`, `ripple`, `sink`, `sluice`, `splash`, `spray`, `spring`, `surge`, `swell`, `tears`, `tide`, `wash`, `water`, `well`];
        TerrainTypes[Terrain.Plains] = [`basin`, `country`, `downs`, `earth`, `expanse`, `field`, `fields`, `flatland`, `frontier`, `glen`, `grassland`, `grounds`, `heath`, `lands`, `meadow`, `moor`, `pasture`, `plains`, `plateau`, `prairie`, `rangeland`, `savanna`, `spread`, `steppe`, `turf`, `veld`];
        TerrainTypes[Terrain.Desert] = [`badlands`, `desert`, `drought`, `dunes`, `dust`, `emptiness`, `flats`, `lowlands`, `ruin`, `sand`, `tract`, `valley`, `void`, `waste`, `wasteland`, `wilderness`, `zone`];
        TerrainTypes[Terrain.Forest] = [`branches`, `forest`, `glade`, `grove`, `jungle`, `leaves`, `sticks`, `thicket`, `timber`, `timberland`, `trees`, `trunks`, `wildwood`, `wood`, `woodland`, `woods`];
        TerrainTypes[Terrain.Wetlands] = [`bayou`, `bog`, `carr`, `dambo`, `demise`, `everglades`, `fen`, `hole`, `mangal`, `marsh`, `mire`, `morass`, `moss`, `mud`, `muskeg`, `pit`, `pocosin`, `quagmire`, `slough`, `slush`, `swamp`, `trap`, `weeds`, `wetland`, `wetlands`];
        TerrainTypes[Terrain.Hills] = [`arches`, `drifts`, `foothills`, `headlands`, `heights`, `highlands`, `hike`, `hills`, `knolls`, `mesa`, `mounds`, `outlook`, `rise`, `slopes`, `steeps`, `terrain`, `uplands`];
        TerrainTypes[Terrain.Mountains] = [`alps`, `apex`, `bluffs`, `butte`, `cliffs`, `climb`, `cordillera`, `crags`, `crests`, `divide`, `domes`, `mountains`, `peaks`, `pillars`, `points`, `range`, `ridge`, `rocks`, `spine`, `spires`, `summit`, `teeth`, `towers`, `wall`, `zenith`];
        TerrainTypes[Terrain.Underground] = [`abyss`, `catacombs`, `caverns`, `caves`, `crypt`, `depths`, `digs`, `dungeon`, `hollows`, `keep`, `labyrinth`, `lair`, `mines`, `pits`, `shafts`, `tunnels`, `underground`];

        MaleNames = [`aaron`, `adrian`, `alton`, `andrew`, `anthony`, `aramil`, `aust`, `barendd`, `bartholomew`, `beau`, `boddynock`, `boris`, `bradley`, `brandon`, `brian`, `brottor`, `cade`, `carl`, `cecil`, `charles`, `christopher`, `clifford`, `craig`, `daniel`, `darren`, `darryl`, `david`, `dench`, `dimble`, `donald`, `donovan`, `eberk`, `edward`, `einkil`, `eldon`, `enialis`, `eric`, `ezekiel`, `fen`, `feng`, `fonkin`, `frank`, `frederic`, `gabriel`, `garret`, `gary`, `gell`, `george`, `gerbo`, `glen`, `glim`, `gordon`, `graham`, `grant`, `gregory`, `harold`, `heian`, `henk`, `henry`, `himo`, `holg`, `imsh`, `isaac`, `ivan`, `ivellios`, `james`, `jason`, `jebeddo`, `jeffery`, `jeremiah`, `jonathan`, `jordan`, `joseph`, `joshua`, `kenneth`, `keth`, `kevin`, `kieth`, `kirk`, `laucian`, `leonard`, `luke`, `lyle`, `marcus`, `martin`, `matthew`, `maxwell`, `michael`, `milo`, `namfoodle`, `nathaniel`, `oliver`, `osborn`, `oscar`, `paul`, `peter`, `philip`, `quarion`, `quincy`, `rex`, `richard`, `robert`, `ronald`, `ront`, `roondar`, `roscoe`, `rupert`, `rurik`, `scott`, `seebo`, `shump`, `simon`, `spencer`, `stephen`, `taklinn`, `thadeus`, `thamior`, `tharivol`, `thokk`, `thomas`, `timothy`, `traubon`, `ulfgar`, `veit`, `victor`, `wellby`, `william`, `xavier`, `zachariah`, `zeke`, `zook`];
        MaleNamesLength = MaleNames.length;
        FemaleNames = [`alison`, `amanda`, `amaryllis`, `amber`, `amy`, `anastrianna`, `andrea`, `angela`, `anna`, `antinua`, `artin`, `audhild`, `baggi`, `barbara`, `bimpnottin`, `brenda`, `briana`, `candice`, `caramip`, `caroline`, `cathleen`, `charmaine`, `christina`, `claire`, `constance`, `cora`, `cynthia`, `dagnal`, `deborah`, `dianna`, `diesa`, `donna`, `dorothy`, `drusilia`, `duvamil`, `eleanor`, `elizabeth`, `ellen`, `ellyjobell`, `ellywick`, `emen`, `engong`, `erin`, `euphemia`, `felosial`, `francine`, `gabrielle`, `grace`, `gunnload`, `gwenevere`, `heather`, `helen`, `hlin`, `ielenia`, `ilde`, `irene`, `janet`, `jennifer`, `jessica`, `jillian`, `joana`, `karen`, `katherine`, `kimberly`, `laura`, `laurel`, `lauren`, `lavinia`, `leslie`, `lia`, `liftrasa`, `linda`, `lisa`, `loopmottin`, `lydia`, `mardnab`, `margaret`, `martha`, `mary`, `melissa`, `merla`, `michelle`, `monica`, `myev`, `nancy`, `natalie`, `neega`, `ophelia`, `ovak`, `ownka`, `paige`, `pamela`, `patricia`, `portia`, `qillathe`, `rebecca`, `regina`, `roywyn`, `ruth`, `sandra`, `sannl`, `sarah`, `sasha`, `seraphina`, `shamil`, `sharon`, `shautha`, `silaqui`, `stephanie`, `susan`, `tiffany`, `torgga`, `valanthe`, `vanessa`, `verna`, `victoria`, `vola`, `volen`, `wanda`, `waywocket`, `xanaphia`, `yolanda`, `zoe`];
        FemaleNamesLength = FemaleNames.length;
        Surnames = [`amakiir`, `amastacia`, `anderson`, `axel`, `balderk`, `beren`, `billings`, `boren`, `brown`, `brunson`, `brushgather`, `campbell`, `clark`, `cobbler`, `cooper`, `daergel`, `dankil`, `davis`, `diamond`, `draper`, `eaton`, `evans`, `fenton`, `fisher`, `folkor`, `forrest`, `frost`, `galanodel`, `garrick`, `gibson`, `goodbarrel`, `gorunn`, `greenbottle`, `harris`, `highhill`, `hilltopple`, `holderhek`, `holimion`, `hollis`, `ilphukiir`, `ingalls`, `ingram`, `jackson`, `johnson`, `jones`, `kilpatrick`, `king`, `kirk`, `kline`, `knight`, `laferte`, `leagallow`, `leof`, `lewis`, `liadon`, `loderr`, `lutgehr`, `macleod`, `martin`, `meliamne`, `miller`, `milrad`, `milton`, `monroe`, `moore`, `murnig`, `nackle`, `nailo`, `ningel`, `noble`, `norlin`, `oaks`, `ogden`, `olsen`, `o'neill`, `parson`, `piper`, `politte`, `potter`, `pratt`, `prince`, `raulnor`, `richards`, `robinson`, `rumnaheim`, `scheppen`, `siannodel`, `smith`, `strakeln`, `sullivan`, `tanner`, `taylor`, `tealeaf`, `thomas`, `thompson`, `thorngage`, `torunn`, `tosscobble`, `turen`, `underbough`, `ungart`, `vanderbilt`, `vaughn`, `velvet`, `watts`, `white`, `williams`, `wilson`, `wolf`, `xiloscient`, `yard`, `yarrow`, `young`, `zanders`, `zane`, `zimmerman`];
        SurnamesLength = Surnames.length;

        NameParts = [
            `ab`, `ac`, `ad`, `af`, `ag`, `ah`, `ak`, `al`, `am`, `an`, `ap`, `ar`, `as`, `at`, `av`, `aw`, `ax`, `ay`, `az`, `bab`, `bac`, `bad`, `baf`, `bag`, `bah`, `bak`, `bal`, `bam`, `ban`, `bap`, `bar`, `bas`, `bat`, `bav`, `baw`, `bax`, `bay`, `baz`, `beb`, `bec`, `bed`, `bef`, `beg`, `beh`, `bek`, `bel`, `bem`, `ben`, `bep`, `ber`, `bes`, `bet`, `bev`, `bew`, `bex`, `bey`, `bez`, `bib`, `bic`, `bid`, `bif`, `big`, `bih`, `bik`, `bil`, `bim`, `bin`,
            `bip`, `bir`, `bis`, `bit`, `biv`, `biw`, `bix`, `biy`, `biz`, `bob`, `boc`, `bod`, `bog`, `boh`, `bok`, `bol`, `bom`, `bon`, `bop`, `bor`, `bos`, `bot`, `bov`, `bow`, `box`, `boy`, `boz`, `bub`, `buc`, `bud`, `buf`, `bug`, `buh`, `buk`, `bul`, `bum`, `bun`, `bup`, `bur`, `bus`, `but`, `buv`, `buw`, `bux`, `buy`, `buz`, `cab`, `cac`, `cad`, `caf`, `cag`, `cah`, `cak`, `cal`, `cam`, `can`, `cap`, `car`, `cas`, `cat`, `cav`, `caw`, `cax`,
            `cay`, `caz`, `ceb`, `cec`, `ced`, `cef`, `ceg`, `ceh`, `cek`, `cel`, `cem`, `cen`, `cep`, `cer`, `ces`, `cet`, `cev`, `cew`, `cex`, `cey`, `cez`, `cib`, `cic`, `cid`, `cif`, `cig`, `cih`, `cik`, `cil`, `cim`, `cin`, `cip`, `cir`, `cis`, `cit`, `civ`, `ciw`, `cix`, `ciy`, `ciz`, `cob`, `cod`, `cof`, `cog`, `coh`, `col`, `com`, `con`, `cop`, `cor`, `cos`, `cot`, `cov`, `cow`, `coy`, `coz`, `cub`, `cuc`, `cud`, `cuf`, `cug`,
            `cuh`, `cuk`, `cul`, `cup`, `cur`, `cus`, `cut`, `cuv`, `cuw`, `cux`, `cuy`, `cuz`, `dab`, `dac`, `dad`, `daf`, `dag`, `dah`, `dak`, `dal`, `dam`, `dan`, `dap`, `dar`, `das`, `dat`, `dav`, `daw`, `dax`, `day`, `daz`, `deb`, `dec`, `ded`, `def`, `deg`, `deh`, `dek`, `del`, `dem`, `den`, `dep`, `der`, `des`, `det`, `dev`, `dew`, `dex`, `dey`, `dez`, `dib`, `did`, `dif`, `dig`, `dih`, `dil`, `dim`, `din`, `dip`, `dir`,
            `dis`, `dit`, `div`, `diw`, `diy`, `diz`, `dob`, `doc`, `dod`, `dof`, `dog`, `doh`, `dok`, `dol`, `dom`, `don`, `dop`, `dor`, `dos`, `dot`, `dov`, `dow`, `dox`, `doy`, `doz`, `dub`, `duc`, `dud`, `duf`, `dug`, `duh`, `duk`, `dul`, `dum`, `dun`, `dup`, `dur`, `dus`, `dut`, `duv`, `duw`, `dux`, `duy`, `duz`, `eb`, `ec`, `ed`, `ef`, `eg`, `eh`, `ek`, `el`, `em`, `en`, `ep`, `er`, `es`, `et`, `ev`, `ew`, `ex`, `ey`, `ez`, `fab`, `fac`, `fad`,
            `faf`, `fah`, `fak`, `fal`, `fam`, `fan`, `fap`, `far`, `fas`, `fat`, `fav`, `faw`, `fax`, `fay`, `faz`, `feb`, `fec`, `fed`, `fef`, `feg`, `feh`, `fek`, `fel`, `fem`, `fen`, `fep`, `fer`, `fes`, `fet`, `fev`, `few`, `fex`, `fey`, `fez`, `fib`, `fic`, `fid`, `fif`, `fig`, `fih`, `fik`, `fil`, `fim`, `fin`, `fip`, `fir`, `fis`, `fit`, `fiv`, `fiw`, `fix`, `fiy`, `fiz`, `fob`, `foc`, `fod`, `fof`, `fog`, `foh`, `fok`, `fol`, `fom`, `fon`,
            `fop`, `for`, `fos`, `fot`, `fov`, `fow`, `fox`, `foy`, `foz`, `fub`, `fud`, `fuf`, `fug`, `fuh`, `ful`, `fum`, `fun`, `fup`, `fur`, `fus`, `fut`, `fuv`, `fuw`, `fuy`, `fuz`, `gab`, `gac`, `gad`, `gaf`, `gag`, `gah`, `gak`, `gal`, `gam`, `gan`, `gap`, `gar`, `gas`, `gat`, `gav`, `gaw`, `gax`, `gay`, `gaz`, `geb`, `gec`, `ged`, `gef`, `geg`, `geh`, `gek`, `gel`, `gem`, `gen`, `gep`, `ger`, `ges`, `get`, `gev`, `gew`, `gex`,
            `gey`, `gez`, `gib`, `gic`, `gid`, `gif`, `gig`, `gih`, `gik`, `gil`, `gim`, `gin`, `gip`, `gir`, `gis`, `git`, `giv`, `giw`, `gix`, `giy`, `giz`, `gob`, `goc`, `god`, `gof`, `gog`, `goh`, `gok`, `gol`, `gom`, `gon`, `gop`, `gor`, `gos`, `got`, `gov`, `gow`, `gox`, `goy`, `goz`, `gub`, `guc`, `gud`, `guf`, `gug`, `guh`, `guk`, `gul`, `gum`, `gun`, `gup`, `gur`, `gus`, `gut`, `guv`, `guw`, `gux`, `guy`, `guz`, `hab`, `hac`, `had`, `haf`, `hag`,
            `hah`, `hak`, `hal`, `ham`, `han`, `hap`, `har`, `has`, `hat`, `hav`, `haw`, `hax`, `hay`, `haz`, `heb`, `hec`, `hed`, `hef`, `heg`, `heh`, `hek`, `hel`, `hem`, `hen`, `hep`, `her`, `hes`, `het`, `hev`, `hew`, `hex`, `hey`, `hez`, `hib`, `hic`, `hid`, `hif`, `hig`, `hih`, `hik`, `hil`, `him`, `hin`, `hip`, `hir`, `his`, `hit`, `hiv`, `hiw`, `hix`, `hiy`, `hiz`, `hob`, `hoc`, `hod`, `hof`, `hog`, `hoh`, `hok`, `hol`, `hom`, `hon`, `hop`, `hor`,
            `hos`, `hot`, `hov`, `how`, `hox`, `hoy`, `hoz`, `hub`, `huc`, `hud`, `huf`, `hug`, `huh`, `huk`, `hul`, `hum`, `hun`, `hup`, `hur`, `hus`, `hut`, `huv`, `huw`, `hux`, `huy`, `huz`, `ib`, `ic`, `id`, `if`, `ig`, `ih`, `ik`, `il`, `im`, `in`, `ip`, `ir`, `is`, `it`, `iv`, `iw`, `ix`, `iy`, `iz`, `kab`, `kac`, `kad`, `kaf`, `kag`, `kah`, `kak`, `kal`, `kam`, `kan`, `kap`, `kar`, `kas`, `kat`, `kav`, `kaw`, `kax`, `kay`, `kaz`, `keb`, `kec`, `ked`,
            `kef`, `keg`, `keh`, `kek`, `kel`, `kem`, `ken`, `kep`, `ker`, `kes`, `ket`, `kev`, `kew`, `kex`, `key`, `kez`, `kib`, `kic`, `kid`, `kif`, `kig`, `kih`, `kik`, `kil`, `kim`, `kin`, `kip`, `kir`, `kis`, `kit`, `kiv`, `kiw`, `kix`, `kiy`, `kiz`, `kob`, `koc`, `kod`, `kof`, `kog`, `koh`, `kok`, `kol`, `kom`, `kon`, `kop`, `kor`, `kos`, `kot`, `kov`, `kow`, `kox`, `koy`, `koz`, `kub`, `kuc`, `kud`, `kuf`, `kug`, `kuh`, `kuk`, `kul`, `kum`, `kun`,
            `kup`, `kur`, `kus`, `kut`, `kuv`, `kuw`, `kux`, `kuy`, `kuz`, `lab`, `lac`, `lad`, `laf`, `lag`, `lah`, `lak`, `lal`, `lam`, `lan`, `lap`, `lar`, `las`, `lat`, `lav`, `law`, `lax`, `lay`, `laz`, `leb`, `lec`, `led`, `lef`, `leg`, `leh`, `lek`, `lel`, `lem`, `len`, `lep`, `ler`, `les`, `let`, `lev`, `lew`, `lex`, `ley`, `lez`, `lib`, `lic`, `lid`, `lif`, `lig`, `lih`, `lik`, `lil`, `lim`, `lin`, `lip`, `lir`, `lis`, `lit`, `liv`, `liw`, `lix`,
            `liy`, `liz`, `lob`, `loc`, `lod`, `lof`, `log`, `loh`, `lok`, `lol`, `lom`, `lon`, `lop`, `lor`, `los`, `lot`, `lov`, `low`, `lox`, `loy`, `loz`, `lub`, `luc`, `lud`, `luf`, `lug`, `luh`, `luk`, `lul`, `lum`, `lun`, `lup`, `lur`, `lus`, `lut`, `luv`, `luw`, `lux`, `luy`, `luz`, `mab`, `mac`, `mad`, `maf`, `mag`, `mah`, `mak`, `mal`, `mam`, `man`, `map`, `mar`, `mas`, `mat`, `mav`, `maw`, `max`, `may`, `maz`, `meb`, `mec`, `med`, `mef`, `meg`,
            `meh`, `mek`, `mel`, `mem`, `men`, `mep`, `mer`, `mes`, `met`, `mev`, `mew`, `mex`, `mey`, `mez`, `mib`, `mic`, `mid`, `mif`, `mig`, `mih`, `mik`, `mil`, `mim`, `min`, `mip`, `mir`, `mis`, `mit`, `miv`, `miw`, `mix`, `miy`, `miz`, `mob`, `moc`, `mod`, `mof`, `mog`, `moh`, `mok`, `mol`, `mom`, `mon`, `mop`, `mor`, `mos`, `mot`, `mov`, `mow`, `mox`, `moy`, `moz`, `mub`, `muc`, `mud`, `muf`, `mug`, `muh`, `muk`, `mul`, `mum`, `mun`, `mup`, `mur`,
            `mus`, `mut`, `muv`, `muw`, `mux`, `muy`, `muz`, `nab`, `nac`, `nad`, `naf`, `nag`, `nah`, `nak`, `nal`, `nam`, `nan`, `nap`, `nar`, `nas`, `nat`, `nav`, `naw`, `nax`, `nay`, `naz`, `neb`, `nec`, `ned`, `nef`, `neg`, `neh`, `nek`, `nel`, `nem`, `nen`, `nep`, `ner`, `nes`, `net`, `nev`, `new`, `nex`, `ney`, `nez`, `nib`, `nic`, `nid`, `nif`, `nih`, `nik`, `nil`, `nim`, `nin`, `nip`, `nir`, `nis`, `nit`, `niv`, `niw`, `nix`, `niy`, `niz`,
            `nob`, `noc`, `nod`, `nof`, `nog`, `noh`, `nok`, `nol`, `nom`, `non`, `nop`, `nor`, `nos`, `not`, `nov`, `now`, `nox`, `noy`, `noz`, `nub`, `nuc`, `nud`, `nuf`, `nug`, `nuh`, `nuk`, `nul`, `num`, `nun`, `nup`, `nur`, `nus`, `nut`, `nuv`, `nuw`, `nux`, `nuy`, `nuz`, `ob`, `oc`, `od`, `of`, `og`, `oh`, `ok`, `ol`, `om`, `on`, `op`, `or`, `os`, `ot`, `ov`, `ow`, `ox`, `oy`, `oz`, `pab`, `pac`, `pad`, `paf`, `pag`, `pah`, `pak`, `pal`, `pam`, `pan`,
            `pap`, `par`, `pas`, `pat`, `pav`, `paw`, `pax`, `pay`, `paz`, `peb`, `pec`, `ped`, `pef`, `peg`, `peh`, `pek`, `pel`, `pem`, `pen`, `pep`, `per`, `pes`, `pet`, `pev`, `pew`, `pex`, `pey`, `pez`, `pib`, `pic`, `pid`, `pif`, `pig`, `pih`, `pik`, `pil`, `pim`, `pin`, `pip`, `pir`, `pis`, `pit`, `piv`, `piw`, `pix`, `piy`, `piz`, `pob`, `poc`, `pod`, `pof`, `pog`, `poh`, `pok`, `pol`, `pom`, `pon`, `pop`, `por`, `pos`, `pot`, `pov`, `pow`, `pox`,
            `poy`, `poz`, `pub`, `puc`, `pud`, `puf`, `pug`, `puh`, `puk`, `pul`, `pum`, `pun`, `pup`, `pur`, `pus`, `put`, `puv`, `puw`, `pux`, `puy`, `puz`, `rab`, `rac`, `rad`, `raf`, `rag`, `rah`, `rak`, `ral`, `ram`, `ran`, `rap`, `rar`, `ras`, `rat`, `rav`, `raw`, `rax`, `ray`, `raz`, `reb`, `rec`, `red`, `ref`, `reg`, `reh`, `rek`, `rel`, `rem`, `ren`, `rep`, `rer`, `res`, `ret`, `rev`, `rew`, `rex`, `rey`, `rez`, `rib`, `ric`, `rid`, `rif`, `rig`,
            `rih`, `rik`, `ril`, `rim`, `rin`, `rip`, `rir`, `ris`, `rit`, `riv`, `riw`, `rix`, `riy`, `riz`, `rob`, `roc`, `rod`, `rof`, `rog`, `roh`, `rok`, `rol`, `rom`, `ron`, `rop`, `ror`, `ros`, `rot`, `rov`, `row`, `rox`, `roy`, `roz`, `rub`, `ruc`, `rud`, `ruf`, `rug`, `ruh`, `ruk`, `rul`, `rum`, `run`, `rup`, `rur`, `rus`, `rut`, `ruv`, `ruw`, `rux`, `ruy`, `ruz`, `sab`, `sac`, `sad`, `saf`, `sag`, `sah`, `sak`, `sal`, `sam`, `san`, `sap`, `sar`,
            `sas`, `sat`, `sav`, `saw`, `sax`, `say`, `saz`, `seb`, `sec`, `sed`, `sef`, `seg`, `seh`, `sek`, `sel`, `sem`, `sen`, `sep`, `ser`, `ses`, `set`, `sev`, `sew`, `sex`, `sey`, `sez`, `sib`, `sic`, `sid`, `sif`, `sig`, `sih`, `sik`, `sil`, `sim`, `sin`, `sip`, `sir`, `sis`, `sit`, `siv`, `siw`, `six`, `siy`, `siz`, `sob`, `soc`, `sod`, `sof`, `sog`, `soh`, `sok`, `sol`, `som`, `son`, `sop`, `sor`, `sos`, `sot`, `sov`, `sow`, `sox`, `soy`, `soz`,
            `sub`, `suc`, `sud`, `suf`, `sug`, `suh`, `suk`, `sul`, `sum`, `sun`, `sup`, `sur`, `sus`, `sut`, `suv`, `suw`, `sux`, `suy`, `suz`, `tab`, `tac`, `tad`, `taf`, `tag`, `tah`, `tak`, `tal`, `tam`, `tan`, `tap`, `tar`, `tas`, `tat`, `tav`, `taw`, `tax`, `tay`, `taz`, `teb`, `tec`, `ted`, `tef`, `teg`, `teh`, `tek`, `tel`, `tem`, `ten`, `tep`, `ter`, `tes`, `tet`, `tev`, `tew`, `tex`, `tey`, `tez`, `tib`, `tic`, `tid`, `tif`, `tig`, `tih`, `tik`,
            `til`, `tim`, `tin`, `tip`, `tir`, `tis`, `tit`, `tiv`, `tiw`, `tix`, `tiy`, `tiz`, `tob`, `toc`, `tod`, `tof`, `tog`, `toh`, `tok`, `tol`, `tom`, `ton`, `top`, `tor`, `tos`, `tot`, `tov`, `tow`, `tox`, `toy`, `toz`, `tub`, `tuc`, `tud`, `tuf`, `tug`, `tuh`, `tuk`, `tul`, `tum`, `tun`, `tup`, `tur`, `tus`, `tut`, `tuv`, `tuw`, `tux`, `tuy`, `tuz`, `ub`, `uc`, `ud`, `uf`, `ug`, `uh`, `uk`, `ul`, `um`, `un`, `up`, `ur`, `us`, `ut`, `uv`, `uw`,
            `ux`, `uy`, `uz`, `vab`, `vac`, `vad`, `vaf`, `vag`, `vah`, `vak`, `val`, `vam`, `van`, `vap`, `var`, `vas`, `vat`, `vav`, `vaw`, `vax`, `vay`, `vaz`, `veb`, `vec`, `ved`, `vef`, `veg`, `veh`, `vek`, `vel`, `vem`, `ven`, `vep`, `ver`, `ves`, `vet`, `vev`, `vew`, `vex`, `vey`, `vez`, `vib`, `vic`, `vid`, `vif`, `vig`, `vih`, `vik`, `vil`, `vim`, `vin`, `vip`, `vir`, `vis`, `vit`, `viv`, `viw`, `vix`, `viy`, `viz`, `vob`, `voc`, `vod`, `vof`,
            `vog`, `voh`, `vok`, `vol`, `vom`, `von`, `vop`, `vor`, `vos`, `vot`, `vov`, `vow`, `vox`, `voy`, `voz`, `vub`, `vuc`, `vud`, `vuf`, `vug`, `vuh`, `vuk`, `vul`, `vum`, `vun`, `vup`, `vur`, `vus`, `vut`, `vuv`, `vuw`, `vux`, `vuy`, `vuz`, `wab`, `wac`, `wad`, `waf`, `wag`, `wah`, `wak`, `wal`, `wam`, `wan`, `wap`, `war`, `was`, `wat`, `wav`, `waw`, `wax`, `way`, `waz`, `web`, `wec`, `wed`, `wef`, `weg`, `weh`, `wek`, `wel`, `wem`, `wen`, `wep`,
            `wer`, `wes`, `wet`, `wev`, `wew`, `wex`, `wey`, `wez`, `wib`, `wic`, `wid`, `wif`, `wig`, `wih`, `wik`, `wil`, `wim`, `win`, `wip`, `wir`, `wis`, `wit`, `wiv`, `wiw`, `wix`, `wiy`, `wiz`, `wob`, `woc`, `wod`, `wof`, `wog`, `woh`, `wok`, `wol`, `wom`, `won`, `wop`, `wor`, `wos`, `wot`, `wov`, `wow`, `wox`, `woy`, `woz`, `wub`, `wuc`, `wud`, `wuf`, `wug`, `wuh`, `wuk`, `wul`, `wum`, `wun`, `wup`, `wur`, `wus`, `wut`, `wuv`, `wuw`, `wux`, `wuy`,
            `wuz`, `xab`, `xac`, `xad`, `xaf`, `xag`, `xah`, `xak`, `xal`, `xam`, `xan`, `xap`, `xar`, `xas`, `xat`, `xav`, `xaw`, `xax`, `xay`, `xaz`, `xeb`, `xec`, `xed`, `xef`, `xeg`, `xeh`, `xek`, `xel`, `xem`, `xen`, `xep`, `xer`, `xes`, `xet`, `xev`, `xew`, `xex`, `xey`, `xez`, `xib`, `xic`, `xid`, `xif`, `xig`, `xih`, `xik`, `xil`, `xim`, `xin`, `xip`, `xir`, `xis`, `xit`, `xiv`, `xiw`, `xix`, `xiy`, `xiz`, `xob`, `xoc`, `xod`, `xof`, `xog`, `xoh`,
            `xok`, `xol`, `xom`, `xon`, `xop`, `xor`, `xos`, `xot`, `xov`, `xow`, `xox`, `xoy`, `xoz`, `xub`, `xuc`, `xud`, `xuf`, `xug`, `xuh`, `xuk`, `xul`, `xum`, `xun`, `xup`, `xur`, `xus`, `xut`, `xuv`, `xuw`, `xux`, `xuy`, `xuz`, `yab`, `yac`, `yad`, `yaf`, `yag`, `yah`, `yak`, `yal`, `yam`, `yan`, `yap`, `yar`, `yas`, `yat`, `yav`, `yaw`, `yax`, `yay`, `yaz`, `yeb`, `yec`, `yed`, `yef`, `yeg`, `yeh`, `yek`, `yel`, `yem`, `yen`, `yep`, `yer`, `yes`,
            `yet`, `yev`, `yew`, `yex`, `yez`, `yib`, `yic`, `yid`, `yif`, `yig`, `yih`, `yik`, `yil`, `yim`, `yin`, `yip`, `yir`, `yis`, `yit`, `yiv`, `yiw`, `yix`, `yiy`, `yiz`, `yob`, `yoc`, `yod`, `yof`, `yog`, `yoh`, `yok`, `yol`, `yom`, `yon`, `yop`, `yor`, `yos`, `yot`, `yov`, `yow`, `yox`, `yoy`, `yoz`, `yub`, `yuc`, `yud`, `yuf`, `yug`, `yuh`, `yuk`, `yul`, `yum`, `yun`, `yup`, `yur`, `yus`, `yut`, `yuv`, `yuw`, `yux`, `yuy`, `yuz`, `zab`,
            `zac`, `zad`, `zaf`, `zag`, `zah`, `zak`, `zal`, `zam`, `zan`, `zap`, `zar`, `zas`, `zat`, `zav`, `zaw`, `zax`, `zay`, `zaz`, `zeb`, `zec`, `zed`, `zef`, `zeg`, `zeh`, `zek`, `zel`, `zem`, `zen`, `zep`, `zer`, `zes`, `zet`, `zev`, `zew`, `zex`, `zey`, `zez`, `zib`, `zic`, `zid`, `zif`, `zig`, `zih`, `zik`, `zil`, `zim`, `zin`, `zip`, `zir`, `zis`, `zit`, `ziv`, `ziw`, `zix`, `ziy`, `ziz`, `zob`, `zoc`, `zod`, `zof`, `zog`, `zoh`, `zok`, `zol`,
            `zom`, `zon`, `zop`, `zor`, `zos`, `zot`, `zov`, `zow`, `zox`, `zoy`, `zoz`, `zub`, `zuc`, `zud`, `zuf`, `zug`, `zuh`, `zuk`, `zul`, `zum`, `zun`, `zup`, `zur`, `zus`, `zut`, `zuv`, `zuw`, `zux`, `zuy`, `zuz`
        ];
        PersonPrefixParts = NameParts;
        PersonSuffixParts = NameParts;

        PlaceParts = [
            `acid`, `after`, `age`, `aid`, `air`, `ale`, `angel`, `apple`, `arch`, `arm`, `arrow`, `art`, `ash`, `autumn`, `axe`, `back`, `bad`, `badge`, `bald`, `ball`, `bank`, `bar`, `bare`, `bark`, `barrel`, `barrow`, `basket`, `bass`, `battle`, `bean`, `bear`, `beast`, `beauty`, `bee`, `beer`, `best`, `big`, `bird`, `bitter`, `black`, `blade`, `blank`, `blind`,
            `blood`, `blue`, `bluff`, `boar`, `board`, `boat`, `body`, `bold`, `bone`, `book`, `boot`, `bottle`, `bottom`, `boulder`, `bound`, `bow`, `bowl`, `box`, `boy`, `brag`, `branch`, `brand`, `brass`, `breach`, `bread`, `break`, `breeze`, `brew`, `brick`, `bride`, `bridge`, `bright`, `brine`, `brisk`, `broad`, `broke`, `broken`, `bronze`, `brook`, `brother`, `brown`, `brush`, `bucket`, `buckle`, `bug`,
            `bull`, `burn`, `bush`, `button`, `cage`, `calm`, `camp`, `candle`, `cap`, `cape`, `card`, `cash`, `castle`, `cat`, `cave`, `cell`, `center`, `certain`, `chain`, `chamber`, `change`, `charm`, `cheer`, `cheese`, `cherry`, `chess`, `chest`, `chief`, `child`, `chime`, `chip`, `church`, `cider`, `clan`, `clear`, `cliff`, `cloak`, `clock`, `close`, `cloth`, `cloud`, `club`, `coal`, `coat`, `coil`,
            `coin`, `cold`, `cool`, `copper`, `cord`, `core`, `cork`, `corn`, `corner`, `count`, `country`, `court`, `cow`, `craft`, `crag`, `crank`, `crash`, `crate`, `creek`, `creep`, `crime`, `cross`, `crow`, `crown`, `cry`, `crypt`, `cube`, `cup`, `dagger`, `dam`, `damp`, `dank`, `dark`, `dawn`, `day`, `dead`, `deep`, `demon`, `dew`, `diamond`, `dire`, `ditch`, `dock`, `dog`, `doll`, `dome`, `door`, `double`,
            `down`, `draft`, `drag`, `dragon`, `dread`, `dream`, `drift`, `drink`, `drop`, `drought`, `druid`, `drunk`, `dry`, `duck`, `dull`, `dumb`, `dune`, `dungeon`, `dunk`, `dusk`, `dust`, `dwarf`, `eagle`, `earth`, `east`, `easy`, `edge`, `egg`, `eight`, `elf`, `elm`, `empty`, `ever`, `fair`, `fairy`, `faith`, `fake`, `fall`, `false`, `fan`, `fancy`, `fang`, `far`, `farm`, `fast`, `fat`, `father`, `fawn`, `feather`, `feed`, `fell`, `fen`, `fence`, `fest`,
            `feud`, `field`, `fight`, `fill`, `final`, `find`, `fine`, `finger`, `fire`, `first`, `fish`, `five`, `flag`, `flame`, `flask`, `flat`, `fleece`, `flood`, `floor`, `flower`, `fly`, `fog`, `foil`, `fold`, `folk`, `food`, `fool`, `fools`, `foot`, `fore`, `fork`, `fort`, `fountain`, `four`, `fourth`, `fox`, `frail`, `frank`, `free`, `friend`, `frog`, `front`, `frost`, `froth`, `fruit`, `full`, `fun`, `gallow`, `game`, `garden`, `gash`, `gate`, `gem`, `ghost`, `giant`, `gift`, `gin`, `girl`, `glad`, `glade`,
            `glass`, `glen`, `glory`, `glove`, `glow`, `glyph`, `gnome`, `goat`, `god`, `gold`, `good`, `goose`, `grail`, `grain`, `grand`, `grape`, `grass`, `grave`, `great`, `green`, `grey`, `grind`, `groom`, `ground`, `grove`, `guard`, `gulp`, `hag`, `hail`, `hair`, `half`, `hall`, `hallow`, `hammer`, `hand`, `happy`, `hard`, `harsh`, `hat`, `haul`, `haven`, `head`, `health`, `heart`, `hearth`, `heaven`, `hedge`, `height`,
            `helm`, `herb`, `hide`, `high`, `hike`, `hill`, `hive`, `hog`, `hole`, `hollow`, `home`, `honey`, `honor`, `hood`, `hook`, `hoop`, `horn`, `horse`, `host`, `hot`, `house`, `howl`, `hub`, `hunt`, `husk`, `ice`, `ill`, `imp`, `inn`, `inner`, `iron`, `isle`, `jack`, `jag`, `jar`, `jester`, `jewel`, `jig`, `joy`, `judge`, `jump`, `junk`, `just`, `key`, `kid`, `kill`, `kind`, `king`, `kiss`, `kite`, `knife`, `knight`, `knoll`, `knot`, `lace`, `ladder`, `lady`, `lair`, `lake`, `lamp`, `lance`, `land`, `large`,
            `last`, `late`, `laugh`, `law`, `lead`, `leaf`, `leap`, `left`, `leg`, `lift`, `light`, `lime`, `line`, `lock`, `lode`, `log`, `long`, `look`, `loop`, `loose`, `lord`, `lore`, `love`, `low`, `lower`, `mace`, `mad`, `mage`, `magic`, `maid`, `maiden`, `mail`, `main`, `make`, `man`, `mane`, `manor`, `march`, `mare`, `mark`, `marsh`, `mask`, `mate`, `meadow`, `mean`, `meat`, `meek`, `mercy`, `merry`, `mesa`, `mesh`, `middle`, `might`, `mild`, `milk`, `mill`, `mine`, `mire`, `mission`, `mist`, `mitt`, `modest`, `moist`,
            `money`, `monk`, `moon`, `moor`, `moss`, `mother`, `mound`, `mount`, `mouse`, `mouth`, `mud`, `muse`, `myth`, `nail`, `naked`, `near`, `nest`, `net`, `nether`, `never`, `new`, `night`, `nine`, `noose`, `north`, `nose`, `note`, `oak`, `ocean`, `oil`, `old`, `one`, `open`, `orange`, `orb`, `orc`, `ore`, `out`, `outer`, `over`, `owl`, `page`, `pail`, `pale`, `part`, `pass`, `path`, `pawn`, `peace`, `peak`, `pearl`, `peat`, `penny`, `piece`, `pier`, `pig`, `pike`, `pine`, `pink`,
            `pit`, `place`, `plaid`, `plain`, `plank`, `plate`, `plot`, `plow`, `pocket`, `point`, `pond`, `pool`, `poor`, `port`, `post`, `pray`, `prayer`, `prey`, `pretty`, `price`, `priest`, `prime`, `prince`, `princess`, `probe`, `proud`, `pub`, `puddle`, `pure`, `purple`, `purse`, `quad`, `quaff`, `quaint`, `queen`, `quest`, `quick`, `quiet`, `quill`, `quilt`, `quiver`, `rain`, `ranch`, `range`, `rat`, `raven`, `red`, `relic`, `rest`, `rich`, `ridge`, `right`, `ring`, `rise`, `river`,
            `road`, `robe`, `rock`, `rod`, `rogue`, `roof`, `roost`, `rope`, `rose`, `rough`, `round`, `ruby`, `rug`, `ruin`, `rune`, `rust`, `sad`, `safe`, `sage`, `saint`, `salt`, `sand`, `sap`, `sash`, `saw`, `scale`, `scar`, `scarlet`, `school`, `scorn`, `scotch`, `scrag`, `script`, `scroll`, `sea`, `seed`, `serpent`, `seven`, `sew`, `shack`, `shade`, `shadow`, `shaft`, `shallow`, `shank`, `shard`, `sharp`, `shawl`, `shed`, `shelf`, `shepherd`, `shield`, `shine`, `ship`, `shock`, `shoe`,
            `shoot`, `shop`, `shore`, `short`, `shout`, `shrine`, `sight`, `sign`, `silent`, `silver`, `single`, `sink`, `sister`, `six`, `skin`, `skull`, `sky`, `slave`, `sleep`, `slide`, `slime`, `slope`, `slough`, `slow`, `slush`, `smart`, `smoke`, `smooth`, `snake`, `snow`, `soft`, `song`, `soul`, `sound`, `soup`, `sour`, `south`, `spade`, `spark`, `spear`, `speech`, `spell`, `sphere`, `spice`, `spider`, `spike`, `spin`, `spine`, `spire`, `spirit`, `splint`, `split`, `spoke`, `spore`, `sport`, `sprawl`,
            `spread`, `spring`, `spruce`, `square`, `stable`, `stack`, `staff`, `stair`, `stake`, `stand`, `star`, `state`, `station`, `statue`, `steel`, `steep`, `steer`, `stem`, `step`, `stern`, `stew`, `stick`, `stiff`, `still`, `stock`, `stone`, `stop`, `store`, `storm`, `straight`, `strait`, `strand`, `strap`, `stray`, `stream`, `strong`, `stump`, `summer`, `sun`, `swamp`, `swarm`, `sweep`, `sweet`, `swift`, `sword`, `table`, `tack`, `tag`, `tail`, `talk`, `tall`, `tame`, `tan`, `tank`,
            `tap`, `tar`, `task`, `tavern`, `tear`, `teeth`, `temple`, `ten`, `thick`, `thief`, `thin`, `thorn`, `three`, `thrill`, `throne`, `thug`, `thunder`, `tide`, `tight`, `timber`, `time`, `tin`, `tiny`, `tip`, `toad`, `toe`, `tomb`, `tome`, `tongue`, `tool`, `tooth`, `top`, `torch`, `torn`, `touch`, `tough`, `tour`, `tower`, `town`, `toy`, `track`, `tract`, `trade`, `trail`, `trap`, `treasure`, `tree`, `trick`, `triple`, `trove`, `true`, `trunk`, `truth`, `tube`, `tunnel`, `turf`,
            `turn`, `turtle`, `two`, `ugly`, `under`, `up`, `upper`, `urn`, `vague`, `valley`, `wake`, `walk`, `wall`, `wand`, `war`, `ware`, `warm`, `waste`, `watch`, `water`, `way`, `weak`, `wealth`, `web`, `weed`, `well`, `wench`, `west`, `wet`, `wheel`, `white`, `whole`, `wild`, `wind`, `window`, `wine`, `wing`, `winter`, `wise`, `witch`, `wizard`, `wolf`, `woman`, `wood`, `wool`, `word`, `wraith`, `wreck`, `yellow`, `yield`, `zenith`, `zero`, `zip`, `zone`, `zoom`
        ];

        UndesirablePhrases = [`ars`, `ass`, `bastar`, `ball`, `bitc`, `boll`, `clit`, `coc`, `cok`, `cox`, `crap`, `cum`, `cunt`, `dam`, `dic`, `dik`, `dix`, `fag`, `fart`, `fuc`, `fudg`, `fuj`, `fuk`, `fux`, `god`, `hell`, `hooc`, `jes`, `jew`, `jiz`, `klit`, `koc`, `kok`, `kox`, `krap`, `kum`, `kunt`, `lesb`, `lez`, `milf`, `muf`, `nig`, `paki`, `pee`, `phuc`, `phuk`, `phux`, `pis`, `pric`, `prik`, `prix`, `pus`, `screw`, `skrew`, `shag`, `shit`, `slag`, `slut`, `smeg`, `sod`, `strop`, `tit`, `turd`, `twat`, `vag`, `vaj`, `wank`, `whor`];
    }
};
