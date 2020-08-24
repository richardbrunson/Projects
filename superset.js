////////////////////////////////////////////////////////////////////// About
/*
This "JavaScript Superset" copyright (c) 2005-2009 Richard Brunson.
Last update: 23 April 2009

http://www.iq01.com/javascript_superset.html
http://www.iq01.com/superset.xml
javascript.superset@iq01.com

Disclaimer:
NO WARRANTIES -- USE THIS SOFTWARE AT YOUR OWN RISK!
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER(S) AND CONTRIBUTOR(S) "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT OWNER(S) OR CONTRIBUTOR(S) BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/






////////////////////////////////////////////////////////////////////// Global

function Alert(text)
{
	text = Default(text, "");
	var border = "===============================================";
	alert(border + String.CRLF + String.CRLF + text + String.CRLF + String.CRLF + border);
}

var COUNTER = 0;
function Counter()
{
	return COUNTER++;
}
function ResetCounter(value)
{
	value = Default(value, 0);
	COUNTER = value;
}

function Default(value, defaultValue)
{
	return (value === undefined ? defaultValue : value);
}

function Element(id)
{
	try
	{
		return document.getElementById(id);
	}
	catch (e)
	{
		try
		{
			return document.all[id];
		}
		catch (e)
		{
			try
			{
				return document.layers[id];
			} catch (e) { }
		}
	}
	return null;
}

function Include(filePath)
{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = filePath;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function NewObject(object)
{
	function fn() { }
	fn.prototype = object;
	return new fn();
}

function Nil()
{
	Alert("This feature not implemented.");
}






////////////////////////////////////////////////////////////////////// Ajax
function Ajax(url, callbackFn)
{
	callbackFn = Default(callbackFn, function() { });
	var httpState = { uninitialized: 0, loading: 1, loaded: 2, waiting: 3, complete: 4 }, that = this;
	this.callback = callbackFn;
	this.ajaxObject = function()
	{
		var ajax = null;
		if (window.XMLHttpRequest)
		{
			try
			{
				ajax = new XMLHttpRequest();
			} catch (e) { }
		}
		else if (window.ActiveXObject)
		{
			try
			{
				ajax = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try
				{
					ajax = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) { }
			}
		}
		return ajax;
	};
	this.updating = false;
	this.update = function(data, doPost)
	{
		doPost = Default(doPost, false);
		if (that.updating)
		{
			return false;
		}
		that.ajax = this.ajaxObject();
		if (that.ajax === null)
		{
			return false;
		}
		that.ajax.onreadystatechange = function()
		{
			if (that.ajax.readyState == httpState.complete)
			{
				that.updating = false;
				that.callback(that.ajax.responseText, that.ajax.status, that.ajax.responseXML);
				that.ajax = null;
			}
		};
		that.updating = new Date();
		if (doPost)
		{
			try
			{
				that.ajax.open("POST", url + "?" + that.updating.getTime(), true);
				that.ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				that.ajax.send(data);
			}
			catch (e)
			{
				return false;
			}
		}
		else
		{
			try
			{
				that.ajax.open("GET", url + "?" + data + "&timestamp=" + that.updating.getTime(), true);
				that.ajax.send(null);
			}
			catch (e)
			{
				return false;
			}
		}
		return true;
	};
	this.updateGet = function(data)
	{
		return this.update(data, false);
	};
	this.updatePost = function(data)
	{
		return this.update(data, true);
	};
	this.abort = function()
	{
		if (that.updating)
		{
			that.updating = false;
			that.ajax.abort();
			that.ajax = null;
		}
	};
}






////////////////////////////////////////////////////////////////////// Array

if (!Array.prototype.average) Array.prototype.average = function()
{
	return this.sum() / this.length;
};

if (!Array.prototype.compact) Array.prototype.compact = function()
{
	var els = this.emptyElements(), i;
	for (i = els.length - 1; i > -1; i--)
	{
		this.splice(els[i], 1);
	}
	return this;
};

if (!Array.prototype.emptyElements) Array.prototype.emptyElements = function()
{
	var empties = [], i;
	for (i = 0; i < this.length; i++)
	{
		if (this[i] === undefined)
		{
			empties.push(i);
		}
	}
	return empties;
};

if (!Array.prototype.erase) Array.prototype.erase = function()
{
	this.length = 0;
	return this;
};

if (!Array.prototype.every) Array.prototype.every = function(callback)
{
	var returnValue = true, i;
	for (i = 0; i < this.length; i++)
	{
		returnValue &= callback(this[i]);
		if (!returnValue)
		{
			break;
		}
	}
	return (returnValue ? true : false);
};

if (!Array.prototype.filter) Array.prototype.filter = function(callback)
{
	var returnArray = [], i;
	for (i = 0; i < this.length; i++)
	{
		if (callback(this[i]))
		{
			returnArray.push(this[i]);
		}
	}
	return returnArray;
};

if (!Array.prototype.first) Array.prototype.first = function(nonEmpty)
{
	nonEmpty = Default(nonEmpty, false);
	var first = 0, i;
	if (nonEmpty)
	{
		for (i = 0; i < this.length; i++)
		{
			if (this[i] !== undefined)
			{
				first = i;
				break;
			}
		}
	}
	return this[first];
};

if (!Array.prototype.flatten) Array.prototype.flatten = function(doCompact)
{
	doCompact = Default(doCompact, false);
	var array = [], els, i, j;
	for (i = 0; i < this.length; i++)
	{
		if (this[i].isArray())
		{
			els = this[i].flatten();
			if (doCompact)
			{
				els = els.compact();
			}
			for (j = 0; j < els.length; j++)
			{
				array.push(els[j]);
			}
		}
		else
		{
			array.push(this[i]);
		}
	}
	return array;
};

if (!Array.prototype.forEach) Array.prototype.forEach = function(callback)
{
	var i;
	for (i = 0; i < this.length; i++)
	{
		callback(this[i]);
	}
};

if (!Array.prototype.has) Array.prototype.has = function(value)
{
	return this.test(value);
};

if (!Array.prototype.hasEmptyElements) Array.prototype.hasEmptyElements = function()
{
	return (this.isEmpty() || !this.emptyElements().isEmpty());
};

if (!Array.prototype.hasValue) Array.prototype.hasValue = function(value)
{
	return this.test(value);
};

if (!Array.prototype.indexCount) Array.prototype.indexCount = function(value)
{
	var count = 0, i;
	for (i = 0; i < this.length; i++)
	{
		count += (this[i] == value ? 1 : 0);
	}
	return count;
};

if (!Array.prototype.indexOf) Array.prototype.indexOf = function(value)
{
	return this.search(value);
};

if (!Array.prototype.initialize) Array.prototype.initialize = function(value)
{
	value = Default(value, 0);
	var i;
	for (i = 0; i < this.length; i++)
	{
		this[i] = value;
	}
	return this;
};

if (!Array.prototype.isEmpty) Array.prototype.isEmpty = function()
{
	return (this.length === 0);
};

if (!Array.prototype.itemList) Array.prototype.itemList = function(listCount)
{
	listCount = Default(listCount, 2);
	if (this.length > 2 && listCount > 1 && listCount < this.length - 1)
	{
		var items = [], itemExists, i, j;
		items.length = listCount;
		for (i = 0; i < listCount; i++)
		{
			do
			{
				itemExists = false;
				items[i] = this[Math.floor(Math.random() * this.length)];
				for (j = 0; j < listCount; j++)
				{
					if (j != i)
					{
						itemExists = (items[j] == items[i]);
					}
					if (itemExists)
					{
						break;
					}
				}
			}
			while (itemExists);
		}
		return items;
	}
	else
	{
		return this;
	}
};

if (!Array.prototype.last) Array.prototype.last = function(nonEmpty)
{
	nonEmpty = Default(nonEmpty, false);
	var last = this.length - 1, i;
	if (nonEmpty)
	{
		for (i = last; i > -1; i--)
		{
			if (this[i] !== undefined)
			{
				last = i;
				break;
			}
		}
	}
	return this[last];
};

if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(value)
{
	var search = -1, i;
	for (i = this.length - 1; i > -1; i--)
	{
		if (this[i] == value)
		{
			search = i;
			break;
		}
	}
	return search;
};

if (!Array.prototype.map) Array.prototype.map = function(callback)
{
	return this.using(callback);
};

if (!Array.prototype.maxValue) Array.prototype.maxValue = function()
{
	var max = Number.NEGATIVE_INFINITY, i;
	for (i = 0; i < this.length; i++)
	{
		max = Math.max(max, this[i]);
	}
	return max;
};

if (!Array.prototype.minValue) Array.prototype.minValue = function()
{
	var min = Number.POSITIVE_INFINITY, i;
	for (i = 0; i < this.length; i++)
	{
		min = Math.min(min, this[i]);
	}
	return min;
};

if (!Array.prototype.product) Array.prototype.product = function()
{
	var product = 1, i;
	for (i = 0; i < this.length; i++)
	{
		product *= this[i];
	}
	return product;
};

if (!Array.prototype.random) Array.prototype.random = function(remove)
{
	remove = Default(remove, true);
	var item = Math.floor(Math.random() * this.length);
	if (remove)
	{
		this.swap(item, this.length - 1);
	}
	return (remove ? this.pop() : this[item]);
};

if (!Array.prototype.randomize) Array.prototype.randomize = function(min, max, ensureUnique)
{
	min = Default(min, 1);
	max = Default(max, 100);
	ensureUnique = Default(ensureUnique, false);
	var values = [], i, value;
	if (ensureUnique)
	{
		min = Math.min(min, max);
		max = Math.max(min, max);
		for (i = min; i <= max; i++)
		{
			values.push(i);
		}
		ensureUnique = (values.length >= this.length);
	}
	for (i = 0; i < this.length; i++)
	{
		value = Number.random(min, max);
		if (ensureUnique)
		{
			value = values.random();
		}
		this[i] = value;
	}
	return this;
};

if (!Array.rgbGradient) Array.rgbGradient = function(startColor, endColor, stepCount)
{
	startColor = startColor.hexToRgb();
	startColor.red = parseInt(startColor.red, 10);
	startColor.green = parseInt(startColor.green, 10);
	startColor.blue = parseInt(startColor.blue, 10);
	endColor = endColor.hexToRgb();
	endColor.red = parseInt(endColor.red, 10);
	endColor.green = parseInt(endColor.green, 10);
	endColor.blue = parseInt(endColor.blue, 10);
	var rStep = (endColor.red - startColor.red) / (stepCount - 1), gStep = (endColor.green - startColor.green) / (stepCount - 1),
		bStep = (endColor.blue - startColor.blue) / (stepCount - 1), steps = [], r, g, b, i;
	for (i = 0; i < stepCount; i++)
	{
		r = Math.round(startColor.red + rStep * i).clamp(0, 255);
		g = Math.round(startColor.green + gStep * i).clamp(0, 255);
		b = Math.round(startColor.blue + bStep * i).clamp(0, 255);
		steps.push(([r, g, b]).rgbToHex());
	}
	return steps;
};
if (!Array.prototype.rgbGradient) Array.prototype.rgbGradient = function()
{
	return Array.rgbGradient(this[0], this[1], this[2]);
};

if (!Array.prototype.rgbToHex) Array.prototype.rgbToHex = function()
{
	return this[0].toBase(16).pad(2, "0") + this[1].toBase(16).pad(2, "0") + this[2].toBase(16).pad(2, "0");
};

if (!Array.prototype.rotate) Array.prototype.rotate = function(toLeft)
{
	toLeft = Default(toLeft, true);
	if (toLeft)
	{
		this.push(this.shift());
	}
	else
	{
		this.unshift(this.pop());
	}
	return this;
};

if (!Array.prototype.rotateLeft) Array.prototype.rotateLeft = function()
{
	return this.rotate(true);
};

if (!Array.prototype.rotateRight) Array.prototype.rotateRight = function()
{
	return this.rotate(false);
};

if (!Array.prototype.search) Array.prototype.search = function(value)
{
	var search = -1, i;
	for (i = 0; i < this.length; i++)
	{
		if (this[i] == value)
		{
			search = i;
			break;
		}
	}
	return search;
};

if (!Array.prototype.shiftLeft) Array.prototype.shiftLeft = function(value) {
    this[0] = value;
    return this.rotateLeft();
};

if (!Array.prototype.shiftRight) Array.prototype.shiftRight = function(value) {
    this[this.length - 1] = value;
    return this.rotateRight();
};

if (!Array.prototype.shuffle) Array.prototype.shuffle = function()
{
	if (this.length > 1)
	{
		var index1, index2, temp, i;
		for (i = 0; i < this.length; i++)
		{
			index1 = Math.floor(Math.random() * this.length);
			index2 = Math.floor(Math.random() * this.length);
			temp = this[index1];
			this[index1] = this[index2];
			this[index2] = temp;
		}
	}
	return this;
};

if (!Array.prototype.some) Array.prototype.some = function(callback)
{
	var returnValue = false, i;
	for (i = 0; i < this.length; i++)
	{
		returnValue |= callback(this[i]);
		if (returnValue)
		{
			break;
		}
	}
	return (returnValue ? true : false);
};

if (!Array.prototype.sortNumeric) Array.prototype.sortNumeric = function(isReverse)
{
	isReverse = Default(isReverse, false);
	return this.sort(function(x, y)
	{
		if (isReverse)
		{
			return y - x;
		}
		else
		{
			return x - y;
		}
	}
	);
};

if (!Array.prototype.sortString) Array.prototype.sortString = function()
{
	return this.sort();
};

if (!Array.prototype.sum) Array.prototype.sum = function()
{
	var sum = 0, i;
	for (i = 0; i < this.length; i++)
	{
		sum += this[i];
	}
	return sum;
};

if (!Array.prototype.swap) Array.prototype.swap = function(first, second)
{
	first = Default(first, 0);
	second = Default(second, 0);
	var temp = this[first];
	this[first] = this[second];
	this[second] = temp;
};

if (!Array.prototype.test) Array.prototype.test = function(value)
{
	var i;
	for (i = 0; i < this.length; i++)
	{
		if (this[i] == value)
		{
			return true;
		}
	}
	return false;
};

if (!Array.prototype.toLowerCase) Array.prototype.toLowerCase = function()
{
	return this.using(function(z)
	{
		try
		{
			return z.toLowerCase();
		}
		catch (e)
		{
			return z;
		}
	}
	);
};

if (!Array.prototype.toUpperCase) Array.prototype.toUpperCase = function()
{
	return this.using(function(z)
	{
		try
		{
			return z.toUpperCase();
		}
		catch (e)
		{
			return z;
		}
	}
	);
};

if (!Array.prototype.unique) Array.prototype.unique = function()
{
	var results = [], isDup, i, j;
	for (i = 0; i < this.length; i++)
	{
		isDup = false;
		for (j = 0; j < results.length; j++)
		{
			isDup |= (this[i] === results[j]);
		}
		if (!isDup)
		{
			results.push(this[i]);
		}
	}
	return results;
};

if (!Array.prototype.using) Array.prototype.using = function(functionObject)
{
	var results = [], i;
	for (i = 0; i < this.length; i++)
	{
		results[i] = functionObject(this[i]);
	}
	return results;
};






////////////////////////////////////////////////////////////////////// Boolean

if (!Boolean.prototype.yesNo) Boolean.prototype.yesNo = function()
{
	return ((this == true) ? "Yes" : "No");
};






////////////////////////////////////////////////////////////////////// Date

if (!Date.prototype.compact) Date.prototype.compact = function(showTime)
{
	showTime = Default(showTime, false);
	return (showTime ? this.format("YmdHis") : this.format("Ymd"));
};

if (!Date.prototype.daysInYear) Date.prototype.daysInYear = function()
{
	return (this.isLeapYear() ? 366 : 365);
};

if (!Date.prototype.daysLeftInYear) Date.prototype.daysLeftInYear = function()
{
	return this.daysInYear() - this.dayOfYear();
};

if (!Date.prototype.dayOfYear) Date.prototype.dayOfYear = function()
{
	var days = this.monthDays(), day = 0, i;
	for (i = 0; i < this.getMonth(); i++)
	{
		day += days[i];
	}
	return day + this.getDate();
};

if (!Date.prototype.firstDay) Date.prototype.firstDay = function(isGrid)
{
	isGrid = Default(isGrid, false);
	var day = (new Date(this.getFullYear(), this.getMonth(), 1)).getDay();
	return (isGrid ? 1 - day : day);
};

if (!Date.prototype.format) Date.prototype.format = function(formatString)
{
	// php date parameters: http://www.php.net/date
	formatString = Default(formatString, "");
	formatString = (formatString.isEmpty() ? "l, F d, Y @ H:i:s" : formatString);
	var month = this.getMonth(), date = this.getDate(), day = this.getDay(), hour = this.getHours(),
		isPm = (hour >= 12), hour12 = (isPm ? (hour - 12 === 0 ? 12 : hour - 12) : hour),
		minutes = this.getMinutes(), seconds = this.getSeconds(), php = [], digit, returnValue, theChar, i;
	php.Y = this.getFullYear().toString();
	php.y = php.Y.right(2);
	php.L = (this.isLeapYear() ? "1" : "0");
	php.F = this.monthName();
	php.M = php.F.left(3);
	php.m = (month + 1).pad(2);
	php.n = (month + 1).toString();
	php.t = this.monthDays()[month];
	php.l = this.weekDays()[day];
	php.D = php.l.left(3);
	php.d = date.pad(2);
	php.j = date.toString();
	php.N = (day === 0 ? 7 : day).toString();
	php.w = day.toString();
	php.z = (this.dayOfYear() - 1).toString();
	digit = php.j.right(1);
	php.S = (date >= 11 && date <= 13 ? "th" : (digit == "1" ? "st" : (digit == "2" ? "nd" : (digit == "3" ? "rd" : "th"))));
	php.G = hour.toString();
	php.g = hour12.toString();
	php.H = hour.pad(2);
	php.h = hour12.pad(2);
	php.A = (isPm ? "PM" : "AM");
	php.a = php.A.toLowerCase();
	php.i = minutes.pad(2);
	php.s = seconds.pad(2);
	php.u = this.getMilliseconds().toString();
	php.W = this.weekOfYear().toString();
	php.Z = (this.getTimezoneOffset() * 60).toString();
	php.U = Math.floor(Date.UTC(this.getFullYear(), month, date, hour, minutes, seconds, this.getMilliseconds()) / 1000).toString();
	returnValue = "";
	for (i = 0; i < formatString.length; i++)
	{
		theChar = formatString.charAt(i);
		returnValue += (php[theChar] ? php[theChar] : theChar);
	}
	return returnValue;
};

if (!Date.prototype.isLeapYear) Date.prototype.isLeapYear = function()
{
	return ((this.getFullYear() % 4 === 0) && (this.getFullYear() % 100 !== 0)) || (this.getFullYear() % 400 === 0);
};

if (!Date.prototype.monthDays) Date.prototype.monthDays = function()
{
	return [31, (this.isLeapYear() ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

if (!Date.prototype.monthName) Date.prototype.monthName = function()
{
	return Date.monthNames()[this.getMonth()];
};

if (!Date.monthNames) Date.monthNames = function()
{
	return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
};
if (!Date.prototype.monthNames) Date.prototype.monthNames = function()
{
	return Date.monthNames();
};

if (!Date.prototype.renderMonthGrid) Date.prototype.renderMonthGrid = function(isMonthOnly)
{
	isMonthOnly = Default(isMonthOnly, true);
	var month = this.getMonth(), months = this.monthNames(), weekdays = "SMTWTFS", dayCount = this.monthDays()[month],
		day = this.firstDay(true), today = new Date(), className, rowCount = 6, html = "", i, j;
	html += "<link href=\"styles.css\" rel=\"stylesheet\" type=\"text/css\" />";
	html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"Calendar\">";
	html += "<tr>";
	html += "<td valign=\"top\" align=\"center\" colspan=\"7\" class=\"CalendarMonth\">";
	html += months[month];
	if (isMonthOnly)
	{
		html += " " + this.getFullYear();
	}
	html += "</td>";
	html += "</tr>";
	html += "<tr>";
	for (i = 0; i < weekdays.length; i++)
	{
		html += "<td valign=\"top\" align=\"center\" class=\"CalendarDayHeader\">";
		html += weekdays.substr(i, 1);
		html += "</td>";
	}
	html += "</tr>";
	for (i = 0; i < rowCount; i++)
	{
		html += "<tr>";
		for (j = 0; j < 7; j++)
		{
			className = "CalendarDateWeekday";
			if (day == today.getDate() && month == today.getMonth() && this.year == today.getFullYear())
			{
				className = "CalendarDateToday";
			}
			else if (j === 0 || j == 6)
			{
				className = "CalendarDateWeekend";
			}
			html += "<td valign=\"top\" align=\"right\" class=\"" + className + "\">";
			if (day < 1 || day > dayCount)
			{
				html += "&nbsp;";
			}
			else
			{
				html += day;
			}
			html += "</td>";
			day++;
		}
		html += "</tr>";
	}
	html += "</table>";
	return html;
};

if (!Date.prototype.renderMonthRow) Date.prototype.renderMonthRow = function(isMonthOnly)
{
	isMonthOnly = Default(isMonthOnly, true);
	var month = this.getMonth(), days = this.monthDays(), weekdays = this.weekDays(true), weekday = this.firstDay(false),
		today = new Date(), day, className, html = "", i;
	html += "<link href=\"styles.css\" rel=\"stylesheet\" type=\"text/css\" />";
	if (isMonthOnly)
	{
		html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"Calendar\">";
		html += "<tr>";
		html += "<td valign=\"top\" colspan=\"32\" class=\"CalendarHeader CalendarYear\">";
		html += this.monthNames()[month] + " " + this.getFullYear();
		html += "</td>";
		html += "</tr>";
		html += "<tr>";
	}
	for (i = 0; i < days[month]; i++)
	{
		day = i + 1;
		className = "CalendarDateWeekday";
		switch ((new Date(this.getFullYear(), month, day)).getDay())
		{
			case 0:
			case 6:
				className = "CalendarDateWeekend";
				break;
			default:
				break;
		}
		if (day == today.getDate() && month == today.getMonth() && this.year == today.getFullYear())
		{
			className = "CalendarDateToday";
		}
		html += "<td valign=\"top\" align=\"right\" class=\"" + className + "\" width=\"3%\">";
		html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
		html += "<tr>";
		html += "<td valign=\"top\" align=\"left\" class=\"\">";
		html += weekdays[(weekday++) % 7];
		html += "</td>";
		html += "<td valign=\"top\" align=\"right\" class=\"\">";
		html += day;
		html += "</td>";
		html += "</tr>";
		html += "</table>";
		html += "</td>";
	}
	if (isMonthOnly)
	{
		html += "</tr>";
		html += "</table>";
	}
	return html;
};

if (!Date.prototype.renderYearGrid) Date.prototype.renderYearGrid = function(columnCount)
{
	columnCount = Default(columnCount, 4);
	var column = 0, html = "", date, i;
	html += "<link href=\"styles.css\" rel=\"stylesheet\" type=\"text/css\" />";
	html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"Calendar\">";
	html += "<tr>";
	html += "<td valign=\"top\" align=\"center\" colspan=\"" + columnCount + "\" class=\"CalendarYear\">";
	html += this.getFullYear();
	html += "</td>";
	html += "</tr>";
	for (i = 0; i < 12; i++)
	{
		date = new Date(this.getFullYear(), i, 1);
		if (column === 0)
		{
			html += "<tr>";
		}
		html += "<td valign=\"top\">";
		html += date.renderMonthGrid(false);
		html += "</td>";
		column++;
		if (column >= columnCount)
		{
			html += "</tr>";
			column = 0;
		}
	}
	html += "</table>";
	return html;
};

if (!Date.prototype.renderYearRow) Date.prototype.renderYearRow = function()
{
	var months = Date.monthNames(), html = "", date, i;
	html += "<link href=\"styles.css\" rel=\"stylesheet\" type=\"text/css\" />";
	html += "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"Calendar\">";
	html += "<tr>";
	html += "<td valign=\"top\" colspan=\"32\" class=\"CalendarHeader CalendarYear\">";
	html += this.getFullYear();
	html += "</td>";
	html += "</tr>";
	for (i = 0; i < months.length; i++)
	{
		html += "<tr>";
		html += "<td valign=\"top\" width=\"3%\">";
		html += months[i] + "&nbsp;";
		html += "</td>";
		date = new Date(this.getFullYear(), i, 1);
		html += date.renderMonthRow(false);
		html += "</tr>";
	}
	html += "</table>";
	return html;
};

if (!Date.prototype.weekDay) Date.prototype.weekDay = function()
{
	return Date.weekDays()[this.getDay()];
};

if (!Date.weekDays) Date.weekDays = function()
{
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
};
if (!Date.prototype.weekDays) Date.prototype.weekDays = function()
{
	return Date.weekDays();
};

if (!Date.prototype.weekOfYear) Date.prototype.weekOfYear = function(startDay)
{
	startDay = Default(startDay, 1);
	var week = Math.floor(this.dayOfYear() / 7);
	return ((new Date(this.getFullYear(), 0, 1)).getDay() == startDay ? week + 1 : week);
};






////////////////////////////////////////////////////////////////////// document

if (!document.$) document.$ = function(id)
{
	return Element(id);
};

if (!document.addStyleRule) document.addStyleRule = function(rule, sheet)
{
	sheet = Default(sheet, 0);
	if (document.styleSheets)
	{
		if (!document.styleRule(rule))
		{
			if (document.styleSheets[sheet].addRule)
			{
				document.styleSheets[sheet].addRule(rule, null, 0);
			}
			else
			{
				document.styleSheets[sheet].insertRule(rule + " { }", 0);
			}
		}
	}
	return document.styleRule(rule);
};

if (!document.allowsCookies) document.allowsCookies = function()
{
	var c = "cookieTest", t = "test";
	document.setCookie(c, t, 1);
	if (document.getCookie(c) == t)
	{
		document.deleteCookie(c);
		return true;
	}
	return false;
};

if (!document.deleteCookie) document.deleteCookie = function(name, path, domain)
{
	if (document.getCookie(name))
	{
		document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
};

if (!document.deleteStyleRule) document.deleteStyleRule = function(rule)
{
	return document.styleRule(rule, true);
};

if (!document.dimensions) document.dimensions = function()
{
	var pageWidth = -1, pageHeight = -1;
	try
	{
		switch (true)
		{
			case (window.innerWidth.isNumber()):
				pageWidth = window.innerWidth;
				pageHeight = window.innerHeight;
				break;
			case (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)):
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
				break;
			case (document.body && (document.body.clientWidth || document.body.clientHeight)):
				pageWidth = document.body.clientWidth;
				pageHeight = document.body.clientHeight;
				break;
			default:
				break;
		}
	} catch (e) { }
	return { width: pageWidth, height: pageHeight };
};

if (!document.element) document.element = function(id)
{
	return Element(id);
};

if (!document.getCookie) document.getCookie = function(name)
{
	var c = document.cookie, a, l, e;
	if (name == c.substring(0, name.length))
	{
		a = c.indexOf(name + "=");
		if (a > -1)
		{
			l = a + name.length + 1;
			e = c.indexOf(";", l);
			if (e == -1)
			{
				e = c.length;
			}
			return unescape(c.substring(l, e));
		}
	}
	return null;
};

if (!document.path) document.path = new function()
{
	var format = /^([a-z]+)[\:][\/]+([a-z0-9\.\-\:]+)[\/]?([\S]+[\/])?([^\s\?]+)[\?]?(.*)$/i,
		loc = document.location.toString(), parts = format.exec(loc), subDirs = [], query, kV, key, value, kVa, i;
	this.url = loc;
	this.protocol = parts[1];
	this.domain = parts[2];
	if (parts[3])
	{
		subDirs = parts[3].split("/");
	}
	this.subDirectories = [];
	for (i = 0; i < subDirs.length; i++)
	{
		if (subDirs[i].length > 0)
		{
			this.subDirectories.push(subDirs[i]);
		}
	}
	this.fileName = parts[4];
	this.queryString = parts[5];
	query = this.queryString.split("&");
	this.keyValue = {};
	for (i = 0; i < query.length; i++)
	{
		kV = query[i].split("=");
		key = kV[0];
		value = decodeURI(kV[1]);
		if (key.length > 0)
		{
			if (this.keyValue[key])
			{
				kVa = [];
				kVa.push(this.keyValue[key]);
				kVa.push(value);
				this.keyValue[key] = kVa;
			}
			else
			{
				this.keyValue[key] = value;
			}
		}
	}
};

if (!document.setCookie) document.setCookie = function(name, value, expiry, options)
{
	options = Default(options, {});
	var exp = null;
	if (expiry)
	{
		exp = new Date();
		exp.setDate(exp.getDate() + expiry);
	}
	document.cookie = name + "=" + escape(value) + ((expiry) ? ";expires=" + exp.toGMTString() : "") + ((options.path) ? ";path=" + options.path : "") + ((options.domain) ? ";domain=" + options.domain : "") + ((options.secure) ? ";secure" : "");
};

if (!document.styleRule) document.styleRule = function(rule, deleteRule)
{
	rule = rule.toLowerCase();
	deleteRule = Default(deleteRule, false);
	if (document.styleSheets)
	{
		var styleSheet, hasCss, cssRule, i, j;
		for (i = 0; i < document.styleSheets.length; i++)
		{
			styleSheet = document.styleSheets[i];
			hasCss = (!(!(styleSheet.cssRules)));
			cssRule = null;
			j = 0;
			do
			{
				if (hasCss)
				{
					cssRule = styleSheet.cssRules[j];
				}
				else
				{
					cssRule = styleSheet.rules[j];
				}
				if (cssRule)
				{
					if (cssRule.selectorText.toLowerCase() == rule)
					{
						if (deleteRule)
						{
							if (hasCss)
							{
								styleSheet.deleteRule(j);
							}
							else
							{
								styleSheet.removeRule(j);
							}
							return null;
						}
						else
						{
							return cssRule;
						}
					}
				}
				j++;
			}
			while (cssRule);
		}
	}
	return null;
};

if (!document.styleSheet) document.styleSheet = function()
{
	if (document.styleSheets)
	{
		var i;
		for (i = 0; i < document.styleSheets.length; i++)
		{
			if (document.styleSheets[i])
			{
				if (document.styleSheets[i].cssRules)
				{
					return document.styleSheets[i].cssRules;
				}
				else if (document.styleSheets[i].rules)
				{
					return document.styleSheets[i].rules;
				}
			}
		}
	}
	return null;
};






////////////////////////////////////////////////////////////////////// Function

if (!Function.prototype.addMethod) Function.prototype.addMethod = function(functionName, functionBody)
{
	this.prototype[functionName] = functionBody;
	return this;
};






////////////////////////////////////////////////////////////////////// MersenneTwister

/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
This JavaScript version of the Mersenne-Twister random number generator is
based on Henk Reints' JavaScript code, which is based on the work of Makoto
Matsumoto and Takuji Nishimura. I have cleaned the code to be more readable,
removed functionality I doubt I will ever use, and modified it to initialize
with a time-based seed (although you can still use any desired seed value).

Henk Reints' original version can be found at...
http://www.henk-reints.nl/cgi-bin/getsrc?http://henk-reints.nl/jscript/js/hr$mersennetwister2.js

Original copyright notice (from M. Matsumoto and T. Nishimura) below...
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1.	Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

2.	Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

3.	The names of its contributors may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function MersenneTwister(seed)
{
	var now,
		N = 624, mask = 0xffffffff, mt = [], mti = NaN, m01 = [0, 0x9908b0df],
		M = 397, N1 = N - 1, NM = N - M, MN = M - N, U = 0x80000000, L = 0x7fffffff, R = 0x100000000;
	if (seed === undefined)
	{
		now = new Date();
		seed = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
	}

	function randomInt32()
	{
		var y, k;
		while (mti >= N || mti < 0)
		{
			mti = Math.max(0, mti - N);
			for (k = 0; k < NM; y = (mt[k] & U) | (mt[k + 1] & L), mt[k] = mt[k + M] ^ (y >>> 1) ^ m01[y & 1], k++);
			for (; k < N1; y = (mt[k] & U) | (mt[k + 1] & L), mt[k] = mt[k + MN] ^ (y >>> 1) ^ m01[y & 1], k++);
			y = (mt[N1] & U) | (mt[0] & L), mt[N1] = mt[M - 1] ^ (y >>> 1) ^ m01[y & 1];
		}
		y = mt[mti++], y ^= (y >>> 11), y ^= (y << 7) & 0x9d2c5680, y ^= (y << 15) & 0xefc60000, y ^= (y >>> 18);
		return (y < 0 ? y + R : y);
	}

	function randomReal32()
	{
		return randomInt32() / 0x100000000;
	}

	function randomReal53()
	{
		return ((randomInt32() >>> 5) * 0x4000000 + (randomInt32() >>> 6)) / 0x20000000000000;
	}

	function dmul0(m, n)
	{
		var H = 0xffff0000, L = 0x0000ffff, R = 0x100000000, m0 = m & L, m1 = (m & H) >>> 16, n0 = n & L, n1 = (n & H) >>> 16, p0, p1, x;
		p0 = m0 * n0, p1 = p0 >>> 16, p0 &= L, p1 += m0 * n1, p1 &= L, p1 += m1 * n0, p1 &= L, x = (p1 << 16) | p0;
		return (x < 0 ? x + R : x);
	}

	function randomize(seed)
	{
		var x = (seed === undefined ? 5489 : seed & mask), i;
		for (mt = [x], mti = N, i = 1; i < N; mt[i] = x = dmul0(x ^ (x >>> 30), 1812433253) + i++);
	}

	this.randomize = randomize;
	this.random = randomReal53;
	this.randomInt = randomInt32;
	this.randomFloat = randomReal32;

	randomize(seed);
}






////////////////////////////////////////////////////////////////////// Number

if (!Number.prototype.clamp) Number.prototype.clamp = function(minimum, maximum)
{
	return Math.max(minimum, Math.min(this, maximum));
};

if (!Number.cToF) Number.cToF = function(temperature)
{
	temperature = Default(temperature, 0);
	return 9 / 5 * temperature + 32;
};
if (!Number.prototype.cToF) Number.prototype.cToF = function()
{
	return Number.cToF(this);
};

if (!Number.decimalToDegrees) Number.decimalToDegrees = function(value)
{
	value = Default(value, 0);
	var d = Math.floor(value), m = Math.floor((value - d) * 60), s = (value - d - m / 60) * 3600;
	while (d > 360)
	{
		d -= 360;
	}
	return { degrees: d, minutes: m, seconds: s };
};
if (!Number.prototype.decimalToDegrees) Number.prototype.decimalToDegrees = function()
{
	return Number.decimalToDegrees(this);
};

if (!Number.degreesToDecimal) Number.degreesToDecimal = function(degrees, minutes, seconds)
{
	degrees = Default(degrees, 0);
	minutes = Default(minutes, 0);
	seconds = Default(seconds, 0);
	return degrees + minutes / 60 + seconds / 3600;
};

if (!Number.degreesToRadians) Number.degreesToRadians = function(degrees)
{
	degrees = Default(degrees, 0);
	return degrees * Math.PI / 180;
};
if (!Number.prototype.degreesToRadians) Number.prototype.degreesToRadians = function()
{
	return Number.degreesToRadians(this);
};

if (!Number.prototype.digitalSum) Number.prototype.digitalSum = function()
{
	var digits = this.toString(), sum = 0, i;
	for (i = 0; i < digits.length; i++)
	{
		sum += parseInt(digits.substr(i, 1), 10);
	}
	return (sum < 10 ? sum : sum.digitalSum());
};

if (!Number.prototype.factorial) Number.prototype.factorial = function()
{
	return (this > 1 ? this * (this - 1).factorial() : 1);
};

if (!Number.prototype.factors) Number.prototype.factors = function(onlyCheckPrime)
{
	onlyCheckPrime = Default(onlyCheckPrime, false);
	var factors = [], factorCount = Math.ceil(this / 2), i;
	for (i = 2; i <= factorCount; i++)
	{
		if (this % i === 0)
		{
			factors.push(i);
			if (onlyCheckPrime)
			{
				break;
			}
		}
	}
	return factors;
};

if (!Number.prototype.fibonacci) Number.prototype.fibonacci = function()
{
	return (this < 1 ? 0 : (this > 2 ? (this - 1).fibonacci() + (this - 2).fibonacci() : 1));
};

if (!Number.prototype.format) Number.prototype.format = function(separator, decimalCharacter)
{
	separator = Default(separator, ",");
	decimalCharacter = Default(decimalCharacter, ".");
	var integer = (this.integer().toString()).reverse().replace(/([0-9]{3})/g, "$1" + separator).reverse().replace(/^\,/, ""),
		fraction = this.fraction(), fractionString = fraction.toString();
	if (integer.indexOf(".") > -1 && integer.indexOf("e") > -1)
	{
		integer = integer.replace(/\,/g, "");
	}
	if (fraction > 0)
	{
		fractionString = decimalCharacter + fractionString.right(fractionString.length - 2); // strip leading zero and decimal
	}
	else
	{
		fractionString = "";
	}
	return integer + fractionString;
};

if (!Number.prototype.fraction) Number.prototype.fraction = function()
{
	return this - this.integer();
};

if (!Number.fToC) Number.fToC = function(temperature)
{
	temperature = Default(temperature, 0);
	return 5 / 9 * (temperature - 32);
};
if (!Number.prototype.fToC) Number.prototype.fToC = function()
{
	return Number.fToC(this);
};

if (!Number.prototype.integer) Number.prototype.integer = function()
{
	return Math.floor(this);
};

if (!Number.prototype.i2p) Number.prototype.i2p = function()
{
	return this.intToUnit("px");
};

if (!Number.prototype.intToUnit) Number.prototype.intToUnit = function(unit)
{
	unit = Default(unit, "");
	return this.toString() + unit;
};

if (!Number.prototype.isEven) Number.prototype.isEven = function()
{
	return (this % 2 === 0);
};

if (!Number.prototype.isInteger) Number.prototype.isInteger = function()
{
	return (Math.floor(this) == this);
};

if (!Number.prototype.isOdd) Number.prototype.isOdd = function()
{
	return !this.isEven();
};

if (!Number.prototype.isPrime) Number.prototype.isPrime = function()
{
	return (this < 2 || !this.isInteger() ? false : this.factors(true).isEmpty());
};

if (!Number.prototype.p2i) Number.prototype.p2i = function()
{
	return this.unitToInt();
};

if (!Number.prototype.pad) Number.prototype.pad = function(padCount)
{
	padCount = Default(padCount, 2);
	return (this.toString()).pad(padCount, "0");
};

if (!Number.prototype.padBack) Number.prototype.padBack = function(padCount)
{
	padCount = Default(padCount, 2);
	return (this.toString()).pad(padCount, "0", false);
};

if (!Number.radiansToDegrees) Number.radiansToDegrees = function(radians)
{
	radians = Default(radians, 0);
	return radians * 180 / Math.PI;
};
if (!Number.prototype.radiansToDegrees) Number.prototype.radiansToDegrees = function()
{
	return Number.radiansToDegrees(this);
};

if (!Number.random) Number.random = function(min, max)
{
	min = Default(min, 1);
	max = Default(max, 100);
	return Math.floor((max - min + 1) * Math.random() + min);
};
if (!Number.prototype.random) Number.prototype.random = function(other)
{
	other = Default(other, 0);
	return Number.random(Math.min(this, other), Math.max(this, other));
};

if (!Number.prototype.sign) Number.prototype.sign = function()
{
	return (this == 0 ? 0 : (this < 0 ? -1 : 1));
};

if (!Number.prototype.toBase) Number.prototype.toBase = function(baseTo, baseFrom)
{
	baseTo = Default(baseTo, 10);
	baseFrom = Default(baseFrom, 10);
	if (baseTo == baseFrom)
	{
		return this.toString();
	}
	else
	{
		var value = (this.toString()).replace(/[^0-9a-z]*/gi, "").toLowerCase(), digits = "0123456789abcdefghijklmnopqrstuvwxyz",
			temp = "", from = parseInt(value, baseFrom);
		while (from >= baseTo)
		{
			temp += digits.charAt(from % baseTo);
			from = Math.floor(from / baseTo);
		}
		temp += digits.charAt(from);
		return temp.reverse();
	}
};

