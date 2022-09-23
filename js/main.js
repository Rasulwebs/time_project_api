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

// theme change func
const checkbox=$("#checkbox");
checkbox.addEventListener("change", ()=>{
$("body").classList.toggle("dark");
$a(".card").forEach((card)=>{
    card.classList.toggle("card_dark_background")
});
let monthTable=$(".month_table");
let weekTable=$(".week_table");
if(monthTable.classList.contains("table-warning")){
    monthTable.classList.remove("table-warning");
    monthTable.classList.toggle("table-dark");

}else{
    monthTable.classList.remove("table-dark");
    monthTable.classList.add("table-warning");
}
if(weekTable.classList.contains("table-success")){
    weekTable.classList.remove("table-success");
    weekTable.classList.toggle("table-primary");

}else{
    weekTable.classList.remove("table-primary");
    weekTable.classList.add("table-success");
}
});


// clock func
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
};
showTime()


// data info func 
const day = $('.weekday_info');
function data() {
    const monthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyaby", "Oktyabr", "Noyabr", "Dekabr"];
    const d = new Date();
    day.innerHTML = `${d.getDate()}-${monthNames[d.getMonth()]}  ${d.getFullYear()}-yil `
};
setInterval(() => {
    data()
}, 500);


async function selectRegion(select = 'Toshkent', num) {
    const today = await fetch(`https://islomapi.uz/api/present/day?region=${select}`);
    // console.log(response);
    const result = await today.json();
    const week = await fetch(
        `https://islomapi.uz/api/present/week?region=${select}`
    );
    const weekResult = await week.json();

    const month = await fetch(
        `https://islomapi.uz/api/monthly?region=${select}&month=${new Date().getMonth() + 1}`
    );
    const monthResult = await month.json();
    // console.log(result);
    // renderData(result)
    console.log(result);
    console.log(weekResult);
    console.log(monthResult);
 
    localStorage.setItem('data', JSON.stringify(result));
    localStorage.setItem('week', JSON.stringify(weekResult));
    localStorage.setItem('month', JSON.stringify(monthResult));
 
    renderData()
};
// selectRegion()


// select tanlanganda hududni infosini chiqarish
$('#region_select').addEventListener('change', (e) => {
    e.preventDefault();
    localStorage.setItem("city", e.target.value);
    // $("#city").innerHTML = e.target.value;
    const city = localStorage.getItem("city").toLowerCase();
    // switch (e.target.value.toLowerCase()) {
    switch (city) {
        case 'toshkent':
            selectRegion('toshkent');
            break;
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
        case "qoraqalpog'iston":
            selectRegion("nukus");
            break;
        case "sirdaryo":
            selectRegion("guliston");
            break;
        default: ("toshkent");

    }

});


// hudud tanlanagnada vaqtlarini korsatuvchi func
function renderData() {//result
    const result = JSON.parse(localStorage.getItem('data'));
    const week = JSON.parse(localStorage.getItem('week'));
    const month = JSON.parse(localStorage.getItem('month'));
    console.log(result);
    const {region, times: { asr, hufton, peshin, quyosh, shom_iftor, tong_saharlik } } = result;
    $("#city").textContent=region;
    $a('.fs-1')[0].textContent = tong_saharlik;
    $a('.fs-1')[1].textContent = quyosh;
    $a('.fs-1')[2].textContent = peshin;
    $a('.fs-1')[3].textContent = asr;
    $a('.fs-1')[4].textContent = shom_iftor;
    $a('.fs-1')[5].textContent = hufton;


    //    render week
week.forEach((item) => {
    
    const tr = crElement('tr', 'item', `
      <td>${item.region}</td> <td>${item.date.substring(0, 10)}</td> <td>${item.weekday}</td>  <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);

      $('#week').appendChild(tr)
    
 });

 month.forEach((item) => {
    
    const tr = crElement('tr', 'item', `
      <td>${item.region}</td> <td>${item.date.substring(0, 10)}</td> <td>${item.weekday}</td>  <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);

      $('#month').appendChild(tr)
    
 })

};
renderData()





//osatni boshqacha design and func
// function time() {

//     setInterval(() => {
//        const date = new Date();
//        $('#time').innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//     }, 1000)
//  }
 
//  time()
