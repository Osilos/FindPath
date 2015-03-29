function FindPath() {

    var gridWidth = 0;
    var gridHeight = 0;
    var grid = [];

    var valueEmptyCell = 0;
    var valueTakenCell = -1;

    var allowDiagonal = true;
    var allowAside = true;

    var print = function () {
        console.log("EmptyCell = " + valueEmptyCell, "TakenCell = " + valueTakenCell, "Diagonal = " + allowDiagonal, "Aside = " + allowAside);
    }

    /*
    Fonction qui active ou désactie la recherche en diagonal.
     */
    var Diagonal = function (value) {
        if (value === undefined) return allowDiagonal;
        if (value === true || value === false) {
            if (value === true) allowDiagonal = value;
            else if (value === false && allowAside === true) allowDiagonal = value;
            else if (value === false && allowAside === false) {
                console.error("FindPath: La recherche en diagonale ne peux pas être désactivée si la recherche des cases adjacentes est désativé.");
                return false;
            }
        } else {
            console.error("FindPath: La fonction configDiagonal prend en parametre 'true' ou 'false'");
            return false;
        }
        return true;
    };

    /*
    Fonction qui active ou désactie la recherche horizontal et vertical.
     */
    var Aside = function (value) {
        if (value === undefined) return allowAside;
        if (value === true || value === false) {
            if (value === true) allowAside = value;
            else if (value === false && allowDiagonal === true) allowAside = value;
            else if (value === false && allowDiagonal === false) {
                console.error("FindPath: La recherche des cases adjacentes ne peux pas être désactivée si la recherche des cases diagonales est désativé.");
                return false;
            }
        } else {
            console.error("FindPath: La fonction configAside prend en parametre 'true' ou 'false'");
            return false;
        }
        return true;
    };


    /*
    Attribut a valueEmptyCell une autre valeur
     */
    var EmptyCell = function(value) {
        if (value === undefined) return valueEmptyCell;
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
    var TakenCell = function(value) {
        if (value === undefined) return valueTakenCell;
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
    function checkConfig() {
        if (valueEmptyCell <= valueTakenCell) {
            console.error("FindPath: Value of EmptyCell or TakenCell are badly config");
            return false;
        } else return true;
    }

    function initPath(pGrid) {
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

        if (allowAside) { //Si les cases horizontale et vertical sont activées
            for (var i = asideCell.length - 1; i >= 0; i--) {
                if (asideCell[i](pY, pX) === pCount) {
                    return asideCell[i](pY, pX, true);
                }
            };
        }

        if (allowDiagonal) { //Si les cases en diagonales sont activées
            for (var j = diagonalCell.length - 1; j >= 0; j--) {
                if (diagonalCell[j](pY, pX) === pCount) {
                    return diagonalCell[j](pY, pX, true);
                }
            };
        }


        return false;
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


        if (allowAside) { //Si les cases horizontale et vertical sont activées
            for (var i = asideCell.length - 1; i >= 0; i--) {
                if (asideCell[i](posY, posX) === valueEmptyCell) {
                    grid[asideCell[i](posY, posX, true)[1]][asideCell[i](posY, posX, true)[0]] = pNumber + 1;
                    arrayWay.push(asideCell[i](posY, posX, true));
                }
            };            
        }

        if (allowDiagonal) {//Si les cases en diagonales sont activées
            for (var j = diagonalCell.length - 1; j >= 0; j--) {
                if (diagonalCell[j](posY, posX) === valueEmptyCell) {
                    grid[diagonalCell[j](posY, posX, true)[1]][diagonalCell[j](posY, posX, true)[0]] = pNumber + 1;
                    arrayWay.push(diagonalCell[j](posY, posX, true));
                }
            };            
        }

        if (arrayWay.length === 0) return false;
        else return arrayWay;
    }

    /**
     * recupère la valeur de la case de gauche de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la case de gauche]
     * @return {[number]}       [valeur de la case de gauche]
     */
    var leftCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX - 1, pY];
        if (pX - 1 >= 0 && pX - 1 <= gridWidth && pX > 0) {
            return grid[pY][pX - 1];
        } else return false;

    };

    /**
     * recupère la valeur de la case de droite de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la cas de droite]
     * @return {[number]}       [valeur de la case de droite]
     */
    var rightCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX + 1, pY];
        if (pX + 1 >= 0 && pX + 1 <= gridWidth && pX < gridWidth - 1) {
            return grid[pY][pX + 1];
        } else return false;
    };

    /**
     * recupère la valeur de la case en bas de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la cas du bas]
     * @return {[number]}       [valeur de la case en bas]
     */
    var downCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX, pY + 1];
        if (pY + 1 >= 0 && pY + 1 <= gridHeight && pY < gridHeight - 1) {
            return grid[pY + 1][pX];
        } else return false;
    };

    /**
     * recupère la valeur de la case du haut de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la cas du haut]
     * @return {[number]}       [valeur de la case du haut]
     */
    var upCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX, pY - 1];
        if (pY - 1 >= 0 && pY - 1 <= gridHeight && pY > 0) {
            return grid[pY - 1][pX];
        } else return false;
    };

    /**
     * recupère la valeur de la case du haut a gauche de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la case en haut à gauche]
     * @return {[number]}       [valeur de la case du haut]
     */
    var upLeftCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX - 1, pY - 1];
        if (pX - 1 >= 0 && pX - 1 <= gridWidth && pX > 0 && pY - 1 >= 0 && pY - 1 <= gridHeight && pY > 0) {
            return grid[pY - 1][pX - 1];
        } else return false;
    };


    /**
     * recupère la valeur de la case du haut a droite de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la case en haut à droite]
     * @return {[number]}       [valeur de la case du haut]
     */
    var upRightCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX + 1, pY - 1];
        if (pX + 1 >= 0 && pX + 1 <= gridWidth && pX < gridWidth - 1 && pY - 1 >= 0 && pY - 1 <= gridHeight && pY > 0) {
            return grid[pY - 1][pX + 1];
        } else return false;
    };


    /**
     * recupère la valeur de la case du bas a gauche de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la case en bas à gauche]
     * @return {[number]}       [valeur de la case du haut]
     */
    var downLeftCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX - 1, pY + 1];
        if (pX - 1 >= 0 && pX - 1 <= gridWidth && pX > 0 && pY + 1 >= 0 && pY + 1 <= gridHeight && pY < gridHeight - 1) {
            return grid[pY + 1][pX - 1];
        } else return false;
    };


    /**
     * recupère la valeur de la case du bas a droite de la case ciblé
     * @param  {[number]} pY    [position en Y de la case ciblé]
     * @param  {[number]} pX    [position en X de la case ciblé]
     * @param  {bool}     pArray[si true renvoie la valeur un array de la position de la case en bas à droite]
     * @return {[number]}       [valeur de la case du haut]
     */
    var downRightCell = function(pY, pX, pArray) {
        pArray = pArray || false;
        if (pArray) return [pX + 1, pY + 1];
        if (pX + 1 >= 0 && pX + 1 <= gridWidth && pX < gridWidth - 1 && pY + 1 >= 0 && pY + 1 <= gridHeight && pY < gridHeight - 1) {
            return grid[pY + 1][pX + 1];
        } else return false;
    };


    var asideCell = [leftCell, rightCell, upCell, downCell];
    var diagonalCell = [downRightCell, downLeftCell, upRightCell, upLeftCell];

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

    var config = {
        EmptyCell: EmptyCell,
        TakenCell: TakenCell,
        Diagonal : Diagonal,
        Aside : Aside,
        print : print
    }

    return {
        On: On,
        To: To,
        config : config
    }
}