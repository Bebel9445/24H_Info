import json
from enum import Enum

class Position(Enum):
    AUCUN = 0
    DROITE = 1
    BAS = 2


tab = {}
tableaux = []
tableaux_sauve = []


largeur = 0
longueur = 0
longueur_tableau_max = 0
surface = 0

with open('donnees.json', 'r') as file:
    tab = json.load(file)

largeur_max = tab["largeur_salle"]
longueur_max = tab["longueur_salle"]
surface_max = largeur_max * longueur_max

tab = tab["oeuvres"]

continents = []

for tableau in tab:
    tableaux.append({"nom": tableau["id"],
                     "valeur": tableau["valeur_artistique"]*0.6 + tableau["valeur_historique"]*0.4,
                     "continent": tableau["categorie"],
                     "taille" : (tableau["largeur"],tableau["longueur"]),
                     "valeur_surfacique": tableau["valeur_artistique"]*0.6 + tableau["valeur_historique"]*0.4 / (tableau["largeur"] * tableau["longueur"]),
                     "position" : (-1, -1)})
    if tableau["categorie"] not in continents:
        continents.append(tableau["categorie"])

def afficher_tableau(tableau:dict):
    print(f"Nom: {tableau['nom']}")
    print(f"Valeur : {tableau['valeur']}")
    print(f"Continent: {tableau['continent']}")
    print(f"Taille: {tableau['taille'][0]} x {tableau['taille'][1]}")
    print(f"Valeur surfacique: {tableau['valeur_surfacique']}")
    print(f"Position: {tableau['position']}")

def max_valeur(tableaux:list[dict]):
    max_val = 0
    tableau_max = tableaux[0]
    for tableau in tableaux:
        if tableau["valeur_surfacique"] > max_val:
            max_val = tableau["valeur_surfacique"]
            tableau_max = tableau
    return tableau_max

def peu_placer(tableau:dict):
    if tableau["taille"][0] * tableau["taille"][1] + surface > surface_max:
        return Position.AUCUN

    if tableau["taille"][0] + largeur <= largeur_max:
        return Position.DROITE
    elif tableau["taille"][1] + longueur <= longueur_max:
        return Position.BAS
    return Position.AUCUN


def garder_tableau(tableau:dict, position:Position):
    tableaux_sauve.append(tableau)
    global largeur, longueur, surface, longueur_tableau_max
    tableau["position"] = (largeur, longueur)
    if position == Position.DROITE:
        largeur += tableau["taille"][0]
        if tableau["taille"][1] > longueur_tableau_max:
            longueur_tableau_max = tableau["taille"][1]
    elif position == Position.BAS:
        longueur += longueur_tableau_max
        longueur_tableau_max = 0
        largeur = 0
    surface += tableau["taille"][0] * tableau["taille"][1]
    

while len(tableaux) > 0:
    for continent in continents:
        tableau_continent = []
        for tableau in tableaux:
            if tableau["continent"] == continent:
                tableau_continent.append(tableau)
        tableau_max = max_valeur(tableau_continent)
        tableaux.remove(tableau_max)
        if peu_placer(tableau_max) == Position.DROITE:
            garder_tableau(tableau_max, Position.DROITE)
        elif peu_placer(tableau_max) == Position.BAS:
            garder_tableau(tableau_max, Position.BAS)
        else:
            print("Impossible de placer le tableau.")

for tableau in tableaux_sauve:
    print("-----")
    afficher_tableau(tableau)
    
print("-----")
print(f"Largeur max: {largeur_max}")
print(f"Longueur max: {longueur_max}")
print(f"Largeur totale: {largeur}")
print(f"Longueur totale: {longueur}")
print(f"Nombre de tableaux sauvés: {len(tableaux_sauve)}")
print(f"Surface totale: {surface}")
print(f"Surface max: {surface_max}")

cleaned_tableaux_sauve = []
for tableau in tableaux_sauve:
    cleaned_tableaux_sauve.append({
        "id": tableau["nom"],
        "x": round(tableau["position"][0], 1),
        "y": round(tableau["position"][1], 1)
    })

with open('oeuvres_sauve.json', 'w') as file:
    json.dump(cleaned_tableaux_sauve, file, indent=0)
