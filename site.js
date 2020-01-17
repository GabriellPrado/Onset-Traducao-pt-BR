/* Copyright (C) 2019 Blue Mountains GmbH. All Rights Reserved. */

let sortTables = [];

function ShowMainMenu() {
	$('#siteSettings').hide();
	$('#siteMain').show();
	$('#siteIngameMain').hide();
	
	ShowServers();
	
	$('body').addClass("body-bg");
	$('body').removeClass("body-bg-ig");
	
	$('#serverNameIP').hide();
	
	activePage = 1;
	bIsInGame = false;
}

function ShowServers() {
	$('#siteServers').show();
	$('#siteSettings').hide();
	
	$('.mainMenuSettings').removeClass("barActive");
	$('.mainMenuServers').addClass("barActive");
}

function ShowSettings() {
	$('#siteServers').hide();
	$('#siteSettings').show();
	
	$('.mainMenuServers').removeClass("barActive");
	$('.mainMenuSettings').addClass("barActive");
}

function ShowIngameMenu() {
	$('#siteServers').show();
	$('#siteSettings').hide();
	$('#siteMain').hide();
	$('#siteIngameMain').show();
	
	$('body').removeClass("body-bg");
	$('body').addClass("body-bg-ig");
	
	$('#serverNameIP').show();
	
	ShowServers();
	
	activePage = 2;
	bIsInGame = true;
}

function ShowTabInternet() {
	$('#serverTopMenu div').removeClass("barActive");
	$('#barInternet').addClass("barActive");

	$('#tabInternet').show();
	$('#tabFavorites').hide();
	$('#tabHistory').hide();
	$('#tabDirect').hide();
}

function ShowTabFavorites() {
	$('#serverTopMenu div').removeClass("barActive");
	$('#barFavorites').addClass("barActive");

	$('#tabInternet').hide();
	$('#tabFavorites').show();
	$('#tabHistory').hide();
	$('#tabDirect').hide();
}

function ShowTabHistory() {
	$('#serverTopMenu div').removeClass("barActive");
	$('#barHistory').addClass("barActive");
	
	$('#tabInternet').hide();
	$('#tabFavorites').hide();
	$('#tabHistory').show();
	$('#tabDirect').hide();
}

function ShowTabDirect() {
	$('#serverTopMenu div').removeClass("barActive");
	$('#barDirect').addClass("barActive");
	
	$('#tabInternet').hide();
	$('#tabFavorites').hide();
	$('#tabHistory').hide();
	$('#tabDirect').show();
}

function ShowTabGame() {
	$('#settingsTopMenu div').removeClass("barActive");
	$('#barGame').addClass("barActive");
	
	$('#tabGame').show();
	$('#tabVideo').hide();
	$('#tabControls').hide();
}

function ShowTabVideo() {
	$('#settingsTopMenu div').removeClass("barActive");
	$('#barVideo').addClass("barActive");
	
	$('#tabGame').hide();
	$('#tabVideo').show();
	$('#tabControls').hide();
}

function ShowTabControls() {
	$('#settingsTopMenu div').removeClass("barActive");
	$('#barControls').addClass("barActive");
	
	$('#tabGame').hide();
	$('#tabVideo').hide();
	$('#tabControls').show();
}

function Base64Encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function Base64Decode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

let browserFilter = {
	hostname: '',
	hideEmpty: false,
	hideFull: false,
	hidePassword: false
};

let activePage = 1;
let serverCount = 0;
let enablePageReload = false;
let addFakeServers = false;
let bIsInGame = false;
let steamId64 = 0;
let licenseContact = '';
let InternetBrowserRefreshClick = 0;
let lastSelectedControlSetting;

function ApplyServerBrowserFilter() {
	let browserItems = $('#tabInternet .serverBrowser tbody tr');
	
	browserItems.each(function() {
		let hide = false;
		
		let dummy = 1;
		while (dummy--) {
			if (browserFilter.hostname != '') {
				let hostname = $(this).find('.serverItemHostname').text();
				
				if (hostname.toLowerCase().indexOf(browserFilter.hostname) == -1) {
					hide = true;
				}
			}
			
			if (browserFilter.hidePassword == true && $(this).data('haspassword') != 0) {
				hide = true;
			}
			
			if (browserFilter.hideEmpty == true && parseInt($(this).data('players')) == 0) {
				hide = true;
			}
			
			if (browserFilter.hideFull == true && parseInt($(this).data('players')) == parseInt($(this).data('maxplayers'))) {
				hide = true;
			}
		}
		
		if (hide == true) {
			$(this).hide();
		}
		else {
			$(this).show();
		}
	});
}

