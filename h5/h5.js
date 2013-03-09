// Init
var h5 = new Object();
var h5EventStack = new Array;
function h5Event() {
	this.id = "";
	this.type = "";
}


// Polling
function EventStacker(event) {
	//console.log(event);
	var ev = new h5Event;
	ev.id = event.target.id;
	ev.type = event.type;
	h5EventStack.push(ev);
}

function PollEvents() {
	copy = h5EventStack.slice();
	h5EventStack = new Array;
	return copy;
}



// Gadget Creation
h5.CreateButton = function (id, text, x, y, w, h, type) {
	if (type != "button" & type != "checkbox" & type != "radio") return;
	var button = document.createElement("input");
	button.id = id;
	button.name = id;
	button.value = text;
	button.type = type;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	button.onclick = EventStacker;
	document.body.appendChild(button);
	
	// Todo: append text properly to checkbox and radios
	if (type === "checkbox" || type === "radio") {
		var label = document.createElement("label");
		label.innerHTML = text;
		label.id = id + "_label";
		label.name = label.id;
		label.style.position = "absolute";
		label.style.left = x + 24 + "px";
		label.style.top = y + 8 + "px";
		document.body.appendChild(label);
	}
}

h5.CreateCombobox = function (id, x, y, w, h) {
	var button = document.createElement("select");
	button.id = id;
	button.name = id;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	button.onchange = EventStacker;
	document.body.appendChild(button);
}

h5.CreateTextfield = function (id, x, y, w, h, type) {
	if (type != "text" & type != "number") return;
	var button = document.createElement("input");
	button.id = id;
	button.type = type;
	button.style.position = "absolute";
	button.style.left = x + "px";
	button.style.top = y + "px";
	button.style.width = w + "px";
	button.style.height = h + "px";
	if (type === "number") {
		button.onchange = EventStacker;
	}
	button.onkeydown = EventStacker;
	document.body.appendChild(button);
}

h5.CreateListbox = function (id, x, y, w, h) {
	var listbox = document.createElement("select");
	listbox.multiple = "multiple";
	listbox.id = id;
	listbox.name = id;
	listbox.style.position = "absolute";
	listbox.style.left = x + "px";
	listbox.style.top = y + "px";
	listbox.style.width = w + "px";
	listbox.style.height = h + "px";
	listbox.onchange = EventStacker;
	document.body.appendChild(listbox);
}

h5.CreateLabel = function (id, text, x, y) {
	var label = document.createElement("label");
	label.id = id;
	label.name = id;
	label.type = "label";
	label.innerHTML = text;
	label.style.position = "absolute";
	label.style.left = x + "px";
	label.style.top = y + "px";
	document.body.appendChild(label);
}



// Gadget Modification
h5.SetGadgetPosition = function (id, x, y) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.left = x + "px";
	gadget.style.top = y + "px";
}

h5.MoveGadget = function (id, x, y) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.left = parseInt(gadget.style.left) + x + "px";
	gadget.style.top = parseInt(gadget.style.top) + y + "px";
	if (gadget.type === "checkbox" || gadget.type === "radio") {
		var label = document.getElementById(id + "_label");
		if (label) {
			label.style.left = parseInt(label.style.left) + x + "px";
			label.style.top = parseInt(label.style.top) + y + "px";
		}
	}
}

h5.ResizeGadget = function (id, w, h) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.style.width = w + "px";
	gadget.style.height = h + "px";
}

h5.RenameGadget = function (id, text) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.value = text;
}

h5.RemoveGadget = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	if (gadget.type === "checkbox" || gadget.type === "radio") {
		var label = document.getElementById(id + "_label");
		if (label) label.parentNode.removeChild(label);
	}
	gadget.parentNode.removeChild(gadget);
}

h5.RemoveGadgetItem = function (fromId, value) {
	var parentGadget = document.getElementById(fromId);
	if (!parentGadget) return;
	
	// remove label corresponding to radio button(if radio button) - ugly!
	if (parentGadget.type === "radio") {
		var radios = document.getElementsByName(fromId);
		for (var i=0; i < radios.length; i++) {
			if (radios[i].value === value) {
				var radio = radios[i];
				if (radio.nextSibling) {
					radio.nextSibling.parentNode.removeChild(radio.nextSibling);
				}
				radios[i].parentNode.removeChild(radios[i]);
				return;
			}
		};
		return;
	}
	
	// remove item itself
    for (i = 0; i < parentGadget.length; i++) {
        if (parentGadget[i].value === value) {
            parentGadget.removeChild(parentGadget[i]);
			return;
        }
    }
}

h5.AddGadgetItem = function(toId, value) {
	var gadget = document.getElementById(toId);
	if (!gadget) return;
	var item = document.createElement("option");
	if (item) {
		item.value = value;
		item.innerHTML = value;
		gadget.appendChild(item);
	}
}

h5.SetGadgetText = function (id, text) {
	var gadget = document.getElementById(toId);
	if (!gadget) return "";
	if (gadget.type === "label")
		gadget.innerHTML = text;
	else
		gadget.value = text;
}



// Enable & Disable
h5.DisableGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.disabled = true;
}

h5.EnableGadget = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return;
	gadget.disabled = false;
}

h5.GadgetIsEnabled = function(id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	return !gadget.disabled;
}



// Getters
h5.GadgetX = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetLeft;
}

h5.GadgetY = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetTop;
}

h5.GadgetWidth = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetWidth;
}

h5.GadgetHeight = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return 0;
	return gadget.offsetHeight;
}

h5.GadgetText = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return "";
	console.log(gadget);
	if (gadget.type === "label")
		return gadget.textContent;
	else
		return gadget.value;
}

h5.ButtonStatus = function (id) {
	var gadget = document.getElementById(id);
	if (!gadget) return false;
	if (!gadget.checked) return false;
	return gadget.checked;
}

h5.SelectedGadgetItem = function (id) {
    var parent = document.getElementById(id);
	if (!parent) return "";

	// radio buttons
	if (parent.type === "radio") {
		var radios = document.getElementsByName(id);
		for (i = 0; i < radios.length; i++) {
		    if (radios[i].checked) {
		        return radios[i].value;
		    }
		}
		return "";
	}
	
	// listbox/combobox
	var selected = parent.selectedIndex;
	if (selected === -1) return "";
    return parent.options[selected].text;
}

h5.SelectedGadgetItems = function (id) {
    var parent = document.getElementById(id);
	if (!parent) return "";
	var selected = parent.selectedOptions;
	if (selected.length === 0) return [""];
	var multipleReturn = new Array(selected.length);
	for (var i=0; i < selected.length; i++) {
		multipleReturn[i] = selected[i].text;
	};
	console.log(multipleReturn);
	return multipleReturn;
}



// Dialogs
function Notify(text) {
	alert(text);
}







