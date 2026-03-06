const vehicleModels={

economy:{
maxSpeed:140,
tempLimit:110,
fuelType:"petrol"
},

luxury:{
maxSpeed:200,
tempLimit:115,
fuelType:"petrol"
},

sports:{
maxSpeed:280,
tempLimit:118,
fuelType:"petrol"
},

hyper:{
maxSpeed:350,
tempLimit:120,
fuelType:"petrol"
},

electric:{
maxSpeed:250,
tempLimit:100,
fuelType:"electric"
}

};

const carCatalog={
economy:[
"Toyota Corolla","Honda Civic","Hyundai Elantra","Kia Forte","Nissan Sentra",
"Mazda 3","Volkswagen Jetta","Skoda Octavia","Renault Megane","Peugeot 308",
"Ford Focus","Chevrolet Cruze","Subaru Impreza","Mitsubishi Lancer","Suzuki Ciaz",
"Toyota Yaris","Honda City","Hyundai Verna","Kia Rio","Nissan Versa",
"Mazda 2","Volkswagen Polo","Skoda Rapid","Renault Clio","Peugeot 208"
],
luxury:[
"BMW M5","Audi RS7","Mercedes AMG GT","Lexus ES","Volvo S90",
"Jaguar XF","Genesis G80","Cadillac CT5","Acura TLX","Infiniti Q50",
"BMW 7 Series","Audi A8","Mercedes S Class","Lexus LS","Porsche Panamera",
"Maserati Ghibli","Bentley Flying Spur","Rolls Royce Ghost","BMW X5","Audi Q7"
],
sports:[
"Porsche 911","Ferrari 488","Chevrolet Corvette C8","Nissan GT R","Audi R8",
"BMW M4","Mercedes C63 AMG","Lexus RC F","Jaguar F Type","Aston Martin Vantage",
"Toyota Supra","Subaru BRZ","Mazda MX 5","Ford Mustang GT","Dodge Challenger R T",
"Alpine A110","Lotus Emira","Porsche 718 Cayman","Ferrari F8 Tributo","McLaren GT"
],
hyper:[
"Koenigsegg Jesko","Bugatti Chiron","Rimac Nevera","McLaren Speedtail","Pagani Huayra",
"Aston Martin Valkyrie","Lotus Evija","SSC Tuatara","Hennessey Venom F5","Bugatti Bolide"
],
electric:[
"Tesla Model S","Tesla Model 3","Tesla Model X","Tesla Model Y","Lucid Air",
"Porsche Taycan","BMW i4","BMW iX","Mercedes EQS","Mercedes EQE",
"Audi e tron GT","Audi Q8 e tron","Hyundai Ioniq 5","Hyundai Ioniq 6","Kia EV6",
"Kia EV9","Nissan Leaf","Nissan Ariya","Volkswagen ID 4","Volkswagen ID 7",
"Volvo EX30","Volvo EX90","Polestar 2","Polestar 3","BYD Seal"
]
};

let historyData=[];

const alertSound=new Audio("sounds/alert.mp3");

function populateCarModels(){
const modelSelect=document.getElementById("carModel");

Object.entries(carCatalog).forEach(([category,models])=>{
models.forEach(modelName=>{
const option=document.createElement("option");
option.value=category;
option.textContent=modelName;
modelSelect.appendChild(option);
});
});
}

function random(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

populateCarModels();

const ctx=document.getElementById("speedChart").getContext("2d");

let chart=new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[
{
label:"Speed",
data:[],
borderColor:"#00e0ff",
tension:0.4
},
{
label:"Temp",
data:[],
borderColor:"#ff3b3b",
tension:0.4
}
]
},
options:{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{
labels:{
color:"white"
}
}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}
});

const gaugeCtx=document.getElementById("speedGauge").getContext("2d");

const speedGauge=new Chart(gaugeCtx,{
type:"doughnut",
data:{
datasets:[{
data:[50,110],
backgroundColor:["#00e0ff","#1b2430"],
borderWidth:0
}]
},
options:{
rotation:270,
circumference:180,
cutout:"75%",
plugins:{
legend:{display:false},
tooltip:{enabled:false}
}
}
});

