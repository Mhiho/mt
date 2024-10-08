import { DataTypes } from 'sequelize';

export function ibisBuildingsModel(sequelize) {
  const attributes = {
    buildingID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    buildingName: { type: DataTypes.STRING, allowNull: false },
    buildingTime: { type: DataTypes.INTEGER, allowNull: false },
    buildingWood: { type: DataTypes.INTEGER, allowNull: false },
    buildingStone: { type: DataTypes.INTEGER, allowNull: false },
  };

  return sequelize.define('BuildingsIbis', attributes);
}
