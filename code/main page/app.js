const calculator = document.getElementById("calculator")
const password = document.getElementById("calculator")

const tools = ["calculator"]

function ItemCardBuilder(tools) {
          const container = document.getElementById("tools_container")
          const itemsCreated = []
          for (let i = 0; i < tools.length; i++) {
                    itemsCreated.push(`<div class="tools" id="${tools[i]}"><img src="./img/${tools[i]}.png" alt=""><h4>${tools[i]}</h4></div>`)

          }
          container.innerHTML = itemsCreated.join("")
}

ItemCardBuilder(tools)
const fuseOptions = { keys: ['name'], threshold: 0.4 };
const fuse = new Fuse(tools, fuseOptions);
function search() {
          const value = document.getElementById("searchBox")

          if (value.value == "") {
                    return;
          }
          const searchResults = fuse.search(value.value);
          if (searchResults.length > 0) {
                    let bestMatch = []

                    for (let j = 0; j < searchResults.length; j++) {
                              bestMatch.push(searchResults[j].item);
                    }
                    ItemCardBuilder(bestMatch)
                    value.value = "";
                    
          } else {
                    ItemCardBuilder([])
                    value.value ="";
          }
};





