//DesignModeler JScript, version: ANSYS DesignModeler Release 19.2 (Aug  8 2018, 15:35:23; 19,2018,220,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: G:\DS-TAT\C-5 OSS&E\2-Engineering\1 -Dents\1 - Phase IV\FEM DEVELOPMENT\~2018_Models\support_files\scripts\sketches\face_split_square.js
//         On: 11/01/18, 10:51:06
//Using:
//  agb ... pointer to batch interface


//Note:
// You may be able to re-use below JScript function via cut-and-paste;
// however, you may have to re-name the function identifier.
//

function planeSketchesOnly (p)
{

//Plane
p.Plane  = agb.GetActivePlane();
p.Origin = p.Plane.GetOrigin();
p.XAxis  = p.Plane.GetXAxis();
p.YAxis  = p.Plane.GetYAxis();

//Sketch
p.Sk8 = p.Plane.NewSketch();
p.Sk8.Name = "Sketch8";

//Edges
with (p.Sk8)
{
  p.Ln41 = Line(-3.00000000, 3.00000000, 3.00000000, 3.00000000);
  p.Ln42 = Line(3.00000000, 3.00000000, 3.00000000, -3.00000000);
  p.Ln43 = Line(3.00000000, -3.00000000, -3.00000000, -3.00000000);
  p.Ln44 = Line(-3.00000000, -3.00000000, -3.00000000, 3.00000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Dimensions
  var dim;
  dim = HorizontalDim(p.Ln41.Base, -3.00000000, 3.00000000, 
    p.Ln41.End, 3.00000000, 3.00000000, 
    1.15846269, 11.90007217);
  if(dim) dim.Name = "H1";
  dim = VerticalDim(p.Ln42.Base, 3.00000000, 3.00000000, 
    p.Ln42.End, 3.00000000, -3.00000000, 
    11.98528350, -0.42423890);
  if(dim) dim.Name = "V2";

  //Constraints
  HorizontalCon(p.Ln41);
  HorizontalCon(p.Ln43);
  VerticalCon(p.Ln42);
  VerticalCon(p.Ln44);
  CoincidentCon(p.Ln41.End, 3.00000000, 3.00000000, 
                p.Ln42.Base, 3.00000000, 3.00000000);
  CoincidentCon(p.Ln42.End, 3.00000000, -3.00000000, 
                p.Ln43.Base, 3.00000000, -3.00000000);
  CoincidentCon(p.Ln43.End, -3.00000000, -3.00000000, 
                p.Ln44.Base, -3.00000000, -3.00000000);
  CoincidentCon(p.Ln44.End, -3.00000000, 3.00000000, 
                p.Ln41.Base, -3.00000000, 3.00000000);
  SymmetryCon(p.Ln42, p.Ln44, p.YAxis, 0);
  SymmetryCon(p.Ln43, p.Ln41, p.XAxis, 0);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