function KeyCodeToString(c) {
	if (c >= 48 && c <= 90) {
		return String.fromCharCode(c);
	}
	let Str = "";
	switch (c) {
		case 8: Str = "BackSpace"; break;
		case 9: Str = "Tab"; break;
		case 13: Str = "Enter"; break;
		case 20: Str = "CapsLock"; break;
		case 32: Str = "SpaceBar"; break;
		case 33: Str = "PageUp"; break;
		case 34: Str = "PageDown"; break;
		case 35: Str = "End"; break;
		case 36: Str = "Home"; break;
		case 37: Str = "Left"; break;
		case 38: Str = "Up"; break;
		case 39: Str = "Right"; break;
		case 40: Str = "Down"; break;
		case 45: Str = "Insert"; break;
		case 46: Str = "Delete"; break;
		case 96: Str = "NumPadZero"; break;
		case 97: Str = "NumPadOne"; break;
		case 98: Str = "NumPadTwo"; break;
		case 99: Str = "NumPadThree"; break;
		case 100: Str = "NumPadFour"; break;
		case 101: Str = "NumPadFive"; break;
		case 102: Str = "NumPadSix"; break;
		case 103: Str = "NumPadSeven"; break;
		case 104: Str = "NumPadEight"; break;
		case 105: Str = "NumPadNine"; break;
		case 106: Str = "Multiply"; break;
		case 107: Str = "Add"; break;
		case 109: Str = "Subtract"; break;
		case 110: Str = "Decimal"; break;
		case 111: Str = "Divide"; break;
		case 112: Str = "F1"; break;
		case 113: Str = "F2"; break;
		case 114: Str = "F3"; break;
		case 115: Str = "F4"; break;
		case 116: Str = "F5"; break;
		case 117: Str = "F6"; break;
		case 118: Str = "F7"; break;
		case 119: Str = "F8"; break;
		case 120: Str = "F9"; break;
		case 121: Str = "F10"; break;
		case 122: Str = "F11"; break;
		case 123: Str = "F12"; break;
		case 144: Str = "NumLock"; break;
		case 145: Str = "ScrollLock"; break;
		case 160: Str = "LeftShift"; break;
		case 161: Str = "RightShift"; break;
		case 162: Str = "LeftControl"; break;
		case 163: Str = "RightControl"; break;
		case 164: Str = "LeftAlt"; break;
		case 165: Str = "RightAlt"; break;
		case 186: Str = "Semicolon"; break;
		case 190: Str = "Period"; break;
		case 191: Str = "Slash"; break;
	}
	return Str;
}

function InitControlSettings()
{
	$('.controlSetting').each(function() {
		$(this).text($(this).data('original'));
	});
}

