import React, { Component } from 'react';
import Form from './components/Form';
import Titles from './components/Titles';
import Weather from './components/Weather';

const API_KEY = '4da8b3d6d615856acc1b687cd7091f8d';

class App extends Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

  getWeather = async (e) =>{
       e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const API_CALL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`);
        const data = await API_CALL.json();
      console.log(data);
      if( city && country){
            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ''
            });
        }else{
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: 'Please enter the value!'
            });
        }
  }

  render() {
    return (
    <div>
        <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-5 title-container">
                            <Titles />
                        </div>
                        <div className="col-7 form-container">
                            <Form getWeather={this.getWeather}/>
                            <Weather
                                temp={this.state.temp}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>

        </div>
    </div>
    );
  }
}

export default App;
