//DesignModeler JScript, version: ANSYS DesignModeler Release 19.2 (Aug  8 2018, 15:35:23; 19,2018,220,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: C:\Users\jdehart\Documents\~working\test_build_1_files\geom_build_scripts\bottom_face.js
//         On: 10/12/18, 09:46:39
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
p.Sk2 = p.Plane.NewSketch();
p.Sk2.Name = "Sketch1";

//Edges
with (p.Sk2)
{
  p.Ln13 = Line(0.00000000, 0.00000000, 20.00000000, 0.00000000);
  p.Ln14 = Line(20.00000000, 0.00000000, 20.00000000, 20.00000000);
  p.Ln15 = Line(20.00000000, 20.00000000, -0.00000000, 20.00000000);
  p.Ln16 = Line(-0.00000000, 20.00000000, 0.00000000, 0.00000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Dimensions
  var dim;
  dim = HorizontalDim(p.Ln13.Base, 0.00000000, 0.00000000, 
    p.Ln13.End, 20.00000000, 0.00000000, 
    10.07315127, -5.03270601);
  if(dim) dim.Name = "H1";
  dim = VerticalDim(p.Ln14.Base, 20.00000000, 0.00000000, 
    p.Ln14.End, 20.00000000, 20.00000000, 
    31.59221511, 8.01594884);
  if(dim) dim.Name = "V2";

  //Constraints
  HorizontalCon(p.Ln13);
  HorizontalCon(p.Ln15);
  VerticalCon(p.Ln14);
  VerticalCon(p.Ln16);
  CoincidentCon(p.Ln13.End, 20.00000000, 0.00000000, 
                p.Ln14.Base, 20.00000000, 0.00000000);
  CoincidentCon(p.Ln14.End, 20.00000000, 20.00000000, 
                p.Ln15.Base, 20.00000000, 20.00000000);
  CoincidentCon(p.Ln15.End, -0.00000000, 20.00000000, 
                p.Ln16.Base, -0.00000000, 20.00000000);
  CoincidentCon(p.Ln16.End, 0.00000000, 0.00000000, 
                p.Ln13.Base, 0.00000000, 0.00000000);
  CoincidentCon(p.Ln13.Base, 0.00000000, 0.00000000, 
                p.Origin, 0.00000000, 0.00000000);
}

p.Plane.EvalDimCons(); //Final evaluate of all dimensions and constraints in plane

return p;
} //End Plane JScript function: planeSketchesOnly

//Call Plane JScript function
var ps1 = planeSketchesOnly (new Object());

//Finish
agb.Regen(); //To insure model validity
//End DM JScript
