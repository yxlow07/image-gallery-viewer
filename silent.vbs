Set WshShell = CreateObject("WScript.Shell")

' Get the directory of the current script
currentDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Create a temporary batch file
tempBat = WshShell.ExpandEnvironmentStrings("%TEMP%") & "\temp-start-server.bat"
Set objFileSystem = CreateObject("Scripting.FileSystemObject")
Set tempFile = objFileSystem.CreateTextFile(tempBat, True)

' Write the batch commands to the temporary file
tempFile.WriteLine("@echo off")
tempFile.WriteLine("cd /d " & chr(34) & currentDir & chr(34)) ' Change to the directory of the script
tempFile.WriteLine("npm start")
tempFile.Close

' Run the temporary batch file invisibly
WshShell.Run chr(34) & tempBat & chr(34), 0

' Clean up the temporary batch file after a delay (optional)
WScript.Sleep 5000 ' Wait 5 seconds to ensure the batch file has started the server
objFileSystem.DeleteFile(tempBat)

Set WshShell = Nothing
Set objFileSystem = Nothing