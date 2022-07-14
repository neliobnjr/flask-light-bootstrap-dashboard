function openNav() {
    document.getElementById("mySidebar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "270px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// function loadDoc() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onload = function() {
//         incomingData = JSON.parse(this.responseText);
//         //var latitude = incomingData["coordinates"]["latitude"];
//         //document.getElementById("SOC").innerHTML = latitude;
//         //return incomingData;
//     }

//     xhttp.open("GET", "/get_data");
//     xhttp.send();
// }

function loadDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = async function() {
        incomingData = JSON.parse(this.responseText);
        //var latitude = incomingData["coordinates"]["latitude"];
        //document.getElementById("SOC").innerHTML = latitude;

    };

    xhttp.open("GET", "/get_data", false);
    xhttp.send();
}




function initMap(incomingData) {

    // console.log(incomingData);
    // console.log(incomingData['coordinates']['latitude']);
    // console.log(incomingData['coordinates']['longitude']);
    const mapicon = "/static/assets/img/map-marker-pulse.gif";
    var myLatlng = {
        lat: incomingData['coordinates']['latitude'],
        lng: incomingData['coordinates']['longitude']
    };
    const myLatlng2 = {
        lat: 37.4530626,
        lng: -122.0776532
    };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng2,
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        map,
        title: "EFHQ01",
        icon: mapicon,
    });
    var marker2 = new google.maps.Marker({
        position: myLatlng2,
        map,
        title: "EFHQ02",
        icon: mapicon,
    });
    // map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    // window.setTimeout(() => {
    //   map.panTo(marker.getPosition());
    // }, 3000);
    // });
    marker.addListener("click", () => {
        document.getElementById("unitName").innerHTML = marker.title;
        document.getElementById("SOC").innerHTML = "<p style='color=red'>Battery SOC</p>" + parseFloat(incomingData['batteries']['SOC']).toFixed(2) + "%"
        document.getElementById("IVTS").innerHTML = "<p style='color=red'>Battery Voltage</p>" + incomingData['IVTS']['batteryVoltage'] + "V"
        document.getElementById("COORD").innerHTML = "<p style='color=red'>Unit coordinates</p>" + marker.getPosition()
        map.panTo(marker.getPosition());
        map.setZoom(8);
        openNav();


    });
    marker2.addListener("click", () => {
        document.getElementById("unitName").innerHTML = marker2.title;
        document.getElementById("SOC").innerHTML = "<p style='color=red'>Battery SOC</p>" + parseFloat(incomingData['batteries']['SOC']).toFixed(2) + "%"
        document.getElementById("IVTS").innerHTML = "<p style='color=red'>Battery Voltage</p>" + incomingData['IVTS']['batteryVoltage'] + "V"
        document.getElementById("COORD").innerHTML = "<p style='color=red'>Unit coordinates</p>" + marker2.getPosition()
        map.panTo(marker2.getPosition());
        map.setZoom(11);
        openNav();

    });

}
loadDoc();
window.initMap = initMap(incomingData);