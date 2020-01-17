import os
import glob
import codecs
import re

# Path and file settings
path = 'C:\\temp\\files\\'

# Determine the number of row in data file
# [must request in binary mode for correct count]
tmpFiles = [open(f, 'rb') for f in glob.glob(path + "*.csv")]
nRows = sum(not line.isspace() for line in tmpFiles[0])

# Read individual results files and write combine rows
files = [codecs.open(f, 'rb', encoding='utf-16') for f in sorted(glob.glob(os.path.join(path, '*.csv')))]
with codecs.open(path + 'results.dat', 'wb', encoding='utf-16') as fout:
    for row in range(1, nRows):
        for f in files: 
            fout.write(f.readline().strip())
            fout.write(',')
        fout.write(os.linesep)
fout.close()
