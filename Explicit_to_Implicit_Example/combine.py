# Author: J.K. DeHart
# Date: 2/22/19
# Description: Combines individual results files into single .csv file
###############################################################################

import glob
import os
import codecs

# Path and file settings
path = r'C:\\temp\\files' # Must include the prepended 'r'
fileNames = glob.glob(path + "\*.csv")
outFileName = 'results.dat'

# Determine the number of row in data file
# [must request in binary mode for correct count]
tmpFile = open(fileNames[0], 'rb')
nRows = sum(not line.isspace() for line in tmpFile)
tmpFile.close()

# Read individual results files and write combine rows
files = [codecs.open(f, 'rb', encoding='utf-16') for f in fileNames]
with codecs.open(path + '\\' + outFileName, 'wb', encoding='utf-16') as fout:
    for row in range(1, nRows):
        for f in files: 
            fout.write(f.readline().strip())
            fout.write(',')
        fout.write(os.linesep) # must be dedented
    fout.close()
