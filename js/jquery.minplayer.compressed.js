/**
 *  Copyright (c) 2010 Alethia Inc,
 *  http://www.alethia-inc.com
 *  Developed by Travis Tidwell | travist at alethia-inc.com 
 *
 *  License:  GPL version 3.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
(function(a){jQuery.media=jQuery.media?jQuery.media:{};jQuery.media.ids=jQuery.extend(jQuery.media.ids,{currentTime:".mediacurrenttime",totalTime:".mediatotaltime",playPause:".mediaplaypause",seekUpdate:".mediaseekupdate",seekProgress:".mediaseekprogress",seekBar:".mediaseekbar",seekHandle:".mediaseekhandle",volumeUpdate:".mediavolumeupdate",volumeBar:".mediavolumebar",volumeHandle:".mediavolumehandle",mute:".mediamute"});jQuery.fn.mediacontrol=function(b){if(this.length===0){return null;}return new (function(e,c){c=jQuery.media.utils.getSettings(c);this.display=e;var f=this;this.formatTime=(c.template&&c.template.formatTime)?c.template.formatTime:function(j){j=j?j:0;var k=0;var h=0;var g=0;g=Math.floor(j/3600);j-=(g*3600);h=Math.floor(j/60);j-=(h*60);k=Math.floor(j%60);var i="";if(g){i+=String(g);i+=":";}i+=(h>=10)?String(h):("0"+String(h));i+=":";i+=(k>=10)?String(k):("0"+String(k));return{time:i,units:""};};this.setToggle=function(h,i){var g=i?".on":".off";var j=i?".off":".on";if(h){h.find(g).show();h.find(j).hide();}};var d=this.formatTime(0);this.duration=0;this.volume=-1;this.prevVolume=0;this.percentLoaded=0;this.playState=false;this.muteState=false;this.allowResize=true;this.currentTime=e.find(c.ids.currentTime).text(d.time);this.totalTime=e.find(c.ids.totalTime).text(d.time);this.playPauseButton=e.find(c.ids.playPause).medialink(c,function(g,h){f.playState=!f.playState;f.setToggle(h,f.playState);f.display.trigger("controlupdate",{type:(f.playState?"pause":"play")});});this.seekUpdate=e.find(c.ids.seekUpdate).css("width","0px");this.seekProgress=e.find(c.ids.seekProgress).css("width","0px");this.seekBar=e.find(c.ids.seekBar).mediaslider(c.ids.seekHandle,false);this.seekBar.display.bind("setvalue",function(g,h){f.updateSeek(h);f.display.trigger("controlupdate",{type:"seek",value:(h*f.duration)});});this.seekBar.display.bind("updatevalue",function(g,h){f.updateSeek(h);});this.updateSeek=function(g){this.seekUpdate.css("width",(g*this.seekBar.trackSize)+"px");this.currentTime.text(this.formatTime(g*this.duration).time);};this.volumeUpdate=e.find(c.ids.volumeUpdate);this.volumeBar=e.find(c.ids.volumeBar).mediaslider(c.ids.volumeHandle,false);this.volumeBar.display.bind("setvalue",function(g,h){f.volumeUpdate.css("width",(h*f.volumeBar.trackSize)+"px");f.display.trigger("controlupdate",{type:"volume",value:h});});this.volumeBar.display.bind("updatevalue",function(g,h){f.volumeUpdate.css("width",(h*f.volumeBar.trackSize)+"px");f.volume=h;});this.mute=e.find(c.ids.mute).medialink(c,function(g,h){f.muteState=!f.muteState;f.setToggle(h,f.muteState);f.setMute(f.muteState);});this.setMute=function(g){this.prevVolume=(this.volumeBar.value>0)?this.volumeBar.value:this.prevVolume;this.volumeBar.updateValue(g?0:this.prevVolume);this.display.trigger("controlupdate",{type:"mute",value:g});};this.onResize=function(h,g){if(this.allowResize){if(this.seekBar){this.seekBar.onResize(h,g);}this.seekProgress.css("width",(this.percentLoaded*this.seekBar.trackSize)+"px");}};this.onMediaUpdate=function(g){switch(g.type){case"paused":this.playState=true;this.setToggle(this.playPauseButton.display,this.playState);break;case"playing":this.playState=false;this.setToggle(this.playPauseButton.display,this.playState);break;case"stopped":this.playState=true;this.setToggle(this.playPauseButton.display,this.playState);break;case"progress":this.percentLoaded=g.percentLoaded;this.seekProgress.css("width",(this.percentLoaded*this.seekBar.trackSize)+"px");break;case"meta":case"update":this.timeUpdate(g.currentTime,g.totalTime);this.volumeBar.updateValue(g.volume);break;default:break;}};this.reset=function(){this.totalTime.text(this.formatTime(0).time);if(this.seekBar){this.seekBar.updateValue(0);}};this.timeUpdate=function(g,h){this.duration=h;this.totalTime.text(this.formatTime(h).time);if(h&&!this.seekBar.dragging){this.seekBar.updateValue(g/h);}};this.timeUpdate(0,0);})(this,b);};window.onDailymotionPlayerReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};jQuery.fn.mediadailymotion=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.meta=false;this.loaded=false;this.ready=false;this.createMedia=function(i){this.videoFile=i;this.ready=false;var h=(e.id+"_media");var j=Math.floor(Math.random()*1000000);var k="http://www.dailymotion.com/swf/"+i.path+"?rand="+j+"&amp;enablejsapi=1&amp;playerapiid="+h;jQuery.media.utils.insertFlash(this.display,k,h,this.display.width(),this.display.height(),{},function(l){g.player=l;g.loadPlayer();});};this.loadMedia=function(h){if(this.player){this.loaded=false;this.meta=false;this.videoFile=h;d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){window[e.id+"StateChange"]=function(h){g.onStateChange(h);};window[e.id+"PlayerError"]=function(h){g.onError(h);};this.player.addEventListener("onStateChange",e.id+"StateChange");this.player.addEventListener("onError",e.id+"PlayerError");d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onStateChange=function(i){var h=this.getPlayerState(i);if(!(!this.meta&&h=="stopped")){d({type:h});}if(!this.loaded&&h=="buffering"){this.loaded=true;d({type:"paused"});if(e.autostart){this.playMedia();}}if(!this.meta&&h=="playing"){this.meta=true;d({type:"meta"});}};this.onError=function(i){var h="An unknown error has occured: "+i;if(i==100){h="The requested video was not found.  ";h+="This occurs when a video has been removed (for any reason), ";h+="or it has been marked as private.";}else{if((i==101)||(i==150)){h="The video requested does not allow playback in an embedded player.";}}console.log(h);d({type:"error",data:h});};this.getPlayerState=function(h){switch(h){case 5:return"ready";case 3:return"buffering";case 2:return"paused";case 1:return"playing";case 0:return"complete";case -1:return"stopped";default:return"unknown";}return"unknown";};this.setSize=function(i,h){this.player.setSize(i,h);};this.playMedia=function(){d({type:"buffering"});this.player.playVideo();};this.pauseMedia=function(){this.player.pauseVideo();};this.stopMedia=function(){this.player.stopVideo();};this.seekMedia=function(h){d({type:"buffering"});this.player.seekTo(h,true);};this.setVolume=function(h){this.player.setVolume(h*100);};this.getVolume=function(){return(this.player.getVolume()/100);};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getBytesLoaded=function(){return this.player.getVideoBytesLoaded();};this.getBytesTotal=function(){return this.player.getVideoBytesTotal();};this.getEmbedCode=function(){return this.player.getVideoEmbedCode();};this.getMediaLink=function(){return this.player.getVideoUrl();};this.hasControls=function(){return true;};this.showControls=function(h){};this.setQuality=function(h){};this.getQuality=function(){return"";};})(this,c,b);};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{volume:80,autostart:false,streamer:"",embedWidth:450,embedHeight:337});jQuery.fn.mediadisplay=function(b){if(this.length===0){return null;}return new (function(d,c){c=jQuery.media.utils.getSettings(c);this.display=d;var e=this;this.volume=0;this.player=null;this.reflowInterval=null;this.updateInterval=null;this.progressInterval=null;this.playQueue=[];this.playerReady=false;this.loaded=false;this.mediaFile=null;this.width=0;this.height=0;this.checkPlayType=function(g,f){if((typeof g.canPlayType)=="function"){return("no"!=g.canPlayType(f))&&(""!=g.canPlayType(f));}else{return false;}};this.getPlayTypes=function(){var f={};var g=document.createElement("video");f.ogg=this.checkPlayType(g,"video/ogg");f.h264=this.checkPlayType(g,"video/mp4");g=document.createElement("audio");f.audioOgg=this.checkPlayType(g,"audio/ogg");f.mp3=this.checkPlayType(g,"audio/mpeg");return f;};this.playTypes=this.getPlayTypes();this.setSize=function(g,f){this.width=g?g:this.width;this.height=f?f:this.height;this.display.css({height:this.height+"px",width:this.width+"px"});if(this.playerReady&&this.width&&this.height){this.player.player.width=this.width;this.player.player.height=this.height;this.player.setSize(g,this.height);}};this.resetContent=function(){this.display.empty();this.display.append(this.template);};this.addToQueue=function(f){if(f){this.playQueue.push(f);}};this.loadFiles=function(f){if(f){this.playQueue.length=0;this.addToQueue(f.intro);this.addToQueue(f.commercial);this.addToQueue(f.prereel);this.addToQueue(f.media);this.addToQueue(f.postreel);}return(this.playQueue.length>0);};this.playNext=function(){if(this.playQueue.length>0){this.loadMedia(this.playQueue.shift());}};this.loadMedia=function(f){if(f){f=this.getMediaFile(f);this.stopMedia();if(!this.mediaFile||(this.mediaFile.player!=f.player)){this.player=null;this.playerReady=false;if(f.player){this.player=this.display["media"+f.player](c,function(g){e.onMediaUpdate(g);});}this.player.createMedia(f);this.startReflow();}else{if(this.player){this.player.loadMedia(f);}}this.mediaFile=f;this.onMediaUpdate({type:"initialize"});}};this.getMediaFile=function(f){var g={};f=(typeof f==="string")?{path:f}:f;g.duration=f.duration?f.duration:0;g.bytesTotal=f.bytesTotal?f.bytesTotal:0;g.quality=f.quality?f.quality:0;g.stream=c.streamer?c.streamer:f.stream;g.path=f.path?jQuery.trim(f.path):(c.baseURL+jQuery.trim(f.filepath));g.extension=f.extension?f.extension:this.getFileExtension(g.path);g.player=f.player?f.player:this.getPlayer(g.extension);g.type=f.type?f.type:this.getType(g.extension);return g;};this.getFileExtension=function(f){return f.substring(f.lastIndexOf(".")+1).toLowerCase();};this.getPlayer=function(f){switch(f){case"ogg":case"ogv":return this.playTypes.ogg?"html5":"flash";case"mp4":case"m4v":return this.playTypes.h264?"html5":"flash";case"oga":return this.playTypes.audioOgg?"html5":"flash";case"mp3":return this.playTypes.mp3?"html5":"flash";case"flv":case"f4v":case"mov":case"3g2":case"m4a":case"aac":case"wav":case"aif":case"wma":return"flash";}return"";};this.getType=function(f){switch(f){case"ogg":case"ogv":case"mp4":case"m4v":case"flv":case"f4v":case"mov":case"3g2":return"video";case"oga":case"mp3":case"m4a":case"aac":case"wav":case"aif":case"wma":return"audio";}};this.onMediaUpdate=function(g){switch(g.type){case"playerready":this.playerReady=true;clearTimeout(this.reflowInterval);this.player.setVolume(0);this.startProgress();break;case"buffering":this.startProgress();break;case"stopped":clearInterval(this.progressInterval);clearInterval(this.updateInterval);break;case"paused":clearInterval(this.updateInterval);break;case"playing":this.startUpdate();break;case"progress":var f=this.getPercentLoaded();jQuery.extend(g,{percentLoaded:f});if(f>=1){clearInterval(this.progressInterval);}break;case"update":case"meta":jQuery.extend(g,{currentTime:this.player.getCurrentTime(),totalTime:this.getDuration(),volume:this.player.getVolume(),quality:this.getQuality()});break;case"complete":this.playNext();break;}if(g.type=="playing"&&!this.loaded){this.loaded=true;this.player.setVolume((c.volume/100));if(!c.autostart){this.player.pauseMedia();}else{this.display.trigger("mediaupdate",g);}}else{this.display.trigger("mediaupdate",g);}};this.startReflow=function(){clearTimeout(this.reflowInterval);this.reflowInterval=setTimeout(function(){var f=parseInt(e.display.css("marginLeft"),10);e.display.css({marginLeft:(f+1)});setTimeout(function(){e.display.css({marginLeft:f});},1);},2000);};this.startProgress=function(){if(this.playerReady){clearInterval(this.progressInterval);this.progressInterval=setInterval(function(){e.onMediaUpdate({type:"progress"});},500);}};this.startUpdate=function(){if(this.playerReady){clearInterval(this.updateInterval);this.updateInterval=setInterval(function(){if(e.playerReady){e.onMediaUpdate({type:"update"});}},1000);}};this.stopMedia=function(){this.loaded=false;clearInterval(this.progressInterval);clearInterval(this.updateInterval);if(this.playerReady){this.player.stopMedia();}};this.mute=function(f){if(f){this.volume=this.player.getVolume();this.player.setVolume(0);}else{this.player.setVolume(this.volume);}};this.getPercentLoaded=function(){var g=this.player.getBytesLoaded();var f=this.mediaFile.bytesTotal?this.mediaFile.bytesTotal:this.player.getBytesTotal();return f?(g/f):0;};this.showControls=function(f){if(this.playerReady){this.player.showControls(f);}};this.hasControls=function(){if(this.player){return this.player.hasControls();}return false;};this.getDuration=function(){if(!this.mediaFile.duration){this.mediaFile.duration=this.player.getDuration();}return this.mediaFile.duration;};this.getQuality=function(){if(!this.mediaFile.quality){this.mediaFile.quality=this.player.getQuality();}return this.mediaFile.quality;};this.setSize(this.display.width(),this.display.height());})(this,b);};window.onFlashPlayerReady=function(b){jQuery.media.players[b].node.player.media.player.onReady();};window.onFlashPlayerUpdate=function(c,b){jQuery.media.players[c].node.player.media.player.onMediaUpdate(b);};window.onFlashPlayerDebug=function(b){console.log(b);};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{flashplayer:"./flash/mediafront.swf",skin:"default",config:"nocontrols"});jQuery.fn.mediaflash=function(c,b){return new (function(f,e,d){e=jQuery.media.utils.getSettings(e);this.display=f;var g=this;this.player=null;this.videoFile=null;this.ready=false;this.translate={mediaConnected:"connected",mediaBuffering:"buffering",mediaPaused:"paused",mediaPlaying:"playing",mediaStopped:"stopped",mediaComplete:"complete",mediaMeta:"meta"};this.createMedia=function(j){this.videoFile=j;this.ready=false;var i=(e.id+"_media");var k=Math.floor(Math.random()*1000000);var l=e.flashplayer+"?rand="+k;var h={config:e.config,id:e.id,file:j.path,skin:e.skin};if(j.stream){h.stream=j.stream;}if(e.debug){h.debug="1";}jQuery.media.utils.insertFlash(this.display,l,i,this.display.width(),this.display.height(),h,function(m){g.player=m;g.loadPlayer();});};this.loadMedia=function(h){if(this.player){this.videoFile=h;this.player.loadMedia(h.path);d({type:"playerready"});}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){d({type:"playerready"});}};this.onMediaUpdate=function(h){d({type:this.translate[h]});};this.playMedia=function(){this.player.playMedia();};this.pauseMedia=function(){this.player.pauseMedia();};this.stopMedia=function(){this.player.stopMedia();};this.seekMedia=function(h){this.player.seekMedia(h);};this.setVolume=function(h){this.player.setVolume(h);};this.getVolume=function(){return this.player.getVolume();};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getBytesLoaded=function(){return this.player.getMediaBytesLoaded();};this.getBytesTotal=function(){return this.player.getMediaBytesTotal();};this.hasControls=function(){return true;};this.showControls=function(h){this.player.showPlugin("controlBar",h);this.player.showPlugin("playLoader",h);};this.getEmbedCode=function(){var h={config:"config",id:"mediafront_player",file:this.videoFile.path,skin:e.skin};if(this.videoFile.stream){h.stream=this.videoFile.stream;}return jQuery.media.utils.getFlash(e.flashplayer,"mediafront_player",e.embedWidth,e.embedHeight,h);};this.setQuality=function(h){};this.getQuality=function(){return"";};this.setSize=function(i,h){};this.getMediaLink=function(){return"This video currently does not have a link.";};})(this,c,b);};jQuery.fn.mediahtml5=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.bytesLoaded=0;this.bytesTotal=0;this.mediaType="";this.createMedia=function(h){jQuery.media.utils.removeFlash(this.display,e.id+"_media");this.display.children().remove();this.mediaType=this.getMediaType(h.extension);var i=e.id+"_"+this.mediaType;var j="<"+this.mediaType+' style="position:absolute" id="'+i+'" src="'+h.path+'"';j+=(this.mediaType=="video")?' width="'+this.display.width()+'px" height="'+this.display.height()+'px"':"";j+=">Unable to display media.</"+this.mediaType+">";this.display.append(j);this.player=this.display.find("#"+i).eq(0)[0];this.player.addEventListener("abort",function(){d({type:"stopped"});},true);this.player.addEventListener("loadstart",function(){d({type:"ready"});},true);this.player.addEventListener("loadedmetadata",function(){d({type:"meta"});},true);this.player.addEventListener("ended",function(){d({type:"complete"});},true);this.player.addEventListener("pause",function(){d({type:"paused"});},true);this.player.addEventListener("play",function(){d({type:"playing"});},true);this.player.addEventListener("error",function(){d({type:"error"});},true);this.player.addEventListener("progress",function(k){g.bytesLoaded=k.loaded;g.bytesTotal=k.total;},true);this.player.autoplay=true;this.player.autobuffer=true;d({type:"playerready"});};this.loadMedia=function(h){this.createMedia(h);};this.getMediaType=function(h){switch(h){case"ogg":case"ogv":case"mp4":case"m4v":return"video";case"oga":case"mp3":return"audio";}return"video";};this.playMedia=function(){this.player.play();};this.pauseMedia=function(){this.player.pause();};this.stopMedia=function(){this.pauseMedia();this.player.src="";};this.seekMedia=function(h){this.player.currentTime=h;};this.setVolume=function(h){this.player.volume=h;};this.getVolume=function(){return this.player.volume;};this.getDuration=function(){return this.player.duration;};this.getCurrentTime=function(){return this.player.currentTime;};this.getBytesLoaded=function(){return this.bytesLoaded;};this.getBytesTotal=function(){return this.bytesTotal;};this.setQuality=function(h){};this.getQuality=function(){return"";};this.hasControls=function(){return false;};this.showControls=function(h){};this.setSize=function(i,h){};this.getEmbedCode=function(){return"This media cannot be embedded.";};this.getMediaLink=function(){return"This media currently does not have a link.";};})(this,c,b);};jQuery.media.defaults=jQuery.extend(jQuery.media.defaults,{logo:"logo.png",logoWidth:49,logoHeight:15,logopos:"sw",logox:5,logoy:5,link:"http://www.mediafront.org",file:"",image:"",timeout:2000});jQuery.media.ids=jQuery.extend(jQuery.media.ids,{busy:".mediabusy",preview:".mediapreview",play:".mediaplay",media:".mediadisplay",control:".mediacontrol"});jQuery.fn.minplayer=function(b){if(this.length===0){return null;}return new (function(d,e){e=jQuery.media.utils.getSettings(e);this.display=d;var g=this;this.controller=null;this.activeController=null;this.busy=d.find(e.ids.busy);this.busyImg=this.busy.find("img");this.busyWidth=this.busyImg.width();this.busyHeight=this.busyImg.height();this.play=d.find(e.ids.play);this.play.bind("click",function(){g.showPlay(false);if(g.media&&g.media.playerReady){g.media.player.playMedia();}});this.playImg=this.play.find("img");this.playWidth=this.playImg.width();this.playHeight=this.playImg.height();this.preview=d.find(e.ids.preview).mediaimage();if(this.preview){this.preview.display.bind("imageLoaded",function(){g.onPreviewLoaded();});}this.usePlayerControls=false;this.busyVisible=true;this.playVisible=false;this.previewVisible=false;this.controllerVisible=true;this.hasMedia=false;this.width=this.display.width();this.height=this.display.height();this.showElement=function(j,h,i){if(j&&!this.usePlayerControls){if(h){j.show(i);}else{j.hide(i);}}};this.showPlay=function(h,i){this.playVisible=h;this.showElement(this.play,h,i);};this.showBusy=function(h,i){this.busyVisible=h;this.showElement(this.busy,h,i);};this.showPreview=function(h,i){this.previewVisible=h;if(this.preview){this.showElement(this.preview.display,h,i);}};this.showController=function(h,i){this.controllerVisible=h;if(this.controller){this.showElement(this.controller.display,h,i);}};this.onControlUpdate=function(h){if(this.media&&this.media.playerReady){switch(h.type){case"play":this.media.player.playMedia();break;case"pause":this.media.player.pauseMedia();break;case"seek":this.media.player.seekMedia(h.value);break;case"volume":this.media.player.setVolume(h.value);break;case"mute":this.media.mute(h.value);break;}if(e.template&&e.template.onControlUpdate){e.template.onControlUpdate(h);}}};this.fullScreen=function(h){if(e.template.onFullScreen){e.template.onFullScreen(h);}};this.onPreviewLoaded=function(){};this.onMediaUpdate=function(h){switch(h.type){case"paused":this.showPlay(true);this.showBusy(false);break;case"playing":this.showPlay(false);this.showBusy(false);this.showPreview((this.media.mediaFile.type=="audio"));break;case"initialize":this.showPlay(true);this.showBusy(true);this.showPreview(true);break;case"buffering":this.showPlay(true);this.showBusy(true);this.showPreview((this.media.mediaFile.type=="audio"));break;}if(this.controller){this.controller.onMediaUpdate(h);}if(this.activeController){this.activeController.onMediaUpdate(h);}if(e.template&&e.template.onMediaUpdate){e.template.onMediaUpdate(h);}this.display.trigger("mediaupdate",h);};this.addController=function(i,h){if(i){i.display.bind("controlupdate",i,function(j,k){g.activeController=j.data;g.onControlUpdate(k);});if(h&&!this.activeController){this.activeController=i;}}return i;};this.media=this.display.find(e.ids.media).mediadisplay(e);if(this.media){this.media.display.bind("mediaupdate",function(h,i){g.onMediaUpdate(i);});}this.controller=this.addController(this.display.find(e.ids.control).mediacontrol(e),false);if(jQuery.media.controllers&&jQuery.media.controllers[e.id]){var f=jQuery.media.controllers[e.id];var c=f.length;while(c--){this.addController(f[c],true);}}this.setSize=function(i,h){this.width=i?i:this.width;this.height=h?h:this.height;if(this.width&&this.height){this.setLogoPos();if(this.preview){this.preview.resize(this.width,this.height);}this.busy.css({width:this.width,height:this.height});this.busyImg.css({marginLeft:((this.width-this.busyWidth)/2)+"px",marginTop:((this.height-this.busyHeight)/2)+"px"});this.play.css({width:this.width,height:this.height});this.playImg.css({marginLeft:((this.width-this.playWidth)/2)+"px",marginTop:((this.height-this.playHeight)/2)+"px"});if(this.media){this.media.display.css({width:this.width,height:this.height});this.media.setSize(this.width,this.height);}}};this.showPlayerController=function(h){if(this.media&&this.media.hasControls()){this.usePlayerControls=h;if(h){this.busy.hide();this.play.hide();if(this.preview){this.preview.display.hide();}if(this.controller){this.controller.display.hide();}}else{this.showBusy(this.busyVisible);this.showPlay(this.playVisible);this.showPreview(this.previewVisible);this.showController(this.controllerVisible);}this.media.showControls(h);}};if(this.media){this.display.prepend('<div class="medialogo"></div>');this.logo=this.display.find(".medialogo").mediaimage(e.link);this.logo.display.css({position:"absolute",zIndex:10000});this.logo.width=e.logoWidth;this.logo.height=e.logoHeight;this.logo.loadImage(e.logo);}this.setLogoPos=function(){if(this.logo){var i=parseInt(this.media.display.css("marginTop"),0);var h=parseInt(this.media.display.css("marginLeft"),0);var k=(e.logopos=="se"||e.logopos=="sw")?(i+this.height-this.logo.height-e.logoy):i+e.logoy;var j=(e.logopos=="ne"||e.logopos=="se")?(h+this.width-this.logo.width-e.logox):h+e.logox;this.logo.display.css({marginTop:k,marginLeft:j});}};this.onResize=function(i,h){if(this.controller){this.controller.onResize(i,h);}this.setSize(this.width+i,this.height+h);};this.reset=function(){this.hasMedia=false;if(this.controller){this.controller.reset();}if(this.activeController){this.activeController.reset();}this.showPlay(false);this.showPreview(false);this.showBusy(true);};this.loadImage=function(h){if(this.preview){this.preview.loadImage(h);}};this.clearImage=function(){if(this.preview){this.preview.clear();}};this.loadFiles=function(h){this.reset();if(this.media){this.hasMedia=this.media.loadFiles(h);}return this.hasMedia;};this.playNext=function(){if(this.media){this.media.playNext();}};this.loadMedia=function(h){this.reset();if(this.media){this.media.loadMedia(h);}};if(e.file){this.loadMedia(e.file);}if(e.image){this.loadImage(e.image);}})(this,b);};window.onVimeoReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};window.onVimeoFinish=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onFinished();};window.onVimeoLoading=function(c,b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onLoading(c);};window.onVimeoPlay=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onPlaying();};window.onVimeoPause=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onPaused();};jQuery.fn.mediavimeo=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.ready=false;this.bytesLoaded=0;this.bytesTotal=0;this.currentVolume=1;this.createMedia=function(j){this.videoFile=j;this.ready=false;var i=(e.id+"_media");var h={clip_id:j.path,width:this.display.width(),height:this.display.height(),js_api:"1",js_onLoad:"onVimeoReady",js_swf_id:i};var k=Math.floor(Math.random()*1000000);var l="http://vimeo.com/moogaloop.swf?rand="+k;jQuery.media.utils.insertFlash(this.display,l,i,this.display.width(),this.display.height(),h,function(m){g.player=m;g.loadPlayer();});};this.loadMedia=function(h){this.bytesLoaded=0;this.bytesTotal=0;this.createMedia(h);};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){this.player.api_addEventListener("onFinish","onVimeoFinish");this.player.api_addEventListener("onLoading","onVimeoLoading");this.player.api_addEventListener("onPlay","onVimeoPlay");this.player.api_addEventListener("onPause","onVimeoPause");d({type:"playerready"});this.playMedia();}};this.onFinished=function(){d({type:"complete"});};this.onLoading=function(h){this.bytesLoaded=h.bytesLoaded;this.bytesTotal=h.bytesTotal;};this.onPlaying=function(){d({type:"playing"});};this.onPaused=function(){d({type:"paused"});};this.playMedia=function(){d({type:"buffering"});this.player.api_play();};this.pauseMedia=function(){this.player.api_pause();};this.stopMedia=function(){this.pauseMedia();this.player.api_unload();};this.seekMedia=function(h){this.player.api_seekTo(h);};this.setVolume=function(h){this.currentVolume=h;this.player.api_setVolume((h*100));};this.getVolume=function(){return this.currentVolume;};this.getDuration=function(){return this.player.api_getDuration();};this.getCurrentTime=function(){return this.player.api_getCurrentTime();};this.getBytesLoaded=function(){return this.bytesLoaded;};this.getBytesTotal=function(){return this.bytesTotal;};this.setQuality=function(h){};this.getQuality=function(){return"";};this.hasControls=function(){return true;};this.showControls=function(h){};this.setSize=function(i,h){};this.getEmbedCode=function(){return"This video cannot be embedded.";};this.getMediaLink=function(){return"This video currently does not have a link.";};})(this,c,b);};window.onYouTubePlayerReady=function(b){b=b.replace("_media","");jQuery.media.players[b].node.player.media.player.onReady();};jQuery.fn.mediayoutube=function(c,b){return new (function(f,e,d){this.display=f;var g=this;this.player=null;this.videoFile=null;this.loaded=false;this.ready=false;this.createMedia=function(i){this.videoFile=i;this.ready=false;var h=(e.id+"_media");var j=Math.floor(Math.random()*1000000);var k="http://www.youtube.com/apiplayer?rand="+j+"&amp;version=3&amp;enablejsapi=1&amp;playerapiid="+h;jQuery.media.utils.insertFlash(this.display,k,h,this.display.width(),this.display.height(),{},function(l){g.player=l;g.loadPlayer();});};this.loadMedia=function(h){if(this.player){this.loaded=false;this.videoFile=h;d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onReady=function(){this.ready=true;this.loadPlayer();};this.loadPlayer=function(){if(this.ready&&this.player){window[e.id+"StateChange"]=function(h){g.onStateChange(h);};window[e.id+"PlayerError"]=function(h){g.onError(h);};window[e.id+"QualityChange"]=function(h){g.quality=h;};this.player.addEventListener("onStateChange",e.id+"StateChange");this.player.addEventListener("onError",e.id+"PlayerError");this.player.addEventListener("onPlaybackQualityChange",e.id+"QualityChange");d({type:"playerready"});this.player.loadVideoById(this.videoFile.path,0);}};this.onStateChange=function(i){var h=this.getPlayerState(i);d({type:h});if(!this.loaded&&h=="playing"){this.loaded=true;d({type:"meta"});}};this.onError=function(i){var h="An unknown error has occured: "+i;if(i==100){h="The requested video was not found.  ";h+="This occurs when a video has been removed (for any reason), ";h+="or it has been marked as private.";}else{if((i==101)||(i==150)){h="The video requested does not allow playback in an embedded player.";}}console.log(h);d({type:"error",data:h});};this.getPlayerState=function(h){switch(h){case 5:return"ready";case 3:return"buffering";case 2:return"paused";case 1:return"playing";case 0:return"complete";case -1:return"stopped";default:return"unknown";}return"unknown";};this.setSize=function(i,h){};this.playMedia=function(){d({type:"buffering"});this.player.playVideo();};this.pauseMedia=function(){this.player.pauseVideo();};this.stopMedia=function(){this.player.stopVideo();};this.seekMedia=function(h){d({type:"buffering"});this.player.seekTo(h,true);};this.setVolume=function(h){this.player.setVolume(h*100);};this.setQuality=function(h){this.player.setPlaybackQuality(h);};this.getVolume=function(){return(this.player.getVolume()/100);};this.getDuration=function(){return this.player.getDuration();};this.getCurrentTime=function(){return this.player.getCurrentTime();};this.getQuality=function(){return this.player.getPlaybackQuality();};this.getEmbedCode=function(){return this.player.getVideoEmbedCode();};this.getMediaLink=function(){return this.player.getVideoUrl();};this.getBytesLoaded=function(){return this.player.getVideoBytesLoaded();};this.getBytesTotal=function(){return this.player.getVideoBytesTotal();};this.hasControls=function(){return false;};this.showControls=function(h){};})(this,c,b);};})(jQuery);