function openNav() {
    document.getElementById('innerSidebar').style.display = "block";
    document.getElementById("mySidebar").style.width = "260px";
    //document.getElementById("main").style.marginLeft = "270px";
}

function closeNav() {
    document.getElementById('innerSidebar').style.display = "none";
    document.getElementById("mySidebar").style.width = "0%";

    myLatlng4 = {
        lat: 37.4530626,
        lng: -122.0776532
    };
    map.panTo(myLatlng4);
    map.setZoom(6);
    //document.getElementById("main").style.marginLeft = "0";
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

function loadJS() {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = async function() {
        incomingJS = JSON.parse(this.responseText);
        incomingJS = incomingJS['result'];
        //var latitude = incomingData["coordinates"]["latitude"];
        //document.getElementById("SOC").innerHTML = latitude;

    };

    xhttp.open("GET", "/getmarkers", false);
    xhttp.send();

}

function initMap(incomingData, incomingJS) {

    // console.log(incomingData);
    // console.log(incomingData['coordinates']['latitude']);
    // console.log(incomingData['coordinates']['longitude']);
    // const mapicon = "/static/assets/img/map-marker-pulse.gif";
    // var myLatlng = {
    //     lat: parseFloat(incomingData['coordinates'][0]),
    //     lng: parseFloat(incomingData['coordinates'][1])
    // };
    const myLatlng2 = {
        lat: 37.4530626,
        lng: -122.0776532
    };
    mapicon = "/static/assets/img/map-marker-pulse.gif";
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng2,
    });

    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     map, //Here goes the map instance for
    //     title: "EFHQ01",
    //     icon: mapicon,
    // });
    // var marker2 = new google.maps.Marker({
    //     position: myLatlng2,
    //     map,
    //     title: "EFHQ02",
    //     icon: mapicon,
    // });
    // map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    // window.setTimeout(() => {
    //   map.panTo(marker.getPosition());
    // }, 3000);
    // });
    // marker.addListener("click", () => {
    //     document.getElementById("unitName").innerHTML = marker.title;
    //     document.getElementById("SOC").innerHTML = "<strong><p>Battery SOC</p></strong>" + parseFloat(incomingData['batteries']['SOC']).toFixed(2) + "%"
    //     document.getElementById("IVTS").innerHTML = "<p>Battery Voltage</p>" + incomingData['IVTS']['batteryVoltage'] + "V"
    //     document.getElementById("COORD").innerHTML = "<p>Unit coordinates</p>" + marker.getPosition()
    //     map.panTo(marker.getPosition());
    //     map.setZoom(11);
    //     openNav();


    // });
    // marker2.addListener("click", () => {
    //     document.getElementById("unitName").innerHTML = marker2.title;
    //     document.getElementById("SOC").innerHTML = "<p>Battery SOC</p>" + parseFloat(incomingData['batteries']['SOC']).toFixed(2) + "%"
    //     document.getElementById("IVTS").innerHTML = "<p>Battery Voltage</p>" + incomingData['IVTS']['batteryVoltage'] + "V"
    //     document.getElementById("COORD").innerHTML = "<p>Unit coordinates</p>" + marker2.getPosition()
    //     map.panTo(marker2.getPosition());
    //     map.setZoom(11);
    //     openNav();

    // });

}
window.onload = loadJS();
loadDoc();
window.initMap = initMap(incomingData);

window.onload = function() {
    var code = incomingJS //'var myLatlng3 = {lat: 37.454,lng: -122.08};var marker3 = new google.maps.Marker({position: myLatlng3,map,title: "EFHQ03",icon: mapicon,});';
        // try {
        //     for (let i = 0; i < incomingJS.length; i++) {
        //         var s = document.createElement('script');
        //         s.type = 'text/javascript';
        //         s.id = 'markersscript' + i;
        //         s.appendChild(incomingJS[i]);
        //         console.log(incomingJS[i])
        //         document.body.appendChild(s);
        //     };
        // } catch (e) {
        //     s.text = code[0];
        //     document.body.appendChild(s);
        // }
    for (let i = 0; i < incomingJS.length; i++) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.id = 'markersscript' + i;
        s.appendChild(document.createTextNode(incomingJS[i]));
        ///console.log(incomingJS[i])
        document.body.appendChild(s);
    };
}