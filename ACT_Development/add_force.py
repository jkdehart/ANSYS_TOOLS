model = ExtAPI.DataModel.Project.Model
force = model.Analyses[0].AddForce() # Add a pressure.
part1 = model.Geometry.Children[0]  # Get the first part.
body1 = part1.Children[0]  # Get the first body.
face1 = body1.GetGeoBody().Faces[0]  # Get the first face of the body.
selection = ExtAPI.SelectionManager.CreateSelectionInfo(SelectionTypeEnum.GeometryEntities)  # Create an empty selection.
selection.Entities = [face1]  #  Add the face to the selection.
force.Location = selection  # Assign the selection to the pressure.
force.Magnitude.Inputs[0].DiscreteValues = [Quantity("0 [s]"), Quantity("1 [s]"), Quantity("2 [s]"), Quantity("3 [s]")]  # Set the time values.
force.Magnitude.Output.DiscreteValues = [Quantity("10 [lbf]"), Quantity("20 [lbf]"), Quantity("20 [lbf]"), Quantity("5 [lbf]")]  # Set the magnitudes.