$(document).ready(function() {
	let ServerActiveTabId = 0;
	let ServerConnectClick = 0;
	
	CreateServerBrowser($('#tabInternet'));
	CreateServerBrowser($('#tabFavorites'));
	CreateServerBrowser($('#tabHistory'));
	
	$('.mainMenuSelect').click(function() {
		let menu = $(this).data('menu');
		
		if (menu == "SERVERS") {
			ShowServers();
		}
		else if (menu == "SETTINGS") {
			ShowSettings();
		}
		else if (menu == "DISCONNECT") {
			GameExec('S_DISCONNECT_SERVER');
		}
		else if (menu == "CONTINUE") {
			GameExec('S_INGAME_MENU_CONTINUE');
		}
		else if (menu == "QUIT") {
			GameExec('S_GAME_QUIT');
		}
	});
	
	$('#menuSelectQuit').click(function() {
		GameExec('S_GAME_QUIT');
	});
	
	$('.returnToMain').click(function() {
		if (bIsInGame == true) {
			ShowIngameMenu();
		}
		else {
			ShowMainMenu();
		}
	});
	
	$('#barInternet').click(function() {
		ServerActiveTabId = 0;
		ShowTabInternet();
	});
	
	$('#barFavorites').click(function() {
		ServerActiveTabId = 1;
		ShowTabFavorites();
	});
	
	$('#barHistory').click(function() {
		ServerActiveTabId = 2;
		ShowTabHistory();
	});
	
	$('#barDirect').click(function() {
		ShowTabDirect();
	});
	
	$('#barGame').click(function() {
		ShowTabGame();
	});
	
	$('#barVideo').click(function() {
		ShowTabVideo();
	});
	
	$('#barControls').click(function() {
		ShowTabControls();
	});
	
	$('.btnsfx').on('click', function() {
		GameExec('S_PLAY_CLICK');
	});
	
	$('button').hover(function() {
		GameExec('S_PLAY_HOVER');
	});
	
	$('.hoversfx').hover(function() {
		GameExec('S_PLAY_HOVER');
	});
	
	$('.btnsfx').hover(function() {
		GameExec('S_PLAY_HOVER');
	});
	
	$('#tabVideo button').click(function() {
		ApplyVideoSettings();
	});
	
	$('#tabGame button').click(function() {
		ApplyGameSettings();
	});
	
	$('.controlSetting').click(function() {
		lastSelectedControlSetting = $(this);
		let niceName = $($(this).parent().parent().first().html() + " td:first").html();
		
		let mappingType = $(this).data('type');
		let mappingName = $(this).data('key');
		
		let axisScale = "";
		if (mappingType == "axis") {
			axisScale = $(this).data('scale');
		}
		
		ShowMessageBoxHTML(`${Translate("press_any_key_for")} ${niceName}<br><br>
								<button type="button" id="cancelKeyRemapping" class="btn btn-danger">${Translate("cancel")}</button>
								<script type="text/javascript">
								$(document).one('keydown', function(e) {
									HideMessageBox();
									let KeyName = KeyCodeToString(e.which);
									if (KeyName == "") {
										ShowMessageBoxHTML("${Translate("key_not_supported")}");
									}
									else {
										if ("${mappingType}" == "action") {
											GameExec('S_REMAP_ACTION', "${mappingName}", KeyName);
										}
										else if ("${mappingType}" == "axis") {
											GameExec('S_REMAP_AXIS', "${mappingName}", KeyName, "${axisScale}");
										}
										lastSelectedControlSetting.text(KeyName);
									}
								});
								</script>
								`, "INFO", false, 30, 15, false);
	});
	
	$('#tabControls .btn-success').click(function() {
		GameExec('S_SAVE_KEYMAPPING');
	});
	
	$('#tabControls .btn-warning').click(function() {
		ResetControlSettings();
	});
	
	$('#filterHostname').on('input', function(e) {
		browserFilter.hostname = $(this).val().toLowerCase();
		ApplyServerBrowserFilter();
	});
	
    $('#filterHideEmpty').change(function() {
		browserFilter.hideEmpty = $(this).is(':checked');
		ApplyServerBrowserFilter();
    });

    $('#filterHideFull').change(function() {
		browserFilter.hideFull = $(this).is(':checked');
		ApplyServerBrowserFilter();
    });
	
    $('#filterHidePassword').change(function() {
		browserFilter.hidePassword = $(this).is(':checked');
		ApplyServerBrowserFilter();
    });
	
	$('#refreshButton').click(function() {
		RefreshInternetBrowser();
	});
	
	$('#connectForm').submit(function(e) {
		e.preventDefault();
		
		let address = $(this).find('#inputAddress').val();
		let pass = $(this).find('#inputPassword').val();
		
		let ip = address;
		let port = 7777;
		if (address.indexOf(':') != -1) {
			ip = address.split(':')[0];
			port = address.split(':')[1];
		}
		
		if (ip.length < 1) {
			ShowMessageBoxHTML(Translate("enter_valid_ip"));
		}
		else {
			GameExec('S_CONNECT_SERVER', ip, parseInt(port), pass);
		}
	});
	
	$(document).on('click', '#cancelKeyRemapping', function() {
		HideMessageBox();
	});
	
	$(document).on('click', '#joinServerConfirmButton', function() {
		let ipport = $(this).data('ipport');
		let ip = ipport.split(':')[0];
		let port = ipport.split(':')[1];
		
		GameExec('S_CONNECT_SERVER', ip, parseInt(port), $('#joinServerPassword').val());
	});
	
	$(document).on('click', '.serverItemFav', function() {
		let ipport = $(this).closest('tr').data('ipport');
		let ip = ipport.split(':')[0];
		let port = ipport.split(':')[1];
		let isfav = $(this).closest('tr').data('isfav');
		let haspassword = $(this).closest('tr').data('haspassword');
		let ispremium = $(this).closest('tr').data('ispremium');
		let maxplayers = $(this).closest('tr').data('maxplayers');
		let players = $(this).closest('tr').data('players');
		
		if (isfav == 0)
		{
			let hostname = $(this).closest('tr').find('.serverItemHostname').html();
			let gamemode = $(this).closest('tr').find('.serverItemGamemode').html();
			let ping = $(this).closest('tr').find('.serverItemPing').html();
			
			AddServer_Internal(1, ip, parseInt(port), hostname, gamemode, parseInt(players), parseInt(maxplayers), parseInt(ping), 1, parseInt(haspassword), ispremium);
			
			let browserItems = $(".serverBrowser").find("[data-ipport='"+ipport+"']");
			browserItems.each(function() {
				$(this).find('img').attr('src', "img/T_StarGold.png");
				$(this).data('isfav', 1);
			});
			
			GameExec('S_ADD_SERVER_FAV', ip, parseInt(port));
		}
		else
		{
			RemoveServer(1, ip, port);
			
			let browserItems = $(".serverBrowser").find("[data-ipport='"+ipport+"']");
			browserItems.each(function() {
				$(this).find('img').attr('src', "img/T_StarWhite.png");
				$(this).data('isfav', 0);
			});
			
			GameExec('S_REMOVE_SERVER_FAV', ip, parseInt(port));
		}
	});
	
	$(document).on('click', '.serverItem', function() {
		let ms = Date.now();
		let diff = ms - ServerConnectClick;
		ServerConnectClick = ms;
		
		let data = $(this).data('ipport');
		let ip = data.split(':')[0];
		let port = data.split(':')[1];
		
		// 420ms for a double click
		if (diff < 420) {
			let ispass = $(this).data('haspassword');
			
			if (ispass == 0) {
				GameExec('S_CONNECT_SERVER', ip, parseInt(port), "");
			}
			else {
				ShowMessageBoxHTML(`${Translate("server_asks_password")}<br><br>
									<form style="margin:0px; padding:0px; display:inline;"><div class="input-group mb-3">
									  <input id="joinServerPassword" type="text" class="form-control rounded-0" placeholder="" autofocus>
									</div>
									<button type="submit" data-ipport="${data}" id="joinServerConfirmButton" class="btn btn-success">${Translate("join")}</button></form>`, "INFO", true, 30, 15, false);
			}
		}
		else {			
			GameExec('S_QUERY_SERVER', ServerActiveTabId, ip, parseInt(port));
		}
	});
	
	$(document).mousedown(function(e) {
		// Disable middle mouse
		if (e.button == 1) {
			return false
		}
	});
	
	$(document).keydown(function(e) {
		if (e.which == 32) {
			if (activePage != 2) {
				GameExec('S_SKY_MOVE_FAST', true);
			}
		}
		// Disable keyboard interaction with tables and buttons
		if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	});
	
	$(document).keyup(function(e) { 
		if (e.which == 32) {
			GameExec('S_SKY_MOVE_FAST', false);
		}
	});
	
	$(document).on('keydown', function(e) {
		if (e.keyCode == 36) {			
			if (enablePageReload === true && activePage != 2) {
				location.reload(true);
			}
		}
	});
	
	InitControlSettings();
	GameExec('S_MAINMENU_LOAD');
	
	setTimeout(function() {
		RefreshInternetBrowser();
	}, 100);
});

