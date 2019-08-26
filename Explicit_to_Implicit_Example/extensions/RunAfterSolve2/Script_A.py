import os
import glob
import codecs
import re

pathName = r'C:\\temp\\files' # Must include the prepended 'r'
resultsList = ["X","Y","Z","SXT","SYT","SZT","SXYT","SYZT","SXZT","SXM","SYM","SZM","SXYM","SYZM","SXZM","SXB","SYB","SZB","SXYB","SYZB","SXZB","THK"]

def PostFinished(Analysis):   #this is run every time you solve or evaluate all results.
    ExportResults(Analysis)

def GetObjectsForExport():
    MyObjects=[]
    for resultName in resultsList:
	DefObjs = ExtAPI.DataModel.GetObjectsByName(resultName)
	for DefObj in DefObjs:
            MyObjects.append(DefObj)
            ExtAPI.Log.WriteMessage(resultName)
    return MyObjects

def ExportResults(Analysis):
    print("Writing results files...")
    MyObjs = GetObjectsForExport()
    count = 0
    for Obj in MyObjs:
        FilePath = pathName + "\\" + str(count).zfill(3) + resultsList[count] + ".csv"
        RW = ResultWriter()
        RW.Object = Obj
        RW.Path = FilePath
        ExtAPI.Application.InvokeUIThread(WriteResults, RW)  #initiate this on the main UI thread.
        count = count + 1
    pass

    #ExtAPI.Application.InvokeUIThread(createResultsFile)  #initiate this on the main UI thread.

#Create this object class to hold multiple information items you can pass to another function
class ResultWriter:
    def __init__(self):
        self.Object = None; self.Path = None

def WriteResults(RW): #on the main UI thread
    RW.Object.ExportToTextFile(True, RW.Path)
	
# def createResultsFile(): #on the main UI thread

	# # Path and file settings
	# path = pathName
	# fileNames = glob.glob(path + "\*.csv") 

	# # Determine the number of row in data file
	# # [must request in binary mode for correct count]
	# tmpFile = open(fileNames[0], 'rb')
	# nRows = sum(not line.isspace() for line in tmpFile)
	# tmpFile.close()
	# ExtAPI.Log.WriteMessage(str(nRows))

	# # Read individual results files and write combine rows
	# files = [codecs.open(f, 'rb', encoding='utf-16') for f in fileNames]
	# with codecs.open(path + '\\results.dat', 'wb', encoding='utf-16') as fout:
		# for row in range(1, nRows):
			# for f in files: 
				# fout.write(f.readline().strip())
				# fout.write(',')
			# fout.write(os.linesep)
	# fout.close()

	