# FindPath 1.0

Librairie Javascript de Pathfinding créé par Flavien Marianacci.

# Détails

L'algorythme utilisé est le Dijkstra.

Les paramètres de l'algorythme pour la version 1.0 sont:
	-recherche uni-directionnel
	-diagonal non possible

# Comment l'installer

Il suffit d'inclure le fichier FindPath.js dans l'arborescence de votre projet.

# Comment l'utiliser

###Pour créer un objet FindPath:

	Exemple : 
	
		var findPath = new FindPath ();
	
###Pour trouver un chemin entre point A et un point B
	
La méthode "On" est utilisé elle prend en paramètre:

-position en X de A
-position en Y de A
-position en X de B
-position en Y de B
-la grille de jeu

Exemple : 
	
	var findPath = new FindPath ();
	
	findPaht.On(A.x, A.y, B.x, B.y, grille);
	
# Format de la grille
	
La grille être un tableau de tableaux représentant la zone de jeu.

**Les valeurs des cases vides (ou libre) sont par default égale a 0.**
	
**/!\ Les valeurs des cases pleine (ou occupé) sont par default égale a -1.**

Les valeurs de la grille de jeu sont configurable, voir partie > Configuration
	
Exemple : 
		
	Zone de jeu: 
		0, 0, -1
		0, 0, -1
		0, 0, -1
	
	var grille = [ [0], [0], [-1] ], 
				 [ [0], [0], [-1] ],
				 [ [0], [0], [-1] ];

/!\ **Attention** la grille donné en paramètre sera modifier par FindPath, faite attention de ne pas l'utiliser ailleur dans votre programme.

#Configuration

## configEmptyCell
	
	> FindPath.configEmptyCell(value);

	Cette fonction prend en paramètre la valeur des cases libres de la grille qui sera utilisé par FindPath.
	Cette valeur doit être supérieur et différentes de la valeur des cases pleines.

	Renvoie true si le changement de valeur a était effectué, false si échoué.

	Par default la valeur de EmptyCell est égale a 0.

## configTakenCell

	> FindPath.configTakenCell(value);

	Cette fonction prend en paramètre la valeur des cases plaein de la grille qui sera utilisé par FindPath.
	Cette valeur doit être inférieur et différentes de la valeur des cases libre.

	Renvoie true si le changement de valeur a était effectué, false si échoué.

	Par default la valeur de TakenCell est égale a -1.

# Méthodes

##On

Trouve le chemin qui va d'un point A jusque sur un point B, le chemin s'arrête sur le point B.
Renvoie un tableau de tableaux de postitions.

##To 

Trouve le chemin qui va d'un point A jusqu'a un point B, le chemin s'arrête une case avant le point B.
Renvoie un tableau de tableaux de positions.