function SetComputerInformation(str) {
	$('#computerInformation').html(Base64Decode(str));
}

function SetVersionInfo(VersionStr) {
	let versionInfo = $('#versionInformation').html();	
	let info = ' <i class="fas fa-info-circle" data-toggle="tooltip" data-placement="right" title="'+Translate("incompatible_server")+'"></i>';
	$('#versionInformation').html(versionInfo + ' ' + VersionStr + info);
}

function SetEnablePageReload(enable) {
	enablePageReload = enable;
}

function SetServerInfo(ispremium, name, ip, port) {
	hostname = htmlspecialchars(Base64Decode(name));
	
	if (ispremium === true) {
		hostname = AddMarkup(hostname);
	}
	else {
		hostname = RemoveMarkup(hostname);
	}
	
	$('#serverNameIP span:eq(1)').html(hostname+' (IP: '+ip+':'+port+')');
}

function AddServer(tab, ip, port, hostname, gamemode, players, maxplayers, ping, isfav, ispass, ispremium) {
	
	hostname = htmlspecialchars(Base64Decode(hostname));
	gamemode = htmlspecialchars(Base64Decode(gamemode));
	
	if (ispremium === true) {
		hostname = AddMarkup(hostname);
		gamemode = AddMarkup(gamemode);
	}
	else {
		hostname = RemoveMarkup(hostname);
		gamemode = RemoveMarkup(gamemode);
	}

	AddServer_Internal(tab, ip, port, hostname, gamemode, players, maxplayers, ping, isfav, ispass, ispremium);
}

