// dateselect_choice library
// update: 2012-10-22
// ver1.0.1
// SYNCKGRAPHICA

// 日付のエレメント名
var cd_date_elements_name = 'ご予約日(必須)';

// 何日分表示するか(定休日含)
var cd_day_max = 30;

// 何営業日後から表示するか
var cd_day_start = 5;

// 定休日 0:日～6:土
var cd_holyday_week = new Array();

// 定休日の指定 0:日、1:月、2:火、3:水、4:木、5:金、6:土
// 定休日なしの場合は以下の1行をコメントアウト
cd_holyday_week[2] = 1; // 例)火曜日が定休日の場合

// 特定日のを休日にする場合
var temporaryClosing = new Array();
// temporaryClosing["2012-12-25"] = true; // 特定の日付を表示しない場合は左記のように指定

// 一番先頭に空白を入れる場合は文字を消してください。
var cd_blank_option = '選択してください';

var cd_calendars = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
var cd_monthName = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
var cd_weeksName = new Array('日','月','火','水','木','金','土');
var cd_optgroup = null;
document.write('<select name="'+cd_date_elements_name+'" class="mfp">');
if(cd_blank_option != '')
	document.write('<option value="">'+cd_blank_option+'</option>');
for(i=0;i<cd_day_max;i++){
	var cd_today = new Date((new Date()).getTime()+((cd_day_start+i) * 1000 * 60 * 60 * 24));
	var cd_year = cd_today.getYear();
	var cd_month = cd_today.getMonth();
	var cd_day = cd_today.getDate();
	var cd_month_text = cd_month + 1;
	if (cd_year < 1900) cd_year += 1900;
	if(cd_day < 10) cd_day = "0"+cd_day;
	if(cd_month_text < 10) cd_month_text = "0"+cd_month_text;
	var dayText = cd_year + '-' + cd_month_text + '-' + cd_day;
	var current_optgroup = cd_year+'年'+cd_monthName[cd_month]+'月';
	if(current_optgroup != cd_optgroup){
		if(cd_optgroup != null)
			document.write('</optgroup>');
		document.write('<optgroup label="'+current_optgroup+'">');
		cd_optgroup = current_optgroup;
	}
	cd_style = "";
	if(cd_today.getDay() == 0)
		cd_style = ' style="color: #CC0000;background-color: #FFEEEE;"';
	if(cd_today.getDay() == 6)
		cd_style = ' style="color: #0000CC;background-color: #EEEEFF;"';
	if(!cd_holyday_week[cd_today.getDay()] && temporaryClosing[dayText] == undefined){
		//document.write('<option value="'+cd_year+'年'+cd_monthName[cd_month]+'月'+cd_day+'日('+cd_weeksName[cd_today.getDay()]+')"'+cd_style+'>'+cd_year+'年'+cd_monthName[cd_month]+'月'+cd_day+'日('+cd_weeksName[cd_today.getDay()]+')</option>');
		document.write('<option value="'+cd_year+cd_monthName[cd_month]+cd_day+'"'+cd_style+'>'+cd_year+'年'+cd_monthName[cd_month]+'月'+cd_day+'日('+cd_weeksName[cd_today.getDay()]+')</option>');
	}
}
document.write('</optgroup></select>');
