import os
import os.path
import csv
import sys
import csv

# Read individual files 
inputdirectory = "C:\\temp"
csv_files = [fn for fn in os.listdir(inputdirectory) if fn.endswith('.csv')]

with open(csv_files[0], "r") as csv_file:
    read = csv.reader((line.replace('\0','') for line in csv_file))
    for row in read :
        print (row)


