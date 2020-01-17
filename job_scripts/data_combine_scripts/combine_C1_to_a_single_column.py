import os
import csv
import fileinput

# Read individual files 
path = 'C:\\temp'
resultsFile = "results.dat"
fileNames = [fn for fn in os.listdir(path) if fn.endswith('.csv')]

with open(resultsFile, 'wb') as fout, fileinput.input(fileNames, 'rb') as fin:
    for line in fin:
        fout.write(line)