if (!Number.prototype.toBinary) Number.prototype.toBinary = function(baseFrom)
{
	return this.toBase(2, baseFrom);
};

if (!Number.prototype.toDegreeString) Number.prototype.toDegreeString = function()
{
	var dms = this.decimalToDegrees(), d = dms.degrees, m = dms.minutes, s = dms.seconds;
	return d + "°" + m.pad() + "'" + s.integer().pad() + "." + Math.round(s.fraction() * 100) + "\"";
};

if (!Number.prototype.toHex) Number.prototype.toHex = function(baseFrom)
{
	return this.toBase(16, baseFrom);
};

if (!Number.prototype.triangle) Number.prototype.triangle = function()
{
	return this * (this + 1) / 2;
};

if (!Number.prototype.unitToInt) Number.prototype.unitToInt = function()
{
	return parseInt(this, 10);
};






////////////////////////////////////////////////////////////////////// Object

if (!Object.prototype.isArray) Object.prototype.isArray = function()
{
	return (this.type() == "Array");
};

if (!Object.prototype.isBoolean) Object.prototype.isBoolean = function()
{
	return (this.type() == "Boolean");
};

if (!Object.prototype.isDate) Object.prototype.isDate = function()
{
	return (this.type() == "Date");
};

if (!Object.prototype.isError) Object.prototype.isError = function()
{
	return (this.type() == "Error");
};

