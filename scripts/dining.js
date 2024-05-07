'use strict'
window.onload = function (){
    let diningOnForm = document.querySelector('#onForm')
    let show = document.getElementById('payAsYouGoRestaurants');
    let show2 = document.getElementById('allInclusiveChart');
    show.style.display ='none'
       show2.style.display  ='none'
    diningOnForm.addEventListener('submit', payAsYouGo)
}

function payAsYouGo(event){
    event.preventDefault()
    let onForm = event.target
    let payAsYouGoResults = document.querySelector('#payAsYouGoResults')
    let allInclusiveResults = document.querySelector('#allInclusiveResults')
    let show = document.getElementById('payAsYouGoRestaurants');
    let show2 = document.getElementById('allInclusiveChart');
    
    if(onForm.payAsYouGo.checked){
        
        show.style.display ='block'
       show2.style.display  ='none'
        
    }
    if(onForm.allInclusive.checked){
        show2.style.display = 'block';
        show.style.display = 'none';
    }
        
    }
