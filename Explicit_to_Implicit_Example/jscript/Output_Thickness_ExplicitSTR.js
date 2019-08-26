//JScript to Create output file convenient use for Residual Stress import
// Created file will be saved in the same directory of your project.
// Jiaping  Zhang, 05/13/2014, Jiaping.Zhang@ansys.com

var NamedBody="Body";

var Solu = DS.Tree.FirstActiveBranch.AnswerSet;
var Env=DS.Tree.FirstActiveBranch.Environment;
DS.Script.changeActiveObject(Solu.ID);

//--------------Get the working directory and open a file for output--------------

var aa=DS.WorkingDir;
bb=aa.split("\\");
currentworkingdirectory=new Array();

for(i=1;i<bb.length-3;i++)
{
currentworkingdirectory=currentworkingdirectory+bb[i-1]+"/";
}

Resultfile=currentworkingdirectory+"External_Data_shell_thickness.dat"; 

var fso = new ActiveXObject("Scripting.FileSystemObject");
var f1 = fso.createtextfile(Resultfile,true);

    
fName="mytemporary.txt";  // A temporary file that will not be used.

//------------Deformed X coordinate------------   
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection" ;
ListView.ActivateItem("Named Selection");
ListView.ItemValue =NamedBody ;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCX+UX" ;
DS.Script.doCalculateResults();
var fText1 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//--------------Deformed Y coordinate-----  
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection" ;
ListView.ActivateItem("Named Selection");
ListView.ItemValue =NamedBody ;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCY+UY" ;
DS.Script.doCalculateResults();
var fText2 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------Deformed Z coordinate----  
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection" ;
ListView.ActivateItem("Named Selection");
ListView.ItemValue =NamedBody ;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCZ+UZ" ;
DS.Script.doCalculateResults();
var fText3 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------THICKNESS----  
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection" ;
ListView.ActivateItem("Named Selection");
ListView.ItemValue =NamedBody ;
ListView.ActivateItem("Expression");
ListView.ItemValue = "THICKNESS" ;
DS.Script.doCalculateResults();
var fText4 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();
//------------------------- 
//-------------------------
//-------------------------    

fText1=fText1.split("\n");
fText2=fText2.split("\n");
fText3=fText3.split("\n");
fText4=fText4.split("\n");

length=fText1.length;


var Node_COORX= new Array();
var Node_COORY= new Array();
var Node_COORZ= new Array();

var THK= new Array();

StringTotal="X,Y,Z,THICKNESS";
f1.WriteLine(StringTotal);

for(i=1;i<length-1;i++)
{
Node_COORX[i]=fText1[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");
Node_COORY[i]=fText2[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");
Node_COORZ[i]=fText3[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");

THK[i]=fText4[i].replace(/(\r\n|\n|\r)/gm," ");


StringTotal=Node_COORX[i]+","+Node_COORY[i]+","+Node_COORZ[i]+","+THK[i]; // Use space to separate
f1.WriteLine(StringTotal);
}

f1.Close();

DS.Script.fillTree();
DS.Script.changeActiveObject(Env.ID);