if (!Object.prototype.isFunction) Object.prototype.isFunction = function()
{
	return (this.type() == "Function");
};

if (!Object.prototype.isNumber) Object.prototype.isNumber = function()
{
	return (this.type() == "Number");
};

if (!Object.prototype.isObject) Object.prototype.isObject = function()
{
	return (this.type() == "Object");
};

if (!Object.prototype.isRegExp) Object.prototype.isRegExp = function()
{
	return (this.type() == "RegExp");
};

if (!Object.prototype.isString) Object.prototype.isString = function()
{
	return (this.type() == "String");
};

if (!Object.prototype.rgbToHex) Object.prototype.rgbToHex = function()
{
	return ([this.red, this.green, this.blue]).rgbToHex();
};

if (!Object.prototype.type) Object.prototype.type = function()
{
	var c = this.constructor.toString(), t = this.types(), i;
	for (i = 0; i < t.length; i++)
	{
		if (c.indexOf(t[i]) > -1)
		{
			return t[i];
		}
	}
	return "(Undefined)";
};

if (!Object.prototype.toString) Object.prototype.toString = function()
{
	return this + "";
};

if (!Object.types) Object.types = function()
{
	return ["Array", "Boolean", "Date", "Error", "Function", "Number", "Object", "RegExp", "String"];
};
if (!Object.prototype.types) Object.prototype.types = function()
{
	return Object.types();
};






