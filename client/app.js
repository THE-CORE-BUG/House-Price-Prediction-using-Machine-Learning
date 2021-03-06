function onPageload()
{
	console.log("Document loaded");
	var url = "http://127.0.0.1:5000/get_location_names";
	$.get(url,function(data,status) {
		console.log("Got response for get_location_names request");
		if(data){
			var locations = data.locations;
			var uiLocations = document.getElementById("uiLocations");
			$('#uiLocations').empty();
			for(var i in locations)
			{
				var opt = new Option(locations[i]);
				$('#uiLocations').append(opt);
			}
		}
	});
}



function getBathValue()
{
	var uiBathrooms = document.getElementsByName("Bathrooms");
	for(var i in uiBathrooms)
	{
		if(uiBathrooms[i].checked)
		{
			return parseInt(i)+1;
		}
	}
	return -1;
}


function getBHKValue()
{
	var uiBHK = document.getElementsByName("options");
	for(var i in uiBHK)
	{
		if(uiBHK[i].checked)
		{
			return parseInt(i)+1;
		}
	}
	return -1;
}


function onClickHandler()
{
	console.log("Estimated Price button Clicked");
	var sqft = document.getElementById("area");
	var bhk= getBHKValue();
	var bathrooms = getBathValue();
	var location = document.getElementById("uiLocations");
	var estPrice = document.getElementById("uiEstimatedPrice");

	var url = "http://127.0.0.1:5000/predict_home_price";
	$.post(url,{
		total_sqft: parseFloat(sqft.value),
		location: location.value,		
		bhk: bhk,
		bath: bathrooms		
	},function(data, status)
	{
		console.log(data.estimated_price);
		estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakhs</h2>";
		console.log(status);
	});
}

window.onload = onPageload;