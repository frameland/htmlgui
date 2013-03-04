#Rem
------------------------------------------------------------------------------
	h5 - html5 gui elements
	
	The class that should receive the events (h5Event) must implement
	the h5GuiHandler interface and add the OnGuiEvent(event:h5Event) Method.
	In your Update Method call UpdateGuiEvents(Self).
	
	The OnGuiEvent Method will handle all the events similar as with
	MaxGUI from BlitzMax. An h5Event has an id and a type (both Strings).
	
	An id is the unique identifier for your gadget. Ensure that you
	do not use duplicates except for radios where you should use them
	for grouping.
	
	types:
	- click (buttons)
	- keydown (textfields)
	- change (combobox)
------------------------------------------------------------------------------
#End


#If TARGET <> "html5"
	#Error("h5 is only available for the html5 target.")
#End
Import "h5.js"

'Interface
Public
Interface h5GuiHandler
	Method OnGuiEvent:Void(event:h5Event)
End

Function UpdateGuiEvents:Void(handler:h5GuiHandler)
	Local events:= PollEvents()
	For Local i:Int = 0 Until events.Length
		handler.OnGuiEvent(events[i])
	Next
End


Extern

'Creation
Function CreateButton:Void(id:String, text:String, x:Int, y:Int, w:Int, h:Int = 20, type:String = "button") = "h5.CreateButton"
Function CreateCombobox:Void(id:String, x:Int, y:Int, w:Int, h:Int = 20) = "h5.CreateCombobox"
Function CreateTextfield:Void(id:String, x:Int, y:Int, w:Int, h:Int = 16, type:String = "text") = "h5.CreateTextfield"


'Gadget Modification
Function SetGadgetPosition:Void(id:String, x:Int, y:Int) = "h5.SetGadgetPosition"
Function MoveGadget:Void(id:String, x:Int, y:Int) = "h5.MoveGadget"
Function ResizeGadget:Void(id:String, w:Int, h:Int) = "h5.ResizeGadget"
Function RenameGadget:Void(id:String, text:String) = "h5.RenameGadget"
Function RemoveGadget:Void(id:String) = "h5.RemoveGadget"
Function RemoveGadgetItem:Void(fromId:String, value:String) = "h5.RemoveGadgetItem"
Function AddGadgetItem:Void(toId:String, value:String) = "h5.AddGadgetItem"
	

'Getter
Function GadgetText:String(id:String) = "h5.GadgetText"
Function SelectedGadgetItem:String(id:String) = "h5.SelectedGadgetItem"
Function ButtonStatus:Bool(id:String) = "h5.ButtonStatus"

			
'Other
Function Notify:Void(text:String) = "Notify"
Function PollEvents:h5Event[]() = "PollEvents"

Class h5Event = "h5Event"
	Field id:String
	Field type:String
End

