//DesignModeler JScript, version: ANSYS DesignModeler Release 19.2 (Aug  8 2018, 15:35:23; 19,2018,220,1) SV4
//Created via: "Write Script: Sketch(es) of Active Plane"
// Written to: G:\DS-TAT\C-5 OSS&E\2-Engineering\1 -Dents\1 - Phase IV\FEM DEVELOPMENT\~2018_Models\support_files\scripts\sketches\face_split.js
//         On: 10/30/18, 11:45:57
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
//p.Sk1 = p.Plane.NewSketch();
//p.Sk1.Name = "Sketch1";

//Edges
//with (p.Sk1)
//{
  //p.Ln7 = Line(0.00000000, 0.00000000, 20.00000000, 0.00000000);
  //p.Ln8 = Line(20.00000000, 0.00000000, 20.00000000, 20.00000000);
  //p.Ln9 = Line(20.00000000, 20.00000000, -0.00000000, 20.00000000);
  //p.Ln10 = Line(-0.00000000, 20.00000000, 0.00000000, 0.00000000);
//}


//Sketch
p.Sk4 = p.Plane.NewSketch();
p.Sk4.Name = "Sketch5";

//Edges
with (p.Sk4)
{
p.Ln7 = Line(0.00000000, 0.00000000, 20.00000000, 0.00000000);
  p.Ln8 = Line(20.00000000, 0.00000000, 20.00000000, 20.00000000);
  p.Ln9 = Line(20.00000000, 20.00000000, -0.00000000, 20.00000000);
  p.Ln10 = Line(-0.00000000, 20.00000000, 0.00000000, 0.00000000);
  p.Cr24 = Circle(7.87720000, 7.87720000, 2.00000000);
  p.Cr25 = Circle(12.12300000, 12.12300000, 2.00000000);
}

//Dimensions and/or constraints
with (p.Plane)
{
  //Dimensions
  var dim;
  dim = HorizontalDim(p.Ln7.Base, 0.00000000, 0.00000000, 
    p.Ln7.End, 20.00000000, 0.00000000, 
    10.07315127, -5.03270601);
  if(dim) dim.Name = "H1";
  dim = VerticalDim(p.Ln8.Base, 20.00000000, 0.00000000, 
    p.Ln8.End, 20.00000000, 20.00000000, 
    31.59221511, 8.01594884);
  if(dim) dim.Name = "V2";
  dim = DistanceDim(p.Cr24.Center, 7.87720000, 7.87720000, 
    p.Ln7, 7.93543664, 0.00000000, 
    6.00484990, -1.87662951);
  if(dim) dim.Name = "L5";
  dim = DistanceDim(p.Cr25.Center, 12.12300000, 12.12300000, 
    p.Ln7, 12.60824030, 0.00000000, 
    12.22243729, -2.12335178);
  if(dim) dim.Name = "L6";
  dim = DistanceDim(p.Cr24.Center, 7.87720000, 7.87720000, 
    p.Ln10, 0.00000000, 8.33921788, 
    -3.42349385, 7.99122824);
  if(dim) dim.Name = "L7";
  dim = DistanceDim(p.Cr25.Center, 12.12300000, 12.12300000, 
    p.Ln10, 0.00000000, 10.66082758, 
    -2.65531468, 11.46000847);
  if(dim) dim.Name = "L8";
  dim = RadiusDim(p.Cr24, -1.99540411, 9.20603394, 0);
  if(dim) dim.Name = "R3";
  dim = RadiusDim(p.Cr25, -2.21983857, 14.05159641, 0);
  if(dim) dim.Name = "R4";

  //Constraints
  //HorizontalCon(p.Ln7);
  HorizontalCon(p.Ln9);
  VerticalCon(p.Ln8);
  VerticalCon(p.Ln10);
  CoincidentCon(p.Ln7.End, 20.00000000, 0.00000000, 
                p.Ln8.Base, 20.00000000, 0.00000000);
  CoincidentCon(p.Ln8.End, 20.00000000, 20.00000000, 
                p.Ln9.Base, 20.00000000, 20.00000000);
  CoincidentCon(p.Ln9.End, -0.00000000, 20.00000000, 
                p.Ln10.Base, -0.00000000, 20.00000000);
  CoincidentCon(p.Ln10.End, 0.00000000, 0.00000000, 
                p.Ln7.Base, 0.00000000, 0.00000000);
  CoincidentCon(p.Ln7.Base, 0.00000000, 0.00000000, 
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
