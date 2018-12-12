(function(){window['HYPE_596'] = (function HYPE(_documentName,
_mainContentContainerID,
_resources,
_resourcesFolderName,
_headAdditions,
_functions,
_sceneContainers,
_scenes,
_persistentSymbolDescendants,
_javascriptMapping,
_timingFunctionsInfo,
_loadingScreenFunction,
_hasPhysics,
_drawSceneBackgrounds,
_initialSceneIndex,
_useGraphicsAcceleration,
_useCSSReset,
_useCSSPositioning,
_useTouchEvents) {

///////////////////////////////////////////////////////////////
// constants

var _hype = this;
var _mainContentContainer = document.getElementById(_mainContentContainerID);

//_hype['name'] = "hype main object";
//_hype['version'] = 596;

var kActionNone = 0;
var kActionJumpToScene = 1;
var kActionPresentMedia = 2;
var kActionStartTimeline = 3;
var kActionRunJavascript = 4;
var kActionVisitURL = 5;
var kActionComposeEmail = 6;
var kActionPauseTimeline = 7;
var kActionContinueTimeline = 8;
var kActionGoToTimeInTimeline = 9;
var kActionControlTimeline = 10;
var kActionControlElementPosition = 11;
var kActionPlaySound = 12;
var kActionPauseSound = 13;
var kActionTriggerCustomBehavior = 14;
var kActionRunFunction = 15;
var kJumpToSceneOther = 0;
var kJumpToSceneNext = 1;
var kJumpToScenePrevious = 2;
var kJumpToSceneFirst = 3;
var kJumpToSceneLast = 4;
var kSceneTransitionNone = 0;
var kSceneTransitionInstant = 1;
var kSceneTransitionCrossfade = 2;
var kSceneTransitionSwap = 3;
var kSceneTransitionPushLeftToRight = 4;
var kSceneTransitionPushRightToLeft = 5;
var kSceneTransitionPushBottomToTop = 6;
var kSceneTransitionPushTopToBottom = 7;
var kAnimationTypeStandardKeyframe = 0;
var kAnimationTypeVideo = 1;
var kAnimationTypeTimelineAction = 2;
var kAnimationTypeElementAction = 3;
var kResourcePreloadTypeNone = 0;
var kResourcePreloadTypeImage = 1;
var kResourcePreloadTypeAudio = 2;
var kTimelineDefaultIdentifier = "kTimelineDefaultIdentifier";
var kDirectionForward = 0;
var kDirectionReverse = 1;
var NSViewNotSizable = 0;
var NSViewMinXMargin = 1;
var NSViewWidthSizable = 2;
var NSViewMaxXMargin = 4;
var NSViewMinYMargin = 8;
var NSViewHeightSizable = 16;
var NSViewMaxYMargin = 32;
var kHypeViewScaleShrink = 64;
var kHypeViewScaleExpand = 128;
var kHypeViewScaleZoomContents = 256;
var kWaypointHandlerIdentifiers = ['cW', 'cX'];
var kActionHandlerIdentifiers = ['aA', 'aD', 'aC', 'aE', 'aB', 'bN', 'aM', 'aN', 'bT', 'cV'];

var kPublicPropertyMapping = {
"top" : {"HYP_r" : "b"/*, "HYP_s" : 0*/}, // commenting out because it won't be used, so don't bloat the runtime
"left" : {"HYP_r" : "a"/*, "HYP_s" : 0*/},
"width" : {"HYP_r" : "c"/*, "HYP_s" : 0*/},
"height" : {"HYP_r" : "d"/*, "HYP_s" : 0*/},
"background-image" : {"HYP_r" : "cZ"/*, "HYP_s" : 0*/},
"rotateZ" : {"HYP_r" : "f", "HYP_s" : 0},
"scaleX" : {"HYP_r" : "cQ", "HYP_s" : 1},
"scaleY" : {"HYP_r" : "cR", "HYP_s" : 1},
"z-index" : {"HYP_r" : "z"/*, "HYP_s" : 0*/},
"opacity" : {"HYP_r" : "e", "HYP_s" : 1}
};

///////////////////////////////////////////////////////////////
// module-wide variables

var _currentSceneContainerIndex = 0;
var _currentSceneIndex = 0;
var _timelineRuns = Array();
var _activeTimelineRuns = Array();
var _timelineRunOwnershipOfPropertiesByElement = {};
var _dragOwnershipOfPropertiesByElement = {};
var _symbolActionOwnershipOfTimelineWithIdentifier = {};
var _symbols = {};
var _hiddenPersistentSymbolsContainerID = 'HYPE_persistent_symbols';
var _persistentSymbols = {};
var _animationFrameRequested = false;
var _fps = 60;
var _resourceGroups = {};
var _resourceIDsToPreload = Array();
var _isPreloadNextResourceQueued = false;
var _currentValues = {};
var _buttonRestorationValues = {};
var _mouseOverElementFunctions = Array();
var _currentSceneActionHandlers = {};
var _timelineCompletionOverrideCallback = null;
var _timelineIdentifierForCompletionOverrideCallback = null;
var _idMapping = {}; // hype element oids to DOM ids
var _idReverseMapping = {}; // DOM ids to hype element oids
var _idActualMapping = {}; // User proposed DOM ids to the actual DOM ids we set
var _documentUID = 0;
var _inSceneTransition = false;
var _eventHandlers = Array();
var _motionPaths = {};
var _timingFunctions = {};
var _hasShownInitialScene = false;

var _usesFlexibleLayout = false;
var _shouldQueueFrameUpdates = false;
var _shouldQueueWaypointUpdates = false;
var _elementsNeedingFrameUpdates = []; // array because ordering matters in how they are updated (parent must happen before child, #11822)
var _browserReportedSizeCache = {};
var _customBehaviorObserversByName = {};
var _standardTimingFunctions = { 'd' : [[0,0, 0.42,0, 1,1, 1,1]], 'e' : [[0,0, 0,0, 0.58,1, 1,1]], 'c' : [[0,0, 0.42,0, 0.58,1, 1,1]]};
var _showingCurrentLayout = false;
var _updatingCurrentLayoutFromRelayoutIfNecessary = false;
var _waypoint = window['HYPE_w_596'];
var _activeWaypoints = [];
var _waypointRefreshRequested = false;


///////////////////////////////////////////////////////////////
// substitutions for file size optimization

_hype.kSizeOptimizationHexAlphabet = "0123456789ABCDEF";
_hype.kSizeOptimizationWebKitPrefix = "-webkit-";



///////////////////////////////////////////////////////////////
// gesture handling

var kPhaseStart = "start";
var kPhaseMove = "move";
var kPhaseEnd = "end";
var kPhaseCancel = "cancel";
// there is a dependency on the left; right; up; down constants remaining the same when creating the Swipe Type for the faux event
var kLeft = "left";
var kRight = "right";
var kUp = "up";
var kDown = "down";
var kGestureDrag = "drag";
var kGestureSwipe = "swipe";
var kGestureTap = "tap";
var kCancelEventName = 'touchcancel';
var _currentlyHandlingDragGesture = false;
var _receivedGestureMove = 0;
var _firedMouseClickActionAfterGesture = false;
var _touchEventCoordinates = Array();


///////////////////////////////////////////////////////////////
// methods

var _log = function (value) {
if (window.console) {
window.console.log(value);
}
};

_hype['z_o'] = function (e) {
if (_documentUID == 0) {
// Generate a random unique ID for this document.
_documentUID = randomUID();
}

if(_loadingScreenFunction != null) {
_loadingScreenFunction(true, _mainContentContainer);
}

_useGraphicsAcceleration = _useGraphicsAcceleration && _browserInfo.webkit != null;

// workaround for <rdar://problem/28359335> iOS 10 regression: dynamically created touchmove handler cannot prevent scrolling
// passive as false is now required as iOS 11.3 has passive as true by default and it breaks this workaround without it
if(_browserInfo.ios != null) {
document.body.addEventListener('touchmove', (function () {}), (_browserInfo.supportsPassive ? {'passive': false} : false));
}

// this allows us to use the animation system to animate the size of the main container
_idMapping[_mainContentContainerID] = _mainContentContainerID;
_idReverseMapping[_mainContentContainerID] = _mainContentContainerID;
_idActualMapping[_mainContentContainerID] = _mainContentContainerID;
_mainContentContainer.style.width = transformValuePixel(_scenes[0]["Y"]);
_mainContentContainer.style.height = transformValuePixel(_scenes[0]["Z"]);

cleanupInternalDataRepresentation();
addGeneratedCSS(".HYPE_element{\
-webkit-transform:rotateY(0);\
}\
\
video.HYPE_element{\
-webkit-transform:none;\
}\
\
^{\
color:#000;\
\
`size:16px;\
`weight:normal;\
`family:Helvetica,Arial,Sans-Serif;\
`weight:normal;\
`style:normal;\
`variant:normal;\
\
text-decoration:none;\
text-align:left;\
text-transform:none;\
text-indent:0;\
text-shadow:none;\
\
line-height:normal;\
letter-spacing:normal;\
white-space:normal;\
word-spacing:normal;\
@:baseline;\
\
border:none;\
background-color:transparent;\
background-image:none;\
\
-webkit-`smoothing:antialiased;\
-moz-backface-visibility:hidden;\
}");
if(_useCSSReset == true) {
addGeneratedCSS("^div,^span,^applet,^object,^iframe,\
^h1,^h2,^h3,^h4,^h5,^h6,^p,^blockquote,^pre,\
^a,^abbr,^acronym,^address,^big,^cite,^code,\
^del,^dfn,^em,^img,^ins,^kbd,^q,^s,^samp,\
^small,^strike,^strong,^sub,^sup,^tt,^var,\
^b,^u,^i,^center,\
^dl,^dt,^dd,^ol,^ul,^li,\
^fieldset,^form,^label,^legend,\
^table,^caption,^tbody,^tfoot,^thead,^tr,^th,^td,\
^article,^aside,^canvas,^details,^embed,\
^figure,^figcaption,^footer,^header,^hgroup,\
^menu,^nav,^output,^ruby,^section,^summary,\
^time,^mark,^audio,^video{\
\
color:?;\
\
`size:?;\
`weight:?;\
`family:?;\
`weight:?;\
`style:?;\
`variant:?;\
\
text-decoration:?;\
text-align:?;\
text-transform:?;\
text-indent:?;\
text-shadow:?;\
\
line-height:?;\
letter-spacing:?;\
white-space:?;\
word-spacing:?;\
@:?;\
\
border:none;\
background-color:transparent;\
background-image:none;\
\
padding:0;\
box-sizing:content-box;\
}\
\
^p{\
display:block;\
$:1em 0;\
}\
\
^div,^layer{\
display:block;\
}\
\
^article,^aside,^footer,^header,^hgroup,^nav,^section{\
display:block;\
}\
\
^blockquote{\
display:block;\
$:1em 40px;\
}\
\
^figcaption{\
display:block;\
}\
\
^figure{\
display:block;\
$:1em 40px;\
}\
\
^q{\
display:inline;\
}\
\
^q:before{\
content:open-quote;\
}\
\
^q:after{\
content:close-quote;\
}\
\
^center{\
display:block;\
text-align:center;\
}\
\
^hr{\
display:block;\
$:.5em auto;\
border-style:inset;\
border-width:1px;\
}\
\
^h1,^h2,^h3,^h4,^h5,^h6{\
display:block;\
$-left:0;\
$-right:0;\
`weight:bold;\
}\
\
^h1{\
`size:2em;\
$-top:.67em;\
$|:.67em;\
}\
\
^h2{\
`size:1.5em;\
$-top:.83em;\
$|:.83em;\
}\
\
^h3{\
`size:1.17em;\
$-top:1em;\
$|:1em;\
}\
\
^h4{\
$-top:1.33em;\
$|:1.33em;\
}\
\
^h5{\
`size:.83em;\
$-top:1.67em;\
$|:1.67em;\
}\
\
^h6{\
`size:.67em;\
$-top:2.33em;\
$|:2.33em;\
}\
\
^table{\
display:table;\
border-collapse:separate;\
border-spacing:2px;\
border-color:gray;\
}\
\
^thead{\
display:table-header-group;\
@:middle;\
border-color:?;\
}\
\
^tbody{\
display:table-row-group;\
@:middle;\
border-color:?;\
}\
\
^tfoot{\
display:table-footer-group;\
@:middle;\
border-color:?;\
}\
\
^col{\
display:table-column;\
}\
\
^colgroup{\
display:table-column-group;\
}\
\
^tr{\
display:table-row;\
@:?;\
border-color:?;\
}\
\
^td,^th{\
display:table-cell;\
@:?;\
}\
\
^th{\
`weight:bold;\
}\
\
^caption{\
display:table-caption;\
text-align:center;\
}\
\
^ul,^menu,^dir{\
display:block;\
list-style-type:disc;\
$:1em 0;\
padding-left:40px;\
}\
\
^ol{\
display:block;\
list-style-type:decimal;\
$:1em 0;\
padding-left:40px;\
}\
\
^li{\
display:list-item;\
$:0;\
}\
\
^ul ul,^ol ul{\
list-style-type:circle;\
}\
\
^ol ol ul,^ol ul ul,^ul ol ul,^ul ul ul{\
list-style-type:square;\
}\
\
^dd{\
display:block;\
$-left:40px;\
}\
\
^dl{\
display:block;\
$:1em 0;\
}\
\
^dt{\
display:block;\
}\
\
^ol ul,^ul ol,^ul ul,^ol ol{\
$-top:0;\
$|:0;\
}\
\
^u,^ins{\
text-decoration:underline;\
}\
\
^strong,^b{\
`weight:bolder;\
}\
\
^i,^cite,^em,^var,^address{\
`style:italic;\
}\
\
^tt,^code,^kbd,^samp{\
`family:monospace;\
}\
\
^pre,^xmp,^plaintext,^listing{\
display:block;\
`family:monospace;\
white-space:pre;\
$:1em 0;\
}\
\
^mark{\
background-color:yellow;\
color:black;\
}\
\
^big{\
`size:larger;\
}\
\
^small{\
`size:smaller;\
}\
\
^s,^strike,^del{\
text-decoration:line-through;\
}\
\
^sub{\
@:sub;\
`size:smaller;\
}\
\
^sup{\
@:super;\
`size:smaller;\
}\
\
^nobr{\
white-space:nowrap;\
}\
\
^a{\
color:blue;\
text-decoration:underline;\
cursor:pointer;\
}\
\
^a:active{\
color:red;\
}\
\
^noframes{\
display:none;\
}\
\
^frameset,^frame{\
display:block;\
}\
\
^frameset{\
border-color:?;\
}\
\
^iframe{\
border:0;\
}\
\
^details{\
display:block;\
}\
\
^summary{\
display:block;\
}");
}
addHeadAdditions();
createSceneDivs();
createMotionPaths();
createTimingFunctions();



createResourceGroups();
preloadResources();

if(window.addEventListener) {
window.addEventListener("resize", (function () { _showingCurrentLayout = false; relayoutIfNecessary(); }));
window.addEventListener("pageshow", (function () { window.setTimeout(relayoutIfNecessary, 1); })); // workaround for Safari not getting new window size when hitting back button #5918
} else if(window.attachEvent) {
window.attachEvent("onresize", (function () { _showingCurrentLayout = false; relayoutIfNecessary(); }));
}
if (_useTouchEvents) {
_mainContentContainer.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
if (_mainContentContainer.addEventListener) {
_mainContentContainer.addEventListener("click", contentContainerClickHandler, true);
_mainContentContainer.addEventListener("mouseup", contentContainerClickHandler, true);
_mainContentContainer.addEventListener("mousedown", contentContainerClickHandler, true);
_mainContentContainer.addEventListener("mouseover", contentContainerClickHandler, true);
}
}
};

var randomUID = function(length) {
var result = "";
var chars = _hype.kSizeOptimizationHexAlphabet + "GHIJKLMNOPQRSTUVWXYZ"; /* we know _hype.kSizeOptimizationHexAlphabet is "0123456789ABCDEF" */
for (var i = 0; i < 20; i++) {
var r = Math.floor(Math.random() * chars.length);
result += chars.substring(r, r+1);
}
return result;
};

var clockTime = function () {

return Date.now();


};

var getElementByHypeOid = function (oid) {
return document.getElementById(_idMapping[oid]);
};

var clockTimeInSeconds = function () {
return (clockTime() / 1000.0);
};

var createIdMapping = function (hypeOid, proposedDomId, suggestedPrefix) {
var domId = proposedDomId;

if(domId == null || document.getElementById(domId) != null) {
do {
domId = suggestedPrefix + randomUID();
} while(document.getElementById(domId) != null);
}

_idMapping[hypeOid] = domId;
_idReverseMapping[domId] = hypeOid;
_idActualMapping[(proposedDomId != null) ? proposedDomId : domId] = domId;

return domId;
};

var getElementById = function (id) { // public, do not change signature without wrapping in _hype['API']!
var domId = _idActualMapping[id];
if(domId == null) {
domId = id;
}
return document.getElementById(domId);
};

var isSymbolElement = function (element) {
var sceneIndex = sceneIndexForElement(element);
if(_scenes[sceneIndex]["U"][_idReverseMapping[element.id]] != null || getElementAttribute(element, "cL") != null) {
return true;
}
return false;
};

var refreshAllWaypoints = function() {
if(_waypoint == null || _waypointRefreshRequested == true) {
return;
}
_waypointRefreshRequested = true;

window.setTimeout(function() {
_waypointRefreshRequested = false;
_waypoint['refreshAll']();
}, 0);
};

var beginFrameUpdateQueue = function () {
_shouldQueueFrameUpdates = true;
};

var drainFrameUpdateQueue = function () {
_shouldQueueFrameUpdates = false;
_shouldQueueWaypointUpdates = true;
for(var i = 0; i < _elementsNeedingFrameUpdates.length; i++) {
updateFrame(_elementsNeedingFrameUpdates[i]);
}
_shouldQueueWaypointUpdates = false;
refreshAllWaypoints();
_elementsNeedingFrameUpdates = [];
};

var shouldUseTranslatesForElement = function (element) {
return ((_browserInfo.webkit != null || _browserInfo.ff >= 3.5 || _browserInfo.ie >= 10) && getElementAttribute(element, "HYP_m") == "1");
};

var shouldUseContainersForElement = function (element) {
return (_browserInfo.supports3D == true && (_browserInfo.ie == null || _browserInfo.ie >= 11.0));
};

// null as elementOid means the current scene div
var currentSizeForElementOid = function (elementOid) {
var width = 0;
var height = 0;
if (elementOid == null) {
var element = document.getElementById(_idMapping[elementOid]);
var sceneIndex = sceneIndexForElement(element);
width = _scenes[sceneIndex]["Y"];
height = _scenes[sceneIndex]["Z"];
} else {
width = currentWidthForElementWithOid(elementOid);
height = currentHeightForElementWithOid(elementOid);
}
return { "width" : width, "height" : height };
};

// null as elementOid means the current scene div
var browserReportedSizeForElementOid = function (elementOid) {
var elementID = _idMapping[currentSceneIdentifier()]; // default value
if(elementOid != null) {
elementID = _idMapping[elementOid];
}

var size = _browserReportedSizeCache[elementID];
if(size == null) {
var element = document.getElementById(elementID);
size = { "width" : element.offsetWidth, "height" : element.offsetHeight };
_browserReportedSizeCache[elementID] = size;
}
return size;
};

var invalidateBrowserReportedSizeCacheForElement = function (element) {
_browserReportedSizeCache[element.id] = null;
};

var sceneRepresentationIndexForSceneContainer = function (sceneContainer) {
var sceneInfos = sceneInfosForSceneContainer(sceneContainer);
var bestSceneRepresentationIndex = sceneInfos[0]["_"];
if (sceneInfos.length != 1) {
var mainContainer = _mainContentContainer.parentElement;
var containerSize = { "width" : mainContainer.offsetWidth, "height" : mainContainer.offsetHeight };
if (containerSize.width != 0) {
for (var i = 0; i < sceneInfos.length; i++) {
if (sceneInfos[i]["breakpoint"] > containerSize.width) {
break;
}
bestSceneRepresentationIndex = sceneInfos[i]["_"];
}
}
}

var layoutName = _scenes[bestSceneRepresentationIndex]["n"];
var hypeLayoutWillLoadFauxEvent = {"type":"HypeLayoutRequest", "layoutName" : layoutName, "sceneName" : sceneContainer["n"]};
var replacementLayoutName = notifyEvent(hypeLayoutWillLoadFauxEvent, _mainContentContainer);
if(typeof replacementLayoutName === "string" && replacementLayoutName != layoutName) {
 var replacementSceneIndex = sceneIndexForLayoutName(replacementLayoutName, sceneContainer);
 if(replacementSceneIndex != -1) {
bestSceneRepresentationIndex = replacementSceneIndex;
 }
}

return bestSceneRepresentationIndex;
}

var relayoutIfNecessary = function () { // public, do not change signature without wrapping in _hype['API']!
if(_resourceIDsToPreload.length > 0) {
// do not relayout if we are not done with preloading
return;
}

if (_showingCurrentLayout == false && _updatingCurrentLayoutFromRelayoutIfNecessary == false) {
_updatingCurrentLayoutFromRelayoutIfNecessary = true;
var sceneContainer = _sceneContainers[_currentSceneContainerIndex];
var bestSceneRepresentationIndex = sceneRepresentationIndexForSceneContainer(sceneContainer);
if (_currentSceneIndex != bestSceneRepresentationIndex) {
showSceneRepresentation(bestSceneRepresentationIndex, kSceneTransitionInstant, 0);
}
_updatingCurrentLayoutFromRelayoutIfNecessary = false;
}

if(_usesFlexibleLayout == true) {
relayoutIfNecessaryUsingParentOid(null);


}
};

var relayoutIfNecessaryUsingParentOid = function (parentOid) {
if(_usesFlexibleLayout == false) {
return;
}

_browserReportedSizeCache = {};

var children = childrenOidsForElementOid(parentOid);
for(var i = 0; i < children.length; i++) {
var childOid = children[i];
var elementElement = getElementByHypeOid(childOid);
updateFrame(elementElement);
relayoutIfNecessaryUsingParentOid(childOid);
}
};

var parentOidForElementOid = function (childOid) {
var sceneIndex = sceneIndexForElement(document.getElementById(_idMapping[childOid]));
var element = _scenes[sceneIndex]["v"][childOid];
if(element == null) {
return null;
}
return element["bF"];
};

var childrenOidsForElementOid = function (parentOid) {
var children = [];
var sceneIndex = sceneIndexForElement(document.getElementById(_idMapping[parentOid]));
var elements = _scenes[sceneIndex]["v"];
for(var key in elements) {
if(elements.hasOwnProperty(key) == false) {
continue;
}

var element = elements[key];
if(element["bF"] == parentOid) {
children.push(key);
}
}
return children;
};

var sceneIndexForElement = function (element) {
var sceneIndex = _currentSceneIndex;
if(element != null) {
var sceneIndexDOMAttribute = element.getAttribute("HYPE_scene_index");
if(sceneIndexDOMAttribute != null) {
sceneIndex = parseInt(sceneIndexDOMAttribute);
}
}
return sceneIndex;
}

var createContainerForDomElement = function (domElement, initialValues, perspective) {
var elementContainerDiv = document.createElement("div");
var elementContainerDivStyle = elementContainerDiv.style;
elementContainerDiv.className = "HYPE_element_container";
elementContainerDivStyle.position = "absolute";
elementContainerDivStyle.top = "0";
elementContainerDivStyle.left = "0";
elementContainerDivStyle.width = "100%";
elementContainerDivStyle.height = "100%";

if(initialValues['bR'] != null || initialValues['aY'] != null) { // x or y
// partial workaround for <rdar://problem/9973514> Hardware compositing breaks full screen video in Safari 5.1
elementContainerDivStyle["-webkit-perspective"] = perspective;
elementContainerDivStyle["MozPerspective"] = perspective;
elementContainerDivStyle["perspective"] = perspective;
}

elementContainerDivStyle["pointerEvents"] = "none";
elementContainerDivStyle["pointer-events"] = "none";

elementContainerDiv.appendChild(domElement);
return elementContainerDiv;
}

var createSceneDivs = function () {
var persistentSymbolContainer = document.createElement('div');
persistentSymbolContainer.id = _hiddenPersistentSymbolsContainerID;
persistentSymbolContainer.style.display = 'none';
persistentSymbolContainer.setAttribute("aria-hidden", true);
_mainContentContainer.appendChild(persistentSymbolContainer);

for(var i = 0; i < _scenes.length; i++) {
var scene = _scenes[i];
var sceneDiv = document.createElement("div");
var sceneDivStyle = sceneDiv.style;
sceneDiv.className = "HYPE_scene";
sceneDiv.id = createIdMapping(scene["o"], null, "hype-scene-");
sceneDiv.setAttribute("HYPE_scene_index", scene["_"]);
if(_drawSceneBackgrounds != false) {
sceneDivStyle.backgroundColor = sanitizeColor(scene["c"]);
}
sceneDivStyle.display = "none";
sceneDiv.setAttribute("aria-hidden", true);
sceneDivStyle.overflow = "hidden";
sceneDivStyle.position = "absolute";
sceneDivStyle.width = transformValuePixel(scene["Y"]);
sceneDivStyle.height = transformValuePixel(scene["Z"]);
if(_browserInfo.supports3D == true && _browserInfo.ie < 11.0) { // ie 10 3d support, doesn't use containers since there is no pointer-events in IE (see #3554)
sceneDivStyle["perspective"] = scene["p"];
}
_mainContentContainer.appendChild(sceneDiv);

var elements = scene["v"];
// create the persistent symbol elements first so that their descendants can be added the the proper container
for (var elementOid in elements) {
if (elements.hasOwnProperty(elementOid) == false) {
continue;
}
var element = elements[elementOid];
var persistentSymbolOid = element['cL'];
if (persistentSymbolOid && _persistentSymbols[persistentSymbolOid] == null) {
var sceneTimelines = scene["T"];
var symbolTimelines = Array();
for (var timelineIdentifier in sceneTimelines) {
if (sceneTimelines.hasOwnProperty(timelineIdentifier) == false) {
continue;
}
var timelineInfo = scene["T"][timelineIdentifier];
var animations = timelineInfo["a"];
if (timelineInfo["s"] == persistentSymbolOid) {
var timelineRun = createTimelineRun(timelineIdentifier, animations, timelineInfo, persistentSymbolOid);
symbolTimelines.push(timelineRun);
}
}
var elementElement = document.createElement(element['k']);
elementElement.className = (element['cP']) ? "HYPE_element Hype_scene " + element['cP'] : "HYPE_element HYPE_scene";
elementElement.id = createIdMapping(elementOid, element['i'], "hype-obj-");
elementElement.setAttribute("HYPE_scene_index", scene["_"]);
elementElement.style["pointerEvents"] = "auto";
elementElement.style["pointer-events"] = "auto";
if (element['w'] != null) {
elementElement.innerHTML = element['w'];
}
if(shouldUseContainersForElement(elementElement)) { // 3d support
var elementContainerDiv = createContainerForDomElement(elementElement, element, scene["p"]);
elementContainerDiv.setAttribute("HYPE_scene_index", scene["_"]);
persistentSymbolContainer.appendChild(elementContainerDiv);
} else {
persistentSymbolContainer.appendChild(elementElement);
}
_persistentSymbols[persistentSymbolOid] = {element: elementElement, timelineRuns: symbolTimelines, displayOnTop: element['cS'], initialValuesHaveBeenSet: false, customBehaviors: Array()};
}
}

var insertionOrder = scene["O"];
for(var index = 0; index < insertionOrder.length; index++) {
var elementOid = insertionOrder[index];
if(elements.hasOwnProperty(elementOid) == false) {
continue;
}

var element = elements[elementOid];
var persistentSymbolOid = element['cL'];
if (element["cM"] == true || persistentSymbolOid) {
continue;
}
var elementElement = document.createElement(element['k']);
elementElement.className = (element['cP']) ? "HYPE_element " + element['cP'] : "HYPE_element";
elementElement.id = createIdMapping(elementOid, element['i'], "hype-obj-");
elementElement.setAttribute("HYPE_scene_index", scene["_"]);
elementElement.style["pointerEvents"] = "auto";
elementElement.style["pointer-events"] = "auto";

if(element['w'] != null) {
elementElement.innerHTML = element['w'];
}

var persistentSymbolParentOid = null;
for (var parentOid in _persistentSymbolDescendants) {
if (_persistentSymbolDescendants.hasOwnProperty(parentOid) == false) {
continue;
}
for (var j = 0; j < _persistentSymbolDescendants[parentOid].length; j++) {
if (elementOid == _persistentSymbolDescendants[parentOid][j]) {
persistentSymbolParentOid = parentOid;
break;
}
}
if (persistentSymbolParentOid != null) {
break;
}
}

if(shouldUseContainersForElement(elementElement)) { // 3d support
var elementContainerDiv = createContainerForDomElement(elementElement, element, scene["p"]);
if (persistentSymbolParentOid) {
_persistentSymbols[persistentSymbolParentOid].element.appendChild(elementContainerDiv);
} else {
sceneDiv.appendChild(elementContainerDiv);
}
} else {
if (persistentSymbolParentOid) {
_persistentSymbols[persistentSymbolParentOid].element.appendChild(elementElement);
} else {
sceneDiv.appendChild(elementElement);
}
}
}
}
};

var distanceBetweenPoints = function (p1, p2) {
return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
};

var linearInterpolationBetweenPoints = function (p1, p2, time) {
return {
x: (p1.x + (p2.x - p1.x) * time),
y: (p1.y + (p2.y - p1.y) * time),
rotationAngle: 0
};
};

var rotationAngleBetweenPoints = function (p1, p2) {
var rotationAngle = 0;
if (p2.x == p1.x) {
rotationAngle = (p2.y >= p1.y) ? 90 : -90;
} else {
rotationAngle = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) * 180 / Math.PI;
}
if (p2.x < p1.x) {
rotationAngle += 180;
}
return rotationAngle;
};

var pointAtPercentForBezierCurve = function (curve, percent, rotationAngle) {
var linearInterpolationBetweenPointsFunction = linearInterpolationBetweenPoints;
var ab = linearInterpolationBetweenPointsFunction(curve.startPoint, curve.startControlPoint, percent);
var bc = linearInterpolationBetweenPointsFunction(curve.startControlPoint, curve.endControlPoint, percent);
var cd = linearInterpolationBetweenPointsFunction(curve.endControlPoint, curve.endPoint, percent);
var abbc = linearInterpolationBetweenPointsFunction(ab, bc, percent);
var bccd = linearInterpolationBetweenPointsFunction(bc, cd, percent);
var result = linearInterpolationBetweenPointsFunction(abbc, bccd, percent);
var flip = false;
var comparisonPoint = bccd;
if (bccd.x == result.x && bccd.y == result.y) {
if (ab.x == result.x && ab.y == result.y) {
comparisonPoint = cd;
} else {
comparisonPoint = ab;
flip = true;
}
}
result.rotationAngle = rotationAngleBetweenPoints(result, comparisonPoint);
 
if (flip == true) {
result.rotationAngle += 180;
}

return result;
};

var firstPointAtXLocationForBezierCurves = function (curves, x) {
var previousPoint = null;
var lastPoint = null;
for (var i = 0; i < curves.length; i++) {
var curve = curves[i];
for (var j = 0; j < curve.interpolationPoints.length; j++) {
var interpolationPoint = curve.interpolationPoints[j];
if (interpolationPoint.location.x >= x) {
if (previousPoint != null) {
return previousPoint.location.y + (interpolationPoint.location.y - previousPoint.location.y) * (x - previousPoint.location.x) / (interpolationPoint.location.x - previousPoint.location.x);
} else {
return interpolationPoint.location.y;
}
}
previousPoint = interpolationPoint;
lastPoint = interpolationPoint;
}
previousPoint = null;
}
return lastPoint.location.y;
};

var calculateInterpolationPointsForBezierCurves = function (bezierCurves, calculateLength) {
var totalLength = 0;
for (var index = 0; index < bezierCurves.length; index++) {
var bezierCurve = bezierCurves[index];
var totalCurveLength = 0;
var previousPoint = bezierCurve.startPoint;
for (var i = 0; i < 100; i++) {
var t = i / (100 - 1.0);
var location = pointAtPercentForBezierCurve(bezierCurve, t);
var bezierPoint = { };
bezierPoint.location = location;
if (calculateLength) {
var length = distanceBetweenPoints(location, previousPoint);
totalCurveLength += length;
bezierPoint.length = length;
}
bezierCurve.interpolationPoints.push(bezierPoint);
previousPoint = location;
}
totalLength += totalCurveLength;
bezierCurve.length = totalCurveLength;
}
return totalLength;
};

var createTimingFunctions = function () {
for (var key in _standardTimingFunctions) { 
if (_standardTimingFunctions.hasOwnProperty(key) == false) {
continue;
}
_timingFunctionsInfo[key] = _standardTimingFunctions[key]; 
}
for (var timingFunctionOid in _timingFunctionsInfo) {
if (_timingFunctionsInfo.hasOwnProperty(timingFunctionOid) == false) {
continue;
}
var bezierPathData = _timingFunctionsInfo[timingFunctionOid];
var bezierCurves = Array();
for (var i = 0; i < bezierPathData.length; i++) {
var bezierCurveData = bezierPathData[i];
bezierCurves.push({
startPoint: {x: bezierCurveData[0], y: bezierCurveData[1]},
startControlPoint: {x: bezierCurveData[2], y: bezierCurveData[3]},
endControlPoint: {x: bezierCurveData[4], y: bezierCurveData[5]},
endPoint: {x: bezierCurveData[6], y: bezierCurveData[7]},
length: 0,
interpolationPoints: Array()
});
}
calculateInterpolationPointsForBezierCurves(bezierCurves, false);
_timingFunctions[timingFunctionOid] = bezierCurves;
}
}

var createMotionPaths = function () {
for (var sceneIndex = 0; sceneIndex < _scenes.length; sceneIndex++) {
var scene = _scenes[sceneIndex];
var timelines = scene["T"];
for (var key in timelines) {
if (timelines.hasOwnProperty(key) == false) {
continue;
}
var timeline = timelines[key];
var motionPathsInfo = timeline["j"];
for (var motionPathOid in motionPathsInfo) {
if (motionPathsInfo.hasOwnProperty(motionPathOid) == false) {
continue;
}
var pathData = motionPathsInfo[motionPathOid];
var motionPath = {};
var bezierCurves = Array();
for (var i = 0; i < pathData.length; i++) {
var bezierCurveData = pathData[i];
bezierCurves.push({
startPoint: {x: bezierCurveData[0], y: bezierCurveData[1]},
startControlPoint: {x: bezierCurveData[2], y: bezierCurveData[3]},
endControlPoint: {x: bezierCurveData[4], y: bezierCurveData[5]},
endPoint: {x: bezierCurveData[6], y: bezierCurveData[7]},
length: 0,
interpolationPoints: Array()
});
}
motionPath.bezierCurves = bezierCurves;
motionPath.length = calculateInterpolationPointsForBezierCurves(bezierCurves, true);
_motionPaths[motionPathOid] = motionPath;
}
}
}
};

var decodeTime = function (time, timeline) {
var framesPerSecond = timeline["f"];
var seconds = Math.floor(time);
var frames = (time - seconds) * 100 /  framesPerSecond;
return quantizeTimeWithFramesPerSecond(seconds + frames, framesPerSecond);
};

var cleanupInternalDataRepresentation = function () {
// we encode times as seconds.frame so we need to decode this to regular numbers
// also need to set default values we didn't export for size reasons for later use
for (var sceneIndex = 0; sceneIndex < _scenes.length; sceneIndex++) {
var scene = _scenes[sceneIndex];
var timelines = scene["T"];
for (var key in timelines) {
if (timelines.hasOwnProperty(key) == false) {
continue;
}
var timeline = timelines[key];
timeline["d"] = decodeTime(timeline["z"], timeline);
for (var animationIndex = 0; animationIndex < timeline["a"].length; animationIndex++) {
var animation = timeline["a"][animationIndex];
animation["t"] = decodeTime(animation["y"], timeline);
animation["d"] = decodeTime(animation["z"], timeline);
if(animation["p"] == null) {
animation["p"] = kAnimationTypeStandardKeyframe;
} else if (animation["p"] == kAnimationTypeTimelineAction) {
animation["d"] = 0;
}
if(animation["r"] == null) {
animation["r"] = false;
}
animation['k'] = animationIndex;
}
var symbolActions = timeline["b"];
for (var i = 0; i < symbolActions.length; i++) {
var symbolActionInfo = symbolActions[i];
symbolActionInfo.startTime = decodeTime(symbolActionInfo["C"], timeline);
symbolActionInfo.duration = decodeTime(symbolActionInfo["D"], timeline);
}
}
}
};

var addHeadAdditions = function () {
// this does not look for duplicates, which could be an issue with multiple hype documents on one page(?)
for(var i = 0; i < _headAdditions.length; i++) {
var headAddition = _headAdditions[i];
var element = document.createElement("div");
element.innerHTML = headAddition;
addElementToHead(element);


}

// head additions might mean custom fonts. If so, force a relayout after a delay (have no current visibility into font tracking
window.setTimeout(relayoutIfNecessary, 120); // hopefully enough time to read from cache
window.setTimeout(relayoutIfNecessary, 1200); // hopefully enough time to read from network
};

var addGeneratedCSS = function (additionalCSS) {
// should be in the reverse order from the minification script to avoid any stomping
additionalCSS = additionalCSS.replace(/\|/g, "-bottom").replace(/\`/g, "font-").replace(/\@/g, "vertical-align").replace(/\?/g, "inherit").replace(/\$/g, "margin").replace(/\^/g, ".HYPE_scene ");

if(_useGraphicsAcceleration == false) {
additionalCSS = additionalCSS.replace(/rotateY\(0\)/g, "none");
}

addAdditionalCSS(additionalCSS);
};

// adapted from David Morrissey's answer in:
// http://stackoverflow.com/questions/2710284/controlling-css-with-javascript-works-with-mozilla-but-not-with-webkit-based-brow
var addAdditionalCSS = function (additionalCSS) {
var css = document.createElement('div');
var spaces = (document.xmlEncoding == null) ? "&nbsp;" : "";
css.innerHTML = spaces + '<style id="" type="text/css">'+additionalCSS+'</style>' + spaces;
addElementToHead(css);
};

var addElementToHead = function (element) {
var head = document.getElementsByTagName("head")[0];
if (!head) { // SAFARI EARLY VERSIONS HACK! - Some safari versions don't find the "head" tag
head = document.createElement('div');
document.body.appendChild(head);
}
head.appendChild(element);
};

var notifyEvent = function (event, element) {
var eventListeners = window['HYPE_eventListeners'];
if(eventListeners == null) {
return;
}
var result;
for(var i = 0; i < eventListeners.length; i++) {
if(eventListeners[i]['type'] == event['type'] && eventListeners[i]['callback'] != null) {
result = eventListeners[i]['callback'](_hype['API'], element, event);
if(result === false) {
return false;
}
}
}
return result;
};

var getElementAttribute = function (element, identifier, defaultValue) {
defaultValue = (typeof defaultValue != 'undefined') ? defaultValue : null;

var elementId = element.id;
var oid = _idReverseMapping[elementId] || elementId;

var currentValuesForElement = _currentValues[oid];
if(currentValuesForElement == null) {
return defaultValue;
}

var value = currentValuesForElement[identifier];
if(value == null) {
return defaultValue;
}

return value;
};

var setElementAttribute = function (element, identifier, value) {
var elementId = element.id;
var oid = _idReverseMapping[elementId] || elementId;

var currentValuesForElement = _currentValues[oid];
if(currentValuesForElement == null) {
currentValuesForElement = {};
_currentValues[oid] = currentValuesForElement;
}
currentValuesForElement[identifier] = value;
};

var sceneNames = function () { // public, do not change signature without wrapping in _hype['API']!
var sceneNames = Array();
for(var i = 0; i < _sceneContainers.length; i++) {
sceneNames.push(_sceneContainers[i]["n"]);
}
return sceneNames;
};

var currentSceneName = function () { // public, do not change signature without wrapping in _hype['API']!
return _sceneContainers[_currentSceneContainerIndex]["n"];
};

var showNextScene = function (transition, duration) { // public, do not change signature without wrapping in _hype['API']!
showSceneContainer(_currentSceneContainerIndex + 1, transition, duration);
};

var showPreviousScene = function (transition, duration) { // public, do not change signature without wrapping in _hype['API']!
showSceneContainer(_currentSceneContainerIndex - 1, transition, duration);
};

var showSceneNamed = function (sceneName, transition, duration) { // public, do not change signature without wrapping in _hype['API']!
var sceneIndex = myIndexOf(sceneNames(), sceneName);
showSceneContainer(sceneIndex, transition, duration);
};

var layoutsForSceneNamed = function (sceneName) { // public, do not change signature without wrapping in _hype['API']!
var sceneIndex = (sceneName != null) ? myIndexOf(sceneNames(), sceneName) : _currentSceneContainerIndex;
return sceneInfosForSceneContainer(_sceneContainers[sceneIndex]);
};

var showLayoutNamed = function (layoutName) { // public, do not change signature without wrapping in _hype['API']!
var sceneIndex = sceneIndexForLayoutName(layoutName, _sceneContainers[_currentSceneContainerIndex]);
if(sceneIndex != -1) {
_showingCurrentLayout = true;
showSceneRepresentation(sceneIndex, kSceneTransitionInstant, 0);
}
};

var currentLayoutName = function () { // public, do not change signature without wrapping in _hype['API']!
return _scenes[_currentSceneIndex]["n"];
};

var sceneIndexForLayoutName = function (layoutName, sceneContainer) {
var sceneInfos = sceneInfosForSceneContainer(sceneContainer);
for(var i = 0; i < sceneInfos.length; i++) {
if(sceneInfos[i]["name"] == layoutName) {
return sceneInfos[i]["_"];
}
}
return -1;
}

var sceneInfosForSceneContainer = function (sceneContainer) { // returns public info along with internal key "_" that is the scene index
var scenesInfos = [];
for (var i = 0; i < sceneContainer["X"].length; i++) {
var sceneIndex = sceneContainer["X"][i];
var scene = _scenes[sceneIndex];
scenesInfos.push({"_" : sceneIndex, "name" : scene["n"], "breakpoint" : scene["d"], "width" : scene["Y"], "height" : scene["Z"]/*, "widthScale" : scene["a"], "heightScale" : scene["b"]*/});
}
return scenesInfos;
};

var showSceneContainer = function (sceneContainerNumber, transition, duration) {
_showingCurrentLayout = false;
var sceneContainer = _sceneContainers[sceneContainerNumber];
if (sceneContainer == null || _inSceneTransition == true) {
return;
}

var finishSceneContainerTransitionAfterSceneUnloadActions = (function() {
_currentSceneContainerIndex = sceneContainerNumber;
});
var bestSceneRepresentationIndex = sceneRepresentationIndexForSceneContainer(sceneContainer);
showSceneRepresentation(bestSceneRepresentationIndex, transition, duration, finishSceneContainerTransitionAfterSceneUnloadActions);
};

var showSceneRepresentation = function (sceneNumber, transition, duration, finishSceneContainerTransitionAfterSceneUnloadActions) {
// sanity check to make sure there's a scene with this number
if(identifierOfSceneAtIndex(sceneNumber) == null || _inSceneTransition == true) {
return;
}

// sanity check for duration
if(duration == null) {
duration = 1.1;
}
duration = quantizeTimeWithFramesPerSecond(duration, _fps);

_inSceneTransition = true;

var finishShowScene = (function() {
if (finishSceneContainerTransitionAfterSceneUnloadActions != null) {
finishSceneContainerTransitionAfterSceneUnloadActions();
}
// remove timeline runs
_timelineRuns = Array();

// remove custom behaviors
_customBehaviorObserversByName = {};

var currentSceneContainer = currentSceneElement();
var previousSceneIndex = _currentSceneIndex;

_usesFlexibleLayout = (_scenes[sceneNumber]["a"] != null || _scenes[sceneNumber]["b"] != null) ? true : false;

// do actual loading of scene
loadScene(identifierOfSceneAtIndex(sceneNumber));

var nextSceneContainer = currentSceneElement();

if(transition == kSceneTransitionCrossfade) {
resizeForSceneTransition(currentSceneContainer, nextSceneContainer, true, true);
showSceneWithCrossfade(currentSceneContainer, nextSceneContainer, duration);
} else if(transition == kSceneTransitionSwap && _browserInfo.supports3D == true) {
resizeForSceneTransition(currentSceneContainer, nextSceneContainer, true, true);
showSceneWithSwap(currentSceneContainer, nextSceneContainer, duration);
} else if(transition == kSceneTransitionPushLeftToRight || transition == kSceneTransitionPushRightToLeft || transition == kSceneTransitionPushBottomToTop || transition == kSceneTransitionPushTopToBottom) {
// resizeForSceneTransition will be called within showSceneWithPush because it is different for horizontal or vertical transitions
showSceneWithPush(currentSceneContainer, nextSceneContainer, transition, duration);
} else { // including (transition == null || transition == kSceneTransitionInstant)
resizeForSceneTransition(currentSceneContainer, nextSceneContainer, false, false);
showSceneWithInstant(currentSceneContainer, nextSceneContainer);
}

// call relayout here because it will not work unless the other scene's display is block/visible
relayoutIfNecessary();
});


// handle scene unload event
var hasUnloadTimelineRun = false;
var currentSceneContainer = currentSceneElement();
currentSceneContainer.removeAttribute("aria-hidden");

if(_hasShownInitialScene == true && currentSceneContainer != null) {

var sceneIndex = indexOfSceneWithIdentifier(currentSceneIdentifier());

// trigger event handlers
var sceneUnloadFauxEvent = {"type" : "HypeSceneUnload"};
var eventResult = notifyEvent(sceneUnloadFauxEvent, null);

if(eventResult !== false) {
var onSceneUnloadData = _scenes[sceneIndex]["B"];
if(onSceneUnloadData != null) {
var onUnloadActions = onSceneUnloadData["a"];
var onUnloadFunction = createActionHandler(currentSceneElement(), onUnloadActions);

for(var i = 0; i < onUnloadActions.length; i++) {
var action = onUnloadActions[i];
var onSceneUnloadTimelineIdentifier = action["b"];
if(action["p"] == kActionStartTimeline && onSceneUnloadTimelineIdentifier != null && _scenes[sceneIndex]['T'][onSceneUnloadTimelineIdentifier] != null) {
hasUnloadTimelineRun = true;
_timelineIdentifierForCompletionOverrideCallback = onSceneUnloadTimelineIdentifier;
_timelineCompletionOverrideCallback = finishShowScene;
}
}

onUnloadFunction(sceneUnloadFauxEvent);
}
}
// run any symbol unload actions
var domElements = getElementsByClassName("HYPE_element", currentSceneElement());
for (var i = 0; i < domElements.length; i++) {
var element = domElements[i];
if(isSymbolElement(element) == false) {
continue;
}

var persistentSymbolOid = _scenes[sceneIndex]["v"][_idReverseMapping[element.id]]['cL'];
if (persistentSymbolOid) {
continue;
}

var symbolUnloadFauxEvent = {"type" : "HypeSymbolUnload"};
notifyEvent(symbolUnloadFauxEvent, element);

var actionHandler = getElementAttribute(element, "cF");
if (actionHandler) {
var unloadFunction = createActionHandler(element, actionHandler["a"]);
unloadFunction(symbolUnloadFauxEvent);
}
}

// remove keyboard handlers
for(var eventName in _currentSceneActionHandlers) {
if(_currentSceneActionHandlers.hasOwnProperty(eventName) == false) {
continue;
}
if (document.removeEventListener) {
document.removeEventListener(eventName, _currentSceneActionHandlers[eventName], false);
} else if (document.detachEvent) {
document.detachEvent("on" + eventName, _currentSceneActionHandlers[eventName]);
}
}
_currentSceneActionHandlers = {};

// remove all eventHandlers
for (var i = 0; i < _eventHandlers.length; i++) {
var eventHandler = _eventHandlers[i];
removeEventHandler(eventHandler['eventType'], eventHandler['handler'], eventHandler['element']);
}
_eventHandlers = Array();
}
_hasShownInitialScene = true;

if(hasUnloadTimelineRun == false) {
finishShowScene();
}
};

var currentWidthOfSceneAtIndex = function (sceneIndex) {
var parentWidth = _mainContentContainer.parentNode.offsetWidth;

var scalePercentageWidth = _scenes[sceneIndex]["a"];
return (scalePercentageWidth != null) ? scalePercentageWidth / 100.0 * parentWidth : _scenes[sceneIndex]["Y"];
}

var currentHeightOfSceneAtIndex = function (sceneIndex) {
var parentHeight = _mainContentContainer.parentNode.offsetHeight;

var scalePercentageHeight = _scenes[sceneIndex]["b"];
return (scalePercentageHeight != null) ? scalePercentageHeight / 100.0 * parentHeight : _scenes[sceneIndex]["Z"];
}

var resizeForSceneTransition = function (currentSceneContainer, nextSceneContainer, resizeWidth, resizeHeight) {
var parentWidth = _mainContentContainer.parentNode.offsetWidth;
var parentHeight = _mainContentContainer.parentNode.offsetHeight;

var currentSceneIndex = currentSceneContainer.getAttribute("HYPE_scene_index");
var nextSceneIndex = nextSceneContainer.getAttribute("HYPE_scene_index");
// only set the width and height if we have loaded the current scene already
if (_currentValues[_idReverseMapping[currentSceneContainer.id]]) {
var currentSceneWidth = currentWidthOfSceneAtIndex(currentSceneIndex);
var currentSceneHeight = currentHeightOfSceneAtIndex(currentSceneIndex);
applyValue(currentSceneContainer, "c", currentSceneWidth, "d", currentSceneHeight);
}
var nextSceneWidth = currentWidthOfSceneAtIndex(nextSceneIndex);
 var nextSceneHeight = currentHeightOfSceneAtIndex(nextSceneIndex);
applyValue(nextSceneContainer, "c", nextSceneWidth, "d", nextSceneHeight);

if (resizeWidth) {
var containerWidth = currentSceneWidth;
if (nextSceneWidth > containerWidth) {
containerWidth = nextSceneWidth;
}
_mainContentContainer.style.width = transformValuePixel(containerWidth);
invalidateBrowserReportedSizeCacheForElement(_mainContentContainer);

if (_mainContentContainer.style.margin == 'auto') {
var widthDelta = 0;
if (currentSceneWidth < nextSceneWidth) {
if (parentWidth < containerWidth) {
widthDelta = parentWidth - currentSceneWidth;
} else {
widthDelta = containerWidth - currentSceneWidth;
}
} else {
if (parentWidth < containerWidth) {
widthDelta = parentWidth - nextSceneWidth;
} else {
widthDelta = containerWidth - nextSceneWidth;
}
}
applyValue(nextSceneContainer, "a", Math.max(0, widthDelta / 2));
}
}

if (resizeHeight) {
var containerHeight = currentSceneHeight;
if (nextSceneHeight > containerHeight) {
containerHeight = nextSceneHeight;
}
_mainContentContainer.style.height = transformValuePixel(containerHeight);
}
};

var showSceneWithInstant = function (currentSceneContainer, nextSceneContainer) {
completeSceneTransition(currentSceneContainer, nextSceneContainer, null, true);
};

var showSceneWithCrossfade = function (currentSceneContainer, nextSceneContainer, duration) {
var animations = Array();
nextSceneContainer.style.zIndex = 1;
var nextSceneOid = _idReverseMapping[nextSceneContainer.id];
createAndPushTransitionAnimation(animations, "e", 0, duration, "b", nextSceneOid, 0 ,1);

if(currentSceneContainer != null) {
currentSceneContainer.style.zIndex = 0;

if(_drawSceneBackgrounds == false) {
var currentSceneOid = _idReverseMapping[currentSceneContainer.id];
createAndPushTransitionAnimation(animations, "e", 0, duration, "b", currentSceneOid, 1, 0);
} else if (currentSceneContainer.style.width != nextSceneContainer.style.width || currentSceneContainer.style.height != nextSceneContainer.style.height ) {
var currentSceneOid = _idReverseMapping[currentSceneContainer.id];
createAndPushTransitionAnimation(animations, "e", duration / 2, duration / 2, "b", currentSceneOid, 1, 0);
}
}

applyValue(nextSceneContainer, "e", 0);
addAndRunSceneTransitionTimeline("HYP_j", duration, animations, currentSceneContainer, nextSceneContainer);

nextSceneContainer.style.display = "block";
};

var showSceneWithSwap = function (currentSceneContainer, nextSceneContainer, duration) {
// function replacement for minification
var createAndPushTransitionAnimationFunction = createAndPushTransitionAnimation;
var applyValueFunction = applyValue;

//!! this (and corresponding clear in completeSceneTransition is a workaround for x-bug://1
var mainContentContainerStyle = _mainContentContainer.style;
mainContentContainerStyle["-webkit-perspective"] = "600px";
mainContentContainerStyle["MozPerspective"] = "600px";
mainContentContainerStyle["perspective"] = "600px";
mainContentContainerStyle[_hype.kSizeOptimizationWebKitPrefix + "transform-style"] = "preserve-3d";
mainContentContainerStyle["MozTransformStyle"] = "preserve-3d";
mainContentContainerStyle["transform-style"] = "preserve-3d";

var width = _mainContentContainer.offsetWidth;
var height = _mainContentContainer.offsetHeight;
var widthByFour = (width / 4.0);
var widthByTwo = (width / 2.0);
var negativeWidthByFour = widthByFour * -1;
var negativeWidthByTwo = widthByTwo * -1;
var durationByTwo = (duration / 2);

var parentWidth = _mainContentContainer.parentNode.offsetWidth;
var parentHeight = _mainContentContainer.parentNode.offsetHeight;
var nextSceneIndex = nextSceneContainer.getAttribute("HYPE_scene_index");
var nextSceneWidth = currentWidthOfSceneAtIndex(nextSceneIndex);
 var nextSceneHeight = currentHeightOfSceneAtIndex(nextSceneIndex);

var animations = Array();
if(currentSceneContainer != null) {
var currentSceneOid = _idReverseMapping[currentSceneContainer.id];
setElementAttribute(currentSceneContainer, "HYP_m", "1");
var currentSceneIndex = currentSceneContainer.getAttribute("HYPE_scene_index");
var currentSceneWidth = currentWidthOfSceneAtIndex(currentSceneIndex);
var currentSceneHeight = currentHeightOfSceneAtIndex(currentSceneIndex);
applyValueFunction(currentSceneContainer, "z", 1, "bQ", 0, "c", currentSceneWidth, "d", currentSceneHeight);

createAndPushTransitionAnimationFunction(animations, "a", 0, durationByTwo, "d", currentSceneOid, 0, widthByTwo);
createAndPushTransitionAnimationFunction(animations, "bQ", 0, durationByTwo, "d", currentSceneOid, 0, -300);
createAndPushTransitionAnimationFunction(animations, "aY", 0, durationByTwo, "d", currentSceneOid, 0, -20);
createAndPushTransitionAnimationFunction(animations, "z", 0, durationByTwo, "a", currentSceneOid, 1, 0);
}

var nextSceneOid = _idReverseMapping[nextSceneContainer.id];
setElementAttribute(nextSceneContainer, "HYP_m", "1");

createAndPushTransitionAnimationFunction(animations, "a", 0, durationByTwo, "d", nextSceneOid, negativeWidthByFour, negativeWidthByTwo);
createAndPushTransitionAnimationFunction(animations, "bQ", 0, durationByTwo, "d", nextSceneOid, -600, -300);
createAndPushTransitionAnimationFunction(animations, "aY", 0, durationByTwo, "d", nextSceneOid, 50, 40);
createAndPushTransitionAnimationFunction(animations, "z", 0, durationByTwo, "a", nextSceneOid, 0, 1);


if(currentSceneContainer != null) {
createAndPushTransitionAnimationFunction(animations, "a", durationByTwo, durationByTwo, "e", currentSceneOid, widthByTwo, widthByFour);
createAndPushTransitionAnimationFunction(animations, "bQ", durationByTwo, durationByTwo, "e", currentSceneOid, -300, -600);
createAndPushTransitionAnimationFunction(animations, "aY", durationByTwo, durationByTwo, "e", currentSceneOid, -20, -50);
if (currentSceneWidth != nextSceneWidth || currentSceneHeight != nextSceneHeight) {
createAndPushTransitionAnimationFunction(animations, "e", durationByTwo, durationByTwo, "d", currentSceneOid, 1, 0);
}
}

createAndPushTransitionAnimationFunction(animations, "a", durationByTwo, durationByTwo, "e", nextSceneOid, negativeWidthByTwo, 0);
createAndPushTransitionAnimationFunction(animations, "bQ", durationByTwo, durationByTwo, "e", nextSceneOid, -300, 0);
createAndPushTransitionAnimationFunction(animations, "aY", durationByTwo, durationByTwo, "e", nextSceneOid, 40, 0);


applyValueFunction(nextSceneContainer, "a", widthByFour, "bQ", -600, "aY", 50, "z", 0, "c", nextSceneWidth, "d", nextSceneHeight);

addAndRunSceneTransitionTimeline("HYP_l", duration, animations, currentSceneContainer, nextSceneContainer);

nextSceneContainer.style.display = "block";
};

var showSceneWithPush = function (currentSceneContainer, nextSceneContainer, direction, duration) {
var animations = Array();

var currentSceneIndex = currentSceneContainer.getAttribute("HYPE_scene_index");
var nextSceneIndex = nextSceneContainer.getAttribute("HYPE_scene_index");
var currentSceneWidth = currentWidthOfSceneAtIndex(currentSceneIndex);
var nextSceneWidth = currentWidthOfSceneAtIndex(nextSceneIndex);
var currentSceneHeight = currentHeightOfSceneAtIndex(currentSceneIndex);
var nextSceneHeight = currentHeightOfSceneAtIndex(nextSceneIndex);
if (direction == kSceneTransitionPushRightToLeft || direction == kSceneTransitionPushLeftToRight) {
resizeForSceneTransition(currentSceneContainer, nextSceneContainer, false, true);

if (currentSceneWidth != nextSceneWidth) {
createAndPushTransitionAnimation(animations, "c", 0, duration, "c", _mainContentContainerID, currentSceneWidth, nextSceneWidth);
_currentValues[_mainContentContainerID] = {};
_currentValues[_mainContentContainerID]["c"] = currentSceneWidth;
_currentValues[_mainContentContainerID]["d"] = (currentSceneHeight > nextSceneHeight) ? currentSceneHeight : nextSceneHeight;
_currentValues[_mainContentContainerID]["a"] = 0;
_currentValues[_mainContentContainerID]["b"] = 0;
}

} else {
resizeForSceneTransition(currentSceneContainer, nextSceneContainer, true, false);

if (currentSceneHeight != nextSceneHeight) {
createAndPushTransitionAnimation(animations, "d", 0, duration, "c", _mainContentContainerID, currentSceneHeight, nextSceneHeight);
_currentValues[_mainContentContainerID] = {};
_currentValues[_mainContentContainerID]["c"] = (currentSceneWidth > nextSceneWidth) ? currentSceneWidth : nextSceneWidth;
_currentValues[_mainContentContainerID]["d"] = currentSceneHeight;
_currentValues[_mainContentContainerID]["a"] = 0;
_currentValues[_mainContentContainerID]["b"] = 0;
}
}

// kSceneTransitionPushLeftToRight as the default
var identifier = "a";
var currentSceneStartValue = 0;
var currentSceneEndValue = nextSceneWidth;
var nextSceneStartValue = nextSceneWidth * -1;

if (direction == kSceneTransitionPushRightToLeft) {
currentSceneEndValue = currentSceneWidth * -1;
nextSceneStartValue = currentSceneWidth;
} else if (direction == kSceneTransitionPushBottomToTop) {
identifier = "b";
currentSceneEndValue = currentSceneHeight * -1;
nextSceneStartValue = currentSceneHeight;
} else if (direction == kSceneTransitionPushTopToBottom) {
identifier = "b";
currentSceneEndValue = nextSceneHeight;
nextSceneStartValue = nextSceneHeight * -1;
}

if(currentSceneContainer != null) {
var currentSceneOid = _idReverseMapping[currentSceneContainer.id];
applyValue(currentSceneContainer, "c", currentSceneWidth, "d", currentSceneHeight);
createAndPushTransitionAnimation(animations, identifier, 0, duration, "c", currentSceneOid, currentSceneStartValue, currentSceneEndValue);
}

var nextSceneOid = _idReverseMapping[nextSceneContainer.id];
createAndPushTransitionAnimation(animations, identifier, 0, duration, "c", nextSceneOid, nextSceneStartValue, currentSceneStartValue);

applyValue(nextSceneContainer, "c", nextSceneWidth, "d", nextSceneHeight, identifier, nextSceneStartValue);
addAndRunSceneTransitionTimeline("HYP_k", duration, animations, currentSceneContainer, nextSceneContainer);

nextSceneContainer.style.display = "block";
};

var addAndRunSceneTransitionTimeline = function (timelineIdentifier, duration, animations, currentSceneContainer, nextSceneContainer) {
var timelineInfo = {"i" : timelineIdentifier, "n" : timelineIdentifier, "f" : 30, "d" : duration, "a" : animations, "b": Array() };

// make the content container appear busy and hidden to screen readers, to try and keep them from narrating during scene transitions
_mainContentContainer.setAttribute("aria-busy", true);
_mainContentContainer.setAttribute("aria-hidden", true);

_scenes[_currentSceneIndex]["T"][timelineIdentifier] = timelineInfo;
createTimelineRun(timelineIdentifier, animations, timelineInfo);
_timelineIdentifierForCompletionOverrideCallback = timelineIdentifier;
_timelineCompletionOverrideCallback = (function() { completeSceneTransition(currentSceneContainer, nextSceneContainer, timelineIdentifier, true); });
startTimelineRun(timelineIdentifier, null, false);
};

var addAndRunElementTransitionTimeline = function (timelineIdentifier, duration, animations) {
var timelineInfo = {"i" : timelineIdentifier, "n" : timelineIdentifier, "f" : 30, "d" : duration, "a" : animations, "b": Array() };
_scenes[_currentSceneIndex]["T"][timelineIdentifier] = timelineInfo;
createTimelineRun(timelineIdentifier, animations, timelineInfo);
startTimelineRun(timelineIdentifier, null, false);
};

var createAndPushTransitionAnimation = function (arrayToPush, identifier, startTime, duration, timingFunctionOid, oid, startValue, endValue, isRelative) {
arrayToPush.push({"i" : identifier, "t" : startTime, "d" : duration, "f" : timingFunctionOid, "o" : oid, "s" : startValue, "e" : endValue, "r" : isRelative, "p" : kAnimationTypeStandardKeyframe });
};

var getElementsByClassName = function (className, elm) {

return elm.getElementsByClassName(className);

};

var currentSceneElement = function () {
return getElementByHypeOid(currentSceneIdentifier());
};

var currentSceneIdentifier = function () {
return identifierOfSceneAtIndex(_currentSceneIndex);
};

var identifierOfSceneAtIndex = function (sceneIndex) {
var scene = _scenes[sceneIndex];
if(scene == null) {
return null;
}
return scene['o'];
};

var indexOfSceneWithIdentifier = function (sceneIdentifier) {
for(var i = 0; i < _scenes.length; i++) {
if(_scenes[i]['o'] == sceneIdentifier) {
return i;
}
}
return -1;
};

var indexOfSceneContainerWithIdentifier = function (sceneIdentifier) {
for(var i = 0; i < _sceneContainers.length; i++) {
if(_sceneContainers[i]['o'] == sceneIdentifier) {
return i;
}
}
return -1;
};

var createResourceGroups = function () {
for(var resourceID in _resources) {
if(_resources.hasOwnProperty(resourceID) == false) {
continue;
}

var resource = _resources[resourceID];
var groupOid = resource['g'];
if(groupOid != null) {
var resourceGroup = _resourceGroups[groupOid];
if(resourceGroup == null) {
resourceGroup = Array();
_resourceGroups[groupOid] = resourceGroup;
}
resourceGroup.push(resourceID);
}
}
};

var resourcePathForResourceID = function (resourceID) {
var resource = _resources[resourceID];
if(resource == null) {
return "";
}
var isReference = resource['r'];
var resourceName = resource['n'];

var url = ""; // empty string makes sure browser tries to load and continues preload cycle
if(isReference != true) {
url += _resourcesFolderName + "/";
}
url += resourceName;

var urlOverride = notifyEvent({"type":"HypeResourceLoad", "url":url});
if(typeof urlOverride === 'string') {
url = urlOverride;
}
return url;
};



///////////////////////////////////////////////////////////////
// PRELOADING

var preloadFinished = function () {
if(_loadingScreenFunction != null) {
_loadingScreenFunction(false, _mainContentContainer);
}

if(notifyEvent({"type":"HypeDocumentLoad"}, _mainContentContainer) === false) {
return;
}

if (_initialSceneIndex == -1) {
showSceneContainer(_currentSceneContainerIndex);
} else {
_showingCurrentLayout = true;
var parentSceneContainerIndex = -1;
for (var i = 0; i < _sceneContainers.length; i++) {
var sceneIndexes = _sceneContainers[i]["X"];
for (var j = 0; j < sceneIndexes.length; j++) {
if (sceneIndexes[j] == _initialSceneIndex) {
parentSceneContainerIndex = i;
break;
}
}
if (parentSceneContainerIndex != -1) {
break;
}
}
if (parentSceneContainerIndex == -1) {
parentSceneContainerIndex = 0;
}
_currentSceneContainerIndex = parentSceneContainerIndex;
showSceneRepresentation(_initialSceneIndex);
}
};

var preloadResources = function () {
for(var resourceID in _resources) {
if(_resources.hasOwnProperty(resourceID) == false) {
continue;
}
var resource = _resources[resourceID];
var preloadType = resource['p'];
if(preloadType != null) {
if(myIndexOf(_resourceIDsToPreload, resourceID) == -1) {
_resourceIDsToPreload.push(resourceID);
}
}
}

var localCopyOfResourceIDsToPreload = _resourceIDsToPreload.slice(0); // clone array as it may be mutated during iteration in some cases

// handle case of no images
if(localCopyOfResourceIDsToPreload.length == 0) {
preloadFinished();
return;
}


for(var index = 0; index < localCopyOfResourceIDsToPreload.length; index++) {
preloadResource(localCopyOfResourceIDsToPreload[index], false);
}

};

var preloadResource = function (resourceID, shouldPreloadSerially) {
var preloadType = _resources[resourceID]['p'];
if(preloadType == kResourcePreloadTypeImage) {
preloadImageResource(resourceID, shouldPreloadSerially);
} else if(preloadType == kResourcePreloadTypeAudio) {
preloadAudioResource(resourceID, shouldPreloadSerially);
}
};



var didPreloadResource = function (resourceID, shouldPreloadSerially) {
var index = myIndexOf(_resourceIDsToPreload, resourceID);
if(index != -1) {
_resourceIDsToPreload.splice(index, 1);
}

if(_resourceIDsToPreload.length <= 0) {
preloadFinished();
} else if(shouldPreloadSerially == true && _isPreloadNextResourceQueued == false) {
// window.setTimeout is a workaround for the stack overflow line 0 issue
_isPreloadNextResourceQueued = true;
window.setTimeout((function() { preloadNextResource(); }), 1);
}
};

var preloadImageResource = function (resourceID, shouldPreloadSerially) {
var resource = _resources[resourceID];
var groupOid = resource['g'];
if(groupOid != null) {
var bestResourceID = bestImageResourceIDForResourceGroupOid(groupOid);
if(bestResourceID != resourceID) {
didPreloadResource(resourceID, shouldPreloadSerially);
return;
}
}

var img = new Image();
var completionHandler = (function (e) {
didPreloadResource(resourceID, shouldPreloadSerially);
});

var resourcePath = resourcePathForResourceID(resourceID);
img.onload = completionHandler;
img.onerror = completionHandler;
img.onabort = completionHandler;
img.src = resourcePath;
img.resourceID = resourceID;
};

var bestImageResourceIDForResourceGroupOid = function (resourceGroupOid) {
var resourceIDs = _resourceGroups[resourceGroupOid];
if(resourceIDs == null) {
return;
}

var isRetinaDisplay = (window['devicePixelRatio'] > 1);
var foundStandardImageResource = false;
var bestResourceID = null;

for(var i = 0; i < resourceIDs.length; i++) {
var resourceID = resourceIDs[i];
var resource = _resources[resourceID];
var groupingType = resource["t"];

if(groupingType == "@1x") {
bestResourceID = resourceID;
foundStandardImageResource = true;
} else if(groupingType == "@2x") {
if(foundStandardImageResource == false || isRetinaDisplay == true) {
bestResourceID = resourceID;
}
if(isRetinaDisplay == true) {
break;
}
} else if(foundStandardImageResource == false) {
bestResourceID = resourceID;
}
}

return bestResourceID;
};

var preloadAudioResource = function (resourceID, shouldPreloadSerially) {
var completionHandler = (function (e) {
var resourceGroupOid = resourceGroupOidForResourceID(resourceID);
var resourceIDs = _resourceGroups[resourceGroupOid];
for(var i = 0; i < resourceIDs.length; i++) {
var matchingResourceID = resourceIDs[i];
var resource = _resources[matchingResourceID];
var preloadType = resource['p'];
if(preloadType != null) {
didPreloadResource(matchingResourceID, shouldPreloadSerially);
}
}
});

var resourceGroupOid = resourceGroupOidForResourceID(resourceID);
var audio = hypeAudioForResourceGroupOid(resourceGroupOid);

// workaround iOS 5 bug where preloading does not work, and don't preload for quicktime
if((_browserInfo.ios != null && _browserInfo.webkit < 536.26) || _browserInfo.ie < 9) {
window.setTimeout(completionHandler, 1); // needs to defer otherwise
} else {
audio.load(completionHandler, completionHandler);
}
};


///////////////////////////////////////////////////////////////
// AUDIO


var playAudioResourceGroupOid = function (resourceGroupOid, loop) {
var audio = hypeAudioForResourceGroupOid(resourceGroupOid);
audio.loop = loop;
audio.play();
};

var pauseAudioResourceGroupOid = function (resourceGroupOid) {
var audio = hypeAudioForResourceGroupOid(resourceGroupOid);
audio.pause();
};

var hypeAudioForResourceGroupOid = function (resourceGroupOid) {
var resourceIDs = _resourceGroups[resourceGroupOid];
var sourceURLsByMimeType = {};
for(var i = 0; i < resourceIDs.length; i++) {
var resourceID = resourceIDs[i];
var mimeType = _resources[resourceID]["t"];
if(_browserInfo.android != null && mimeType == "audio/ogg") {
// android has horrible ogg support, it will generally only play once
continue;
}
sourceURLsByMimeType[mimeType] = resourcePathForResourceID(resourceIDs[i]);
}

// determine proper API
var audioMethodAPI;
var iBooksWorkaround = _resourcesFolderName.indexOf("x-ibooks-th://") != -1 && _browserInfo.ios != null && _browserInfo.webkit >= 537; /* See #5028 and rdar://problem/15060383 */
if((typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined") && window.location.href.indexOf("file://") == -1 && _resourcesFolderName.indexOf("ibooksimg://") == -1 && iBooksWorkaround == false  && navigator.onLine != false && _browserInfo.opera == null) {
audioMethodAPI = HypeAudio_WebAudioAPI;
}

else {
audioMethodAPI = HypeAudio_HTML5;
}

var options = {};
options.startAheadOfPlayback = (_browserInfo.ios != null && _browserInfo.webkit < 603);

return HypeAudio(audioMethodAPI, resourceGroupOid, sourceURLsByMimeType, options);
};

var resourceGroupOidForResourceID = function (resourceID) {
var resource = _resources[resourceID];
return resource['g'];
};

///////////////////////////////////////////////////////////////
// MULTI-TOUCH


var createFingerData = function () {
var fingerData=[];
for (var i=0; i<=5; i++) {
fingerData.push({
start:{ x: 0, y: 0 },
end:{ x: 0, y: 0 },
lastPosition:{ x: 0, y: 0 }
});
}

return fingerData;
};

// reminder: for web positive y is down, so using top and left position 90 degrees is down (instead of up for normal math)
var calculateAngle = function(startPoint, endPoint) {
var x = endPoint.x - startPoint.x;
var y = endPoint.y - startPoint.y;
var r = Math.atan2(y, x); //radians
var angle = Math.round(r * 180 / Math.PI); //degrees
return angle;
};

var calculateDirectionAlongAxis = function (startPoint, endPoint, touchStateOptions) {
var angle = calculateAngle(startPoint, endPoint);
if (touchStateOptions["c"] == 0) {
if ((angle >= 90) || (angle <= -90)) {
return kLeft;
} else {
return kRight;
}
} else {
if ((angle <= 0) && (angle >= -180)) {
return kUp;
} else {
return kDown;
} 
}
};

var calculateDirection = function (startPoint, endPoint, duration) {
var angle = calculateAngle(startPoint, endPoint);
var offset = Math.min(45, 45 * duration / 2000);

if ((angle >= 135 + offset) || (angle <= -135 - offset)) {
return kLeft;
} else if ((angle <= 45 - offset) && (angle >= -45 + offset)) {
return kRight;
} else if ((angle < -45 - offset) && (angle > -135 + offset)) {
return kUp;
} else if ((angle > 45 + offset) && (angle < 135 - offset)) {
return kDown;
} else {
return undefined;
}
};

var updateMinOrMaxPointForGesture = function (touchState, point) {
var touchStateOptions = touchState.options;
var position = ((touchStateOptions.direction == kRight) || (touchStateOptions.direction == kLeft)) ? point.x : point.y;
if (touchState.minOrMaxForGesture == undefined) {
touchState.minOrMaxForGesture = position;
} else {
if ((touchStateOptions.direction == kRight) || (touchStateOptions.direction == kDown)) {
touchState.minOrMaxForGesture = Math.max(touchState.minOrMaxForGesture, position);
} else {
touchState.minOrMaxForGesture = Math.min(touchState.minOrMaxForGesture, position);
}
}
};

var directionForDrag = function (touchStateOptions) {
var forwardDirection;
if (touchStateOptions["c"] == 0) {
if (touchStateOptions["A"] == 0) {
forwardDirection = kRight;
} else if (touchStateOptions["A"] == 1) {
forwardDirection = kLeft;
}
} else if (touchStateOptions["c"] == 1) {
if (touchStateOptions["A"] == 0) {
forwardDirection = kUp;
} else if (touchStateOptions["A"] == 1) {
forwardDirection = kDown;
}
}
return forwardDirection;
};

var pagePosition = function (event) {
var position = {};
if(event.pageX || event.pageY) {
position.x = event.pageX;
position.y = event.pageY;
} else if (event.clientX || event.clientY) {
position.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
position.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
}
return position;
};

var addEventHandler = function (eventType, handler, element, manageHandlerRemoval) {
var eventHandler = {'eventType':eventType, 'handler':handler, 'element':element};
if (manageHandlerRemoval) {
_eventHandlers.push(eventHandler);
}
if (element.addEventListener) {
element.addEventListener(eventType, handler, (_browserInfo.supportsPassive ? {'passive': false} : false));
} else if (element.attachEvent) {
element.attachEvent('on' + eventType, handler);
}

// click/mouse up/mouse down/drag events may affect accessibility
updateAccessibility(element);
};

var removeEventHandler = function (eventType, handler, element) {
if (element.removeEventListener) {
element.removeEventListener(eventType, handler, false);
} else if (element.detachEvent) {
element.detachEvent('on' + eventType, handler);
}
};

var sendDragGestureUpdates = function (event, touchState) {
if (touchState.options.continuousUpdates == true) {
event['hypeGesturePhase'] = touchState.phase;
event['hypeGestureXPosition'] = touchState.fingerData[0].end.x;
event['hypeGestureYPosition'] = touchState.fingerData[0].end.y;
touchState.updateFunction(event);
}
};

var removeTouchEventHandlers = function (touchState) {
if (touchState.hasRemovedEventHandlers == true) {
return;
}

touchState.hasRemovedEventHandlers = true;
_dragOwnershipOfPropertiesByElement = {};
var touchElement = touchState.isTouchEvent ? touchState.elementForEvents : document;
if(touchElement.releaseCapture) { touchElement.releaseCapture(); }
removeEventHandler(moveEventType(touchState), touchState.touchMove, touchElement);
removeEventHandler(endEventName(touchState), touchState.touchEnd, touchElement);
if (touchState.isTouchEvent) {
removeEventHandler(kCancelEventName, touchState.touchCancel, touchElement);
} else {
removeEventHandler('mouseout', touchState.touchCancel, touchElement);
}
if (touchState.options.gestureType == kGestureDrag) {
_currentlyHandlingDragGesture = false;
}
if (touchState.hasReceivedMove == true) {
_receivedGestureMove--;
}


};

var makeTouchCancel = function (touchState) {
return (function (event) {
removeTouchEventHandlers(touchState);
touchState.phase = kPhaseCancel;
sendDragGestureUpdates(event, touchState);
});
};

var moveEventType = function (touchState) {
return touchState.isTouchEvent ? 'touchmove' : 'mousemove';
};

var endEventName = function (touchState) {
return touchState.isTouchEvent ? 'touchend' : 'mouseup';
};

var makeTouchStart = function (touchState) {
return (function (event) {
touchState.isTouchEvent = (event.type == "touchstart");

if (touchState.isTouchEvent) {
if (event.touches.length > 0 && touchState.options.gestureType == kGestureTap) {
preventMouseEventsForTouch(event.touches[0]);
}
touchState.fingerCount = event.touches.length;
} else {
// don't do anything if it is a right-click/control-click
if(event.ctrlKey == true || event.button != 0) {
return;
}
// otherwise just don't let the event do what it otherwise would
if (event.preventDefault) {
event.preventDefault();
}
}

if (touchState.isTouchEvent == false || touchState.fingerCount === 1) {
touchState.phase = kPhaseStart;
touchState.gestureDirection = null;
touchState.fingerData = createFingerData();
touchState.minOrMaxForGesture = undefined;
touchState.hasRemovedEventHandlers = false;

var ret;
var mainEvent = touchState.isTouchEvent ? event.touches[0] : event;

var touchCancelHandler = makeTouchCancel(touchState);
touchState.touchCancel = touchCancelHandler;
var elementForEvents = touchState.isTouchEvent ? touchState.elementForEvents : document;

if (touchState.isTouchEvent) {
addEventHandler(kCancelEventName, touchState.touchCancel, elementForEvents, false);
} else if (window.self != window.top) {
// iframes need to cancel the drag when the mouse leaves the frame because we will no longer receive mouse events
var mouseOutHandler = (function (event) {
// cancel if we have moved outside of the document element, IE uses toElement
if (event.relatedTarget === document.documentElement || event.toElement === null) {
touchCancelHandler(event);
}
});
touchState.touchCancel = mouseOutHandler;
addEventHandler('mouseout', mouseOutHandler, elementForEvents, false);
}

var position = pagePosition(mainEvent);
var firstFingerData = touchState.fingerData[0];
firstFingerData.start.x = position.x;
firstFingerData.end.x = position.x;
firstFingerData.lastPosition.x = position.x;
firstFingerData.start.y = position.y;
firstFingerData.end.y = position.y;
firstFingerData.lastPosition.y = position.y;
updateMinOrMaxPointForGesture(touchState, position);

touchState.touchMove = makeTouchMove(touchState);
addEventHandler(moveEventType(touchState), touchState.touchMove, elementForEvents, false);
touchState.touchEnd = makeTouchEnd(touchState);
addEventHandler(endEventName(touchState), touchState.touchEnd, elementForEvents, false);

// older version of ie need this to receive drag events when the mouse is outside the window
if(elementForEvents.setCapture) { elementForEvents.setCapture(); }

touchState.gestureStartTime = clockTime();
touchState.lastTimePositionWasSet = touchState.gestureStartTime;
touchState.hasReceivedMove = false;

_firedMouseClickActionAfterGesture = false;
_currentlyHandlingDragGesture = false;
}
});
};

var makeTouchMove = function (touchState) {
return (function (event) {
if (touchState.phase === kPhaseEnd || touchState.phase === kPhaseCancel) {
return;
}
if (_firedMouseClickActionAfterGesture == true) {
touchState.touchCancel(event);
return;
}

var touchStateOptions = touchState.options;

if (touchState.hasReceivedMove == false) {
_receivedGestureMove++;
touchState.hasReceivedMove = true;

if (touchStateOptions.gestureType == kGestureDrag) {
_currentlyHandlingDragGesture = true;
if (touchStateOptions.timelinesToControl != null) {
for (var i = 0; i < touchStateOptions.timelinesToControl.length; i++) {
var timelineIdentifier = touchStateOptions.timelinesToControl[i]["b"];
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
pauseTimelineWithIdentifier(timelineIdentifier, null);
setTimelineRunIsReversed(timelineRun, false);
touchState.timelineStartTime = currentTimeInTimelineWithIdentifier(timelineRun.timelineIdentifier, false);
var animations = timelineRun.animations;
for(var j = 0; j < animations.length; j++) {
var oid = animations[j]["o"];
var identifier = animations[j]["i"];
if (_dragOwnershipOfPropertiesByElement[oid] === undefined) {
_dragOwnershipOfPropertiesByElement[oid] = {};
}
_dragOwnershipOfPropertiesByElement[oid][identifier] = timelineRun.timelineIdentifier;
}
}
}
if (touchStateOptions.elementToControl != null) {
var elementOid = _idReverseMapping[touchStateOptions.elementToControl.id];
touchState.elementStartLeft = _currentValues[elementOid]['a'];
touchState.elementStartTop = _currentValues[elementOid]['b'];
if(_timelineRunOwnershipOfPropertiesByElement[elementOid] != undefined) {
_timelineRunOwnershipOfPropertiesByElement[elementOid]["a"] = null;
_timelineRunOwnershipOfPropertiesByElement[elementOid]["b"] = null;
stopActiveAnimationsWithoutOwnershipExcludingTimelineRun(null);
}
if (_dragOwnershipOfPropertiesByElement[elementOid] === undefined) {
_dragOwnershipOfPropertiesByElement[elementOid] = {};
}
_dragOwnershipOfPropertiesByElement[elementOid]["a"] = "element";
_dragOwnershipOfPropertiesByElement[elementOid]["b"] = "element";



}

sendDragGestureUpdates(event, touchState);
}
}

var ret;
var mainEvent = touchState.isTouchEvent ? event.touches[0] : event;
//Save the first finger data
var position = pagePosition(mainEvent);
var firstFingerData = touchState.fingerData[0];
firstFingerData.lastPosition.x = firstFingerData.end.x;
firstFingerData.lastPosition.y = firstFingerData.end.y;
touchState.lastTimePositionWasSet = touchState.previousTime;
firstFingerData.end.x = touchState.isTouchEvent ? event.touches[0].pageX : position.x;
firstFingerData.end.y = touchState.isTouchEvent ? event.touches[0].pageY : position.y;

var currentClockTime = clockTime();
touchState.previousTime = currentClockTime;

var currentGestureTime = (currentClockTime - touchState.gestureStartTime);

touchState.gestureDirection = calculateDirection(firstFingerData.start, firstFingerData.end, currentGestureTime);
if (touchState.isTouchEvent) {
touchState.fingerCount = event.touches.length;
}

touchState.phase = kPhaseMove;
if (touchStateOptions.gestureType == kGestureDrag) {
if (event.preventDefault) {
event.preventDefault();
}


var leftOffset = 0;
var topOffset = 0;
var scaleX = 1.0;
var scaleY = 1.0;

if(touchState.elementForEvents != null) {
var parentOid = parentOidForElementOid(_idReverseMapping[touchState.elementForEvents.id]);
while (parentOid != null && parentOid != _mainContentContainerID) {
var parentElement = getElementByHypeOid(parentOid);
leftOffset += getElementAttribute(parentElement, 'a', 0);
topOffset += getElementAttribute(parentElement, 'b', 0);
scaleX *= getElementAttribute(parentElement, 'cQ', 1);
scaleX *= getElementAttribute(parentElement, 'HYP_t', 1);
scaleY *= getElementAttribute(parentElement, 'cR', 1);
scaleY *= getElementAttribute(parentElement, 'HYP_u', 1);
parentOid = parentOidForElementOid(parentOid);
}
}

if (touchStateOptions.timelinesToControl != null) {
for (var i = 0; i < touchStateOptions.timelinesToControl.length; i++) {
var timelineToControlOptions = touchStateOptions.timelinesToControl[i];
var timelineIdentifier = timelineToControlOptions["b"];
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun) {
var duration = timelineDuration(timelineRun);
var direction = directionForDrag(timelineToControlOptions);
var translation;
if (direction == kRight) {
translation = (firstFingerData.end.x - firstFingerData.start.x) / scaleX;
} else if (direction == kLeft) {
translation = (firstFingerData.start.x - firstFingerData.end.x) / scaleX;
} else if (direction == kUp) {
translation = (firstFingerData.start.y - firstFingerData.end.y) / scaleY;
} else if (direction == kDown) {
translation = (firstFingerData.end.y - firstFingerData.start.y) / scaleY;
}
var time = translation / timelineToControlOptions["K"];

time = time + touchState.timelineStartTime;
time = Math.min(duration, time);
time = Math.max(0, time);
goToTimeInTimelineWithIdentifier(time, timelineIdentifier, false, true);
} else {
touchState.touchCancel(event);
}
}
}

if (touchStateOptions.elementToControl != null) {
var elementOid = _idReverseMapping[touchStateOptions.elementToControl.id];

var left = touchState.elementStartLeft + ((firstFingerData.end.x - firstFingerData.start.x) / scaleX);
var top = touchState.elementStartTop + ((firstFingerData.end.y - firstFingerData.start.y) / scaleY);

if (_usesFlexibleLayout == false) {
var currentContainerSize = browserReportedSizeForElementOid(parentOid);
var elementWidth = currentWidthForElementWithOid(elementOid);
left = Math.max(left, -elementWidth / 2 - leftOffset);
left = Math.min(left, currentContainerSize.width - (elementWidth / 2) - leftOffset);
var elementHeight = currentHeightForElementWithOid(elementOid);
top = Math.max(top, -elementHeight / 2 - topOffset);
top = Math.min(top, currentContainerSize.height - (elementHeight / 2) - topOffset);
}

var element = touchStateOptions.elementToControl;
applyValue(element, 'a', left, 'b', top);

}
sendDragGestureUpdates(event, touchState);
} else if (touchStateOptions.gestureType == kGestureSwipe) {
if (touchState.fingerCount > 1) {
touchState.touchCancel(event);
} else {
if (event.preventDefault && (touchState.gestureDirection == touchStateOptions.direction)) {
event.preventDefault();
}
var swipePosition = ((touchStateOptions.direction == kRight) || (touchStateOptions.direction == kLeft)) ? firstFingerData.end.x : firstFingerData.end.y;
var wrongWay = false;
if ((touchStateOptions.direction == kRight) || (touchStateOptions.direction == kDown)) {
wrongWay = ((touchState.minOrMaxForGesture - swipePosition) > 20);
} else {
wrongWay = ((swipePosition - touchState.minOrMaxForGesture) > 20);
}
var isCorrectDirection = ((touchState.gestureDirection === touchStateOptions.direction) || (currentGestureTime < 100));
if (wrongWay || (isCorrectDirection == false) || _currentlyHandlingDragGesture == true) {
touchState.touchCancel(event);
}
}
} else if (touchStateOptions.gestureType == kGestureTap) {
if (distanceBetweenPoints(firstFingerData.start, firstFingerData.end) > 5) {
touchState.touchCancel(event);
}
}
updateMinOrMaxPointForGesture(touchState, position);
});
};

var makeTouchEnd = function (touchState) {
return (function (event) {
if (touchState.phase === kPhaseEnd || touchState.phase === kPhaseCancel) {
return;
}

//If we are still in a touch another finger is down, then dont cancel
if(event.touches && event.touches.length > 0) {
return;
}

if (_firedMouseClickActionAfterGesture == true && _receivedGestureMove > 0) {
touchState.touchCancel(event);
return;
}

var touchStateOptions = touchState.options;

if (event.type == 'touchend') {
if (event.changedTouches.length > 0 && touchStateOptions.type == kGestureTap) {
preventMouseEventsForTouch(event.changedTouches[0]);
}
}

var currentClockTime = clockTime();
var currentGestureTime = (currentClockTime - touchState.gestureStartTime);
var firstFingerData = touchState.fingerData[0];
touchState.gestureDirection = calculateDirection(firstFingerData.start, firstFingerData.end, currentGestureTime);
touchState.phase = kPhaseEnd;

//The number of fingers we want were matched, or on desktop we ignore
var hasCorrectFingerCount = (touchState.fingerCount === 1 || !touchState.isTouchEvent);
//We have an end value for the finger
var hasEndPoint = firstFingerData.end.x !== 0;
if (touchStateOptions.gestureType == kGestureDrag) {
if (touchState.hasReceivedMove == false) {
removeTouchEventHandlers(touchState);
return;
}
_dragOwnershipOfPropertiesByElement = {};
if (touchStateOptions.timelinesToControl != null) {
var timeSinceLastPositionInSeconds = (currentClockTime - touchState.lastTimePositionWasSet) / 1000;
for (var i = 0; i < touchStateOptions.timelinesToControl.length; i++) {
var timelineToControlOptions = touchStateOptions.timelinesToControl[i];
var timelineIdentifier = timelineToControlOptions["b"];
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
var continuePlaying = timelineToControlOptions["y"];
if (timelineRun) {
var duration = timelineDuration(timelineRun);
var forwardDirection = directionForDrag(timelineToControlOptions);
var dragSpeed  = timelineToControlOptions["K"];
var continueTimeline = false;
var reversed = false;
var playScale = 1;
if (continuePlaying == true) {
var velocity = 0;
if (timelineToControlOptions["c"] == 0) {
velocity = Math.abs(firstFingerData.lastPosition.x - firstFingerData.end.x) / timeSinceLastPositionInSeconds;
} else {
velocity = Math.abs(firstFingerData.lastPosition.y - firstFingerData.end.y) / timeSinceLastPositionInSeconds;
}

velocity *= 2; // magic number to more easily account for slowing down as the finger lifts up

if (velocity > 20) {
continueTimeline = true;
var lastDirection = calculateDirectionAlongAxis(firstFingerData.lastPosition, firstFingerData.end, timelineToControlOptions);
reversed = (lastDirection != forwardDirection);
playScale = velocity / dragSpeed;
} else {
// too slow to accurately predict direction find the nearest endpoint or timeline action with a pause and go in that direction
var currentTimeInTimeline = currentTimeInTimelineWithIdentifier(timelineRun.timelineIdentifier, false);
var distanceFromCurrentTime = currentTimeInTimeline;
var timeToContinueTo = 0;
for (var j = 0; j < timelineRun.animations.length; j++) {
var animation = timelineRun.animations[j];
if (animation["p"] == kAnimationTypeTimelineAction) {
var actions = animation["s"]["a"];
var containsPauseAction = false;
for (var k = 0; k < actions.length; k++) {
var action = actions[k];
if (action["p"] == kActionPauseTimeline && action["b"] != null && action["b"] == timelineIdentifier) {
 containsPauseAction = true;
 break;
}
}
if (containsPauseAction == true) {
var startTime = animation["t"];
var distance = Math.abs(startTime - currentTimeInTimeline);
if (distance < distanceFromCurrentTime) {
distanceFromCurrentTime = distance;
timeToContinueTo = startTime;
}
}
}
}
if (duration - currentTimeInTimeline < distanceFromCurrentTime) {
timeToContinueTo = duration;
distanceFromCurrentTime = duration - currentTimeInTimeline;
}
if (distanceFromCurrentTime != 0) {
continueTimeline = true;
reversed = (timeToContinueTo < currentTimeInTimeline);
playScale = Math.abs(timeToContinueTo - currentTimeInTimeline) / 0.2;
}
}
}

setTimelineRunIsReversed(timelineRun, reversed);
setTimelineRunPlayScale(timelineRun, playScale);

if (continueTimeline == true && timelineRun.pauseTime != duration) {
continueTimelineWithIdentifier(timelineIdentifier, reversed, false, false);
} else {
// run any timeline actions at this point
var nonReversedTime = reversed ? (duration - timelineRun.pauseTime) : timelineRun.pauseTime;
goToTimeInTimelineWithIdentifier(nonReversedTime, timelineIdentifier, true, true);
}
}
}
}
sendDragGestureUpdates(event, touchState);
} else if (touchStateOptions.gestureType == kGestureSwipe) {
var isCorrectDirection = (touchState.gestureDirection === touchStateOptions.direction);
var isSwipe = (hasCorrectFingerCount && hasEndPoint && isCorrectDirection);
var totalDistance = distanceBetweenPoints(firstFingerData.start, firstFingerData.end);

if (isSwipe && (totalDistance > touchStateOptions.threshold)) {
var swipeType = "HypeSwipe" + touchStateOptions.direction.charAt(0).toUpperCase() + touchStateOptions.direction.slice(1) + "Action";
var swipeActionFauxEvent = {"type" : swipeType};
touchState.updateFunction(swipeActionFauxEvent);
} else {
touchState.touchCancel(event);
}
} else if (touchStateOptions.gestureType == kGestureTap) {
if (currentGestureTime < 1500) {
touchState.updateFunction(event);
}
} else {
touchState.touchCancel(event);
}
removeTouchEventHandlers(touchState);
});
};

var addDragGestureHandler = function (element, value) {
var options = { fingers : 1, continuousUpdates : true, gestureType : kGestureDrag };

// add any timelines or elements to control to the options
var actions = value["a"];
var allActionsAreNone = true;
for (var i = 0; i < actions.length; i++) {
var action = actions[i];
var type = action["p"];
if(type != kActionNone) {
allActionsAreNone = false;
}
if (type == kActionControlTimeline && action["b"] != null) {
if (options.timelinesToControl == null) {
options.timelinesToControl = Array();
}
var timelineControlOptions = {"b" : action["b"], "c" : action["c"], "A" : action["A"], "y" : action["y"] , "K" : 100 / action["K"]};
options.timelinesToControl.push(timelineControlOptions);
} else if (type == kActionControlElementPosition) {
options.elementToControl = element;
}
}
if (allActionsAreNone == false) {
addGestureHandler(element, options, createActionHandler(element, actions));
}
};

var addGestureHandler = function (element, options, func) {
var touchState = {
gestureDirection : null,
phase : kPhaseEnd,
fingerCount : 0,
fingerData : null,
gestureStartTime : 0,
timelineStartTime : 0,
lastTimePositionWasSet : 0,
previousTime : 0,
elementStartLeft : 0,
elementStartTop : 0,
touchMove : null,
touchEnd : null,
touchCancel : null,
isTouchEvent : false,
hasRemovedEventHandlers : false,

options : options,
updateFunction : func,
elementForEvents : element
};
addEventHandler('touchstart', makeTouchStart(touchState), element, true);
if (options.gestureType == kGestureDrag || options.gestureType == kGestureSwipe) {
var elementToSetStyle = (element == document) ? _mainContentContainer : element;
elementToSetStyle.style.msTouchAction = 'none';
elementToSetStyle.style.touchAction = 'none';
}
// we do not want to add the mousedown event for tap because we will use the regular click event instead
if (options.gestureType != kGestureTap) {
addEventHandler('mousedown', makeTouchStart(touchState), element, true);
}
};

var addActionHandler = function (eventName, element, func, interactsWithDrag) {
_addActionHandler(eventName, element, func, interactsWithDrag);

// need to make dummy to set mouseOverElement correctly
if(eventName == "mouseover") {
_addActionHandler("mouseout", element, (function (e) { return; }), interactsWithDrag);
} else if(eventName == "mouseout") {
_addActionHandler("mouseover", element, (function (e) { return; }), interactsWithDrag);
}
};

var _addActionHandler = function (eventName, element, func, interactsWithDrag) {
if(eventName == "click" || eventName == "mouseup") {
// Click and mouseup events triggered by touch on the Surface don't work if there are drag or swipe action handlers because mousemove is always triggered, so use pointerup events on the Surface
if (window.navigator.pointerEnabled) {
eventName = "pointerup";
} else if (window.navigator.msPointerEnabled) {
eventName = "MSPointerUp";
} else {
// convert click events to mouse up events because in the case of buttons, the innerhtml change can squash the click event
eventName = "mouseup";
}
}

var handler = (function (e) {
e = (e) ? e : window.event;

// fixes behavior where inner elements cause bubbled mouseovers/mouseouts
if(e.type == "mouseover") {
var mouseOverAlreadyBeganForFunc = false;
for(var i = 0; i < _mouseOverElementFunctions.length; i++) {
    if (_mouseOverElementFunctions[i] == func) {
        mouseOverAlreadyBeganForFunc = true;
        break;
    }
}
if(mouseOverAlreadyBeganForFunc == true) {
// we shouldn't accept other mouse overs
return;
} else {
// we're really over something, and continue with this method
_mouseOverElementFunctions.push(func);
}
} else if(e.type == "mouseout") {
// make sure the mouseout element is on the actual scene
var sceneIndex = sceneIndexForElement(element);
if(_scenes[sceneIndex]["v"][_idReverseMapping[element.id]] == null) {
return;
}

// get position and make sure it is really outside the element
// code adapted from http://www.quirksmode.org/js/events_properties.html
if(!e) {
e = window.event;
}

var mouseOutElement = document.elementFromPoint(e.clientX, e.clientY);
var searchElement = this;
var currentElement = mouseOutElement;
while(currentElement != null && currentElement != searchElement && currentElement.nodeName != 'BODY') {
currentElement = currentElement.parentNode;
}

if(currentElement == searchElement) {
// we're still inside
return;
} else {
// set that we're really out of something, and continue with the method
_mouseOverElementFunctions = Array();
}
} else if(e.type == "mousedown") {
// don't do anything if it is a right-click/control-click 
if(e.ctrlKey == true || e.button != 0) {
return;
}
} else if (e.type == "touchstart") {
if (e.touches.length > 0) {
preventMouseEventsForTouch(e.touches[0]);
}
} else if (e.type == "touchend") {
if (e.changedTouches.length > 0) {
preventMouseEventsForTouch(e.changedTouches[0]);
}
}

if (interactsWithDrag == true && (e.type == "mouseclick" || e.type == "mouseup" || e.type == "touchend")) {
if (_receivedGestureMove > 0) {
return;
}
_firedMouseClickActionAfterGesture = true;
}

func(e);
});
addEventHandler(eventName, handler, element, true);

var accessibleHandler = (function (e) {
e = (e) ? e : window.event;
// fire the handler on space or return press
if ((e.keyCode == 32) || (e.keyCode == 13)) {
handler(e);
}
});

if (eventName == "click") {
// Not technically ever hit as we convert click to pointerup/MSPointerUp/mouseup at the start of this function, but included for completeness should we change the above logic
addEventHandler("keypress", accessibleHandler, element, true);
} else if (eventName == "mousedown") {
addEventHandler("keydown", accessibleHandler, element, true);
} else if (eventName == "mouseup") {
addEventHandler("keyup", accessibleHandler, element, true);
}
};

var addCustomBehaviorHandler = function (customBehaviorName, element, func, persistentSymbolOid) {
if (persistentSymbolOid) {
_persistentSymbols[persistentSymbolOid].customBehaviors[customBehaviorName] = func;
} else {
var observers = _customBehaviorObserversByName[customBehaviorName];
if(observers == null) {
observers = Array();
_customBehaviorObserversByName[customBehaviorName] = observers;
}
observers.push(func);
}
};

var triggerCustomBehaviorNamed = function (customBehaviorName) { // public, do not change signature without wrapping in _hype['API']!
var triggerCustomBehaviorFauxEvent = {"type" : "HypeTriggerCustomBehavior", "customBehaviorName" : customBehaviorName};
var observers = _customBehaviorObserversByName[customBehaviorName];
if(observers != null) {
for(var i = 0; i < observers.length; i++) {
observers[i](triggerCustomBehaviorFauxEvent);
}
}
for (var persistentSymbolOid in _persistentSymbols) {
if (_persistentSymbols.hasOwnProperty(persistentSymbolOid) == false) {
continue;
}
var behavior = _persistentSymbols[persistentSymbolOid].customBehaviors[customBehaviorName];
if (behavior != null) {
behavior(triggerCustomBehaviorFauxEvent);
}
}
notifyEvent(triggerCustomBehaviorFauxEvent, null);
};

var getSymbolInstanceById = function (id) { // public, do not change signature without wrapping in _hype['API']!
if (id == null) {
return;
}
return _symbols[_idReverseMapping[id]];
};

var getSymbolInstancesByName = function (name) { // public, do not change signature without wrapping in _hype['API']!
var symbolInstances = Array();
var symbolsByElementId = _scenes[_currentSceneIndex]["U"];
for (var symbolKey in symbolsByElementId) {
if (symbolsByElementId.hasOwnProperty(symbolKey) == false) {
continue;
}
if (symbolsByElementId[symbolKey]["n"] == name) {
symbolInstances.push(_symbols[symbolKey]);
}
}
return symbolInstances;
}

var contentContainerClickHandler = function (event) {
for (var i = 0; i < _touchEventCoordinates.length; i++) {
var position = pagePosition(event);
if (Math.abs(position.x - _touchEventCoordinates[i].x) < 25 && Math.abs(position.y - _touchEventCoordinates[i].y) < 25) {
event.stopPropagation();
event.preventDefault();
}
}
};

var preventMouseEventsForTouch = function (touch) {
var position = pagePosition(touch);
_touchEventCoordinates.push(position);
window.setTimeout(removeCoordinates, 2500);
};

var removeCoordinates = function () {
_touchEventCoordinates.splice(0, 1);
};

var applyActionHandlersToElement = function (initialValues, domElement) {
var identifiers = kActionHandlerIdentifiers;
// button states need to be applied before other action handlers in persistent symbols so that the button state will be reset before jumping to a new scene if there is a jump to scene action handler, otherwise a button is left in the pressed state after a scene transistion
for (var i = 0; i < 2; i++) {
for (var j = 0; j < identifiers.length; j++) {
var identifier = identifiers[j];
if(initialValues.hasOwnProperty(identifier) == false) {
continue;
}
var applyAttribute = (i == 0) ? false : true;
if (identifier == 'aM' || identifier == 'aN') {
if (i == 0) {
applyAttribute = true;
} else {
applyAttribute = false;
}
}
if (applyAttribute == false) {
continue;
}
applyValue(domElement, identifier, initialValues[identifier]);
}
}
}

var applyWaypointsToElement = function(initialValues, domElement) {
var waypointIdentifiers = kWaypointHandlerIdentifiers;
for (var i = 0; i < waypointIdentifiers.length; i++) {
var identifier = waypointIdentifiers[i];
if(initialValues.hasOwnProperty(identifier) == false) {
continue;
}
applyValue(domElement, identifier, initialValues[identifier]);
}
}

var applyInitialValuesToElement = function (initialValues, domElement, domElementId, skipActionHandlers) {
var preemptiveIdentifiers = ['bF', 'bS', 'tX', 'tY', 'b', 'a', 'c', 'd', 'j'];
// create an array to hold all current values (used for relative keyframes)
// I would clear it out each time, however if I do that than border radius on IE6 does not show up when going to/from a scene (very odd...)
var oid = _idReverseMapping[domElementId];
if(_currentValues[oid] == null) {
_currentValues[oid] = {};
}

var sceneIndex = sceneIndexForElement(domElement);
var symbol = _scenes[sceneIndex]["U"][_idReverseMapping[domElementId]];
if (symbol) {
_symbols[_idReverseMapping[domElementId]] = createAPIForSymbol(symbol, domElement);
}

if(_useCSSPositioning == false && initialValues['bE'] == null) {
setElementAttribute(domElement, "HYP_m", "1");
}

// set parent first because updatePhysicsBody would otherwise create an element in the wrong composite
// always set flexible layout options next, always set dimensions after that
//!! this is a bit of a hack for IE, since I might rewrite elements... the correct fix would be to lookup the elementbyid each time or to make outer divs that don't change
for(var j = 0; j < preemptiveIdentifiers.length; j++) {
var identifier = preemptiveIdentifiers[j];
applyValue(domElement, identifier, initialValues[identifier]);
}


var waypointIdentifiers = kWaypointHandlerIdentifiers;
var actionIdentifiers = kActionHandlerIdentifiers;
// symbol level actions also need to be ignored until after the scene transition is over so they don't get added twice
actionIdentifiers.push("cG", "cH", "cI", "cJ", "cK", "cF");
// apply all other attributes
for(var attributeIdentifier in initialValues) {
if(initialValues.hasOwnProperty(attributeIdentifier) == false) {
continue;
}

var applyAttribute = true;
for (var j = 0; j < waypointIdentifiers.length; j++) {
// waypoints need to be applied after scene load in case they immediately kick off any actions
if (waypointIdentifiers[j] == attributeIdentifier) {
applyAttribute = false;
break;
}
}
if (applyAttribute == false) {
continue;
}

// persistent symbol action handlers are applied in a different place using applyActionHandlers this prevents them from being added twice
if (skipActionHandlers == true) {
for (var j = 0; j < actionIdentifiers.length; j++) {
if (actionIdentifiers[j] == attributeIdentifier) {
applyAttribute = false;
break;
}
}
}
if (applyAttribute == false) {
continue;
}
var initialValue = initialValues[attributeIdentifier];
applyValue(domElement, attributeIdentifier, initialValue);
}


};

var prepareElementsInSceneForDisplay = function (sceneOid, previousSceneIndex) {
var scene = getElementByHypeOid(sceneOid);
_currentValues[sceneOid] = {};

var persistentSymbolOidsInPreviousScene = [];
var previousElements = _scenes[previousSceneIndex]["v"];
for (var key in previousElements) {
if (previousElements.hasOwnProperty(key) == false) {
continue;
}
var element = previousElements[key];
var persistentSymbolOid = element['cL'];
if (persistentSymbolOid) {
persistentSymbolOidsInPreviousScene.push(persistentSymbolOid);
}
}

var sceneIndex = scene.getAttribute("HYPE_scene_index");
var elements = _scenes[sceneIndex]["v"];
var persistentSymbolDomElementsToAdd = [];
// add any persistent symbols present in the new scene
var persistentSymbolsToOrderBack = [];
var largestPersistentSymbolIndex = 0;
for (var key in elements) {
if (elements.hasOwnProperty(key) == false) {
continue;
}
var element = elements[key];
var persistentSymbolOid = element['cL'];
if (persistentSymbolOid) {
var persistentSymbolIsPresentInPreviousScene = false;
for (var i = 0; i < persistentSymbolOidsInPreviousScene.length; i++) {
       if (persistentSymbolOidsInPreviousScene[i] === key) {
persistentSymbolIsPresentInPreviousScene = true;
break;
}
}
var domElement = _persistentSymbols[persistentSymbolOid].element;
var symbolContainer = domElement;
if (symbolContainer.parentNode.className == "HYPE_element_container") { // 3d support
symbolContainer = domElement.parentNode;
}
if (persistentSymbolIsPresentInPreviousScene) {
if (_currentValues[_idReverseMapping[domElement.id]]) {
var parentNode = domElement;
var xOffset = 0;
var yOffset = 0;
while (parentNode && parentNode.id != _mainContentContainerID) {
xOffset += getElementAttribute(parentNode, 'a', 0);
yOffset += getElementAttribute(parentNode, 'b', 0);
parentNode = parentNode.parentNode;
}
applyValue(domElement, "a", xOffset, "b", yOffset);
}
_mainContentContainer.appendChild(symbolContainer);
if (_persistentSymbols[persistentSymbolOid].displayOnTop) {
symbolContainer.style.zIndex += 100;
} else {
persistentSymbolsToOrderBack.push(symbolContainer);
var zIndex = symbolContainer.style.zIndex;
if (zIndex > largestPersistentSymbolIndex) {
largestPersistentSymbolIndex = symbolContainer.style.zIndex;
}
}
} else {
// wait to append the persistent symbol until after the inital attributes have been applied
// use array as minification, I know how to index these below (container=0, domElement=1, sceneElement=2)
persistentSymbolDomElementsToAdd.push([symbolContainer, domElement, element]);
}

if (_persistentSymbols[persistentSymbolOid].initialValuesHaveBeenSet == false) {

applyInitialValuesInScene(symbolContainer, true);
_persistentSymbols[persistentSymbolOid].initialValuesHaveBeenSet = true;

// remove from parent, because if the symbol is in a group it will be added prematurely to the DOM; this needs to happen later
if(symbolContainer.parentNode != null) {
symbolContainer.parentNode.removeChild(symbolContainer);
}
}
}
}
for (var i = 0; i < persistentSymbolsToOrderBack.length; i++) {
var domElement = persistentSymbolsToOrderBack[i];
domElement.style.zIndex = domElement.style.zIndex - largestPersistentSymbolIndex - 1;
}

applyInitialValuesInScene(scene, false);

for (var i = 0; i < persistentSymbolDomElementsToAdd.length; i++) {
var container = persistentSymbolDomElementsToAdd[i][0]; // index for container
scene.appendChild(container);
var domElement = persistentSymbolDomElementsToAdd[i][1]; // index for domElement
var element = persistentSymbolDomElementsToAdd[i][2]; // index for sceneElement
applyInitialValuesToElement(element, domElement, domElement.id, true);
}
};

var loadScene = function (sceneIdentifier) {
var previousSceneIndex = _currentSceneIndex;
pauseVideos();
stopAllTimelineRuns();
var symbolsToRemove = [];
for (var symbolKey in _symbols) {
if (_symbols.hasOwnProperty(symbolKey) == false) {
continue;
}

var isPersistentDescendant = false;
for (var parentOid in _persistentSymbolDescendants) {
if (_persistentSymbolDescendants.hasOwnProperty(parentOid) == false) {
continue;
}
for (var j = 0; j < _persistentSymbolDescendants[parentOid].length; j++) {
if (symbolKey == _persistentSymbolDescendants[parentOid][j]) {
isPersistentDescendant = true;
break;
}
}
if (isPersistentDescendant == true) {
break;
}
}
if (isPersistentDescendant == false) {
symbolsToRemove.push(symbolKey);
}
}
for (var i = 0; i < symbolsToRemove.length; i++) {
delete _symbols[symbolsToRemove[i]];
}

_mouseOverElementFunctions = Array();


_currentSceneIndex = indexOfSceneWithIdentifier(sceneIdentifier);

var scene = getElementByHypeOid(sceneIdentifier);
var sceneIndex = scene.getAttribute("HYPE_scene_index");



resetVideos();

if (_waypoint != null) {
for(var i = 0; i < _activeWaypoints.length; i++) {
_activeWaypoints[i]['destroy']();
}
_activeWaypoints = [];
}

prepareElementsInSceneForDisplay(sceneIdentifier, previousSceneIndex);

//!! todo, I removed a drain here, do I actually need it for flexible layout?

var timelines = _scenes[sceneIndex]["T"];
for (var timelineIdentifier in timelines) {
if (timelines.hasOwnProperty(timelineIdentifier) == false) {
continue;
}
var timelineInfo = _scenes[_currentSceneIndex]["T"][timelineIdentifier];
var persistentSymbolOid = timelineInfo["s"];
if (persistentSymbolOid == undefined) {
var animations = timelineInfo["a"];
createTimelineRun(timelineIdentifier, animations, timelineInfo);
}
}

var keyHandlerNames = {"C" : "keydown", "D" : "keyup", "E" : "keypress"};
for(var handlerName in keyHandlerNames) {
if(keyHandlerNames.hasOwnProperty(handlerName) == false || _scenes[sceneIndex][handlerName] == null) {
continue;
}

var keyFunction = createActionHandler(currentSceneElement(), _scenes[sceneIndex][handlerName]["a"]);
var eventName = keyHandlerNames[handlerName];
_currentSceneActionHandlers[eventName] = keyFunction;
if (document.addEventListener) {
document.addEventListener(eventName, keyFunction, false);
} else if (document.attachEvent) {
document.attachEvent("on" + eventName, keyFunction);
}
}

var customBehaviors = _scenes[sceneIndex]["L"];
for(var i = 0; i < customBehaviors.length; i++) {
var customBehaviorName = customBehaviors[i]["B"];
var actionHandler = createActionHandler(currentSceneElement(), customBehaviors[i]["a"]);
addCustomBehaviorHandler(customBehaviorName, document, actionHandler, null);
}

var swipeActionNames = {"G" : kLeft, "H" : kRight, "I" : kUp, "J" : kDown};
for (var swipeName in swipeActionNames) {
if (swipeActionNames.hasOwnProperty(swipeName) == false) {
continue;
}
var swipeHandler = _scenes[sceneIndex][swipeName];
if (swipeHandler) {
var swipeActions = swipeHandler["a"];
var allActionsAreNone = true;
for(var i = 0; i < swipeActions.length; i++) {
var action = swipeActions[i];
var type = action["p"];
if(type != kActionNone) {
allActionsAreNone = false;
break;
}
}
if (allActionsAreNone == false) {
 var swipeFunction = createActionHandler(currentSceneElement(), swipeActions);
 var options = {
fingers : 1,
direction : swipeActionNames[swipeName],
threshold : 30,
gestureType : kGestureSwipe
};
addGestureHandler(scene, options, swipeFunction);
}
}
}
var dragHandler = _scenes[sceneIndex]["K"];
if (dragHandler) {
addDragGestureHandler(document, dragHandler);
}
};

var domElementIdsInScene = function (scene) {
var domElements = getElementsByClassName("HYPE_element", scene);
var domElementIds = []; // need this because simply iterating over domElements will be wrong if the dom hierarchy changes

for(var i = 0; i < domElements.length; i++) {
domElementIds.push(domElements[i].id);
}
return domElementIds;
}

var applyInitialWaypointValuesInScene = function (scene) {
var sceneIndex = sceneIndexForElement(scene);
var domElementIds = domElementIdsInScene(scene);

for (var i = 0; i < domElementIds.length; i++) {
var domElementId = domElementIds[i];
var domElement = document.getElementById(domElementId);
var initialValues = _scenes[sceneIndex]["v"][_idReverseMapping[domElementId]];
if (initialValues == null) {
continue;
}
applyWaypointsToElement(initialValues, domElement);
}
}

var applyInitialValuesInScene = function (scene, skipActionHandlers) {
var sceneIndex = sceneIndexForElement(scene);
var domElementIds = domElementIdsInScene(scene);


beginFrameUpdateQueue();





for(var i = 0; i < domElementIds.length; i++) {
var domElementId = domElementIds[i];
var domElement = document.getElementById(domElementId);
var initialValues = _scenes[sceneIndex]["v"][_idReverseMapping[domElementId]];
if(initialValues == null) {
continue;
}

applyInitialValuesToElement(initialValues, domElement, domElementId, skipActionHandlers);
}


drainFrameUpdateQueue();




};

var completeSceneTransition = function (currentSceneContainer, nextSceneContainer, timelineIdentifier, shouldRunActionsAndTimelines) {
_inSceneTransition = false;

if(timelineIdentifier != null) {
delete _scenes[_currentSceneIndex]["T"][timelineIdentifier];
}

nextSceneContainer.style.display = "block";
applyValue(nextSceneContainer, "bQ", 0, "aY", 0);
setElementAttribute(nextSceneContainer, "HYP_m", "0");
applyValue(nextSceneContainer, "b", 0, "a", 0, "z", 1, "e", 1);

var scalePercentageWidth = _scenes[_currentSceneIndex]["a"];
if (scalePercentageWidth != null) {
nextSceneContainer.style.width = '100%';
_mainContentContainer.style.width = scalePercentageWidth + '%';
} else {
nextSceneContainer.style.width = transformValuePixel(_scenes[_currentSceneIndex]["Y"]); // use direct since applyValue doesn't think width/height should be percents
_mainContentContainer.style.width = nextSceneContainer.style.width;
}
var scalePercentageHeight = _scenes[_currentSceneIndex]["b"];
if (scalePercentageHeight != null) {
nextSceneContainer.style.height = '100%';
_mainContentContainer.style.height = scalePercentageHeight + '%';
} else {
nextSceneContainer.style.height = transformValuePixel(_scenes[_currentSceneIndex]["Z"]); // use direct since applyValue doesn't think width/height should be percents
_mainContentContainer.style.height = nextSceneContainer.style.height;
}
invalidateBrowserReportedSizeCacheForElement(_mainContentContainer);
invalidateBrowserReportedSizeCacheForElement(nextSceneContainer);

// cleanup after transition
if(_currentValues[_idReverseMapping[currentSceneContainer.id]] && currentSceneContainer != null && currentSceneContainer != nextSceneContainer) {
currentSceneContainer.style.display = "none";
currentSceneContainer.setAttribute("aria-hidden", true);
applyValue(currentSceneContainer, "bQ", 0, "aY", 0, "b", 0, "a", 0, "z", 0, "e", 1);
setElementAttribute(currentSceneContainer, "HYP_m", "0");
}

_mainContentContainer.style["-webkit-perspective"] = null;
_mainContentContainer.style[_hype.kSizeOptimizationWebKitPrefix + "transform-style"] = "flat";
_mainContentContainer.style["-moz-perspective"] = null;
_mainContentContainer.style["perspective"] = null;



var persistentSymbolOidsInScene = [];
var elementsInitialValues = _scenes[_currentSceneIndex]["v"];
for (var key in elementsInitialValues) {
if (elementsInitialValues.hasOwnProperty(key) == false) {
continue;
}
var element = elementsInitialValues[key];
var persistentSymbolOid = element['cL'];
if (persistentSymbolOid) {
persistentSymbolOidsInScene.push(persistentSymbolOid);
var domElement = _persistentSymbols[persistentSymbolOid].element;
_currentValues[_idReverseMapping[domElement.id]] = null;
var newElement = document.createElement(element['k']);
newElement.className = (element['cP']) ? "HYPE_element HYPE_scene " + element['cP'] : "HYPE_element HYPE_scene";
newElement.id = domElement.id;
newElement.style["pointerEvents"] = "auto";
newElement.style["pointer-events"] = "auto";
while (domElement.childNodes.length > 0) {
    newElement.appendChild(domElement.childNodes[0]);
}

if(domElement.parentNode) {
domElement.parentNode.appendChild(newElement);
domElement.parentNode.removeChild(domElement);
}
domElement = newElement;
_persistentSymbols[persistentSymbolOid].element = domElement;

var containerElement = domElement;
if (containerElement.parentNode && containerElement.parentNode.className == "HYPE_element_container") { // 3d support
containerElement = containerElement.parentNode;
var elementContainerDivStyle = containerElement.style; 
if (element['bR'] != null || element['aY'] != null) {
var perspective = _scenes[_currentSceneIndex]["p"];
elementContainerDivStyle["-webkit-perspective"] = perspective;
elementContainerDivStyle["MozPerspective"] = perspective;
elementContainerDivStyle["perspective"] = perspective;
} else {
elementContainerDivStyle["-webkit-perspective"] = "";
elementContainerDivStyle["MozPerspective"] = "";
elementContainerDivStyle["perspective"] = "";
}
}
nextSceneContainer.appendChild(containerElement);
applyInitialValuesToElement(element, domElement, domElement.id, false);

if(shouldRunActionsAndTimelines == true) {
var descendantsOfPersistentSymbol = getElementsByClassName("HYPE_element", domElement);
for (var i = 0; i < descendantsOfPersistentSymbol.length; i++) {
var persistentSymbolDomElement = descendantsOfPersistentSymbol[i];
applyActionHandlersToElement(elementsInitialValues[_idReverseMapping[persistentSymbolDomElement.id]], persistentSymbolDomElement);
}
var timelineRuns = _persistentSymbols[persistentSymbolOid].timelineRuns;
for (var i = 0; i < timelineRuns.length; i++) {
_timelineRuns.push(timelineRuns[i]);
}
}
}
}
// put any shared symbols not present in the scene back into the persistent container
var persistentSymbolsContainer = document.getElementById(_hiddenPersistentSymbolsContainerID);
for (var key in _persistentSymbols) {
if (_persistentSymbols.hasOwnProperty(key) == false) {
continue;
}
var persistentSymbolIsPresentInCurrentScene = false;
for (var i = 0; i < persistentSymbolOidsInScene.length; i++) {
       if (persistentSymbolOidsInScene[i] === key) {
persistentSymbolIsPresentInCurrentScene = true;
break;
}
}
if (persistentSymbolIsPresentInCurrentScene == false) {
var domElement = _persistentSymbols[key].element;
if (domElement.parentNode.className == "HYPE_element_container") { // 3d support
domElement = domElement.parentNode;
}
persistentSymbolsContainer.appendChild(domElement);
}
}

// make the content container visible and non-busy to screen readers and also reveal the destination scene
_mainContentContainer.removeAttribute("aria-hidden");
_mainContentContainer.removeAttribute("aria-busy");
nextSceneContainer.removeAttribute("aria-hidden");

if(shouldRunActionsAndTimelines == true) {
// begin any animations
startTimelineRun(kTimelineDefaultIdentifier, null, false);



// run any symbol load actions
var domElements = getElementsByClassName("HYPE_element", currentSceneElement());
for (var i = 0; i < domElements.length; i++) {
var element = domElements[i];
if(isSymbolElement(element) == false) {
continue;
}

var persistentSymbolOid = elementsInitialValues[_idReverseMapping[element.id]]['cL'];
if (persistentSymbolOid) {
var persistentSymbol = _persistentSymbols[persistentSymbolOid];
if (persistentSymbol.hasRunLoadAction) {
continue;
}
persistentSymbol.hasRunLoadAction = true;
}

var symbolLoadFauxEvent = {"type" : "HypeSymbolLoad"};
notifyEvent(symbolLoadFauxEvent, element);

var actionHandler = getElementAttribute(element, "cK");
if (actionHandler) {
var loadFunction = createActionHandler(element, actionHandler["a"]);
loadFunction(symbolLoadFauxEvent);
}
}

// trigger event handlers
var sceneLoadFauxEvent = {"type" : "HypeSceneLoad"};
var eventResult = notifyEvent(sceneLoadFauxEvent, null);

if(eventResult !== false) {
// scene load event (happens after main timeline starts so it can be paused if need be)
var sceneIndex = indexOfSceneWithIdentifier(_idReverseMapping[nextSceneContainer.id]);
var onSceneLoadData = _scenes[sceneIndex]["A"];
if(onSceneLoadData != null) {
var onSceneLoadActions = onSceneLoadData["a"];
var onLoadFunction = createActionHandler(currentSceneElement(), onSceneLoadActions);
onLoadFunction(sceneLoadFauxEvent);
}
}
applyInitialWaypointValuesInScene(nextSceneContainer);
}
};

var untransformNumber = function (value) {
if(typeof value != "number") {
value = parseFloat(value);
}
if(isNaN(value)) {
return 0;
}
return value;
};

// Hex Color methods from http://www.openjs.com/scripts/graphics/hex_color_rbg_value_converter.php

var untransformColor = function (value) {
var colorComponents = [0,0,0,1];

if(value.indexOf("rgb") == 0) {
var startIndex = value.indexOf("(");
var endIndex = value.indexOf(")");
if(endIndex - startIndex > 3) {
var colorComponentStrings = value.substring(startIndex + 1, endIndex).split(",");
for(var i = 0; i < colorComponentStrings.length; i++) {
colorComponents[i] = parseFloat(colorComponentStrings[i]);
}
}
} else {
//Convert a hex value to its decimal value - the inputted hex must be in the
//format of a hex triplet - the kind we use for HTML colours. The function
//will return an array with three values.
if(value.charAt(0) == "#") {
value = value.slice(1); //Remove the '#' char - if there is one.
}
value = value.toUpperCase();
var hex_alphabets = _hype.kSizeOptimizationHexAlphabet;
for(var i = 0; i < 3; i++) {
colorComponents[i] = (hex_alphabets.indexOf(value.charAt(i * 2)) * 16) + hex_alphabets.indexOf(value.charAt((i * 2) + 1));
}
}

return colorComponents;
};

var transformValuePixel = function (value, decimalPlaces) {
var precision = Math.pow(10, decimalPlaces == null ? 0 : decimalPlaces);
return "" + (Math.round(value * precision) / precision) + "px";
};

var transformValueColor = function (colorComponents, prefersHex) {
if(colorComponents[3] == 1 || prefersHex == true) { // no alpha
//Give a array with three values as the argument and the function will return
//the corresponding hex triplet.
var hex_alphabets = _hype.kSizeOptimizationHexAlphabet;
var hex = "#";
for(var i = 0; i < 3; i++) {
hex += hex_alphabets.charAt(colorComponents[i] / 16) + hex_alphabets.charAt(colorComponents[i] % 16);
}
return hex;
} else {
// assumes rgb is 0-255 and a is 0.0-1.0
return "rgba(" + parseInt(colorComponents[0]) + "," + parseInt(colorComponents[1]) + "," + parseInt(colorComponents[2]) + "," + parseFloat(colorComponents[3]) + ")";
}
};

var sanitizeColor = function (colorString) {

return colorString;
};

var transformValueDegree = function (value) {
return "" + value + "deg";
};

var transformValuePercent = function (value) {
return "" + (value * 100.0) + "%";
};

var transformValueFraction = function (value) {
return "" + value + "";
};

var getPublicElementProperty = function (element, publicPropertyName) { // public, do not change signature without wrapping in _hype['API']!
var attributeInfo = kPublicPropertyMapping[publicPropertyName];
if(attributeInfo == null) {
return null;
}

var attributeIdentifier = attributeInfo["HYP_r"];
var elementOid = _idReverseMapping[element.id];
var value = _currentValues[elementOid][attributeIdentifier];
return (value != null) ? value : attributeInfo["HYP_s"]
};

var setPublicElementProperty = function (element, publicPropertyName, value, duration, publicTimingFunctionName) {  // public, do not change signature without wrapping in _hype['API']!
var timingFunctionMapping = {
"easein" : "d",
"easeout" : "e",
"easeinout" : "c",
"linear" : "b"
};

var attributeInfo = kPublicPropertyMapping[publicPropertyName];
if(attributeInfo == null) {
return;
}

var attributeIdentifier = attributeInfo["HYP_r"];
var elementOid = _idReverseMapping[element.id];
var timelineIdentifier = "" + elementOid + attributeIdentifier; // make a unique timeline identifier for this change

if(duration > 0 && attributeIdentifier != "z" && attributeIdentifier != "cZ") { // transition case
var timingFunction = null;
if(publicTimingFunctionName != null) {
timingFunction = timingFunctionMapping[publicTimingFunctionName];
}
if(timingFunction == null) {
timingFunction = "c";
}

// using 1 as the default value since it is relatively sane for opacity and scale, others should always be set in _currentValues
// make a relatively timeline
var animations = [];
createAndPushTransitionAnimation(animations, attributeIdentifier, 0, duration, timingFunction, elementOid, 1, value, true);
addAndRunElementTransitionTimeline(timelineIdentifier, duration, animations);
} else { // standard set case
// take ownership since an animation would
if(_timelineRunOwnershipOfPropertiesByElement[elementOid] != undefined) {
_timelineRunOwnershipOfPropertiesByElement[elementOid][attributeIdentifier] = timelineIdentifier;

if(attributeIdentifier == "cZ") {
// need to set ownership of BackgroundImageResourceGroupOid as well since this is what Hype internally uses
_timelineRunOwnershipOfPropertiesByElement[elementOid]["h"] = timelineIdentifier;
}
}
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if(timelineRun != null) {
stopTimelineRun(timelineRun);
}

applyValue(element, attributeIdentifier, value);
}
};

var applyValue = function (element) { // attributeIdentifier1, value1, attributeIdentifier2, value2, ..
var args = arguments;

for(var i = 1; i < args.length; i+= 2) {
var attributeIdentifier = args[i];
var value = args[(i + 1)];

if(typeof value == "undefined") {
continue;
}

try {
var applier = _Apply[attributeIdentifier];
if(applier != null) {
_currentValues[_idReverseMapping[element.id]][attributeIdentifier] = value;
applier(element, value);
}
} catch(err) {
_log("APPLY ERR " + attributeIdentifier + "=" + value + " : " + err);
}
}
};

var resetVideos = function () {
// this is just a workaround for #7554: Videos don't work in Mobile Safari when returning to their scene after initial playback
if(_browserInfo.ios == null) {
return;
}

var currentSceneContainer = currentSceneElement();
if(currentSceneContainer != null) {
var videos = currentSceneContainer.getElementsByTagName("video");
for(var i = 0; i < videos.length; i++) {
var videoElement = videos[i];
videoElement.innerHTML = "";
var outerHTML = videoElement.outerHTML;
var parentNode = videoElement.parentNode;
parentNode.removeChild(videoElement);
parentNode.innerHTML += outerHTML;
}
}
}

var pauseVideos = function () {
var currentSceneContainer = currentSceneElement();
if(currentSceneContainer != null) {
var videos = currentSceneContainer.getElementsByTagName("video");
for(var i = 0; i < videos.length; i++) {
if(videos[i].pause) {
videos[i].pause();
}
}

}
};

var applyButtonFromTimelineRun = function (event, timelineIdentifier, triggeringObjectIdentifier) {
var timeline = _scenes[_currentSceneIndex]["T"][timelineIdentifier];
if(timeline == null) {
return;
}

var animations = timeline["a"];
var element = getElementByHypeOid(triggeringObjectIdentifier);

// clear any previous button states first
var buttonHoverValue = _scenes[_currentSceneIndex]["v"][triggeringObjectIdentifier]['aM'];
if(buttonHoverValue != null && buttonHoverValue != timelineIdentifier) {
resetButtonFromTimelineRun(event, buttonHoverValue, triggeringObjectIdentifier);
}

var buttonPressValue = _scenes[_currentSceneIndex]["v"][triggeringObjectIdentifier]['aN'];
event = (event) ? event : window.event;
if(event.type != "mouseup" && event.type != "pointerup" && event.type != "MSPointerUp" && buttonPressValue != null && buttonPressValue != timelineIdentifier && buttonHoverValue != timelineIdentifier) {
resetButtonFromTimelineRun(event, buttonPressValue, triggeringObjectIdentifier);
}

for(var i = 0; i < animations.length; i++) {
var animation = animations[i];
var oid = animation["o"];
if(oid != triggeringObjectIdentifier) {
// should always be equal
continue;
}

var identifier = animation["i"];
var startValue = animation["e"];
if(startValue == null) {
continue;
}

var restorationValuesForElement = _buttonRestorationValues[triggeringObjectIdentifier];
if(restorationValuesForElement == null) {
restorationValuesForElement = {};
_buttonRestorationValues[triggeringObjectIdentifier] = restorationValuesForElement;
}
if (restorationValuesForElement[identifier] == null) {
restorationValuesForElement[identifier] = _currentValues[triggeringObjectIdentifier][identifier];
}

applyValue(element, identifier, startValue);
}
};

var resetButtonFromTimelineRun = function (event, timelineIdentifier, triggeringObjectIdentifier) {
var timeline = _scenes[_currentSceneIndex]["T"][timelineIdentifier];
if(timeline == null) {
return;
}
var animations = timeline["a"];
var element = getElementByHypeOid(triggeringObjectIdentifier);

for(var i = 0; i < animations.length; i++) {
var animation = animations[i];
var oid = animation["o"];
if(oid != triggeringObjectIdentifier) { // sanity check, should always be equal
continue;
}

var identifier = animation["i"];
var restorationValuesForElement = _buttonRestorationValues[triggeringObjectIdentifier];
if(restorationValuesForElement != null && restorationValuesForElement[identifier] != null) {
applyValue(element, identifier, restorationValuesForElement[identifier]);
restorationValuesForElement[identifier] = null;
}
}

event = (event) ? event : window.event;

// if this was a mouse click and there's hover values, reinstate those
if(event.type == "mouseup" || event.type == "pointerup" || event.type == "MSPointerUp") {
var buttonHoverValue = _scenes[_currentSceneIndex]["v"][triggeringObjectIdentifier]['aM'];
if(buttonHoverValue != null) {
applyButtonFromTimelineRun(event, buttonHoverValue, triggeringObjectIdentifier);
}
}
};

var startTimelineNamed = function (timelineName, direction) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
if (direction == undefined) {
direction = kDirectionForward;
}
var reversed = (direction == kDirectionReverse) ? true : false;
startTimelineRun(timelineIdentifier, null, reversed);
};

var pauseTimelineNamed = function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
pauseTimelineWithIdentifier(timelineIdentifier, null);
};

var continueTimelineNamed = function (timelineName, direction, canRestartTimeline) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
if (direction == undefined) {
direction = kDirectionForward;
}
var reversed = (direction == kDirectionReverse) ? true : false;
continueTimelineWithIdentifier(timelineIdentifier, reversed, true, canRestartTimeline);
};

var goToTimeInTimelineNamed = function (time, timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
goToTimeInTimelineWithIdentifier(time, timelineIdentifier, false, false);
};

var currentTimeInTimelineNamed = function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
return currentTimeInTimelineWithIdentifier(timelineIdentifier, true);
};

var durationForTimelineNamed = function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
var duration = 0;
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun != null) {
duration = timelineDuration(timelineRun);
}
return duration;
};

var isPlayingTimelineNamed = function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
var isPlaying = false;
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun != null) {
isPlaying = timelineRun.isPlaying;
}
return isPlaying;
};

var currentDirectionForTimelineNamed = function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineIdentifier = timelineIdentifierForTimelineNamed(timelineName);
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
var direction = kDirectionForward;
if (timelineRun != null) {
direction = (timelineRun.isReversed) ? kDirectionReverse : kDirectionForward;
}
return direction;
};

var resetTimelineStateAfterScaleOrDirectionChange = function (timelineRun, time) {
if (timelineRun.animationStartTime != null) {


timelineRun.animationStartTime = clockTimeInSeconds() - (time / timelineRun.playScale);
if (timelineRun.isPlaying == true) {
window.clearTimeout(timelineRun.animationCompletionTimeout);
timelineRun.animationCompletionTimeout = window.setTimeout(function() { timelineRunCompleteCallback(timelineRun); }, ((timelineDuration(timelineRun) - time) / timelineRun.playScale * 1000));
}

}
};

var setTimelineRunPlayScale = function (timelineRun, playScale) {
if (timelineRun.playScale != playScale) {
var currentTime = currentTimeInTimelineWithIdentifier(timelineRun.timelineIdentifier, false);
timelineRun.playScale = playScale;
resetTimelineStateAfterScaleOrDirectionChange(timelineRun, currentTime);
}
};

var setTimelineRunIsReversed = function (timelineRun, reversed) {
var currentTime = currentTimeInTimelineWithIdentifier(timelineRun.timelineIdentifier, false);
if (reversed != timelineRun.isReversed) {
timelineRun.isReversed = reversed;
if (reversed == true && timelineRun.reversedAnimations == null) {
// copy the array
timelineRun.reversedAnimations = timelineRun.animations.slice(0);
// sort the animations in reverse order
timelineRun.reversedAnimations.sort(function(a,b) {
var aStartTime = startTimeForAnimation(a, timelineRun);
var bStartTime = startTimeForAnimation(b, timelineRun);
if (aStartTime == bStartTime) {
return b['k'] - a['k'];
} else {
return (aStartTime - bStartTime);
}
});
}
if (reversed == true && timelineRun.reversedSymbolActions == null) {
// copy the array
timelineRun.reversedSymbolActions = timelineRun.symbolActions.slice(0);
// sort the animations in reverse order
timelineRun.reversedSymbolActions.sort(function(a,b) {
var aEndTime = quantizeTime(a.startTime + a.duration, timelineRun);
var bEndTime = quantizeTime(b.startTime + b.duration, timelineRun);
if (aEndTime == bEndTime) {
var aStartTime = a.startTime;
var bStartTime = b.startTime;
if (aStartTime == bStartTime) {
return b['F'] - a['F'];
} else {
return (bStartTime - aStartTime);
}

} else {
return (bEndTime - aEndTime);
}
});
}

var duration = timelineDuration(timelineRun);
timelineRun.activeAnimations = Array();
timelineRun.nextAnimationIndex = 0;
timelineRun.nextSymbolActionIndex = 0;
timelineRun.activeSymbolActions = Array();
timelineRun.pauseTime = quantizeTime(duration - timelineRun.pauseTime, timelineRun);

var currentTime = duration - currentTime;
resetTimelineStateAfterScaleOrDirectionChange(timelineRun, currentTime);
if (timelineRun.animationStartTime != null) {


var timeToGoTo = quantizeTime(clockTimeInSeconds() - timelineRun.animationStartTime, timelineRun);

heartbeatGoToTimeForTimelineRun(timeToGoTo, timelineRun, false, false);
}
}
};

var createTimelineRun = function (timelineIdentifier, animations, timelineInfo, persistentSymbolOid) {
var timelineRun = {
nextAnimationIndex: 0,
activeAnimations: Array(),
animations: animations,
timelineIdentifier: timelineIdentifier,
symbolActions: timelineInfo["b"],
//triggeringObjectIdentifier: null,
isPlaying: false,
pauseTime: 0,
playScale : 1,
isReversed : false,
activeSymbolActions: Array(),
persistentSymbolOid : persistentSymbolOid,
timelineInfo : timelineInfo,
relativeMotionPaths : {}
};

// be sure to remove any with the same identifier
for(var i = 0; i < _timelineRuns.length; i++) {
if(_timelineRuns[i].timelineIdentifier == timelineIdentifier) {
stopTimelineRun(_timelineRuns[i]);
_timelineRuns.splice(i,1);
i -=1;
}
}

_timelineRuns.push(timelineRun);
return timelineRun;
};

var timelineIdentifierForTimelineNamed = function (timelineName) {
var timelines = _scenes[_currentSceneIndex]["T"];
for(var timelineIdentifier in timelines) {
if(timelines.hasOwnProperty(timelineIdentifier) == false) {
continue;
}
if(timelines[timelineIdentifier]["n"] == timelineName) {
var isSymbolTimeline = false;
var symbolsByElementId = _scenes[_currentSceneIndex]["U"];
for (var symbolKey in symbolsByElementId) {
if (symbolsByElementId.hasOwnProperty(symbolKey) == false) {
continue;
}
var timelineNameToIdentifier = symbolsByElementId[symbolKey]["V"];
for (var timelineName in timelineNameToIdentifier) {
if (timelineNameToIdentifier.hasOwnProperty(timelineName) == false) {
continue;
}
if (timelineNameToIdentifier[timelineName] == timelineIdentifier) {
isSymbolTimeline = true;
break;
}
}
if (isSymbolTimeline == true) {
break;
}
}
if (isSymbolTimeline == false) {
return timelineIdentifier;
}
}
}

// this is behavior for API methods using timelineNamed; only the API uses this.
// See #6946 Should we use the default timeline when we receive invalid input to our API?
return kTimelineDefaultIdentifier;
};

var timelineRunForIdentifier = function (timelineIdentifier) {
for(var i = 0; i < _timelineRuns.length; i++) {
var checkTimelineRun = _timelineRuns[i];
if(checkTimelineRun.timelineIdentifier == timelineIdentifier) {
return checkTimelineRun;
}
}
for (var persistentSymbolOid in _persistentSymbols) {
if (_persistentSymbols.hasOwnProperty(persistentSymbolOid) == false) {
continue;
}
var timelineRuns = _persistentSymbols[persistentSymbolOid].timelineRuns;
for (var i = 0; i < timelineRuns.length; i++) {
var checkTimelineRun = timelineRuns[i];
if(checkTimelineRun.timelineIdentifier == timelineIdentifier) {
return checkTimelineRun;
}
}
}
return null;
};

var setupRelativeMotionPath = function (timelineRun, animation) {
var oid = animation["o"];
var identifier = animation["i"];

var motionPathOid = animation["a"];
if (motionPathOid != undefined) {
var motionPath = _motionPaths[motionPathOid];
var motionPathCopy = {};
var bezierCurves = Array();
var xDifference = 0;
var yDifference = 0;
for (var i = 0; i < motionPath.bezierCurves.length; i++) {
var bezierCurve = motionPath.bezierCurves[i];
if (i == 0) {
var width = currentWidthForElementWithOid(oid);
var height = currentHeightForElementWithOid(oid);
var left = _currentValues[oid]['a'];
var top = _currentValues[oid]['b'];
xDifference = (left + width / 2) - bezierCurve.startPoint.x;
yDifference = (top + height / 2) - bezierCurve.startPoint.y;
}
bezierCurves.push({
startPoint: {x: bezierCurve.startPoint.x + xDifference, y: bezierCurve.startPoint.y + yDifference},
startControlPoint: {x: bezierCurve.startControlPoint.x + xDifference, y: bezierCurve.startControlPoint.y + yDifference},
endControlPoint: {x: bezierCurve.endControlPoint.x, y: bezierCurve.endControlPoint.y},
endPoint: {x: bezierCurve.endPoint.x, y: bezierCurve.endPoint.y},
length: 0,
interpolationPoints: Array()
});
xDifference = 0;
yDifference = 0;
}
motionPathCopy.bezierCurves = bezierCurves;
motionPathCopy.length = calculateInterpolationPointsForBezierCurves(motionPathCopy.bezierCurves, true);
timelineRun.relativeMotionPaths[motionPathOid] = motionPathCopy;
var element = getElementByHypeOid(oid);
if (getElementAttribute(element, "bP") == "YES") {
var motionPathRotationAnimation;
for(var j = 0; j < timelineRun.animations.length; j++) {
var rotationAnimation = timelineRun.animations[j];
if (rotationAnimation["i"] == "bO") {
motionPathRotationAnimation = rotationAnimation;
break;
}
}
if (motionPathRotationAnimation != null) {
var point = topLeftPointForMotionPath(motionPathCopy, 0, oid);
motionPathRotationAnimation["b"] = point.rotationAngle;
}
}

}
};

var setStartValueForRelativeKeyframes = function (timelineRun, replaceExisting) {
// set the start value to be used for relative animations
for(var j = 0; j < timelineRun.animations.length; j++) {
var oid = timelineRun.animations[j]["o"];
var identifier = timelineRun.animations[j]["i"];
var isRelative = timelineRun.animations[j]["r"];
try { // try as a guard against an animation referencing an object that doesn't exist
if(isRelative == true && _currentValues[oid][identifier] != null) {
if (replaceExisting || timelineRun.animations[j]["b"] == null) {
timelineRun.animations[j]["b"] = _currentValues[oid][identifier];
}
}
} catch(err) { }
}
};

var startTimelineRun = function (timelineIdentifier, triggeringObjectIdentifier, reversed) {
_symbolActionOwnershipOfTimelineWithIdentifier[timelineIdentifier] = null;
// reset the timeline to the initial values
for(var i = 0; i < _timelineRuns.length; i++) {
var checkTimelineRun = _timelineRuns[i];
if(checkTimelineRun.timelineIdentifier == timelineIdentifier) {
//!! I'm just going to stop it instead of return, this could cause behaviors where the timeline never really finishes
stopTimelineRun(checkTimelineRun);
}
}

var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun == null) {
return;
}

timelineRun.triggeringObjectIdentifier = triggeringObjectIdentifier;
_activeTimelineRuns.push(timelineRun);

if(_scenes[_currentSceneIndex]["T"][timelineRun.timelineIdentifier] == null && timelineRun.persistentSymbolOid == undefined && timelineRun.isPhysicsTimeline != true) {
timelineRunCompleteCallback(timelineRun);
return null;
}

var replaceExistingStartValues = (reversed == false);
if(timelineRun.isPhysicsTimeline != true) {
setStartValueForRelativeKeyframes(timelineRun, replaceExistingStartValues);

setTimelineRunIsReversed(timelineRun, reversed);
stopIntersectingTimelinesFromTime(timelineRun, 0);
applyFirstValuesInTimelineFromTime(timelineRun, 0);
}

timelineRun.isPlaying = true;
timelineRun.nextAnimationIndex = 0;
timelineRun.nextSymbolActionIndex = 0;
timelineRun.activeAnimations = Array();
timelineRun.activeSymbolActions = Array();
timelineRun.relativeMotionPaths = {};


timelineRun.animationStartTime = clockTimeInSeconds();


// create a separate callback for when the timeline run is complete (probably should be replaced with events later)

window.clearTimeout(timelineRun.animationCompletionTimeout);
timelineRun.animationCompletionTimeout = window.setTimeout(function() { timelineRunCompleteCallback(timelineRun); }, (timelineDuration(timelineRun) / timelineRun.playScale * 1000));


resetSymbolActionTimelines(timelineRun, replaceExistingStartValues);

if(timelineRun.isPhysicsTimeline == true || timelineRun.animations.length > 0 || timelineRun.symbolActions.length > 0) {
// I just use requestHeartbeat instead of the AtTime variant due to what looks like a timing issue in firefox with transitions that start at time 0
heartbeatGoToTimeForTimelineRun(0, timelineRun, true, true, false);
requestHeartbeat();
}

return timelineRun;
};

var stopIntersectingTimelinesFromTime = function (timelineRun, time) {
var animations = timelineRun.animations;

// put any items in this timelineRun into the timelineRunOwnershipOfPropertiesByElement listing
for(var i = 0; i < animations.length; i++) {
var animation = animations[i];
var oid = animation["o"];
var identifier = animation["i"];
var startTime = startTimeForAnimation(animation, timelineRun);
var duration = animation["d"];
            var endTime = quantizeTime(startTime + duration, timelineRun);

// we expect the array for oid to be definied even if the timeline does not have ownership
if(_timelineRunOwnershipOfPropertiesByElement[oid] === undefined) {
_timelineRunOwnershipOfPropertiesByElement[oid] = {};
}

if(endTime >= time) {
if (_dragOwnershipOfPropertiesByElement[oid] === undefined || _dragOwnershipOfPropertiesByElement[oid][identifier] === undefined || _dragOwnershipOfPropertiesByElement[oid][identifier] == timelineRun.timelineIdentifier) {
_timelineRunOwnershipOfPropertiesByElement[oid][identifier] = timelineRun.timelineIdentifier;
}
}
}

stopActiveAnimationsWithoutOwnershipExcludingTimelineRun(timelineRun);
};

var stopActiveAnimationsWithoutOwnershipExcludingTimelineRun = function (timelineRun) {
// stop any active animations using these elements/properties
for(var i = 0; i < _activeTimelineRuns.length; i++) {
var checkTimelineRun = _activeTimelineRuns[i];
if(timelineRun != null && checkTimelineRun.timelineIdentifier == timelineRun.timelineIdentifier) {
continue;
}

for(var j = 0; j < checkTimelineRun.activeAnimations.length; j++) {
var oid = checkTimelineRun.activeAnimations[j]["o"];
var identifier = checkTimelineRun.activeAnimations[j]["i"];
if(_timelineRunOwnershipOfPropertiesByElement[oid][identifier] != checkTimelineRun.timelineIdentifier) {
checkTimelineRun.activeAnimations.splice(j, 1);
j--;
}
}
}
};

var stopTimelineRun = function (timelineRun) {
// clear values
window.clearTimeout(timelineRun.animationCompletionTimeout);
timelineRun.nextAnimationIndex = 0;
timelineRun.nextSymbolActionIndex = 0;
timelineRun.activeAnimations = Array();
timelineRun.activeSymbolActions = Array();
timelineRun.triggeringObjectIdentifier = null;
timelineRun.animationStartTime = null;
timelineRun.isPlaying = false;
timelineRun.playScale = 1;
timelineRun.pauseTime = timelineDuration(timelineRun);

var timelineIndex = myIndexOf(_activeTimelineRuns, timelineRun);
if (timelineIndex != -1) {
_activeTimelineRuns.splice(timelineIndex, 1);
}
};

var stopAllTimelineRuns = function () {
// stop traditional timeline runs
var activeTimelineRuns = _activeTimelineRuns.slice(0);
for (var i = 0; i < activeTimelineRuns.length; i++) {
var timelineRun = activeTimelineRuns[i];
if (timelineRun.persistentSymbolOid == undefined) {
stopTimelineRun(activeTimelineRuns[i]);
}
}
};

var requestAnimFrame = function () {
var timerBasedFunction = (function(callback, element) {
window.setTimeout(callback, ((1 * 1000.0) / _fps));
});

return  window['requestAnimationFrame']|| 
window['webkitRequestAnimationFrame']|| 
window['mozRequestAnimationFrame']|| 
timerBasedFunction;
};

var requestHeartbeat = function () {
if(_animationFrameRequested === true) {
return;
}
_animationFrameRequested = true;
requestAnimFrame()((function () { _animationFrameRequested = false; heartbeat(); }));
};

var requestHeartbeatAtTime = function (nextAnimationTick) {
window.setTimeout((function () { _animationFrameRequested = false; heartbeat(); }), (nextAnimationTick * 1000.0));
};

var timelineDuration = function (timelineRun) {

        var duration = timelineRun.timelineInfo["d"];
return quantizeTime(duration, timelineRun);
};

var quantizeTimeWithFramesPerSecond = function (time, framesPerSecond) {
    var seconds = Math.floor(time);
var frames = Math.round(((time - seconds) * framesPerSecond)) / framesPerSecond;
    return (seconds + frames);
};
 
var quantizeTime = function (time, timelineRun) {

var framesPerSecond = timelineRun.timelineInfo["f"];
return quantizeTimeWithFramesPerSecond(time, framesPerSecond);
};

var timelineRunCompleteCallback = function (timelineRun) {

// make sure animations at the end are triggered before we remove the timeline
        timelineRun.playScale = 1.0;
var significantChangeDuringHeartbeat = heartbeatGoToTimeForTimelineRun(timelineDuration(timelineRun), timelineRun, true, true);
if (significantChangeDuringHeartbeat) {
return;
}

stopTimelineRun(timelineRun);

if(_timelineCompletionOverrideCallback != null && _timelineIdentifierForCompletionOverrideCallback == timelineRun.timelineIdentifier) {
// save the callback first so we can call it last, as the call may set the timelineCompletionOverrideCallback itself (in the case of scene transitions, #5074)
var callback = _timelineCompletionOverrideCallback;
_timelineCompletionOverrideCallback = null;
_timelineIdentifierForCompletionOverrideCallback = null;
callback();
} else {
// trigger event handlers
var timelineCompleteFauxEvent = {"type" : "HypeTimelineComplete", "timelineName" : timelineRun.timelineInfo["n"]};
var eventResult = notifyEvent(timelineCompleteFauxEvent, null);

if(eventResult !== false) {
// perform action if exists
var currentSceneContainer = currentSceneElement();
if(currentSceneContainer != null) {
var sceneIndex = indexOfSceneWithIdentifier(currentSceneIdentifier());
var onSceneTimelineCompleteData = _scenes[sceneIndex]["F"];
if(onSceneTimelineCompleteData != null) {
var onSceneTimelineCompleteActions = onSceneTimelineCompleteData["a"];
var onSceneTimelineCompleteFunction = createActionHandler(currentSceneContainer, onSceneTimelineCompleteActions);
onSceneTimelineCompleteFunction(timelineCompleteFauxEvent);
}
}
}
}
};

var pauseTimelineWithIdentifier = function (timelineIdentifier, pauseTime) {
_symbolActionOwnershipOfTimelineWithIdentifier[timelineIdentifier] = null;
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if(timelineRun != null && timelineRun.isPlaying == true) {
setTimelineRunPlayScale(timelineRun, 1.0);
if (pauseTime != null) {
timelineRun.pauseTime = pauseTime;
} else {


timelineRun.pauseTime = clockTimeInSeconds() - timelineRun.animationStartTime;

}
timelineRun.isPlaying = false;
window.clearTimeout(timelineRun.animationCompletionTimeout);
}
};

var continueTimelineWithIdentifier = function (timelineIdentifier, reversed, resetScale, canRestartTimeline) {
_symbolActionOwnershipOfTimelineWithIdentifier[timelineIdentifier] = null;
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if(timelineRun != null) {
if (resetScale) {
setTimelineRunPlayScale(timelineRun, 1.0);
}
setTimelineRunIsReversed(timelineRun, reversed);
if (timelineRun.isPlaying == false) {
if (timelineRun.animationStartTime != null) {
if (timelineRun.pauseTime == timelineDuration(timelineRun)) {
if (canRestartTimeline) {
startTimelineRun(timelineIdentifier, null, reversed);
}
} else {
timelineRun.isPlaying = true;


   timelineRun.animationStartTime = clockTimeInSeconds() - (timelineRun.pauseTime / timelineRun.playScale);
   window.clearTimeout(timelineRun.animationCompletionTimeout);
   timelineRun.animationCompletionTimeout = window.setTimeout(function() { timelineRunCompleteCallback(timelineRun); }, ((timelineDuration(timelineRun) - timelineRun.pauseTime) / timelineRun.playScale * 1000));


if (timelineRun.isPhysicsTimeline != true) {
stopIntersectingTimelinesFromTime(timelineRun, timelineRun.pauseTime);
timelineRun.nextAnimationIndex = 0;
timelineRun.nextSymbolActionIndex = 0;
timelineRun.activeAnimations = Array();
timelineRun.activeSymbolActions = Array();
}

heartbeatGoToTimeForTimelineRun(timelineRun.pauseTime / timelineRun.playScale, timelineRun, false, false);
}
} else {
if (canRestartTimeline == true || timelineRun.pauseTime == 0) {
startTimelineRun(timelineIdentifier, null, reversed);
}
}
}

requestHeartbeat();
}
};

var applyFirstValuesInTimelineFromTime = function (timelineRun, time) {
var hasAppliedPropertyByElement = {};
var animations = (timelineRun.isReversed) ? timelineRun.reversedAnimations : timelineRun.animations;
for(var i = 0; i < animations.length; i++) {
var animation = animations[i];

var type = animation["p"];
if(type != kAnimationTypeStandardKeyframe) {
continue;
}
var oid = animation["o"];
var identifier = animation["i"];
if(_timelineRunOwnershipOfPropertiesByElement[oid][identifier] != timelineRun.timelineIdentifier) {
continue;
}
var startTime = startTimeForAnimation(animation, timelineRun);
var startValue = startValueForAnimation(animation, timelineRun);
var isRelative = (timelineRun.isReversed) ? false : animation["r"];

// we apply the startValue of first non-relative keyframe with startTime >= currentTime after calling go to time (in case we jump to a time before any keyframes)
// if we picked a keyframe too far in the future it doesn't matter because heartbeatGoToTimeForTimelineRun is called after this and will end up overwriting this change
if(startTime >= time) {
if(hasAppliedPropertyByElement[oid] == null) {
hasAppliedPropertyByElement[oid] = {};
}
if(isRelative != true && hasAppliedPropertyByElement[oid][identifier] == null) {
var element = getElementByHypeOid(oid);
if (startValue == undefined && timelineRun.isReversed == true && animation["d"] == 0) {
startValue = animation["s"];
}
applyValue(element, identifier, startValue);
}
hasAppliedPropertyByElement[oid][identifier] = true;
}
}
};

var currentTimeInTimelineWithIdentifier = function (timelineIdentifier, reverseResult) {
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun == null) {
return 0;
}
var currentTime = 0;
if (timelineRun.isPlaying == true) {


currentTime = clockTimeInSeconds() - timelineRun.animationStartTime;

currentTime = currentTime * timelineRun.playScale;
} else {
currentTime = timelineRun.pauseTime;
}
var duration = timelineDuration(timelineRun);
if (reverseResult == true && timelineRun.isReversed == true) {
currentTime = duration - currentTime;
}
currentTime = Math.max(0, currentTime);
currentTime = Math.min(duration, currentTime);
return currentTime;
};

// go to time always uses a time on the forward scale
var goToTimeInTimelineWithIdentifier = function (time, timelineIdentifier, runActionsWhenPaused, shouldQuantizeTime) {
_symbolActionOwnershipOfTimelineWithIdentifier[timelineIdentifier] = null;
var timelineRun = timelineRunForIdentifier(timelineIdentifier);
if (timelineRun == null) {
return;
}
setTimelineRunPlayScale(timelineRun, 1.0);

if (myIndexOf(_activeTimelineRuns, timelineRun) == -1) {
pauseTimelineWithIdentifier(timelineIdentifier);
_activeTimelineRuns.push(timelineRun);
}

// make sure the time is in bounds
var duration = timelineDuration(timelineRun);
if(time > duration) {
time = duration;
}
if (timelineRun.isReversed == true) {
time = (duration - time);
}
if(shouldQuantizeTime == true) {
time = quantizeTime(time, timelineRun);
}

// reset items back to the beginning
timelineRun.nextAnimationIndex = 0;
timelineRun.nextSymbolActionIndex = 0;
timelineRun.activeAnimations = Array();
timelineRun.activeSymbolActions = Array();


var currentClockTimeInSeconds = clockTimeInSeconds();
timelineRun.animationStartTime = currentClockTimeInSeconds - time;
timelineRun.pauseTime = currentClockTimeInSeconds - timelineRun.animationStartTime;



if(timelineRun.isPlaying == true) {
window.clearTimeout(timelineRun.animationCompletionTimeout);
timelineRun.animationCompletionTimeout = window.setTimeout(function() { timelineRunCompleteCallback(timelineRun); }, ((duration - time) / timelineRun.playScale * 1000));
}


setStartValueForRelativeKeyframes(timelineRun, false);

resetSymbolActionTimelines(timelineRun, false);

// go to time takes ownership of all animated properties on the timeline so that if you jump into the middle of a timeline all the earlier state is reflected as well
stopIntersectingTimelinesFromTime(timelineRun, 0);
applyFirstValuesInTimelineFromTime(timelineRun, time);
var significantTimeChange = heartbeatGoToTimeForTimelineRun(time, timelineRun, false, true, runActionsWhenPaused);
requestHeartbeat();
return significantTimeChange;
};

var resetSymbolActionTimelines = function (timelineRun, replaceExistingStartValues) {
var symbolActions = timelineRun.symbolActions;
var stoppedSymbolTimelineIdentifiers = [];
if (symbolActions != null) {
for (var i = 0; i < symbolActions.length; i++) {
var symbolTimelineIdentifier = symbolActions[i]["b"];
var symbolTimelineRun = timelineRunForIdentifier(symbolTimelineIdentifier);
if (symbolTimelineRun == null || myIndexOf(stoppedSymbolTimelineIdentifiers, symbolTimelineIdentifier) != -1) {
continue;
}

stopTimelineRun(symbolTimelineRun);
if(replaceExistingStartValues == true) {
setStartValueForRelativeKeyframes(symbolTimelineRun, true);
}
goToTimeInTimelineWithIdentifier(0, symbolTimelineIdentifier, false, true, true);
stoppedSymbolTimelineIdentifiers.push(symbolTimelineIdentifier);
}
}
};



var heartbeat = function () {

var nextAnimationFrameRequestTick;
var allPhysicsEnvironmentsAreSleeping = true;
var currentClockTimeInSeconds = clockTimeInSeconds();

for(var i = 0; i < _activeTimelineRuns.length; i++) {
var timelineRun = _activeTimelineRuns[i];

if(timelineRun.animationStartTime == null || timelineRun.isPlaying == false || timelineRun.isPhysicsTimeline == true) {
continue;
}

var currentTime = currentClockTimeInSeconds - timelineRun.animationStartTime;
var animations = (timelineRun.isReversed) ? timelineRun.reversedAnimations : timelineRun.animations;
var significantChangeDuringHeartbeat = heartbeatGoToTimeForTimelineRun(currentTime, timelineRun, true, true);
if(significantChangeDuringHeartbeat) {
currentTime = currentClockTimeInSeconds - timelineRun.animationStartTime;
}
if(timelineRun.isPlaying == false) { // recheck, I might not be active anymore due to a scene change from a timeline action
continue;
}

var duration = timelineDuration(timelineRun);
if((currentTime * timelineRun.playScale) <= duration) {
if(timelineRun.activeAnimations.length > 0) {
nextAnimationFrameRequestTick = 0;
} else if(timelineRun.nextAnimationIndex < animations.length) {
var proposedTick = quantizeTime((startTimeForAnimation(animations[timelineRun.nextAnimationIndex], timelineRun) - (currentTime * timelineRun.playScale)) / timelineRun.playScale, timelineRun);
if(nextAnimationFrameRequestTick == null || proposedTick < nextAnimationFrameRequestTick) {
nextAnimationFrameRequestTick = proposedTick;
}
}
var symbolActions = (timelineRun.isReversed == false) ? timelineRun.symbolActions : timelineRun.reversedSymbolActions;
if (timelineRun.activeSymbolActions.length > 0) {
nextAnimationFrameRequestTick = 0;
} else if (timelineRun.nextSymbolActionIndex < symbolActions.length) {
var nextSymbolAction = symbolActions[timelineRun.nextSymbolActionIndex];
var actionStartTime = (timelineRun.isReversed == false) ? nextSymbolAction.startTime : quantizeTime(duration - nextSymbolAction.startTime - nextSymbolAction.duration, timelineRun);
var proposedTick = quantizeTime((actionStartTime - (currentTime * timelineRun.playScale)) / timelineRun.playScale, timelineRun);
if (proposedTick < nextAnimationFrameRequestTick || nextAnimationFrameRequestTick == null) {
nextAnimationFrameRequestTick = proposedTick;
}
}
}
}



if(nextAnimationFrameRequestTick === 0 || allPhysicsEnvironmentsAreSleeping == false) {
requestHeartbeat();
} else if(nextAnimationFrameRequestTick != null) {
requestHeartbeatAtTime(nextAnimationFrameRequestTick);
}
};

var startTimeForAnimation = function (animation, timelineRun) {
return (timelineRun.isReversed) ? quantizeTime((timelineDuration(timelineRun) - animation["d"] - animation["t"]), timelineRun) : animation["t"];
};

var endValueForAnimation = function (animation, timelineRun) {
return (timelineRun.isReversed) ? animation["s"] : animation["e"];
};

var startValueForAnimation = function (animation, timelineRun) {
return (timelineRun.isReversed) ? animation["e"] : animation["s"];
};

// worker method returns true if a significant change happens as the result of an action
var heartbeatGoToTimeForTimelineRun = function (currentTime, timelineRun, runPreviousActions, runActions, runActionsWhenPaused) {
beginFrameUpdateQueue();

var animationStartTime = timelineRun.animationStartTime;
var animations = (timelineRun.isReversed) ? timelineRun.reversedAnimations : timelineRun.animations;
var actionAnimationArray = Array();
var realTime = currentTime;
var scaledTime = Math.min(currentTime * timelineRun.playScale, timelineDuration(timelineRun));
for(var i = timelineRun.nextAnimationIndex; i < animations.length; i++) {
var animation = animations[i];
var startTime = startTimeForAnimation(animation, timelineRun);
if (animation["p"] == kAnimationTypeTimelineAction && (timelineRun.isPlaying == true || runActionsWhenPaused == true) && scaledTime >= startTime) {
actionAnimationArray.push(animation);
}
}
var significantTimeChange = false;
if(actionAnimationArray.length == 0 || runActions == false) {
// if there are no actions just run all the other animations
runAnimationsForTimelineRun(scaledTime, timelineRun, animations);
} else {
var timeOfSignificantChange = 0;
var alreadyRanAnimationsAtTime = 0;
var wasPlayingTimeline = timelineRun.isPlaying;
var wasReversed = timelineRun.isReversed;
// loop through actions running animations up to the action startTime before firing the action
for(var i = 0; i < actionAnimationArray.length; i++) {
var actionAnimation = actionAnimationArray[i];
    var startTime = startTimeForAnimation(actionAnimation, timelineRun);

// if there is a significantTimeChange play any actions that occurred at the same time as the significantTimeChange but skip any actions that occur after
if (significantTimeChange == true && timeOfSignificantChange < startTime) {
break;
}
// don't run actions before the current time if runPreviousActions is false, this is so that go to time doesn't run all the previous actions
if (runPreviousActions == false && startTime != scaledTime) {
continue;
}

// only run the other animations if we haven't already run them at this time (this would occur for stacked actions)
if (alreadyRanAnimationsAtTime == 0 || alreadyRanAnimationsAtTime != startTime) {
runAnimationsForTimelineRun(startTime, timelineRun, animations);
alreadyRanAnimationsAtTime = startTime;
}
var actions = actionAnimation["s"]["a"];
var actionsToUse = [];
var ranTimelineActionToPauseThisTimeline = false;
for (var actionIndex = 0; actionIndex < actions.length; actionIndex++) {
var action = actions[actionIndex];
if (action["p"] == kActionPauseTimeline && action["b"] == timelineRun.timelineIdentifier) {
action["r"] = startTime;
ranTimelineActionToPauseThisTimeline = true;
}
// don't play start timeline actions at time 0 because this is just an infinite loop (and a common thing people try with reversal)
if (startTime == 0 && action["p"] == kActionStartTimeline && action["b"] == timelineRun.timelineIdentifier) {
continue;
}
actionsToUse.push(action);
}

if (actionsToUse.length != 0) {
var timelineSymbolElementId;
if (timelineRun.timelineInfo.hasOwnProperty("c")) {
timelineSymbolElementId = timelineRun.timelineInfo["c"];
}
var elementForAction;
if (timelineSymbolElementId) {
if (_symbols.hasOwnProperty(timelineSymbolElementId)) {
elementForAction = _symbols[timelineSymbolElementId].element();
} else if (_persistentSymbols.hasOwnProperty(timelineSymbolElementId)) {
elementForAction = _persistentSymbols[timelineSymbolElementId].element;
}
} else {
elementForAction = currentSceneElement();
}
var actionFunction = createActionHandler(elementForAction, actionsToUse);
actionFunction({"type" : "HypeTimelineAction", "timelineName" : timelineRun.timelineInfo["n"]});
}

if (animationStartTime != timelineRun.animationStartTime || timelineRun.animationStartTime == null || wasPlayingTimeline != timelineRun.isPlaying || ranTimelineActionToPauseThisTimeline || wasReversed != timelineRun.isReversed) {
significantTimeChange = true;
timeOfSignificantChange = startTime;
}
}
// if none of the actions caused significant time changes run all animations up to the current time
if (significantTimeChange == false) {
runAnimationsForTimelineRun(scaledTime, timelineRun, animations);
}
}



drainFrameUpdateQueue();

return significantTimeChange;
};

var runAnimationsForTimelineRun = function (currentTime, timelineRun, animations) {
for(var j = timelineRun.nextAnimationIndex; j < animations.length; j++) {
var animation = animations[j];
var startTime = startTimeForAnimation(animation, timelineRun);
var oid = animation["o"];
var identifier = animation["i"];

if(currentTime >= startTime) {
timelineRun.nextAnimationIndex = j + 1;

if(_timelineRunOwnershipOfPropertiesByElement[oid][identifier] != timelineRun.timelineIdentifier) {
continue;
}



if(animation["p"] == kAnimationTypeVideo && timelineRun.isPlaying == true) {
var autoplay = _scenes[_currentSceneIndex]["v"][oid]['aH'];
var element = getElementByHypeOid(oid);
if(autoplay == true && element.play) {
element.autoplay = true;
element.play();
}

} else if(animation["p"] == kAnimationTypeStandardKeyframe) {
// push onto the manually managed array
timelineRun.activeAnimations.push(animation);
}
} else {
break;
}
}

var topAndLeftAnimations = Array();
for(var j = 0; j < timelineRun.activeAnimations.length; j++) {
var activeAnimation = timelineRun.activeAnimations[j];
var startTime = startTimeForAnimation(activeAnimation, timelineRun);
var duration = activeAnimation["d"];
            var endTime = quantizeTime(startTime + duration, timelineRun);
if(currentTime < endTime) {

// apply value
if (activeAnimation["i"] == "a" || activeAnimation["i"] == "b") {
// top and left animations may be using a motion path which is dependent on the width, height, padding, and margins
// we need to wait to do top and left until after all these animations have been applied
topAndLeftAnimations.push(activeAnimation);
} else {
applyAnimation(activeAnimation, currentTime, timelineRun);
}
} else {

// set value to end value and remove from the list
var elementOid = activeAnimation["o"];
var element = getElementByHypeOid(elementOid);
var endValue;
var relativeEndValue = (timelineRun.isReversed == true) ? activeAnimation["b"] : null;
endValue = (relativeEndValue == null) ? endValueForAnimation(activeAnimation, timelineRun) : relativeEndValue;
applyValue(element, activeAnimation["i"], endValue);

timelineRun.activeAnimations.splice(j, 1);
j--;
}
}
for (var j = 0; j < topAndLeftAnimations.length; j++) {
applyAnimation(topAndLeftAnimations[j], currentTime, timelineRun);
}

var timelineRunDuration = timelineDuration(timelineRun);
var symbolActions = (timelineRun.isReversed == false) ? timelineRun.symbolActions : timelineRun.reversedSymbolActions;
if (symbolActions != null && symbolActions.length != 0) {
for (var j = 0; j < timelineRun.activeSymbolActions.length; j++) {
var symbolAction = timelineRun.activeSymbolActions[j];
var symbolTimelineIdentifier = symbolAction["b"];
var symbolTimelineRun = timelineRunForIdentifier(symbolTimelineIdentifier);
var endTime = (timelineRun.isReversed == false) ? quantizeTime(symbolAction.startTime + symbolAction.duration, timelineRun) : quantizeTime(timelineRunDuration - symbolAction.startTime, timelineRun);
if (currentTime >= endTime) {
if (_symbolActionOwnershipOfTimelineWithIdentifier[symbolTimelineIdentifier] == timelineRun.timelineIdentifier) {
// given 2 -> 5 timings for animation
// timelineRun.isReversed  symbolAction[playInReverse]  |  currentTime   goal
//FF|25
//TT|55
//TF|22
//FT|52
// looking at the table, we see if the timelineRun.isReversed, I can just take the currentTime value
// otherwise I need to look at playInReverse and change the time
var timeInTimeline = symbolAction["G"];
if (timelineRun.isReversed == false) {
// need to add or subtract the duration, because the "currentTime" value gets flipped based on "playInReverse"
if(symbolAction["z"]) {
timeInTimeline -= symbolAction.duration;
} else {
timeInTimeline += symbolAction.duration;
}
}
timeInTimeline = quantizeTime(Math.max(0, timeInTimeline), symbolTimelineRun);
setTimelineRunIsReversed(symbolTimelineRun, false);
var significantTimeChange = heartbeatGoToTimeForTimelineRun(timeInTimeline, symbolTimelineRun, true, true, false);
if (significantTimeChange == false) {
pauseTimelineWithIdentifier(symbolTimelineIdentifier, null);
}
}
timelineRun.activeSymbolActions.splice(j, 1);
j--;
}
}
for (var i = timelineRun.nextSymbolActionIndex; i < symbolActions.length; i++) {
var symbolAction = symbolActions[i];
var symbolTimelineIdentifier = symbolAction["b"];
var symbolTimelineRun = timelineRunForIdentifier(symbolTimelineIdentifier);
if (symbolTimelineRun == null) {
continue;
}
var startTime = (timelineRun.isReversed == false) ? symbolAction.startTime : quantizeTime(timelineRunDuration - symbolAction.startTime - symbolAction.duration, timelineRun);

if (currentTime >= startTime) {
timelineRun.nextSymbolActionIndex = i + 1;
var playSymbolTimelineInReverse = symbolAction["z"];
var playing = symbolAction["E"];
var startingTimeInTimeline = symbolAction["G"];
if (timelineRun.isReversed == true) {
// need to add or subtract the duration, because the "currentTime" value gets flipped based on "playInReverse"
if(playSymbolTimelineInReverse) {
startingTimeInTimeline -= symbolAction.duration;
} else {
startingTimeInTimeline += symbolAction.duration;
}
startingTimeInTimeline = quantizeTime(startingTimeInTimeline, symbolTimelineRun);

// now set the final calculated value to if it runs in reverse or not
playSymbolTimelineInReverse = !playSymbolTimelineInReverse;
}
var currentTimeInTimeline = startingTimeInTimeline;
var takeOwnership = false;

if (playing) {
var ellapsedTime = currentTime - startTime;
if (ellapsedTime > symbolAction.duration) {
playing = false;
ellapsedTime = symbolAction.duration;
} else {
timelineRun.activeSymbolActions.push(symbolAction);
takeOwnership = true;
}
// currentTimeInTimeline is always in forward time this allows us to use goToTimeInTimeline which always expects forward time
if (playSymbolTimelineInReverse) {
currentTimeInTimeline -= ellapsedTime;
} else {
currentTimeInTimeline += ellapsedTime;
}
currentTimeInTimeline = quantizeTime(Math.max(0, currentTimeInTimeline), symbolTimelineRun);
}
if (playing) {
// go to the original time of the action so that we fire any timeline actions at that time
var significantTimeChange = goToTimeInTimelineWithIdentifier(startingTimeInTimeline, symbolTimelineIdentifier, true, true);
if (significantTimeChange) {
continue;
}
if (playSymbolTimelineInReverse) {
setTimelineRunIsReversed(symbolTimelineRun, playSymbolTimelineInReverse);
}

if(startingTimeInTimeline != currentTimeInTimeline) {
// now run animations between the original time and our current time so that any actions in between are played
significantTimeChange = goToTimeInTimelineWithIdentifier(currentTimeInTimeline, symbolTimelineIdentifier, true, true);
if (significantTimeChange) {
continue;
}
}
if (timelineRun.isPlaying) {
setTimelineRunPlayScale(symbolTimelineRun, timelineRun.playScale);
continueTimelineWithIdentifier(symbolTimelineIdentifier, playSymbolTimelineInReverse, false, false);
} else {
pauseTimelineWithIdentifier(symbolTimelineIdentifier, null);
}
} else {
pauseTimelineWithIdentifier(symbolTimelineIdentifier, null);
goToTimeInTimelineWithIdentifier(currentTimeInTimeline, symbolTimelineIdentifier, false, true);
}
if (takeOwnership) {
_symbolActionOwnershipOfTimelineWithIdentifier[symbolTimelineIdentifier] = timelineRun.timelineIdentifier;
}
}
}
}
};

var percentBasedOnArcLength = function (curve, percentComplete) {
var targetLength = curve.length * percentComplete;
var closestPointSmallerThanTarget = curve.interpolationPoints[0];
var closestIndex = 0;
var totalLength = 0;
for (var i = 0; i < curve.interpolationPoints.length; i++) {
var point = curve.interpolationPoints[i];
if ((totalLength + point.length) <= targetLength) {
totalLength += point.length;
closestPointSmallerThanTarget = point;
closestIndex = i;
} else {
break;
}
}
var closestPointLargerThanTarget = (closestIndex + 1 < curve.interpolationPoints.length) ? curve.interpolationPoints[closestIndex + 1] : curve.interpolationPoints[curve.interpolationPoints.length - 1];
var fractionLeftover = (targetLength - totalLength) / closestPointLargerThanTarget.length;
return (closestIndex + fractionLeftover) / (curve.interpolationPoints.length - 1);
};

// returns the coordinates of the elements center and the rotation angle
var centerPointAtPercentCompleteForAnimation = function (motionPath, percentComplete) {
var totalLength = motionPath.length;
var lengthThusFar = 0;
var bezierCurveForAnimation;
var segmentPercentComplete = 0;
var result = {};

if ((percentComplete < 0.0) || (percentComplete > 1.0)) {
var firstPoint = null;
var secondPoint = null;
var endPoint = null;
var direction = 1.0;
var adjustedPercentComplete = percentComplete;
if (percentComplete < 0.0) {
var bezierCurve = motionPath.bezierCurves[0];
if (bezierCurve.interpolationPoints.length >= 2) {
firstPoint = bezierCurve.interpolationPoints[0];
secondPoint = bezierCurve.interpolationPoints[1];
endPoint = firstPoint;
}
} else {
direction = -1.0;
adjustedPercentComplete = 1 - percentComplete;
var bezierCurve = motionPath.bezierCurves[motionPath.bezierCurves.length - 1];
if (bezierCurve.interpolationPoints.length >= 2) {
firstPoint = bezierCurve.interpolationPoints[bezierCurve.interpolationPoints.length - 2];
secondPoint = bezierCurve.interpolationPoints[bezierCurve.interpolationPoints.length - 1];
endPoint = secondPoint
}
}

if (firstPoint != null && secondPoint != null) {
var x = direction * (secondPoint.location.x - firstPoint.location.x);
var y = direction * (secondPoint.location.y - firstPoint.location.y);
var distance = totalLength * adjustedPercentComplete;
if (y == 0) {
result.y = 0;
result.x = distance;
} else {
result.y = Math.sqrt(Math.pow(distance, 2) / ((Math.pow(x, 2) / Math.pow(y, 2)) + 1));
result.x = result.y * x / y;
}
if ((x > 0 && result.x > 0) || (x < 0 && result.x < 0)) {
result.x *= -1.0;
}
if ((y > 0 && result.y > 0) || (y < 0 && result.y < 0)) {
result.y *= -1.0;
}
result.x += endPoint.location.x;
result.y += endPoint.location.y;
result.rotationAngle = rotationAngleBetweenPoints(firstPoint.location, secondPoint.location);
}
} else {
if (totalLength == 0) {
result = {x: motionPath.bezierCurves[0].startPoint.x, y: motionPath.bezierCurves[0].startPoint.y, rotationAngle: 0};
} else {
if (percentComplete == 1.0) {
var bezierCurves = motionPath.bezierCurves;
bezierCurveForAnimation = bezierCurves[bezierCurves.length - 1];
segmentPercentComplete = 1.0;
} else {
for (var i = 0; i < motionPath.bezierCurves.length; i++) {
var bezierCurve = motionPath.bezierCurves[i];
if (((bezierCurve.length + lengthThusFar) / totalLength) > percentComplete) {
bezierCurveForAnimation = bezierCurve;
break;
}
lengthThusFar += bezierCurve.length;
}
// convert to a value between 0 and 1 for that segment
segmentPercentComplete = (percentComplete - (lengthThusFar / totalLength)) / (bezierCurveForAnimation.length / totalLength);
segmentPercentComplete = percentBasedOnArcLength(bezierCurveForAnimation, segmentPercentComplete);
}
result = pointAtPercentForBezierCurve(bezierCurveForAnimation, segmentPercentComplete);
} 
}
return result;
};

var currentWidthForElementWithOid = function(elementOid, fetchCalculatedWidth) {
var element = getElementByHypeOid(elementOid);
var widthAttributeIdentifier = (fetchCalculatedWidth == true) ? 'HYP_n' : 'c';
var width = getElementAttribute(element, widthAttributeIdentifier, 0);
var padding = 0;
if (width == 0) {
width = element.clientWidth;
} else {
var paddingLeft = getElementAttribute(element, 'aT', 0);
var paddingRight = getElementAttribute(element, 'aU', 0);
padding = paddingLeft + paddingRight;
}
var borderLeft = getElementAttribute(element, 'N', 0);
var borderRight = getElementAttribute(element, 'O', 0);
var border = borderRight + borderLeft;
return (width + padding + border);
};

var currentHeightForElementWithOid = function(elementOid, fetchCalculatedHeight) {
var element = getElementByHypeOid(elementOid);
var heightAttributeIdentifier = (fetchCalculatedHeight == true) ? 'HYP_o' : 'd';
var height = getElementAttribute(element, heightAttributeIdentifier, 0);
var padding = 0;
if (height == 0) {
height = element.clientHeight;
} else {
var paddingTop = getElementAttribute(element, 'aV', 0);
var paddingBottom = getElementAttribute(element, 'aS', 0);
padding = paddingTop + paddingBottom;
}
var borderTop = getElementAttribute(element, 'P', 0);
var borderBottom = getElementAttribute(element, 'M', 0);
var border = borderTop + borderBottom;
return (height + padding + border);
};

// returns the coordinates of the left and top of the element and the rotation angle
var topLeftPointForMotionPath = function (motionPath, percentComplete, elementOid) {
var point = centerPointAtPercentCompleteForAnimation(motionPath, percentComplete);
point.x -= (currentWidthForElementWithOid(elementOid) / 2);
point.y -= (currentHeightForElementWithOid(elementOid) / 2);
return point;
};

var applyAnimation = function (animation, currentTime, timelineRun) {
var isReversed = timelineRun.isReversed;
var startTime = startTimeForAnimation(animation, timelineRun);
var duration = animation["d"];
var identifier = animation["i"];
var oid = animation["o"];
var relativeStartValue = (isReversed == false) ? animation["b"] : null;
var startValue = (relativeStartValue == null) ? startValueForAnimation(animation, timelineRun) : relativeStartValue;
var relativeEndValue = (isReversed == true) ? animation["b"] : null;
var endValue = (relativeEndValue == null) ? endValueForAnimation(animation, timelineRun) : relativeEndValue;
var timingFunctionOid = animation["f"];

var element = getElementByHypeOid(oid);

var percentComplete = Math.min(1.0, (currentTime - startTime) / duration);
if (isReversed == true) {
percentComplete = 1.0 - percentComplete;
}
var adjustedPercentComplete = 1.0; 
if (timingFunctionOid == 'a') {
adjustedPercentComplete = (percentComplete == 1.0) ? 1.0 : 0.0;
} else if (timingFunctionOid == 'b') {
adjustedPercentComplete = percentComplete;
} else {
adjustedPercentComplete = firstPointAtXLocationForBezierCurves(_timingFunctions[timingFunctionOid], percentComplete);
}

var currentValue = (isReversed == false) ? startValue : endValue;
var motionPathOid = animation["a"];
if (motionPathOid != undefined) {
var motionPath = _motionPaths[motionPathOid];
if (animation["b"] != null) {
if (timelineRun.relativeMotionPaths[motionPathOid] == null) {
setupRelativeMotionPath(timelineRun, animation);
} 
motionPath = timelineRun.relativeMotionPaths[motionPathOid];
}
var point = topLeftPointForMotionPath(motionPath, adjustedPercentComplete, oid);
if (identifier == "a") {
currentValue = point.x;
if (getElementAttribute(element, "bP") == "YES") {
applyValue(element, "bO", point.rotationAngle);
}
} else if (identifier == "b") {
currentValue = point.y;
}
} else {
if (isReversed == true) {
adjustedPercentComplete = 1.0 - adjustedPercentComplete;
}

if((typeof startValue) == "number" || (typeof endValue) == "number") {
var untransformedStart = untransformNumber(startValue);
var untransformedEnd = untransformNumber(endValue);

currentValue = untransformedStart + ((untransformedEnd - untransformedStart) * adjustedPercentComplete);
} else if(isColorString(startValue) == true && isColorString(endValue) == true) {
var untransformedStart = untransformColor(startValue);
var untransformedEnd = untransformColor(endValue);
var untransformedCurrent = [];

for(var i = 0; i < 4; i++) { // r, g, b, a
untransformedCurrent[i] = untransformedStart[i] + ((untransformedEnd[i] - untransformedStart[i]) * adjustedPercentComplete);
}

currentValue = transformValueColor(untransformedCurrent);
} else if(adjustedPercentComplete == 1.0) {
currentValue = endValue;
}
}

applyValue(element, identifier, currentValue);



};

var isColorString = function (value) {
return ((typeof value) == "string") && ((value.length == 7 && value.charAt(0) == "#") || (value.indexOf("rgb") == 0 && value.indexOf(")") == value.length - 1));
};

var myIndexOf = function (haystack, needle) {

return haystack.indexOf(needle);

};

var escapeURLForCSS = function (str) {
return str.replace(/'/g, "%27");
};

var urlByReplacingCommonUserErrors = function (url) {
if(url != null && url.indexOf("www.") === 0) {
url = "http://" + url;
}
return url;
};


// modified from source found at: http://frugalcoder.us/post/2010/09/13/browser-detection.aspx
var _browserInfo = (function () {
var b = {};

if (!navigator) {
return b;
}

//browsermatch method...
function bm(re) {
var m = (navigator && navigator.userAgent && navigator.userAgent.match(re));
return (m && m[1]);
}

//setup browser detection
b.ie = parseFloat(bm(/MSIE (\d+\.\d+)/)) || parseFloat(bm(/(Trident)/) && bm(/rv:(\d+\.\d+)/)) || parseFloat(bm(/Edge\/(\d+\.\d+)/)) || null;
b.gecko = parseFloat(bm(/Gecko\/(\d+)/)) || null;
b.ff = parseFloat(bm(/Firefox\/(\d+\.\d+)/)) || null;
b.webkit = parseFloat((!b.ie) && bm(/AppleWebKit\/(\d+\.\d+)/)) || null; // ie edge now reports as webkit so check that is not used
b.chrome = parseFloat(b.webkit && bm(/Chrome\/(\d+\.\d+)/)) || null;
b.safari = parseFloat(b.webkit && bm(/Safari\/(\d+\.\d+)/) && bm(/Version\/(\d+\.\d+)/)) || null;
b.opera = parseFloat(bm(/Opera\/(\d+\.\d+)/) && bm(/Version\/(\d+\.\d+)/)) || bm(/Opera\/(\d+\.\d+)/) || parseFloat(b.webkit && bm(/OPR\/(\d+\.\d+)/)) || null;
b.android = (navigator.userAgent.search("Android") > -1) || null;
b.ipad = (navigator.userAgent.search("iPad") > -1) || null;
b.iphone = (navigator.userAgent.search("iPhone") > -1) || null;
b.ipod = (navigator.userAgent.search("iPod") > -1) || null;
b.ios = b.ipad || b.iphone || b.ipod || null;
b.quirksmode = (document.compatMode == "BackCompat") || null;
b.supports3D = (b.webkit != null || b.ff >= 10 || b.ie >= 10);

//delete empty values
for (var x in b) {
if (b[x] === null || isNaN(b[x])) {
delete b[x];
}
}

//disable IE matching for older Opera versions.
if (b.opera && b.ie) {
delete b.ie;
}

// detect if the browser supports passive events/options
// from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
b.supportsPassive = false;
try {
var opts = Object.defineProperty({}, 'passive', {
get: function() {
b.supportsPassive = true;
}
});
window.addEventListener("testPassive", null, opts);
window.removeEventListener("testPassive", null, opts);
} catch (e) {}

return b;
}());

var updateFrame = function (element) {
try {
_updateFrame(element);
} catch(err) { }
};

var updateFrameAndInvalidateReportedSizeCache = function (element) {
invalidateBrowserReportedSizeCacheForElement(element);
updateFrame(element);
};

var _updateFrame = function (element) {
if(_shouldQueueFrameUpdates == true) {
if(myIndexOf(_elementsNeedingFrameUpdates, element) == -1) {
_elementsNeedingFrameUpdates.push(element);
}
return;
}

var autoresizingMask = getElementAttribute(element, "bS", 36);
var shouldUseTranslates = shouldUseTranslatesForElement(element);

var elementOid = _idReverseMapping[element.id];
var parentOid = parentOidForElementOid(elementOid);

var originalContainerSize = currentSizeForElementOid(parentOid);
var currentContainerSize = browserReportedSizeForElementOid(parentOid);
var currentElementSize = currentSizeForElementOid(elementOid);

var leftValue = getElementAttribute(element, "a", 0);
var topValue = getElementAttribute(element, "b", 0);
var widthValue = getElementAttribute(element, "c", null);
var heightValue = getElementAttribute(element, "d", null);

// if there's been no width/height is likely a text box without explicit dimensions. We still need to know what it is, but should not set it.
var shouldSetWidth = true;
var shouldSetHeight = true;

if(widthValue == null) {
shouldSetWidth = false;
widthValue = currentElementSize.width;
}
if(heightValue == null) {
shouldSetHeight = false;
heightValue = currentElementSize.height;
}

var fullWidth = currentWidthForElementWithOid(elementOid);
var fullHeight = currentHeightForElementWithOid(elementOid);
var widthPadding = fullWidth - widthValue; // accounts for padding AND border
var heightPadding = fullHeight - heightValue; // accounts for padding AND border

var calculatedLeft = leftValue;
var calculatedTop = topValue;
var calculatedFullWidth = fullWidth;
var calculatedFullHeight = fullHeight;

var isScaleZoomContents = false;

if(_usesFlexibleLayout == true && autoresizingMask != 36) {
var isMinXMargin = (autoresizingMask & NSViewMinXMargin) != 0; // right pin
var isMaxXMargin = (autoresizingMask & NSViewMaxXMargin) != 0; // left pin
var isWidthSizable = (autoresizingMask & NSViewWidthSizable) != 0; // width scale
var isMinYMargin = (autoresizingMask & NSViewMinYMargin) != 0; // bottom pin
var isMaxYMargin = (autoresizingMask & NSViewMaxYMargin) != 0; // top pin
var isHeightSizable = (autoresizingMask & NSViewHeightSizable) != 0; // height scale
var isScaleShrink = ((autoresizingMask & kHypeViewScaleShrink) != 0) && (isWidthSizable == true) && (isHeightSizable == true);
var isScaleExpand = ((autoresizingMask & kHypeViewScaleExpand) != 0) && (isWidthSizable == true) && (isHeightSizable == true);
isScaleZoomContents = ((autoresizingMask & kHypeViewScaleZoomContents) != 0) && ((isWidthSizable == true) || (isHeightSizable == true));
var shouldPreserveProportions = (isScaleShrink == true || isScaleExpand == true);

var widthResizeRatio = (currentContainerSize.width / originalContainerSize.width);
var heightResizeRatio = (currentContainerSize.height / originalContainerSize.height);


if(isWidthSizable == true) {
if(isMinXMargin == true && isMaxXMargin == true) {
// margin mode
calculatedFullWidth = (fullWidth + (currentContainerSize.width - originalContainerSize.width));
} else {
// proportionate
calculatedFullWidth = Math.ceil(fullWidth * widthResizeRatio);
}
}

if(isMinXMargin == true && isMaxXMargin == true && isWidthSizable == false) {
// center
var centerPoint = (leftValue + (fullWidth / 2));
calculatedLeft = Math.ceil((centerPoint * widthResizeRatio) - (fullWidth / 2));
} else if(isMinXMargin == true && isMaxXMargin == false && isWidthSizable == true) {
// right pin proportionate
calculatedLeft = (currentContainerSize.width - originalContainerSize.width) + leftValue - (calculatedFullWidth - fullWidth);
} else if(isMinXMargin == true && isMaxXMargin == false) {
// right pin only
calculatedLeft = (currentContainerSize.width - originalContainerSize.width) + leftValue;
} else if(isMinXMargin == false && isMaxXMargin == false) {
// no pin (proportionate)
calculatedLeft = Math.ceil(leftValue * widthResizeRatio);
}

if(isHeightSizable == true) {
if(isMinYMargin == true && isMaxYMargin == true) {
// margin mode
calculatedFullHeight = (fullHeight + (currentContainerSize.height - originalContainerSize.height));
} else {
// proportionate
calculatedFullHeight = Math.ceil(fullHeight * heightResizeRatio);
}
}

if(isMinYMargin == true && isMaxYMargin == true && isHeightSizable == false) {
// center
var centerPoint = (topValue + (fullHeight / 2));
calculatedTop = Math.ceil((centerPoint * heightResizeRatio) - (fullHeight / 2));
} else if(isMinYMargin == true && isMaxYMargin == false && isHeightSizable == true) {
// bottom pin proportionate
calculatedTop = (currentContainerSize.height - originalContainerSize.height) + topValue - (calculatedFullHeight - fullHeight);
} else if(isMinYMargin == true && isMaxYMargin == false) {
// bottom pin only
calculatedTop = (currentContainerSize.height - originalContainerSize.height) + topValue;
} else if(isMinYMargin == false && isMaxYMargin == false) {
// no pin (proportionate)
calculatedTop = Math.ceil(topValue * heightResizeRatio);
}

if(shouldPreserveProportions == true) {
var previouslyCalculatedCalculatedWidth = calculatedFullWidth;
var previouslyCalculatedCalculatedHeight = calculatedFullHeight;
var proportionalWidthResizeRatio = (calculatedFullWidth / fullWidth);
var proportionalHeightResizeRatio = (calculatedFullHeight / fullHeight);
var proportionalResizeRatio = proportionalWidthResizeRatio;

if(isScaleShrink == true) { // choose largest
proportionalResizeRatio = (proportionalWidthResizeRatio <= proportionalHeightResizeRatio) ? proportionalWidthResizeRatio : proportionalHeightResizeRatio;
} else if(isScaleExpand == true) { // choose smallest
proportionalResizeRatio = (proportionalWidthResizeRatio >= proportionalHeightResizeRatio) ? proportionalWidthResizeRatio : proportionalHeightResizeRatio;
}

calculatedFullWidth = Math.ceil(fullWidth * proportionalResizeRatio);
calculatedFullHeight = Math.ceil(fullHeight * proportionalResizeRatio);

var proportionalWidthDelta = previouslyCalculatedCalculatedWidth - calculatedFullWidth;
var proportionalHeightDelta = previouslyCalculatedCalculatedHeight - calculatedFullHeight;

if(isMinXMargin == true && isMaxXMargin == false) { // need to bottom-align
calculatedLeft += proportionalWidthDelta;
} else if(isMinXMargin == true && isMaxXMargin == true) { // need to center
calculatedLeft += Math.ceil(proportionalWidthDelta / 2);
}

if(isMinYMargin == true && isMaxYMargin == false) { // need to bottom-align
calculatedTop += proportionalHeightDelta;
} else if(isMinYMargin == true && isMaxYMargin == true) { // need to center
calculatedTop += Math.ceil(proportionalHeightDelta / 2);
}
}
}

var calculatedWidth = Math.max(0, (calculatedFullWidth - widthPadding));
var calculatedHeight = Math.max(0, (calculatedFullHeight - heightPadding));



if(shouldSetWidth == true) {
if(isScaleZoomContents == true) {
var transformOriginXOffsetPercentage = getElementAttribute(element, "tX", .5);
calculatedLeft += (transformOriginXOffsetPercentage * (calculatedFullWidth - fullWidth));
setElementAttribute(element, "HYP_t", Math.max(0, (calculatedFullWidth / fullWidth)));
calculatedWidth = widthValue;
}
element.style.width = transformValuePixel(calculatedWidth, 2);
} else {
element.style.width = "";
}

if(shouldSetHeight == true) {
if(isScaleZoomContents == true) {
var transformOriginYOffsetPercentage = getElementAttribute(element, "tY", .5);
calculatedTop += (transformOriginYOffsetPercentage * (calculatedFullHeight - fullHeight));
setElementAttribute(element, "HYP_u", Math.max(0, (calculatedFullHeight / fullHeight)));
calculatedHeight = heightValue;
}
element.style.height = transformValuePixel(calculatedHeight, 2);
} else {
element.style.height = "";
}



setElementAttribute(element, "HYP_a", calculatedTop);
setElementAttribute(element, "HYP_b", calculatedLeft);

if(shouldUseTranslates == false) {


element.style.top = transformValuePixel(calculatedTop);
element.style.left = transformValuePixel(calculatedLeft);
}

if(shouldUseTranslates == true || isScaleZoomContents == true) {

updateTransforms(element);

}



if (_shouldQueueWaypointUpdates == false) {
refreshAllWaypoints();
}
};

var updateDisplay = function (element) {
var oldDisplay = element.style.display;
var displayHiddenOverride = getElementAttribute(element, "cY", false);
element.style.display = (displayHiddenOverride == true) ? "none" : getElementAttribute(element, "r", "");

if(oldDisplay == "none") {
relayoutIfNecessaryUsingParentOid(_idReverseMapping[element.id]);
}
};

var updateAccessibility = function (element) {
var previousAriaHiddenValue = getElementAttribute(element, "HYP_w", false);

// if opacity is zero, only set to hidden if there's no specific action handlers
var ariaHiddenValue = (getElementAttribute(element, "e", 1) == 0 &&
(getElementAttribute(element, "aA") == null &&
getElementAttribute(element, "aE") == null &&
getElementAttribute(element, "aB") == null &&
getElementAttribute(element, "bN") == null));

if(previousAriaHiddenValue != ariaHiddenValue) {
var tabIndex = getElementAttribute(element, "ti");

if(ariaHiddenValue == true) {
element.setAttribute("aria-hidden", true);
_Apply['ti'](element, null);
} else {
element.removeAttribute("aria-hidden");
_Apply['ti'](element, tabIndex);
}

setElementAttribute(element, "HYP_w", ariaHiddenValue);
}
};

var updateBackgroundGradient = function (element) {
var backgroundGradientStartColor = getElementAttribute(element, "n");
if(backgroundGradientStartColor == null || backgroundGradientStartColor == "") {
return;
}
var backgroundGradientEndColor = getElementAttribute(element, "m");
if(backgroundGradientEndColor == null || backgroundGradientEndColor == "") {
return;
}
var backgroundGradientAngle = getElementAttribute(element, "l");
if(backgroundGradientAngle == null) {
return;
}

function generateGradientString(prefix, isSpecRotation) {
var angle = (isSpecRotation == true) ? ((Math.abs(backgroundGradientAngle) + 180) % 360) : ((360 - Math.abs(backgroundGradientAngle) + 270) % 360);
return "" + prefix + "linear-gradient(" + transformValueDegree(angle) + "," + sanitizeColor(backgroundGradientStartColor) + "," + sanitizeColor(backgroundGradientEndColor) + ")";
}

if(_browserInfo.webkit != null) {
element.style.backgroundImage = generateGradientString(_hype.kSizeOptimizationWebKitPrefix, false);
} else if(_browserInfo.gecko != null) {
element.style.backgroundImage = generateGradientString("-moz-", false);
}

else if(_browserInfo.opera < 15) {
element.style.backgroundImage = generateGradientString("-o-", false);
} else {
element.style.backgroundImage = generateGradientString("", true);
}
};

var updateBrowserSpecificTransforms = function (element, value) {

updateTransforms(element);


};


var updateTransforms = function (element) {
var shouldUseTranslates = shouldUseTranslatesForElement(element);
var leftValue = (shouldUseTranslates == false) ? null : getElementAttribute(element, "HYP_b");
var topValue = (shouldUseTranslates == false) ? null : getElementAttribute(element, "HYP_a");
var depthValue = getElementAttribute(element, "bQ", 0);
var rotateAngleXValue = getElementAttribute(element, "bR", 0);
var rotateAngleYValue = getElementAttribute(element, "aY", 0);
var rotateAngleZValue = getElementAttribute(element, "f", 0);
var motionPathRotation = getElementAttribute(element, "bO", 0);
var scaleXMultiplierValue = getElementAttribute(element, "HYP_t", 1);
var scaleYMultiplierValue = getElementAttribute(element, "HYP_u", 1);
var scaleXValue = (getElementAttribute(element, "cQ", 1) * scaleXMultiplierValue);
var scaleYValue = (getElementAttribute(element, "cR", 1) * scaleYMultiplierValue);
var isAncestorScaled = getElementAttribute(element, "HYP_q");
var hasBlur = (getElementAttribute(element, "bL", 0) != 0);
var transformOriginXOffset = getElementAttribute(element, "tX", .5);
var transformOriginYOffset = getElementAttribute(element, "tY", .5);
var transformString = "";

// see if I need to cache ancestor scaling
if(isAncestorScaled == null) {
isAncestorScaled = false;
// examine using initial values as the dom/currentValues might not be all setup yet
var sceneIndex = sceneIndexForElement(element);
var initialValues = _scenes[sceneIndex]["v"];
var currentElementOid = _idReverseMapping[element.id];

while(currentElementOid != null && initialValues[currentElementOid] != null) {
var parentOid = initialValues[currentElementOid]["bF"];
if(parentOid != null && initialValues[parentOid] != null &&
(initialValues[parentOid]["cQ"] != null ||
 initialValues[parentOid]["cR"] != null ||
 (_usesFlexibleLayout == true && (initialValues[parentOid]["bS"] & kHypeViewScaleZoomContents) != 0))) {
isAncestorScaled = true;
break;
}
currentElementOid = parentOid;
}

setElementAttribute(element, "HYP_q", isAncestorScaled);
}

// determine whether this should really use rotateY(0)
var useGraphicsAcceleration =((_useGraphicsAcceleration == true) && // base setting from hype app
(element.className.indexOf("HYPE_scene") == -1) && // only use for elements, not scenes
(scaleXValue == 1 && scaleYValue == 1 && isAncestorScaled == false) && // don't use it on scaling so text remains sharp
(!(hasBlur == true && _browserInfo.chrome >= 50))); // workaround for #11632 Blur issues in Chrome 50

// workaround for for case:12494 Microsoft IE Edge Browser uses pixel rendering on transform:scale, a small z rotation will do subpixel scaling
// borders will not render correctly with this mode though, so do not use if there is a border
if((_browserInfo.ie >= 10) &&
(rotateAngleZValue == 0) &&
(scaleXValue != 1 || scaleYValue != 1) &&
(getElementAttribute(element, "N", 0) == 0) &&
(getElementAttribute(element, "O", 0) == 0) &&
(getElementAttribute(element, "P", 0) == 0) &&
(getElementAttribute(element, "M", 0) == 0)) {

rotateAngleZValue = 0.00001;
}

if(leftValue != null) {
transformString += " translateX(" + transformValuePixel(leftValue, 2) + ") ";
}
if(topValue != null) {
transformString += " translateY(" + transformValuePixel(topValue, 2) + ") ";
}
if(depthValue != 0) {
transformString += " translateZ(" + transformValuePixel(depthValue) + ") ";
}
if(motionPathRotation != 0) {
   if (getElementAttribute(element, "bP") == "YES") {
transformString += " rotate(" + transformValueDegree(motionPathRotation) + ") ";
}
}
if(rotateAngleZValue != 0) {
transformString += " rotate(" + transformValueDegree(rotateAngleZValue) + ") ";
}
if(_browserInfo.supports3D == true) {
if(rotateAngleYValue != 0 || useGraphicsAcceleration == true) {
transformString += " rotateY(" + transformValueDegree(rotateAngleYValue) + ") ";
}
if(rotateAngleXValue != 0) {
transformString += " rotateX(" + transformValueDegree(rotateAngleXValue) + ") ";
}
}
if(scaleXValue != 1) {
transformString += " scaleX(" + scaleXValue + ") ";
}
if(scaleYValue != 1) {
transformString += " scaleY(" + scaleYValue + ") ";
}

var transformOriginString = "" + transformValuePercent(transformOriginXOffset) + " " + transformValuePercent(transformOriginYOffset);
element.style[_hype.kSizeOptimizationWebKitPrefix + "transform-origin"] = transformOriginString;
element.style["MozTransformOrigin"] = transformOriginString;
element.style["OTransformOrigin"] = transformOriginString;
element.style["-ms-transform-origin"] = transformOriginString;
element.style["transform-origin"] = transformOriginString;

element.style["-webkit-transform"] = transformString;
element.style["MozTransform"] = transformString;
element.style["OTransform"] = transformString;
element.style["-ms-transform"] = transformString;
element.style["transform"] = transformString;
};



var updateBoxShadow = function (element) {
var boxShadowXOffset = getElementAttribute(element, "S");
var boxShadowYOffset = getElementAttribute(element, "T");
var boxShadowShadowColor = getElementAttribute(element, "R");
var boxShadowBlurRadius = getElementAttribute(element, "Q");

if(boxShadowXOffset == null || boxShadowYOffset == null || boxShadowShadowColor == null || boxShadowBlurRadius == null) {
return;
}

var boxShadowProperties = [_hype.kSizeOptimizationWebKitPrefix + "box-shadow" /* webkit */, "MozBoxShadow" /* mozilla */, "boxShadow" /* firefox 4.0+ */, "box-shadow" /* ie/standard */];
var shouldRemoveBoxShadow = (boxShadowXOffset == 0 && boxShadowYOffset == 0 && boxShadowBlurRadius == 0);

// apply
var boxShadowValue = transformValuePixel(boxShadowXOffset) + " " + transformValuePixel(boxShadowYOffset) + " " + transformValuePixel(boxShadowBlurRadius) + " " + sanitizeColor(boxShadowShadowColor);
for(var i = 0; i < boxShadowProperties.length; i++) {
if(shouldRemoveBoxShadow == true) {

element.style.removeProperty(boxShadowProperties[i]);

} else {
element.style[boxShadowProperties[i]] = boxShadowValue;
}
}
};

var updateTextShadow = function (element) {
var textShadowXOffset = getElementAttribute(element, "bB");
var textShadowYOffset = getElementAttribute(element, "bC");
var textShadowShadowColor = getElementAttribute(element, "bA");
var textShadowBlurRadius = getElementAttribute(element, "aZ");
if(textShadowXOffset == null || textShadowYOffset == null || textShadowShadowColor == null || textShadowBlurRadius == null) {
return;
}

var shouldRemoveTextShadow = (textShadowXOffset == 0 && textShadowYOffset == 0 && textShadowBlurRadius == 0);

if(shouldRemoveTextShadow == true) {
element.style["textShadow"] = "none";
} else {
element.style["textShadow"] = "" + transformValuePixel(textShadowXOffset) + " " + transformValuePixel(textShadowYOffset) + " " + transformValuePixel(textShadowBlurRadius) + " " + sanitizeColor(textShadowShadowColor);
}
};

var updateBackdropFilterEffect = function (element) {
updateFilterEffect(element, true);
};

var updateForegroundFilterEffect = function (element) {
updateFilterEffect(element, false);
};

var updateFilterEffect = function (element, isBackdropFilter) {
// don't use filters on older IE browsers since filter means something else to them
if(_browserInfo.ie < 12) {
return;
}

var prefix = (isBackdropFilter == true) ? "BD" : "";

var blur = getElementAttribute(element, prefix + "bL", 0);
var sepia = getElementAttribute(element, prefix + "bG", 0);
var hue = getElementAttribute(element, prefix + "bH", 0);
var saturate = getElementAttribute(element, prefix + "bI", 1.0);
var brightness = getElementAttribute(element, prefix + "bJ", 1.0);
var contrast = getElementAttribute(element, prefix + "bK", 1.0);

var filterString = "";

if(blur != 0) {
filterString += "blur(" + blur + "px) ";
}
if(sepia != 0) {
filterString += "sepia(" + sepia + ") ";
}
if(hue != 0) {
filterString += "hue-rotate(" + transformValueDegree(hue) + ") ";
}
if(saturate != 1.0) {
filterString += "saturate(" + saturate + ") ";
}

if(brightness != 1.0) {
// older webkits and even Hype misinterpreted the spec (-100%=black,0%=normal,100%=white), thus I add 1.0 to the brightness value for newer browsers
// see http://code.google.com/p/chromium/issues/detail?id=168004
if(_browserInfo.safari == 6 || (_browserInfo.ios != null && _browserInfo.webkit <= 536.26)) {
brightness -= 1;
if(brightness > 1.0) { // also older safari did not allow brightness beyond 1.0, which is now allowed with the spec
brightness = 1;
}
}
filterString += "brightness(" + brightness + ") ";
}
if(contrast != 1.0) {
filterString += "contrast(" + contrast + ") ";
}

if(filterString == "") {
filterString = "none";
}

// need to force a repaint since WebKit won't do so if just changing the filter effect
if(isBackdropFilter == true) {
element.style[_hype.kSizeOptimizationWebKitPrefix + 'backdrop-filter'] = filterString;
element.style['backdrop-filter'] = filterString;

var originalDisplayValue = element.style.display;
element.style.display = 'none';
element.style.display += ("" + element.offsetWidth).substring(0,0); // causes recalculation
element.style.display = originalDisplayValue;
} else {
element.style[_hype.kSizeOptimizationWebKitPrefix + 'filter'] = filterString;
element.style['filter'] = filterString;
}
};

var updateIFrameSource = function (element) {
var type = getElementAttribute(element, "V");
if(type != null) {
var iframeSrc = "";
if(type == "1") { // url
iframeSrc = urlByReplacingCommonUserErrors(getElementAttribute(element, "W"));
} else if(type == "0") { // html
iframeSrc = "" + _resourcesFolderName + "/" + getElementAttribute(element, "U");
}

var iframeInnerHTML = "<iframe frameBorder='0'style='width:100%;height:100%;border:none'></iframe>";

// fix for iBooks scrolling issue <rdar://problem/10798491> Cannot scroll iframes in iBooks on iPad
if(_browserInfo.ios != null) {
iframeInnerHTML = "<div style='overflow:auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;'>" + iframeInnerHTML + "</div>";
}

element.innerHTML = iframeInnerHTML;
element.getElementsByTagName("iframe")[0].src = iframeSrc;
}
};

var updateReflection = function (element) {
var reflectionOffset = getElementAttribute(element, "aX", 8); //TODO: make it so this value comes from the same place for HypeAttribute and the javascript
var reflectionDepth = getElementAttribute(element, "aW", 0);

if(_browserInfo.android == null) {
if((1.0 - reflectionDepth) == 1.0 && element.style.removeProperty != null) {
element.style.removeProperty(_hype.kSizeOptimizationWebKitPrefix + "box-reflect");
} else {
element.style[_hype.kSizeOptimizationWebKitPrefix + "box-reflect"] = "below " + transformValuePixel(reflectionOffset) + " -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(" + (1.0 - reflectionDepth) + ",transparent),to(rgba(255,255,255,.5)))";
}
}
};

var noOpFunction = function () {

};



var createButtonHandler = function (element, value) {
return (function (e) {
applyButtonFromTimelineRun(e, value, _idReverseMapping[element.id]);
});
};

var createButtonResetHandler = function (element, value) {
return (function (e) {
resetButtonFromTimelineRun(e, value, _idReverseMapping[element.id]);
});
};

var sceneContainerIndexForOidAndNavigationSymbol = function (sceneOid, sceneSymbol) {
var sceneContainerIndex = -1;
if(sceneSymbol == null || sceneSymbol == kJumpToSceneOther) {
sceneContainerIndex = indexOfSceneContainerWithIdentifier(sceneOid);
} else if(sceneSymbol == kJumpToSceneNext && _currentSceneContainerIndex + 1 < _sceneContainers.length) {
sceneContainerIndex = _currentSceneContainerIndex + 1;
} else if(sceneSymbol == kJumpToScenePrevious) {
sceneContainerIndex = _currentSceneContainerIndex - 1;
} else if(sceneSymbol == kJumpToSceneFirst) {
sceneContainerIndex = 0;
} else if(sceneSymbol == kJumpToSceneLast) {
sceneContainerIndex = _sceneContainers.length - 1;
} /*else if(sceneSymbol == kJumpToSceneNone) {
sceneContainerIndex = -1;
}*/
return sceneContainerIndex;
};

var createActionHandler = function (element, value) {
return (function (e) {
for(var i = 0; i < value.length; i++) {
var action = value[i];

var type = action["p"];
if(type == kActionJumpToScene) {
var sceneContainerOid = action["e"];
var sceneSymbol = action["f"];
var sceneContainerIndex = sceneContainerIndexForOidAndNavigationSymbol(sceneContainerOid, sceneSymbol);
var transition = action["g"];
var duration = action["d"];

showSceneContainer(sceneContainerIndex, transition, duration);
}/* else if(type == kActionPresentMedia) {

}*/ else if(type == kActionStartTimeline) {
if(action["b"] != null) {
var timelineRun = timelineRunForIdentifier(action["b"]);
var playInReverse = (action["z"] != undefined) ? action["z"] : false;
startTimelineRun(action["b"], (element != null ? element.id : null), playInReverse);
}
} else if(type == kActionPauseTimeline) {
if(action["b"] != null) {
var pauseTime = action["r"];
pauseTimelineWithIdentifier(action["b"], pauseTime);
}
} else if(type == kActionContinueTimeline) {
if(action["b"] != null) {
var playInReverse = (action["z"] != undefined) ? action["z"] : false;
var canRestartTimeline = (action["J"] != undefined) ? action["J"] : false;
continueTimelineWithIdentifier(action["b"], playInReverse, true, canRestartTimeline);
}
} else if(type == kActionGoToTimeInTimeline) {
if(action["b"] != null && action["i"] != null) {
goToTimeInTimelineWithIdentifier(action["i"], action["b"], false, true);
}
} else if(type == kActionRunJavascript) {
var functionCall;
if(action["h"] != null) {
functionCall = _functions[_javascriptMapping[action["h"]]];
} else if(action["hc"] != null) {
functionCall = action["hc"]
}

try {
functionCall(_hype['API'], element, e);
} catch(err) {
_log("Error in " + functionName + ": " + err);
}
} else if(type == kActionVisitURL) {
var url = urlByReplacingCommonUserErrors(action["j"]);
if(url != null) {
var openInNewWindow = (action["k"] == true);

// button == 1 is set by FF when ctrl clicking on Windows; meta == true is set by FF when command clicking on OS X.
openInNewWindow = (openInNewWindow || e.button == 1 || e.metaKey == true);

if(openInNewWindow) {
if ((_browserInfo.ie < 9 || _browserInfo.quirksmode) || _browserInfo.ff != null) {
// IE 6 - 8 and IE 9+ in quirks mode don't respect createEvent, initMouseEvent, or dispatchEvent. Firefox reputedly does, but versions before FF6 seem to eat simulated click events; from reading the tea leaves of their bugs, I presume this is purposeful for "security" reasons. FF6-18 (the current Nightly) work in normal mouse click scenarios, but swallow events when the user cmd-clicks. Fall back to naive behavior for these browsers.
window.open(url, "_blank");
} else if ((_browserInfo.ie == 9 || _browserInfo.opera < 15) && !(e instanceof MouseEvent)) {
// window.open must be used on IE 9 and Opera for non-mouse events, as those browsers raise errors when trying to create an artifical mouse event if the user didn't click. (#3782) This logic silently fails on Safari 6 when pop-up blocking is enabled, so we're isolating this case to just IE 9 and Opera.
window.open(url, "_blank");
} else {
// Create an a element in the DOM and virtually click it, providing any current modifier keys. Lets the browser do the right thing w.r.t. opening the link in a new window or tab.
var temporaryLink = document.createElement('a');
temporaryLink.setAttribute("href", url);

// IE>=9 don't repect the middle-mouse button or meta key triggers when handling artifical clicks – they're treated as normal clicks.  We can circumvent that behavior by seting a _blank target if we detect a middle-mouse button click or a meta key click. Safari, Chrome and Opera all do the right thing with or without the _blank target, but the _blank target is necessary to create a new window if the Hype animation is embedded in an iframe
temporaryLink.setAttribute("target", "_blank");

document.body.appendChild(temporaryLink);
var clickEvent = document.createEvent("MouseEvents");
clickEvent.initMouseEvent("click", e.bubbles, e.cancelable, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, document.body.parentNode);
temporaryLink.dispatchEvent(clickEvent);
document.body.removeChild(temporaryLink);
}
} else {
// This is the only way to open links in the same page which works in desktop browsers, iBooks, and in iOS stand-alone web apps, and when Hype animations are embedded in iframes
window.top.location = url;
}
}
} else if(type == kActionComposeEmail) {
var toAddress = action["l"];
var subject = action["m"];
var body = action["n"];
var url = "mailto:";
if (toAddress != null) {
url += escape(toAddress);
}
if (subject != null || body != null) {
url += "?";
var parts = Array();
if (subject != null) {
parts.push("subject="+encodeURIComponent(subject));
}
if (body != null) {
parts.push("body="+encodeURIComponent(body));
}
url += parts.join("&");
}
if (url != "mailto:") {
window.top.location = url;
}
} else if(type == kActionPlaySound) {
var resourceGroupOid = action["o"];
var loop = action["q"];
if(loop != true) {
loop = false;
}
if(resourceGroupOid != null) {
playAudioResourceGroupOid(resourceGroupOid, loop);
}
} else if(type == kActionPauseSound) {
var resourceGroupOid = action["o"];
if(resourceGroupOid != null) {
pauseAudioResourceGroupOid(resourceGroupOid);
}
} else if(type == kActionTriggerCustomBehavior) {
var customBehaviorName = action["B"];
if(customBehaviorName != null) {
triggerCustomBehaviorNamed(customBehaviorName);
}
} else if(type == kActionRunFunction) {
var functionName = action["s"];
var arguments = action["t"];
var command = "" + functionName + "(" + arguments.join(",") + ")";
try {
eval(command);
} catch (err) {
_log("Error in " + functionName + ": " + err);
}
}
}
});
};

var addWaypointForActionHandler = function(element, actionHandler, type) {
if (_waypoint == null) {
return;
}
var options = {
    'element': element,
    'triggerOnce': false,
    'elementOffset': 0
};
options[type] = function(direction) {
    actionHandler();
    };
var waypoint = new _waypoint['hypeS'](options);
_activeWaypoints.push(waypoint);
};

var _Apply = ({
'i' : noOpFunction, // no-op, dom ids are set in createSceneDivs

'cP' : noOpFunction, // no-op, class is set in createSceneDivs

'b' : updateFrame,

'a' : updateFrame,

'c' : updateFrameAndInvalidateReportedSizeCache,

'd' : updateFrameAndInvalidateReportedSizeCache,

'bQ' : function (element, value) {
if(shouldUseTranslatesForElement(element) == true) {
updateTransforms(element);
}
},

'bS' : updateFrame,

't' : function (element, value) {
element.style.fontSize = transformValuePixel(value);
},

's' : function (element, value) {
element.style.fontFamily = value;
},

'v' : function (element, value) {
element.style.fontWeight = value;
},

'u' : function (element, value) {
element.style.fontStyle = value;
},

'H' : function (element, value) {
element.style.textDecoration = value;
},

'F' : function (element, value) {
element.style.textAlign = value;
},

'G' : function (element, value) {
element.style.color = sanitizeColor(value);
},

'X' : function (element, value) {
element.style.letterSpacing = transformValuePixel(value);
},

'E' : function (element, value) {
element.style.wordSpacing = transformValuePixel(value);
},

'Y' : function (element, value) {
element.style.lineHeight = transformValuePixel(value);
},

'aX' : updateReflection,

'aW' : updateReflection,

'f' : updateBrowserSpecificTransforms,

'bR' : updateTransforms,

'aY' : updateTransforms,

'cQ' : updateBrowserSpecificTransforms,

'cR' : updateBrowserSpecificTransforms,

'tX' : updateBrowserSpecificTransforms,

'tY' : updateBrowserSpecificTransforms,

'bO' : updateBrowserSpecificTransforms,

'bP' : noOpFunction, // no-op; _currentValues keeps the cache

'e' : function (element, value) {


// others
element.style.opacity = value;
element.style.MozOpacity = value;

updateAccessibility(element);
},

'aP' : function (element, value) {
element.style.cursor = value;
},

'bD' : function (element, value) {
// webkit
element.style[_hype.kSizeOptimizationWebKitPrefix + "user-select"] = value;

// mozilla
element.style["MozUserSelect"] = value;

// ie
element["onselectstart"] = (function() { return false; });
},

'N' : function (element, value) {
element.style.borderLeftWidth = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'O' : function (element, value) {
element.style.borderRightWidth = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'P' : function (element, value) {
element.style.borderTopWidth = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'M' : function (element, value) {
element.style.borderBottomWidth = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'B' : function (element, value) {
element.style.borderLeftColor = sanitizeColor(value);
},

'C' : function (element, value) {
element.style.borderRightColor = sanitizeColor(value);
},

'D' : function (element, value) {
element.style.borderTopColor = sanitizeColor(value);
},

'A' : function (element, value) {
element.style.borderBottomColor = sanitizeColor(value);
},

'J' : function (element, value) {
element.style.borderLeftStyle = value;
},

'K' : function (element, value) {
element.style.borderRightStyle = value;
},

'L' : function (element, value) {
element.style.borderTopStyle = value;
},

'I' : function (element, value) {
element.style.borderBottomStyle = value;
},

'aK' : function (element, value) {
value = (typeof value != "number") ? value : transformValuePixel(value);
element.style['borderTopLeftRadius'] = value;

// firefox 3.6
element.style["MozBorderRadiusTopleft"] = value;


},

'aL' : function (element, value) {
value = (typeof value != "number") ? value : transformValuePixel(value);
element.style['borderTopRightRadius'] = value;

// firefox 3.6
element.style["MozBorderRadiusTopright"] = value;


},

'aI' : function (element, value) {
value = (typeof value != "number") ? value : transformValuePixel(value);
element.style['borderBottomLeftRadius'] = value;

// firefox 3.6
element.style["MozBorderRadiusBottomleft"] = value;


},

'aJ' : function (element, value) {
value = (typeof value != "number") ? value : transformValuePixel(value);
element.style['borderBottomRightRadius'] = value;

// firefox 3.6
element.style["MozBorderRadiusBottomright"] = value;


},

'bE' : function (element, value) {
element.innerHTML = "";



var resourceIDs = _resourceGroups[value];
if(resourceIDs == null) {
return;
}

for(var i = 0; i < resourceIDs.length; i++) {
var resourceID = resourceIDs[i];
var resource = _resources[resourceID];
var mimeType = resource["t"];
var resourcePath = resourcePathForResourceID(resourceID);

var sourceElement = element.ownerDocument.createElement("source");
sourceElement.src = resourcePath;
if(mimeType != null && (_browserInfo.chrome == null || mimeType != "video/quicktime")) { // quicktime check for 4741: Quicktime videos do not play in Chrome
sourceElement.setAttribute("type", mimeType);
}

element.appendChild(sourceElement);


}


},

// this is internal for IE support
'Play' : function (value, embedobj) {
                try {
                    if(value == true) {
embedobj['Play']();
} else {
embedobj['Stop']();
}
                } catch (err) {
                    window.setTimeout(function() { _Apply['Play'](embedobj, value); }, 100);
                }
},

'aH' : function (element, value) {
// autoplay is now used by Hype's animation system
element.autoplay = false;// (value != 0);
},

'aO' : function (element, value) {

element.setAttribute("controls", value);
element.controls = (value != 0);


},

'dA' : function (element, value) {
element.setAttribute("playsinline", value);
},

'aR' : function (element, value) {
element.muted = (value != 0);
element.volume = (value != 0) ? "0.0" : "1.0";


},

'aQ' : function (element, value) {
element.setAttribute("loop", value);
element.loop = (value != 0);

},

'j' : function (element, value) {
element.style.position = value;
},

'r' : updateDisplay,

'cY' : updateDisplay,

'aG' : function (element, value) {
element.setAttribute("title", value);
element.setAttribute("alt", value);
},

'dB' : function (element, value) {
element.setAttribute("role", value);
},

'g' : function (element, value) {
element.style.backgroundColor = sanitizeColor(value);
},

'n' : updateBackgroundGradient,

'm' : updateBackgroundGradient,

'l' : updateBackgroundGradient,

'h' : function (element, value) {
var resourceID = bestImageResourceIDForResourceGroupOid(value);
if(resourceID == null) {
return;
}
var resourcePath = resourcePathForResourceID(resourceID);

applyValue(element, 'cZ', resourcePath);
},

'cZ' : function (element, value) {
var resourcePath = value;



element.style.backgroundImage = "url('" + escapeURLForCSS(resourcePath) + "')";
  

},

'q' : function (element, value) {
element.style['backgroundSize'] = value;

// webkit
element.style[_hype.kSizeOptimizationWebKitPrefix + "background-size"] = value;

// mozilla
element.style["MozBackgroundSize"] = value;
},

'o' : function (element, value) {
element.style['backgroundOrigin'] = value;

// webkit
element.style[_hype.kSizeOptimizationWebKitPrefix + "background-origin"] = value;

// mozilla
element.style["MozBackgroundOrigin"] = value;
},

'p' : function (element, value) {

element.style.backgroundRepeat = value;
},

'x' : function (element, value) {
element.style.overflow = value;
},

'aT' : function (element, value) {
element.style.paddingLeft = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'aU' : function (element, value) {
element.style.paddingRight = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'aV' : function (element, value) {
element.style.paddingTop = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'aS' : function (element, value) {
element.style.paddingBottom = transformValuePixel(value);
updateFrameAndInvalidateReportedSizeCache(element);
},

'S' : updateBoxShadow,

'T' : updateBoxShadow,

'R' : updateBoxShadow,

'Q' : updateBoxShadow,

'bB' : updateTextShadow,

'bC' : updateTextShadow,

'bA' : updateTextShadow,

'aZ' : updateTextShadow,

'bL' : function (element, value) {
updateForegroundFilterEffect(element);

// workaround for #3485/chromium bug 161423
if(_browserInfo.chrome != null && element.style["-webkit-transform"] == "") {
element.style["-webkit-transform"] = "none";
}
},

'bG' : updateForegroundFilterEffect,

'bH' : updateForegroundFilterEffect,

'bI' : updateForegroundFilterEffect,

'bJ' : updateForegroundFilterEffect,

'bK' : updateForegroundFilterEffect,

'BDbL' : updateBackdropFilterEffect,

'BDbG' : updateBackdropFilterEffect,

'BDbH' : updateBackdropFilterEffect,

'BDbI' : updateBackdropFilterEffect,

'BDbJ' : updateBackdropFilterEffect,

'BDbK' : updateBackdropFilterEffect,

'Z' : function (element, value) {
element.style.wordWrap = value;
},

'yy' : function (element, value) {
element.style['whiteSpace'] = value;
},

'y' : function (element, value) {
element.style['whiteSpaceCollapsing'] = value;
},
 
'z' : function (element, value) {
element.style.zIndex = value;

if(element.parentNode.className == "HYPE_element_container") { // 3d support
element.parentNode.style.zIndex = value;
}
},

'aA' : function (element, value) {
var actionHandler = createActionHandler(element, value["a"]);
if (_useTouchEvents) {
var options = { fingers: 1, gestureType:kGestureTap };
addGestureHandler(element, options, actionHandler);
element.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
}
addActionHandler("click", element, actionHandler, true);
},

'aD' : function (element, value) {
addActionHandler("mouseover", element, createActionHandler(element, value["a"]), false);
},

'aC' : function (element, value) {
addActionHandler("mouseout", element, createActionHandler(element, value["a"]), false);
},

'aE' : function (element, value) {
var actionHandler = createActionHandler(element, value["a"]);
if (_useTouchEvents) {
addActionHandler("touchend", element, actionHandler, true);
element.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
}
addActionHandler("mouseup", element, actionHandler, true);
},

'aB' : function (element, value) {
var actionHandler = createActionHandler(element, value["a"]);
if (_useTouchEvents) {
// iOS 9 (beta at least) doesn't allow touchstart events to have a generated click inside of them, so we won't create the touchstart event
// the workaround is to just let it be a mousedown event instead
// <rdar://problem/22506902> iOS 9 Regression: Mobile Safari touchstart events cannot trigger click events for links
// aka #9725: Go to URL in a new window does not work on iOS 9 with touch events
var shouldAddTouchStartHandler = false;

if(_browserInfo.ios != null) {
var actions = value["a"];
for(var i = 0; i < actions.length; i++) {
if(actions[i]["p"] == kActionVisitURL && actions[i]["k"] == true) {
shouldAddTouchStartHandler = true;
break;
}
}
}

if(shouldAddTouchStartHandler != true) {
addActionHandler("touchstart", element, actionHandler, true);
}

element.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
}
addActionHandler("mousedown", element, actionHandler, true);
},

'bN' : function (element, value) {
addDragGestureHandler(element, value);
},

'cW' : function (element, value) {
var actionHandler = createActionHandler(element, value["a"]);

addWaypointForActionHandler(element, actionHandler, 'enter');
},

'cX' : function (element, value) {

var actionHandler = createActionHandler(element, value["a"]);
addWaypointForActionHandler(element, actionHandler, 'exit');
},

'cG' : function (element, value) {
var swipeFunction = createActionHandler(element, value["a"]);
var options = {
fingers : 1,
direction : kRight,
threshold : 30,
gestureType : kGestureSwipe
};
addGestureHandler(element, options, swipeFunction);
},

'cH' : function (element, value) {
var swipeFunction = createActionHandler(element, value["a"]);
var options = {
fingers : 1,
direction : kLeft,
threshold : 30,
gestureType : kGestureSwipe
};
addGestureHandler(element, options, swipeFunction);
},

'cI' : function (element, value) {
var swipeFunction = createActionHandler(element, value["a"]);
var options = {
fingers : 1,
direction : kUp,
threshold : 30,
gestureType : kGestureSwipe
};
addGestureHandler(element, options, swipeFunction);
},

'cJ' : function (element, value) {
var swipeFunction = createActionHandler(element, value["a"]);
var options = {
fingers : 1,
direction : kDown,
threshold : 30,
gestureType : kGestureSwipe
};
addGestureHandler(element, options, swipeFunction);
},

'cK' : noOpFunction, // no-op; _currentValues keeps the cache

'cF' : noOpFunction, // no-op; _currentValues keeps the cache

'aM' : function (element, value) {
addActionHandler("mouseover", element, createButtonHandler(element, value), false);
addActionHandler("mouseout", element, createButtonResetHandler(element, value), false);
},

'aN' : function (element, value) {
if (_useTouchEvents) {
addActionHandler("touchstart", element, createButtonHandler(element, value), false);
addActionHandler("touchmove", element, createButtonResetHandler(element, value), false);
addActionHandler("touchend", element, createButtonResetHandler(element, value), false);
element.style["-webkit-tap-highlight-color"] = "rgba(0,0,0,0)";
}
addActionHandler("mousedown", element, createButtonHandler(element, value), false);
addActionHandler("mouseup", element, createButtonResetHandler(element, value), false);
},

'V' : updateIFrameSource,

'U' : updateIFrameSource,

'W' : updateIFrameSource,

'w' : function (element, value) {


element.innerHTML = value;

// execute any embedded <script>...</script> javascripts (those with src= will not work, see #868)
var scripts = element.getElementsByTagName("script");
for(var i = 0; i < scripts.length; i++) {
if(scripts[i].src == "") {
// better form of eval(scripts[i].text) for IE and Firefox (taken from jquery)
(window.execScript || function(data) { window["eval"].call(window, data); })(scripts[i].text);
}
}


},

'bT' : function (element, value) {
for(var i = 0; i < value.length; i++) {
var customBehaviorName = value[i]["B"];
var actionHandler = createActionHandler(element, value[i]["a"]);
var persistentSymbolOid = value[i]["cL"];
addCustomBehaviorHandler(customBehaviorName, element, actionHandler, persistentSymbolOid);
}
},

'cV' : function (element, value) {
_Apply['bT'](element, value);
},

'aF' : function (element, value) {
element.style.cssText += "\n" + value;
},

'k' : function (element, value) {
// can't change this after the fact!
},

'bF' : function (element, value) {
var childElement = element;
var childContainer = element.parentNode;
if(childContainer != null && childContainer.className == "HYPE_element_container") {
childElement = childContainer;
}
var newParentElement = getElementByHypeOid(value);
var oldParentElement = childElement.parentNode;
if(newParentElement == null || newParentElement == childElement || newParentElement == element || newParentElement == oldParentElement) {
return;
}

oldParentElement.removeChild(childElement);
newParentElement.appendChild(childElement);
},

'ti' : function (element, value) {
if(value == null) {
element.removeAttribute('tabindex');
} else {
element.setAttribute('tabindex', value);
}
},

'cN' : function (element, value) {
element.style["pointerEvents"] = value;
element.style["pointer-events"] = value;

if (_browserInfo.ie < 11) {
var handler = (function (e) {
e = (e) ? e : window.event;
if (element.style['pointer-events'] == 'none') {
            var originalDisplayAttribute = element.style.display;
            element.style.display = 'none';

            var underneathElement = document.elementFromPoint(e.clientX, e.clientY);

            if (originalDisplayAttribute) {
            element.style.display = originalDisplayAttribute;
            } else {
            element.style.display = '';
            }

            // fire the mouse event on the element below
            if (document.createEvent) {
            e.preventDefault();
var clickEvent = document.createEvent("MouseEvents");
clickEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, e.view, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, null);
    underneathElement.dispatchEvent(clickEvent);    
  } 

            return;
        }
        });
addEventHandler('MSPointerUp', handler, element, true);
addEventHandler('mouseup', handler, element, true);
addEventHandler('mousedown', handler, element, true);
addEventHandler('click', handler, element, true);
}
}
});



//
//  HypeAudio.js
//  Hype
//
//  Created by Jonathan Deutsch on 7/17/12.
//  Copyright (c) 2010-2017 Tumult Inc. All rights reserved.
//

var HypeAudio_allAudios = {};

function HypeAudio(audioMethodAPI, oid, sourceURLsByMimeType, options) {
var hypeAudio = HypeAudio_allAudios[oid];
if(hypeAudio != null) {
return hypeAudio;
}

try {
hypeAudio = new audioMethodAPI(oid, sourceURLsByMimeType);
} catch (err) {
if(audioMethodAPI == HypeAudio_WebAudioAPI) {
hypeAudio = new HypeAudio_HTML5(oid, sourceURLsByMimeType);
}
}

hypeAudio.oid = oid;
hypeAudio.sourceURLsByMimeType = sourceURLsByMimeType;
hypeAudio.options = options;

//  default values:
//hypeAudio.playWhenFinishedLoading = false;
//hypeAudio.isLoading = false;
//hypeAudio.isLoaded = false;
//hypeAudio.audioBuffer = null;
//hypeAudio.loop = false;

hypeAudio.sortedMimeTypes = function () {
var mimeTypes = Array();
for(var mimeType in hypeAudio.sourceURLsByMimeType) {
if(hypeAudio.sourceURLsByMimeType.hasOwnProperty(mimeType) == false) {
continue;
}
mimeTypes.push(mimeType);
}
return mimeTypes.sort();
};

return hypeAudio;
}

function HypeAudio_HTML5(oid, sourceURLsByMimeType) {
var _hypeAudio = this;
HypeAudio_allAudios[oid] = _hypeAudio;

_hypeAudio.setupAudioElement = function (errorCallback) {
var audioElement = document.createElement("audio");
_hypeAudio.audioElement = audioElement;
var sortedMimeTypes = _hypeAudio.sortedMimeTypes();
for(var i = 0; i < sortedMimeTypes.length; i++) {
var mimeType = sortedMimeTypes[i];
var sourceElement = document.createElement("source");
var sourceURL = _hypeAudio.sourceURLsByMimeType[mimeType];
sourceElement.setAttribute("src", sourceURL);
sourceElement.setAttribute("type", mimeType);
audioElement.appendChild(sourceElement);
}
document.body.appendChild(audioElement);

return audioElement;
};

_hypeAudio.load = function (successCallback, errorCallback) {
if(_hypeAudio.isLoaded == true || _hypeAudio.isLoading == true) {
return;
}

var audioElement = _hypeAudio.setupAudioElement(errorCallback);

var loadCompleteFunction = (function() {
window.clearTimeout(_hypeAudio.watchdog);
if(_hypeAudio.isLoaded == true) {
return;
}

_hypeAudio.isLoading = false;
_hypeAudio.isLoaded = true;
if(successCallback != null) {
successCallback(_hypeAudio);
}
if(_hypeAudio.playWhenFinishedLoading == true) {
_hypeAudio.play();
}
});

var errorFunction = (function() {
window.clearTimeout(_hypeAudio.watchdog);
if(_hypeAudio.isLoaded == true) {
return;
}
_hypeAudio.isLoading = false;
if(errorCallback != null) {
errorCallback(_hypeAudio);
}
});

audioElement.addEventListener("canplaythrough", loadCompleteFunction, true);
audioElement.addEventListener("abort", errorFunction, true);
audioElement.addEventListener("error", errorFunction, true);
_hypeAudio.watchdog = window.setTimeout(errorFunction, 15000); // watchdog timer to make sure the document still loads after 15 seconds (ex: ogg preload on ios gives no error)

_hypeAudio.isLoading = true;
if(navigator.onLine == null || navigator.onLine == true) {
audioElement.load();
} else {
loadCompleteFunction();
}
};

_hypeAudio.play = function () {
if(_hypeAudio.isLoaded != true) {
if(_hypeAudio.isLoading == true) {
_hypeAudio.playWhenFinishedLoading = true;
return;
}
_hypeAudio.isLoaded = true;
}

if(_hypeAudio.audioElement == null) {
_hypeAudio.setupAudioElement(null);
}

try {
_hypeAudio.audioElement.loop = _hypeAudio.loop;
_hypeAudio.audioElement.currentTime = 0;
} catch(e) { }
_hypeAudio.audioElement.play();
};

_hypeAudio.pause = function () {
if(_hypeAudio.isLoaded != true) {
_hypeAudio.playWhenFinishedLoading = false;
return;
}

if(_hypeAudio.audioElement != null) {
_hypeAudio.audioElement.pause();
}
};
}

function HypeAudio_WebAudioAPI(oid, sourceURLsByMimeType) {
var _hypeAudio = this;
HypeAudio_allAudios[oid] = _hypeAudio;

_hypeAudio.load = function (successCallback, errorCallback) {
if(_hypeAudio.isLoaded == true || _hypeAudio.isLoading == true) {
return;
}

_hypeAudio.isLoading = true;

// use a '?' at the end to trigger the NETWORK: variant of the resource when using the cache manifest
var url = _hypeAudio.validSourceURL();
if(url.indexOf("?") == -1) {
url = "" + url + "?";
}

var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "arraybuffer";

request.onload = (function () {
_hypeAudio.isLoading = false;
_hypeAudio.isLoaded = true;
_hypeAudio.responseArrayBuffer = request.response;

if(successCallback != null) {
successCallback(_hypeAudio);
}
if(_hypeAudio.playWhenFinishedLoading == true) {
_hypeAudio.play();
}
});

request.onerror = (function () {
_hypeAudio.isLoading = false;
if(errorCallback != null) {
errorCallback(_hypeAudio);
}
});

try {
request.send();
} catch (err) {}
};

_hypeAudio.play = function () {
_hypeAudio._stop();

// lazily load audio context because Chrome 66+ doesn't like it being created ahead of time without logging a warning
var audioContext = window['HYPE_gac_596'];
if(audioContext == null) {
audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();
window['HYPE_gac_596'] = audioContext;
}
if(audioContext['resume'] != null) {
audioContext['resume']();
}

_hypeAudio.source = audioContext['createBufferSource']();
_hypeAudio.source['connect'](audioContext['destination']);
_hypeAudio.source['loop'] = _hypeAudio.loop;

if(_hypeAudio.options.startAheadOfPlayback == true) {
_hypeAudio._start();
}

if(_hypeAudio.isLoaded != true) {
_hypeAudio.playWhenFinishedLoading = true;
_hypeAudio.load();
return;
} else if(_hypeAudio.responseArrayBuffer != null) {
audioContext['decodeAudioData'](_hypeAudio.responseArrayBuffer, (function (audioBuffer) {
_hypeAudio.audioBuffer = audioBuffer;
_hypeAudio.source['buffer'] = audioBuffer;
if(_hypeAudio.options.startAheadOfPlayback != true) {
_hypeAudio._start();
}
}));
_hypeAudio.responseArrayBuffer = null;
return;
} else {
_hypeAudio.source['buffer'] = _hypeAudio.audioBuffer;
if(_hypeAudio.options.startAheadOfPlayback != true) {
_hypeAudio._start();
}
}
};

_hypeAudio.pause = function () {
if(_hypeAudio.isLoaded != true) {
_hypeAudio.playWhenFinishedLoading = false;
return;
}

_hypeAudio._stop();
};

_hypeAudio._start = function () {
try {
if(_hypeAudio.source != null) {
if(_hypeAudio.source['noteOn'] != null) {
_hypeAudio.source['noteOn'](0);
} else {
_hypeAudio.source['start'](0);
}
}
} catch (e) {}
};

_hypeAudio._stop = function () {
try {
if(_hypeAudio.source != null) {
if(_hypeAudio.source['noteOff'] != null) {
_hypeAudio.source['noteOff'](0);
} else {
_hypeAudio.source['stop'](0);
}
}
} catch (e) {}
};

_hypeAudio.validSourceURL = function () {
if(_hypeAudio.resolvedValidSourceURL != null) {
return _hypeAudio.resolvedValidSourceURL;
}

var dummyAudioElement = document.createElement("audio");

var sortedMimeTypes = _hypeAudio.sortedMimeTypes();
for(var i = 0; i < sortedMimeTypes.length; i++) {
var mimeType = sortedMimeTypes[i];
_hypeAudio.resolvedValidSourceURL = _hypeAudio.sourceURLsByMimeType[mimeType];
if(dummyAudioElement.canPlayType(mimeType) != "no" && dummyAudioElement.canPlayType(mimeType) != "") {
break;
}
}

return _hypeAudio.resolvedValidSourceURL;
};
}






var createAPIForSymbol = function (symbol, element) {
function timelineIdentifierForSymbolTimelineNamed(timelineName) {
return symbol["V"][timelineName] || symbol["W"];
}

return {
'symbolName' : function () { // public, do not change signature without wrapping in _hype['API']!
return symbol["n"];
},
'element' : function () { // public, do not change signature without wrapping in _hype['API']!
return element;
},
'getSymbolInstancesByName' : function (name) { // public, do not change signature without wrapping in _hype['API']!
var symbols = getSymbolInstancesByName(name);
var symbolInstances = Array();
for (var i = 0; i < symbols.length; i++) {
var symbol = symbols[i];
var parent = symbol.element().parentElement;
while (parent != null) {
if (parent == element) {
symbolInstances.push(symbol);
break;
}
parent = parent.parentElement;
}
}
return symbolInstances;
},
'startTimelineNamed' : function (timelineName, direction) { // public, do not change signature without wrapping in _hype['API']!
var reversed = (direction == kDirectionReverse) ? true : false;
startTimelineRun(timelineIdentifierForSymbolTimelineNamed(timelineName), null, reversed);
},
'pauseTimelineNamed' : function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
pauseTimelineWithIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName), null);
},
'continueTimelineNamed' : function (timelineName, direction, canRestartTimeline) { // public, do not change signature without wrapping in _hype['API']!
var reversed = (direction == kDirectionReverse) ? true : false;
continueTimelineWithIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName), reversed, true, canRestartTimeline);
},
'goToTimeInTimelineNamed' : function (time, timelineName) { // public, do not change signature without wrapping in _hype['API']!
goToTimeInTimelineWithIdentifier(time, timelineIdentifierForSymbolTimelineNamed(timelineName), false, false);
},
'currentTimeInTimelineNamed' : function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
return currentTimeInTimelineWithIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName), true);
},
'durationForTimelineNamed' : function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineRun = timelineRunForIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName));
return timelineDuration(timelineRun);
},
'currentDirectionForTimelineNamed' : function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineRun = timelineRunForIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName));
return (timelineRun.isReversed) ? kDirectionReverse : kDirectionForward;
},
'isPlayingTimelineNamed' : function (timelineName) { // public, do not change signature without wrapping in _hype['API']!
var timelineRun = timelineRunForIdentifier(timelineIdentifierForSymbolTimelineNamed(timelineName));
return timelineRun.isPlaying;
}
};
};

///////////////////////////////////////////////////////////////
// exported (public) interfaces

_hype['API'] = {
'kSceneTransitionInstant' : kSceneTransitionInstant,
'kSceneTransitionCrossfade' : kSceneTransitionCrossfade,
'kSceneTransitionSwap' : kSceneTransitionSwap,
'kSceneTransitionPushLeftToRight' : kSceneTransitionPushLeftToRight,
'kSceneTransitionPushRightToLeft' : kSceneTransitionPushRightToLeft,
'kSceneTransitionPushBottomToTop' : kSceneTransitionPushBottomToTop,
'kSceneTransitionPushTopToBottom' : kSceneTransitionPushTopToBottom,
'kHypeGesturePhaseStart' : kPhaseStart,
'kHypeGesturePhaseMove' : kPhaseMove,
'kHypeGesturePhaseEnd' : kPhaseEnd,
'kHypeGesturePhaseCancel' : kPhaseCancel,
'documentName' : (function () { return _documentName; }),
'documentId' : (function () { return _mainContentContainerID; }),
'sceneNames' : sceneNames,
'currentSceneName' : currentSceneName,
'layoutsForSceneNamed' : layoutsForSceneNamed,
'currentLayoutName' : currentLayoutName,
'showLayoutNamed' : showLayoutNamed,
'showSceneNamed' : showSceneNamed,
'showNextScene' : showNextScene,
'showPreviousScene' : showPreviousScene,
'playTimelineNamed' : startTimelineNamed,
'startTimelineNamed' : startTimelineNamed,
'goToTimeInTimelineNamed' : goToTimeInTimelineNamed,
'pauseTimelineNamed' : pauseTimelineNamed,
'continueTimelineNamed' : continueTimelineNamed,
'getElementById' : getElementById,
'setElementProperty' : setPublicElementProperty,
'getElementProperty' : getPublicElementProperty,
'functions' : (function() { return _functions; }),
'resourcesFolderURL' : (function () { return _resourcesFolderName; }),
'relayoutIfNecessary' : relayoutIfNecessary,
'kDirectionForward' : kDirectionForward,
'kDirectionReverse' : kDirectionReverse,
'currentTimeInTimelineNamed' : currentTimeInTimelineNamed,
'durationForTimelineNamed' : durationForTimelineNamed,
'currentDirectionForTimelineNamed' : currentDirectionForTimelineNamed,
'isPlayingTimelineNamed' : isPlayingTimelineNamed,
'triggerCustomBehaviorNamed' : triggerCustomBehaviorNamed,
'getSymbolInstanceById' : getSymbolInstanceById,
'getSymbolInstancesByName' : getSymbolInstancesByName

};

});

if (window['HYPE'] == null) {
window['HYPE'] = window['HYPE_596'];
window['HYPE']['documents'] = {};
}

(function () {
var documentsToLoad = [];
if(window['HYPE_dtl_596'] != null) {
documentsToLoad = window['HYPE_dtl_596'].slice(0); // clone array
}
window['HYPE_dtl_596'] = Array();
for(var i = 0; i < documentsToLoad.length; i++) {
documentsToLoad[i]();
}
})();

})();