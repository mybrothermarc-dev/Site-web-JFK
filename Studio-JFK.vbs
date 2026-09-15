' Studio JFK : ouvre le tableau de bord du site, sans fenetre noire.
' Double-clique sur ce fichier (ou sur le raccourci "Studio JFK" du bureau).

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

folder = fso.GetParentFolderName(WScript.ScriptFullName)
nodeDir = "C:\Program Files\nodejs"
nodeExe = nodeDir & "\node.exe"

If Not fso.FileExists(nodeExe) Then
  MsgBox "Node.js n'est pas installe sur cet ordinateur." & vbCrLf & vbCrLf & _
    "Installe-le depuis https://nodejs.org (version LTS), puis relance le Studio.", 16, "Studio JFK"
  WScript.Quit 1
End If

shell.CurrentDirectory = folder
Set env = shell.Environment("Process")
env("PATH") = nodeDir & ";" & env("PATH")

' Premiere utilisation : installation des outils (fenetre visible, 2 a 3 minutes).
If Not fso.FolderExists(folder & "\node_modules") Then
  MsgBox "Premiere ouverture : les outils du site vont s'installer (2 a 3 minutes)." & vbCrLf & _
    "Une fenetre noire va s'ouvrir puis se fermer toute seule.", 64, "Studio JFK"
  shell.Run "cmd /c npm install", 1, True
End If

shell.Run """" & nodeExe & """ """ & folder & "\scripts\studio\server.mjs""", 0, False