new QRCode(document.getElementById("qrcode"),{
text:"Plate: TN09AB1234 Owner:Shruti Raman Model:Hyundai Creta",
width:100,
height:100
});

function updateValue(id,value){

const el=document.getElementById(id);

el.classList.remove("value-update");

void el.offsetWidth;

el.innerText=value;

el.classList.add("value-update");

}

function updateVehicleData(){

const selectedModel=document.getElementById("carModel").value;

const modelConfig=vehicleModels[selectedModel];

const vehicleAge=document.getElementById("vehicleAge").value;

let speedLimit=modelConfig.maxSpeed;
let tempLimit=modelConfig.tempLimit;

/* older vehicles become weaker */

if(vehicleAge>10){

speedLimit-=20;
tempLimit-=5;

}

const speed=random(40,140);
const temp=random(80,120);
const battery=(Math.random()*2+10).toFixed(1);
const tire=random(20,35);

/* SPEED */

document.getElementById("speed").innerText=speed+" km/h";

/* TEMPERATURE */

updateValue("temp",temp+" °C");

/* ENERGY SYSTEM */

if(modelConfig.fuelType==="electric"){

updateValue("battery",battery+" V");

}else{

const fuel=random(10,90);

updateValue("battery",fuel+" % Fuel");

}

/* TIRE */

updateValue("tire",tire+" PSI");

/* SPEED GAUGE */

speedGauge.data.datasets[0].data=[speed,160-speed];
speedGauge.update();

/* ALERT SYSTEM */

let alerts=[];

if(temp>tempLimit) alerts.push({msg:"Engine Overheating",level:"critical"});
if(speed>speedLimit) alerts.push({msg:"Overspeeding",level:"high"});
if(tire<25) alerts.push({msg:"Low Tire Pressure",level:"medium"});
if(battery<11 && modelConfig.fuelType==="electric") alerts.push({msg:"Low Battery",level:"medium"});

const container=document.getElementById("alerts");

container.innerHTML="";

alerts.forEach(a=>{
let div=document.createElement("div");
div.className="alert "+a.level;
div.innerText=a.msg;
container.appendChild(div);
});

if(alerts.length>0) alertSound.play();

/* HEALTH SYSTEM */

let health=100;

if(temp>tempLimit) health-=30;
if(speed>speedLimit) health-=20;
if(tire<25) health-=20;
if(battery<11 && modelConfig.fuelType==="electric") health-=10;

document.getElementById("healthScore").innerText=health;

/* RISK LEVEL */

let risk="LOW RISK";

if(health<70) risk="MEDIUM RISK";
if(health<40) risk="HIGH RISK";

document.getElementById("riskLevel").innerText=risk;

/* DRIVER MODE */

let mode="NORMAL";

if(speed>speedLimit*0.6) mode="AGGRESSIVE";
if(speed>speedLimit*0.85) mode="DANGEROUS";

document.getElementById("driverMode").innerText=mode;

/* MAINTENANCE */

let maintenance="Vehicle systems operating normally.";

if(tire<25) maintenance="Check tire pressure.";
if(modelConfig.fuelType==="electric" && battery<11) maintenance="Battery service recommended.";
if(temp>tempLimit) maintenance="Engine overheating. Immediate inspection.";

document.getElementById("maintenance").innerText=maintenance;

/* TELEMETRY GRAPH */

let time=new Date().toLocaleTimeString();

chart.data.labels.push(time);
chart.data.datasets[0].data.push(speed);
chart.data.datasets[1].data.push(temp);

if(chart.data.labels.length>10){

chart.data.labels.shift();
chart.data.datasets[0].data.shift();
chart.data.datasets[1].data.shift();

}

chart.update();

/* HISTORY */

historyData.unshift({
time:time,
speed:speed,
temp:temp,
battery:battery,
tire:tire,
status:alerts.length>0?"Fault":"Normal"
});

if(historyData.length>10) historyData.pop();

}

setInterval(updateVehicleData,2000);

function updateHistoryTable(){

const tableBody=document.querySelector("#historyTable tbody");

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

document.getElementById("historyBtn").onclick=function(){

const panel=document.getElementById("historyPanel");

if(panel.style.display==="none"){
panel.style.display="block";
updateHistoryTable();
}else{
panel.style.display="none";
}

};
