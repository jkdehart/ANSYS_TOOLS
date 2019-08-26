//DesignModeler JScript, version: ANSYS DesignModeler Release 19.2 (Aug  8 2018, 15:35:23; 19,2018,220,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\jdehart\Documents\~working\~buckets\Support Files\sketch_scripts\support.js
//         On: 10/19/18, 09:39:18
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
p.Sk6 = p.Plane.NewSketch();
p.Sk6.Name = "Sketch7";

//Edges
with (p.Sk6)
{
  p.Ln29 = Line(-0.01000000, 0.25000000, -0.51000000, 0.25000000);
  p.Ln30 = Line(-0.51000000, 0.25000000, -0.51000000, 4.75000000);
  p.Ln31 = Line(-0.51000000, 4.75000000, -0.01000000, 4.75000000);
  p.Ln32 = Line(-0.01000000, 4.75000000, -0.01000000, 0.25000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Dimensions
  var dim;
  dim = HorizontalDim(p.Ln31.Base, -0.51000000, 4.75000000, 
    p.Ln31.End, -0.01000000, 4.75000000, 
    -0.27811024, 5.13003473);
  if(dim) dim.Name = "H19";
  dim = VerticalDim(p.Ln30.Base, -0.51000000, 0.25000000, 
    p.Ln30.End, -0.51000000, 4.75000000, 
    -1.00212213, 2.42025782);
  if(dim) dim.Name = "V8";
  dim = DistanceDim(p.YAxis, 0.00000000, 5.39962285, 
    p.Ln32, -0.20385951, 4.59063566, 
    0.01663343, 5.55409002);
  if(dim) dim.Name = "L6";
  dim = DistanceDim(p.XAxis, -0.35666558, 0.00000000, 
    p.Ln29, -0.31522993, 0.25338893, 
    -0.91794699, 0.60264750);
  if(dim) dim.Name = "L7";

  //Constraints
  HorizontalCon(p.Ln29);
  HorizontalCon(p.Ln31);
  VerticalCon(p.Ln30);
  VerticalCon(p.Ln32);
  CoincidentCon(p.Ln29.End, -0.51000000, 0.25000000, 
                p.Ln30.Base, -0.51000000, 0.25000000);
  CoincidentCon(p.Ln30.End, -0.51000000, 4.75000000, 
                p.Ln31.Base, -0.51000000, 4.75000000);
  CoincidentCon(p.Ln31.End, -0.01000000, 4.75000000, 
                p.Ln32.Base, -0.01000000, 4.75000000);
  CoincidentCon(p.Ln32.End, -0.01000000, 0.25000000, 
                p.Ln29.Base, -0.01000000, 0.25000000);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