////////////////////////////////////////////////////////////////////// String

if (!String.CR) String.CR = "\r";
if (!String.LF) String.LF = "\n";
if (!String.CRLF) String.CRLF = String.CR + String.LF;
if (!String.TAB) String.TAB = "\t";

if (!String.prototype.asciiDecode) String.prototype.asciiDecode = function()
{
	var chunks = this.split("&"), retVal = "" + chunks[0], chunk, code, i;
	for (i = 1; i < chunks.length; i++)
	{
		chunk = chunks[i];
		if (chunk.indexOf(";") > -1)
		{
			chunk = chunk.split(";");
			if (chunk[0].indexOf("#") > -1)
			{
				code = chunk[0].split("#")[1];
				if (!isNaN(code))
				{
					retVal += String.fromCharCode(code);
				}
				else
				{
					retVal += "&#" + code + ";";
				}
				retVal += chunk[1];
			}
			else
			{
				retVal += "&" + chunk[0] + ";" + chunk[1];
			}
		}
		else
		{
			retVal += "&" + chunk;
		}
	}
	return retVal;
};

if (!String.prototype.asciiEncode) String.prototype.asciiEncode = function()
{
	var retVal = "", i;
	for (i = 0; i < this.length; i++)
	{
		retVal += "&#" + this.charCodeAt(i) + ";";
	}
	return retVal;
}

