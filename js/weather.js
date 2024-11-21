const API_KEY = "7e0559698d972ac2bda0ab17fb314389";

function onGeoOk(position) {
    const lat = position.coords.latitude; //내 위도
    const lon = position.coords.longitude; //내 경도

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(Response => Response.json()).then(data => {
        const city = document.querySelector(".header .weather .city");
        const weatherInner = document.querySelector(".header .weather .weatherInner");
        const Ctemper = document.querySelector(".header .weather .Ctemper");

        city.innerText = `${data.name} / `;
        weatherInner.innerText = `${data.weather[0].main} / `;
        Ctemper.innerText = `${data.main.temp}`;
    });
}

function onGeoError() {//위치를 얻는데 실패한 경우
    alert("Can't Find you. No Weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);