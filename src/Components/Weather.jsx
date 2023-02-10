import { Box, Button, Heading, Image, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import "../Styles/Weather.css";

const Weather = () => {
  const [search, setSearch] = useState();
  const [info, setInfo] = useState();
  const [next, setNext] = useState("");
  // let arr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  

  const getData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0e49ba7824798668adc4d16f77cf87d8`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setInfo(data);
      nextWeather(data);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const nextWeather = (data) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=0e49ba7824798668adc4d16f77cf87d8`)
    .then((res) => res.json())
    .then((data) => {
      console.log("next",data.daily);
      setNext(data.daily);
    })
    .catch((err) => {
      console.log(err);
    })
  };
 
let date = new Date(info?.sys.sunrise);
let hours = date.getHours();
// console.log(hours);
let mins = date.getMinutes();
// console.log(mins);

let date1 = new Date(info?.sys.sunset);
// console.log(date1);
let hours1 = date1.getHours();
// console.log(hours1);
let mins1 = date1.getMinutes();
// console.log(mins1);

  const getMyLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0e49ba7824798668adc4d16f77cf87d8`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setInfo(data);
          nextWeather(data);
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  };
  

  return(
    <>
      <Box id="topbar">
        <Heading size={"lg"} id='head1'>Weather App</Heading>
        <Input placeholder='Search for location' type="search" id="city" onChange={(e) => setSearch(e.target.value)} />
        <Button onClick={getData}  id="submit">Search</Button>
        <Button onClick={getMyLocation} id='getbutn'>Get Weather on My Location</Button>
      </Box>

    <Box>
      {info && (
        <Box id='main'>
        {/* left box starts */}
          <Box id='left'>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/2803/2803287.png" alt="" />
              <Heading id='had1' size={"md"}>{info.name}</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://t3.ftcdn.net/jpg/02/75/95/16/240_F_275951654_CA0RLbBT7UEZXIfqtR9BQJ9MUUsw1qw3.jpg" />
              <Heading id='had2' size={"md"}>{(info.main.temp_min-273.15).toFixed(2)}°C</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/1684/1684375.png" />
              <Heading id='had2' size={"md"}>{(info.main.temp_max-273.15).toFixed(2)}°C</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}  
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/481/481431.png" />
              <Heading id='had2' size={"md"}>{(info.main.temp-273.15).toFixed(2)}°C</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/615/615579.png" />
              <Heading id='had2' size={"md"}>{info.wind.speed}kmph</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/3208/3208676.png" />
              <Heading id='had2' size={"md"}>{info.clouds.all}%</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box1'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/170/170860.png" />
              <Heading id='had2' size={"md"}>{hours}:{mins} am</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
            <center>
            <Box id='box2'>
              <Image id='img1' src="https://cdn-icons-png.flaticon.com/128/2924/2924900.png" />
              <Heading id='had2' size={"md"}>{hours1}:{mins1} pm</Heading>
            </Box></center>
    {/* --------------------------------------------------------------- */}
          </Box>
          {/* left box ends */}
           
            <Box id='right'>
              <Box id='rit1'>
                <iframe id='frame' src={`https://maps.google.com/maps?q=${info.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
              </Box>
              <Box id='rit2'>
                {next && next.map((item,id) => {
                  return(
                    <Box id='box3' key={id} >
                      <center>
                      <Image id='imgg1' src='https://cdn-icons-png.flaticon.com/128/2698/2698213.png' /></center>
                      <Heading id='headd1' size={"sm"}>Max : {`${(item.temp.max-273.15).toFixed(2)}`}°C
                      </Heading>
                      <Heading id='headd2' size={"sm"}>Min : {`${(item.temp.min-273.15).toFixed(2)}`}°C</Heading>
                      <Heading id='headd3' size={"sm"}>{item.weather[0].main}</Heading>
                    </Box>
                  )
                })}
              </Box>
            </Box> 

          </Box>
        )}
      </Box>
      
    </>
  )
}

export default Weather;
