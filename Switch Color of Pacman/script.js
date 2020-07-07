let holder = document.getElementsByClassName("holder")[0];
let fold = document.getElementsByClassName("fold")[0];
let sample = document.getElementById("sample");
let picker = document.getElementById("picker-wrapper");
let col = document.getElementsByClassName("col");
let hex = document.getElementById("hex");
let beans = document.getElementsByClassName("beans")
let show = false;

holder.onclick = function () {
  show = !show;
  showPicker ();
}
for(i=0; i<col.length; i++) {
  col[i].onclick = function () {
    let curColor = this.style.backgroundColor;
    hex.value = rgb2hex(curColor);
    setHex ();
    show = false;
    showPicker ();
  }
}

function showPicker () {
  picker.style.display = show ? "block" : "none";
  fold.className = show ? "unfold" : "fold";
}
function changeHex () {
  if (hex.value.match(/^#([0-9a-fA-F]{6})$/)) {
    setHex ();
  }
}
function setHex () {
  sample.style.backgroundColor = hex.value;
  for (j=0; j<beans.length; j++) {
      beans[j].style.backgroundColor = hex.value;
    }
}

function rgb2hex(rgb) {
    let reg=/(\d{1,3}),\s(\d{1,3}),\s(\d{1,3})/;
    let arr=reg.exec(rgb);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    let _hex="#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
    return _hex.toUpperCase();
}
