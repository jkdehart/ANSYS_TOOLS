# encoding: utf-8
# Release 19.2
SetScriptVersion(Version="19.2.120")
system1 = GetSystem(Name="SYS")
geometry1 = system1.GetContainer(ComponentName="Geometry")
geometry1.Edit(Interactive=True)
#RunScript(FilePath="C:/Users/jdehart/Documents/~working/ACT_scripts/dm_examples/body_supress.py")
cmdRead = open("C:/Users/jdehart/Documents/~working/ACT_scripts/dm_examples/honey_test.py", "r")
cmd = cmdRead.read()
cmdRead.close()
geometry1.SendCommand(Language="Python", Command=cmd)
#geometry1.Exit()


## Example file for input (suppress function)
# body1 = ExtAPI.DataModel.GeoData.Bodies[0]
# body1.Suppressed = False