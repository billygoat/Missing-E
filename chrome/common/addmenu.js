/*
 * 'Missing e' Extension
 *
 * Copyright 2011, Jeremy Cutler
 * Released under the GPL version 2 licence.
 * SEE: GPL-LICENSE.txt
 *
 * This file is part of 'Missing e'.
 *
 * 'Missing e' is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * 'Missing e' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 'Missing e'. If not, see <http://www.gnu.org/licenses/>.
 */

/*global chrome */

var bar = document.getElementById("user_tools");
var logout = document.getElementById("logout_button");

if (bar && logout) {
   var st = document.createElement('style');
   st.setAttribute('type', 'text/css');
   st.innerHTML = '#header #missinge_button a {' +
                  'background-image:url("' +
                  chrome.extension.getURL('missinge_dash.png') +
                  '") !important; background-position:center center; ' +
                  'opacity:0.5; } ' +
                  '#header #missinge_button a:hover {' +
                  'opacity:1; } ' +
                  '#header #missinge_button #missinge_updatenotice {' +
                  'font-size:11px !important;line-height:11px !important;' +
                  'display:none;width:40px;right:auto !important;left:-7px;' +
                  'padding:2px 2px 4px 2px !important;cursor:pointer; } ' +
                  '#header #missinge_button #missinge_updatenotice ' +
                  '.tab_notice_nipple { left:21px !important; } ' +
                  '#header #missinge_button #missinge_updatenotice:hover ' +
                  '.tab_notice_value { text-decoration:underline; } ' +
                  '#header #tabs_outter_container {' +
                  'min-width:645px !important;' +
                  'left:auto !important;right:17px !important;' +
                  'width:auto !important;}';
   document.getElementsByTagName('head')[0].appendChild(st);
   var tab = document.createElement('div');
   tab.className = "tab iconic";
   tab.id = "missinge_button";
   tab.innerHTML = '<a href="' + chrome.extension.getURL('options.html') +
                     '" target="_blank" title="Missing e Settings">Missing e' +
                     '</a><div id="missinge_updatenotice" class="tab_notice">' +
                     '<span class="tab_notice_value">Update</span>' +
                     '<span class="tab_notice_nipple"></span></div>';
   bar.insertBefore(tab, logout);
}

if (/http:\/\/www\.tumblr\.com\/dashboard\/[0-9]/.test(location.href)) {
   var lcol = document.getElementById('left_column');
   var rcol = document.getElementById('right_column');
   if (lcol && !rcol) {
      rcol = document.createElement('div');
      rcol.id = 'right_column';
      lcol.parentNode.insertBefore(rcol, lcol);
      var ot = 0;
      var fp = document.getElementsByClassName('post');
      if (fp.length > 1 && fp[0].id === 'new_post') {
         ot = fp[1].offsetTop;
      }
      else if (fp.length > 0 && fp[0].id !== 'new_post') {
         ot = fp[0].offsetTop;
      }
      ot = ot - rcol.offsetTop;
      if (ot > 0) {
         rcol.style.paddingTop = ot + 'px';
      }
   }
}
