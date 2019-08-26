/////////////////////////////////////////////////////////////////////////////////////////
// Author: J.K. DeHart
// Date: 1/31/19
// Title: Explicit to Implicit Stress - Export Script
/////////////////////////////////////////////////////////////////////////////////////////
// Description: (Based on work by: Jiaping Zhang, 05/13/2014, Jiaping.Zhang@ansys.com)
//
//
/////////////////////////////////////////////////////////////////////////////////////////
// Note: Mechanical Option settings (Tools --> Options --> Export --> Text File Export
// File Encoding: UNICODE (Windows Only)
// Automatically Open Excel = No
// Include Node Numbers = No
// Include Node Location = No
// Show Tensor Components = No

// Named selection designator - User must create a named section renamed to 'Body'
// for the export
var NamedBody = "Body";
var FileName = "External_Data_Shell_Stress.dat" 


var Solu = DS.Tree.FirstActiveBranch.AnswerSet;
var Env = DS.Tree.FirstActiveBranch.Environment;
DS.Script.changeActiveObject(Solu.ID);

//--------------Get the working directory and open a file for output--------------
var aa = DS.WorkingDir; // Fetch the current working directory for the project
bb = aa.split("\\"); // split the directory path into a text array
currentworkingdirectory = new Array(); 

// Build the working directory string 
for(i = 1; i < bb.length - 3; i++)
{
	currentworkingdirectory = currentworkingdirectory + bb[i - 1] + "/";
}

// Create the results file name string
Resultfile = currentworkingdirectory + FileName; // Name of the results file

var fso = new ActiveXObject("Scripting.FileSystemObject");
var f1 = fso.createtextfile(Resultfile, true);

fName = "tmpE2I.txt";  // A temporary file that will not be used.

//------------Deformed X coordinate------------   
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCX+UX";
DS.Script.doCalculateResults();
var fText1 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//--------------Deformed Y coordinate-----  
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCY+UY";
DS.Script.doCalculateResults();
var fText2 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------Deformed Z coordinate----  
DS.Script.doInsertCustomResult();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Expression");
ListView.ItemValue = "LOCZ+UZ";
DS.Script.doCalculateResults();
var fText3 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------SX_TOP-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "X Axis"; 
DS.Script.doCalculateResults();
var fText4 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SY_TOP----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Y Axis"; 
DS.Script.doCalculateResults();
var fText5 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SZ_TOP-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Z Axis"; 
DS.Script.doCalculateResults();
var fText6 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------SXY_TOP-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XY Plane"; 
DS.Script.doCalculateResults();
var fText7 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SYZ_TOP-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "YZ Plane"; 
DS.Script.doCalculateResults();
var fText8 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SXZ_TOP-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Top"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XZ Plane"; 
DS.Script.doCalculateResults();
var fText9 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//-------------------------  

//------------SX_BOT-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "X Axis"; 
DS.Script.doCalculateResults();

var fText10 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SY_BOT----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Y Axis"; 
DS.Script.doCalculateResults();
var fText11 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SZ_BOT-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Z Axis"; 
DS.Script.doCalculateResults();
var fText12 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------SXY_BOT-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XY Plane"; 
DS.Script.doCalculateResults();
var fText13 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SYZ_BOT-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "YZ Plane"; 
DS.Script.doCalculateResults();
var fText14 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SXZ_BOT-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Bottom"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XZ Plane"; 
DS.Script.doCalculateResults();
var fText15 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------------------- 

//------------SX_MID-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "X Axis"; 
DS.Script.doCalculateResults();
var fText16 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SY_MID----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Y Axis"; 
DS.Script.doCalculateResults();
var fText17 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SZ_MID-----  
DS.Script.doInsertSolutionNormalStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "Z Axis"; 
DS.Script.doCalculateResults();
var fText18 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();


//------------SXY_MID-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XY Plane"; 
DS.Script.doCalculateResults();
var fText19 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SYZ_MID-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "YZ Plane"; 
DS.Script.doCalculateResults();
var fText20 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//------------SXZ_MID-----  
DS.Script.doInsertSolutionShearStress();
ListView.ActivateItem("Scoping Method");
ListView.ItemValue = "Named Selection";
ListView.ActivateItem("Named Selection");
ListView.ItemValue = NamedBody;
ListView.ActivateItem("Position");
ListView.ItemValue = "Middle"; 
ListView.ActivateItem("Orientation");
ListView.ItemValue = "XZ Plane"; 
DS.Script.doCalculateResults();
var fText21 = DS.Tree.FirstActiveObject.CreateTabbedFile(fName);
WBScript.Silent == true;
DS.Script.Delete();

//-------------------------
//-------------------------    

