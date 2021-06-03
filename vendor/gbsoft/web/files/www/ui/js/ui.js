// JavaScript Document
function checkbox_click(name)
{
	var obj1 = document.forms[0].elements[name][0];
	var obj2 = document.forms[0].elements[name][1];
	if(document.forms[0].elements[name][0].type == "button")
	{
		obj2 = document.forms[0].elements[name][0];
		obj1 = document.forms[0].elements[name][1];
	}
	else if(document.forms[0].elements[name][1].type == "button")
	{
		obj1 = document.forms[0].elements[name][0];
		obj2 = document.forms[0].elements[name][1];
	}
	else
	{
		alert("Invalid CheckBox, Please check html code.");
		return;
	}
	if(obj1.checked)
		obj1.checked = false;
	else
		obj1.checked = true;

	if(obj1.checked)
	{
		obj2.className = "checkbox_on";
		obj2.value = "ON";
	}
	else
	{
		obj2.className = "checkbox_off";
		obj2.value = "OFF";
	}
}

function table_style1(tbname)
{
	var i = 0, k = 0;
	$("table").each(function(i, e){
		if($(this).attr("id")==tbname)
		{
			for(i=0;i<this.rows.length;i++){
				if((i+k)%2 == 0)
				{
					this.rows[i].className="mtable_tr_style1";
				}
				else
				{
					this.rows[i].className="mtable_tr_style2";
				}
			}
			//k = (i+k)%2;
		}
	});
}

function table_style1_x(tbname)
{
	var len = 0;
	try
	{
		len = document.all[tbname].length;
	}catch(e)
	{
		len = undefined;
	}
	
	if(len == undefined)
	{
		if(typeof(document.all[tbname]) == 'object')
			len = 1;
		else
			return;
	}
	var i = 0, j = 0;
	for(j = 0; j<len; j++)
	{
		var tbody;
		if(len == 1)
			tbody = document.all[tbname];
		else
			tbody = document.all[tbname][j];
		for(i=0;i<tbody.rows.length;i++){
			if(i%2 == 0){
				tbody.rows[i].className="mtable_tr_style1";
			}
			else
			{
				tbody.rows[i].className="mtable_tr_style2";
			}
		}
	}
}

function form_reload()
{
	window.location.reload();
}

function submit_btn()
{
	var htm = '';
	htm += '<input type="button" class="btn" id="save"  value="保存" onclick="form_apply(this.form)" /> &nbsp;';
	htm += '<input type="button" class="btn" id="cancle"  value="取消" onclick="form_reload(this.form)" />';
	return htm;
}