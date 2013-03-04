### h5 - html5 gui elements (for monkey)
h5 uses native javascript gui elements such as buttons, checkboxes and radio buttons. Around that there is a very simple event system that notifies you about any changes to the gadgets.

### Getting Started
Try the main.monkey example to get a hang of how h5 works.
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