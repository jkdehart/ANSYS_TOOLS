# Author: J.K. DeHart
# Date: 2/18/19
# Description: ANSYS Workbench script to drive the explicit to implicit solver model
#######################################################################################
# encoding: utf-8
# Release 19.2
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

print("Starting E2I Solve on --> " + socket.gethostname())
SetScriptVersion(Version="19.2.120")
unitSystem1 = SetProjectUnitSystem(UnitSystemName="BIN_STANDARD")
Reset()

# Clean out the working folder
print("Deleting old files")
RunScript(FilePath=GetAbsoluteUserPathName("~working/dev/scripts/clean.py"))

#######################################################################################
# Open the model baseline template
print("Loading Model")
Open(FilePath=GetAbsoluteUserPathName("~working/dev/exp2imp_A.wbpj"))

# Load the extension if not already set in template model
#Extensions.LoadExtension(
#    Id="RunAfterSolve2",
#    Version="1.0",
#    Format="Scripted")
#######################################################################################

#######################################################################################
# Update the design points
# The base script will replace paramter value with arg1, agr2,... for file writer
print("Updating Parameters")
designPoint1 = Parameters.GetDesignPoint(Name="0")
parameter1 = Parameters.GetParameter(Name="P1")
designPoint1.SetParameterExpression(
    Parameter=parameter1,
    Expression="0.125 [in]")
parameter2 = Parameters.GetParameter(Name="P2")
designPoint1.SetParameterExpression(
    Parameter=parameter2,
    Expression="-0.125 [in]")
parameter3 = Parameters.GetParameter(Name="P4")
designPoint1.SetParameterExpression(
    Parameter=parameter3,
    Expression="-0.1 [in]")
#######################################################################################

#######################################################################################
# Update the geometry file
print("Updating Geometry")
system1 = GetSystem(Name="Geom")
system1.Update(AllDependencies=True)

# Clean and update the explicit system
# This system must contain: the LOC_DEF(XYZ) deformed nodal locations (Named: X, Y, Z respectively)
# the sheet normal and shear stresses for the top, middle, and bottom layers
# NOTE: Cleaning this system can take considerable time. It is prefered to save the baseline model 
#       in a cleaned state.
print("Updating Explicit Model... Please Wait!")
system2 = GetSystem(Name="SYS")
#CleanSystem(Systems=[system2])
system2.Update(AllDependencies=True)

# Run the script which combines the individual explicit system results output files
print("Combining results files")
RunScript(FilePath=GetAbsoluteUserPathName("~working/dev/scripts/combine.py"))

# Clean, re-read, and update the Thickness External Data file
# NOTE: Always clean the external data components
print("Reading model thickness data")
system3 = GetSystem(Name="SYS 1")
CleanSystem(Systems=[system3])
setup1 = system3.GetContainer(ComponentName="Setup")
setup1.RereadDataFiles()
setupComponent1 = system3.GetComponent(Name="Setup")
setupComponent1.Update(AllDependencies=True)

# Update the mechanical model (deformed mesh body)
print("Updating the deformed geometry mesh")
system4 = GetSystem(Name="SYS 3")
#CleanSystem(Systems=[system4])
modelComponent1 = system4.GetComponent(Name="Model")
modelComponent1.Update(AllDependencies=True)

# Clean, re-read, and update the Stress External Data file
# NOTE: Always clean the external data components
print("Reading model stress data")
system5 = GetSystem(Name="SYS 2")
CleanSystem(Systems=[system5])
setup2 = system5.GetContainer(ComponentName="Setup")
setup2.RereadDataFiles()
setupComponent2 = system5.GetComponent(Name="Setup")
setupComponent2.Update(AllDependencies=True)

# Unload the results extension to prevent execution in the static model
print("Unloading the post process writer")
Extensions.UnloadExtension(
    Id="RunAfterSolve2",
    Version="1.0",
    Format="Scripted")


# Update the static model
print("Updating the Static Structural Model")
system6 = GetSystem(Name="SYS 4")
#CleanSystem(Systems=[system6])
system6.Update(AllDependencies=True)

#######################################################################################
# Write the output paramters to a text file fr use
#Parameters.ExportDesignPoints(DesignPoints=[designPoint1])
print("Writing results... Complete!!!")
Parameters.ExportAllDesignPointsData(FilePath=GetAbsoluteUserPathName("C:/temp/files/exportData_DP32.csv"))

# Save the model if necessary
#Save(
#    FilePath=GetAbsoluteUserPathName("~working/dev/exp2imp_A.wbpj"),
#    Overwrite=True)