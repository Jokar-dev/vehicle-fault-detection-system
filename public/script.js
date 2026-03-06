function random(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function updateVehicleData(){

const speed = random(40,140);
const temp = random(80,120);
const battery = (Math.random()*2+10).toFixed(1);
const tire = random(20,35);

document.getElementById("speed").innerText = speed + " km/h";
document.getElementById("temp").innerText = temp + " °C";
document.getElementById("battery").innerText = battery + " V";
document.getElementById("tire").innerText = tire + " PSI";

let alerts = [];

if(temp > 110){
alerts.push({msg:"🚨 Engine Overheating",level:"critical"});
}

if(speed > 120){
alerts.push({msg:"⚠ Overspeeding",level:"high"});
}

if(tire < 25){
alerts.push({msg:"⚠ Low Tire Pressure",level:"medium"});
}

if(battery < 11){
alerts.push({msg:"⚠ Battery Voltage Low",level:"medium"});
}

const container = document.getElementById("alerts");
container.innerHTML="";

if(alerts.length === 0){
container.innerHTML="<p>✅ Vehicle Status Normal</p>";
}

alerts.forEach(a=>{
let div=document.createElement("div");
div.className="alert "+a.level;
div.innerText=a.msg+" | "+new Date().toLocaleTimeString();
container.appendChild(div);
});

}

updateVehicleData();

setInterval(updateVehicleData,2000);