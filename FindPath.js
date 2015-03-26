function FindPath() {
    
    var gridWidth = 0;
    var gridHeight = 0;
    var grid = [];

    var valueEmptyCell = 0;
    var valueTakenCell = -1;


    /*
    Attribut a valueEmptyCell une autre valeur
     */
    var configEmptyCell = function (value) {
        if (value <= valueTakenCell) {
            console.error("FindPath: Value of EmptyCell must be greater and different than value of TakenCell");
            return false;
        } else if (value === false) {
            console.error('FindPath: Value of EmptyCell cannot be "false"');
            return false;
        } else {
            valueEmptyCell = value;
            return true;
        }
    }


    /*
    Attribut a valueTakenCell une autre valeur
     */
    var configTakenCell = function (value) {
        if (value >= valueEmptyCell) {
            if (value == true) {
                console.error("FindPath: Becarefull ! Value of TakenCell must be smaller and different than value of EmptyCell, you should change it.");        
            } else {
                console.error("FindPath: Value of TakenCell must be smaller and different than value of EmptyCell");
            }
        } else {
            valueTakenCell = value;
            return true;
        }
    }

    /*
    Vérifie que la configuration est correcte.
     */
    function checkConfig () {
        if (valueEmptyCell <= valueTakenCell) {
            console.error("FindPath: Value of EmptyCell or TakenCell are badly config");
            return false;
        } else return true;
    }

    function initPath(pGrid){
        gridHeight = pGrid.length;
        gridWidth = pGrid[0].length;
        grid = pGrid;
    }

    /**
     * trouve le chemin entre la position start et la position end
     * @param  {[number]} posXstart [positione X de départ]
     * @param  {[number]} posYstart [position Y de départ]
     * @param  {[number]} posXend   [position X d'arrivée]
     * @param  {[number]} posYend   [position Y d'arrivée]
     * @param  {[array]} pGrid     [grille du jeu]
     * @return {[array]}           [tableau du chemin]
     */
    var On = function(posXstart, posYstart, posXend, posYend, pGrid) {
        if (!checkConfig()) return false;

        var waysuccess = true;

        initPath(pGrid);

        var count = valueEmptyCell + 1;
        var cellArray = findFreeCell(posXstart, posYstart, count);
        
        while (grid[posYend][posXend] === valueEmptyCell) {
            count += 1;
            cellArray = findTheEnd(cellArray, count);

            if (count > gridHeight * gridWidth) {
                waysuccess = false;
                break;
            } else if (grid[posYend][posXend] != valueEmptyCell && cellArray.length === valueEmptyCell) {
                waysucces = true;
            }
        }

        if (waysuccess) {
            var a = buildThePath(posXend, posYend, count);
            a.pop();
            return a;
        } else {
            console.log("wrong way");
            return false;
        }
    };

    /**
     * construit le chemin de la case ciblé au joueur
     * @param  {[number]} posX   [position en X de la case ciblé]
     * @param  {[number]} posY   [position en Y de la case ciblé]
     * @param  {[number]} pCount [valeur des correspondant au chemin]
     * @return {[array]}        [tableau du chemin]
     */
    var buildThePath = function(posX, posY, pCount) {
        var path = [];

        var x = posX;
        var y = posY;

        path.push([posX, posY]);
        while (grid[y][x] != valueEmptyCell + 1 && path.length <= pCount) {
            var ltemp = findTheValue(x, y, grid[y][x] - 1);
            if (ltemp != false) {
                x = ltemp[0];
                y = ltemp[1];
                path.push(ltemp);
            } else break;
        }
        return path;
    };

    /**
     * trouve la case avec la valeur voulue
     * @param  {number} pX     [position en x de la case d'origine]
     * @param  {number} pY     [position en y de la case d'origine]
     * @param  {number} pCount [valeur a trouvé]
     * @return {array}        [tableau de la case correspondante]
     */
    var findTheValue = function(pX, pY, pCount) {
        if (leftCell(pY, pX) === pCount) {
            return [pX - 1, pY];
        } else if (rightCell(pY, pX) === pCount) {
            return [pX + 1, pY];
        } else if (downCell(pY, pX) === pCount) {
            return [pX, pY + 1];
        } else if (upCell(pY, pX) === pCount) {
            return [pX, pY - 1];
        } else return false;
    };

    /**
     * Appelle la fonction findFreeCell, pour chaque case que trouve cette fonction
     * @param  {array} pArray [tableau de libre]
     * @param  {number} pCount [valeur que von prendre les cases qui seront trouvé]
     * @return {array}        [tableau des cases libres trouvés]
     */
    function findTheEnd(pArray, pCount) {
        var lcount = pCount + 1;
        var nextCellArray = [];
        for (var i = pArray.length - 1; i >= 0; i--) {

            var lArray = findFreeCell(pArray[i][0], pArray[i][1], pCount);
            if (lArray != false) {
                for (var j = lArray.length - 1; j >= 0; j--) {
                    nextCellArray.push([lArray[j][0], lArray[j][1]]);
                }
            } else continue;
        }
        return nextCellArray;
    };

    /**
     * trouve les cases voisines qui sont libre
     * @param  {[number]} posX    [position en x sur la grille]
     * @param  {[number]} posY    [position en y sur la grille]
     * @param  {[number]} pNumber [valeur que von prendre les cases libres]
     * @return {[array]}         [tableau des cases libre trouvé]
     */
    function findFreeCell(posX, posY, pNumber) {
        var arrayWay = [];
        var number = pNumber || valueEmptyCell;
        grid[posY][posX] = pNumber;

        if (leftCell(posY, posX) === valueEmptyCell) {
            arrayWay.push([posX - 1, posY]);
        }
        if (rightCell(posY, posX) === valueEmptyCell) {
            arrayWay.push([posX + 1, posY]);
        }
        if (downCell(posY, posX) === valueEmptyCell) {
            arrayWay.push([posX, posY + 1]);
        }
        if (upCell(posY, posX) === valueEmptyCell) {
            arrayWay.push([posX, posY - 1]);
        }

        if (arrayWay.length === 0) return false;
        else return arrayWay;
    }

    /**
     * recupère la valeur de la case de gauche de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @return {[number]}       [valeur de la case de gauche]
     */
    var leftCell = function(pY, pX) {
        if (pX - 1 >= 0 && pX - 1 <= gridWidth && pX > 0) {
            return grid[pY][pX - 1];
        } else return false;

    };

    /**
     * recupère la valeur de la case de droite de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @return {[number]}       [valeur de la case de droite]
     */
    var rightCell = function(pY, pX) {
        if (pX + 1 >= 0 && pX + 1 <= gridWidth && pX < gridWidth - 1) {
            return grid[pY][pX + 1];
        } else return false;
    };

    /**
     * recupère la valeur de la case en bas de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @return {[number]}       [valeur de la case en bas]
     */
    var downCell = function(pY, pX) {
        if (pY + 1 >= 0 && pY + 1 <= gridHeight && pY < gridHeight - 1) {
            return grid[pY + 1][pX];
        } else return false;
    };

    /**
     * recupère la valeur de la case du haut de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @return {[number]}       [valeur de la case du haut]
     */
    var upCell = function(pY, pX) {
        if (pY - 1 >= 0 && pY - 1 <= gridHeight && pY > 0) {
            return grid[pY - 1][pX];
        } else return false;
    };
    /**
     * trouve le chemin le plus court du player à la target
     * @param  {[number]} potX    [position en X du pot]    
     * @param  {[number]} potY    [position en Y du pot]
     * @param  {[number]} playerX [position en X du player]
     * @param  {[number]} playerY [position en Y du player]
     * @return {[array]}         [tableau du chemin]
     */
    var To = function(targetX, targetY, playerX, playerY, pGrid) {
        pGrid[targetY][targetX] = valueEmptyCell;
        var way = On(playerX, playerY, targetX, targetY, pGrid);
        way.shift();
        return way;
    };

    return {
        On: On,
        To: To,
        configEmptyCell: configEmptyCell,
        configTakenCell: configTakenCell
    }
}