#system = GetSystem(Name="SYS") # Specify system name, or
#system = GetAllSystems()[0] # get first system !!! Remember each block is a system !!!
#model = system.GetContainer(ComponentName="Model")


# encoding: utf-8
# Release 19.2
SetScriptVersion(Version="19.2.120")
system1 = GetSystem(Name="SYS")
setup1 = system1.GetContainer(ComponentName="Setup")
#setup1.Edit()
model1 = system1.GetContainer(ComponentName="Model")
setup1.Edit()
#model = ExtAPI.DataModel.Project.Model ## Use when working in side of mechanical
cmd = '''
pressure = model.Analyses[0].AddPressure() # Add a pressure.
part1 = model.Geometry.Children[0]  # Get the first part.
body1 = part1.Children[0]  # Get the first body.
face1 = body1.GetGeoBody().Faces[0]  # Get the first face of the body.
selection = ExtAPI.SelectionManager.CreateSelectionInfo(SelectionTypeEnum.GeometryEntities)  # Create an empty selection.
selection.Entities = [face1]  #  Add the face to the selection.
pressure.Location = selection  # Assign the selection to the pressure.
pressure.Magnitude.Inputs[0].DiscreteValues = [Quantity("0 [s]"), Quantity("1 [s]")]  # Set the time values.
pressure.Magnitude.Output.DiscreteValues = [Quantity("10 [Pa]"), Quantity("20 [Pa]")]  # Set the magnitudes.
'''

model1.SendCommand(Language="Python", Command=cmd)
#model1.Exit()

#model = ExtAPI.DataModel.Project.Model ## Use when working in side of mechanical
#cmd = '''
#pressure = model.Analyses[0].AddPressure() # Add a pressure.
#part1 = model.Geometry.Children[0]  # Get the first part.
#body1 = part1.Children[0]  # Get the first body.
#face1 = body1.GetGeoBody().Faces[0]  # Get the first face of the body.
#selection = ExtAPI.SelectionManager.CreateSelectionInfo(SelectionTypeEnum.GeometryEntities)  # Create an empty selection.

#selection.Entities = [face1]  #  Add the face to the selection.
#pressure.Location = selection  # Assign the selection to the pressure.
#pressure.Magnitude.Inputs[0].DiscreteValues = [Quantity("0 [s]"), Quantity("1 [s]")]  # Set the time values.
#pressure.Magnitude.Output.DiscreteValues = [Quantity("10 [Pa]"), Quantity("20 [Pa]")]  # Set the magnitudes.
#'''

#model.SendCommand(Language="Python", Command=cmd)

# Update the model and perform the analysis
Update()