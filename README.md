# FindPath Beta 1.2.0

Librairie Javascript de Pathfinding créé par Flavien Marianacci.

# Détails

L'algorythme utilisé est le Dijkstra.

Il est possible d'effectuer la recherche uniquement en mode unidirectionnel.
Il possible d'utiliser une grille composer partiellement ou totalement d'objet.

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
	
La grille est un tableau de tableaux représentant la zone de jeu.

Il faut configurer les valeurs de où le chemin peut aller (emptyCell) et là où le chemin ne peux pas aller (takenCell).

Si une valeur de la grille n'est pas attribué a EmptyCell ou à TakenCell elle sera par defaut considérer comme une valeur de "takenCell".

Les valeurs de la grille de jeu sont configurable, voir partie > Configuration
	
Exemple : 
		
	Zone de jeu: 
		0, 0, -1
		0, 0, -1
		0, 0, -1
	
	var grille = [ [0], [0], [-1] ], 
				 [ [0], [0], [-1] ],
				 [ [0], [0], [-1] ];


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

Toutes les fonctions de configuration renvoie true si la configuration a réussi et false si elle a échoué.

Toutes les fonctions de configuration renvoie la valeur actuel de la configuration si aucun paramètre ne leurs est donnée.

## EmptyCell
	
	> FindPath.config.EmptyCell(value);

	Cette fonction prend en paramètre la valeur des cases libres de la grille.
	
	Il est possible de définir plusieurs valeur pour les cases libres, en appelant plusieurs fois la fonction.

	Cette valeur peut être de tout type et ne doit pas être déjà défini comme une valeur de case pleine.

	Renvoie true si le changement de valeur a était effectué, false si échoué.
	
	Renvoie la valeur des cases vides si aucun paramètre ne lui est donné.

	Par default la valeur de EmptyCell est égale a 0.

## TakenCell

	> FindPath.config.TakenCell(value);

	Cette fonction prend en paramètre la valeur des cases pleines de la grille.

	Il est possible de définir plusieurs valeur pour les cases pleines, en appelant plusieurs fois la fonction.

	Cette valeur peut être de tout type et ne doit pas être déjà défini comme une valeur de case vide.

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


## Aside

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

##Exemple complet
	
	function Ground () {
		this.name = "ground";
	}

	function Grass () {
		this.name = "grass";
	}

	function Wall () {
		this.name = "wall";
	}

	function Enemy () {
		this.name = "enemy";
	}

	var grille = [
					[new Ground(), new Ground(), new Grass()],
					[new Wall(), new Wall(), new Ground()],
					[new Ground(), new Grass(), new Grass()],
					[new Grass(), new Enemy(), new Grass()]
				];

	//Créer une nouvel objet FindPath.
	var FP = new FindPath();

	// Les objets où le player ne peux pas marcher sont 'Ground' et 'Grass'
	FP.config.EmptyCell(Ground);
	FP.config.EmptyCell(Grass);
	
	// Les objets où le player ne peux pas marcher sont 'Wall' et 'Enemy'
	FP.config.TakenCell(Wall);
	FP.config.TakenCell(Enemy);
	
	// way est égale au chemin entre le player et la target.
	var way = FP.On(Player.x, Player.y, Target.x, Target.y, grille);

