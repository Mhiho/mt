export const ibisArmy = "INSERT IGNORE INTO ArmyIbis(" +
    "armyIbisID,armyIbisName, attack, attackVsBuilding, defense, weapon, armor, maintenance, carry, hitpoints, expForEnemyHero)" + 
    "VALUES " +
    "(1,'militia',3,0,3,1,1,1,5,20,1),"  +
    "(2,'soldier',7,3,8,8,8,2,10,20,7)," +
    "(3,'archer',12,0,5,6,4,2,10,20,7)," +
    "(4,'horseman',20,3,15,12,10,3,20,40,15)," +
    "(5,'knight',25,4,28,16,18,4,40,35,32)," +
    "(6,'ruffian',18,6,12,10,7,5,30,25,25)," +
    "(7,'monk',0,0,0,0,0,1,10,15,1)," +
    "(8,'ramMan',3,35,10,25,25,10,0,55,25)," +
    "(9,'spy',20,0,20,5,5,2,15,25,25)," +
    "(10,'palladin',30,3,35,25,20,4,50,35,35)," +
    "(11,'perunSon',155,10,145,30,30,6,0,190,220);"