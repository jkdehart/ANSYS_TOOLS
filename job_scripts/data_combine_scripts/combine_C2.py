import glob
with ('out.csv', 'w') as fout:
    for fname in glob.glob('*.csv'):
        with open(fname, 'r') as fin:
            fout.write(fin.read())
