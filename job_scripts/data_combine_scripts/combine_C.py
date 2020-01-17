import os
import os.path
import sys

# Read individual files 
path = 'C:\\temp'
files = [fn for fn in os.listdir(path) if fn.endswith('.csv')]

with open(files[0], 'rb') as resultsCol:
    with open('results.dat', 'wb', ) as resultsFile:
        for line in resultsCol:
            if not line.strip(): continue
            resultsFile.write(line)

resultsCol.close()
resultsFile.close()
