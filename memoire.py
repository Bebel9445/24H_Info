grille = []

nb_ligne = 0

with open("grid32.txt", "r", encoding="utf-16") as f:
    for line in f:
        nb_ligne += 1
        if nb_ligne >= 2 and nb_ligne <= 301:
            for number in line.split():
                grille.append(int(number))



grille_passage = [0 for _ in range(400 * 300)]


def goto(tab, index):
    grille_passage[index] += 1
    return tab[index]

start = 292*400+375

while grille_passage[start] < 10:
    start = goto(grille, start)

print("La case qui boucle est :", start)