# import pandas as pd
# import numpy as np
import csv
import os
import glob

pathName = r'C:\temp' # Must include the prepended 'r'
fileNames = glob.glob(pathName + "\*.csv") 

def PostFinished(Analysis):   #this is run every time you solve or evaluate all results.
    ExportResults(Analysis)

def GetObjectsForExport():
    MyObjects=[]
    #DefObjs = ExtAPI.DataModel.GetObjectsByType(DataModelObjectCategory.NormalStress)
    DefObjs = ExtAPI.DataModel.GetObjectsByName("NS_X")
    #DefObjs = ExtAPI.DataModel.Project.Model.Analyses[0].Solution.Children[1] # Starts at 1 at child
    for DefObj in DefObjs:
        #if DefObj.Location.GetType()==Ansys.Mechanical.Selection.PathLocation:
        #    if str(DefObj.NormalOrientation)=="ZAxis":
                MyObjects.append(DefObj)
    #return DefObjs
    return MyObjects

def ExportResults(Analysis):
    MyObjs = GetObjectsForExport()
    for Obj in MyObjs:
        #FilePath = Analysis.WorkingDir + "Obj" + str(Obj.ObjectId) + ".txt"
        FilePath = pathName + "\\" + "Obj" + str(Obj.ObjectId) + ".csv"
        RW = ResultWriter()
        RW.Object = Obj
        RW.Path = FilePath
        ExtAPI.Application.InvokeUIThread(WriteResults, RW)  #initiate this on the main UI thread.
        #ExtAPI.Application.InvokeUIThread(BuildCSV)  #initiate this on the main UI thread.
    pass

#Create this object class to hold multiple information items you can pass to another function
class ResultWriter:
    def __init__(self):
        self.Object = None; self.Path = None

def WriteResults(RW): #on the main UI thread
    RW.Object.ExportToTextFile(True, RW.Path)
	
# def BuildCSV(): # on the main UI thread
    # header_saved = True
    # with open(pathName+'\output.csv','wb') as fout:
        # for filename in fileNames:
            # with open(filename) as fin:
                # header = next(fin)
                # if not header_saved:
                    # fout.write(header)
                    # header_saved = True
                # for line in fin:
                    # fout.write(line)
	