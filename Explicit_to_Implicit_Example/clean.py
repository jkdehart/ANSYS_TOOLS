# Author: J.K. DeHart
# Date: 2/22/19
# Description: Cleans the folder files prior to writing new set
###############################################################################
import glob
import os

# Path and file settings
path = r'C:\\temp\\files' # Must include the prepended 'r'
fileNames = glob.glob(path + "\*.*") 

for f in fileNames:
    os.remove(f)