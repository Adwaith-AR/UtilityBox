const passLength = document.getElementById("passLength")
const sliderValue = document.getElementById("sliderValue")
function slider() {
          window.console.log(passLength.value);
          let valuePercentage = (passLength.value /passLength.max) * 100;
          window.console.log(valuePercentage);
          passLength.style.background = `linear-gradient(to right, #5156f3 ${valuePercentage - 2}%,  #182137 ${valuePercentage-2}%) `;

} 
passLength.addEventListener('input',function(){
          slider()
          sliderValue.textContent= passLength.value
          
})
slider()