if (!String.prototype.camelToGlobal) String.prototype.camelToGlobal = function()
{
	return this.capitalToDelimiter("_").toUpperCase();
};

if (!String.prototype.camelToPascal) String.prototype.camelToPascal = function()
{
	return this.substr(0, 1).toUpperCase() + this.substr(1);
};

if (!String.prototype.capitalToDelimiter) String.prototype.capitalToDelimiter = function(delimiter)
{
	delimiter = Default(delimiter, "-");
	return this.replace(/([A-Z])/g, delimiter + "$1").toLowerCase();
};

if (!String.prototype.clean) String.prototype.clean = function(replacement)
{
	replacement = Default(replacement, " ").toString();
	return this.replace(/\s\s*/g, replacement);
};

if (!String.prototype.degreesToDecimal) String.prototype.degreesToDecimal = function()
{
	var dDelim = (this.has("°") ? "°" : "*"), mDelim = "'", sDelim = "\"", parts, d, m = 0, s = 0;
	parts = this.split(dDelim);
	d = parseFloat("0" + parts[0].extractMath());
	if (parts.length > 1)
	{
		parts = parts[1].split(mDelim);
		m = parseFloat("0" + parts[0].extractMath());
		if (parts.length > 1)
		{
			parts = parts[1].split(sDelim);
			s = parseFloat("0" + parts[0].extractMath());
		}
	}
	return Number.degreesToDecimal(d, m, s);
};

