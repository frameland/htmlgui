'buildopt: run
Strict
Import mojo
Import h5

Function Main:Int()
	New H5App
	Return 0
End

'You must implement the h5GuiHandler interface
Class H5App Extends App Implements h5GuiHandler
	
	Method OnCreate:Int()
		SetUpdateRate(30)
		
		'Buttons
		CreateButton("button1", "Button 1", 24, 24, 80, 24)
		CreateButton("button2", "Button 2", 24, 52, 80, 24)
		
		'Checkboxes
		CreateButton("buttonCheck1", "Checkbox 1", 24, 80, 200, 24, "checkbox")
		CreateButton("buttonCheck2", "Checkbox 2", 24, 110, 200, 24, "checkbox")
		
		'Radio Buttons
		CreateButton("buttonRadio", "Radio 1", 24, 140, 200, 24, "radio")
		CreateButton("buttonRadio", "Radio 2", 24, 168, 200, 24, "radio")
		CreateButton("buttonRadio", "Radio 3", 24, 192, 200, 24, "radio")
				
		'Textfield
		CreateTextfield("text1", 24, 230, 100, 14)
		CreateTextfield("text2", 24, 254, 100, 14, "number")
		
		'Combobox
		CreateCombobox("combo1", 24, 290, 100, 24)
		AddGadgetItem("combo1", "Option 1")
		AddGadgetItem("combo1", "Option 2")
		AddGadgetItem("combo1", "Option 3")

		'Listbox
		CreateListbox("list1", 24, 330, 100, 70)
		AddGadgetItem("list1", "Item 1")
		AddGadgetItem("list1", "Item 2")
		AddGadgetItem("list1", "Item 3")
		
		'Label
		CreateLabel("label1", "Some text", 200, 24)
		
		'Slider
		CreateSlider("slider1", 200, 52, 100, 20)
		
		SetGadgetValue("slider1", 90)
		
		Return 0
	End
	
	Method OnRender:Int()
		Cls(240, 240, 240)
		Return 0
	End
	
	Method OnUpdate:Int()
		UpdateGuiEvents(Self)
		Return 0
	End
	
	'All events are received here
	Method OnGuiEvent:Void(event:h5Event)
		Select event.type
			Case "click"
				If event.id = "buttonRadio"
					Print SelectedGadgetItem("buttonRadio")
				ElseIf event.id.StartsWith("buttonCheck")
					Print event.id + ": " + Int(ButtonStatus(event.id))
				ElseIf event.id.StartsWith("button")
					Print "Clicked: " + event.id
					If event.id = "button1"
						AddGadgetItem("combo1", "Option 1")
					ElseIf event.id = "button2"
						RemoveGadgetItem("combo1", "Option 1")
					End
				End
				
			Case "keydown"
				Print "Keydown: " + event.id + ": " + GadgetValue(event.id)
				
			Case "change"
				If event.id = "text2"
					Print "Numberfield: " + GadgetValue("text2")
				ElseIf event.id = "combo1"
					Print "Combobox: " + SelectedGadgetItem("combo1")
				ElseIf event.id = "list1"
					Local items:= SelectedGadgetItems("list1")
					For Local i:Int = 0 Until items.Length
						Print items[i]
					Next
					Print ""
				Else
					Print event.id + " changed to " + GadgetValue(event.id)
				End
		End
	End
	
End