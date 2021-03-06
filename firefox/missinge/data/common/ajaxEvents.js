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

/*global jQuery */

function checkAjaxReady(data, tries) {
   if (data.list.length === 0 || jQuery('#'+data.list[0]).length > 0) {
      var evt = document.createEvent("MessageEvent");
      evt.initMessageEvent("MissingEajax", true, true,
                           data.type + ":" + data.list.join(","),
                           "http://www.tumblr.com", 0, window);
      document.dispatchEvent(evt);
   }
   else if (tries < 10) {
      setTimeout(function(){checkAjaxReady(data,tries+1);},500);
   }
}

if (location.host === 'www.tumblr.com') {
   jQuery('head').append('<script type="text/javascript">\
   if (typeof Ajax !== "undefined") { \
      Ajax.Responders.register({ \
         onComplete: function(request) { \
            if (request.transport.status === 200) { \
               var type, newPosts; \
               if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/((dashboard\\/(([0-9]+\\/[0-9]+)|(search\\/[^\\/+[0-9]+)))|(tumblelog\\/[^\\/]+\\/(([0-9]+)|(search\\/[^\\/]*\\/[0-9]+))))/.test(request.url)) { \
                  type = "posts"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/((inbox\\/after\\/[0-9]+)|((tumblelog\\/[^\\/]+\\/)?messages\\/page\\/[0-9]+))/.test(request.url)) { \
                  type = "messages"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/(tumblelog\\/[^\\/]+\\/)?drafts\\/after\\/[0-9]+/.test(request.url)) { \
                  type = "drafts"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/(tumblelog\\/[^\\/]+\\/)?queue\\?page=[0-9]+/.test(request.url)) { \
                  type = "queue"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/tagged\\/[^\\?]+\\?before=[0-9]*/.test(request.url)) { \
                  type = "tagged"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/mega-editor\\/[^\\/]+\\?before_time=[0-9]*/.test(request.url)) { \
                  type = "mass-editor"; \
               } \
               else if (/^(http:\\/\\/www\\.tumblr\\.com)?\\/dashboard\\/notes\\/[0-9]+\\//.test(request.url)) { \
                  type = "notes"; \
                  newPosts = ["post_" + request.url.match(/notes\\/([0-9]+)/)[1]]; \
               } \
               if (type === "mass-editor") { \
                  newPosts = request.transport.responseText.match(/<a id="(post_[0-9]+)/g); \
                  for (i=0; i<newPosts.length; i++) { \
                     newPosts[i] = newPosts[i].replace(/<a id="/,""); \
                  } \
               } \
               if (type !== "notes") { \
                  newPosts = request.transport.responseText.match(/<li id="(post_[0-9]+)/g); \
                  for (i=0; i<newPosts.length; i++) { \
                     newPosts[i] = newPosts[i].replace(/<li id="/,""); \
                  } \
               } \
               var evt = document.createEvent("MessageEvent"); \
               evt.initMessageEvent("MissingEajaxInsert", true, true, type + ":" + newPosts.join(","), "http://www.tumblr.com", 0, window); \
               document.dispatchEvent(evt); \
            } \
         } \
      }); \
   }</script>');
}

document.addEventListener('MissingEajaxInsert', function(e) {
   var type = e.data.match(/^[^:]*/)[0];
   var list = e.data.match(/(post_[0-9]+)/g);
   checkAjaxReady({"type":type,"list":list}, 0);
}, false);

//jQuery(document).bind('MissingEajax', function(e) {
//   var type = e.originalEvent.data.match(/^[^:]*/)[0];
//   var list = e.originalEvent.data.match(/(post_[0-9]+)/g);
//   console.log(type);
//   console.log(list);
//});
