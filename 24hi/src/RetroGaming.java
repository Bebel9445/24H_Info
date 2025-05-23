import java.io.*;
import java.util.Scanner;

public class RetroGaming {

    public static void main(String args[])
    {

        int[][] tab = new int[3000][4000];
        int time = 0;

        try
        {
            // Le fichier d'entrée
            File file = new File("src/course3.txt");
            // Créer l'objet File Reader
            Scanner scanner = new Scanner(file);

            //renvoie true s'il y a une autre ligne à lire
            int i = 0;
            int j = 0;
            while(scanner.hasNext())
            {
                if (j < 4000) {
                    tab[i][j] = Integer.parseInt(scanner.next());
                    j++;
                }
                else {
                    j = 0;
                    i++;
                }
            }
            scanner.close();
        }
        catch(IOException e)
        {
            e.printStackTrace();
        }

        /*System.out.println(tab[0][0]);
        System.out.println(tab[0][1]);
        System.out.println(tab[0][2]);*/

        Dep d = new Dep();

        int k = 0;
        int l = 0;
        while ((k < 3000) && (l < 4000))
        {
            if (k == 2999)
            {
                time += d.depD(tab[k][l], tab[k][l+1]);
                l++;
            }
            else if (l == 3999)
            {
                time += d.depB(tab[k][l], tab[k+1][l]);
                k++;
            }
            else {
                int[] truc = d.dep(tab[k][l], tab[k + 1][l], tab[k][l + 1]);
                time += truc[0];
                if (truc[1] == 0)
                {
                    k++;
                }
                else {
                    l++;
                }
            }
            System.out.println(time);
            //System.out.println("k : " + k);               1457560
            //System.out.println("l : " + l);
        }
    }

    //16J 20H 52M 40S


}
