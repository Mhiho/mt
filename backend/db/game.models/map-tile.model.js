import { DataTypes } from "sequelize";

export function mapTileModel(sequelize) {
  const attributes = {
    tileID: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
    race: { type: DataTypes.ENUM('0', '1', '2'), allowNull: true, defaultValue: null },
    name: { type: DataTypes.STRING, allowNull: true, defaultValue: 'ziemia niczyja' },
    positionX: { type: DataTypes.INTEGER, allowNull: true },
    positionY: { type: DataTypes.INTEGER, allowNull: true },
    available: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    terrainType: { type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8'), allowNull: true },
    foodStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 100 },
    ironStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 10 },
    stoneStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 20 },
    woodStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 100 },
    silverStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 3 },
    dragonCrystalStart: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
    foodRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    ironRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    stoneRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    silverRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    magicRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    woodRateBonus: { type: DataTypes.DECIMAL, allowNull: true },
    magicStart: { type: DataTypes.INTEGER, allowNull: true },
    militiaHern: { type: DataTypes.INTEGER, allowNull: true },
    scoutHern: { type: DataTypes.INTEGER, allowNull: true },
    hern: { type: DataTypes.INTEGER, allowNull: true },
    gryfHern: { type: DataTypes.INTEGER, allowNull: true },
    magicHern: { type: DataTypes.INTEGER, allowNull: true },
    horseHern: { type: DataTypes.INTEGER, allowNull: true },
    oldHern: { type: DataTypes.INTEGER, allowNull: true },
    ramHern: { type: DataTypes.INTEGER, allowNull: true },
    balistaHern: { type: DataTypes.INTEGER, allowNull: true },
    slave: { type: DataTypes.INTEGER, allowNull: true },
    hunters: { type: DataTypes.JSON, allowNull: true },
    fields: { type: DataTypes.JSON, allowNull: true },
    ironMine: { type: DataTypes.JSON, allowNull: true },
    forest: { type: DataTypes.JSON, allowNull: true },
    stoneMine: { type: DataTypes.JSON, allowNull: true },
    silverMine: { type: DataTypes.JSON, allowNull: true },
    settlers: { type: DataTypes.INTEGER, allowNull: true },
    altar: { type: DataTypes.INTEGER, allowNull: true },
    mokoszDaughter: { type: DataTypes.INTEGER, allowNull: true },
    general: { type: DataTypes.JSON, allowNull: true },
    // ibis unique below
    militia: { type: DataTypes.INTEGER, allowNull: true },
    soldier: { type: DataTypes.INTEGER, allowNull: true },
    horseMan: { type: DataTypes.INTEGER, allowNull: true },
    ramMan: { type: DataTypes.INTEGER, allowNull: true },
    siegeTower: { type: DataTypes.INTEGER, allowNull: true },
    spyGuild: { type: DataTypes.INTEGER, allowNull: true },
    monk: { type: DataTypes.INTEGER, allowNull: true },
    knight: { type: DataTypes.INTEGER, allowNull: true },
    spy: { type: DataTypes.INTEGER, allowNull: true },
    PerunSon: { type: DataTypes.INTEGER, allowNull: true },
    // wilds below
    headless: { type: DataTypes.INTEGER, allowNull: true },
    wildSoldier: { type: DataTypes.INTEGER, allowNull: true },
    madDog: { type: DataTypes.INTEGER, allowNull: true },
    wereWolf: { type: DataTypes.INTEGER, allowNull: true },
    serpent: { type: DataTypes.INTEGER, allowNull: true },
    blackGuard: { type: DataTypes.INTEGER, allowNull: true },
    gigantWild: { type: DataTypes.INTEGER, allowNull: true },
    warRhino: { type: DataTypes.INTEGER, allowNull: true },
    trainedDragon: { type: DataTypes.INTEGER, allowNull: true },
    ramWild: { type: DataTypes.INTEGER, allowNull: true },
    shaman: { type: DataTypes.INTEGER, allowNull: true },
    blindEye: { type: DataTypes.INTEGER, allowNull: true },
    hides: { type: DataTypes.INTEGER, allowNull: true },
    // animals below
    wildDog: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    scorpio: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    snake: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    rhino: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    lion: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    dragon: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    wildDogRate: { type: DataTypes.DECIMAL, allowNull: true },
    scorpioRate: { type: DataTypes.DECIMAL, allowNull: true },
    snakeRate: { type: DataTypes.DECIMAL, allowNull: true },
    rhinoRate: { type: DataTypes.DECIMAL, allowNull: true },
    lionRate: { type: DataTypes.DECIMAL, allowNull: true },
    dragonRate: { type: DataTypes.DECIMAL, allowNull: true },
    startGather: { type: DataTypes.STRING, allowNull: true },
    slots: { type: DataTypes.JSON, allowNull: true },
    ancientArtifact: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  };
  return sequelize.define('MapTile', attributes);
}
// terrainType:

// 1 - las
// 2 - złoże kamienia
// 3 - złoże srebra
// 4 - ruiny zamku
// 5 - złoże rudy
// 6 - pola
// 7 - łąka
// 8 - uroczysko
