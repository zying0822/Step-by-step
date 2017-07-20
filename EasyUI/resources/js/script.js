
$(function(){
	InitLeftMenu();
	tabClose();
	tabCloseEven();
})

//初始化左侧菜单栏
function InitLeftMenu() {
	$("#nav").accordion({animate:false});

    $.each(_menus.menus, function(i, n) {
		var menulist ='';
		menulist +='<ul>';
        $.each(n.menus, function(j, o) {
			menulist += '<li><div><a ref="'+o.menuid+'" href="#" rel="' + o.url + '" ><span class="icon '+o.icon+'" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div></li> ';
        })
		menulist += '</ul>';

		$('#nav').accordion('add', {
            title: n.menuname,
            content: menulist,
            iconCls: 'icon ' + n.icon
        });

    });

	$('.easyui-accordion li a').click(function(){
		var tabTitle = $(this).children('.nav').text();

		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var icon = getIcon(menuid,icon);

		addTab(tabTitle,url,icon);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});

	//选中第一个
	var panels = $('#nav').accordion('panels');
	var t = panels[0].panel('options').title;
    $('#nav').accordion('select', t);
}
//获取左侧导航的图标
function getIcon(menuid){
	var icon = 'icon ';
	$.each(_menus.menus, function(i, n) {
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid==menuid){
				icon += o.icon;
			}
		 })
	})

	return icon;
}

function addTab(subtitle,url,icon){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			icon:icon
		});
	}else{
		$('#tabs').tabs('select',subtitle);
		$('#mm-tabupdate').click();
	}
	tabClose();
}

function createFrame(url)
{
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}
//绑定右键菜单事件
function tabCloseEven()
{
	//刷新
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update',{
			tab:currTab,
			options:{
				content:createFrame(url)
			}
		})
	})
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			$('#tabs').tabs('close',t);
		});
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			//msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

