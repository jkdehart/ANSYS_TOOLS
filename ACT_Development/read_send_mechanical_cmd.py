# encoding: utf-8
# Release 19.2
SetScriptVersion(Version="19.2.120")
system = GetSystem(Name="SYS")  # Specify system name, or
#system = GetAllSystems()[0]  # get first system, or
#template = GetTemplate(TemplateName="Geometry")
#system = template.CreateSystem()
model = system.GetContainer(ComponentName="Model")
model.Edit(Interactive=True)
cmdRead = open("C:/Users/jdehart/Documents/~working/ACT_scripts/add_force.py", "r")
cmd = cmdRead.read()
cmdRead.close()
model.SendCommand(Language="Python", Command=cmd)
#model.Exit()