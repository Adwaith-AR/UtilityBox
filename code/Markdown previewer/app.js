const input = document.getElementById("textarea");
const output = document.getElementById("output");

function render() {
          window.console.log(marked.parse(input.value))
          output.innerHTML = marked.parse(input.value);

          window.alert("j")
}
input.addEventListener('input', render);
render();