var _menus = {
	"menus": [{
		"menuid": "01",
		"icon": "icon-book",
		"menuname": "面板 Panel",
		"menus": [{
			"menuid": "011",
			"icon": "icon-blog",
			"menuname": "基础面板",			
			"url": "pages/Panel/1.html"
		}, {
			"menuid": "012",
			"icon": "icon-blog",
			"menuname": "面板嵌套",			
			"url": "pages/Panel/2.html"
		}, {
			"menuid": "013",
			"icon": "icon-blog",
			"menuname": "面板工具",
			
			"url": "pages/Panel/3.html"
		}]
	}, {
		"menuid": "02",	
		"icon": "icon-book",			
		"menuname": "手风琴 Accordion",
		"menus": [{
			"menuid": "021",
			"icon": "icon-blog",
			"menuname": "基础手风琴",		
			"url": "pages/Accordion/1.html"
		}, {
			"menuid": "022",
			"icon": "icon-blog",
			"menuname": "手风琴控制",			
			"url": "pages/Accordion/2.html"
		}]
	}, {
		"menuid": "03",	
		"icon": "icon-book",	
		"menuname": "选项卡 Tabs",
		"menus": [{
			"menuid": "031",
			"icon": "icon-blog",
			"menuname": "基础选项卡",			
			"url": "pages/Tabs/1.html"
		}, {
			"menuid": "032",
			"icon": "icon-blog",
			"menuname": "选项卡操作",			
			"url": "pages/Tabs/2.html"
		}, {
			"menuid": "033",
			"icon": "icon-blog",
			"menuname": "选项卡位置",			
			"url": "pages/Tabs/3.html"
		}]
	}, {
		"menuid": "04",	
		"icon": "icon-book",	
		"menuname": "布局 Layuot",
		"menus": [{
			"menuid": "041",
			"icon": "icon-blog",
			"menuname": "基础布局",			
			"url": "demo.html"
		}, {
			"menuid": "042",
			"icon": "icon-blog",
			"menuname": "全屏布局",			
			"url": "demo1.html"
		}]
	}, {
		"menuid": "05",
		"icon": "icon-book",
		"menuname": "数据表格 Datagrid",
		"menus": [{
			"menuid": "051",
			"icon": "icon-blog",
			"menuname": "基础数据表格",			
			"url": "pages/Datagrid/1.html"
		}, {
			"menuid": "052",
			"icon": "icon-blog",
			"menuname": "数据表格行选择",			
			"url": "pages/Datagrid/2.html"
		}, {
			"menuid": "053",
			"icon": "icon-blog",
			"menuname": "数据表格复选框选择",			
			"url": "pages/Datagrid/3.html"
		}, {
			"menuid": "054",
			"icon": "icon-blog",
			"menuname": "数据表格分页",			
			"url": "pages/Datagrid/4.html"
		},{
			"menuid": "055",
			"icon": "icon-blog",
			"menuname": "数据表格工具栏",			
			"url": "pages/Datagrid/5.html"
		}, {
			"menuid": "056",
			"icon": "icon-blog",
			"menuname": "数据表格行编辑",			
			"url": "pages/Datagrid/6.html"
		}]
	}, {
		"menuid": "06",
		"icon": "icon-book",
		"menuname": "树 Tree",
		"menus": [{
			"menuid": "061",
			"icon": "icon-blog",
			"menuname": "基础树",			
			"url": "pages/Tree/1.html"
		}, {
			"menuid": "062",
			"icon": "icon-blog",
			"menuname": "树线",			
			"url": "pages/Tree/2.html"
		}, {
			"menuid": "063",
			"icon": "icon-blog",
			"menuname": "获取选中节点",			
			"url": "pages/Tree/3.html"
		}, {
			"menuid": "064",
			"icon": "icon-blog",
			"menuname": "复选框树",			
			"url": "pages/Tree/4.html"
		},{
			"menuid": "065",
			"icon": "icon-blog",
			"menuname": "树的右键菜单",			
			"url": "pages/Tree/5.html"
		}]
	}, {
		"menuid": "07",		
		"icon": "icon-book",
		"menuname": "按钮 ",
		"menus": [{
			"menuid": "071",
			"icon": "icon-blog",
			"menuname": "连接按钮 LinkButton",			
			"url": "pages/Button/1.html"
		}, {
			"menuid": "072",
			"icon": "icon-blog",
			"menuname": "菜单按钮 MenuButton",			
			"url": "pages/Button/2.html"
		}]
	}, {
		"menuid": "08",	
		"icon": "icon-book",	
		"menuname": "菜单 Menu",
		"menus": [{
			"menuid": "081",
			"icon": "icon-blog",
			"menuname": "基础菜单",			
			"url": "pages/Menu/1.html"
		}]
	}, {
		"menuid": "09",	
		"icon": "icon-book",	
		"menuname": "表单 ",
		"menus": [{
			"menuid": "091",
			"icon": "icon-blog",
			"menuname": "文本框 TextBox",			
			"url": "pages/Form/1.html"
		}, {
			"menuid": "092",
			"icon": "icon-blog",
			"menuname": "文件框 FileBox",			
			"url": "pages/Form/2.html"
		}, {
			"menuid": "093",
			"icon": "icon-blog",
			"menuname": "下拉框 ComboBox",			
			"url": "pages/Form/3.html"
		}, {
			"menuid": "094",
			"icon": "icon-blog",
			"menuname": "数字框 NumberBox",			
			"url": "pages/Form/4.html"
		}, {
			"menuid": "095",
			"icon": "icon-blog",
			"menuname": "数字调整期 NumberSpinner",			
			"url": "pages/Form/5.html"
		}, {
			"menuid": "096",
			"icon": "icon-blog",
			"menuname": "日历 Calendar",			
			"url": "pages/Form/6.html"
		}, {
			"menuid": "097",
			"icon": "icon-blog",
			"menuname": "日期框 DateBox",			
			"url": "pages/Form/7.html"
		}, {
			"menuid": "098",
			"icon": "icon-blog",
			"menuname": "日期时间框 DateTimeBox",			
			"url": "pages/Form/8.html"
		}, {
			"menuid": "099",
			"icon": "icon-blog",
			"menuname": "时间微调 TimeSpinner",			
			"url": "pages/Form/9.html"
		}, {
			"menuid": "0910",
			"icon": "icon-blog",
			"menuname": "表单 Form",			
			"url": "pages/Form/10.html"
		}, {
			"menuid": "0912",
			"icon": "icon-blog",
			"menuname": "验证箱 ValidateBox",			
			"url": "pages/Form/11.html"
		}]
	}, {
		"menuid": "10",	
		"icon": "icon-book",	
		"menuname": "窗口 Window ",
		"menus": [{
			"menuid": "101",
			"icon": "icon-blog",
			"menuname": "对话框 Dialog",			
			"url": "pages/Window/1.html"
		}, {
			"menuid": "102",
			"icon": "icon-blog",
			"menuname": "消息 Messager",			
			"url": "pages/Window/2.html"
		}, {
			"menuid": "103",
			"icon": "icon-blog",
			"menuname": "窗口",			
			"url": "pages/Window/3.html"
		}]
	},{
		"menuid": "11",	
		"icon": "icon-book",	
		"menuname": "其他",
		"menus": [{
			"menuid": "111",
			"icon": "icon-blog",
			"menuname": "进度条 ProgressBar",			
			"url": "pages/Other/1.html"
		}, {
			"menuid": "112",
			"icon": "icon-blog",
			"menuname": "工具提示 Tooltip",			
			"url": "pages/Other/2.html"
		}, {
			"menuid": "113",
			"icon": "icon-blog",
			"menuname": "滑块 Slider",			
			"url": "pages/Other/3.html"
		}, {
			"menuid": "114",
			"icon": "icon-blog",
			"menuname": "拖拽 Draggable",			
			"url": "pages/Other/4.html"
		}, {
			"menuid": "115",
			"icon": "icon-blog",
			"menuname": "放置 Droppable",			
			"url": "pages/Other/5.html"
		}]
	}]
};