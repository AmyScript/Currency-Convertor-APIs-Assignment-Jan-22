//create an empty object to hold the data and functionality of the app
var app = {};

//set the variables to hold the type of currency to default to AUD
var subject='AUD';
var subject2='AUD';
var subject3='AUD';
var convertedAmount = 1;
var convertedAmount2 = 1;
// Create an init method that will hold all of the code that must run upon initializing of app
app.init = function(){
	// create event listener on select element on change
	$('#subject').on('change', function(){
		subject = $(this).val();//get the first currency type to be converted
	});
	$('#subject2').on('change', function(){
		subject2 = $(this).val();//get the base currency type
	});
	$('#subject3').on('change', function(){
		subject3 = $(this).val();//get the second currency type to be converted
	});
	//when the calcuate button is clicked call the getCurrency function with the currency types as parameters
	$('#calculate').on('click', function(){
		app.getCurrency(subject, subject2, subject3);
	});
};

// getCurrency method will make the Ajax request to the API.  Pass the two parameters for currency and base currency into the function
app.getCurrency = function(query, base, query2){
	$.ajax({
		url: 'http://api.fixer.io/latest',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			symbols: query + ',' + query2,
			base: base
		},
		//store the data in result
		success: function(result){
			//call displayCurrency method and pass in the data
			app.displayCurrency(result);
		},
		error: function(error){
			console.log('Something went wrong.');
			console.log(error);
		}
	});
};

// Creating a method to inject our data into the DOM
app.displayCurrency = function(result){
		var data = result.rates;
		var baseAmount = $('#amount').val();
		var propValue = data[subject];
		var propValue2 = data[subject3]
		console.log(propValue);
		console.log(propValue2);
		//data returns undefined if base currency is the same as the convert currency
		if(propValue==undefined)
		{
			convertedAmount = $('#amount').val(); //set the converted currency amount equal to the user entered amount
			$('#convertAmount').text(convertedAmount);
		}
		//if base currency is different than the first convert currency, calculate based on API data
		else
		{
			convertedAmount = baseAmount * propValue;
			convertedAmount = convertedAmount.toFixed(2);
			$('#convertAmount').text(convertedAmount);
		}
		//data returns undefined if base currency is the same as the convert currency
		if (propValue2==undefined)
		{
			convertedAmount2 = $('#amount').val();//set the converted currency amount equal to the user entered amount
			$('#convertAmount2').text(convertedAmount2);
		}
		//if base currency is different than the first convert currency, calculate based on API data
		else
		{
			convertedAmount2 = baseAmount * propValue2;
			convertedAmount2 = convertedAmount2.toFixed(2);
			$('#convertAmount2').text(convertedAmount2);
		}
};

$(function(){
	app.init(); // initializing the app
});