function AddServer_Internal(tab, ip, port, hostname, gamemode, players, maxplayers, ping, isfav, ispass, ispremium) {
	
	let found = GetServerByIP(tab, ip, port);
	if (found.length > 0) {
		return;
	}
	
	let pass = '';
	let fav = '<img src="img/T_StarWhite.png" alt="F">';
	let tabName = GetBrowserTabNameById(tab);
	
	if (isfav != 0) {
		fav = '<img src="img/T_StarGold.png" alt="F">';
	}
	if (ispass != 0) {
		pass = '&#128274;';
	}
	
	let server = '<tr class="serverItem" title="'+ip+':'+port+'" data-ipport="'+ip+':'+port+'" data-haspassword="'+ispass+'" data-isfav="'+isfav+'" data-ispremium="'+ispremium+'" data-players="'+players+'" data-maxplayers="'+maxplayers+'"><td class="serverItemFav" width="1%">'+fav+'</td><td width="1%">'+pass+'</td><td class="serverItemHostname" width="65%" style="padding-left: 10px; white-space: pre;">'+hostname+'</td><td class="serverItemGamemode" width="17%" style="white-space: pre;">'+gamemode+'</td><td class="serverItemPlayers" width="6%">'+players+' / '+maxplayers+'</td><td class="serverItemPing" width="4%">'+ping+'</td></tr>';

	$(tabName + ' .serverBrowser tbody').append(server);
	
	// Only count servers on the internet tab
	if (tab == 0) {
		SetServerCount(GetServerCount() + 1);
	}
	sortTables[tab].sort();
}

function RemoveServer(tab, ip, port) {

	let found = GetServerByIP(tab, ip, port);
	if (found.length < 1) {
		return;
	}
	
	found.remove();
	
	// Only count servers on the internet tab
	if (tab == 0) {
		SetServerCount(GetServerCount() + 1);
	}
}

function UpdateServer(tab, ip, port, hostname, gamemode, players, maxplayers, ping) {
	let server = GetServerByIP(tab, ip, port);
	if (server.length > 0) {
		let ispremium = server.attr('data-ispremium') == 'true';
		
		hostname = htmlspecialchars(Base64Decode(hostname));
		gamemode = htmlspecialchars(Base64Decode(gamemode));
		
		if (ispremium === true) {
			hostname = AddMarkup(hostname);
			gamemode = AddMarkup(gamemode);
		}
		else {
			hostname = RemoveMarkup(hostname);
			gamemode = RemoveMarkup(gamemode);
		}
		
		server.find('.serverItemHostname').html(hostname);
		server.find('.serverItemGamemode').html(gamemode);
		server.find('.serverItemPlayers').html(players + " / " + maxplayers);
		server.find('.serverItemPing').html(ping);
	}
}

function GetServerCount() {
	return serverCount;
}

function SetServerCount(count) {
	serverCount = count;
	$('#serverCount').html(Translate("servers")+': '+serverCount);
}

function AddRandomFakeServers() {
	let i;
	for (i = 0; i < 55; i++) {
		let randWait = Math.floor(Math.random() * 6000) + 1500;
		setTimeout(function() {
			let randPlayers = Math.floor(Math.random() * 990) + 10;
			let randPing = Math.floor(Math.random() * 320) + 20;
			AddServer(0, '127.0.0.1', 7777, Base64Encode('Horizon Prototype Labs &#127796;&#128299;    иä   XD   lol'), Base64Encode('Stunt/Derby/Race/Dm/Minigames/Tdm/Fun'), randPlayers, 1000, randPing, true, true);
			AddServer(1, '127.0.0.1', 7777, Base64Encode('Leelelele           XD'), Base64Encode('Stunt/Derby/Race/Dm/Minigames/Tdm/Fun'), randPlayers, 1000, randPing, true, true);
		}, randWait);
	}
}

