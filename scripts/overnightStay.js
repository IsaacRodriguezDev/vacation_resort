"use strict";

window.onload = function () {
  let reserveRoomForm = document.querySelector("#onForm");

  reserveRoomForm.addEventListener("submit", dateConverter);
};

function dateConverter(event) {
  // preventDefault so it won't refresh until you tell it to
  event.preventDefault();
  let onform = event.target;

// the id for two different innerhtml outputs
  let results = document.querySelector("#results");
  let maxGuests = document.querySelector("#maxGuests");
  // created a variable and declared it priceOfNight
  let priceOfNight;

   // created a variable and declared it message
  let message;

   // created a variable for the base tax
  let baseTax = 12 / 100;

   // created multiple variables and declared them taxDiscount, roomType, totalNumberOfAdults,totalNumberOfChildren, totalNumberOfGuests, and totalPriceForStay
  let taxDiscount;
  let roomType;
  let totalNumberOfAdults;
  let totalNumberOfChildren;
  let totalNumberOfGuests;
  let totalPriceForStay;
  let discountedRoomPrice
  // created variable to check for users number of nights
  let nightsPastCheckInDate = onform.numberOfNights.value;

  // created variable called checkInDate
  let checkInDate = new Date(onform.checkInDate.value);
//   calculated for the one missed day
  let newCalculatedDate= checkInDate.setTime(checkInDate.getTime()+checkInDate.getTimezoneOffset()*60*1000)
    checkInDate = new Date(newCalculatedDate)
  console.log('this is time zome'+checkInDate)
  console.log('this is time zome' + new Date(newCalculatedDate))
  

  // made a funcion that checks if the months range from jun-aug then charge a certain amount depending on the user picking the room type and set's the price per night
  function getRoomRate() {
    if (checkInDate.getMonth() > 4 && checkInDate.getMonth() < 8) {
      if (onform.twoBedroom.checked) {
        priceOfNight = 350;
        console.log("price is now" + priceOfNight);
      } else {
        priceOfNight = 250;
        console.log("price is NOWWWW" + priceOfNight);
      }
    } else {
      if (onform.twoBedroom.checked) {
        priceOfNight = 210;
      } else {
        priceOfNight = 150;
      }
    }
    //got number of guests user inputs

    totalNumberOfAdults = Number(onform.numberOfAdults.value);
    totalNumberOfChildren = Number(onform.numberOfChildren.value);

    totalNumberOfGuests = totalNumberOfAdults + totalNumberOfChildren;
    console.log(`Total number of guests:${totalNumberOfGuests}`);
    // if statements to check total number of guests and if it exceeds max for rooms and if it does it outputs "The room you selected will not hold your party"
    if (onform.queenBed.checked) {
      maxGuests.style.display= "none";
      results.style.display= "block";

      roomType = "Queen";
      if (totalNumberOfGuests > 5) {
        results.style.display= "none";
        maxGuests.innerHTML = "The room you selected will not hold your party";
        maxGuests.style.display= "block";
        return maxGuests, results;
      }
    }

    if (onform.kingBed.checked) {
      maxGuests.style.display= "none";
      results.style.display= "block";
      roomType = "King";
      if (totalNumberOfGuests > 2) {
        results.style.display= "none";
        maxGuests.innerHTML = "The room you selected will not hold your party";
        maxGuests.style.display= "block";
        return results, maxGuests;
      }
      
    }
    if (onform.twoBedroom.checked) {
      maxGuests.style.display= "none";
      results.style.display= "block";

      roomType = "2-Bedroom Suit";

      if (totalNumberOfGuests > 6) {
        results.style.display= "none";
        maxGuests.innerHTML = "The room you selected will not hold your party";
        maxGuests.style.display= "block";
        return maxGuests, results;
      }
    }

//  return the price of room depending on the checkin
    return priceOfNight;
  }

  console.log(checkInDate);
  console.log(priceOfNight);
  // calculate the total price of nights and time of check in
  let totalPricePerNightAndMonth =
    Number(getRoomRate()) * nightsPastCheckInDate;
  console.log(`THIS IS THE PRICESSS${totalPricePerNightAndMonth}`);

  //  if statements for discounts that are applied
  if (onform.noDiscounts.checked) {
    taxDiscount = 0 / 100;
    discountedRoomPrice =
      totalPricePerNightAndMonth - totalPricePerNightAndMonth * taxDiscount;
    taxDiscount = 0;
    totalPriceForStay = (discountedRoomPrice + Number(getRoomRate())) * 1.12;
  
  }
  if (onform.aaaOrSeniorDiscount.checked) {
    taxDiscount = 10 / 100;
    discountedRoomPrice =
      totalPricePerNightAndMonth - totalPricePerNightAndMonth * taxDiscount;
    taxDiscount = 10;
    totalPriceForStay = (discountedRoomPrice + Number(getRoomRate())) * 1.12;
   
  }
  if (onform.militaryDiscounts.checked) {
    taxDiscount = 20 / 100;
     discountedRoomPrice =
      totalPricePerNightAndMonth - totalPricePerNightAndMonth * taxDiscount;

    taxDiscount = 20;

    totalPriceForStay = (discountedRoomPrice + Number(getRoomRate())) * 1.12;
   
  }
  // instanciated message for the output result
  message = `
   
  <div>The room type is: ${roomType}</div>
  <div>The original room cost $${Number(getRoomRate()).toFixed(2)}</div>
  <div>The price per night: $${totalPricePerNightAndMonth.toFixed(2)}</div>
  <div>The total price of room type and per night: $${(
    totalPricePerNightAndMonth + Number(getRoomRate())
  ).toFixed(2)}</div>
  <div>The discounts is: ${taxDiscount}%</div>
  <div>The discounted room cost is: $${discountedRoomPrice.toFixed(2)}</div>
  <div>The tax is: ${baseTax * 100}%</div>
  <div> the total price of the stay: $${totalPriceForStay.toFixed(2)}</div>`;


  // outputs the messages and total amount of everything
  results.innerHTML = message;

  
  //   returned getRoomRate so if user puts more guests that are more than max then it will output maxGuests and remove calculations
  return getRoomRate();
}
