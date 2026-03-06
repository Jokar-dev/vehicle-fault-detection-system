# 🚗 Vehicle Fault Detection & Telemetry Dashboard

![Dashboard](https://img.shields.io/badge/Status-Working-success)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20CSS%20JS-blue)
![License](https://img.shields.io/badge/Project-Demo-orange)

A **real-time vehicle monitoring dashboard** that simulates vehicle sensor data, detects abnormal conditions, and generates alerts through an interactive telemetry interface.

This project demonstrates how a **smart vehicle diagnostic system** could work when connected to real vehicle sensors or IoT modules.

---

# 🧠 What This System Does

The system continuously monitors vehicle parameters such as:

* 🚀 **Speed**
* 🔥 **Engine Temperature**
* 🔋 **Battery Voltage**
* 🛞 **Tire Pressure**

If abnormal conditions are detected, the dashboard automatically generates **real-time alerts**.

Example alerts:

* 🚨 Engine Overheating
* ⚠ Overspeeding
* ⚠ Low Tire Pressure
* ⚠ Low Battery Voltage

---

# 📊 Dashboard Features

## 🚘 Vehicle Information Panel

Displays identity details of the vehicle:

* Plate Number
* Owner Name
* Vehicle Model
* System Status

---

## 📡 Live Vehicle Telemetry

The system automatically updates simulated vehicle sensor data every few seconds.

This mimics how real vehicles send **continuous telemetry data** to monitoring systems.

---

## ⚠ Intelligent Fault Detection

Vehicle conditions are constantly evaluated using predefined safety rules.

Example:

* Temperature > 110°C → **Engine Overheating Alert**
* Speed > 120 km/h → **Overspeeding Warning**
* Tire Pressure < 25 PSI → **Low Tire Pressure**

---

## 📜 Vehicle Check History

The system stores the **last 10 vehicle health checks**.

Click **"View Check History"** to see a log of:

* Timestamp
* Speed
* Engine Temperature
* Battery Voltage
* Tire Pressure
* Vehicle Status

---

## 🌙 Automotive Dark Dashboard

The UI is designed with a **dark telemetry theme**, similar to modern vehicle diagnostic consoles.

Features include:

* Dashboard style metric cards
* Neon telemetry colors
* Alert animations
* Clean automotive UI

---

# ⚙️ Tech Stack

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Express.js

Database *(optional logging setup)*

* MongoDB

---

# 🏗 System Architecture

Vehicle Sensors (Simulated)
↓
Telemetry Dashboard
↓
Fault Detection Logic
↓
Alert Generation
↓
History Log Storage

---

# 📂 Project Structure

```
vehicle-fault-detection-system
│
├── public
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

---

# ▶ How to Run

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the server

```
node server.js
```

### 3️⃣ Open the dashboard

```
http://localhost:3000
```

---

# 🚀 Future Improvements

Possible upgrades for a production system:

* Real vehicle sensor integration (OBD-II / IoT modules)
* GPS tracking
* Cloud data storage
* Fleet monitoring dashboard
* AI-based predictive maintenance
* Mobile notifications for critical alerts

---

# 🎯 Project Purpose

The goal of this project is to demonstrate how **vehicle telemetry systems can monitor vehicle health in real time, detect faults early, and provide actionable insights through a modern dashboard interface.**

---

# 👨‍💻 Author

Vehicle Fault Detection System
Computer Science Project
