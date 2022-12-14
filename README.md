![README logo](https://user-images.githubusercontent.com/32566767/201516950-1ba2ce35-2be3-4840-bc2f-ff436d4a3602.png)

> Development of access management system for major facilities using smart phone and beacon sensor (BLE)  

## π Development Period
2022.08.08. ~ 2022.10.27. (About 3 month)

## π Contributor

<div align="center">
    <a href="https://github.com/ash-hun" align="center">
      <img src=https://img.shields.io/badge/Ash_hun-000000?style=flat-square/>
    </a>
    <a href="https://github.com/MinsungKimDev" align="center">
      <img src=https://img.shields.io/badge/MinsungKimDev-7b00bd?style=flat-square/>
    </a>
    <a href="https://github.com/HS980924" align="center">
      <img src=https://img.shields.io/badge/HS980924-5e5858?style=flat-square/>
    </a>
    <a href="https://github.com/Dejong1706" align="center">
      <img src=https://img.shields.io/badge/Dejong1706-473c99?style=flat-square/>
    </a>
    <a href="https://github.com/Bluewak" align="center">
      <img src=https://img.shields.io/badge/BlueWak-6fafe3?style=flat-square/>
    </a>
</div>

<!---

## π Docs

**[π Project Docs! (Don't link Not yet) ]()**


<a href="">
  <img src="https://img.shields.io/badge/Docs-F7DF1E.svg?&style=for-the-badge&logo=Notion&logoColor=000000"/>
</a>
--->
  
---  


     Copyright 2022. Hannam University, SMART BeaconTeam(HCS-Beacon Contributor) All of source cannot be copied without permission.

## π  How to use

### FE
1. **$ cd .\FE\my-app** (my-appν΄λκΉμ§ μ΄λ)

2. **$ npm i** (νμν νμΌ μ€μΉ)

3. make ".env" file (my-appν΄λμ .envνμΌ μμ±& νκ²½ λ³μ μ½μ)

4. **$ npm next build** (λ°°ν¬ λ° μ€μΉ)

5. **$ npm start** (μ€ν)
---  

### HW
1. λΌμ¦λ² λ¦¬νμ΄μ node.js μ€μΉ
   - Install **node.js** on Raspberry Pi

2. λΌμ¦λ² λ¦¬νμ΄μλ HW ν΄λλ§ λ€μ΄λ‘λ ν©λλ€.
   - Download only HW folder to Raspberry Pi

3. λ€μ΄λ‘λν ν΄λ κ²½λ‘(/'λ€μ΄λ‘λν κ²½λ‘'/HW)μμ ν°λ―Έλμ μ½λλ€.
   - Open terminal in downloaded folder path

4. **npm i** λͺλ Ήμ΄λ₯Ό μλ ₯νλ©΄ νμν ν¨ν€μ§λ₯Ό μλμΌλ‘ μ€μΉν©λλ€.
   - Input **$ npm i** command line in terminal 

5. client.js νμΌ μλΆλΆ μ£Όμμ νμΈνμ¬ .env νμΌμ μμ±νμ¬ μμ±ν©λλ€.
    - Check comment Client.js file μλΆλΆμ and Make .env file edit

6. μλ²κ° μλλμ΄μλ μνμμ λ€μ΄λ‘λν ν΄λ κ²½λ‘(/'λ€μ΄λ‘λν κ²½λ‘'/HW)μμ **sudo node client.js** λͺλ Ήμ΄λ₯Ό μλ ₯νλ©΄ νλ‘κ·Έλ¨μ΄ μ€νλ©λλ€.
    - When the server is executing, type the commend **sudo node client.js** into the terminal.
---  

### BE
1. **$ cd BE** (BE ν΄λκΉμ§ μ΄λ)

2. **$ npm i** (νμν νμΌ μ€μΉ)

3. make ".env" file (BEν΄λμ .envνμΌ μμ±& νκ²½ λ³μ μ½μ)

4. Start mariaDB (mariaDB μ€ν)

5. **$ npm run start** (μλ² μ€ν)

### <span style="color:red">**Please Check**</span>
- <span style="color:red">Please Turn on mariaDB before server start!</span>
---  


