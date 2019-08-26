//DesignModeler JScript, version: ANSYS DesignModeler Release 19.2 (Aug  8 2018, 15:35:23; 19,2018,220,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\jdehart\Documents\~working\~buckets\Support Files\sketch_scripts\indenter.js
//         On: 10/19/18, 09:50:11
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
p.Sk10 = p.Plane.NewSketch();
p.Sk10.Name = "Sketch4";

//Edges
with (p.Sk10)
{
  p.Ln48 = Line(0.00000000, 0.63500000, 0.00000000, 1.13500000);
  p.Ln49 = Line(0.00000000, 1.13500000, 1.50000000, 1.13500000);
  p.Cr50 = ArcCtrEdge(
              0.00000000, 7.63500000,
              0.00000000, 0.63500000,
              1.40000000, 0.77642872);
  p.Ln51 = Line(1.50000000, 1.13500000, 1.50000000, 0.89890321);
  p.Cr52 = ArcCtrEdge(
              1.37500000, 0.89890321,
              1.40000000, 0.77642872,
              1.50000000, 0.89890321);
  p.Cr52.DeleteCenter();
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Dimensions
  var dim;
  dim = HorizontalDim(p.Ln49.Base, 0.00000000, 1.13500000, 
    p.Ln49.End, 1.50000000, 1.13500000, 
    0.73376243, 1.28725093);
  if(dim) dim.Name = "H6";
  dim = VerticalDim(p.Ln51.Base, 1.50000000, 1.13500000, 
    p.Cr50.Base, 0.00000000, 0.63500000, 
    1.71309592, 0.85634153);
  if(dim) dim.Name = "V9";
  dim = VerticalDim(p.Origin, 0.00000000, 0.00000000, 
    p.Cr50.Base, 0.00000000, 0.63500000, 
    -0.35239309, 0.29758278);
  if(dim) dim.Name = "V10";
  dim = RadiusDim(p.Cr52, 1.40094039, 0.89850331, 0);
  if(dim) dim.Name = "R11";
  dim = RadiusDim(p.Cr50, 2.87245132, 1.46597905, 0);
  if(dim) dim.Name = "R12";

  //Constraints
  HorizontalCon(p.Ln49);
  VerticalCon(p.Ln48);
  VerticalCon(p.Ln51);
  TangentCon(p.Cr52, 1.40000000, 0.77642872, 
                p.Cr50, 1.40000000, 0.77642872);
  TangentCon(p.Cr52, 1.50000000, 0.89890321, 
                p.Ln51, 1.06271443, 1.07207484);
  CoincidentCon(p.Ln48.Base, 0.00000000, 0.63500000, 
                p.YAxis, 0.00000000, 0.74248551);
  CoincidentCon(p.Ln48.End, 0.00000000, 1.13500000, 
                p.YAxis, 0.00000000, 1.19492563);
  CoincidentCon(p.Ln49.Base, 0.00000000, 1.13500000, 
                p.Ln48.End, 0.00000000, 1.13500000);
  CoincidentCon(p.Cr50.Center, 0.00000000, 7.63500000, 
                p.YAxis, 0.00000000, 3.11873970);
  CoincidentCon(p.Cr50.Base, 0.00000000, 0.63500000, 
                p.Ln48.Base, 0.00000000, 0.63500000);
  CoincidentCon(p.Ln51.Base, 1.50000000, 1.13500000, 
                p.Ln49.End, 1.50000000, 1.13500000);
  CoincidentCon(p.Cr50.End, 1.40000000, 0.77642872, 
                p.Cr52.Base, 1.40000000, 0.77642872);
  CoincidentCon(p.Ln51.End, 1.50000000, 0.89890321, 
                p.Cr52.End, 1.50000000, 0.89890321);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