fText1 = fText1.split("\n");
fText2 = fText2.split("\n");
fText3 = fText3.split("\n");
fText4 = fText4.split("\n");
fText5 = fText5.split("\n");
fText6 = fText6.split("\n");
fText7 = fText7.split("\n");
fText8 = fText8.split("\n");
fText9 = fText9.split("\n");
fText10 = fText10.split("\n");
fText11 = fText11.split("\n");
fText12 = fText12.split("\n");
fText13 = fText13.split("\n");
fText14 = fText14.split("\n");
fText15 = fText15.split("\n");
fText16 = fText16.split("\n");
fText17 = fText17.split("\n");
fText18 = fText18.split("\n");
fText19 = fText19.split("\n");
fText20 = fText20.split("\n");
fText21 = fText21.split("\n");
//fText22 = fText22.split("\n");
//fText23 = fText21.split("\n");
//fText24 = fText21.split("\n");

length = fText1.length;

var Node_COORX = new Array();
var Node_COORY = new Array();
var Node_COORZ = new Array();

var SXT = new Array();
var SYT = new Array();
var SZT = new Array();

var SXYT = new Array();
var SYZT = new Array();
var SXZT = new Array();

var SXB = new Array();
var SYB = new Array();
var SZB = new Array();

var SXYB = new Array();
var SYZB = new Array();
var SXZB = new Array();

var SXM = new Array();
var SYM = new Array();
var SZM = new Array();

var SXYM = new Array();
var SYZM = new Array();
var SXZM = new Array();

//var EQ_EEPL_ALL= new Array();

StringTotal="X, Y, Z, SX(TOP), SY(TOP), SZ(TOP), SXY(TOP), SYZ(TOP), SXZ(TOP), SX(BOT), SY(BOT), SZ(BOT), SXY(BOT), SYZ(BOT), SXZ(BOT), SX(MID), SY(MID), SZ(MID), SXY(MID), SYZ(MID), SXZ(MID)";

f1.WriteLine(StringTotal);

for(i=0;i<length-1;i++)
{
	Node_COORX[i] = fText1[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");
	Node_COORY[i] = fText2[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");
	Node_COORZ[i] = fText3[i].replace(/(\r\n|\n|\r)/gm," ").replace("()"," ");

	SXT[i] = fText4[i].replace(/(\r\n|\n|\r)/gm," ");
	SYT[i] = fText5[i].replace(/(\r\n|\n|\r)/gm," ");
	SZT[i] = fText6[i].replace(/(\r\n|\n|\r)/gm," ");

	SXYT[i] = fText7[i].replace(/(\r\n|\n|\r)/gm," ");
	SYZT[i] = fText8[i].replace(/(\r\n|\n|\r)/gm," ");
	SXZT[i] = fText9[i].replace(/(\r\n|\n|\r)/gm," ");

	SXB[i] = fText10[i].replace(/(\r\n|\n|\r)/gm," ");
	SYB[i] = fText11[i].replace(/(\r\n|\n|\r)/gm," ");
	SZB[i] = fText12[i].replace(/(\r\n|\n|\r)/gm," ");

	SXYB[i] = fText13[i].replace(/(\r\n|\n|\r)/gm," ");
	SYZB[i] = fText14[i].replace(/(\r\n|\n|\r)/gm," ");
	SXZB[i] = fText15[i].replace(/(\r\n|\n|\r)/gm," ");

	SXM[i] = fText16[i].replace(/(\r\n|\n|\r)/gm," ");
	SYM[i] = fText17[i].replace(/(\r\n|\n|\r)/gm," ");
	SZM[i] = fText18[i].replace(/(\r\n|\n|\r)/gm," ");

	SXYM[i] = fText19[i].replace(/(\r\n|\n|\r)/gm," ");
	SYZM[i] = fText20[i].replace(/(\r\n|\n|\r)/gm," ");
	SXZM[i] = fText21[i].replace(/(\r\n|\n|\r)/gm," ");
	
	//EQ_EEPL_ALL[i] = fText22[i].replace(/(\r\n|\n|\r)/gm," ");

	StringTotal = Node_COORX[i] + "," + Node_COORY[i] + "," + Node_COORZ[i] + "," + SXT[i] + "," + SYT[i] + "," + SZT[i] + "," + SXYT[i] + "," + SYZT[i] + "," + SXZT[i] + "," + SXB[i] + "," + SYB[i] + "," + SZB[i] + "," + SXYB[i] + "," + SYZB[i] + "," + SXZB[i] + "," + SXM[i] + "," + SYM[i] + "," + SZM[i] + "," + SXYM[i] + "," + SYZM[i] + "," + SXZM[i]; // Use space to separate
	f1.WriteLine(StringTotal);
}

f1.Close();
DS.Script.fillTree();
DS.Script.changeActiveObject(Env.ID);
