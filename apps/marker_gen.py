import requests
import random

#THIS FUNCTION LIBRARY IS TO COLLECT DATA FROM SERVER AND 
# GENERATE JS SCRIPTS TO RENDER LIVE MAPS IN REEF
def getParams():
    #GET THE DATA FROM UNIT HEALTHCHECK
    headers = {"api-key":"f54a7b5a-8851-409d-b941-71a9d11ce217"}
    r = requests.get("http://efcentralnetwork.xyz/unithealthcheck",headers=headers)
    data1 = r.json()
    return data1

def getUnits():
    #GET UNITS INSTALLED
    headers = {"api-key":"f54a7b5a-8851-409d-b941-71a9d11ce217"}
    r = requests.get("http://efcentralnetwork.xyz/getunits",headers=headers)
    data = r.json()
    return data

def exportMarkers():
    #GENERATE THE SCRIPTS TO UPLOAD TO THE FRONT END MAP
    params = getParams()
    units = getUnits()
    units = units['liveunits']
    markers = []
    if "coordinates" not in params:
        params['coordinates']= {"lat":37.4627267,
            "lng": -121.9223052}
    else:
        coordinates = params['coordinates']
        coordinates = coordinates.split('\n')
        coordinates = coordinates[3].split(' ')
        coordinates[1] = coordinates[1].replace("\r","")
        params['coordinates'] = coordinates
    if "SOC" not in params['batteries']:
        params['batteries']['SOC'] = 0
    else:
        pass
  
    for i in units:
        #base = 'var myLatlng'+i+'={lat:'''+ str(params['coordinates']['lat']+random.randint(1,4))+',lng:'+ str(params['coordinates']['lng']+random.randint(1,6))+'};var marker'+i+'=new google.maps.Marker({position: myLatlng'+i+',map,title:"'+i+'",icon:mapicon});marker'+i+'.addListener("click",()=>{document.getElementById("unitName").innerHTML=marker'+i+'.title;document.getElementById("SOC").innerHTML="<p>Battery SOC</p>"+parseFloat('+str(params['batteries']['SOC'])+').toFixed(2)+"%";document.getElementById("IVTS").innerHTML="<p>Battery Voltage</p>"+'+str(params['IVTS']['batteryVoltage'])+'+"V";document.getElementById("COORD").innerHTML="<p>Unit coordinates</p>"+marker'+i+'.getPosition();map.panTo(marker'+i+'.getPosition());map.setZoom(11);openNav();});'
        base = '''
        mapicon = "/static/assets/img/map-marker-pulse.gif";
        var myLatlng'''+i+''' = {
        lat:'''+ str(params['coordinates']['lat'])+''',
        lng:'''+ str(params['coordinates']['lng'])+'''
    };
        var marker'''+i+''' = new google.maps.Marker({
        position: myLatlng'''+i+''',
        map,
        title:"'''+i+'''",
        icon: mapicon,
    });
    marker'''+i+'''.addListener("click",() => {
        document.getElementById("unitName").innerHTML=marker'''+i+'''.title;
        document.getElementById("unitName").href="/myunit?q='''+i+'''";
        document.getElementById("SOC").innerHTML="<p>Battery SOC</p>"+parseFloat('''+str(params['batteries']['SOC'])+''').toFixed(2)+"%";
        document.getElementById("IVTS").innerHTML="<p>Battery Voltage</p>"+'''+str(params['IVTS']['batteryVoltage'])+'''+"V";
        document.getElementById("COORD").innerHTML="<p>Unit coordinates</p>"+marker'''+i+'''.getPosition();
        map.panTo(marker'''+i+'''.getPosition());
        map.setZoom(13);
        openNav();

    });'''
        markers.append(base)
    for i in range(len(markers)):
        markers[i]=markers[i].replace('\n',"")

    return markers

 