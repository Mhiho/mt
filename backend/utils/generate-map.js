import mysql from 'mysql2/promise'
const host = process.env('HOST')
const user = process.env('MYSQL_USER')
const password = process.env('MYSQL_PASSWORD')
const database = process.env('MYSQL_DATABASE')

export const generateMap = async () => {
    const setXY = 60;
    const dragonGen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3]
    const connection = await mysql.createConnection({
        host,
        user,
        password,
        database,
    });
    const count = setXY + 1
    for (let i = 1; i < count; i++) {
        for (let j = 1; j < count; j++) {
            const terrainGen = [1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8]
            let terrainRand = Math.floor(Math.random() * terrainGen.length);
            let terrainType = terrainGen[terrainRand];
            await connection.query(`INSERT INTO MapTiles (positionX , positionY, terrainType) VALUES (${i}, ${j}, ${terrainType});`)
            console.log(`row added with value terrain: ${terrainType}`)
        }
    }
    console.log('generate done')
    for (let i = 1; i < count; i++) {
        for (let j = 1; j < count; j++) {
            // dla uroczysk
            let scorpio = Math.floor(Math.random() * (31 - 1)) + 1;
            let wildDog = Math.floor(Math.random() * (21 - 1)) + 1;
            let snake = Math.floor(Math.random() * (15 - 1)) + 1;
            let lion = Math.floor(Math.random() * (11 - 1)) + 1;
            let rhino = Math.floor(Math.random() * (8 - 1)) + 1;
            //dla łąk
            let scorpio2 = Math.floor(Math.random() * 4);
            let wildDog2 = Math.floor(Math.random() * 4);
            let snake2 = Math.floor(Math.random() * 3);
            let lion2 = Math.floor(Math.random() * 2);
            let rhino2 = Math.floor(Math.random() * 1);
            //dla reszty
            let scorpio3 = Math.floor(Math.random() * 10);
            let wildDog3 = Math.floor(Math.random() * 8);
            let snake3 = Math.floor(Math.random() * 8);
            let lion3 = Math.floor(Math.random() * 6);
            let rhino3 = Math.floor(Math.random() * 4);
            // smoki w uroczyskach
            let random = Math.floor(Math.random() * dragonGen.length);
            let dragon = dragonGen[random];
            await connection.query(`UPDATE MapTiles SET scorpio = ${scorpio}, wildDog = ${wildDog}, snake = ${snake}, lion =${lion}, rhino = ${rhino}, dragon = ${dragon} WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET scorpio = ${scorpio2}, wildDog = ${wildDog2}, snake = ${snake2}, lion =${lion2}, rhino = ${rhino2} WHERE terrainType = 7 AND positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET scorpio = ${scorpio3}, wildDog = ${wildDog3}, snake = ${snake3}, lion =${lion3}, rhino = ${rhino3} WHERE terrainType != 7 AND terrainType != 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    console.log('update animals done');
    const dragonFull = await connection.query('Select tileID,dragon,ancientArtifact from MapTiles where dragon >= 2');
    console.log(`possible slots for artifacts = ${dragonFull[0].length}`)
    const randomFive = [];
    for (let i = 0; i < 5; i++) {
        let strike = Math.floor(Math.random() * dragonFull[0].length)
        randomFive.push(dragonFull[0][strike])
        dragonFull[0].splice(strike, 1);
    }
    for (let i = 0; i < 5; i++) {
        await connection.query(`UPDATE MapTiles SET ancientArtifact = true WHERE tileID = ${randomFive[i].tileID}`)
    }
    console.log('artifacts added')

    for (let i = 1; i < count; i++) {
        for (let j = 1; j < count; j++) {
            let luck = Math.floor(Math.random() * (5 - 1) + 1);
            await connection.query(`UPDATE MapTiles SET foodStart = 50 *ROUND(scorpio+wildDog*1.5+snake*2+lion*4+rhino*3+dragon*30) WHERE positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET woodStart = 50 *ROUND(scorpio+wildDog*1.5+snake*2+lion*4+rhino*3+dragon*30) WHERE positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET ironStart = 25 *ROUND(scorpio+wildDog*1.5+snake*2+lion*4+rhino*3+dragon*30) WHERE positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET stoneStart = 15 *ROUND(lion*4+rhino*3+dragon*30) WHERE positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET silverStart = 10 *ROUND(rhino*3+dragon*10) WHERE positionX = ${i} AND positionY = ${j};`)
            await connection.query(`UPDATE MapTiles SET dragonCrystalStart = (dragonCrystalStart + ${luck}) *ROUND(dragon*2) WHERE terrainType = 8 AND positionX = ${i} AND positionY = ${j};`)
        }
    }
    //
    console.log('ressources update done')
    console.log('map ready')
}
