def mouvement(code:str, drones:list[str]):
    match code[0]:
        case 'e':
            echange(code, drones)
        case 'r':
            rotation(code, drones)
        case 'p':
            permutation(code, drones)
        case 't':
            tourner(code, drones)
        case _:
            raise ValueError(f"Invalid code: {code}")
        
def echange(code, drones):
    drones[int(code[1])-1], drones[int(code[2])-1] = drones[int(code[2])-1], drones[int(code[1])-1]

def rotation(code, drones):
    max_index = len(drones) - 1 # 8
    nb_mouvements = min(int(code[1]) - 1, max_index - (int(code[1]) - 1))
    for i in range(1, nb_mouvements+1):
        drones[int(code[1])-1-i], drones[int(code[1])-1+i] = drones[int(code[1])-1+i], drones[int(code[1])-1-i]

def permutation(code, drones):
    code_echange = "e"
    code_echange += str(drones.index(code[1])+1) + str(drones.index(code[2])+1)
    echange(code_echange, drones)

def tourner(code, drones):
    code_rotation = "r"
    code_rotation += str(drones.index(code[1])+1)
    rotation(code_rotation, drones)

def comparer(liste1, liste2):
    for i in range(len(liste1)):
        if liste1[i] != liste2[i]:
            return False
    return True

with open("mouvement5.txt", "r") as file:
    lines = file.readlines()[0].split(",")

drones = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

origine = drones.copy()

count = 0

while not comparer(drones, origine) or count == 0:
    for i in lines:
        mouvement(i, drones)
    count += 1
    print("count =", count)

print("Les drones sont revenus à leur position d'origine en ", count, "mouvements.")
