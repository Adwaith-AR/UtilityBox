const input = document.getElementById("textarea");
const output = document.getElementById("output");

function render() {
          output.innerHTML = DOMPurify.sanitize(marked.parse(input.value));
          window.console.log(DOMPurify.sanitize(marked.parse(input.value)))
}

input.addEventListener('input', render);
render();