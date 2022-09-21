"use strict";
// reginlarni option qilib dynamik yaratish
function getOption() {
    provencie.sort();
    provencie.forEach((item) => {
        const option = crElement('option', "option", item);
        $('#region_select').appendChild(option);
    });
};
getOption()

async function selectRegion(select = 'Toshkent') {
    const response = await fetch(`https://islomapi.uz/api/present/day?region=${select}`);
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    renderData(result)
};
selectRegion()

// select tanlanganda hududni infosini chiqarish
$('#region_select').addEventListener('change', (e) => {
    $("#city").innerHTML = e.target.value;
    switch (e.target.value.toLowerCase()) {
        case 'qashqadaryo':
            selectRegion('qarshi');
            break;
        case "farg'ona":
            selectRegion("qo'qon");
            break;
        case "samarqand":
            selectRegion("samarqand");
            break;
        case "xorazm":
            selectRegion("urganch");
            break;
        //
        case "navoiy":
            selectRegion("navoiy");
            break;
        case "surxondaryo":
            selectRegion("termiz");
            break;
        case "andijon":
            selectRegion("andijon");
            break;
        case "namangan":
            selectRegion("namangan");
            break;
        case "jizzax":
            selectRegion("jizzax");
            break;
        case "buxoro":
            selectRegion("buxoro");
            break;
        case "sirdaryo":
            selectRegion("guliston");
            break;
    
    }
})

function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var sessionn = "AM";
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        sessionn = "PM"
    }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    var time = sessionn + " " + h + ":" + m + ": " + s  
    document.getElementById("clockk").innerText = time;
    document.getElementById("clockk").textContent = time;
    setTimeout(showTime, 1000);
}
showTime()



const day=$('.weekday_info')
// clock func info
function data() {
    const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun","Iyul", "Avgust", "Sentyaby", "Oktyabr", "Noyabr", "Dekabr"];
    const d = new Date();
    day.innerHTML = `${d.getDate()}-${monthNames[d.getMonth()]}  ${d.getFullYear()}-yil `
};
setInterval(() => {
    data()
}, 500);


// hudud tanlanagnada vaqtlarini korsatuvchi func
function renderData(result) {

    const {times: {asr ,hufton,peshin,quyosh,shom_iftor,tong_saharlik }}=result;
    $a('.fs-1')[0].textContent=tong_saharlik;
    $a('.fs-1')[1].textContent=quyosh;
    $a('.fs-1')[2].textContent=peshin;
    $a('.fs-1')[3].textContent=asr;
    $a('.fs-1')[4].textContent=shom_iftor;
    $a('.fs-1')[5].textContent=hufton;

 }
 renderData()


