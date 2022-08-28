console.clear()

var today = new Date()
// 因為運算時 month 是以 0~11 來運算，所以加上 1
today.setMonth(today.getMonth()+1)

// [Tenthou,Thou,Hund]
// 核心的資料物件
var calcDatas = {
  today: null,
  nextDay: [],
  toNextDay: [],
  nextDate: []
}


function calcDay(start){
  // 為什麼系統會是以 5/9 當作 0 點，因此會少 31 天
  let sec = Math.abs(today-start)/1000
  let day = sec/86400
  return Math.floor(day)
}

// 計算剩餘天數的函數
function clacNextDays(data){
  let digitTenthou = parseInt(data.today / 10000)
  let digitThou = parseInt((data.today-digitTenthou*10000) / 1000)
  let digitHund = parseInt((data.today-digitTenthou*10000-digitThou*1000) / 100)
  let digits = [digitTenthou,digitThou,digitHund]
  let nextDigits = digits.map(function(item){
     return item+1
  })  
  // 有什麼改良的寫法嗎？
  calcDatas.nextDay[0] = nextDigits[0]*10000
  calcDatas.nextDay[1] = digits[0]*10000+nextDigits[1]*1000
  calcDatas.nextDay[2] = digits[0]*10000+digits[1]*1000+nextDigits[2]*100
  
  calcDatas.toNextDay = calcDatas.nextDay.map(function(item){
    return (item-data.today)
  })
}

// 做出結果日期的函數
function addToDate(data){  
  // 因為污染到了 today，原先的疊加 bug 就出現在這裡。
  calcDatas.nextDate = data.toNextDay.map(function(item,i){
    let today = new Date()
    let str = new Date(today.setDate(today.getDate()+item)).toLocaleString()
    return str.split(" ")[0]
  })
  console.log(calcDatas)
}

var show = false
$("button").click(function(){
  console.clear()
  if(show == false){
    $(this).removeClass("is_showed")
    $(this).text("隱藏")
    show = true
  }
  else{
    $(this).addClass("is_showed")
    $(this).text("更多")
    show = false
  }
    // console.log(status)
  
  let year = $(".year").val() 
  let month = $(".month").val() 
  let day = $(".day").val()
  inputDate = new Date(year,month,day)
  result = calcDay(inputDate)+1
  
  calcDatas.today = result  
  
  clacNextDays(calcDatas)
  addToDate(calcDatas)
  rendorResult(calcDatas)
})

$("input").click(function(){
  let preFill = [1993,1,24]
  if($(this).val() != ""){
    $(this).val("")
  }
  else{
    if($(this).attr("class") == "year"){
      $(this).val(preFill[0])
    }
    else if($(this).attr("class") == "month"){
      $(this).val(preFill[1])
    }
    else{
      $(this).val(preFill[2])
    }
  }
})

function rendorResult(result){
  $(".show").text(result.today)
  $(".next_info").toggleClass("hide")
  // let list = $("ul").children().toArray()
  // list.forEach(function(item,i){
  //   item.append(result.nextDate[i])
  // })
  $(".tenthou>.howmany").text("("+calcDatas.toNextDay[0]+" Days)")
  $(".thou>.howmany").text("("+calcDatas.toNextDay[1]+" Days)")
  $(".hund>.howmany").text("("+calcDatas.toNextDay[2]+" Days)")
  $(".tenthou>.next_date").text(calcDatas.nextDate[0])
  $(".thou>.next_date").text(calcDatas.nextDate[1])
  $(".hund>.next_date").text(calcDatas.nextDate[2])
}


