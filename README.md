# FindPath Beta 1.1

Librairie Javascript de Pathfinding créé par Flavien Marianacci.

# Détails

L'algorythme utilisé est le Dijkstra.

Il est possible d'effectuer la recherche uniquement en mode unidirectionnel.

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
	
	findPath.On(A.x, A.y, B.x, B.y, grille);
	
# Format de la grille
	
La grille être un tableau de tableaux représentant la zone de jeu.

**Les valeurs des cases vides (ou libre) sont par default égale a 0.**
	
**Les valeurs des cases pleine (ou occupé) sont par default égale a -1.**

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


# Méthodes

##On

Trouve le chemin qui va d'un point A jusque sur un point B, le chemin s'arrête sur le point B.
Renvoie un tableau de tableaux de postitions si le chemin est trouvé.
Renvoie false si aucun chemin n'a était trouvé.

##To 

Trouve le chemin qui va d'un point A jusqu'a un point B, le chemin s'arrête une case avant le point B.
Renvoie un tableau de tableaux de positions.
Renvoie false si aucun chemin n'a était trouvé.


#Configuration

Toutes les configurations sont effectué via l'objet 'config' de FindPath. 

Toutes les fonctions de configuration renvoie true la configuaration a réussi et false si elle a échoué.

Toutes les fonctions de configuration renvoie la valeur actuel de la configuration si aucun paramètre ne leurs est donnée.

## EmptyCell
	
	> FindPath.config.EmptyCell(value);

	Cette fonction prend en paramètre la valeur des cases libres de la grille qui sera utilisé par FindPath.
	Cette valeur doit être supérieur et différentes de la valeur des cases pleines.

	Renvoie true si le changement de valeur a était effectué, false si échoué.
	
	Renvoie la valeur des cases vides si aucun paramètre ne lui est donné.

	Par default la valeur de EmptyCell est égale a 0.

## TakenCell

	> FindPath.config.TakenCell(value);

	Cette fonction prend en paramètre la valeur des cases pleines de la grille qui sera utilisé par FindPath.
	Cette valeur doit être inférieur et différentes de la valeur des cases libre.

	Renvoie true si le changement de valeur a était effectué, false si échoué.

	Renvoie la valeur des cases pleines si aucun paramètre ne lui est donné.

	Par default la valeur de TakenCell est égale a -1.


## Diagonal

	> FindPath.config.Diagonal(value);
	
	Cette fonction active ou désactive la recherche en diagonal.

	Cette fonction prend en paramètre true ou false.

	Renvoie true si le changement de valeur a était effectué, false si échoué.

	Renvoie la valeur de Diagonal si aucun paramètre ne lui est donné.

	Par default la recherche en diagonal est activé.


## Diagonal

	> FindPath.config.Aside(value);
	
	Cette fonction active ou désactive la recherche horizontale et verticale.

	Cette fonction prend en paramètre true ou false.

	Renvoie true si le changement de valeur a était effectué, false si échoué.

	Renvoie la valeur de Aside si aucun paramètre ne lui est donné.

	Par default la recherche horizontal et vertical est activé.

## print

	> FindPath.config.print();

	Cette fonction ne prend aucun parametre.

	Elle écrit en console la valeur actuel de toutes les configurations de Findpath.