if (!String.prototype.delimiterToCapital) String.prototype.delimiterToCapital = function(delimiter)
{
	delimiter = Default(delimiter, "-");
	var text = this, regExp = new RegExp("\\" + delimiter + "[a-z]");
	while (regExp.test(text))
	{
		text = text.replace(regExp, text.substr(text.search(regExp) + 1, 1).toUpperCase());
	}
	return text;
};

if (!String.dummyText) String.dummyText = function(minCount, maxCount)
{
	minCount = Default(minCount, 10);
	maxCount = Default(maxCount, 100);
	var count = Number.random(minCount, maxCount), text = "", i;
	for (i = 0; i < count; i++)
	{
		text += String.random() + " ";
	}
	return text.trim();
};
if (!String.prototype.dummyText) String.prototype.dummyText = function(minCount, maxCount)
{
	return String.dummyText(minCount, maxCount);
};

if (!String.prototype.endsWith) String.prototype.endsWith = function(value, ignoreCase)
{
	ignoreCase = Default(ignoreCase, true);
	var str = this.right(value.length);
	if (ignoreCase)
	{
		value = value.toLowerCase();
		str = str.toLowerCase();
	}
	return (str === value);
};

if (!String.prototype.extract) String.prototype.extract = function(regExp)
{
	if (regExp === undefined)
	{
		return this;
	}
	else
	{
		var value = "", character, i;
		for (i = 0; i < this.length; i++)
		{
			character = this.charAt(i);
			if (regExp.test(character))
			{
				value += character;
			}
		}
		return value;
	}
};

