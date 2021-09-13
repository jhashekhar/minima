let name = 'Text';


let hideText = () => {
  let selection = window.getSelection();
  console.log(selection.toString())
  if (selection.toString() === "") {
    console.log("Selection Error");
  } else {
    console.assert(selection.focusNode == selection.anchorNode);
    let selectionText = selection.toString();
    let selectionNode = selection.anchorNode.parentElement;
    selectionNode.innerHTML = selectionNode.innerHTML.replace(selectionText,
        `<span class="hidden_text">
        ${selectionText}
    </span>`
    );
  }

};

let enable = () => {
  document.addEventListener('minima.ctrlDoublePressed', hideText);
}
let disable = () => {
  document.removeEventListener('minima.ctrlDoublePressed', hideText);
}

export default {
  name,
  enable,
  disable
};
