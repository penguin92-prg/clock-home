const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateTime(){
  // 日付オブジェクトを取得
  const now = new Date();

  document.getElementById("time").textContent = String(now.getHours()).padStart(2, '0') + ":" +  String(now.getMinutes()).padStart(2, '0');

  document.getElementById("dayAndMonth").textContent = days[now.getDay()%7] + " " + months[now.getMonth()%12];
  document.getElementById("date").textContent = now.getDate();

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const millSecond = now.getMilliseconds();

  var secondDeg = Number(second * 360 / 60) + Number(millSecond * 360 / 60 / 1000);
  var minuteDeg = Number(minute * 360 / 60) + Number(second * 360 / 60 / 60) + Number(millSecond * 360 / 60 / 60 / 1000);

  document.getElementById("span1").style.background = "conic-gradient(var(--span1) " + secondDeg + "deg, var(--span2) " + secondDeg + "deg 360deg)";
  document.getElementById("span2").style.background = "conic-gradient(var(--span1) " + minuteDeg + "deg, var(--span2) " + minuteDeg + "deg 360deg)";

  // 朝7時以前もしくは夜19時以降はナイトモードをオン
  if(now.getHours() <= 7 || now.getHours() >= 19){
    document.documentElement.style.setProperty('--background', "#181818");
    document.documentElement.style.setProperty('--text', "#f8f8f8");
    document.documentElement.style.setProperty('--span1', "#303030");
    document.documentElement.style.setProperty('--span2', "#1a1a1a");
  }
  else{
    document.documentElement.style.setProperty('--background', "#f8f8f8");
    document.documentElement.style.setProperty('--text', "#0f0f0f");
    document.documentElement.style.setProperty('--span1', "#e0e0e0");
    document.documentElement.style.setProperty('--span2', "#f2f2f2");
  }


  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
  const endDate = new Date(year, month,  0); // 月の最後の日を取得
  const endDayCount = endDate.getDate(); // 月の末日
  const startDay = startDate.getDay(); // 月の最初の日の曜日を取得(0-6)
  let dayCount = 1 // 日にちのカウント
  let calendarHtml = ''; // HTMLを組み立てる変数

  calendarHtml += '<div><div class="week">';

  // 曜日の行を作成
  for (let i = 0; i < days.length; i++) {
    calendarHtml += '<div class="day">' + days[i] + '</div>';
  }

  calendarHtml += "</div>";

  var w = 0;
  var weekEnd = true;

  while (weekEnd) {
  
    calendarHtml += '<div class="week">';

    for (var d = 0; d < 7; d++) {

      if (w == 0 && d < startDay) {
        // 1行目で1日の曜日の前
        calendarHtml += '<div></div>';
      }

      else if (dayCount > endDayCount) {
        // 末尾の日数を超えた
        calendarHtml += '<div></div>';
        weekEnd = false;
      }
      
      else {
        if(dayCount == now.getDate()){
          calendarHtml += '<div id="today" class="day">' + dayCount + '</div>';
        }
        else{
          calendarHtml += '<div class="day">' + dayCount + '</div>';
        }
        
        if(dayCount == endDayCount && d == 6){
          weekEnd = false;
        }

        dayCount++;
      }
    }
    calendarHtml += '</div>';

    w++;
  }

  calendarHtml += '</div>';

  document.querySelector('#calendar2').innerHTML = calendarHtml;

  document.querySelector("#calendar2>div").style.gridTemplateRows = "repeat(" + String(w+1) + ", 1fr)";
}


window.addEventListener("load", function(){
  updateTime();
  setInterval(updateTime, 10);

  document.querySelector(":root").style.fontSize = (window.innerWidth * 0.01) + "px";
});

// 端末の傾きを検知する
window.addEventListener("orientationchange", () => {
  document.querySelector(":root").style.fontSize = (window.innerWidth * 0.01) + "px";
});

document.getElementById("clockContainer").addEventListener("click", function(){
  document.querySelector(":root").style.fontSize = (window.innerWidth * 0.01) + "px";
});