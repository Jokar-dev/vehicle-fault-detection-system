let historyData = [];

function random(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

/* -------- TELEMETRY GRAPH -------- */

const ctx = document.getElementById("speedChart").getContext("2d");

let speedChart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{
label:"Speed (km/h)",
data:[],
borderColor:"#00e0ff",
fill:false
},
{
label:"Temperature (°C)",
data:[],
borderColor:"#ff3b3b",
fill:false
}
]
},
options:{
responsive:true,
scales:{
y:{
beginAtZero:true
}
}
}
});


/* -------- QR CODE -------- */

new QRCode(document.getElementById("qrcode"),{
text:"Plate: TN 09 AB 1234 | Owner: Shruti Raman | Model: Hyundai Creta 2022",
width:100,
height:100
});


/* -------- MAIN VEHICLE DATA UPDATE -------- */

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

/* -------- FAULT DETECTION -------- */

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


/* -------- VEHICLE HEALTH SCORE -------- */

let health = 100;

if(temp > 110) health -= 30;
if(speed > 120) health -= 20;
if(tire < 25) health -= 20;
if(battery < 11) health -= 10;

document.getElementById("healthScore").innerText = health;


/* -------- RISK LEVEL -------- */

let risk = "LOW RISK";

if(health < 70) risk = "MEDIUM RISK";
if(health < 40) risk = "HIGH RISK";

document.getElementById("riskLevel").innerText = risk;


/* -------- STATUS UPDATE -------- */

const status = alerts.length > 0 ? "Fault Detected" : "Normal";

document.getElementById("vehicleStatus").innerText = status;


/* -------- HISTORY LOG -------- */

historyData.unshift({
time:new Date().toLocaleTimeString(),
speed:speed,
temp:temp,
battery:battery,
tire:tire,
status:status
});

if(historyData.length > 10){
historyData.pop();
}


/* -------- UPDATE GRAPH -------- */

let time = new Date().toLocaleTimeString();

speedChart.data.labels.push(time);
speedChart.data.datasets[0].data.push(speed);
speedChart.data.datasets[1].data.push(temp);

if(speedChart.data.labels.length > 10){
speedChart.data.labels.shift();
speedChart.data.datasets[0].data.shift();
speedChart.data.datasets[1].data.shift();
}

speedChart.update();

}


/* -------- AUTO UPDATE -------- */

setInterval(updateVehicleData,2000);


/* -------- HISTORY TABLE -------- */

function updateHistoryTable(){

const tableBody = document.querySelector("#historyTable tbody");

tableBody.innerHTML="";

historyData.forEach(row=>{

let tr=document.createElement("tr");

tr.innerHTML=`
<td>${row.time}</td>
<td>${row.speed}</td>
<td>${row.temp}</td>
<td>${row.battery}</td>
<td>${row.tire}</td>
<td>${row.status}</td>
`;

tableBody.appendChild(tr);

});

}


/* -------- HISTORY BUTTON -------- */

document.getElementById("historyBtn").onclick = function(){

const panel = document.getElementById("historyPanel");

if(panel.style.display === "none"){
panel.style.display = "block";
updateHistoryTable();
}else{
panel.style.display = "none";
}

};