if (!String.prototype.extractAlpha) String.prototype.extractAlpha = function()
{
	return this.extract(/[a-z\s]/i);
};

if (!String.prototype.extractAlphaNumeric) String.prototype.extractAlphaNumeric = function()
{
	return this.extract(/[a-z0-9\s]/i);
};

if (!String.prototype.extractMath) String.prototype.extractMath = function()
{
	return this.extract(/[e\d\+\-\.]/i);
};

if (!String.prototype.extractNumeric) String.prototype.extractNumeric = function()
{
	return this.extract(/\d/);
};

if (!String.prototype.format) String.prototype.format = function()
{
	var result = this, holders = this.match(/(\{\d*\})/g), i;
	for (i = 0; i < holders.length; i++)
	{
		result = result.replace(holders[i], arguments[holders[i].replace(/\{(\d*)\}/, "$1")]);
	}
	return result;
};

if (!String.prototype.globalToCamel) String.prototype.globalToCamel = function()
{
	return this.toLowerCase().delimiterToCapital("_");
};

if (!String.prototype.globalToPascal) String.prototype.globalToPascal = function()
{
	return this.globalToCamel().camelToPascal();
};

if (!String.prototype.has) String.prototype.has = function(text)
{
	return (this.indexOf(text) > -1);
};

