# This Extension allows introducing Cohesive Zone Material
# Only Bilinear Material Models are allowed
# Created by: Mohamed Senousy
# Date: 04/12/2013

global ContactsLoops, StreamCounter
ContactsLoops = {}
	
def CohesiveZone(analysis):
    ExtAPI.DataModel.CreateObject('Cohesive')
    
def UseIntCounter(a):
    for i in a:
        if a.count(i) > 1:
            UseInt = 1
            return UseInt
    UseInt=0
    return UseInt

def populate(load,property): 
    newContactList=[]  
    property.ClearOptions()
    counter = 0    
    dataobjects = ExtAPI.DataModel.AnalysisList[0].DataObjects
    names = dataobjects.NamesByType('ContactGroup')
    for name in names:
        connetDataObjects = dataobjects.GetByName(name).DataObjects
        CNames = connetDataObjects.Names
        for cName in CNames:
            typeC = connetDataObjects.GetByName(cName).Type
            if typeC == 'ConnectionGroup':
                contactslist = connetDataObjects.GetByName(cName).DataObjects.NamesByType('ContactRegion')
                for contact in contactslist:
                    ContactType = connetDataObjects.GetByName(cName).DataObjects.GetByName(contact).PropertyValue('ContactType')
                    ContactState = connetDataObjects.GetByName(cName).DataObjects.GetByName(contact).PropertyValue("Suppressed")
                    if ContactState == 0 and ContactType == 1:
                        newContactList.append(contact)

        UseInt = UseIntCounter(list(newContactList))                
        for i in newContactList:
            if UseInt == 1:
                i = i + "_"+counter.ToString()
            property.AddOption(i)
            counter += 1
            ContactsLoops.Add(i,counter)
    return ContactsLoops  


def WriteCohesiveZone(load,stream):
    SelectedContact = load.Properties["ContactSelect"].Value
    CIDinWB = int(ContactsLoops[SelectedContact])
    stream.Write("! This code is an APDL to collect 171 and 178 type numbers\n")
    stream.Write("/prep7\n")
    stream.Write("esel,s,ename,,171,178\n")
    stream.Write("*get,e1,elem,,num,max\n")
    stream.Write("*dim,ElemntArray,array,e1,2\n")
    stream.Write("*vget,ElemntArray(1,1),elem,1,esel \n")
    stream.Write("*vmask,ElemntArray(1,1)\n")
    stream.Write("*vget,ElemntArray(1,2),elem,1,attr,type\n")
    stream.Write("*get,t1,etyp,,num,max \n")
    stream.Write("*dim,ElemntTypeArray,array,t1\n")
    stream.Write("*vmask,ElemntArray(1,1)\n")
    stream.Write("*voper,ElemntTypeArray(1),ElemntArray(1,2),scatter,ElemntArray(1,2)\n")
    stream.Write("*vmask,ElemntTypeArray(1)\n")
    stream.Write("*vscfun,tcount,num,ElemntTypeArray(1)\n")
    stream.Write("*dim,ComprsdElementTypeArray,array,tcount\n")
    stream.Write("*vmask,ElemntTypeArray(1)\n")
    stream.Write("*vfun,ComprsdElementTypeArray(1),comp,ElemntTypeArray(1)\n")

    stream.Write("cID = ComprsdElementTypeArray(" +CIDinWB.ToString()+ ")\n")
    stream.Write("tID = cID + 1\n")

    K1 = load.Properties["KeyOpt1"].Value
    NCS = load.Properties["KeyOpt1"].Properties["NormalContactStress"].Value
    TCS = load.Properties["KeyOpt1"].Properties["TangentialContactStress"].Value    
    DCf = load.Properties["KeyOpt1"].Properties["DampingCoef"].Value
    TS = load.Properties["KeyOpt1"].Properties["TangentialSlip"].Value
    if K1 == "CBDE":
        TCF = load.Properties["KeyOpt1"].Properties["TangentialCriticalFractureEnergy"].Value
        NCF = load.Properties["KeyOpt1"].Properties["NormalCriticalFractureEnergy"].Value
        stream.Write("TB,czm,cID,1,1,CBDE\n")
        stream.Write("TBDATA,1," + NCS.ToString()+ "," + NCF.ToString()+ "," + TCS.ToString()+ "," + TCF.ToString()+ "," + DCf.ToString()+ "," + TS.ToString()+ ",\n")
        stream.Write("TB,CZM,tID,1,1,CBDE\n")
        stream.Write("TBDATA,1," + NCS.ToString()+ "," + NCF.ToString()+ "," + TCS.ToString()+ "," + TCF.ToString()+ "," + DCf.ToString()+ "," + TS.ToString()+ ",\n")
    else:
        stream.Write("TB,czm,cID,1,1,CBDD\n")
        stream.Write("TBDATA,1," + NCS.ToString()+ ",," + TCS.ToString()+ ",," + DCf.ToString()+ "," + TS.ToString()+ ",\n")
        stream.Write("TB,CZM,tID,1,1,CBDD\n")
        stream.Write("TBDATA,1," + NCS.ToString()+ ",," + TCS.ToString()+ ",," + DCf.ToString()+ "," + TS.ToString()+ ",\n")
    stream.Write("allsel\n")
    stream.Write("/solu\n")       