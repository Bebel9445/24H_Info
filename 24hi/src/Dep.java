public class Dep {
    private int _base;
    private int _pos1;
    private int _pos2;

    public Dep() {
    }

    public int depD(int posAct, int j)
    {
        _base = posAct;
        _pos2 = j;
        int temps = 0;


        if (_base < _pos2)
        {
            while (_base < _pos2)
            {
                temps += 4;
                _base++;
            }
        }
        else if (_base > _pos2)
        {
            while (_base > _pos2)
            {
                temps += 2;
                _base--;
            }
        }
        else if (_base == _pos2)
        {
            temps += 1;
        }

        return temps;
    }

    public int depB(int posAct, int i) {
        _base = posAct;
        _pos1 = i;

        int temps = 0;


        if (_base < _pos1) {
            while (_base < _pos1) {
                temps += 4;
                _base++;
            }
        } else if (_base > _pos1) {
            while (_base > _pos1) {
                temps += 2;
                _base--;
            }
        } else if (_base == _pos1) {
            temps += 1;
        }

        return temps;
    }

    public int[] dep(int posAct, int i, int j)
    {
        _base = posAct;
        _pos1 = i;
        _pos2 = j;

        int[] ret = new int[2];
        int temps = 0;

        if ((_base + _pos1) <= (_base + _pos2))
        {
            //System.out.println("b");
            ret[1] = 0;
            if (_base < _pos1)
            {
                while (_base < _pos1)
                {
                    //System.out.println("je monte");
                    temps += 4;
                    _base++;
                }
            }
            else if (_base > _pos1)
            {
                while (_base > _pos1)
                {
                    //System.out.println("je décends");
                    temps += 2;
                    _base--;
                }
            }
            else if (_base == _pos1)
            {
                temps += 1;
            }
        }
        else
        {
            //System.out.println("d");
            ret[1] = 1;
            if (_base < _pos2)
            {
                while (_base < _pos2)
                {
                    //System.out.println("je monte");
                    temps += 4;
                    _base++;
                }
            }
            else if (_base > _pos2)
            {
                while (_base > _pos2)
                {
                    //System.out.println("je décends");
                    temps += 2;
                    _base--;
                }
            }
            else if (_base == _pos2)
            {
                temps += 1;
            }
        }
        ret[0] = temps;
        return ret;
    }

}
