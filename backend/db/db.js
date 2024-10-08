import mysql from 'mysql2/promise'
import { Sequelize } from 'sequelize'
import { lorisArmy } from '../initialData/lorisArmy'
import { ibisArmy } from '../initialData/ibisArmy';
import { wildArmy } from '../initialData/wildArmy'
import { lorisBuildings } from '../initialData/lorisBuildings'
import { ibisBuildings } from '../initialData/ibisBuildings'
import { wildsBuildings } from '../initialData/wildBuildings'
import { generateMap } from '../utils/generate-map';
import { userModel } from './users/user.model';
import { tokenModel } from './tokens/token.model';
import { creaturesModel } from './game.models/creatures.model';
import { hernArmyModel } from './game.models/hern-army.model';
import { hernBuildingsModel } from './game.models/hern-buildings.model';
import { ibisArmyModel } from './game.models/ibis-army.model';
import { ibisBuildingsModel } from './game.models/ibis-buildings.model';
import { wildArmyModel } from './game.models/wild-army.model';
import { wildBuildingsModel } from './game.models/wild-buildings.model';
import { mapTileModel } from './game.models/map-tile.model';


const user = process.env('MYSQL_USER');
const database = process.env('MYSQL_DATABASE');
const password = process.env('MYSQL_PASSWORD');
const host = process.env('HOST');
export const db = () => {
  const setXY = 60;
  const setDLength = setXY * setXY;
  const initialize = async () => {
    // create db if it doesn't already exist
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`SET GLOBAL sql_mode = '';`);
    // connect to db
    const sequelize = new Sequelize(database, user, password, {
      dialect: 'mysql',
    });

    // init models and add them to the exported db object
    db.User = userModel(sequelize);
    db.Token = tokenModel(sequelize);
    db.ArmyHern = hernArmyModel(sequelize);
    db.ArmyIbis = ibisArmyModel(sequelize);
    db.ArmyWild = wildArmyModel(sequelize);
    db.BuildingsHern = hernBuildingsModel(sequelize);
    db.BuildingsIbis = ibisBuildingsModel(sequelize);
    db.BuildingsWild = wildBuildingsModel(sequelize);
    db.MapTile = mapTileModel(sequelize);
    db.Creatures = creaturesModel(sequelize)

    //add dependencies between models
    db.Token.belongsTo(db.User, { foreignKey: 'userID', as: 'UserID' });
    // sync all models with database
    await sequelize.sync();
    await connection.query(lorisArmy);
    await connection.query(ibisArmy);
    await connection.query(wildArmy);
    await connection.query(lorisBuildings);
    await connection.query(ibisBuildings);
    await connection.query(wildsBuildings);

    const d = await db.MapTile.findAll();
    if (d.length !== setDLength) {
      await generateMap().catch(console.error);
    }
  };

  initialize().catch(console.error);
};
