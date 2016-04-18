module  Good_weather
	class Server < Sinatra::Base

		cities = {
      "new york"  => { "latitude" => 40.672060 , "longitude" => -73.983898},
      "los angeles"  => {"latitude" => 34.101422 , "longitude" => -118.341224},
      "chicago" => {"latitude" => 41.879003, "longitude" => -87.63675},
      "san francisco"  => {"latitude" => 37.788531 , "longitude" => -122.407237},
      "miami" => { "latitude" => 25.790176 , "longitude" => -80.140133},
      "poughkeepsie" => {"latitude" => 41.65053  , "longitude" => -73.932648},
      "current location" =>""
    }

		get "/" do 
			erb :index
		end 
		get "/:location" do
			content_type :json
		  place = params[:location]
		  forecastKey = ENV['forcast_id']
			uri = URI.encode("https://api.forecast.io/forecast/" + forecastKey +"/" + cities[place]['latitude'].to_s + "," + cities[place]['longitude'].to_s ) 
      @location = HTTParty.get(uri).to_json 
      erb :location
    end

    get "/:lat/:long" do
			content_type :json
		  latitude = params[:lat]
		  longitude = params[:long]
		  forecastKey = ENV['forcast_id']
			uri = URI.encode("https://api.forecast.io/forecast/" + forecastKey +"/" + latitude + "," + longitude ) 
      @location = HTTParty.get(uri).to_json 
   
    end
	end
end