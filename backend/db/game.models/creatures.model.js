import { DataTypes } from "sequelize";

export function creaturesModel(sequelize) {
  const attributes = {
    creatureID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    creatureName: { type: DataTypes.STRING, allowNull: false },
    attack: { type: DataTypes.INTEGER, allowNull: false },
    defense: { type: DataTypes.INTEGER, allowNull: false },
    weapon: { type: DataTypes.DECIMAL, allowNull: false },
    armor: { type: DataTypes.DECIMAL, allowNull: false },
    hitpoints: { type: DataTypes.INTEGER, allowNull: false },
    exp: { type: DataTypes.INTEGER, allowNull: false },
  };

  return sequelize.define('Creatures', attributes);
}