function GetBrowserTabNameById(tab) {
	let tabName = '#tabInternet';
	
	if (tab == 0) {
		tabName = '#tabInternet';
	}
	else if (tab == 1) {
		tabName = '#tabFavorites';
	}
	else if (tab == 2) {
		tabName = '#tabHistory';
	}
	return tabName;
}

function GetServerByIP(tab, ip, port) {
	let tabName = GetBrowserTabNameById(tab);
	
	return $(tabName + ' .serverBrowser').find("[data-ipport='"+ip+":"+port+"']");
}

function RefreshInternetBrowser() {
	let ms = Date.now();
	let diff = ms - InternetBrowserRefreshClick;
	if (diff > 1000) {
		InternetBrowserRefreshClick = ms;
		ClearInternetBrowser();
		if (addFakeServers === true) {
			AddRandomFakeServers();
		}
		else {
			GameExec('S_GET_SERVERS');
		}
	}
}

function ClearInternetBrowser() {
	$('#tabInternet .serverBrowser tbody').empty();
	SetServerCount(0);
}

function htmlspecialchars(str) {
    return str
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function RemoveMarkup(str) {
	return str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

function AddMarkup(str) {
    return XBBCODE.process({
		text: str,
		removeMisalignedTags: false,
		addInLineBreaks: false
    }).html;
}

function CreateServerBrowser(e) {
	let ret = e.append(`<div class="serverBrowser">
						<table class="sortable" id="sorttable-${e[0].id}">
						<colgroup>
						   <col span="1">
						   <col span="1">
						   <col span="1">
						   <col span="1">
						   <col span="1">
						   <col span="1">
						</colgroup>
							<thead>
								<tr>
									<th width="1%"> </th>
									<th width="1%"> </th>
									<th width="65%" style="padding-left: 10px;cursor:pointer">${Translate("hostname")}</th>
									<th width="17%" style="cursor:pointer">${Translate("gamemode")}</th>
									<th width="6%" style="cursor:pointer">${Translate("players")}</th>
									<th width="4%" style="cursor:pointer">${Translate("ping")}</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>`);
	let table = document.getElementById("sorttable-"+e[0].id);
	let sorter = new TableSort(table, ["text", "text", "text", "text", "count", "number"], true);
	sorter.sort(4, true);
	sortTables.push(sorter);
	return ret;
}

function OnUIShow() {

}

function OnUIHide() {
	
}

/* START SETTINGS */
function AddSupportedResolution(resolution) {
	AddDropdownOption('settingResolution', resolution);
}

function SetScalabilityDefaults(hdr, vsync, aa, shadow, pp, view, foliage, texture, effects, ao) {
	SetSettingInt('#settingVSYNC', vsync);
	SetSettingInt('#settingHDR', hdr);
	SetSettingInt('#settingAA', aa);
	SetSettingInt('#settingShadow', shadow);
	SetSettingInt('#settingPP', pp);
	SetSettingInt('#settingView', view);
	SetSettingInt('#settingFoliage', foliage);
	SetSettingInt('#settingTexture', texture);
	SetSettingInt('#settingEffects', effects);
	SetSettingInt('#settingAO', ao);
}

function ApplyVideoSettings() {
	let Resolution = GetDropdownSelectedOption('settingResolution');
	
	let ScreenMode = GetDropdownSelectedOption('settingScreenMode');
	if (ScreenMode == Translate("fullscreen"))
		ScreenMode = 0;
	else if (ScreenMode == Translate("windowed_fullscreen"))
		ScreenMode = 1;
	else if (ScreenMode == Translate("windowed"))
		ScreenMode = 2;
	
	let HDR = GetSettingInt('#settingHDR');
	let VSync = GetSettingInt('#settingVSYNC');
	let AA = GetSettingInt('#settingAA');
	let Shadow = GetSettingInt('#settingShadow');
	let PP = GetSettingInt('#settingPP');
	let ViewDistance = GetSettingInt('#settingView');
	let Foliage = GetSettingInt('#settingFoliage');
	let Texture = GetSettingInt('#settingTexture');
	let Effects = GetSettingInt('#settingEffects');
	let AO = GetSettingInt('#settingAO');
	
	GameExec('S_VIDEO_APPLY', Resolution, parseInt(ScreenMode), HDR, VSync, AA, Shadow, PP, ViewDistance, Foliage, Texture, Effects, AO);
}

function SetSettingInt(id, opt) {
	$(id + ' label').removeClass('active');
	$(id + ' label [data-opt="'+opt+'"]').parent().addClass('active');
}

function GetSettingInt(id) {
	return parseInt($(id + ' .active input').data('opt'));
}

function SetConfirmedResolution(resolution) {
	SetDropdownOption('settingResolution', resolution);
}

function SetConfirmedScreenMode(mode) {
	let ScreenModes = [Translate("fullscreen"), Translate("windowed_fullscreen"), Translate("windowed")];
	SetDropdownOption('settingScreenMode', ScreenModes[mode]);
}

function SetDisplaySupportsHDR(supports) {
	if (supports == true) {
		$('#settingHDR').css('pointer-events', 'auto');
		$('#settingHDRUnsupported').hide();
	}
	else {
		$('#settingHDR').css('pointer-events', 'none');
		$('#settingHDRUnsupported').show();
	}
}

let prevLang = "en";

function SetGameDefaults(ShowFPS, LimitFPS, Audio, MasterVolume, MouseSensitivity, VoiceCapture, VoiceThreshold, Language, InvertMouseY, MuteMenuMusic) {
	SetSettingInt('#settingShowFPS', ShowFPS);
	$('#settingAudioVolume').val(MasterVolume);
	$('#settingMouseSensitivity').val(MouseSensitivity);
	$('#settingFrameRateLimit').val(LimitFPS);
	SetSettingInt('#settingAudio', Audio);
	SetSettingInt('#settingVoiceCapture', VoiceCapture);
	SetSettingInt('#settingInvertMouseY', InvertMouseY);
	SetSettingInt('#settingMuteMenuMusic', MuteMenuMusic);
	$('#settingVoiceThreshold').val(VoiceThreshold);
	if(Language === undefined){
		Language = "en";
	}
	prevLang = Language;
	Language = {
		"en": "English",
		"pt": "Português",
		"de": "German",
		"fr": "French",
		"ru": "Russian",
		"zh_Hant": "Chinese (Traditional)"
	}[Language];
	SetDropdownOption('settingLanguage', Language);
	ApplyLanguage(prevLang);
}

function ApplyGameSettings() {
	let ShowFPS = GetSettingInt('#settingShowFPS');
	let LimitFPS = parseInt($('#settingFrameRateLimit').val());
	let Audio = GetSettingInt('#settingAudio');
	let MasterVolume = parseInt($('#settingAudioVolume').val());
	let MouseSensitivity = parseFloat($('#settingMouseSensitivity').val());
	let VoiceCapture = GetSettingInt('#settingVoiceCapture');
	let VoiceThreshold = parseInt($('#settingVoiceThreshold').val());
	let InvertMouseY = GetSettingInt('#settingInvertMouseY');
	let MuteMenuMusic = GetSettingInt('#settingMuteMenuMusic');
	let Language = GetDropdownSelectedOption('settingLanguage');
	Language = {
		"English": "en",
		"Português": "pt",
		"German": "de",
		"French": "fr",
		"Russian": "ru",
		"Chinese (Traditional)": "zh_Hant"
	}[Language];
	GameExec('S_GAME_APPLY', ShowFPS, LimitFPS, Audio, MasterVolume, MouseSensitivity, VoiceCapture, VoiceThreshold, Language, MuteMenuMusic, InvertMouseY);
	if(Language !== prevLang){
		prevLang = Language;
		ApplyLanguage(Language);
	}
}

function SetControlActionKeyDefault(Key, KeyName) {
	$('#tabControls [data-key="'+Key+'"][data-type="action"]').text(KeyName);
}

function SetControlAxisKeyDefault(Key, KeyName, Scale) {
	$('#tabControls [data-key="'+Key+'"][data-type="axis"][data-scale="'+Scale+'"]').text(KeyName);
}

function ResetControlSettings() {
	$('.controlSetting').each(function() {
		$(this).text($(this).data('original'));
		if ($(this).data('type') == "action") {
			GameExec('S_REMAP_ACTION', $(this).data('key'), $(this).data('original'));
		}
		else {
			GameExec('S_REMAP_AXIS', $(this).data('key'), $(this).data('original'), $(this).data('scale'));
		}
	});
}

/* END SETTINGS */