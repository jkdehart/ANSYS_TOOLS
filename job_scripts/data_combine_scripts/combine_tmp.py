import os
import glob

# File and Path Settings
filePath = 'C:\\temp\\files'
fileNamePattern = '*.csv'
fileNames = glob.glob(filePath + fileNamePattern)

# Count number of rows in data file
f = open(fileNames[0], 'r')
nRows = sum(not line.isspace() for line in f)
f.close()

# Combine data file columns
files = [open(f, 'rb') for f in glob.glob("*.csv")]

# Combine columns into single file
fOut = open('results.dat', 'wb')
for row in range(1,nRows):
    for f in files:
        fOut.write(f.readline().strip())
        #fOut.write(',')
    #fOut.write(os.linesep)
fOut.close()


