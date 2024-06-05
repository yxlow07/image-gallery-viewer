Set WshShell = CreateObject("WScript.Shell")
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProcessList = objWMIService.ExecQuery("Select * from Win32_Process Where Name = 'node.exe'")

For Each objProcess in colProcessList
    objProcess.Terminate()
Next

Set WshShell = Nothing
Set objWMIService = Nothing
Set colProcessList = Nothing
