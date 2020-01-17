import glob
import os

# Determine the number of row in data file
tmpFiles = [open(f, 'r') for f in glob.glob("*.csv")]
nRows = sum(not line.isspace() for line in tmpFiles[0])

# Combine data file columns
files = [open(f, 'r') for f in glob.glob("*.csv")]

delimieter = ','

fout = open ("results.dat", 'w')
for row in range(1, nRows):
    for f in files:
        fout.write(f.readline().strip())
        fout.write(delimieter)
        fout.write("\r\n")
    fout.write(os.linesep)
fout.close()