if (!String.prototype.hexToRgb) String.prototype.hexToRgb = function()
{
	var hex = this.replace(/\#*/, "").toString();
	return { red: hex.substr(0, 2).toBase(10, 16), green: hex.substr(2, 2).toBase(10, 16), blue: hex.substr(4).toBase(10, 16) };
};

if (!String.prototype.indexCount) String.prototype.indexCount = function(what)
{
	var count = 0, index = -1;
	do
	{
		index = this.indexOf(what, index + 1);
		count += (index > -1 ? 1 : 0);
	}
	while (index > -1);
	return count;
};

if (!String.prototype.isAlpha) String.prototype.isAlpha = function()
{
	return (/^[a-z]+$/i).test(this);
};

if (!String.prototype.isAlphaNumeric) String.prototype.isAlphaNumeric = function()
{
	return (/^[a-z0-9\.\-\+]+$/i).test(this);
};

if (!String.prototype.isCreditCard) String.prototype.isCreditCard = function()
{
	var sum = 0, digit, flipper = false, i;
	for (i = this.length - 1; i >= 0; i--)
	{
		digit = parseInt(this.substr(i, 1), 10);
		if (flipper)
		{
			digit *= 2;
			if (digit > 9)
			{
				digit -= 9;
			}
		}
		sum += digit;
		flipper = !flipper;
	}
	return (sum % 10 === 0);
};

if (!String.prototype.isCurrency) String.prototype.isCurrency = function()
{
	return (/^\$?[0-9\.]+$/).test(this);
};

if (!String.prototype.isDateString) String.prototype.isDateString = function()
{
	var isValid = false, date, year, month, day, days;
	if ((/^[01]?[0-9][\/\\\-\.\s][0-3]?[0-9][\/\\\-\.\s][0-2][0-9]{3}$/).test(this))
	{
		date = this.split(/[\/\\\-\.\s]/);
		year = parseInt(date[2], 10);
		month = parseInt(date[0], 10) - 1;
		day = parseInt(date[1], 10);
		days = (new Date()).monthDays(year);
		try
		{
			isValid = ((month >= 0 && month <= 11) && (day >= 1 && day <= days[month]));
		} catch (e) { }
	}
	return isValid;
};

if (!String.prototype.isDigit) String.prototype.isDigit = function()
{
	return (/^[0-9]+$/).test(this);
};

if (!String.prototype.isEmail) String.prototype.isEmail = function()
{
	return (/^[a-z0-9][a-z0-9\_\-\.]*\@[a-z0-9][a-z0-9\-\.]*\.[a-z]{2,4}$/i).test(this);
};

if (!String.prototype.isEmpty) String.prototype.isEmpty = function()
{
	return (this.length === 0);
};

if (!String.prototype.isLowerCase) String.prototype.isLowerCase = function()
{
	return (/^[a-z]+$/).test(this);
};

if (!String.prototype.isName) String.prototype.isName = function()
{
	return (/^[a-z0-9\.\-\'\s]+$/i).test(this);
};

if (!String.prototype.isNumeric) String.prototype.isNumeric = function()
{
	return (/^[0-9\.\-\+]+$/).test(this);
};

if (!String.prototype.isPhoneNumber) String.prototype.isPhoneNumber = function()
{
	return (/^(?!555)([2-9](?!11)([0-9]{2}))(?!555)([2-9](?!11)([0-9]{2}))[0-9]{4}$/).test(this.phoneNumberParts().number.right(10));
};

if (!String.prototype.isProperName) String.prototype.isProperName = function()
{
	return (/^[a-z\.\-\'\s]+$/i).test(this);
};

if (!String.prototype.isSocialSecurity) String.prototype.isSocialSecurity = function()
{
	var digits = this.extractNumeric(), area, group, serial, a;
	if (digits.length == 9)
	{
		if (digits != "078051120") // woolworth
		{
			area = digits.left(3);
			group = digits.mid(3, 2);
			serial = digits.right(4);
			if (area != "000" && group != "00" && serial != "0000")
			{
				a = parseInt(area, 10);
				return (a <= 772 && (a < 734 || a > 749) && a != 666); // http://en.wikipedia.org/wiki/Social_security_number
			}
		}
	}
	return false;
};

if (!String.prototype.isStrongPassword) String.prototype.isStrongPassword = function(minLength, useSuperStrong)
{
	useSuperStrong = Default(useSuperStrong, false);
	var minDigits = (useSuperStrong ? 8 : 6), isValid = false, uppercaseCount = 0, lowercaseCount = 0,
		digitCount = 0, symbolCount = 0, character, i;
	minLength = Default(minLength, minDigits);
	minLength = (minLength < minDigits ? minDigits : minLength);
	if (this.length >= minLength)
	{
		uppercaseCount = 0;
		lowercaseCount = 0;
		digitCount = 0;
		symbolCount = 0;
		for (i = 0; i < this.length; i++)
		{
			character = this.charAt(i);
			uppercaseCount = (uppercaseCount == 0 ? (character.isUpperCase() ? 1 : 0) : uppercaseCount);
			lowercaseCount = (lowercaseCount == 0 ? (character.isLowerCase() ? 1 : 0) : lowercaseCount);
			digitCount = (digitCount == 0 ? (character.isDigit() ? 1 : 0) : digitCount);
			symbolCount = (symbolCount == 0 ? (character.isSymbol() ? 1 : 0) : symbolCount);
			isValid = (uppercaseCount + lowercaseCount + digitCount + symbolCount >= (useSuperStrong ? 4 : 3));
			if (isValid)
			{
				break;
			}
		}
	}
	return isValid;
};

if (!String.prototype.isSymbol) String.prototype.isSymbol = function()
{
	return (/^[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\.\<\>\/\?]+$/).test(this);
};

if (!String.prototype.isUpperCase) String.prototype.isUpperCase = function()
{
	return (/^[A-Z]+$/).test(this);
};

if (!String.prototype.isVariableName) String.prototype.isVariableName = function()
{
	var isvn = ((/^[a-z\$\_]/i).test(this) && (/[a-z0-9\$\_]+$/i).test(this)), reserved, i;
	if (isvn)
	{
		reserved = ["abstract", "as", "boolean", "break", "byte", "case", "catch", "char", "class", "continue", "const", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "is", "long", "namespace", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "use", "var", "void", "volatile", "while", "with"];
		for (i = 0; i < reserved.length; i++)
		{
			isvn &= (this != reserved[i]);
			if (!isvn)
			{
				break;
			}
		}
	}
	return (isvn ? true : false);
};

if (!String.prototype.left) String.prototype.left = function(count)
{
	count = Default(count, 1);
	return this.substr(0, count);
};

if (!String.prototype.literalizeHtml) String.prototype.literalizeHtml = function()
{
	return this.replace((/\&/g), "&amp;").replace((/\</g), "&lt;").replace((/\>/g), "&gt;");
};

if (!String.prototype.mid) String.prototype.mid = function(position, count)
{
	position = Default(position, 0);
	count = Default(count, 1);
	return this.substr(position, count);
};

if (!String.prototype.p2i) String.prototype.p2i = function()
{
	return this.unitToInt();
};

if (!String.prototype.pad) String.prototype.pad = function(padCount, padCharacter, toFront)
{
	padCount = Default(padCount, 2);
	padCharacter = Default(padCharacter, " ");
	toFront = Default(toFront, true);
	var text = this;
	while (text.length < padCount)
	{
		if (toFront)
		{
			text = padCharacter + text;
		}
		else
		{
			text += padCharacter;
		}
	}
	return text;
};

if (!String.prototype.padBack) String.prototype.padBack = function(padCount, padCharacter)
{
	return this.pad(padCount, padCharacter, false);
};

if (!String.prototype.pascalToCamel) String.prototype.pascalToCamel = function()
{
	return this.substr(0, 1).toLowerCase() + this.substr(1);
};

if (!String.prototype.pascalToGlobal) String.prototype.pascalToGlobal = function()
{
	return this.pascalToCamel().camelToGlobal();
};

if (!String.prototype.phoneNumberParts) String.prototype.phoneNumberParts = function(extensionDelimiter)
{
	extensionDelimiter = Default(extensionDelimiter, "x");
	var parts = this.split(new RegExp(extensionDelimiter)), num = (parts[0].toString()).extractNumeric(), ext = "";
	if (parts.length > 1)
	{
		ext = (parts[1].toString()).extractNumeric();
	}
	return { number: num.toString(), extension: ext.toString() };
};

if (!String.random) String.random = function(minLength, maxLength)
{
	minLength = Default(minLength, 1);
	maxLength = Default(maxLength, 8);
	var letters = "abcdefghijklmnopqrstuvwxyz", text = "", count = Number.random(minLength, maxLength), i;
	for (i = 0; i < count; i++)
	{
		text += letters.charAt(Math.floor(Math.random() * letters.length));
	}
	return text;
};
if (!String.prototype.random) String.prototype.random = function(minLength, maxLength)
{
	return String.random(minLength, maxLength);
};

if (!String.repeat) String.repeat = function(character, count)
{
	character = Default(character, " ");
	count = Default(count, 1);
	var string = "", i;
	for (i = 0; i < count; i++)
	{
		string += character;
	}
	return string;
};
if (!String.prototype.repeat) String.prototype.repeat = function(count)
{
	return String.repeat(this, count);
};

if (!String.prototype.reverse) String.prototype.reverse = function()
{
	var text = "", i;
	for (i = this.length - 1; i >= 0; i--)
	{
		text += this.charAt(i);
	}
	return text;
};

if (!String.prototype.right) String.prototype.right = function(count)
{
	count = Default(count, 1);
	return this.substr(this.length - count);
};

if (!String.prototype.shuffle) String.prototype.shuffle = function()
{
	return this.split("").shuffle().join("");
};

if (!String.prototype.startsWith) String.prototype.startsWith = function(value, ignoreCase)
{
	ignoreCase = Default(ignoreCase, true);
	var str = this.left(value.length);
	if (ignoreCase)
	{
		value = value.toLowerCase();
		str = str.toLowerCase();
	}
	return str === value;
};

if (!String.prototype.strip) String.prototype.strip = function(string)
{
	string = Default(string, "").toString();
	var text = this, charLoc;
	if (string.length > 0)
	{
		do
		{
			charLoc = text.indexOf(string);
			if (charLoc > -1)
			{
				text = text.substr(0, charLoc) + text.substr(charLoc + string.length, text.length - string.length - charLoc);
			}
		}
		while (charLoc > -1);
	}
	return text;
};

if (!String.prototype.stripHtml) String.prototype.stripHtml = function()
{
	var text = this, lt, gt;
	do
	{
		lt = text.indexOf("<");
		if (lt > -1)
		{
			gt = text.indexOf(">");
			gt = (gt == -1 ? 0 : gt);
			text = text.substr(0, lt) + text.substr(gt + 1, text.length - gt);
		}
	}
	while (lt > -1);
	return text;
};

if (!String.prototype.stripPunctuation) String.prototype.stripPunctuation = function()
{
	return this.replace(/[^(\w|\s)]/gi, "");
};

if (!String.prototype.toBase) String.prototype.toBase = function(baseTo, baseFrom)
{
	baseFrom = Default(baseFrom, 10);
	return parseInt(this, baseFrom).toBase(baseTo);
};

if (!String.prototype.toRandomCase) String.prototype.toRandomCase = function()
{
	var text = this, character, i;
	for (i = 0; i < text.length; i++)
	{
		character = text.charAt(i);
		text = text.substr(0, i) + (Math.random() < 0.5 ? character.toLowerCase() : character.toUpperCase()) + text.substr(i + 1, text.length);
	}
	return text;
};

if (!String.prototype.toTitleCase) String.prototype.toTitleCase = function()
{
	var text = this.split(/\s/), i;
	for (i = 0; i < text.length; i++)
	{
		text[i] = text[i].substr(0, 1).toUpperCase() + text[i].substr(1).toLowerCase();
	}
	return text.join(" ");
};

if (!String.prototype.trim) String.prototype.trim = function()
{
	return this.trimLeft().trimRight();
};

if (!String.prototype.trimLeft) String.prototype.trimLeft = function()
{
	return this.replace((/^\s+/g), "");
};

if (!String.prototype.trimRight) String.prototype.trimRight = function()
{
	return this.replace((/\s+$/g), "");
};

if (!String.prototype.unitToInt) String.prototype.unitToInt = function()
{
	return parseInt(this, 10);
};
