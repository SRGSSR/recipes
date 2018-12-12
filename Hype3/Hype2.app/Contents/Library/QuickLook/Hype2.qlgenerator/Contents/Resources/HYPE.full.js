(function(){window['HYPE_596'] = (function HYPE(	_documentName,
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
	
//	_hype['name'] = "hype main object";
//	_hype['version'] = 596;

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

	_hype.kSizeOptimizationMSFilterPrefix = "progid:DXImageTransform.Microsoft";



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


		if(_hasPhysics == true) {
			setupPhysicsVisibilityChangeHandler();
		}


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


		return (new Date).getTime();

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


			if(_hasPhysics == true) {
				wakeAllBodies(physicsEnvironmentForElement(null));
			}

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
			

			// IE6-8, go through all links and dynamically add as a stylesheet
			if(_browserInfo.ie < 9) {
				var matches = headAddition.match(/('|")(http.*?css.*?)('|")/);
				if(matches != null && matches.length >= 2) {
					document.createStyleSheet(matches[2]);
				}
			}

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

		if(elm.getElementsByClassName) {

			return elm.getElementsByClassName(className);

		} else {
			var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
			var tag = "*";
			elm = elm || document;
			var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
			var returnElements = [];
			var current;
			var length = elements.length;
			for(var i=0; i<length; i++){
				current = elements[i];
				if(testClass.test(current.className)){
					returnElements.push(current);
				}
			}
			return returnElements;
		}

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


	
	var resourcePathForBlankGif = function () {
		return resourcePathForResourceID("-2");
	};
	
	var resourcePathForPIE_HTC = function () {
		return resourcePathForResourceID("-1");
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


		if(_browserInfo.ie < 9) {
			preloadNextResource();
		} else {

			for(var index = 0; index < localCopyOfResourceIDsToPreload.length; index++) {
				preloadResource(localCopyOfResourceIDsToPreload[index], false);
			}

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


	// this is a hack for IE6, as it has issues loading many images and also with closures it seems...
	var preloadNextResource = function () {
		if(_resourceIDsToPreload.length <= 0) {
			return;
		}
		_isPreloadNextResourceQueued = false;
		preloadResource(_resourceIDsToPreload[0], true);
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

		else if(_browserInfo.ie < 9) {
			audioMethodAPI = HypeAudio_QuickTime;
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


		if(_hasPhysics == true) {
			if(touchState.options) {
				updatePhysicsBody(touchState.options.elementToControl);
				requestHeartbeat();
			}
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


						if(_hasPhysics == true) {
							updatePhysicsBody(touchStateOptions.elementToControl);
							requestHeartbeat();
						}


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

				if (_browserInfo.ie < 9) {
					// we need to prevent drag and drop of images in IE since IE does not support preventDefault
					var dragStartHandler = function (dragStartEvent) { 
						// we don't want to interfere with jqueryUI droppable (they return an event and IE does not)
						if (dragStartEvent == null) { 
							return false;
						} 
						return true;
					};
					touchState.elementForEvents['ondragstart'] = dragStartHandler;
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

					if(_hasPhysics == true) {
						recordPhysicsVelocityFollowingValue(element, 'a', left, (currentGestureTime / 1000));
						recordPhysicsVelocityFollowingValue(element, 'b', top, (currentGestureTime / 1000));
						setElementAttribute(element, "cD", true);
						var physicsEnvironment = physicsEnvironmentForElement(element);
						wakeAllBodies(physicsEnvironment);
					}

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


		if(_hasPhysics == true) {
			if(initialValues['bM'] != null) {
				// reset angle to 0 (may be changed later, that's okay) otherwise there could be leftover angles
				applyValue(domElement, 'f', 0);
			}
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
		

		// add CSSPIE behavior (if applied to a video, quicktime won't play it)
		if(_browserInfo.ie != null && initialValues['bE'] == null) {
			domElement.style["behavior"] = "url('" + resourcePathForPIE_HTC() + "')";
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

					if(_hasPhysics == true) {
						createPhysicsEnvironmentWithIdentifier(_idMapping[persistentSymbolOid]);
					}

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


		if(_hasPhysics == true) {
			removeAllNonPersistentPhysicsEnvironments();
		}

		_currentSceneIndex = indexOfSceneWithIdentifier(sceneIdentifier);

		var scene = getElementByHypeOid(sceneIdentifier);
		var sceneIndex = scene.getAttribute("HYPE_scene_index");


		if(_hasPhysics == true) {
			createPhysicsEnvironmentWithIdentifier(null);
		}


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



		drainFrameUpdateQueue();



		if(_hasPhysics == true) {
			for(var i = 0; i < domElementIds.length; i++) {
				var domElementId = domElementIds[i];
				if (isSymbolElement(document.getElementById(domElementId)) == true) {
					createPhysicsEnvironmentWithIdentifier(domElementId);
				}
			}
			
			_buildingPhysicsBodies = true;
		}


		for(var i = 0; i < domElementIds.length; i++) {
			var domElementId = domElementIds[i];
			var domElement = document.getElementById(domElementId);
			var initialValues = _scenes[sceneIndex]["v"][_idReverseMapping[domElementId]];
			if(initialValues == null) {
				continue;
			}

			applyInitialValuesToElement(initialValues, domElement, domElementId, skipActionHandlers);
		}




		if(_hasPhysics == true) {
			_buildingPhysicsBodies = false;

			createAllNeededPhysicsTimelineRuns();

			var updateAllPhysicsBodies = (function () {
				var isUpdatingScene = (scene.className == "HYPE_scene"); // if we're updating a scene and the domElementId is in a persistent symbol, don't actually update it.
				var domElementIds = domElementIdsInScene(scene);
				for(var i = 0; i < domElementIds.length; i++) {
					var domElementId = domElementIds[i];
					var domElement = document.getElementById(domElementId);
					var isElementInPersistentSymbol = isPhysicsEnvironmentForPersistentSymbol(physicsEnvironmentForElement(domElement))
					
					if((isUpdatingScene == true && isElementInPersistentSymbol == false) || (isUpdatingScene == false)) {
						updatePhysicsBody(domElement);
					}
				}
			});

			// update now as we should be ready (must be done for groups to have appropriate offsets)
			updateAllPhysicsBodies(true);
			
			// cause a deferred relayout so text boxes can get appropriate clientWidth/clientHeight info
			window.setTimeout(updateAllPhysicsBodies, 0);
		}


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
		

		// special case to deal with MSIE rotation being incorrect when scene is not display:block
		if(_browserInfo.ie < 9) {
			var elements = getElementsByClassName("HYPE_element", currentSceneContainer);		
			for(var i = 0; i < elements.length; i++) {
				var rotation = getElementAttribute(elements[i], 'f');
				if(rotation != null) {
					applyValue(elements[i], 'f', rotation);
				}
			}
		}


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


			if(_hasPhysics == true) {
				for(var i = 0; i < _physicsEnvironments.length; i++) {
					var physicsEnvironment = _physicsEnvironments[i];
					var timelineRun = timelineRunForIdentifier(physicsEnvironment.timelineIdentifier);
					if(timelineRun.isPlaying != true) {
						startTimelineRun(physicsEnvironment.timelineIdentifier, null, false);
					}
				}
			}

			
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
			//	format of a hex triplet - the kind we use for HTML colours. The function
			//	will return an array with three values.
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
			//	the corresponding hex triplet.
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

		if(_browserInfo.ie < 9 && colorString.indexOf("rgba") == 0) {
			colorString = transformValueColor(untransformColor(colorString), true);
		}

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

			var embeds = currentSceneContainer.getElementsByTagName("embed");
			for(var i = 0; i < embeds.length; i++) {
				if(embeds[i].id.indexOf("embedobj_") == 0) {
					embeds[i].parentElement.innerHTML = "";
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
		var timerBasedFunction = 	(function(callback, element) {
										window.setTimeout(callback, ((1 * 1000.0) / _fps));
									});

		return  window['requestAnimationFrame']			|| 
				window['webkitRequestAnimationFrame']	|| 
				window['mozRequestAnimationFrame']		|| 
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

		if(_hasPhysics == true) {
			if(timelineRun.isPhysicsTimeline == true) {
				return 31536000; // a year (distant future)
			}
		}

        var duration = timelineRun.timelineInfo["d"];
		return quantizeTime(duration, timelineRun);
	};
			
	var quantizeTimeWithFramesPerSecond = function (time, framesPerSecond) {
	    var seconds = Math.floor(time);
		var frames = Math.round(((time - seconds) * framesPerSecond)) / framesPerSecond;
	    return (seconds + frames);
	};
							 
	var quantizeTime = function (time, timelineRun) {

		if(_hasPhysics == true) {
			if(timelineRun.isPhysicsTimeline == true) {
				return quantizeTimeWithFramesPerSecond(time, 60);
			}
		}

		var framesPerSecond = timelineRun.timelineInfo["f"];
		return quantizeTimeWithFramesPerSecond(time, framesPerSecond);
	};
	
	var timelineRunCompleteCallback = function (timelineRun) {

		if(_hasPhysics == true) {
			if(timelineRun.isPhysicsTimeline == true) {
				return;
			}
		}

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


		if(_hasPhysics == true) {
			for(var i = 0; i < _physicsEnvironments.length; i++) {
				var physicsEnvironment = _physicsEnvironments[i];
				var physicsTimelineRun = timelineRunForIdentifier(physicsEnvironment.timelineIdentifier);
			
				if(physicsTimelineRun != null && physicsTimelineRun.isPlaying == true) {
					if(physicsTimelineRun.sleepTime != null) {
						physicsTimelineRun.animationStartTime += currentClockTimeInSeconds - physicsTimelineRun.sleepTime;
					}
				
					var currentTime = currentClockTimeInSeconds - physicsTimelineRun.animationStartTime;
					updatePhysicsVelocityFollowingInfo(physicsEnvironment, currentTime);
					heartbeatPhysics(physicsEnvironment, currentTime);
					var physicsEnvironmentIsAsleep = isPhysicsEngineAsleep(physicsEnvironment);
					allPhysicsEnvironmentsAreSleeping = (allPhysicsEnvironmentsAreSleeping && physicsEnvironmentIsAsleep);
					
					if(physicsEnvironmentIsAsleep == true) {
						physicsTimelineRun.sleepTime = currentClockTimeInSeconds;
					} else {
						physicsTimelineRun.sleepTime = null;
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


		if(_hasPhysics == true) {
			if(timelineRun.isPhysicsTimeline == true && timelineRun.isPlaying == true) {
				heartbeatPhysics(timelineRun.physicsEnvironment, currentTime);
				return;
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
						//		F							F					|	2				5
						//		T							T					|	5				5
						//		T							F					|	2				2
						//		F							T					|	5				2
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


		if(_hasPhysics == true) {
			recordPhysicsVelocityFollowingValue(element, identifier, currentValue, currentTime);
		}

		
	};
	
	var isColorString = function (value) {
		return ((typeof value) == "string") && ((value.length == 7 && value.charAt(0) == "#") || (value.indexOf("rgb") == 0 && value.indexOf(")") == value.length - 1));
	};
	
	var myIndexOf = function (haystack, needle) {

		if(haystack.indexOf) {

			return haystack.indexOf(needle);

		} else {
			for(var i = 0; i < haystack.length; i++) {
				if(haystack[i] == needle) {
					return i;
				}
			}
		}
		return -1;

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


		if(_hasPhysics == true) {
			setElementAttribute(element, "HYP_n", calculatedWidth);
			setElementAttribute(element, "HYP_o", calculatedHeight);
		}


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
		

		if(_browserInfo.ie < 8) {
			// fix inner image sizing
			var imgId = "img_" + element.id;
			var imgElement = document.getElementById(imgId);
			if(imgElement != null) {
				var updateImageFrameFunction = (function () {
					imgElement.style.width = transformValuePixel(element.clientWidth);
					imgElement.style.height = transformValuePixel(element.clientHeight);
				});
				
				if(element.clientWidth == 0 && element.clientHeight == 0) {
					// need to defer since IE hasn't fully setup the element yet
					window.setTimeout(updateImageFrameFunction, 0);
				} else {
					updateImageFrameFunction();
				}
			}
		}
		
		if(_browserInfo.ie < 9) {
			// fix rotation
			var rotateAngleValue = getElementAttribute(element, "f");
			if(rotateAngleValue != null) {
				updateMSFilters(element);
			}
		
			// for IE QT plugin	
			var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
			if(embedobj != null) {
				embedobj.setAttribute("width", calculatedWidth);
				embedobj.setAttribute("height", calculatedHeight);
			}
		}


		setElementAttribute(element, "HYP_a", calculatedTop);
		setElementAttribute(element, "HYP_b", calculatedLeft);
		
		if(shouldUseTranslates == false) {

			calculatedTop += getElementAttribute(element, "HYP_i", 0);
			calculatedLeft += getElementAttribute(element, "HYP_h", 0);

			
			element.style.top = transformValuePixel(calculatedTop);
			element.style.left = transformValuePixel(calculatedLeft);
		}
		
		if(shouldUseTranslates == true || isScaleZoomContents == true) {

			// ie 6-8
			if(_browserInfo.ie < 9) {
				updateMSFilters(element);
			} else {

				updateTransforms(element);

			}

		}


		if(_hasPhysics == true) {
			updatePhysicsBody(element);
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

		 else if(_browserInfo.ie < 10) {
			element.style["-pie-background"] = generateGradientString("", false);
		}

		else if(_browserInfo.opera < 15) {
			element.style.backgroundImage = generateGradientString("-o-", false);
		} else {
			element.style.backgroundImage = generateGradientString("", true);
		}
	};

	var updateBrowserSpecificTransforms = function (element, value) {

		// ie 6-8
		if(_browserInfo.ie < 9) {
			updateMSFilters(element);
		} else {

			updateTransforms(element);

		}


		if(_hasPhysics == true) {
			updatePhysicsBody(element);
		}

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
		var useGraphicsAcceleration =	((_useGraphicsAcceleration == true) && // base setting from hype app
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

	
	var updateMSFilters = function (element) {
		var opacity8 = getElementAttribute(element, "HYP_g", "");
		var opacity5 = getElementAttribute(element, "HYP_f", "");
		var rotateAngleZValue = getElementAttribute(element, "f", 0);
		var scaleXMultiplierValue = getElementAttribute(element, "HYP_t", 1);
		var scaleYMultiplierValue = getElementAttribute(element, "HYP_u", 1);
		var scaleXValue = (getElementAttribute(element, "cQ", 1) * scaleXMultiplierValue);
		var scaleYValue = (getElementAttribute(element, "cR", 1) * scaleYMultiplierValue);
		var motionPathRotation = getElementAttribute(element, "bO", 0);
		var background = getElementAttribute(element, "HYP_c");
		var imageSource = getElementAttribute(element, "HYP_e");

		var filterText = "";
		var needsTransformMatrix = (rotateAngleZValue != 0 || motionPathRotation != 0 || scaleXValue != 1 || scaleYValue != 1);

		var height = element.clientHeight;
		if (element.style.borderTopWidth != "") {
			height += parseInt(element.style.borderTopWidth);
		}
		if (element.style.borderBottomWidth != "") {
			height += parseInt(element.style.borderBottomWidth);
		}

		var width = element.clientWidth;
		if (element.style.borderLeftWidth != "") {
			width += parseInt(element.style.borderLeftWidth);
		}
		if (element.style.borderRightWidth != "") {
			width += parseInt(element.style.borderRightWidth);
		}

		if(opacity8 != "") {
			filterText += " " + opacity8;
		}
		if(opacity5 != "") {
			filterText += " " + opacity5;
		}

		var transformMatrix = null;
		
		if (needsTransformMatrix == true) {
			var transformOriginXOffsetPercentage = getElementAttribute(element, "tX", .5);
			var transformOriginYOffsetPercentage = getElementAttribute(element, "tY", .5);
			var transformOriginXOffsetPixels = (transformOriginXOffsetPercentage * width);
			var transformOriginYOffsetPixels = (transformOriginYOffsetPercentage * height);

			transformMatrix = newIdentityMatrix();
			transformMatrix = translateMatrix(transformMatrix, transformOriginXOffsetPixels, transformOriginYOffsetPixels);
			transformMatrix = rotateMatrix(transformMatrix, degreesToRadians(rotateAngleZValue + motionPathRotation));
			transformMatrix = scaleMatrix(transformMatrix, scaleXValue, scaleYValue);
			transformMatrix = translateMatrix(transformMatrix, -transformOriginXOffsetPixels, -transformOriginYOffsetPixels);
			
			var transformString = _hype.kSizeOptimizationMSFilterPrefix + ".Matrix(M11=" + transformMatrix[0] + ",M12=" + transformMatrix[2] + ",M21=" + transformMatrix[1] + ",M22=" + transformMatrix[3] + ",SizingMethod='auto expand')";

			filterText += " " + transformString;
		}
		if(background != null) {
			filterText += " " + background;
		}
		if(imageSource != null) {
			filterText += " " + imageSource;
		}

		element.style["filter"] = filterText;

		if (needsTransformMatrix == true) {
			// Shift elements to account for any transform origin offset
			var transformOffsetLeft = null;
			var transformOffsetTop = null;
			
			var corners = [{x:0, y:0}, {x:width, y:0}, {x:0, y:height}, {x:width, y:height}];
			for(var i = 0; i < corners.length; i++) {
				var transformedPoint = transformPointFromMatrix(transformMatrix, corners[i].x, corners[i].y);
				
				if((transformOffsetLeft == null) || (transformedPoint.x < transformOffsetLeft)) {
					transformOffsetLeft = transformedPoint.x;
				}
				if((transformOffsetTop == null) || (transformedPoint.y < transformOffsetTop)) {
					transformOffsetTop = transformedPoint.y
				}
			}

			// Round to better match WebKit's rendering
			transformOffsetLeft = parseInt(transformOffsetLeft.toFixed(0));
			transformOffsetTop = parseInt(transformOffsetTop.toFixed(0));

			setElementAttribute(element, "HYP_h", transformOffsetLeft);
			setElementAttribute(element, "HYP_i", transformOffsetTop);
			element.style.left = getElementAttribute(element, "HYP_b", 0) + transformOffsetLeft;
			element.style.top = getElementAttribute(element, "HYP_a", 0) + transformOffsetTop;
		}
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

				if(element.style.removeAttribute) { // IE 6-8 does not have css.removeProperty, but removeAttribute will work
					element.style.removeAttribute(boxShadowProperties[i]);
				} else {

					element.style.removeProperty(boxShadowProperties[i]);

				}

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


	var updateMSBorderRadius = function (element) {
		var topLeft = getElementAttribute(element, "aK", "0");
		var topRight = getElementAttribute(element, "aL", "0");
		var bottomLeft = getElementAttribute(element, "aI", "0");
		var bottomRight = getElementAttribute(element, "aJ", "0");
		
		topLeft = (typeof topLeft != "number") ? topLeft : transformValuePixel(topLeft);
		topRight = (typeof topRight != "number") ? topRight : transformValuePixel(topRight);
		bottomLeft = (typeof bottomLeft != "number") ? bottomLeft : transformValuePixel(bottomLeft);
		bottomRight = (typeof bottomRight != "number") ? bottomRight : transformValuePixel(bottomRight);
		
		element.style["border-radius"] = "" + topLeft + " " + topRight + " " + bottomRight + " " + bottomLeft;
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

						if (_browserInfo.ie < 9) {
							// button == 4 is the middle mouse button, mouse events prior to IE 9. It's set when cmd clicking as well.
							openInNewWindow = (openInNewWindow || e.button == 4);
						} else {

							// button == 1 is set by FF when ctrl clicking on Windows; meta == true is set by FF when command clicking on OS X.
							openInNewWindow = (openInNewWindow || e.button == 1 || e.metaKey == true);

						}

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

				if(_browserInfo.ie < 9 || _browserInfo.quirksmode) {
					if(parseInt(value) == 1.0) {
						// ie 8
						setElementAttribute(element, "HYP_g", "");
						// ie 5-7
						setElementAttribute(element, "HYP_f", "");
					} else {
						var alphaString = "Alpha(Opacity=" + Math.round(value * 100) + ")";
						// ie 8
						setElementAttribute(element, "HYP_g", _hype.kSizeOptimizationMSFilterPrefix + "." + alphaString);
						// ie 5-7
						setElementAttribute(element, "HYP_f", alphaString.toLowerCase());
						
						// set a transparent background image so clicks still work when there is opacity in IE and no backgroundImage/color
						if(element.style.backgroundColor == "" && element.style.backgroundImage == "") {
							var imgId = "img_" + element.id;
							var imgElement = document.getElementById(imgId);
							if(imgElement == null) {
								element.style.backgroundImage = "url('" + escapeURLForCSS(resourcePathForBlankGif()) + "')";
							}
						}
					}
					updateMSFilters(element);
				}

			
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
				

				// PIE IE
				if(_browserInfo.ie < 9) {
					updateMSBorderRadius(element);
				}

			},
			
			'aL' : function (element, value) {
				value = (typeof value != "number") ? value : transformValuePixel(value);
				element.style['borderTopRightRadius'] = value;

				// firefox 3.6
				element.style["MozBorderRadiusTopright"] = value;


				// PIE IE
				if(_browserInfo.ie < 9) {
					updateMSBorderRadius(element);
				}

			},
			
			'aI' : function (element, value) {
				value = (typeof value != "number") ? value : transformValuePixel(value);
				element.style['borderBottomLeftRadius'] = value;
				
				// firefox 3.6
				element.style["MozBorderRadiusBottomleft"] = value;


				// PIE IE
				if(_browserInfo.ie < 9) {
					updateMSBorderRadius(element);
				}

			},
			
			'aJ' : function (element, value) {
				value = (typeof value != "number") ? value : transformValuePixel(value);
				element.style['borderBottomRightRadius'] = value;

				// firefox 3.6
				element.style["MozBorderRadiusBottomright"] = value;
				

				// PIE IE
				if(_browserInfo.ie < 9) {
					updateMSBorderRadius(element);
				}

			},
			
			'bE' : function (element, value) {
				element.innerHTML = "";


				var objectEmbedSource;

				
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


					if(objectEmbedSource == null && mimeType != "video/ogg" && mimeType != "video/webm") {
						objectEmbedSource = resourcePath;
					}

				}

				
				if(objectEmbedSource != null && _browserInfo.ie < 9) {
					// replace the video tag with the div tag, and then put an embed to the quicktime plugin inside
					var div = element.ownerDocument.createElement("div");
					div.className = "HYPE_element";
					for(var i = 0; i < element.attributes.length; i++) {
						var attr = element.attributes.item(i);
						div.setAttribute(attr.name, attr.value);
					}
					if(element.hasChildNodes) {
						for(var i = 0; i < element.childNodes.length; i++) {
							div.appendChild(element.childNodes.item(i));
						}
					}
					div.style.cssText = element.style.cssText;
					
					element.parentNode.replaceChild(div, element);
										
					var controls = "false";
					var controlsAttributeOnDiv = div.getAttribute("controls");
					if(controlsAttributeOnDiv != null && (controlsAttributeOnDiv == "controls" || controlsAttributeOnDiv == "1" || controlsAttributeOnDiv == "True" || controlsAttributeOnDiv == "true")) {
						controls = "true";
					}

					var loop = "false";
					var loopAttributeOnDiv = div.getAttribute("loop");
					if(loopAttributeOnDiv != null && (loopAttributeOnDiv == "loop" || loopAttributeOnDiv == "1" || loopAttributeOnDiv == "True" || loopAttributeOnDiv == "true")) {
						loop = "true";
					}

					var mute = "100";
					var muteAttributeOnDiv = div.getAttribute("mute");
					if(muteAttributeOnDiv != null && (muteAttributeOnDiv == "mute" || muteAttributeOnDiv == "1" || muteAttributeOnDiv == "True" || muteAttributeOnDiv == "true")) {
						mute = "0";
					}
					
					var embedSource = "<embed src='" + objectEmbedSource + "'classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'codebase='http://apple.com/qtactivex/qtplugin.cab'width='" + div.style["width"] + "'height='" + div.style["height"] + "'enablejavascript='true'postdomevents='true'scale='tofit'name='embedobj_" + div.id + "'id='embedobj_" + div.id + "'controller='" + controls + "'loop='" + loop + "'volume='" + mute + "'autoplay='false'class='video'></embed>";
					div.innerHTML = embedSource;
					
					div.play = (function () {
						var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
						_Apply['Play'](embedobj, true);
					});
					div.pause = (function () {
						var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
						_Apply['Play'](embedobj, false);
					});
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


				var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
				
				if(embedobj != null && _browserInfo.ie < 9) {
					try {
						var booleanValue = parseInt(value) != 0;
						embedobj['SetControllerVisible'](booleanValue);
					} catch(err) {
                        // retry once the object is loaded
						window.setTimeout(function() { _Apply['aO'](element, value) }, 100);
                    }
				}

			},

			'dA' : function (element, value) {
				element.setAttribute("playsinline", value);
			},

			'aR' : function (element, value) {
				element.muted = (value != 0);
				element.volume = (value != 0) ? "0.0" : "1.0";


				var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
				if(embedobj != null && _browserInfo.ie < 9) {
					try {
						var booleanValue = parseInt(value) != 0;
						embedobj['SetMute'](booleanValue);

					} catch(err) {
                        // retry once the object is loaded
						window.setTimeout(function() { _Apply['aR'](element, value) }, 100);
                    }
				}

			},

			'aQ' : function (element, value) {
				element.setAttribute("loop", value);
				element.loop = (value != 0);

				var embedobj = element.ownerDocument.embeds["embedobj_" + element.id];
				if(embedobj != null && _browserInfo.ie < 9) {
					try {
						var booleanValue = parseInt(value) != 0;
						embedobj.SetIsLooping(booleanValue);
					} catch(err) {
						// retry once the object is loaded
						window.setTimeout(function() { _Apply['aQ'](element, value) }, 100);
                    }
				}

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


				//!! do not do this for webkit based browsers because they work the old way and this will cause a crash! (need to file)
				if((_browserInfo.ff < 3.6 || _browserInfo.ie < 9) && (element.style.backgroundRepeat == null || element.style.backgroundRepeat == "" || element.style.backgroundRepeat == "no-repeat")) {
					// need to create an img tag because IE8- and FF 3.5- can't scale background images
					var imgId = "img_" + element.id;
					var imgElement = document.getElementById(imgId);
					if(imgElement != null) {
						imgElement.src = resourcePath;
					} else {					
						imgElement = document.createElement("img");
						imgElement.src = resourcePath;
						imgElement.id = imgId;
						imgElement.style.position = "absolute";
						imgElement.style.width = "100%";
						imgElement.style.height = "100%";
						imgElement.style.top = "0";
						imgElement.style.left = "0";
						imgElement.style.zIndex = "-10000";
						element.appendChild(imgElement);
					}
					
					setElementAttribute(imgElement, "HYP_d", imgElement.src);


					// PNG fixes for IE 6-8
					if(_browserInfo.ie < 9 && resourcePath.substr(resourcePath.length-4).toLowerCase() == '.png') {
						// use AlphaImageLoader to load on IE 5-6 and make good looking PNGs on 7-8 (the src must be a blank gif)
						imgElement.src = resourcePathForBlankGif();
					
						// fix for unicode characters (#6709) from http://www.jbnetworks.nl/chipcall/vp/js-lib/image/iepngfix.htc
						//AlphaImageLoader stupidly decodes URLs. Double encode to ensure they stay encoded.
						var resourcePathDoubleEncoded = escapeURLForCSS(resourcePath).replace(/\%/gi, "%25");
						
						var msAlphaImageLoader = _hype.kSizeOptimizationMSFilterPrefix + ".AlphaImageLoader(sizingMethod='scale',src='" + resourcePathDoubleEncoded + "')";
						setElementAttribute(imgElement, "HYP_e", msAlphaImageLoader);
						
						// for pngs on IE 7-8, add a fix for a background color so the partially transparent regions don't show up as black
						var msBackgroundGradient = _hype.kSizeOptimizationMSFilterPrefix + ".gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)";
						setElementAttribute(imgElement, "HYP_c", msBackgroundGradient);
						updateMSFilters(imgElement);
					}

					// need to set width/height of image
					updateFrame(element);
				} else {

					
					element.style.backgroundImage = "url('" + escapeURLForCSS(resourcePath) + "')";
				  

				}

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

				// remove that extra img tag we added in backgroundImage
				if(value != null && value != "no-repeat") {
					var img = document.getElementById("img_" + element.id);
					if(img != null) {
						element.style.backgroundImage = "url('" + escapeURLForCSS(getElementAttribute(img, "HYP_d")) + "')";
						img.parentNode.removeChild(img);
					}
				}

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

				if (_browserInfo.ie < 9) {
					actionHandler();
					return;
				}

				addWaypointForActionHandler(element, actionHandler, 'enter');
			},

			'cX' : function (element, value) {

				if (_browserInfo.ie < 9) {
					return;
				}

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

				var img = document.getElementById("img_" + element.id);
				var imgClone = (img != null) ? img.cloneNode(true) : null;			


				element.innerHTML = value;

				// execute any embedded <script>...</script> javascripts (those with src= will not work, see #868)
				var scripts = element.getElementsByTagName("script");
				for(var i = 0; i < scripts.length; i++) {
					if(scripts[i].src == "") {
						// better form of eval(scripts[i].text) for IE and Firefox (taken from jquery)
						(window.execScript || function(data) { window["eval"].call(window, data); })(scripts[i].text);
					}
				}


				if(imgClone != null) {
					element.appendChild(imgClone);
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

			  				else {
					            var eventObj = document.createEventObject();
					            eventObj.clientX = e.clientX;
								eventObj.clientY = e.clientY;
								var eventType = "on" + e.type;
			    				underneathElement.fireEvent(eventType, eventObj);
			    				event.cancelBubble = true;
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
//	hypeAudio.playWhenFinishedLoading = false;
//	hypeAudio.isLoading = false;
//	hypeAudio.isLoaded = false;
//	hypeAudio.audioBuffer = null;
//	hypeAudio.loop = false;

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
		} catch (err) {	}
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
		} catch (e) {	}
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
		} catch (e) {	}
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


function HypeAudio_QuickTime(oid, sourceURLsByMimeType) {
	var _hypeAudio = this;
	HypeAudio_allAudios[oid] = _hypeAudio;

	_hypeAudio.setupAudioElement = function (errorCallback, shouldAutoPlay) {
		var audioElement = document.createElement("embed");
		_hypeAudio.audioElement = audioElement;
		var sortedMimeTypes = _hypeAudio.sortedMimeTypes();
		for(var i = 0; i < sortedMimeTypes.length; i++) {
			var mimeType = sortedMimeTypes[i];
			if(mimeType == "audio/ogg") {
				continue;
			}
			
			var sourceURL = _hypeAudio.sourceURLsByMimeType[mimeType];
			audioElement.setAttribute("src", sourceURL);
			audioElement.setAttribute("controller", "True");
			audioElement.setAttribute("autoplay", (shouldAutoPlay ? "True" : "False"));
			audioElement.setAttribute("autostart", (shouldAutoPlay ? "True" : "False"));
			audioElement.setAttribute("width", "0");
			audioElement.setAttribute("height", "0");
			audioElement.style.width = "0px";
			audioElement.style.height = "0px";
			break;
		}
		document.body.appendChild(audioElement);
		
		return audioElement;
	};

	_hypeAudio.load = function (successCallback, errorCallback) {
		if(_hypeAudio.audioElement == null) {
			_hypeAudio.setupAudioElement(errorCallback);
		}
		if(successCallback != null) {
			successCallback(_hypeAudio);
		}
	};
	
	_hypeAudio.play = function () {
		if(_hypeAudio.audioElement == null) {
			_hypeAudio.setupAudioElement(null, true);
		}
		try {
			_hypeAudio.audioElement['SetIsLooping'](_hypeAudio.loop);
		} catch (err) {	}
		try {
			_hypeAudio.audioElement['Play']();
		} catch (err) {
		    window.setTimeout(function() { _hypeAudio.play(); }, 100);
		}
	};

	_hypeAudio.pause = function () {
		if(_hypeAudio.audioElement == null) {
			return;
		}

		try {
			_hypeAudio.audioElement['Stop']();
		} catch (err) {
		    window.setTimeout(function() { _hypeAudio.pause(); }, 100);
		}
	};
}





	
	// based on code from https://github.com/toji/gl-matrix

	var newIdentityMatrix = function () {
		return [1, 0, 0, 1, 0, 0];
	};

	var multiplyMatrix = function (a, b) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
			b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];

		return [(a0 * b0 + a2 * b1),
				(a1 * b0 + a3 * b1),
				(a0 * b2 + a2 * b3),
				(a1 * b2 + a3 * b3),
				(a0 * b4 + a2 * b5 + a4),
				(a1 * b4 + a3 * b5 + a5)];
	};

	var rotateMatrix = function (a, rad) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
			s = Math.sin(rad),
			c = Math.cos(rad);
		
		return [(a0 *  c + a2 * s),
				(a1 *  c + a3 * s),
				(a0 * -s + a2 * c),
				(a1 * -s + a3 * c),
				a4,
				a5];
	};

	var scaleMatrix = function (a, x, y) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];

		return [(a0 * x),
				(a1 * x),
				(a2 * y),
				(a3 * y),
				a4,
				a5];
	};

	var translateMatrix = function (a, x, y) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];

		return [a0,
				a1,
				a2,
				a3,
				(a0 * x + a2 * y + a4),
				(a1 * x + a3 * y + a5)];
	};

	var transformPointFromMatrix = function(a, x, y) {
		var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];

		return {x: (a0 * x + a2 * y + a4),
				y: (a1 * x + a3 * y + a5)};
	};

	var degreesToRadians = function (deg) {
		return Math.PI * (deg / 180.0);
	};

	var radiansToDegrees = function (rad) {
		return rad * (180.0 / Math.PI);
	};

	var invertMatrix = function(a) {
		var aa = a[0], ab = a[1], ac = a[2], ad = a[3], atx = a[4], aty = a[5];
		var det = aa * ad - ab * ac;
		if(!det) {
			return null;
		}
		det = 1.0 / det;
		
		return [(ad * det),
				(-ab * det),
				(-ac * det),
				(aa * det),
				((ac * aty - ad * atx) * det),
				((ab * atx - aa * aty) * det)];
	};



	
	// constants
	var kTimelinePhysicsIdentifier = "kTimelinePhysicsIdentifier";
	var kPhysicsBodyTypeDead = 0;
	var kPhysicsBodyTypeStatic = 1;
	var kPhysicsBodyTypeDynamic = 2;
	var kFollowingIdentifiers = ["a", "b", "f"];
	// var _Matter = null; // physics class
	var _physicsEnvironments = [];
	var _buildingPhysicsBodies = false;

	// code adapted from https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
	var setupPhysicsVisibilityChangeHandler = function () {
		// Set the name of the hidden property and the change event for visibility
		var hidden, visibilityChange; 
		if(typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} else if(typeof document.mozHidden !== "undefined") {
			hidden = "mozHidden";
			visibilityChange = "mozvisibilitychange";
		} else if(typeof document.msHidden !== "undefined") {
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} else if(typeof document.webkitHidden !== "undefined") {
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}

		function handleVisibilityChange() {
			if(document[hidden]) {
				pauseAllPhysicsTimelines();
			} else {
				continueAllPhysicsTimelines();
			}
		}
		
		if(!(typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined")) {
			document.addEventListener(visibilityChange, handleVisibilityChange, false);
		}
	};

	var createPhysicsEnvironmentWithIdentifier = function (identifier) {
		var preExistingEnvironment = physicsEnvironmentForIdentifier(identifier);
		if(preExistingEnvironment != null) {
			return preExistingEnvironment;
		}
	
		var physicsEnvironment = {};
		_physicsEnvironments.push(physicsEnvironment);
		
		if(identifier == null) {
			identifier = _mainContentContainerID;
		}
		
		physicsEnvironment.identifier = identifier;
		physicsEnvironment.physicsBodyElementMapping = {};
		physicsEnvironment.physicsCompositeElementMapping = {};
		physicsEnvironment.elementIDsPhysicallyManipulatedThisCycle = [];
		physicsEnvironment.lastPhysicsTimestamp = 0;
		physicsEnvironment.timingAccumulator = 0;
		
		var container = document.getElementById(identifier);
		var options = {
            enableSleeping: true
        };
		var physicsEngine = _Matter.Engine.create(container, options);
		physicsEnvironment.physicsEngine = physicsEngine;
		
		var gravityForce = getGravityForce(identifier);
		var gravityAngle = getGravityAngle(identifier);
		var gravityUsesDeviceTilt = getGravityUsesDeviceTilt(identifier);
		
		physicsEngine.world.gravity.x = gravityForce * _Matter.Common.cos((gravityAngle * Math.PI) / 180.0);
		physicsEngine.world.gravity.y = gravityForce * _Matter.Common.sin((gravityAngle * Math.PI) / 180.0);
		
		physicsEnvironment.deviceTiltAngle = 0;
		physicsEnvironment.deviceTiltMagnitude = 1.0;
		
		if(window.addEventListener != null && gravityUsesDeviceTilt == true) {
			window.addEventListener("deviceorientation", (function (event) { deviceOrientationDidChange(physicsEnvironment, event); }), true);
		} else if(window.addEventListener != null) {
			window.removeEventListener("deviceorientation", (function (event) { deviceOrientationDidChange(physicsEnvironment, event); }), true);
		}
		
		// medium sized values to cut things off but make sure there is animation beyond bounds still
		physicsEngine.world.bounds.min.x = -20000;
		physicsEngine.world.bounds.min.y = -20000;
		physicsEngine.world.bounds.max.x = 20000;
		physicsEngine.world.bounds.max.y = 20000;
		
		physicsEngine.render.controller.renderCallback = renderPhysics;
		
		return physicsEnvironment;
	};

	var getGravityForce = function (physicsEnvironmentId) {
		var isSceneEnvironment = (physicsEnvironmentId == _mainContentContainerID || physicsEnvironmentId == null);
	
		if(isSceneEnvironment == true) {
			return _scenes[_currentSceneIndex]["bY"];
		} else if(getGravityInheritFromParent(physicsEnvironmentId) == true) {
			var symbolElement = symbolInstanceElementContainingElement(document.getElementById(physicsEnvironmentId));
			if(symbolElement == null) {
				return getGravityForce(null);
			} else {
				return getGravityForce(symbolElement.id);
			}
		} else {
			var symbolId = _idReverseMapping[physicsEnvironmentId];
			return _scenes[_currentSceneIndex]["v"][symbolId]["bY"];
		}
	};

	var getGravityAngle = function (physicsEnvironmentId) {
		var isSceneEnvironment = (physicsEnvironmentId == _mainContentContainerID || physicsEnvironmentId == null);
	
		if(isSceneEnvironment == true) {
			return _scenes[_currentSceneIndex]["bZ"] - 90;
		} else if(getGravityInheritFromParent(physicsEnvironmentId) == true) {
			var symbolElement = symbolInstanceElementContainingElement(document.getElementById(physicsEnvironmentId));
			if(symbolElement == null) {
				return getGravityAngle(null);
			} else {
				return getGravityAngle(symbolElement.id);
			}
		} else {
			var symbolId = _idReverseMapping[physicsEnvironmentId];
			return _scenes[_currentSceneIndex]["v"][symbolId]["bZ"] - 90;
		}
	};

	var getGravityUsesDeviceTilt = function (physicsEnvironmentId) {
		var isSceneEnvironment = (physicsEnvironmentId == _mainContentContainerID || physicsEnvironmentId == null);
	
		if(isSceneEnvironment == true) {
			return _scenes[_currentSceneIndex]["cA"];
		} else if(getGravityInheritFromParent(physicsEnvironmentId) == true) {
			var symbolElement = symbolInstanceElementContainingElement(document.getElementById(physicsEnvironmentId));
			if(symbolElement == null) {
				return getGravityUsesDeviceTilt(null);
			} else {
				return getGravityUsesDeviceTilt(symbolElement.id);
			}
		} else {
			var symbolId = _idReverseMapping[physicsEnvironmentId];
			return _scenes[_currentSceneIndex]["v"][symbolId]["cA"];
		}
	};

	var getGravityInheritFromParent = function (physicsEnvironmentId) {
		var isSceneEnvironment = (physicsEnvironmentId == _mainContentContainerID || physicsEnvironmentId == null);
	
		if(isSceneEnvironment == true) {
			return false;
		} else {
			var symbolId = _idReverseMapping[physicsEnvironmentId];
			return _scenes[_currentSceneIndex]["v"][symbolId]["bX"];
		}
	};

	var isPhysicsEnvironmentForPersistentSymbol = function (physicsEnvironment) {
		if(physicsEnvironment == null || physicsEnvironment.identifier == null) {
			return false;
		}
		return (_persistentSymbols[_idReverseMapping[physicsEnvironment.identifier]] != null);
	};

	var removeAllNonPersistentPhysicsEnvironments = function () {
		var physicsEnvironmentsToRemove = [];
		
		for(var i = 0; i < _physicsEnvironments.length; i++) {
			var physicsEnvironment = _physicsEnvironments[i];
			if(isPhysicsEnvironmentForPersistentSymbol(physicsEnvironment) == false) {
				physicsEnvironmentsToRemove.push(physicsEnvironment);
			}
		}
		
		for(var i = 0; i < physicsEnvironmentsToRemove.length; i++) {
			removePhysicsEnvironmentWithIdentifier(physicsEnvironmentsToRemove[i].identifier);
		}
	};

	var removePhysicsEnvironmentWithIdentifier = function (identifier) {
		var phyisicsEnvironment = physicsEnvironmentForIdentifier(identifier);
		if(phyisicsEnvironment == null) {
			return;
		}
		
		var index = myIndexOf(_physicsEnvironments, phyisicsEnvironment);
		if(index != -1) {
			_physicsEnvironments.splice(index, 1);
		}
	};

	// runtime functions
	var physicsEnvironmentForIdentifier = function (identifier) {
		if(identifier == null) {
			identifier = _mainContentContainerID;
		}
	
		for(var i = 0; i < _physicsEnvironments.length; i++) {
			var physicsEnvironment = _physicsEnvironments[i];
			if(physicsEnvironment.identifier == identifier) {
				return physicsEnvironment;
			}
		}
		return null;
	};

	var physicsEnvironmentForElement = function (element) {
		var symbolElement = symbolInstanceElementContainingElement(element);
		var identifier = symbolElement != null ? symbolElement.id : null;
		return physicsEnvironmentForIdentifier(identifier);
	};

	// generically useful function, but I'm keeping in PhysicsTemplate so it doesn't bloat the runtime
	var parentForElement = function (element) {
		var parentId = getElementAttribute(element, "bF");
		if(parentId == null) {
			var sceneIndex = sceneIndexForElement(element);
			var initialValues = _scenes[sceneIndex]["v"][_idReverseMapping[element.id]];
			if(initialValues != null) {
				parentId = initialValues["bF"];
			}
		}
		return getElementByHypeOid(parentId);
	};

	// generically useful function, but I'm keeping in PhysicsTemplate so it doesn't bloat the runtime
	var symbolInstanceElementContainingElement = function (element) {
		// find the container symbol element
		var currentElement = element;
		while(currentElement != null) {
			var parent = parentForElement(currentElement);
			if(parent == null) {
				break;
			}
			currentElement = parent;
			
			if(isSymbolElement(currentElement) == true) {
				return currentElement;
			}
		}
		return null;
	};

	var deviceOrientationDidChange = function (physicsEnvironment, event) {
		// check to make sure we have actual accelerometer data (#8115: Different physics animation in Chrome)
		if(event['gamma'] == null || event['beta'] == null) {
			return;
		}

		// projection code modified from: http://wellcaffeinated.net/articles/2012/03/11/fun-with-javascript-and-device-orientation/
		var x = Math.sin(event['gamma'] * Math.PI / 180.0);
		var y = Math.sin(event['beta'] * Math.PI/ 180.0) * Math.cos(event['gamma'] * Math.PI / 180.0);
		physicsEnvironment.deviceTiltAngle = (-Math.atan(x / y) + (y < 0 ? Math.PI : 0)) * (180.0 / Math.PI);
		physicsEnvironment.deviceTiltMagnitude = Math.sqrt((x * x) + (y * y));
		
		var physicsEnvironmentId = physicsEnvironment.identifier;
		
		var gravityUsesDeviceTilt = getGravityUsesDeviceTilt(physicsEnvironmentId);
		if(gravityUsesDeviceTilt == true) {
			var gravityForce = getGravityForce(physicsEnvironmentId) * physicsEnvironment.deviceTiltMagnitude;
			var gravityAngle = getGravityAngle(physicsEnvironmentId) + physicsEnvironment.deviceTiltAngle;
		
			physicsEnvironment.physicsEngine.world.gravity.x = gravityForce * _Matter.Common.cos((gravityAngle * Math.PI) / 180.0);
			physicsEnvironment.physicsEngine.world.gravity.y = gravityForce * _Matter.Common.sin((gravityAngle * Math.PI) / 180.0);
		}
		
		wakeAllBodies(physicsEnvironment);
		requestHeartbeat();
	};

	var wakeAllBodies = function (physicsEnvironment) {
		var physicsBodies = _Matter.Composite.allBodies(physicsEnvironment.physicsEngine.world);
		
		for(var i = 0; i < physicsBodies.length; i++) {
			var physicsBody = physicsBodies[i];
			if(physicsBody.elementId == null) {
				continue;
			}
			
			_Matter.Sleeping.set(physicsBody, false);
		}
	};

	var createAllNeededPhysicsTimelineRuns = function () {
		for(var i = 0; i < _physicsEnvironments.length; i++) {
			var physicsEnvironment = _physicsEnvironments[i];
			if(physicsEnvironment.timelineIdentifier == null) {
				createPhysicsTimelineRun(physicsEnvironment);
			}
		}
	}

	var createPhysicsTimelineRun = function (physicsEnvironment) {
		var timelineIdentifier = "" + kTimelinePhysicsIdentifier + ": " + physicsEnvironment.identifier;
		physicsEnvironment.timelineIdentifier = timelineIdentifier;
		
		var persistentSymbolOid = null;
		if(isPhysicsEnvironmentForPersistentSymbol(physicsEnvironment) == true) {
			persistentSymbolOid = _idReverseMapping[physicsEnvironment.identifier];
		}
		
		var timelineRun = {
							isPhysicsTimeline: true,
							animations: [],
							timelineIdentifier: timelineIdentifier,
							physicsEnvironment: physicsEnvironment,
							persistentSymbolOid: persistentSymbolOid
						};
		
		if(persistentSymbolOid != null) {
			_persistentSymbols[persistentSymbolOid].timelineRuns.push(timelineRun);
		} else {
			_timelineRuns.push(timelineRun);
		}
	};

	var pauseAllPhysicsTimelines = function () {
		for(var i = 0; i < _physicsEnvironments.length; i++) {
			var physicsEnvironment = _physicsEnvironments[i];
			if(physicsEnvironment.timelineIdentifier != null) {
				pauseTimelineWithIdentifier(physicsEnvironment.timelineIdentifier);
			}
		}
	};

	var continueAllPhysicsTimelines = function () {
		for(var i = 0; i < _physicsEnvironments.length; i++) {
			var physicsEnvironment = _physicsEnvironments[i];
			if(physicsEnvironment.timelineIdentifier != null) {
				continueTimelineWithIdentifier(physicsEnvironment.timelineIdentifier);
			}
		}
	};

	var heartbeatPhysics = function (physicsEnvironment, currentTime) {
		var physicsBodies = _Matter.Composite.allBodies(physicsEnvironment.physicsEngine.world);
		var date = new Date();
		physicsEnvironment.isRenderingPhysics = true;
		beginFrameUpdateQueue();
		
		var physicsEngine = physicsEnvironment.physicsEngine;
		var physicsBodies = _Matter.Composite.allBodies(physicsEngine.world);

		var fixedDelta = Math.ceil(1000 / _fps); // should be integer value otherwise floating difference between browsers will lead inconsistencies
		var maxStepsPerCycle = 20; // only update this many times per frame
		
		var physicsTimeInMilliseconds = Math.floor(currentTime * 1000);
		var frameTime = physicsTimeInMilliseconds - physicsEnvironment.lastPhysicsTimestamp;
		physicsEnvironment.lastPhysicsTimestamp = physicsTimeInMilliseconds;
		physicsEnvironment.timingAccumulator += Math.floor(frameTime);
		
		var numberOfUpdatesThisCycle = 0;
	
		while(physicsEnvironment.timingAccumulator >= fixedDelta && numberOfUpdatesThisCycle < maxStepsPerCycle) {
			_Matter.Engine.update(physicsEnvironment.physicsEngine, fixedDelta);
			
			physicsEnvironment.timingAccumulator -= fixedDelta;
			numberOfUpdatesThisCycle += 1;
		}
		
		_Matter.Engine.render(physicsEnvironment.physicsEngine);
		
		drainFrameUpdateQueue();
		physicsEnvironment.isRenderingPhysics = false;
	};

	var renderPhysics = function (physicsEngine) {
		var physicsBodies = _Matter.Composite.allBodies(physicsEngine.world);
		
		for(var i = 0; i < physicsBodies.length; i++) {
			var physicsBody = physicsBodies[i];
			if(physicsBody.elementId == null || physicsBody.isStatic == true) {
				continue;
			}
			
			var element = document.getElementById(physicsBody.elementId);
			var elementOid = _idReverseMapping[element.id];
			var width = physicsBody.hypeWidth;
			var height = physicsBody.hypeHeight;

			var leftValue = (physicsBody.position.x - (parseInt(width, 10) / 2));
			var topValue = (physicsBody.position.y - (parseInt(height, 10) / 2));
			var rotationAngle = radiansToDegrees(physicsBody.angle);
			var elementCoordinates = convertPhysicsToElementCoordinates(element, leftValue, topValue, width, height, rotationAngle);
			
			// temporary fix; I should be able to convert to element coordinates with the transform origin in the future
			if(getElementAttribute(element, "HYP_p", false) == false) {
				applyValue(element, "tX", .5);
				applyValue(element, "tY", .5);
				setElementAttribute(element, "HYP_p", true);
			}
			
			applyValue(element, "a", elementCoordinates.x);
			applyValue(element, "b", elementCoordinates.y);
			applyValue(element, "f", elementCoordinates.angle.toFixed(6)); // used toFixed as if the number has exponent notation, the transform parser will not work
		}
	};

	
	var isPhysicsEngineAsleep = function (physicsEnvironment) {
		var physicsBodies = _Matter.Composite.allBodies(physicsEnvironment.physicsEngine.world);
		for(var i = 0; i < physicsBodies.length; i++) {
			var physicsBody = physicsBodies[i];
			if(physicsBody.isSleeping == false) {
				return false;
			}
		}
		return true;
	};

	var recordPhysicsVelocityFollowingValue = function (element, identifier, currentValue, currentTime) {
		if(myIndexOf(kFollowingIdentifiers, identifier) == -1) {
			return;
		}
		var bodyType = getElementAttribute(element, "bM", kPhysicsBodyTypeDead);
		if(bodyType == kPhysicsBodyTypeDead) {
			return;
		}
		
		var physicsEnvironment = physicsEnvironmentForElement(element);
		
		var followingAttributeName = followingAttributeNameForIdentifier(identifier);
		var followingData = getElementAttribute(element,followingAttributeName , []);
		while(followingData.length >= 4) {
			followingData.shift();
		}
		followingData.push({ value: currentValue, time: currentTime });
		setElementAttribute(element, followingAttributeName, followingData);
	
		if(myIndexOf(physicsEnvironment.elementIDsPhysicallyManipulatedThisCycle, element.id) == -1) {
			physicsEnvironment.elementIDsPhysicallyManipulatedThisCycle.push(element.id);
		}
	};

	var followingAttributeNameForIdentifier = function (identifier) {
			return "" + identifier + "cB";
	};

	var calculatedPreviousAttributeNameForIdentifier = function (identifier) {
			return "" + identifier + "cC";
	};

	var isDraggingElement = function (element) {
		var bodyType = getElementAttribute(element, "bM", kPhysicsBodyTypeDead);
		var elementOid = _idReverseMapping[element.id];
		var dragOwnership = _dragOwnershipOfPropertiesByElement[elementOid];

		if(bodyType == kPhysicsBodyTypeDynamic && dragOwnership != null && (dragOwnership["a"] != null || dragOwnership["b"] != null)) {
			return true;
		}
		
		return false;
	};

	var updatePhysicsVelocityFollowingInfo = function (phyicsEnvironment, currentTime) {
		var physicsBodies = _Matter.Composite.allBodies(phyicsEnvironment.physicsEngine.world);
		var needsToWakeBodies = false;
		
		for(var i = 0; i < physicsBodies.length; i++) {
			var physicsBody = physicsBodies[i];
			var element = document.getElementById(physicsBody.elementId);
			var bodyType = getElementAttribute(element, "bM", kPhysicsBodyTypeDead);
			
			// don't do work if we haven't been updated
			var elementIndex = myIndexOf(phyicsEnvironment.elementIDsPhysicallyManipulatedThisCycle, physicsBody.elementId);
			if(elementIndex == -1) {
				// clear the temporary static set we do below as we want physics to continue animating
				if(bodyType == kPhysicsBodyTypeDynamic && isDraggingElement(element) == false) {
					physicsBody.isStatic = false;
				}
				
				// clear our info
				for(var j = 0; j < kFollowingIdentifiers.length; j++) {
					setElementAttribute(element, calculatedPreviousAttributeNameForIdentifier(kFollowingIdentifiers[j]), null);
				}
				continue;
			}
			phyicsEnvironment.elementIDsPhysicallyManipulatedThisCycle.splice(elementIndex, 1);
			
			for(var j = 0; j < kFollowingIdentifiers.length; j++) {
				var identifier = kFollowingIdentifiers[j];
				var deltaPerTick = null;
				var followingData = getElementAttribute(element, followingAttributeNameForIdentifier(identifier), []);
				if(followingData.length >= 4) {
					var firstFollowingData = followingData[0];
					var lastFollowingData = followingData[followingData.length - 2];
					var slope = (lastFollowingData.value - firstFollowingData.value) / (lastFollowingData.time - firstFollowingData.time);
					deltaPerTick = (slope * (1/_fps));
					needsToWakeBodies = true;
				}
				setElementAttribute(element, calculatedPreviousAttributeNameForIdentifier(identifier), deltaPerTick);
			}
			
			if(getElementAttribute(element, "cD", false) == true) {
				updatePhysicsBody(element);
				setElementAttribute(element, "cD", false);
			}

			// temporarily set as static to avoid the physics system animating it when Hype's runtime is moving it
			if(bodyType == kPhysicsBodyTypeDynamic) {
				physicsBody.isStatic = true;
			}
		}
		
		if(needsToWakeBodies == true) {
			wakeAllBodies(phyicsEnvironment);
		}
	};

	// attribute appliers

	var physicsBodyPathForElement = function (element) {
		var elementOid = _idReverseMapping[element.id];
		var fullWidth = currentWidthForElementWithOid(elementOid, true);
		var fullHeight = currentHeightForElementWithOid(elementOid, true);
		
		var scaleX = 1;
		var scaleY = 1;
		
		var ancestors = ancestorsOfElement(element);
		ancestors.push(element);
		for(var i = 0; i < ancestors.length; i++) {
			var ancestor = ancestors[i];
			scaleX *= getElementAttribute(ancestor, "cQ", 1);
			scaleY *= getElementAttribute(ancestor, "cR", 1);
		}
		
		var normalizedBorderRadiusTopLeftHorizontal = 0;
		var normalizedBorderRadiusTopLeftVertical = 0;
		var normalizedBorderRadiusBottomLeftHorizontal = 0;
		var normalizedBorderRadiusBottomLeftVertical = 0;
		var normalizedBorderRadiusTopRightHorizontal = 0;
		var normalizedBorderRadiusTopRightVertical = 0;
		var normalizedBorderRadiusBottomRightHorizontal = 0;
		var normalizedBorderRadiusBottomRightVertical = 0;
		
		if(getElementAttribute(element, "aK") == "50%") { // indication we are a circle
			normalizedBorderRadiusTopLeftHorizontal = (fullWidth / 2);
			normalizedBorderRadiusBottomLeftHorizontal = (fullWidth / 2);
			normalizedBorderRadiusTopRightHorizontal = (fullWidth / 2);
			normalizedBorderRadiusBottomRightHorizontal = (fullWidth / 2);
			
			normalizedBorderRadiusTopLeftVertical = (fullHeight / 2);
			normalizedBorderRadiusBottomLeftVertical = (fullHeight / 2);
			normalizedBorderRadiusTopRightVertical = (fullHeight / 2);
			normalizedBorderRadiusBottomRightVertical = (fullHeight / 2);
		} else {
			var borderRadiusTopLeft = getElementAttribute(element, "aK", 0);
			var borderRadiusTopRight = getElementAttribute(element, "aL", 0);
			var borderRadiusBottomLeft = getElementAttribute(element, "aI", 0);
			var borderRadiusBottomRight = getElementAttribute(element, "aJ", 0);
			
			var maxHeight = Math.max(Math.max(borderRadiusTopLeft + borderRadiusBottomLeft, borderRadiusTopRight + borderRadiusBottomRight), fullHeight);
			var maxWidth = Math.max(Math.max(borderRadiusTopLeft + borderRadiusTopRight, borderRadiusBottomLeft + borderRadiusBottomRight), fullWidth);
			
			// convert to percent
			normalizedBorderRadiusTopLeftHorizontal = Math.min(fullHeight * (borderRadiusTopLeft / maxHeight), fullWidth * (borderRadiusTopLeft / maxWidth));
			normalizedBorderRadiusBottomLeftHorizontal = Math.min(fullHeight * (borderRadiusBottomLeft / maxHeight), fullWidth * (borderRadiusBottomLeft / maxWidth));
			normalizedBorderRadiusTopRightHorizontal = Math.min(fullHeight * (borderRadiusTopRight / maxHeight), fullWidth * (borderRadiusTopRight / maxWidth));
			normalizedBorderRadiusBottomRightHorizontal = Math.min(fullHeight * (borderRadiusBottomRight / maxHeight), fullWidth * (borderRadiusBottomRight / maxWidth));
			
			// use same values as we don't allow defining a horizontal vs. vertical radius in the UI
			normalizedBorderRadiusTopLeftVertical = normalizedBorderRadiusTopLeftHorizontal;
			normalizedBorderRadiusBottomLeftVertical = normalizedBorderRadiusBottomLeftHorizontal;
			normalizedBorderRadiusTopRightVertical = normalizedBorderRadiusTopRightHorizontal;
			normalizedBorderRadiusBottomRightVertical = normalizedBorderRadiusBottomRightHorizontal;
		}

		var pathList = [];

		// top side
		addToPathList(pathList, normalizedBorderRadiusTopLeftHorizontal * scaleX, 0);
		addToPathList(pathList, (fullWidth - normalizedBorderRadiusTopRightHorizontal) * scaleX, 0);

		if(normalizedBorderRadiusTopRightHorizontal > 0 || normalizedBorderRadiusTopRightVertical > 0) {
			var angleStepSize = angleStepSizeForRadius(normalizedBorderRadiusTopRightHorizontal, normalizedBorderRadiusTopRightVertical);
			for(var degree = (270 + angleStepSize); degree < 360; degree += angleStepSize) {
				var x = ((normalizedBorderRadiusTopRightHorizontal * _Matter.Common.cos(degree * Math.PI / 180.0)) + (fullWidth - normalizedBorderRadiusTopRightHorizontal));
				var y = ((normalizedBorderRadiusTopRightVertical * _Matter.Common.sin(degree * Math.PI / 180.0)) + normalizedBorderRadiusTopRightVertical);
				addToPathList(pathList, x * scaleX, y * scaleY);
			}
		}

		// right side
		addToPathList(pathList, fullWidth * scaleX, normalizedBorderRadiusTopRightVertical * scaleY);
		addToPathList(pathList, fullWidth * scaleX, (fullHeight - normalizedBorderRadiusBottomRightVertical) * scaleY);

		if(normalizedBorderRadiusBottomRightHorizontal > 0 || normalizedBorderRadiusBottomRightVertical > 0) {
			var angleStepSize = angleStepSizeForRadius(normalizedBorderRadiusBottomRightHorizontal, normalizedBorderRadiusBottomRightVertical);
			for(var degree = (0 + angleStepSize); degree < 90; degree += angleStepSize) {
				var x = ((normalizedBorderRadiusBottomRightHorizontal * _Matter.Common.cos(degree * Math.PI / 180.0)) + (fullWidth - normalizedBorderRadiusBottomRightHorizontal));
				var y = ((normalizedBorderRadiusBottomRightVertical * _Matter.Common.sin(degree * Math.PI / 180.0)) + (fullHeight - normalizedBorderRadiusBottomRightVertical));
				addToPathList(pathList, x * scaleX, y * scaleY);
			}
		}

		// bottom side
		addToPathList(pathList, (fullWidth - normalizedBorderRadiusBottomRightHorizontal) * scaleX, fullHeight * scaleY);
		addToPathList(pathList, normalizedBorderRadiusBottomLeftHorizontal * scaleX, fullHeight * scaleY);

		// bottom-right radius
		if(normalizedBorderRadiusBottomLeftHorizontal > 0 || normalizedBorderRadiusBottomLeftVertical > 0) {
			var angleStepSize = angleStepSizeForRadius(normalizedBorderRadiusBottomLeftHorizontal, normalizedBorderRadiusBottomLeftVertical);
			for(var degree = (90 + angleStepSize); degree < 180; degree += angleStepSize) {
				var x = ((normalizedBorderRadiusBottomLeftHorizontal * _Matter.Common.cos(degree * Math.PI / 180.0)) + normalizedBorderRadiusBottomLeftHorizontal);
				var y = ((normalizedBorderRadiusBottomLeftVertical * _Matter.Common.sin(degree * Math.PI / 180.0)) + (fullHeight - normalizedBorderRadiusBottomLeftVertical));
				addToPathList(pathList, x * scaleX, y * scaleY);
			}
		}

		// left side
		addToPathList(pathList, 0, (fullHeight - normalizedBorderRadiusBottomLeftVertical) * scaleY);
		addToPathList(pathList, 0, normalizedBorderRadiusTopLeftVertical * scaleY);
		
		// bottom-left radius
		if(normalizedBorderRadiusTopLeftHorizontal > 0 || normalizedBorderRadiusTopLeftVertical > 0) {
			var angleStepSize = angleStepSizeForRadius(normalizedBorderRadiusTopLeftHorizontal, normalizedBorderRadiusTopLeftVertical);
			for(var degree = (180 + angleStepSize); degree < 270; degree += angleStepSize) {
				var x = ((normalizedBorderRadiusTopLeftHorizontal * _Matter.Common.cos(degree * Math.PI / 180.0)) + normalizedBorderRadiusTopLeftHorizontal);
				var y = ((normalizedBorderRadiusTopLeftVertical * _Matter.Common.sin(degree * Math.PI / 180.0)) + normalizedBorderRadiusTopLeftVertical);
				addToPathList(pathList, x * scaleX, y * scaleY);
			}
		}
		
		return pathStringFromPathList(pathList);
	};

	var angleStepSizeForRadius = function (horizontalRadius, verticalRadius) {
		var bestRadius = Math.max(horizontalRadius, verticalRadius);
		var angleStepSize = Math.round(90 / bestRadius);
		return Math.max(Math.min(angleStepSize, 90), 6); // 6 because we don't want to get too small, 90 because at most this will be a quarter of a circle
	};

	var addToPathList = function (pathList, x, y) {
		var fixedX = x.toFixed(3);
		var fixedY = y.toFixed(3);
	
		if(pathList.length == 0 || pathList[pathList.length - 1].x != fixedX || pathList[pathList.length - 1].y != fixedY) {
			pathList.push({ x: fixedX, y: fixedY });
		}
	};

	var pathStringFromPathList = function (pathList) {
		var pathString = "";
		for(var i = 0; i < pathList.length; i++) {
			if(pathList.length > 1 && i == pathList.length - 1 && pathList[i].x == pathList[0].x && pathList[i].y == pathList[0].y) {
				// if the last item is the same as the first, do not add it to the path string
				continue;
			}
		
			pathString += "L " + pathList[i].x + " " + pathList[i].y + " ";
		}
		return pathString;
	};

	var offsetFromTopLevelParent = function (element) {
		var matrix = newIdentityMatrix();
	
		// find the container symbol element
		var currentElement = element;
		while(currentElement != null) {
			var parentId = getElementAttribute(currentElement, "bF");
			if(parentId == null) {
				break;
			}
			currentElement = getElementByHypeOid(parentId);
			if(isSymbolElement(currentElement) == true) {
				break;
			}
			
			var x = getElementAttribute(currentElement, "HYP_b", 0);
			var y = getElementAttribute(currentElement, "HYP_a", 0);
			matrix = translateMatrix(matrix, x, y);
		}
	
		return transformPointFromMatrix(matrix, 0, 0);
	}

	var ancestorsOfElement = function (element) {
		var ancestors = [];
		var currentElement = element;
		while(currentElement != null) {
			var parentId = getElementAttribute(currentElement, "bF");
			if(parentId == null) {
				break;
			}
			currentElement = getElementByHypeOid(parentId);
			if(isSymbolElement(currentElement) == true) {
				break;
			}
			ancestors.splice(0, 0, currentElement);
		}
		return ancestors;
	};

	var transformationMatrixForElement = function (element) {
		var elementOid = _idReverseMapping[element.id];
		var leftValue = getElementAttribute(element, "HYP_b", 0);
		var topValue = getElementAttribute(element, "HYP_a", 0);
		var rotateAngleZValue = getElementAttribute(element, "f", 0);
		var motionPathRotation = getElementAttribute(element, "bO", 0);
		var scaleXValue = getElementAttribute(element, "cQ", 1);
		var scaleYValue = getElementAttribute(element, "cR", 1);
		var transformOriginXOffset = getElementAttribute(element, "tX", .5);
		var transformOriginYOffset = getElementAttribute(element, "tY", .5);
		var width = currentWidthForElementWithOid(elementOid, true);
		var height = currentHeightForElementWithOid(elementOid, true);

		var transformOriginXOffsetPixels = (transformOriginXOffset * width);
		var transformOriginYOffsetPixels = (transformOriginYOffset * height);
		
		var matrix = newIdentityMatrix();
		matrix = translateMatrix(matrix, leftValue, topValue);
		matrix = translateMatrix(matrix, transformOriginXOffsetPixels, transformOriginYOffsetPixels);
		matrix = rotateMatrix(matrix, degreesToRadians(rotateAngleZValue + motionPathRotation));
		matrix = scaleMatrix(matrix, scaleXValue, scaleYValue);
		matrix = translateMatrix(matrix, -transformOriginXOffsetPixels, -transformOriginYOffsetPixels);
	
		return matrix;
	};

	var convertElementToPhysicsCoordinates = function (element) {
		var matrix = newIdentityMatrix();
		var ancestors = ancestorsOfElement(element);
		ancestors.push(element);
		
		for(var i = 0; i < ancestors.length; i++) {
			matrix = multiplyMatrix(matrix, transformationMatrixForElement(ancestors[i]));
		}

		var elementOid = _idReverseMapping[element.id];
		var width = currentWidthForElementWithOid(elementOid, true);
		var height = currentHeightForElementWithOid(elementOid, true);

		var p1 = transformPointFromMatrix(matrix, 0, 0);
		var p2 = transformPointFromMatrix(matrix, 0 + width, 0);
		var p3 = transformPointFromMatrix(matrix, 0 + width, 0 + height);
		var p4 = transformPointFromMatrix(matrix, 0, 0 + height);

		// find the angle of p1 to p2
		var angle = radiansToDegrees(Math.atan2((p2.y - p1.y), (p2.x - p1.x)));

		// use distance formula to find width/height as distances
		var width = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
		var height = Math.sqrt(Math.pow((p4.x - p1.x), 2) + Math.pow((p4.y - p1.y), 2));

		var midpoint = {};
		midpoint.x = Math.min(p1.x, p3.x) + Math.abs((p3.x - p1.x) / 2.0);
		midpoint.y = Math.min(p1.y, p3.y) + Math.abs((p3.y - p1.y) / 2.0);

		var origin = {};
		origin.x = midpoint.x - (width / 2.0);
		origin.y = midpoint.y - (height / 2.0);
		
		return { x: origin.x, y: origin.y, width: width, height: height, angle: angle };
	}

	var convertPhysicsToElementCoordinates = function (element, x, y, width, height, angle) {
		var scaleXValue = getElementAttribute(element, "cQ", 1);
		var scaleYValue = getElementAttribute(element, "cR", 1);

		var matrix = newIdentityMatrix();
		var ancestors = ancestorsOfElement(element);
		
		for(var i = 0; i < ancestors.length; i++) {
			matrix = multiplyMatrix(matrix, transformationMatrixForElement(ancestors[i]));
		}
		
		matrix = invertMatrix(matrix);

		matrix = translateMatrix(matrix, x, y);
		matrix = translateMatrix(matrix, (width / 2.0), (height / 2.0));
		matrix = rotateMatrix(matrix, degreesToRadians(angle));
		matrix = scaleMatrix(matrix, 1/scaleXValue, 1/scaleYValue);
		matrix = translateMatrix(matrix, -(width / 2.0), -(height / 2.0));

		var p1 = transformPointFromMatrix(matrix, 0, 0);
		var p2 = transformPointFromMatrix(matrix, 0 + width, 0);
		var p3 = transformPointFromMatrix(matrix, 0 + width, 0 + height);
		var p4 = transformPointFromMatrix(matrix, 0, 0 + height);

		// find the angle of p1 to p2
		var angle = radiansToDegrees(Math.atan2((p2.y - p1.y), (p2.x - p1.x)));

		// use distance formula to find width/height as distances
		var width = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
		var height = Math.sqrt(Math.pow((p4.x - p1.x), 2) + Math.pow((p4.y - p1.y), 2));

		var midpoint = {};
		midpoint.x = Math.min(p1.x, p3.x) + Math.abs((p3.x - p1.x) / 2.0);
		midpoint.y = Math.min(p1.y, p3.y) + Math.abs((p3.y - p1.y) / 2.0);

		var flexibleX = midpoint.x - (width / 2.0);
		var flexibleY = midpoint.y - (height / 2.0);
		
		var origin = convertFlexibleToElementCoordinates(element, flexibleX, flexibleY);

		return { x: origin.x, y: origin.y, angle: angle };
	};

	// returns an { x, y } point
	// cannot calculate width/height as these are dependent on proportionality (we'd also need the bounding width/height, but I don't think we'll ever be in a position to supply this)
	// generically useful function, but I'm keeping in PhysicsTemplate so it doesn't bloat the runtime
	var convertFlexibleToElementCoordinates = function (element, flexibleX, flexibleY) {
		var autoresizingMask = getElementAttribute(element, "bS", 0);

		// short circuit all other calculations if it is not flexible
		if(_usesFlexibleLayout != true || autoresizingMask == 0 || autoresizingMask == 36) {
			return { x: flexibleX, y: flexibleY };
		}
		
		var elementOid = _idReverseMapping[element.id];
		var parentOid = parentOidForElementOid(elementOid);
		
		var originalContainerSize = currentSizeForElementOid(parentOid);
		var currentContainerSize = browserReportedSizeForElementOid(parentOid);
		var currentElementSize = currentSizeForElementOid(elementOid);
		
		var widthValue = getElementAttribute(element, "c", null);
		var heightValue = getElementAttribute(element, "d", null);

		// if there's been no width/height is likely a text box without explicit dimensions. We still need to know what it is
		if(widthValue == null) {
			widthValue = currentElementSize.width;
		}
		if(heightValue == null) {
			heightValue = currentElementSize.height;
		}

		var fullWidth = currentWidthForElementWithOid(elementOid);
		var fullHeight = currentHeightForElementWithOid(elementOid);
		var widthDelta = fullWidth - widthValue;
		var heightDelta = fullHeight - heightValue;

		var calculatedLeft = flexibleX;
		var calculatedTop = flexibleY;
		
		// we will go through and recalculate these from the elmeent as proportionality means we can't just pass any values in
		var calculatedWidth = widthValue;
		var calculatedHeight = heightValue;
		
		// solving for these values
		var canonicalLeft = calculatedLeft;
		var canonicalTop = calculatedTop;
		
		var isMinXMargin = (autoresizingMask & NSViewMinXMargin) != 0;
		var isMaxXMargin = (autoresizingMask & NSViewMaxXMargin) != 0;
		var isWidthSizable = (autoresizingMask & NSViewWidthSizable) != 0;
		var isMinYMargin = (autoresizingMask & NSViewMinYMargin) != 0;
		var isMaxYMargin = (autoresizingMask & NSViewMaxYMargin) != 0;
		var isHeightSizable = (autoresizingMask & NSViewHeightSizable) != 0;
		var isScaleShrink = ((autoresizingMask & kHypeViewScaleShrink) != 0) && (isWidthSizable == true) && (isHeightSizable == true);
		var isScaleExpand = ((autoresizingMask & kHypeViewScaleExpand) != 0) && (isWidthSizable == true) && (isHeightSizable == true);
		var shouldPreserveProportions = (isScaleShrink == true || isScaleExpand == true);

		var widthResizeRatio = (currentContainerSize.width / originalContainerSize.width);
		var heightResizeRatio = (currentContainerSize.height / originalContainerSize.height);
		
		// first we'll need to get the intermediate values for calculations
		if(isMinXMargin == true && isMaxXMargin == true && isWidthSizable == true) {
			calculatedWidth = (fullWidth + (currentContainerSize.width - originalContainerSize.width)) - widthDelta;
		} else if(isWidthSizable == true) {
			calculatedWidth = Math.ceil((fullWidth * widthResizeRatio) - widthDelta);
		}
		if(isMinYMargin == true && isMaxYMargin == true && isHeightSizable == true) {
			calculatedHeight = (fullHeight + (currentContainerSize.height - originalContainerSize.height)) - heightDelta;
		} else if(isHeightSizable == true) {
			calculatedHeight = Math.ceil((fullHeight * heightResizeRatio) - heightDelta);
		}
		
		// now we can proceed with reverse transforms
		
		if(isMinXMargin == true && isMaxXMargin == false && isWidthSizable == false) {
			canonicalLeft = calculatedLeft - (currentContainerSize.width - originalContainerSize.width);
		} else if(isMinXMargin == true && isMaxXMargin == true && isWidthSizable == false) {
			canonicalLeft = ((calculatedLeft + (fullWidth / 2)) / widthResizeRatio) - (fullWidth / 2);
		} else if(isMinXMargin == true && isMaxXMargin == true && isWidthSizable == true) {
			canonicalLeft = calculatedLeft;
		} else if(isWidthSizable == true) {
			if(isMinXMargin == true && isMaxXMargin == false) {
				canonicalLeft = calculatedLeft + (calculatedWidth - widthValue) - (currentContainerSize.width - originalContainerSize.width);
			} else {
				canonicalLeft = calculatedLeft;
			}
		}
		
		if(isMinYMargin == true && isMaxYMargin == false && isHeightSizable == false) {
			canonicalTop = calculatedTop - (currentContainerSize.height - originalContainerSize.height);
		} else if(isMinYMargin == true && isMaxYMargin == true && isHeightSizable == false) {
			canonicalTop = ((calculatedTop + (fullHeight / 2)) / heightResizeRatio) - (fullHeight / 2);
		} else if(isMinYMargin == true && isMaxYMargin == true && isHeightSizable == true) {
			canonicalTop = calculatedTop;
		} else if(isHeightSizable == true) {
			if(isMinYMargin == true && isMaxYMargin == false) {
				canonicalTop = calculatedTop + (calculatedHeight - heightValue) - (currentContainerSize.height - originalContainerSize.height);
			} else {
				canonicalTop = calculatedTop;
			}
		}
		
		if(shouldPreserveProportions == true) {
			var previouslyCalculatedCalculatedWidth = calculatedWidth;
			var previouslyCalculatedCalculatedHeight = calculatedHeight;
			var proportionalWidthResizeRatio = (calculatedWidth / widthValue);
			var proportionalHeightResizeRatio = (calculatedHeight / heightValue);
			var proportionalResizeRatio = proportionalWidthResizeRatio;
			
			if(isScaleShrink == true) { // choose largest
				proportionalResizeRatio = (proportionalWidthResizeRatio <= proportionalHeightResizeRatio) ? proportionalWidthResizeRatio : proportionalHeightResizeRatio;
			} else if(isScaleExpand == true) { // choose smallest
				proportionalResizeRatio = (proportionalWidthResizeRatio >= proportionalHeightResizeRatio) ? proportionalWidthResizeRatio : proportionalHeightResizeRatio;
			}
			
			calculatedWidth = widthValue * proportionalResizeRatio;
			calculatedHeight = heightValue * proportionalResizeRatio;
			
			var proportionalWidthDelta = previouslyCalculatedCalculatedWidth - calculatedWidth;
			var proportionalHeightDelta = previouslyCalculatedCalculatedHeight - calculatedHeight;
			
			if(isMinXMargin == true && isMaxXMargin == false) { // need to bottom-align
				canonicalLeft -= proportionalWidthDelta;
			} else if(isMinXMargin == true && isMaxXMargin == true) { // need to center
				canonicalLeft -= (proportionalWidthDelta / 2);
			}
			
			if(isMinYMargin == true && isMaxYMargin == false) { // need to bottom-align
				canonicalTop -= proportionalHeightDelta;
			} else if(isMinYMargin == true && isMaxYMargin == true) { // need to center
				canonicalTop -= (proportionalHeightDelta / 2);
			}
		}
		
		return { x: canonicalLeft, y: canonicalTop };
	}

	var updatePhysicsBody = function (element) {
		var physicsEnvironment = physicsEnvironmentForElement(element);
	
		if(_hasPhysics != true || element == null || _buildingPhysicsBodies == true || physicsEnvironment == null || physicsEnvironment.isRenderingPhysics == true) {
			return;
		}
		
		var world = physicsEnvironment.physicsEngine.world;
		var elementOid = _idReverseMapping[element.id];
		var physicsBody = physicsEnvironment.physicsBodyElementMapping[elementOid];
		var bodyType = getElementAttribute(element, "bM", kPhysicsBodyTypeDead);
		if(bodyType == kPhysicsBodyTypeDead && physicsBody == null) {
			return;
		}
		
		if(isDraggingElement(element) == true) {
			// override during a drag
			bodyType = kPhysicsBodyTypeStatic;
		}
		
		var bounce = getElementAttribute(element, "bU", 0.5);
		var friction = getElementAttribute(element, "bV", 0.1);
		var airDrag = getElementAttribute(element, "cT", 0.01);
		var density = getElementAttribute(element, "bW", .001);
		if(density <= 0) {
			density = .000001;
		}
		if(bodyType == kPhysicsBodyTypeStatic) {
			bounce = 0;
			friction = 1;
			density = Infinity;
		}
		var leftFollowingSlope = getElementAttribute(element, calculatedPreviousAttributeNameForIdentifier("a"), 0);
		var topFollowingSlope = getElementAttribute(element, calculatedPreviousAttributeNameForIdentifier("b"), 0);
		var rotationAngleZFollowingSlope = getElementAttribute(element, calculatedPreviousAttributeNameForIdentifier("f"), 0);

		var physicsCoordinates = convertElementToPhysicsCoordinates(element);
		var physicsBodyWidth = physicsCoordinates.width;
		var physicsBodyHeight = physicsCoordinates.height;
		var physicsBodyLeft = physicsCoordinates.x + (physicsBodyWidth / 2);
		var physicsBodyTop = physicsCoordinates.y + (physicsBodyHeight / 2);
		var physicsBodyAngle = degreesToRadians(physicsCoordinates.angle);
		var physicsBodyPrevLeft = physicsBodyLeft - leftFollowingSlope;
		var physicsBodyPrevTop = physicsBodyTop - topFollowingSlope;
		var physicsBodyPrevAngle = physicsBodyAngle - (rotationAngleZFollowingSlope * Math.PI / 180);
		
		var shouldCreateBody = (physicsBody == null && bodyType != kPhysicsBodyTypeDead && physicsBodyWidth != 0 && physicsBodyHeight != 0);
		var shouldDeleteBody = (physicsBody != null && bodyType == kPhysicsBodyTypeDead);
		
		if(shouldCreateBody == true) {
			physicsBody = _Matter.Body.create({ elementId: element.id });
			_Matter.Composite.add(world, physicsBody);
			physicsEnvironment.physicsBodyElementMapping[elementOid] = physicsBody;
		} else if(shouldDeleteBody == true) {
			_Matter.Composite.remove(world, physicsBody);
			delete physicsEnvironment.physicsBodyElementMapping[elementOid];
			physicsBody = null;
		}
		
		if(physicsBody != null) {
			var physicsBodyPath = physicsBodyPathForElement(element);
			var isStatic = (bodyType == kPhysicsBodyTypeStatic);
			
			// for properties that come in/out of Matter, there can be precision issues in the comparison to see if we need to reset
			// so I look at the difference and only do a reset if it is within a tolerance
			if( (Math.abs(physicsBody.position.x - physicsBodyLeft) * 100000) > 1 ||
				(Math.abs(physicsBody.position.y - physicsBodyTop) * 100000) > 1 ||
				((physicsBody.hypeWidth == undefined) || ((Math.abs(physicsBody.hypeWidth - physicsBodyWidth) * 100000) > 1)) ||
				((physicsBody.hypeHeight == undefined) || ((Math.abs(physicsBody.hypeHeight - physicsBodyHeight) * 100000) > 1)) ||
				(Math.abs(physicsBody.angle - physicsBodyAngle) * 100000) > 1 ||
				physicsBody.render.path != physicsBodyPath ||
				physicsBody.restitution != bounce ||
				physicsBody.friction != friction ||
				physicsBody.frictionAir != airDrag ||
				physicsBody.density != density ||
				physicsBody.isStatic != isStatic ||
				physicsBody.isSleeping != false) {
				
					_Matter.Body.setStatic(physicsBody, isStatic);
					_Matter.Body.setAngle(physicsBody, 0); // need to reset this first otherwise angle below won't take affect
					_Matter.Body.setDensity(physicsBody, density);
					_Matter.Body.setVertices(physicsBody, _Matter.Vertices.fromPath(physicsBodyPath));
					_Matter.Body.setPosition(physicsBody, { x: physicsBodyLeft, y: physicsBodyTop });
					_Matter.Body.setAngle(physicsBody, physicsBodyAngle);
					_Matter.Body.setVelocity(physicsBody, { x: (physicsBodyLeft - physicsBodyPrevLeft), y: (physicsBodyTop - physicsBodyPrevTop) });
					_Matter.Body.setAngularVelocity(physicsBody, physicsBodyAngle - physicsBodyPrevAngle);
				
					physicsBody.render.path = physicsBodyPath; // this is defunct in Matter.js 0.8 butI still use it for knowing when geometry changed
				
					// make sure to update updatePhysicsBodySimpleProperties if ever changing this
					physicsBody.restitution = bounce;
					physicsBody.friction = friction;
					physicsBody.frictionAir = airDrag;

					_Matter.Sleeping.set(physicsBody, false);
					
					// reset derived values
					physicsBody.force = { x: 0, y: 0 };
					physicsBody.torque = 0;
					physicsBody.positionImpulse = { x: 0, y: 0 };
					physicsBody.constraintImpulse = { x: 0, y: 0, angle: 0 };
					physicsBody.angularSpeed = 0;
					physicsBody.motion = 0;
				
					// my own values I'll use later
					physicsBody.hypeWidth = physicsBodyWidth;
					physicsBody.hypeHeight = physicsBodyHeight;
				
					setElementAttribute(element, "HYP_p", false);

					// nice debug log
					//console.log("Matter.World.add(engine.world, Matter.Bodies.rectangle(" + physicsBody.position.x +", " + physicsBody.position.y + ", " + fullWidth + ", " + fullHeight + ", { isStatic: " + physicsBody.isStatic + ", density: " + physicsBody.density + ", friction: " + physicsBody.friction + ", restitution: " + physicsBody.restitution + ", angle: " + physicsBody.angle  + "}));");
			}
			
			requestHeartbeat();
		}
	};

	// this method is a simpified version of updatePhysicsBody for items where the general velocities shouldn't be reset
	var updatePhysicsBodySimpleProperties = function (element) {
		var physicsEnvironment = physicsEnvironmentForElement(element);
	
		if(_hasPhysics != true || element == null || _buildingPhysicsBodies == true || physicsEnvironment == null || physicsEnvironment.isRenderingPhysics == true) {
			return;
		}
		
		var world = physicsEnvironment.physicsEngine.world;
		var elementOid = _idReverseMapping[element.id];
		var physicsBody = physicsEnvironment.physicsBodyElementMapping[elementOid];
		if(physicsBody == null) {
			return;
		}
		
		var bodyType = getElementAttribute(element, "bM", kPhysicsBodyTypeDead);
		var bounce = getElementAttribute(element, "bU", 0.5);
		var friction = getElementAttribute(element, "bV", 0.1);
		var airDrag = getElementAttribute(element, "cT", 0.01);
		var density = getElementAttribute(element, "bW", .001);
		if(density <= 0) {
			density = .000001;
		}
		if(bodyType == kPhysicsBodyTypeStatic) {
			bounce = 0;
			friction = 1;
			density = Infinity;
		}
		physicsBody.restitution = bounce;
		physicsBody.friction = friction;
		physicsBody.frictionAir = airDrag;
		_Matter.Body.setDensity(physicsBody, density);
	};

	

	_Apply['bM'] = updatePhysicsBody;
	_Apply['bU'] = updatePhysicsBodySimpleProperties;
	_Apply['bV'] = updatePhysicsBodySimpleProperties;
	_Apply['cT'] = updatePhysicsBodySimpleProperties;
	_Apply['bW'] = updatePhysicsBodySimpleProperties;

	
	/**
* matter.js 0.8.0-edge
* http://brm.io/matter-js/
* License: MIT
*/

var _Matter = (function () {
	var Matter = {};

	// Begin Matter namespace closure

	// All Matter modules are included below during build
	// Outro.js then closes at the end of the file


// Begin src/body/Body.js

/**
* The `Matter.Body` module contains methods for creating and manipulating body models.
* A `Matter.Body` is a rigid body that can be simulated by a `Matter.Engine`.
* Factories for commonly used body configurations (such as rectangles, circles and other polygons) can be found in the module `Matter.Bodies`.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.

* @class Body
*/

var Body = {};

(function() {

    Body._inertiaScale = 4;

    var _nextCollidingGroupId = 1,
        _nextNonCollidingGroupId = -1;

    /**
     * Creates a new rigid body model. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {body} body
     */
    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),
            type: 'body',
            label: 'Body',
            angle: 0,
            vertices: Vertices.fromPath('L 0 0 L 40 0 L 40 40 L 0 40'),
            position: { x: 0, y: 0 },
            force: { x: 0, y: 0 },
            torque: 0,
            positionImpulse: { x: 0, y: 0 },
            constraintImpulse: { x: 0, y: 0, angle: 0 },
            speed: 0,
            angularSpeed: 0,
            velocity: { x: 0, y: 0 },
            angularVelocity: 0,
            isStatic: false,
            isSleeping: false,
            motion: 0,
            sleepThreshold: 60,
            density: 0.001,
            restitution: 0,
            friction: 0.1,
            frictionAir: 0.01,
            collisionFilter: {
                category: 0x0001,
                mask: 0xFFFFFFFF,
                group: 0
            },
            slop: 0.05,
            timeScale: 1,
            render: {
                visible: true,
                sprite: {
                    xScale: 1,
                    yScale: 1
                },
                lineWidth: 1.5
            }
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Returns the next unique group index for which bodies will collide.
     * If `isNonColliding` is `true`, returns the next unique group index for which bodies will _not_ collide.
     * See `body.collisionFilter` for more information.
     * @method nextGroup
     * @param {bool} [isNonColliding=false]
     * @return {Number} Unique group index
     */
    Body.nextGroup = function(isNonColliding) {
        if (isNonColliding)
            return _nextNonCollidingGroupId--;

        return _nextCollidingGroupId++;
    };

    /**
     * Initialises body properties.
     * @method _initProperties
     * @private
     * @param {body} body
     * @param {} options
     */
    var _initProperties = function(body, options) {
        // init required properties
        body.bounds = body.bounds || Bounds.create(body.vertices);
        body.positionPrev = body.positionPrev || Vector.clone(body.position);
        body.anglePrev = body.anglePrev || body.angle;

        // must use setters for the more complicated properties
        Body.setVertices(body, body.vertices);
        Body.setStatic(body, body.isStatic);
        Sleeping.set(body, body.isSleeping);
        Vertices.rotate(body.vertices, body.angle, body.position);
        Axes.rotate(body.axes, body.angle);
        Bounds.update(body.bounds, body.vertices, body.velocity);

        // allow options to override the automatically calculated properties
        body.axes = options.axes || body.axes;
        body.area = options.area || body.area;
        Body.setMass(body, options.mass || body.mass);
        Body.setInertia(body, options.inertia || body.inertia);

        // render properties
        var defaultFillStyle = (body.isStatic ? '#eeeeee' : Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'])),
            defaultStrokeStyle = Common.shadeColor(defaultFillStyle, -20);
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
    };

    /**
     * Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
     * @method setStatic
     * @param {body} body
     * @param {bool} isStatic
     */
    Body.setStatic = function(body, isStatic) {
        body.isStatic = isStatic;

        if (isStatic) {
            body.restitution = 0;
            body.friction = 1;
            body.mass = body.inertia = body.density = Infinity;
            body.inverseMass = body.inverseInertia = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;
            body.anglePrev = body.angle;
            body.angularVelocity = 0;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;
        }
    };

    /**
     * Sets the mass of the body. Inverse mass and density are automatically updated to reflect the change.
     * @method setMass
     * @param {body} body
     * @param {number} mass
     */
    Body.setMass = function(body, mass) {
        body.mass = mass;
        body.inverseMass = 1 / body.mass;
        body.density = body.mass / body.area;
    };

    /**
     * Sets the density of the body. Mass is automatically updated to reflect the change.
     * @method setDensity
     * @param {body} body
     * @param {number} density
     */
    Body.setDensity = function(body, density) {
        Body.setMass(body, density * body.area);
        body.density = density;
    };

    /**
     * Sets the moment of inertia (i.e. second moment of area) of the body of the body. 
     * Inverse inertia is automatically updated to reflect the change. Mass is not changed.
     * @method setInertia
     * @param {body} body
     * @param {number} inertia
     */
    Body.setInertia = function(body, inertia) {
        body.inertia = inertia;
        body.inverseInertia = 1 / body.inertia;
    };

    /**
     * Sets the body's vertices and updates body properties accordingly, including inertia, area and mass (with respect to `body.density`).
     * Vertices will be automatically transformed to be orientated around their centre of mass as the origin.
     * They are then automatically translated to world space based on `body.position`.
     *
     * The `vertices` argument should be passed as an array of `Matter.Vector` points (or a `Matter.Vertices` array).
     * Vertices must form a convex hull, concave hulls are not supported.
     *
     * @method setVertices
     * @param {body} body
     * @param {vector[]} vertices
     */
    Body.setVertices = function(body, vertices) {
        // change vertices
        if (vertices[0].body === body) {
            body.vertices = vertices;
        } else {
            body.vertices = Vertices.create(vertices, body);
        }

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // orient vertices around the centre of mass at origin (0, 0)
        var centre = Vertices.centre(body.vertices);
        Vertices.translate(body.vertices, centre, -1);

        // update inertia while vertices are at origin (0, 0)
        Body.setInertia(body, Body._inertiaScale * Vertices.inertia(body.vertices, body.mass));

        // update geometry
        Vertices.translate(body.vertices, body.position);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the position of the body instantly. Velocity, angle, force etc. are unchanged.
     * @method setPosition
     * @param {body} body
     * @param {vector} position
     */
    Body.setPosition = function(body, position) {
        var delta = Vector.sub(position, body.position);

        body.position.x = position.x;
        body.position.y = position.y;
        body.positionPrev.x += delta.x;
        body.positionPrev.y += delta.y;

        Vertices.translate(body.vertices, delta);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
     * @method setAngle
     * @param {body} body
     * @param {number} angle
     */
    Body.setAngle = function(body, angle) {
        var delta = angle - body.angle;

        body.angle = angle;
        body.anglePrev += delta;

        Vertices.rotate(body.vertices, delta, body.position);
        Axes.rotate(body.axes, delta);
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Sets the linear velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setVelocity
     * @param {body} body
     * @param {vector} velocity
     */
    Body.setVelocity = function(body, velocity) {
        body.positionPrev.x = body.position.x - velocity.x;
        body.positionPrev.y = body.position.y - velocity.y;
        body.velocity.x = velocity.x;
        body.velocity.y = velocity.y;
        body.speed = Vector.magnitude(body.velocity);
    };

    /**
     * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged. See also `Body.applyForce`.
     * @method setAngularVelocity
     * @param {body} body
     * @param {number} velocity
     */
    Body.setAngularVelocity = function(body, velocity) {
        body.anglePrev = body.angle - velocity;
        body.angularVelocity = velocity;
        body.angularSpeed = Common.abs(body.angularVelocity);
    };

    /**
     * Moves a body by a given vector relative to its current position, without imparting any velocity.
     * @method translate
     * @param {body} body
     * @param {vector} translation
     */
    Body.translate = function(body, translation) {
        Body.setPosition(body, Vector.add(body.position, translation));
    };

    /**
     * Rotates a body by a given angle relative to its current angle, without imparting any angular velocity.
     * @method rotate
     * @param {body} body
     * @param {number} rotation
     */
    Body.rotate = function(body, rotation) {
        Body.setAngle(body, body.angle + rotation);
    };

    /**
     * Scales the body, including updating physical properties (mass, area, axes, inertia), from a world-space point (default is body centre).
     * @method scale
     * @param {body} body
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} [point]
     */
    Body.scale = function(body, scaleX, scaleY, point) {
        // scale vertices
        Vertices.scale(body.vertices, scaleX, scaleY, point);

        // update properties
        body.axes = Axes.fromVertices(body.vertices);
        body.area = Vertices.area(body.vertices);
        Body.setMass(body, body.density * body.area);

        // update inertia (requires vertices to be at origin)
        Vertices.translate(body.vertices, { x: -body.position.x, y: -body.position.y });
        Body.setInertia(body, Vertices.inertia(body.vertices, body.mass));
        Vertices.translate(body.vertices, { x: body.position.x, y: body.position.y });

        // update bounds
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Zeroes the `body.force` and `body.torque` force buffers.
     * @method resetForcesAll
     * @param {body[]} bodies
     */
    Body.resetForcesAll = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // reset force buffers
            body.force.x = 0;
            body.force.y = 0;
            body.torque = 0;
        }
    };

    /**
     * Applys a mass dependant force to all given bodies.
     * @method applyGravityAll
     * @param {body[]} bodies
     * @param {vector} gravity
     */
    Body.applyGravityAll = function(bodies, gravity) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            // apply gravity
            body.force.y += body.mass * gravity.y * 0.001;
            body.force.x += body.mass * gravity.x * 0.001;
        }
    };

    /**
     * Applys `Body.update` to all given `bodies`.
     * @method updateAll
     * @param {body[]} bodies
     * @param {number} deltaTime 
     * The amount of time elapsed between updates
     * @param {number} timeScale
     * @param {number} correction 
     * The Verlet correction factor (deltaTime / lastDeltaTime)
     * @param {bounds} worldBounds
     */
    Body.updateAll = function(bodies, deltaTime, timeScale, correction, worldBounds) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isStatic || body.isSleeping)
                continue;

            // don't update out of world bodies
            // TODO: viewports
            if (body.bounds.max.x < worldBounds.min.x || body.bounds.min.x > worldBounds.max.x
                || body.bounds.max.y < worldBounds.min.y || body.bounds.min.y > worldBounds.max.y)
                continue;

            Body.update(body, deltaTime, timeScale, correction);
        }
    };

    /**
     * Performs a simulation step for the given `body`, including updating position and angle using Verlet integration.
     * @method update
     * @param {body} body
     * @param {number} deltaTime
     * @param {number} timeScale
     * @param {number} correction
     */
    Body.update = function(body, deltaTime, timeScale, correction) {
        var deltaTimeSquared = Math.pow(deltaTime * timeScale * body.timeScale, 2);

        // from the previous step
        var frictionAir = 1 - body.frictionAir * timeScale * body.timeScale,
            velocityPrevX = body.position.x - body.positionPrev.x,
            velocityPrevY = body.position.y - body.positionPrev.y;

        // update velocity with verlet integration
        body.velocity.x = (velocityPrevX * frictionAir * correction) + (body.force.x / body.mass) * deltaTimeSquared;
        body.velocity.y = (velocityPrevY * frictionAir * correction) + (body.force.y / body.mass) * deltaTimeSquared;

        body.positionPrev.x = body.position.x;
        body.positionPrev.y = body.position.y;
        body.position.x += body.velocity.x;
        body.position.y += body.velocity.y;

        // update angular velocity with verlet integration
        body.angularVelocity = ((body.angle - body.anglePrev) * frictionAir * correction) + (body.torque / body.inertia) * deltaTimeSquared;
        body.anglePrev = body.angle;
        body.angle += body.angularVelocity;

        // track speed and acceleration
        body.speed = Vector.magnitude(body.velocity);
        body.angularSpeed = Common.abs(body.angularVelocity);

        // transform the body geometry
        Vertices.translate(body.vertices, body.velocity);
        if (body.angularVelocity !== 0) {
            Vertices.rotate(body.vertices, body.angularVelocity, body.position);
            Axes.rotate(body.axes, body.angularVelocity);
        }
        Bounds.update(body.bounds, body.vertices, body.velocity);
    };

    /**
     * Applies a force to a body from a given world-space position, including resulting torque.
     * @method applyForce
     * @param {body} body
     * @param {vector} position
     * @param {vector} force
     */
    Body.applyForce = function(body, position, force) {
        body.force.x += force.x;
        body.force.y += force.y;
        var offset = { x: position.x - body.position.x, y: position.y - body.position.y };
        body.torque += (offset.x * force.y - offset.y * force.x) * body.inverseInertia;
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Body.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "body"
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Body"
     */

    /**
     * A `Number` specifying the angle of the body, in radians.
     *
     * @property angle
     * @type number
     * @default 0
     */

    /**
     * An array of `Vector` objects that specify the convex hull of the rigid body.
     * These should be provided about the origin `(0, 0)`. E.g.
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * When passed via `Body.create`, the verticies are translated relative to `body.position` (i.e. world-space, and constantly updated by `Body.update` during simulation).
     * The `Vector` objects are also augmented with additional properties required for efficient collision detection. 
     *
     * Other properties such as `inertia` and `bounds` are automatically calculated from the passed vertices (unless provided via `options`).
     * Concave hulls are not currently supported. The module `Matter.Vertices` contains useful methods for working with vertices.
     *
     * @property vertices
     * @type vector[]
     */

    /**
     * A `Vector` that specifies the current world-space position of the body.
     *
     * @property position
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the force to apply in the current step. It is zeroed after every `Body.update`. See also `Body.applyForce`.
     *
     * @property force
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the torque (turning force) to apply in the current step. It is zeroed after every `Body.update`.
     *
     * @property torque
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.velocity`).
     *
     * 
     * @property speed
     * @type number
     * @default 0
     */

    /**
     * A `Number` that _measures_ the current angular speed of the body after the last `Body.update`. It is read-only and always positive (it's the magnitude of `body.angularVelocity`).
     *
     * 
     * @property angularSpeed
     * @type number
     * @default 0
     */

    /**
     * A `Vector` that _measures_ the current velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's velocity directly, you should either apply a force or simply change the body's `position` (as the engine uses position-Verlet integration).
     *
     * 
     * @property velocity
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that _measures_ the current angular velocity of the body after the last `Body.update`. It is read-only. 
     * If you need to modify a body's angular velocity directly, you should apply a torque or simply change the body's `angle` (as the engine uses position-Verlet integration).
     *
     * 
     * @property angularVelocity
     * @type number
     * @default 0
     */

    /**
     * A flag that indicates whether a body is considered static. A static body can never change position or angle and is completely fixed.
     * If you need to set a body as static after its creation, you should use `Body.setStatic` as this requires more than just setting this flag.
     *
     * @property isStatic
     * @type boolean
     * @default false
     */

    /**
     * A flag that indicates whether the body is considered sleeping. A sleeping body acts similar to a static body, except it is only temporary and can be awoken.
     * If you need to set a body as sleeping, you should use `Sleeping.set` as this requires more than just setting this flag.
     *
     * @property isSleeping
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that _measures_ the amount of movement a body currently has (a combination of `speed` and `angularSpeed`). It is read-only and always positive.
     * It is used and updated by the `Matter.Sleeping` module during simulation to decide if a body has come to rest.
     *
     * 
     * @property motion
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the number of updates in which this body must have near-zero velocity before it is set as sleeping by the `Matter.Sleeping` module (if sleeping is enabled by the engine).
     *
     * @property sleepThreshold
     * @type number
     * @default 60
     */

    /**
     * A `Number` that defines the density of the body, that is its mass per unit area.
     * If you pass the density via `Body.create` the `mass` property is automatically calculated for you based on the size (area) of the object.
     * This is generally preferable to simply setting mass and allows for more intuitive definition of materials (e.g. rock has a higher density than wood).
     *
     * @property density
     * @type number
     * @default 0.001
     */

    /**
     * A `Number` that defines the mass of the body, although it may be more appropriate to specify the `density` property instead.
     * If you modify this value, you must also modify the `body.inverseMass` property (`1 / mass`).
     *
     * @property mass
     * @type number
     */

    /**
     * A `Number` that defines the inverse mass of the body (`1 / mass`).
     * If you modify this value, you must also modify the `body.mass` property.
     *
     * @property inverseMass
     * @type number
     */

    /**
     * A `Number` that defines the moment of inertia (i.e. second moment of area) of the body.
     * It is automatically calculated from the given convex hull (`vertices` array) and density in `Body.create`.
     * If you modify this value, you must also modify the `body.inverseInertia` property (`1 / inertia`).
     *
     * @property inertia
     * @type number
     */

    /**
     * A `Number` that defines the inverse moment of inertia of the body (`1 / inertia`).
     * If you modify this value, you must also modify the `body.inertia` property.
     *
     * @property inverseInertia
     * @type number
     */

    /**
     * A `Number` that defines the restitution (elasticity) of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means collisions may be perfectly inelastic and no bouncing may occur. 
     * A value of `0.8` means the body may bounce back with approximately 80% of its kinetic energy.
     * Note that collision response is based on _pairs_ of bodies, and that `restitution` values are _combined_ with the following formula:
     *
     *     Math.max(bodyA.restitution, bodyB.restitution)
     *
     * @property restitution
     * @type number
     * @default 0
     */

    /**
     * A `Number` that defines the friction of the body. The value is always positive and is in the range `(0, 1)`.
     * A value of `0` means that the body may slide indefinitely.
     * A value of `1` means the body may come to a stop almost instantly after a force is applied.
     *
     * The effects of the value may be non-linear. 
     * High values may be unstable depending on the body.
     * The engine uses a Coulomb friction model including static and kinetic friction.
     * Note that collision response is based on _pairs_ of bodies, and that `friction` values are _combined_ with the following formula:
     *
     *     Math.min(bodyA.friction, bodyB.friction)
     *
     * @property friction
     * @type number
     * @default 0.1
     */

    /**
     * A `Number` that defines the air friction of the body (air resistance). 
     * A value of `0` means the body will never slow as it moves through space.
     * The higher the value, the faster a body slows when moving through space.
     * The effects of the value are non-linear. 
     *
     * @property frictionAir
     * @type number
     * @default 0.01
     */

    /**
     * An `Object` that specifies the collision filtering properties of this body.
     *
     * Collisions between two bodies will obey the following rules:
     * - If the two bodies have the same non-zero value of `collisionFilter.group`,
     *   they will always collide if the value is positive, and they will never collide
     *   if the value is negative.
     * - If the two bodies have different values of `collisionFilter.group` or if one
     *   (or both) of the bodies has a value of 0, then the category/mask rules apply as follows:
     *
     * Each body belongs to a collision category, given by `collisionFilter.category`. This
     * value is used as a bit field and the category should have only one bit set, meaning that
     * the value of this property is a power of two in the range [1, 2^31]. Thus, there are 32
     * different collision categories available.
     *
     * Each body also defines a collision bitmask, given by `collisionFilter.mask` which specifies
     * the categories it collides with (the value is the bitwise AND value of all these categories).
     *
     * Using the category/mask rules, two bodies `A` and `B` collide if each includes the other's
     * category in its mask, i.e. `(categoryA & maskB) !== 0` and `(categoryB & maskA) !== 0`
     * are both true.
     *
     * @property collisionFilter
     * @type object
     */

    /**
     * An Integer `Number`, that specifies the collision group this body belongs to.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.group
     * @type object
     * @default 0
     */

    /**
     * A bit field that specifies the collision category this body belongs to.
     * The category value should have only one bit set, for example `0x0001`.
     * This means there are up to 32 unique collision categories available.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.category
     * @type object
     * @default 1
     */

    /**
     * A bit mask that specifies the collision categories this body may collide with.
     * See `body.collisionFilter` for more information.
     *
     * @property collisionFilter.mask
     * @type object
     * @default -1
     */

    /**
     * A `Number` that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies.
     * Avoid changing this value unless you understand the purpose of `slop` in physics engines.
     * The default should generally suffice, although very large bodies may require larger values for stable stacking.
     *
     * @property slop
     * @type number
     * @default 0.05
     */

    /**
     * A `Number` that allows per-body time scaling, e.g. a force-field where bodies inside are in slow-motion, while others are at full speed.
     *
     * @property timeScale
     * @type number
     * @default 1
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the body should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * An `Object` that defines the sprite properties to use when rendering, if any.
     *
     * @property render.sprite
     * @type object
     */

    /**
     * An `String` that defines the path to the image to use as the sprite texture, if any.
     *
     * @property render.sprite.texture
     * @type string
     */
     
    /**
     * A `Number` that defines the scaling in the x-axis for the sprite, if any.
     *
     * @property render.sprite.xScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the scaling in the y-axis for the sprite, if any.
     *
     * @property render.sprite.yScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that defines the line width to use when rendering the body outline (if a sprite is not defined).
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 1.5
     */

    /**
     * A `String` that defines the fill style to use when rendering the body (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.fillStyle
     * @type string
     * @default a random colour
     */

    /**
     * A `String` that defines the stroke style to use when rendering the body outline (if a sprite is not defined).
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * An array of unique axis vectors (edge normals) used for collision detection.
     * These are automatically calculated from the given convex hull (`vertices` array) in `Body.create`.
     * They are constantly updated by `Body.update` during the simulation.
     *
     * @property axes
     * @type vector[]
     */
     
    /**
     * A `Number` that _measures_ the area of the body's convex hull, calculated at creation by `Body.create`.
     *
     * @property area
     * @type string
     * @default 
     */

    /**
     * A `Bounds` object that defines the AABB region for the body.
     * It is automatically calculated from the given convex hull (`vertices` array) in `Body.create` and constantly updated by `Body.update` during simulation.
     *
     * @property bounds
     * @type bounds
     */

})();


;   // End src/body/Body.js


// Begin src/body/Composite.js

/**
* The `Matter.Composite` module contains methods for creating and manipulating composite bodies.
* A composite body is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`, therefore composites form a tree structure.
* It is important to use the functions in this module to modify composites, rather than directly modifying their properties.
* Note that the `Matter.World` object is also a type of `Matter.Composite` and as such all composite methods here can also operate on a `Matter.World`.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Composite
*/

var Composite = {};

(function() {

    /**
     * Creates a new composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} [options]
     * @return {composite} A new composite
     */
    Composite.create = function(options) {
        return Common.extend({ 
            id: Common.nextId(),
            type: 'composite',
            parent: null,
            isModified: false,
            bodies: [], 
            constraints: [], 
            composites: [],
            label: 'Composite'
        }, options);
    };

    /**
     * Sets the composite's `isModified` flag. 
     * If `updateParents` is true, all parents will be set (default: false).
     * If `updateChildren` is true, all children will be set (default: false).
     * @method setModified
     * @param {composite} composite
     * @param {boolean} isModified
     * @param {boolean} [updateParents=false]
     * @param {boolean} [updateChildren=false]
     */
    Composite.setModified = function(composite, isModified, updateParents, updateChildren) {
        composite.isModified = isModified;

        if (updateParents && composite.parent) {
            Composite.setModified(composite.parent, isModified, updateParents, updateChildren);
        }

        if (updateChildren) {
            for(var i = 0; i < composite.composites.length; i++) {
                var childComposite = composite.composites[i];
                Composite.setModified(childComposite, isModified, updateParents, updateChildren);
            }
        }
    };

    /**
     * Generic add function. Adds one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Triggers `beforeAdd` and `afterAdd` events on the `composite`.
     * @method add
     * @param {composite} composite
     * @param {} object
     * @return {composite} The original composite with the objects added
     */
    Composite.add = function(composite, object) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeAdd', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                Composite.addBody(composite, obj);
                break;
            case 'constraint':
                Composite.addConstraint(composite, obj);
                break;
            case 'composite':
                Composite.addComposite(composite, obj);
                break;
            case 'mouseConstraint':
                Composite.addConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterAdd', { object: object });

        return composite;
    };

    /**
     * Generic remove function. Removes one or many body(s), constraint(s) or a composite(s) to the given composite.
     * Optionally searching its children recursively.
     * Triggers `beforeRemove` and `afterRemove` events on the `composite`.
     * @method remove
     * @param {composite} composite
     * @param {} object
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the objects removed
     */
    Composite.remove = function(composite, object, deep) {
        var objects = [].concat(object);

        Events.trigger(composite, 'beforeRemove', { object: object });

        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];

            switch (obj.type) {

            case 'body':
                Composite.removeBody(composite, obj, deep);
                break;
            case 'constraint':
                Composite.removeConstraint(composite, obj, deep);
                break;
            case 'composite':
                Composite.removeComposite(composite, obj, deep);
                break;
            case 'mouseConstraint':
                Composite.removeConstraint(composite, obj.constraint);
                break;

            }
        }

        Events.trigger(composite, 'afterRemove', { object: object });

        return composite;
    };

    /**
     * Adds a composite to the given composite
     * @private
     * @method addComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @return {composite} The original compositeA with the objects from compositeB added
     */
    Composite.addComposite = function(compositeA, compositeB) {
        compositeA.composites.push(compositeB);
        compositeB.parent = compositeA;
        Composite.setModified(compositeA, true, true, false);
        return compositeA;
    };

    /**
     * Removes a composite from the given composite, and optionally searching its children recursively
     * @private
     * @method removeComposite
     * @param {composite} compositeA
     * @param {composite} compositeB
     * @param {boolean} [deep=false]
     * @return {composite} The original compositeA with the composite removed
     */
    Composite.removeComposite = function(compositeA, compositeB, deep) {
        var position = Common.indexOf(compositeA.composites, compositeB);
        if (position !== -1) {
            Composite.removeCompositeAt(compositeA, position);
            Composite.setModified(compositeA, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < compositeA.composites.length; i++){
                Composite.removeComposite(compositeA.composites[i], compositeB, true);
            }
        }

        return compositeA;
    };

    /**
     * Removes a composite from the given composite
     * @private
     * @method removeCompositeAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the composite removed
     */
    Composite.removeCompositeAt = function(composite, position) {
        composite.composites.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a body to the given composite
     * @private
     * @method addBody
     * @param {composite} composite
     * @param {body} body
     * @return {composite} The original composite with the body added
     */
    Composite.addBody = function(composite, body) {
        composite.bodies.push(body);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a body from the given composite, and optionally searching its children recursively
     * @private
     * @method removeBody
     * @param {composite} composite
     * @param {body} body
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBody = function(composite, body, deep) {
        var position = Common.indexOf(composite.bodies, body);
        if (position !== -1) {
            Composite.removeBodyAt(composite, position);
            Composite.setModified(composite, true, true, false);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeBody(composite.composites[i], body, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite
     * @private
     * @method removeBodyAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the body removed
     */
    Composite.removeBodyAt = function(composite, position) {
        composite.bodies.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Adds a constraint to the given composite
     * @private
     * @method addConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @return {composite} The original composite with the constraint added
     */
    Composite.addConstraint = function(composite, constraint) {
        composite.constraints.push(constraint);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes a constraint from the given composite, and optionally searching its children recursively
     * @private
     * @method removeConstraint
     * @param {composite} composite
     * @param {constraint} constraint
     * @param {boolean} [deep=false]
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraint = function(composite, constraint, deep) {
        var position = Common.indexOf(composite.constraints, constraint);
        if (position !== -1) {
            Composite.removeConstraintAt(composite, position);
        }

        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.removeConstraint(composite.composites[i], constraint, true);
            }
        }

        return composite;
    };

    /**
     * Removes a body from the given composite
     * @private
     * @method removeConstraintAt
     * @param {composite} composite
     * @param {number} position
     * @return {composite} The original composite with the constraint removed
     */
    Composite.removeConstraintAt = function(composite, position) {
        composite.constraints.splice(position, 1);
        Composite.setModified(composite, true, true, false);
        return composite;
    };

    /**
     * Removes all bodies, constraints and composites from the given composite
     * Optionally clearing its children recursively
     * @method clear
     * @param {world} world
     * @param {boolean} keepStatic
     * @param {boolean} [deep=false]
     */
    Composite.clear = function(composite, keepStatic, deep) {
        if (deep) {
            for (var i = 0; i < composite.composites.length; i++){
                Composite.clear(composite.composites[i], keepStatic, true);
            }
        }
        
        if (keepStatic) {
            composite.bodies = composite.bodies.filter(function(body) { return body.isStatic; });
        } else {
            composite.bodies.length = 0;
        }

        composite.constraints.length = 0;
        composite.composites.length = 0;
        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Returns all bodies in the given composite, including all bodies in its children, recursively
     * @method allBodies
     * @param {composite} composite
     * @return {body[]} All the bodies
     */
    Composite.allBodies = function(composite) {
        var bodies = [].concat(composite.bodies);

        for (var i = 0; i < composite.composites.length; i++)
            bodies = bodies.concat(Composite.allBodies(composite.composites[i]));

        return bodies;
    };

    /**
     * Returns all constraints in the given composite, including all constraints in its children, recursively
     * @method allConstraints
     * @param {composite} composite
     * @return {constraint[]} All the constraints
     */
    Composite.allConstraints = function(composite) {
        var constraints = [].concat(composite.constraints);

        for (var i = 0; i < composite.composites.length; i++)
            constraints = constraints.concat(Composite.allConstraints(composite.composites[i]));

        return constraints;
    };

    /**
     * Returns all composites in the given composite, including all composites in its children, recursively
     * @method allComposites
     * @param {composite} composite
     * @return {composite[]} All the composites
     */
    Composite.allComposites = function(composite) {
        var composites = [].concat(composite.composites);

        for (var i = 0; i < composite.composites.length; i++)
            composites = composites.concat(Composite.allComposites(composite.composites[i]));

        return composites;
    };

    /**
     * Searches the composite recursively for an object matching the type and id supplied, null if not found
     * @method get
     * @param {composite} composite
     * @param {number} id
     * @param {string} type
     * @return {object} The requested object, if found
     */
    Composite.get = function(composite, id, type) {
        var objects,
            object;

        switch (type) {
        case 'body':
            objects = Composite.allBodies(composite);
            break;
        case 'constraint':
            objects = Composite.allConstraints(composite);
            break;
        case 'composite':
            objects = Composite.allComposites(composite).concat(composite);
            break;
        }

        if (!objects)
            return null;

        object = objects.filter(function(object) { 
            return object.id.toString() === id.toString(); 
        });

        return object.length === 0 ? null : object[0];
    };

    /**
     * Moves the given object(s) from compositeA to compositeB (equal to a remove followed by an add)
     * @method move
     * @param {compositeA} compositeA
     * @param {object[]} objects
     * @param {compositeB} compositeB
     * @return {composite} Returns compositeA
     */
    Composite.move = function(compositeA, objects, compositeB) {
        Composite.remove(compositeA, objects);
        Composite.add(compositeB, objects);
        return compositeA;
    };

    /**
     * Assigns new ids for all objects in the composite, recursively
     * @method rebase
     * @param {composite} composite
     * @return {composite} Returns composite
     */
    Composite.rebase = function(composite) {
        var objects = Composite.allBodies(composite)
                        .concat(Composite.allConstraints(composite))
                        .concat(Composite.allComposites(composite));

        for (var i = 0; i < objects.length; i++) {
            objects[i].id = Common.nextId();
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Translates all children in the composite by a given vector relative to their current positions, 
     * without imparting any velocity.
     * @method translate
     * @param {composite} composite
     * @param {vector} translation
     * @param {bool} [recursive=true]
     */
    Composite.translate = function(composite, translation, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            Body.translate(bodies[i], translation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Rotates all children in the composite by a given angle about the given point, without imparting any angular velocity.
     * @method rotate
     * @param {composite} composite
     * @param {number} rotation
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.rotate = function(composite, rotation, point, recursive) {
        var cos = Math.cos(rotation),
            sin = Math.sin(rotation),
            bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + (dx * cos - dy * sin),
                y: point.y + (dx * sin + dy * cos)
            });

            Body.rotate(body, rotation);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /**
     * Scales all children in the composite, including updating physical properties (mass, area, axes, inertia), from a world-space point.
     * @method scale
     * @param {composite} composite
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     * @param {bool} [recursive=true]
     */
    Composite.scale = function(composite, scaleX, scaleY, point, recursive) {
        var bodies = recursive ? Composite.allBodies(composite) : composite.bodies;

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                dx = body.position.x - point.x,
                dy = body.position.y - point.y;
                
            Body.setPosition(body, {
                x: point.x + dx * scaleX,
                y: point.y + dy * scaleY
            });

            Body.scale(body, scaleX, scaleY);
        }

        Composite.setModified(composite, true, true, false);

        return composite;
    };

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired when a call to `Composite.add` is made, before objects have been added.
    *
    * @event beforeAdd
    * @param {} event An event object
    * @param {} event.object The object(s) to be added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.add` is made, after objects have been added.
    *
    * @event afterAdd
    * @param {} event An event object
    * @param {} event.object The object(s) that have been added (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, before objects have been removed.
    *
    * @event beforeRemove
    * @param {} event An event object
    * @param {} event.object The object(s) to be removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired when a call to `Composite.remove` is made, after objects have been removed.
    *
    * @event afterRemove
    * @param {} event An event object
    * @param {} event.object The object(s) that have been removed (may be a single body, constraint, composite or a mixed array of these)
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "composite"
     */

    /**
     * An arbitrary `String` name to help the user identify and manage composites.
     *
     * @property label
     * @type string
     * @default "Composite"
     */

    /**
     * A flag that specifies whether the composite has been modified during the current step.
     * Most `Matter.Composite` methods will automatically set this flag to `true` to inform the engine of changes to be handled.
     * If you need to change it manually, you should use the `Composite.setModified` method.
     *
     * @property isModified
     * @type boolean
     * @default false
     */

    /**
     * The `Composite` that is the parent of this composite. It is automatically managed by the `Matter.Composite` methods.
     *
     * @property parent
     * @type composite
     * @default null
     */

    /**
     * An array of `Body` that are _direct_ children of this composite.
     * To add or remove bodies you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allBodies` method.
     *
     * @property bodies
     * @type body[]
     * @default []
     */

    /**
     * An array of `Constraint` that are _direct_ children of this composite.
     * To add or remove constraints you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allConstraints` method.
     *
     * @property constraints
     * @type constraint[]
     * @default []
     */

    /**
     * An array of `Composite` that are _direct_ children of this composite.
     * To add or remove composites you should use `Composite.add` and `Composite.remove` methods rather than directly modifying this property.
     * If you wish to recursively find all descendants, you should use the `Composite.allComposites` method.
     *
     * @property composites
     * @type composite[]
     * @default []
     */

})();

;   // End src/body/Composite.js


// Begin src/body/World.js

/**
* The `Matter.World` module contains methods for creating and manipulating the world composite.
* A `Matter.World` is a `Matter.Composite` body, which is a collection of `Matter.Body`, `Matter.Constraint` and other `Matter.Composite`.
* A `Matter.World` has a few additional properties including `gravity` and `bounds`.
* It is important to use the functions in the `Matter.Composite` module to modify the world composite, rather than directly modifying its properties.
* There are also a few methods here that alias those in `Matter.Composite` for easier readability.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class World
*/

var World = {};

(function() {

    /**
     * Creates a new world composite. The options parameter is an object that specifies any properties you wish to override the defaults.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @constructor
     * @param {} options
     * @return {world} A new world
     */
    World.create = function(options) {
        var composite = Composite.create();

        var defaults = {
            label: 'World',
            gravity: { x: 0, y: 1 },
            bounds: { 
                min: { x: 0, y: 0 }, 
                max: { x: 800, y: 600 } 
            }
        };
        
        return Common.extend(composite, defaults, options);
    };

    // World is a Composite body
    // see src/module/Outro.js for these aliases:
    
    /**
     * An alias for Composite.clear since World is also a Composite
     * @method clear
     * @param {world} world
     * @param {boolean} keepStatic
     */

    /**
     * An alias for Composite.add since World is also a Composite
     * @method addComposite
     * @param {world} world
     * @param {composite} composite
     * @return {world} The original world with the objects from composite added
     */
    
     /**
      * An alias for Composite.addBody since World is also a Composite
      * @method addBody
      * @param {world} world
      * @param {body} body
      * @return {world} The original world with the body added
      */

     /**
      * An alias for Composite.addConstraint since World is also a Composite
      * @method addConstraint
      * @param {world} world
      * @param {constraint} constraint
      * @return {world} The original world with the constraint added
      */

})();

;   // End src/body/World.js


// Begin src/collision/Contact.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Contact
*/

var Contact = {};

(function() {

    /**
     * Description
     * @method create
     * @param {vertex} vertex
     * @return {contact} A new contact
     */
    Contact.create = function(vertex) {
        return {
            id: Contact.id(vertex),
            vertex: vertex,
            normalImpulse: 0,
            tangentImpulse: 0
        };
    };
    
    /**
     * Description
     * @method id
     * @param {vertex} vertex
     * @return {Number} Unique contactID
     */
    Contact.id = function(vertex) {
        return vertex.body.id + '_' + vertex.index;
    };

})();

;   // End src/collision/Contact.js


// Begin src/collision/Detector.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Detector
*/

// TODO: speculative contacts

var Detector = {};

(function() {

    /**
     * Description
     * @method collisions
     * @param {pair[]} broadphasePairs
     * @param {engine} engine
     * @return {array} collisions
     */
    Detector.collisions = function(broadphasePairs, engine) {
        var collisions = [],
            metrics = engine.metrics,
            pairsTable = engine.pairs.table;

        for (var i = 0; i < broadphasePairs.length; i++) {
            var bodyA = broadphasePairs[i][0], 
                bodyB = broadphasePairs[i][1];

            if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
                continue;
            
            if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
                continue;

            metrics.midphaseTests += 1;

            // mid phase
            if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {

                // find a previous collision we could reuse
                var pairId = Pair.id(bodyA, bodyB),
                    pair = pairsTable[pairId],
                    previousCollision;

                if (pair && pair.isActive) {
                    previousCollision = pair.collision;
                } else {
                    previousCollision = null;
                }

                // narrow phase
                var collision = SAT.collides(bodyA, bodyB, previousCollision);

                metrics.narrowphaseTests += 1;

                if (collision.reused)
                    metrics.narrowReuseCount += 1;

                if (collision.collided) {
                    collisions.push(collision);
                    metrics.narrowDetections += 1;
                }
            }
        }

        return collisions;
    };

    /**
     * Description
     * @method bruteForce
     * @param {body[]} bodies
     * @param {engine} engine
     * @return {array} collisions
     */
    Detector.bruteForce = function(bodies, engine) {
        var collisions = [],
            metrics = engine.metrics,
            pairsTable = engine.pairs.table;

        for (var i = 0; i < bodies.length; i++) {
            for (var j = i + 1; j < bodies.length; j++) {
                var bodyA = bodies[i], 
                    bodyB = bodies[j];

                // NOTE: could share a function for the below, but may drop performance?

                if ((bodyA.isStatic || bodyA.isSleeping) && (bodyB.isStatic || bodyB.isSleeping))
                    continue;
                
                if (!Detector.canCollide(bodyA.collisionFilter, bodyB.collisionFilter))
                    continue;

                metrics.midphaseTests += 1;

                // mid phase
                if (Bounds.overlaps(bodyA.bounds, bodyB.bounds)) {

                    // find a previous collision we could reuse
                    var pairId = Pair.id(bodyA, bodyB),
                        pair = pairsTable[pairId],
                        previousCollision;

                    if (pair && pair.isActive) {
                        previousCollision = pair.collision;
                    } else {
                        previousCollision = null;
                    }

                    // narrow phase
                    var collision = SAT.collides(bodyA, bodyB, previousCollision);

                    metrics.narrowphaseTests += 1;

                    if (collision.reused)
                        metrics.narrowReuseCount += 1;

                    if (collision.collided) {
                        collisions.push(collision);
                        metrics.narrowDetections += 1;
                    }
                }
            }
        }

        return collisions;
    };

    /**
     * Returns `true` if both supplied collision filters will allow a collision to occur.
     * See `body.collisionFilter` for more information.
     * @method canCollide
     * @param {} filterA
     * @param {} filterB
     * @return {bool} `true` if collision can occur
     */
    Detector.canCollide = function(filterA, filterB) {
        if (filterA.group === filterB.group && filterA.group !== 0)
            return filterA.group > 0;

        return (filterA.mask & filterB.category) !== 0 && (filterB.mask & filterA.category) !== 0;
    };

})();


;   // End src/collision/Detector.js


// Begin src/collision/Grid.js

/**
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Grid
*/

var Grid = {};

(function() {

    /**
     * Description
     * @method create
     * @param {} options
     * @return {grid} A new grid
     */
    Grid.create = function(options) {
        var defaults = {
            controller: Grid,
            detector: Detector.collisions,
            buckets: {},
            pairs: {},
            pairsList: [],
            bucketWidth: 48,
            bucketHeight: 48
        };

        return Common.extend(defaults, options);
    };

    /**
     * Description
     * @method update
     * @param {grid} grid
     * @param {body[]} bodies
     * @param {engine} engine
     * @param {boolean} forceUpdate
     */
    Grid.update = function(grid, bodies, engine, forceUpdate) {
        var i, col, row,
            world = engine.world,
            buckets = grid.buckets,
            bucket,
            bucketId,
            metrics = engine.metrics,
            gridChanged = false;

        metrics.broadphaseTests = 0;

        for (i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.isSleeping && !forceUpdate)
                continue;

            // don't update out of world bodies
            if (body.bounds.max.x < 0 || body.bounds.min.x > world.bounds.width
                || body.bounds.max.y < 0 || body.bounds.min.y > world.bounds.height)
                continue;

            var newRegion = _getRegion(grid, body);

            // if the body has changed grid region
            if (!body.region || newRegion.id !== body.region.id || forceUpdate) {

                metrics.broadphaseTests += 1;

                if (!body.region || forceUpdate)
                    body.region = newRegion;

                var union = _regionUnion(newRegion, body.region);

                // update grid buckets affected by region change
                // iterate over the union of both regions
                for (col = union.startCol; col <= union.endCol; col++) {
                    for (row = union.startRow; row <= union.endRow; row++) {
                        bucketId = _getBucketId(col, row);
                        bucket = buckets[bucketId];

                        var isInsideNewRegion = (col >= newRegion.startCol && col <= newRegion.endCol
                                                && row >= newRegion.startRow && row <= newRegion.endRow);

                        var isInsideOldRegion = (col >= body.region.startCol && col <= body.region.endCol
                                                && row >= body.region.startRow && row <= body.region.endRow);

                        // remove from old region buckets
                        if (!isInsideNewRegion && isInsideOldRegion) {
                            if (isInsideOldRegion) {
                                if (bucket)
                                    _bucketRemoveBody(grid, bucket, body);
                            }
                        }

                        // add to new region buckets
                        if (body.region === newRegion || (isInsideNewRegion && !isInsideOldRegion) || forceUpdate) {
                            if (!bucket)
                                bucket = _createBucket(buckets, bucketId);
                            _bucketAddBody(grid, bucket, body);
                        }
                    }
                }

                // set the new region
                body.region = newRegion;

                // flag changes so we can update pairs
                gridChanged = true;
            }
        }

        // update pairs list only if pairs changed (i.e. a body changed region)
        if (gridChanged)
            grid.pairsList = _createActivePairsList(grid);
    };

    /**
     * Description
     * @method clear
     * @param {grid} grid
     */
    Grid.clear = function(grid) {
        grid.buckets = {};
        grid.pairs = {};
        grid.pairsList = [];
    };

    /**
     * Description
     * @method _regionUnion
     * @private
     * @param {} regionA
     * @param {} regionB
     * @return CallExpression
     */
    var _regionUnion = function(regionA, regionB) {
        var startCol = Math.min(regionA.startCol, regionB.startCol),
            endCol = Math.max(regionA.endCol, regionB.endCol),
            startRow = Math.min(regionA.startRow, regionB.startRow),
            endRow = Math.max(regionA.endRow, regionB.endRow);

        return _createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Description
     * @method _getRegion
     * @private
     * @param {} grid
     * @param {} body
     * @return CallExpression
     */
    var _getRegion = function(grid, body) {
        var bounds = body.bounds,
            startCol = Math.floor(bounds.min.x / grid.bucketWidth),
            endCol = Math.floor(bounds.max.x / grid.bucketWidth),
            startRow = Math.floor(bounds.min.y / grid.bucketHeight),
            endRow = Math.floor(bounds.max.y / grid.bucketHeight);

        return _createRegion(startCol, endCol, startRow, endRow);
    };

    /**
     * Description
     * @method _createRegion
     * @private
     * @param {} startCol
     * @param {} endCol
     * @param {} startRow
     * @param {} endRow
     * @return ObjectExpression
     */
    var _createRegion = function(startCol, endCol, startRow, endRow) {
        return { 
            id: startCol + ',' + endCol + ',' + startRow + ',' + endRow,
            startCol: startCol, 
            endCol: endCol, 
            startRow: startRow, 
            endRow: endRow 
        };
    };

    /**
     * Description
     * @method _getBucketId
     * @private
     * @param {} column
     * @param {} row
     * @return BinaryExpression
     */
    var _getBucketId = function(column, row) {
        return column + ',' + row;
    };

    /**
     * Description
     * @method _createBucket
     * @private
     * @param {} buckets
     * @param {} bucketId
     * @return bucket
     */
    var _createBucket = function(buckets, bucketId) {
        var bucket = buckets[bucketId] = [];
        return bucket;
    };

    /**
     * Description
     * @method _bucketAddBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    var _bucketAddBody = function(grid, bucket, body) {
        // add new pairs
        for (var i = 0; i < bucket.length; i++) {
            var bodyB = bucket[i];

            if (body.id === bodyB.id || (body.isStatic && bodyB.isStatic))
                continue;

            // keep track of the number of buckets the pair exists in
            // important for Grid.update to work
            var pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair) {
                pair[2] += 1;
            } else {
                grid.pairs[pairId] = [body, bodyB, 1];
            }
        }

        // add to bodies (after pairs, otherwise pairs with self)
        bucket.push(body);
    };

    /**
     * Description
     * @method _bucketRemoveBody
     * @private
     * @param {} grid
     * @param {} bucket
     * @param {} body
     */
    var _bucketRemoveBody = function(grid, bucket, body) {
        // remove from bucket
        bucket.splice(Common.indexOf(bucket, body), 1);

        // update pair counts
        for (var i = 0; i < bucket.length; i++) {
            // keep track of the number of buckets the pair exists in
            // important for _createActivePairsList to work
            var bodyB = bucket[i],
                pairId = Pair.id(body, bodyB),
                pair = grid.pairs[pairId];

            if (pair)
                pair[2] -= 1;
        }
    };

    /**
     * Description
     * @method _createActivePairsList
     * @private
     * @param {} grid
     * @return pairs
     */
    var _createActivePairsList = function(grid) {
        var pairKeys,
            pair,
            pairs = [];

        // grid.pairs is used as a hashmap
        pairKeys = Common.keys(grid.pairs);

        // iterate over grid.pairs
        for (var k = 0; k < pairKeys.length; k++) {
            pair = grid.pairs[pairKeys[k]];

            // if pair exists in at least one bucket
            // it is a pair that needs further collision testing so push it
            if (pair[2] > 0) {
                pairs.push(pair);
            } else {
                delete grid.pairs[pairKeys[k]];
            }
        }

        return pairs;
    };
    
})();

;   // End src/collision/Grid.js


// Begin src/collision/Pair.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Pair
*/

var Pair = {};

(function() {
    
    /**
     * Description
     * @method create
     * @param {collision} collision
     * @return {pair} A new pair
     */
    Pair.create = function(collision, timestamp) {
        var bodyA = collision.bodyA,
            bodyB = collision.bodyB;

        var pair = {
            id: Pair.id(bodyA, bodyB),
            bodyA: bodyA,
            bodyB: bodyB,
            contacts: {},
            activeContacts: [],
            separation: 0,
            isActive: true,
            timeCreated: timestamp,
            timeUpdated: timestamp,
            inverseMass: bodyA.inverseMass + bodyB.inverseMass,
            friction: Math.min(bodyA.friction, bodyB.friction),
            restitution: Math.max(bodyA.restitution, bodyB.restitution),
            slop: Math.max(bodyA.slop, bodyB.slop)
        };

        Pair.update(pair, collision, timestamp);

        return pair;
    };

    /**
     * Description
     * @method update
     * @param {pair} pair
     * @param {collision} collision
     */
    Pair.update = function(pair, collision, timestamp) {
        var contacts = pair.contacts,
            supports = collision.supports,
            activeContacts = pair.activeContacts;
        
        pair.collision = collision;
        pair.inverseMass = collision.bodyA.inverseMass + collision.bodyB.inverseMass;
        pair.friction = Math.min(collision.bodyA.friction, collision.bodyB.friction);
        pair.restitution = Math.max(collision.bodyA.restitution, collision.bodyB.restitution);
        pair.slop = Math.max(collision.bodyA.slop, collision.bodyB.slop);
        activeContacts.length = 0;
        
        if (collision.collided) {
            for (var i = 0; i < supports.length; i++) {
                var support = supports[i],
                    contactId = Contact.id(support),
                    contact = contacts[contactId];

                if (contact) {
                    activeContacts.push(contact);
                } else {
                    activeContacts.push(contacts[contactId] = Contact.create(support));
                }
            }

            pair.separation = collision.depth;
            Pair.setActive(pair, true, timestamp);
        } else {
            if (pair.isActive === true)
                Pair.setActive(pair, false, timestamp);
        }
    };
    
    /**
     * Description
     * @method setActive
     * @param {pair} pair
     * @param {bool} isActive
     */
    Pair.setActive = function(pair, isActive, timestamp) {
        if (isActive) {
            pair.isActive = true;
            pair.timeUpdated = timestamp;
        } else {
            pair.isActive = false;
            pair.activeContacts.length = 0;
        }
    };

    /**
     * Description
     * @method id
     * @param {body} bodyA
     * @param {body} bodyB
     * @return {number} Unique pairId
     */
    Pair.id = function(bodyA, bodyB) {
        if (bodyA.id < bodyB.id) {
            return bodyA.id + '_' + bodyB.id;
        } else {
            return bodyB.id + '_' + bodyA.id;
        }
    };

})();

;   // End src/collision/Pair.js


// Begin src/collision/Pairs.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Pairs
*/

var Pairs = {};

(function() {
    
    var _pairMaxIdleLife = 1000;

    /**
     * Creates a new pairs structure
     * @method create
     * @param {object} options
     * @return {pairs} A new pairs structure
     */
    Pairs.create = function(options) {
        return Common.extend({ 
            table: {},
            list: [],
            collisionStart: [],
            collisionActive: [],
            collisionEnd: []
        }, options);
    };

    /**
     * Description
     * @method update
     * @param {object} pairs
     * @param {collision[]} collisions
     */
    Pairs.update = function(pairs, collisions, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            collisionStart = pairs.collisionStart,
            collisionEnd = pairs.collisionEnd,
            collisionActive = pairs.collisionActive,
            activePairIds = [],
            collision,
            pairId,
            pair,
            i;

        // clear collision state arrays, but maintain old reference
        collisionStart.length = 0;
        collisionEnd.length = 0;
        collisionActive.length = 0;

        for (i = 0; i < collisions.length; i++) {
            collision = collisions[i];

            if (collision.collided) {
                pairId = Pair.id(collision.bodyA, collision.bodyB);
                activePairIds.push(pairId);

                pair = pairsTable[pairId];
                
                if (pair) {
                    // pair already exists (but may or may not be active)
                    if (pair.isActive) {
                        // pair exists and is active
                        collisionActive.push(pair);
                    } else {
                        // pair exists but was inactive, so a collision has just started again
                        collisionStart.push(pair);
                    }

                    // update the pair
                    Pair.update(pair, collision, timestamp);
                } else {
                    // pair did not exist, create a new pair
                    pair = Pair.create(collision, timestamp);
                    pairsTable[pairId] = pair;

                    // push the new pair
                    collisionStart.push(pair);
                    pairsList.push(pair);
                }
            }
        }

        // deactivate previously active pairs that are now inactive
        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            if (pair.isActive && Common.indexOf(activePairIds, pair.id) === -1) {
                Pair.setActive(pair, false, timestamp);
                collisionEnd.push(pair);
            }
        }
    };
    
    /**
     * Description
     * @method removeOld
     * @param {object} pairs
     */
    Pairs.removeOld = function(pairs, timestamp) {
        var pairsList = pairs.list,
            pairsTable = pairs.table,
            indexesToRemove = [],
            pair,
            collision,
            pairIndex,
            i;

        for (i = 0; i < pairsList.length; i++) {
            pair = pairsList[i];
            collision = pair.collision;
            
            // never remove sleeping pairs
            if (collision.bodyA.isSleeping || collision.bodyB.isSleeping) {
                pair.timeUpdated = timestamp;
                continue;
            }

            // if pair is inactive for too long, mark it to be removed
            if (timestamp - pair.timeUpdated > _pairMaxIdleLife) {
                indexesToRemove.push(i);
            }
        }

        // remove marked pairs
        for (i = 0; i < indexesToRemove.length; i++) {
            pairIndex = indexesToRemove[i] - i;
            pair = pairsList[pairIndex];
            delete pairsTable[pair.id];
            pairsList.splice(pairIndex, 1);
        }
    };

    /**
     * Clears the given pairs structure
     * @method create
     * @param {object} options
     * @param {pairs} pairs
     */
    Pairs.clear = function(pairs) {
        pairs.table = {};
        pairs.list.length = 0;
        pairs.collisionStart.length = 0;
        pairs.collisionActive.length = 0;
        pairs.collisionEnd.length = 0;
        return pairs;
    };

})();

;   // End src/collision/Pairs.js


// Begin src/collision/Query.js

/**
* The `Matter.Query` module contains methods for performing collision queries.
*
* @class Query
*/

var Query = {};

(function() {

    /**
     * Casts a ray segment against a set of bodies and returns all collisions, ray width is optional. Intersection points are not provided.
     * @method ray
     * @param {body[]} bodies
     * @param {vector} startPoint
     * @param {vector} endPoint
     * @param {number} [rayWidth]
     * @return {object[]} Collisions
     */
    Query.ray = function(bodies, startPoint, endPoint, rayWidth) {
        rayWidth = rayWidth || Number.MIN_VALUE;

        var rayAngle = Vector.angle(startPoint, endPoint),
            rayLength = Vector.magnitude(Vector.sub(startPoint, endPoint)),
            rayX = (endPoint.x + startPoint.x) * 0.5,
            rayY = (endPoint.y + startPoint.y) * 0.5,
            ray = Bodies.rectangle(rayX, rayY, rayLength, rayWidth, { angle: rayAngle }),
            collisions = [];

        for (var i = 0; i < bodies.length; i++) {
            var bodyA = bodies[i];

            if (Bounds.overlaps(bodyA.bounds, ray.bounds)) {
                var collision = SAT.collides(bodyA, ray);
                if (collision.collided) {
                    collision.body = collision.bodyA = collision.bodyB = bodyA;
                    collisions.push(collision);
                }
            }
        }

        return collisions;
    };

    /**
     * Returns all bodies whose bounds are inside (or outside if set) the given set of bounds, from the given set of bodies.
     * @method region
     * @param {body[]} bodies
     * @param {bounds} bounds
     * @param {bool} [outside=false]
     * @return {body[]} The bodies matching the query
     */
    Query.region = function(bodies, bounds, outside) {
        var result = [];

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                overlaps = Bounds.overlaps(body.bounds, bounds);
            if ((overlaps && !outside) || (!overlaps && outside))
                result.push(body);
        }

        return result;
    };

})();

;   // End src/collision/Query.js


// Begin src/collision/Resolver.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Resolver
*/

var Resolver = {};

(function() {

    var _restingThresh = 4,
        _positionDampen = 0.2,
        _positionWarming = 0.6;

    /**
     * Description
     * @method solvePosition
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Resolver.solvePosition = function(pairs, timeScale) {
        var i,
            pair,
            collision,
            bodyA,
            bodyB,
            vertex,
            vertexCorrected,
            normal,
            bodyBtoA;

        // find impulses required to resolve penetration
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            vertex = collision.supports[0];
            vertexCorrected = collision.supportCorrected;
            normal = collision.normal;

            // get current separation between body edges involved in collision
            bodyBtoA = Vector.sub(Vector.add(bodyB.positionImpulse, vertex), 
                                    Vector.add(bodyA.positionImpulse, vertexCorrected));

            pair.separation = Vector.dot(normal, bodyBtoA);
        }
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            normal = collision.normal;
            positionImpulse = ((pair.separation * _positionDampen) - pair.slop) * timeScale;
        
            if (bodyA.isStatic || bodyB.isStatic)
                positionImpulse *= 2;
            
            if (!(bodyA.isStatic || bodyA.isSleeping)) {
                bodyA.positionImpulse.x += normal.x * positionImpulse;
                bodyA.positionImpulse.y += normal.y * positionImpulse;
            }

            if (!(bodyB.isStatic || bodyB.isSleeping)) {
                bodyB.positionImpulse.x -= normal.x * positionImpulse;
                bodyB.positionImpulse.y -= normal.y * positionImpulse;
            }
        }
    };

    /**
     * Description
     * @method postSolvePosition
     * @param {body[]} bodies
     */
    Resolver.postSolvePosition = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (body.positionImpulse.x !== 0 || body.positionImpulse.y !== 0) {
                // move the body without changing velocity
                body.position.x += body.positionImpulse.x;
                body.position.y += body.positionImpulse.y;
                body.positionPrev.x += body.positionImpulse.x;
                body.positionPrev.y += body.positionImpulse.y;

                // update body geometry
                Vertices.translate(body.vertices, body.positionImpulse);
                Bounds.update(body.bounds, body.vertices, body.velocity);
                
                // dampen accumulator to warm the next step
                body.positionImpulse.x *= _positionWarming;
                body.positionImpulse.y *= _positionWarming;
            }
        }
    };

    /**
     * Description
     * @method preSolveVelocity
     * @param {pair[]} pairs
     */
    Resolver.preSolveVelocity = function(pairs) {
        var impulse = {},
            i,
            j,
            pair,
            contacts,
            collision,
            bodyA,
            bodyB,
            normal,
            tangent,
            contact,
            contactVertex,
            normalImpulse,
            tangentImpulse,
            offset;
        
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            contacts = pair.activeContacts;
            collision = pair.collision;
            bodyA = collision.bodyA;
            bodyB = collision.bodyB;
            normal = collision.normal;
            tangent = collision.tangent;
                
            // resolve each contact
            for (j = 0; j < contacts.length; j++) {
                contact = contacts[j];
                contactVertex = contact.vertex;
                normalImpulse = contact.normalImpulse;
                tangentImpulse = contact.tangentImpulse;
                
                // total impulse from contact
                impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                
                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    offset = Vector.sub(contactVertex, bodyA.position);
                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                    bodyA.anglePrev += Vector.cross(offset, impulse) * bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    offset = Vector.sub(contactVertex, bodyB.position);
                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                    bodyB.anglePrev -= Vector.cross(offset, impulse) * bodyB.inverseInertia;
                }
            }
        }
    };

    /**
     * Description
     * @method solveVelocity
     * @param {pair[]} pairs
     */
    Resolver.solveVelocity = function(pairs, timeScale) {
        var impulse = {},
            timeScaleSquared = timeScale * timeScale;
        
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            if (!pair.isActive)
                continue;
            
            var collision = pair.collision,
                bodyA = collision.bodyA,
                bodyB = collision.bodyB,
                normal = collision.normal,
                tangent = collision.tangent,
                contacts = pair.activeContacts,
                contactShare = 1 / contacts.length;

            // update body velocities
            bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
            bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
            bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
            bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
            bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
            bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

            // resolve each contact
            for (var j = 0; j < contacts.length; j++) {
                var contact = contacts[j],
                    contactVertex = contact.vertex,
                    offsetA = Vector.sub(contactVertex, bodyA.position),
                    offsetB = Vector.sub(contactVertex, bodyB.position),
                    velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity)),
                    velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity)), 
                    relativeVelocity = Vector.sub(velocityPointA, velocityPointB),
                    normalVelocity = Vector.dot(normal, relativeVelocity);

                var tangentVelocity = Vector.dot(tangent, relativeVelocity),
                    tangentSpeed = Common.abs(tangentVelocity),
                    tangentVelocityDirection = Common.sign(tangentVelocity);

                // raw impulses
                var normalImpulse = (1 + pair.restitution) * normalVelocity,
                    normalForce = Common.clamp(pair.separation + normalVelocity, 0, 1);

                // coulomb friction
                var tangentImpulse = tangentVelocity;
                if (tangentSpeed > normalForce * pair.friction * timeScaleSquared)
                    tangentImpulse = normalForce * pair.friction * timeScaleSquared * tangentVelocityDirection;

                // modify impulses accounting for mass, inertia and offset
                var oAcN = Vector.cross(offsetA, normal),
                    oBcN = Vector.cross(offsetB, normal),
                    share = contactShare / (pair.inverseMass + bodyA.inverseInertia * oAcN * oAcN  + bodyB.inverseInertia * oBcN * oBcN);
                normalImpulse *= share;
                tangentImpulse *= share;
                
                // handle high velocity and resting collisions separately
                if (normalVelocity < 0 && normalVelocity * normalVelocity > _restingThresh * timeScaleSquared) {
                    // high velocity so clear cached contact impulse
                    contact.normalImpulse = 0;
                    contact.tangentImpulse = 0;
                } else {
                    // solve resting collision constraints using Erin Catto's method (GDC08)

                    // impulse constraint, tends to 0
                    var contactNormalImpulse = contact.normalImpulse;
                    contact.normalImpulse = Math.min(contact.normalImpulse + normalImpulse, 0);
                    normalImpulse = contact.normalImpulse - contactNormalImpulse;
                    
                    // tangent impulse, tends to -maxFriction or maxFriction
                    var contactTangentImpulse = contact.tangentImpulse;
                    contact.tangentImpulse = Common.clamp(contact.tangentImpulse + tangentImpulse, -tangentSpeed, tangentSpeed);
                    tangentImpulse = contact.tangentImpulse - contactTangentImpulse;
                }
                
                // total impulse from contact
                impulse.x = (normal.x * normalImpulse) + (tangent.x * tangentImpulse);
                impulse.y = (normal.y * normalImpulse) + (tangent.y * tangentImpulse);
                
                // apply impulse from contact
                if (!(bodyA.isStatic || bodyA.isSleeping)) {
                    bodyA.positionPrev.x += impulse.x * bodyA.inverseMass;
                    bodyA.positionPrev.y += impulse.y * bodyA.inverseMass;
                    bodyA.anglePrev += Vector.cross(offsetA, impulse) * bodyA.inverseInertia;
                }

                if (!(bodyB.isStatic || bodyB.isSleeping)) {
                    bodyB.positionPrev.x -= impulse.x * bodyB.inverseMass;
                    bodyB.positionPrev.y -= impulse.y * bodyB.inverseMass;
                    bodyB.anglePrev -= Vector.cross(offsetB, impulse) * bodyB.inverseInertia;
                }
            }
        }
    };

})();

;   // End src/collision/Resolver.js


// Begin src/collision/SAT.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class SAT
*/

// TODO: true circles and curves

var SAT = {};

(function() {

    /**
     * Description
     * @method collides
     * @param {body} bodyA
     * @param {body} bodyB
     * @param {collision} previousCollision
     * @return {collision} collision
     */
    SAT.collides = function(bodyA, bodyB, previousCollision) {
        var overlapAB,
            overlapBA, 
            minOverlap,
            collision,
            prevCol = previousCollision,
            canReusePrevCol = false;

        if (prevCol) {
            // estimate total motion
            var motion = bodyA.speed * bodyA.speed + bodyA.angularSpeed * bodyA.angularSpeed
                       + bodyB.speed * bodyB.speed + bodyB.angularSpeed * bodyB.angularSpeed;

            // we may be able to (partially) reuse collision result 
            // but only safe if collision was resting
            canReusePrevCol = prevCol && prevCol.collided && motion < 0.2;

            // reuse collision object
            collision = prevCol;
        } else {
            collision = { collided: false, bodyA: bodyA, bodyB: bodyB };
        }

        if (prevCol && canReusePrevCol) {
            // if we can reuse the collision result
            // we only need to test the previously found axis
            var axes = [prevCol.bodyA.axes[prevCol.axisNumber]];

            minOverlap = _overlapAxes(prevCol.bodyA.vertices, prevCol.bodyB.vertices, axes);
            collision.reused = true;

            if (minOverlap.overlap <= 0) {
                collision.collided = false;
                return collision;
            }
        } else {
            // if we can't reuse a result, perform a full SAT test

            overlapAB = _overlapAxes(bodyA.vertices, bodyB.vertices, bodyA.axes);

            if (overlapAB.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            overlapBA = _overlapAxes(bodyB.vertices, bodyA.vertices, bodyB.axes);

            if (overlapBA.overlap <= 0) {
                collision.collided = false;
                return collision;
            }

            if (overlapAB.overlap < overlapBA.overlap) {
                minOverlap = overlapAB;
                collision.bodyA = bodyA;
                collision.bodyB = bodyB;
            } else {
                minOverlap = overlapBA;
                collision.bodyA = bodyB;
                collision.bodyB = bodyA;
            }

            // important for reuse later
            collision.axisNumber = minOverlap.axisNumber;
        }

        collision.collided = true;
        collision.normal = minOverlap.axis;
        collision.depth = minOverlap.overlap;
        
        bodyA = collision.bodyA;
        bodyB = collision.bodyB;

        // ensure normal is facing away from bodyA
        if (Vector.dot(collision.normal, Vector.sub(bodyB.position, bodyA.position)) > 0) 
            collision.normal = Vector.neg(collision.normal);

        collision.tangent = Vector.perp(collision.normal);

        collision.penetration = { 
            x: collision.normal.x * collision.depth, 
            y: collision.normal.y * collision.depth 
        };

        // find support points, there is always either exactly one or two
        var verticesB = _findSupports(bodyA, bodyB, collision.normal),
            supports = collision.supports || [];
        supports.length = 0;

        // find the supports from bodyB that are inside bodyA
        if (Vertices.contains(bodyA.vertices, verticesB[0]))
            supports.push(verticesB[0]);

        if (Vertices.contains(bodyA.vertices, verticesB[1]))
            supports.push(verticesB[1]);

        // find the supports from bodyA that are inside bodyB
        if (supports.length < 2) {
            var verticesA = _findSupports(bodyB, bodyA, Vector.neg(collision.normal));
                
            if (Vertices.contains(bodyB.vertices, verticesA[0]))
                supports.push(verticesA[0]);

            if (supports.length < 2 && Vertices.contains(bodyB.vertices, verticesA[1]))
                supports.push(verticesA[1]);
        }

        // account for the edge case of overlapping but no vertex containment
        if (supports.length < 2)
            supports = [verticesB[0]];
        
        collision.supports = supports;
        collision.supportCorrected = Vector.sub(supports[0], collision.penetration);

        return collision;
    };

    /**
     * Description
     * @method _overlapAxes
     * @private
     * @param {} verticesA
     * @param {} verticesB
     * @param {} axes
     * @return result
     */
    var _overlapAxes = function(verticesA, verticesB, axes) {
        var projectionA = {}, 
            projectionB = {},
            result = { overlap: Number.MAX_VALUE },
            overlap,
            axis;

        for (var i = 0; i < axes.length; i++) {
            axis = axes[i];

            _projectToAxis(projectionA, verticesA, axis);
            _projectToAxis(projectionB, verticesB, axis);

            overlap = projectionA.min < projectionB.min 
                        ? projectionA.max - projectionB.min 
                        : projectionB.max - projectionA.min;

            if (overlap <= 0) {
                result.overlap = overlap;
                return result;
            }

            if (overlap < result.overlap) {
                result.overlap = overlap;
                result.axis = axis;
                result.axisNumber = i;
            }
        }

        return result;
    };

    /**
     * Description
     * @method _projectToAxis
     * @private
     * @param {} projection
     * @param {} vertices
     * @param {} axis
     */
    var _projectToAxis = function(projection, vertices, axis) {
        var min = Vector.dot(vertices[0], axis),
            max = min;

        for (var i = 1; i < vertices.length; i += 1) {
            var dot = Vector.dot(vertices[i], axis);

            if (dot > max) { 
                max = dot; 
            } else if (dot < min) { 
                min = dot; 
            }
        }

        projection.min = min;
        projection.max = max;
    };
    
    /**
     * Description
     * @method _findSupports
     * @private
     * @param {} bodyA
     * @param {} bodyB
     * @param {} normal
     * @return ArrayExpression
     */
    var _findSupports = function(bodyA, bodyB, normal) {
        var nearestDistance = Number.MAX_VALUE,
            vertexToBody = { x: 0, y: 0 },
            vertices = bodyB.vertices,
            bodyAPosition = bodyA.position,
            distance,
            vertex,
            vertexA = vertices[0],
            vertexB = vertices[1];

        // find closest vertex on bodyB
        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            vertexToBody.x = vertex.x - bodyAPosition.x;
            vertexToBody.y = vertex.y - bodyAPosition.y;
            distance = -Vector.dot(normal, vertexToBody);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                vertexA = vertex;
            }
        }

        // find next closest vertex using the two connected to it
        var prevIndex = vertexA.index - 1 >= 0 ? vertexA.index - 1 : vertices.length - 1;
        vertex = vertices[prevIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        nearestDistance = -Vector.dot(normal, vertexToBody);
        vertexB = vertex;

        var nextIndex = (vertexA.index + 1) % vertices.length;
        vertex = vertices[nextIndex];
        vertexToBody.x = vertex.x - bodyAPosition.x;
        vertexToBody.y = vertex.y - bodyAPosition.y;
        distance = -Vector.dot(normal, vertexToBody);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            vertexB = vertex;
        }

        return [vertexA, vertexB];
    };

})();

;   // End src/collision/SAT.js


// Begin src/constraint/Constraint.js

/**
* The `Matter.Constraint` module contains methods for creating and manipulating constraints.
* Constraints are used for specifying that a fixed distance must be maintained between two bodies (or a body and a fixed world-space position).
* The stiffness of constraints can be modified to create springs or elastic.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Constraint
*/

// TODO: fix instabillity issues with torque
// TODO: linked constraints
// TODO: breakable constraints
// TODO: collidable constraints
// TODO: allow constrained bodies to sleep
// TODO: handle 0 length constraints properly
// TODO: impulse caching and warming

var Constraint = {};

(function() {

    var _minLength = 0.000001,
        _minDifference = 0.001;

    /**
     * Creates a new constraint.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {} options
     * @return {constraint} constraint
     */
    Constraint.create = function(options) {
        var constraint = options;

        // if bodies defined but no points, use body centre
        if (constraint.bodyA && !constraint.pointA)
            constraint.pointA = { x: 0, y: 0 };
        if (constraint.bodyB && !constraint.pointB)
            constraint.pointB = { x: 0, y: 0 };

        // calculate static length using initial world space points
        var initialPointA = constraint.bodyA ? Vector.add(constraint.bodyA.position, constraint.pointA) : constraint.pointA,
            initialPointB = constraint.bodyB ? Vector.add(constraint.bodyB.position, constraint.pointB) : constraint.pointB,
            length = Vector.magnitude(Vector.sub(initialPointA, initialPointB));
    
        constraint.length = constraint.length || length || _minLength;

        // render
        var render = {
            visible: true,
            lineWidth: 2,
            strokeStyle: '#666'
        };
        
        constraint.render = Common.extend(render, constraint.render);

        // option defaults
        constraint.id = constraint.id || Common.nextId();
        constraint.label = constraint.label || 'Constraint';
        constraint.type = 'constraint';
        constraint.stiffness = constraint.stiffness || 1;
        constraint.angularStiffness = constraint.angularStiffness || 0;
        constraint.angleA = constraint.bodyA ? constraint.bodyA.angle : constraint.angleA;
        constraint.angleB = constraint.bodyB ? constraint.bodyB.angle : constraint.angleB;

        return constraint;
    };

    /**
     * Description
     * @private
     * @method solveAll
     * @param {constraint[]} constraints
     * @param {number} timeScale
     */
    Constraint.solveAll = function(constraints, timeScale) {
        for (var i = 0; i < constraints.length; i++) {
            Constraint.solve(constraints[i], timeScale);
        }
    };

    /**
     * Description
     * @private
     * @method solve
     * @param {constraint} constraint
     * @param {number} timeScale
     */
    Constraint.solve = function(constraint, timeScale) {
        var bodyA = constraint.bodyA,
            bodyB = constraint.bodyB,
            pointA = constraint.pointA,
            pointB = constraint.pointB;

        // update reference angle
        if (bodyA && !bodyA.isStatic) {
            constraint.pointA = Vector.rotate(pointA, bodyA.angle - constraint.angleA);
            constraint.angleA = bodyA.angle;
        }
        
        // update reference angle
        if (bodyB && !bodyB.isStatic) {
            constraint.pointB = Vector.rotate(pointB, bodyB.angle - constraint.angleB);
            constraint.angleB = bodyB.angle;
        }

        var pointAWorld = pointA,
            pointBWorld = pointB;

        if (bodyA) pointAWorld = Vector.add(bodyA.position, pointA);
        if (bodyB) pointBWorld = Vector.add(bodyB.position, pointB);

        if (!pointAWorld || !pointBWorld)
            return;

        var delta = Vector.sub(pointAWorld, pointBWorld),
            currentLength = Vector.magnitude(delta);

        // prevent singularity
        if (currentLength === 0)
            currentLength = _minLength;

        // solve distance constraint with Gauss-Siedel method
        var difference = (currentLength - constraint.length) / currentLength,
            normal = Vector.div(delta, currentLength),
            force = Vector.mult(delta, difference * 0.5 * constraint.stiffness * timeScale * timeScale);
        
        // if difference is very small, we can skip
        if (Common.abs(1 - (currentLength / constraint.length)) < _minDifference * timeScale)
            return;

        var velocityPointA,
            velocityPointB,
            offsetA,
            offsetB,
            oAn,
            oBn,
            bodyADenom,
            bodyBDenom;
    
        if (bodyA && !bodyA.isStatic) {
            // point body offset
            offsetA = { 
                x: pointAWorld.x - bodyA.position.x + force.x, 
                y: pointAWorld.y - bodyA.position.y + force.y
            };
            
            // update velocity
            bodyA.velocity.x = bodyA.position.x - bodyA.positionPrev.x;
            bodyA.velocity.y = bodyA.position.y - bodyA.positionPrev.y;
            bodyA.angularVelocity = bodyA.angle - bodyA.anglePrev;
            
            // find point velocity and body mass
            velocityPointA = Vector.add(bodyA.velocity, Vector.mult(Vector.perp(offsetA), bodyA.angularVelocity));
            oAn = Vector.dot(offsetA, normal);
            bodyADenom = bodyA.inverseMass + bodyA.inverseInertia * oAn * oAn;
        } else {
            velocityPointA = { x: 0, y: 0 };
            bodyADenom = bodyA ? bodyA.inverseMass : 0;
        }
            
        if (bodyB && !bodyB.isStatic) {
            // point body offset
            offsetB = { 
                x: pointBWorld.x - bodyB.position.x - force.x, 
                y: pointBWorld.y - bodyB.position.y - force.y 
            };
            
            // update velocity
            bodyB.velocity.x = bodyB.position.x - bodyB.positionPrev.x;
            bodyB.velocity.y = bodyB.position.y - bodyB.positionPrev.y;
            bodyB.angularVelocity = bodyB.angle - bodyB.anglePrev;

            // find point velocity and body mass
            velocityPointB = Vector.add(bodyB.velocity, Vector.mult(Vector.perp(offsetB), bodyB.angularVelocity));
            oBn = Vector.dot(offsetB, normal);
            bodyBDenom = bodyB.inverseMass + bodyB.inverseInertia * oBn * oBn;
        } else {
            velocityPointB = { x: 0, y: 0 };
            bodyBDenom = bodyB ? bodyB.inverseMass : 0;
        }
        
        var relativeVelocity = Vector.sub(velocityPointB, velocityPointA),
            normalImpulse = Vector.dot(normal, relativeVelocity) / (bodyADenom + bodyBDenom);
    
        if (normalImpulse > 0) normalImpulse = 0;
    
        var normalVelocity = {
            x: normal.x * normalImpulse, 
            y: normal.y * normalImpulse
        };

        var torque;
 
        if (bodyA && !bodyA.isStatic) {
            torque = Vector.cross(offsetA, normalVelocity) * bodyA.inverseInertia * (1 - constraint.angularStiffness);

            Sleeping.set(bodyA, false);
            
            // clamp to prevent instabillity
            // TODO: solve this properlly
            torque = Common.clamp(torque, -0.01, 0.01);

            // keep track of applied impulses for post solving
            bodyA.constraintImpulse.x -= force.x;
            bodyA.constraintImpulse.y -= force.y;
            bodyA.constraintImpulse.angle += torque;

            // apply forces
            bodyA.position.x -= force.x;
            bodyA.position.y -= force.y;
            bodyA.angle += torque;
        }

        if (bodyB && !bodyB.isStatic) {
            torque = Vector.cross(offsetB, normalVelocity) * bodyB.inverseInertia * (1 - constraint.angularStiffness);

            Sleeping.set(bodyB, false);
            
            // clamp to prevent instabillity
            // TODO: solve this properlly
            torque = Common.clamp(torque, -0.01, 0.01);

            // keep track of applied impulses for post solving
            bodyB.constraintImpulse.x += force.x;
            bodyB.constraintImpulse.y += force.y;
            bodyB.constraintImpulse.angle -= torque;
            
            // apply forces
            bodyB.position.x += force.x;
            bodyB.position.y += force.y;
            bodyB.angle -= torque;
        }

    };

    /**
     * Performs body updates required after solving constraints
     * @private
     * @method postSolveAll
     * @param {body[]} bodies
     */
    Constraint.postSolveAll = function(bodies) {
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                impulse = body.constraintImpulse;

            // update geometry and reset
            Vertices.translate(body.vertices, impulse);

            if (impulse.angle !== 0) {
                Vertices.rotate(body.vertices, impulse.angle, body.position);
                Axes.rotate(body.axes, impulse.angle);
                impulse.angle = 0;
            }

            Bounds.update(body.bounds, body.vertices);

            impulse.x = 0;
            impulse.y = 0;
        }
    };

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * An integer `Number` uniquely identifying number generated in `Composite.create` by `Common.nextId`.
     *
     * @property id
     * @type number
     */

    /**
     * A `String` denoting the type of object.
     *
     * @property type
     * @type string
     * @default "constraint"
     */

    /**
     * An arbitrary `String` name to help the user identify and manage bodies.
     *
     * @property label
     * @type string
     * @default "Constraint"
     */

    /**
     * An `Object` that defines the rendering properties to be consumed by the module `Matter.Render`.
     *
     * @property render
     * @type object
     */

    /**
     * A flag that indicates if the constraint should be rendered.
     *
     * @property render.visible
     * @type boolean
     * @default true
     */

    /**
     * A `Number` that defines the line width to use when rendering the constraint outline.
     * A value of `0` means no outline will be rendered.
     *
     * @property render.lineWidth
     * @type number
     * @default 2
     */

    /**
     * A `String` that defines the stroke style to use when rendering the constraint outline.
     * It is the same as when using a canvas, so it accepts CSS style property values.
     *
     * @property render.strokeStyle
     * @type string
     * @default a random colour
     */

    /**
     * The first possible `Body` that this constraint is attached to.
     *
     * @property bodyA
     * @type body
     * @default null
     */

    /**
     * The second possible `Body` that this constraint is attached to.
     *
     * @property bodyB
     * @type body
     * @default null
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointA
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Vector` that specifies the offset of the constraint from center of the `constraint.bodyA` if defined, otherwise a world-space position.
     *
     * @property pointB
     * @type vector
     * @default { x: 0, y: 0 }
     */

    /**
     * A `Number` that specifies the stiffness of the constraint, i.e. the rate at which it returns to its resting `constraint.length`.
     * A value of `1` means the constraint should be very stiff.
     * A value of `0.2` means the constraint acts like a soft spring.
     *
     * @property stiffness
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the target resting length of the constraint. 
     * It is calculated automatically in `Constraint.create` from intial positions of the `constraint.bodyA` and `constraint.bodyB`.
     *
     * @property length
     * @type number
     */

})();

;   // End src/constraint/Constraint.js


// Begin src/core/Common.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Common
*/

var Common = {};

(function() {

    Common._nextId = 0;
    Common._seed = 0;

    /**
     * Description
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        args = Array.prototype.slice.call(arguments, argsStart);

        for (var i = 0; i < args.length; i++) {
            var source = args[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Description
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Description
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Description
     * @method shadeColor
     * @param {string} color
     * @param {number} percent
     * @return {string} A hex colour string made by lightening or darkening color by percent
     */
    Common.shadeColor = function(color, percent) {   
        // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color
        var colorInteger = parseInt(color.slice(1),16), 
            amount = Math.round(2.55 * percent), 
            R = (colorInteger >> 16) + amount, 
            B = (colorInteger >> 8 & 0x00FF) + amount, 
            G = (colorInteger & 0x0000FF) + amount;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R :255) * 0x10000 
                + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 
                + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    };

    /**
     * Description
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Description
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Description
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        // http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
        try {
            return obj instanceof HTMLElement;
        }
        catch(e){
            return (typeof obj==="object") &&
              (obj.nodeType===1) && (typeof obj.style === "object") &&
              (typeof obj.ownerDocument ==="object");
        }
    };
    
    /**
     * Description
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Description
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Description
     * @method now
     * @return {number} the current timestamp (high-res if avaliable)
     */
    Common.now = function() {
        // http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        // https://gist.github.com/davidwaterston/2982531
        
        var perf = window.performance;

        if (perf) {
            perf.now = perf.now || perf.webkitNow || perf.msNow || perf.oNow || perf.mozNow;
            return +(perf.now());
        }
        
        return +(new Date());
    };

    
    /**
     * Description
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    /**
     * Converts a CSS hex colour string into an integer
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * A wrapper for console.log, for providing errors and warnings
     * @method log
     * @param {string} message
     * @param {string} type
     */
    Common.log = function(message, type) {
        if (!console || !console.log)
            return;

        var style;

        switch (type) {

        case 'warn':
            style = 'color: coral';
            break;
        case 'error':
            style = 'color: red';
            break;

        }

        console.log('%c [Matter] ' + type + ': ' + message, style);
    };

    /**
     * Returns the next unique sequential ID
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };
	
    /**
     * Wrap sin to be browser-agnostic
     * @method sin
     * @param {x} A number (given in radians)
     */
    Common.sin = function(x) {
        return parseFloat(Math.sin(x).toFixed(8));
    };

    /**
     * Wrap cos to be browser-agnostic
     * @method cos
     * @param {x} A number (given in radians)
     */
    Common.cos = function(x) {
        return parseFloat(Math.cos(x).toFixed(8));
    };

    /**
     * A cross browser compatible indexOf implementation
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    var _seededRandom = function() {
        // https://gist.github.com/ngryman/3830489
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
	};

    /**
     * Wrap sqrt to be browser-agnostic
     * @method sqrt
     * @param {x} A number
     */
	Common.sqrt = function(x) {
		return parseFloat(Math.sqrt(x).toFixed(8));
    };

    /**
     * Wrap abs to be browser-agnostic
     * @method abs
     * @param {x} A number
     */
	Common.abs = function(x) {
        return parseFloat(Math.abs(x).toFixed(8));
    };

    /**
     * Our own indexOf implementation since IE6-8 does not include one for arrays
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     */
    Common.indexOf = function(haystack, needle) {
        if(haystack.indexOf) {
            return haystack.indexOf(needle);
        } else {
            for(var i = 0; i < haystack.length; i++) {
                if(haystack[i] == needle) {
                    return i;
                }
            }
        }
        return -1;
    };

})();

;   // End src/core/Common.js


// Begin src/core/Engine.js

/**
* The `Matter.Engine` module contains methods for creating and manipulating engines.
* An engine is a controller that manages updating and rendering the simulation of the world.
* See `Matter.Runner` for an optional game loop utility.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Engine
*/

var Engine = {};

(function() {

    var _fps = 60,
        _delta = 1000 / _fps;

    /**
     * Creates a new engine. The options parameter is an object that specifies any properties you wish to override the defaults.
     * All properties have default values, and many are pre-calculated automatically based on other properties.
     * See the properites section below for detailed information on what you can pass via the `options` object.
     * @method create
     * @param {HTMLElement} element
     * @param {object} [options]
     * @return {engine} engine
     */
    Engine.create = function(element, options) {

        // options may be passed as the first (and only) argument
        options = Common.isElement(element) ? options : element;
        element = Common.isElement(element) ? element : null;

        var defaults = {
            enabled: true,
            positionIterations: 6,
            velocityIterations: 4,
            constraintIterations: 2,
            enableSleeping: false,
            events: [],
            timing: {
                fps: _fps,
                timestamp: 0,
                delta: _delta,
                correction: 1,
                deltaMin: 1000 / _fps,
                deltaMax: 1000 / (_fps * 0.5),
                timeScale: 1,
                isFixed: false,
                frameRequestId: 0
            },
            render: {
                element: element,
                controller: Render
            },
            broadphase: {
                controller: Grid
            }
        };
        
        var engine = Common.extend(defaults, options);

        engine.render = engine.render.controller.create(engine.render);
        engine.world = World.create(engine.world);
        engine.pairs = Pairs.create();
        engine.metrics = engine.metrics || Metrics.create();
        engine.broadphase = engine.broadphase.controller.create(engine.broadphase);

        return engine;
    };

    /**
     * Moves the simulation forward in time by `delta` ms. 
     * Triggers `beforeUpdate` and `afterUpdate` events.
     * Triggers `collisionStart`, `collisionActive` and `collisionEnd` events.
     * @method update
     * @param {engine} engine
     * @param {number} delta
     * @param {number} [correction]
     */
    Engine.update = function(engine, delta, correction) {
        correction = (typeof correction !== 'undefined') ? correction : 1;

        var world = engine.world,
            timing = engine.timing,
            broadphase = engine.broadphase,
            broadphasePairs = [],
            i;

        // increment timestamp
        timing.timestamp += delta * timing.timeScale;
        timing.correction = correction;

        // create an event object
        var event = {
            timestamp: engine.timing.timestamp
        };

        Events.trigger(engine, 'beforeUpdate', event);

        // get lists of all bodies and constraints, no matter what composites they are in
        var allBodies = Composite.allBodies(world),
            allConstraints = Composite.allConstraints(world);

        // reset metrics logging
        Metrics.reset(engine.metrics);

        // if sleeping enabled, call the sleeping controller
        if (engine.enableSleeping)
            Sleeping.update(allBodies, timing.timeScale);

        // applies gravity to all bodies
        Body.applyGravityAll(allBodies, world.gravity);

        // update all body position and rotation by integration
        Body.updateAll(allBodies, delta, timing.timeScale, correction, world.bounds);

        // update all constraints
        for (i = 0; i < engine.constraintIterations; i++) {
            Constraint.solveAll(allConstraints, timing.timeScale);
        }
        Constraint.postSolveAll(allBodies);

        // broadphase pass: find potential collision pairs
        if (broadphase.controller) {

            // if world is dirty, we must flush the whole grid
            if (world.isModified)
                broadphase.controller.clear(broadphase);

            // update the grid buckets based on current bodies
            broadphase.controller.update(broadphase, allBodies, engine, world.isModified);
            broadphasePairs = broadphase.pairsList;
        } else {

            // if no broadphase set, we just pass all bodies
            broadphasePairs = allBodies;
        }

        // narrowphase pass: find actual collisions, then create or update collision pairs
        var collisions = broadphase.detector(broadphasePairs, engine);

        // update collision pairs
        var pairs = engine.pairs,
            timestamp = timing.timestamp;
        Pairs.update(pairs, collisions, timestamp);
        Pairs.removeOld(pairs, timestamp);

        // wake up bodies involved in collisions
        if (engine.enableSleeping)
            Sleeping.afterCollisions(pairs.list, timing.timeScale);

        // trigger collision events
        if (pairs.collisionStart.length > 0)
            Events.trigger(engine, 'collisionStart', { pairs: pairs.collisionStart });

        // iteratively resolve velocity between collisions
        Resolver.preSolveVelocity(pairs.list);
        for (i = 0; i < engine.velocityIterations; i++) {
            Resolver.solveVelocity(pairs.list, timing.timeScale);
        }
        
        // iteratively resolve position between collisions
        for (i = 0; i < engine.positionIterations; i++) {
            Resolver.solvePosition(pairs.list, timing.timeScale);
        }
        Resolver.postSolvePosition(allBodies);

        // trigger collision events
        if (pairs.collisionActive.length > 0)
            Events.trigger(engine, 'collisionActive', { pairs: pairs.collisionActive });

        if (pairs.collisionEnd.length > 0)
            Events.trigger(engine, 'collisionEnd', { pairs: pairs.collisionEnd });

        // update metrics log
        Metrics.update(engine.metrics, engine);

        // clear force buffers
        Body.resetForcesAll(allBodies);

        // clear all composite modified flags
        if (world.isModified)
            Composite.setModified(world, false, false, true);

        Events.trigger(engine, 'afterUpdate', event);

        return engine;
    };

    /**
     * Renders the world by calling its defined renderer `engine.render.controller`. Triggers `beforeRender` and `afterRender` events.
     * @method render
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.render = function(engine) {
        // create an event object
        var event = {
            timestamp: engine.timing.timestamp
        };

        Events.trigger(engine, 'beforeRender', event);
        engine.render.controller.world(engine);
        Events.trigger(engine, 'afterRender', event);
    };
    
    /**
     * Merges two engines by keeping the configuration of `engineA` but replacing the world with the one from `engineB`.
     * @method merge
     * @param {engine} engineA
     * @param {engine} engineB
     */
    Engine.merge = function(engineA, engineB) {
        Common.extend(engineA, engineB);
        
        if (engineB.world) {
            engineA.world = engineB.world;

            Engine.clear(engineA);

            var bodies = Composite.allBodies(engineA.world);

            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                Sleeping.set(body, false);
                body.id = Common.nextId();
            }
        }
    };

    /**
     * Clears the engine including the world, pairs and broadphase.
     * @method clear
     * @param {engine} engine
     */
    Engine.clear = function(engine) {
        var world = engine.world;
        
        Pairs.clear(engine.pairs);

        var broadphase = engine.broadphase;
        if (broadphase.controller) {
            var bodies = Composite.allBodies(world);
            broadphase.controller.clear(broadphase);
            broadphase.controller.update(broadphase, bodies, engine, true);
        }
    };

    /**
     * An alias for `Runner.run`, see `Matter.Runner` for more information.
     * @method run
     * @param {engine} engine
     */

    /*
    *
    *  Events Documentation
    *
    */

    /**
    * Fired at the start of a tick, before any updates to the engine or timing
    *
    * @event beforeTick
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine timing updated, but just before engine state updated
    *
    * @event tick
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired just before an update
    *
    * @event beforeUpdate
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update and all collision events
    *
    * @event afterUpdate
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired just before rendering
    *
    * @event beforeRender
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after rendering
    *
    * @event afterRender
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update and after rendering
    *
    * @event afterTick
    * @param {} event An event object
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have started to collide in the current tick (if any)
    *
    * @event collisionStart
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that are colliding in the current tick (if any)
    *
    * @event collisionActive
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /**
    * Fired after engine update, provides a list of all pairs that have ended collision in the current tick (if any)
    *
    * @event collisionEnd
    * @param {} event An event object
    * @param {} event.pairs List of affected pairs
    * @param {DOMHighResTimeStamp} event.timestamp The timestamp of the current tick
    * @param {} event.source The source object of the event
    * @param {} event.name The name of the event
    */

    /*
    *
    *  Properties Documentation
    *
    */

    /**
     * A flag that specifies whether the engine is running or not.
     *
     * @property enabled
     * @type boolean
     * @default true
     */

    /**
     * An integer `Number` that specifies the number of position iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property positionIterations
     * @type number
     * @default 6
     */

    /**
     * An integer `Number` that specifies the number of velocity iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     *
     * @property velocityIterations
     * @type number
     * @default 4
     */

    /**
     * An integer `Number` that specifies the number of constraint iterations to perform each update.
     * The higher the value, the higher quality the simulation will be at the expense of performance.
     * The default value of `2` is usually very adequate.
     *
     * @property constraintIterations
     * @type number
     * @default 2
     */

    /**
     * A flag that specifies whether the engine should allow sleeping via the `Matter.Sleeping` module.
     * Sleeping can improve stability and performance, but often at the expense of accuracy.
     *
     * @property enableSleeping
     * @type boolean
     * @default false
     */

    /**
     * An `Object` containing properties regarding the timing systems of the engine. 
     *
     * @property timing
     * @type object
     */

    /**
     * A `Number` that specifies the global scaling factor of time for all bodies.
     * A value of `0` freezes the simulation.
     * A value of `0.1` gives a slow-motion effect.
     * A value of `1.2` gives a speed-up effect.
     *
     * @property timing.timeScale
     * @type number
     * @default 1
     */

    /**
     * A `Number` that specifies the current simulation-time in milliseconds starting from `0`. 
     * It is incremented on every `Engine.update` by the `timing.delta`. 
     *
     * @property timing.timestamp
     * @type number
     * @default 0
     */

    /**
     * A `Boolean` that specifies if the `Engine.run` game loop should use a fixed timestep (otherwise it is variable).
     * If timing is fixed, then the apparant simulation speed will change depending on the frame rate (but behaviour will be deterministic).
     * If the timing is variable, then the apparant simulation speed will be constant (approximately, but at the cost of determininism).
     *
     * @property timing.isFixed
     * @type boolean
     * @default false
     */

    /**
     * A `Number` that specifies the time step between updates in milliseconds.
     * If `engine.timing.isFixed` is set to `true`, then `delta` is fixed.
     * If it is `false`, then `delta` can dynamically change to maintain the correct apparant simulation speed.
     *
     * @property timing.delta
     * @type number
     * @default 1000 / 60
     */

    /**
     * A `Number` that specifies the time correction factor to apply to the current timestep.
     * It is automatically handled when using `Engine.run`, but is also only optional even if you use your own game loop.
     * The value is defined as `delta / lastDelta`, i.e. the percentage change of `delta` between steps.
     * This value is always `1` (no correction) when frame rate is constant or `engine.timing.isFixed` is `true`.
     * If the framerate and hence `delta` are changing, then correction should be applied to the current update to account for the change.
     * See the paper on <a href="http://lonesock.net/article/verlet.html">Time Corrected Verlet</a> for more information.
     *
     * @property timing.correction
     * @type number
     * @default 1
     */

    /**
     * An instance of a `Render` controller. The default value is a `Matter.Render` instance created by `Engine.create`.
     * One may also develop a custom renderer module based on `Matter.Render` and pass an instance of it to `Engine.create` via `options.render`.
     *
     * A minimal custom renderer object must define at least three functions: `create`, `clear` and `world` (see `Matter.Render`).
     * It is also possible to instead pass the _module_ reference via `options.render.controller` and `Engine.create` will instantiate one for you.
     *
     * @property render
     * @type render
     * @default a Matter.Render instance
     */

    /**
     * An instance of a broadphase controller. The default value is a `Matter.Grid` instance created by `Engine.create`.
     *
     * @property broadphase
     * @type grid
     * @default a Matter.Grid instance
     */

    /**
     * A `World` composite object that will contain all simulated bodies and constraints.
     *
     * @property world
     * @type world
     * @default a Matter.World instance
     */

})();

;   // End src/core/Engine.js


// Begin src/core/Events.js

/**
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Events
*/

var Events = {};

(function() {

    /**
     * Subscribes a callback function to the given object's `eventName`.
     * @method on
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.on = function(object, eventNames, callback) {
        var names = eventNames.split(' '),
            name;

        for (var i = 0; i < names.length; i++) {
            name = names[i];
            object.events = object.events || {};
            object.events[name] = object.events[name] || [];
            object.events[name].push(callback);
        }

        return callback;
    };

    /**
     * Removes the given event callback. If no callback, clears all callbacks in `eventNames`. If no `eventNames`, clears all events.
     * @method off
     * @param {} object
     * @param {string} eventNames
     * @param {function} callback
     */
    Events.off = function(object, eventNames, callback) {
        if (!eventNames) {
            object.events = {};
            return;
        }

        // handle Events.off(object, callback)
        if (typeof eventNames === 'function') {
            callback = eventNames;
            eventNames = Common.keys(object.events).join(' ');
        }

        var names = eventNames.split(' ');

        for (var i = 0; i < names.length; i++) {
            var callbacks = object.events[names[i]],
                newCallbacks = [];

            if (callback) {
                for (var j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] !== callback)
                        newCallbacks.push(callbacks[j]);
                }
            }

            object.events[names[i]] = newCallbacks;
        }
    };

    /**
     * Fires all the callbacks subscribed to the given object's `eventName`, in the order they subscribed, if any.
     * @method trigger
     * @param {} object
     * @param {string} eventNames
     * @param {} event
     */
    Events.trigger = function(object, eventNames, event) {
        var names,
            name,
            callbacks,
            eventClone;

        if (object.events) {
            if (!event)
                event = {};

            names = eventNames.split(' ');

            for (var i = 0; i < names.length; i++) {
                name = names[i];
                callbacks = object.events[name];

                if (callbacks) {
                    eventClone = Common.clone(event, false);
                    eventClone.name = name;
                    eventClone.source = object;

                    for (var j = 0; j < callbacks.length; j++) {
                        callbacks[j].apply(object, [eventClone]);
                    }
                }
            }
        }
    };

})();

;   // End src/core/Events.js


// Begin src/core/Runner.js

/**
* The `Matter.Runner` module is an optional utility which provides a game loop, 
* that handles updating and rendering a `Matter.Engine` for you within a browser.
* Note that the method `Engine.run` is an alias for `Runner.run`.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Runner
*/

var Runner = {};

(function() {

    var _fps = 60,
        _deltaSampleSize = _fps,
        _delta = 1000 / _fps;

    var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
                                      || window.mozRequestAnimationFrame || window.msRequestAnimationFrame 
                                      || function(callback){ window.setTimeout(function() { callback(Common.now()); }, _delta); };
   
    var _cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame 
                                      || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;

    /**
     * Provides a basic game loop that handles updating the engine for you.
     * Calls `Engine.update` and `Engine.render` on the `requestAnimationFrame` event automatically.
     * Handles time correction and non-fixed dynamic timing (if enabled). 
     * Triggers `beforeTick`, `tick` and `afterTick` events.
     * @method run
     * @param {engine} engine
     */
    Runner.run = function(engine) {
        var counterTimestamp = 0,
            frameCounter = 0,
            deltaHistory = [],
            timePrev,
            timeScalePrev = 1;

        (function render(time){
            var timing = engine.timing,
                delta,
                correction;

            timing.frameRequestId = _requestAnimationFrame(render);

            if (!engine.enabled)
                return;

            // create an event object
            var event = {
                timestamp: time
            };

            Events.trigger(engine, 'beforeTick', event);

            if (timing.isFixed) {
                // fixed timestep
                delta = timing.delta;
            } else {
                // dynamic timestep based on wall clock between calls
                delta = (time - timePrev) || timing.delta;
                timePrev = time;

                // optimistically filter delta over a few frames, to improve stability
                deltaHistory.push(delta);
                deltaHistory = deltaHistory.slice(-_deltaSampleSize);
                delta = Math.min.apply(null, deltaHistory);
                
                // limit delta
                delta = delta < timing.deltaMin ? timing.deltaMin : delta;
                delta = delta > timing.deltaMax ? timing.deltaMax : delta;

                // time correction for delta
                correction = delta / timing.delta;

                // update engine timing object
                timing.delta = delta;
            }

            // time correction for time scaling
            if (timeScalePrev !== 0)
                correction *= timing.timeScale / timeScalePrev;

            if (timing.timeScale === 0)
                correction = 0;

            timeScalePrev = timing.timeScale;
            
            // fps counter
            frameCounter += 1;
            if (time - counterTimestamp >= 1000) {
                timing.fps = frameCounter * ((time - counterTimestamp) / 1000);
                counterTimestamp = time;
                frameCounter = 0;
            }

            Events.trigger(engine, 'tick', event);

            // if world has been modified, clear the render scene graph
            if (engine.world.isModified)
                engine.render.controller.clear(engine.render);

            // update
            Engine.update(engine, delta, correction);

            // render
            Engine.render(engine);

            Events.trigger(engine, 'afterTick', event);
        })();
    };

    /**
     * Ends execution of `Runner.run` on the given `engine`, by canceling the animation frame request event loop.
     * If you wish to only temporarily pause the engine, see `engine.enabled` instead.
     * @method stop
     * @param {engine} engine
     */
    Runner.stop = function(engine) {
        _cancelAnimationFrame(engine.timing.frameRequestId);
    };

})();

;   // End src/core/Runner.js


// Begin src/core/Sleeping.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Sleeping
*/

var Sleeping = {};

(function() {

    Sleeping._motionWakeThreshold = 0.2;
    Sleeping._motionSleepThreshold = 0.1;
    Sleeping._minBias = 0.9;

    /**
     * Puts bodies to sleep or wakes them up depending on their motion.
     * @method update
     * @param {body[]} bodies
     * @param {number} timeScale
     */
    Sleeping.update = function(bodies, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // update bodies sleeping status
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i],
                motion = body.speed * body.speed + body.angularSpeed * body.angularSpeed;

            // wake up bodies if they have a force applied
            if (body.force.x > 0 || body.force.y > 0) {
                Sleeping.set(body, false);
                continue;
            }

            var minMotion = Math.min(body.motion, motion),
                maxMotion = Math.max(body.motion, motion);
        
            // biased average motion estimation between frames
            body.motion = Sleeping._minBias * minMotion + (1 - Sleeping._minBias) * maxMotion;
            
            if (body.sleepThreshold > 0 && body.motion < Sleeping._motionSleepThreshold * timeFactor) {
                body.sleepCounter += 1;
                
                if (body.sleepCounter >= body.sleepThreshold)
                    Sleeping.set(body, true);
            } else if (body.sleepCounter > 0) {
                body.sleepCounter -= 1;
            }
        }
    };

    /**
     * Given a set of colliding pairs, wakes the sleeping bodies involved.
     * @method afterCollisions
     * @param {pair[]} pairs
     * @param {number} timeScale
     */
    Sleeping.afterCollisions = function(pairs, timeScale) {
        var timeFactor = timeScale * timeScale * timeScale;

        // wake up bodies involved in collisions
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            
            // don't wake inactive pairs
            if (!pair.isActive)
                continue;

            var collision = pair.collision,
                bodyA = collision.bodyA, 
                bodyB = collision.bodyB;
        
            // don't wake if at least one body is static
            if ((bodyA.isSleeping && bodyB.isSleeping) || bodyA.isStatic || bodyB.isStatic)
                continue;
        
            if (bodyA.isSleeping || bodyB.isSleeping) {
                var sleepingBody = (bodyA.isSleeping && !bodyA.isStatic) ? bodyA : bodyB,
                    movingBody = sleepingBody === bodyA ? bodyB : bodyA;

                if (!sleepingBody.isStatic && movingBody.motion > Sleeping._motionWakeThreshold * timeFactor) {
                    Sleeping.set(sleepingBody, false);
                }
            }
        }
    };

    /**
     * Description
     * @method set
     * @param {body} body
     * @param {boolean} isSleeping
     */
    Sleeping.set = function(body, isSleeping) {
        if (isSleeping) {
            body.isSleeping = true;
            body.sleepCounter = body.sleepThreshold;

            body.positionImpulse.x = 0;
            body.positionImpulse.y = 0;

            body.positionPrev.x = body.position.x;
            body.positionPrev.y = body.position.y;

            body.anglePrev = body.angle;
            body.speed = 0;
            body.angularSpeed = 0;
            body.motion = 0;
        } else {
            body.isSleeping = false;
            body.sleepCounter = 0;
        }
    };

})();

;   // End src/core/Sleeping.js


// Begin src/geometry/Axes.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Axes
*/

var Axes = {};

(function() {

    /**
     * Description
     * @method fromVertices
     * @param {vertices} vertices
     * @return {axes} A new axes from the given vertices
     */
    Axes.fromVertices = function(vertices) {
        var axes = {};

        // find the unique axes, using edge normal gradients
        for (var i = 0; i < vertices.length; i++) {
            var j = (i + 1) % vertices.length, 
                normal = Vector.normalise({ 
                    x: vertices[j].y - vertices[i].y, 
                    y: vertices[i].x - vertices[j].x
                }),
                gradient = (normal.y === 0) ? Infinity : (normal.x / normal.y);
            
            // limit precision
            gradient = gradient.toFixed(3).toString();

            axes[gradient] = normal;
        }

        return Common.values(axes);
    };

    /**
     * Description
     * @method rotate
     * @param {axes} axes
     * @param {number} angle
     */
    Axes.rotate = function(axes, angle) {
        if (angle === 0)
            return;
        
        var cos = Common.cos(angle),
            sin = Common.sin(angle);

        for (var i = 0; i < axes.length; i++) {
            var axis = axes[i],
                xx;
            xx = axis.x * cos - axis.y * sin;
            axis.y = axis.x * sin + axis.y * cos;
            axis.x = xx;
        }
    };

})();

;   // End src/geometry/Axes.js


// Begin src/geometry/Bounds.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Bounds
*/

var Bounds = {};

(function() {

    /**
     * Description
     * @method create
     * @param {vertices} vertices
     * @return {bounds} A new bounds object
     */
    Bounds.create = function(vertices) {
        var bounds = { 
            min: { x: 0, y: 0 }, 
            max: { x: 0, y: 0 }
        };

        if (vertices)
            Bounds.update(bounds, vertices);
        
        return bounds;
    };

    /**
     * Description
     * @method update
     * @param {bounds} bounds
     * @param {vertices} vertices
     * @param {vector} velocity
     */
    Bounds.update = function(bounds, vertices, velocity) {
        bounds.min.x = Number.MAX_VALUE;
        bounds.max.x = Number.MIN_VALUE;
        bounds.min.y = Number.MAX_VALUE;
        bounds.max.y = Number.MIN_VALUE;

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            if (vertex.x > bounds.max.x) bounds.max.x = vertex.x;
            if (vertex.x < bounds.min.x) bounds.min.x = vertex.x;
            if (vertex.y > bounds.max.y) bounds.max.y = vertex.y;
            if (vertex.y < bounds.min.y) bounds.min.y = vertex.y;
        }
        
        if (velocity) {
            if (velocity.x > 0) {
                bounds.max.x += velocity.x;
            } else {
                bounds.min.x += velocity.x;
            }
            
            if (velocity.y > 0) {
                bounds.max.y += velocity.y;
            } else {
                bounds.min.y += velocity.y;
            }
        }
    };

    /**
     * Description
     * @method contains
     * @param {bounds} bounds
     * @param {vector} point
     * @return {boolean} True if the bounds contain the point, otherwise false
     */
    Bounds.contains = function(bounds, point) {
        return point.x >= bounds.min.x && point.x <= bounds.max.x 
               && point.y >= bounds.min.y && point.y <= bounds.max.y;
    };

    /**
     * Description
     * @method overlaps
     * @param {bounds} boundsA
     * @param {bounds} boundsB
     * @return {boolean} True if the bounds overlap, otherwise false
     */
    Bounds.overlaps = function(boundsA, boundsB) {
        return (boundsA.min.x <= boundsB.max.x && boundsA.max.x >= boundsB.min.x
                && boundsA.max.y >= boundsB.min.y && boundsA.min.y <= boundsB.max.y);
    };

    /**
     * Translates the bounds by the given vector
     * @method translate
     * @param {bounds} bounds
     * @param {vector} vector
     */
    Bounds.translate = function(bounds, vector) {
        bounds.min.x += vector.x;
        bounds.max.x += vector.x;
        bounds.min.y += vector.y;
        bounds.max.y += vector.y;
    };

    /**
     * Shifts the bounds to the given position
     * @method shift
     * @param {bounds} bounds
     * @param {vector} position
     */
    Bounds.shift = function(bounds, position) {
        var deltaX = bounds.max.x - bounds.min.x,
            deltaY = bounds.max.y - bounds.min.y;
            
        bounds.min.x = position.x;
        bounds.max.x = position.x + deltaX;
        bounds.min.y = position.y;
        bounds.max.y = position.y + deltaY;
    };
    
})();

;   // End src/geometry/Bounds.js


// Begin src/geometry/Vector.js

/**
* The `Matter.Vector` module contains methods for creating and manipulating vectors.
* Vectors are the basis of all the geometry related operations in the engine.
* A `Matter.Vector` object is of the form `{ x: 0, y: 0 }`.
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Vector
*/

// TODO: consider params for reusing vector objects

var Vector = {};

(function() {

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Common.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @return {vector} A new vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle) {
        var cos = Common.cos(angle), sin = Common.sin(angle);
        return {
            x: vector.x * cos - vector.y * sin,
            y: vector.x * sin + vector.y * cos
        };
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point) {
        var cos = Common.cos(angle), sin = Common.sin(angle);
        return {
            x: point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin),
            y: point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos)
        };
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB) {
        return { x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y };
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB) {
        return { x: vectorA.x - vectorB.x, y: vectorA.y - vectorB.y };
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle in radians between the two vectors relative to the x-axis.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };

})();

;   // End src/geometry/Vector.js


// Begin src/geometry/Vertices.js

/**
* The `Matter.Vertices` module contains methods for creating and manipulating sets of vertices.
* A set of vertices is an array of `Matter.Vector` with additional indexing properties inserted by `Vertices.create`.
* A `Matter.Body` maintains a set of vertices to represent the shape of the object (its convex hull).
*
* See [Demo.js](https://github.com/liabru/matter-js/blob/master/demo/js/Demo.js) 
* and [DemoMobile.js](https://github.com/liabru/matter-js/blob/master/demo/js/DemoMobile.js) for usage examples.
*
* @class Vertices
*/

// TODO: convex decomposition - http://mnbayazit.com/406/bayazit

var Vertices = {};

(function() {

    /**
     * Creates a new set of `Matter.Body` compatible vertices.
     * The `points` argument accepts an array of `Matter.Vector` points orientated around the origin `(0, 0)`, for example:
     *
     *     [{ x: 0, y: 0 }, { x: 25, y: 50 }, { x: 50, y: 0 }]
     *
     * The `Vertices.create` method returns a new array of vertices, which are similar to Matter.Vector objects,
     * but with some additional references required for efficient collision detection routines.
     *
     * Note that the `body` argument is not optional, a `Matter.Body` reference must be provided.
     *
     * @method create
     * @param {vector[]} points
     * @param {body} body
     */
    Vertices.create = function(points, body) {
        var vertices = [];

        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                vertex = {};

            vertex.x = point.x;
            vertex.y = point.y;
            vertex.index = i;
            vertex.body = body;

            vertices.push(vertex);
        }

        return vertices;
    };

    /**
     * Parses a _simple_ SVG-style path into a `Matter.Vertices` object for the given `Matter.Body`.
     * @method fromPath
     * @param {string} path
     * @param {body} body
     * @return {vertices} vertices
     */
    Vertices.fromPath = function(path, body) {
        var pathPattern = /L\s*([\-\d\.]*)\s*([\-\d\.]*)/ig,
            points = [];

        path.replace(pathPattern, function(match, x, y) {
            points.push({ x: parseFloat(x, 10), y: parseFloat(y, 10) });
        });

        return Vertices.create(points, body);
    };

    /**
     * Returns the centre (centroid) of the set of vertices.
     * @method centre
     * @param {vertices} vertices
     * @return {vector} The centre point
     */
    Vertices.centre = function(vertices) {
        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        for (var i = 0; i < vertices.length; i++) {
            minX = Math.min(vertices[i].x, minX);
            maxX = Math.max(vertices[i].x, maxX);
            minY = Math.min(vertices[i].y, minY);
            maxY = Math.max(vertices[i].y, maxY);
        }

        return { x: ((maxX + minX) / 2), y: ((maxY + minY) / 2) };
    };

    /**
     * Returns the area of the set of vertices.
     * @method area
     * @param {vertices} vertices
     * @param {bool} signed
     * @return {number} The area
     */
    Vertices.area = function(vertices, signed) {
        var area = 0,
            j = vertices.length - 1;

        for (var i = 0; i < vertices.length; i++) {
            area += (vertices[j].x - vertices[i].x) * (vertices[j].y + vertices[i].y);
            j = i;
        }

        if (signed)
            return area / 2;

        return Common.abs(area) / 2;
    };

    /**
     * Returns the moment of inertia (second moment of area) of the set of vertices given the total mass.
     * @method inertia
     * @param {vertices} vertices
     * @param {number} mass
     * @return {number} The polygon's moment of inertia
     */
    Vertices.inertia = function(vertices, mass) {
        var numerator = 0,
            denominator = 0,
            v = vertices,
            cross,
            j;

        // find the polygon's moment of inertia, using second moment of area
        // http://www.physicsforums.com/showthread.php?t=25293
        for (var n = 0; n < v.length; n++) {
            j = (n + 1) % v.length;
            cross = Common.abs(Vector.cross(v[j], v[n]));
            numerator += cross * (Vector.dot(v[j], v[j]) + Vector.dot(v[j], v[n]) + Vector.dot(v[n], v[n]));
            denominator += cross;
        }

        return (mass / 6) * (numerator / denominator);
    };

    /**
     * Translates the set of vertices in-place.
     * @method translate
     * @param {vertices} vertices
     * @param {vector} vector
     * @param {number} scalar
     */
    Vertices.translate = function(vertices, vector, scalar) {
        var i;
        if (scalar) {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x * scalar;
                vertices[i].y += vector.y * scalar;
            }
        } else {
            for (i = 0; i < vertices.length; i++) {
                vertices[i].x += vector.x;
                vertices[i].y += vector.y;
            }
        }

        return vertices;
    };

    /**
     * Rotates the set of vertices in-place.
     * @method rotate
     * @param {vertices} vertices
     * @param {number} angle
     * @param {vector} point
     */
    Vertices.rotate = function(vertices, angle, point) {
        if (angle === 0)
            return;

        var cos = Common.cos(angle),
            sin = Common.sin(angle);

        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                dx = vertice.x - point.x,
                dy = vertice.y - point.y;
                
            vertice.x = point.x + (dx * cos - dy * sin);
            vertice.y = point.y + (dx * sin + dy * cos);
        }

        return vertices;
    };

    /**
     * Returns `true` if the `point` is inside the set of `vertices`.
     * @method contains
     * @param {vertices} vertices
     * @param {vector} point
     * @return {boolean} True if the vertices contains point, otherwise false
     */
    Vertices.contains = function(vertices, point) {
        for (var i = 0; i < vertices.length; i++) {
            var vertice = vertices[i],
                nextVertice = vertices[(i + 1) % vertices.length];
            if ((point.x - vertice.x) * (nextVertice.y - vertice.y) + (point.y - vertice.y) * (vertice.x - nextVertice.x) > 0) {
                return false;
            }
        }

        return true;
    };

    /**
     * Scales the vertices from a point (default is centre) in-place.
     * @method scale
     * @param {vertices} vertices
     * @param {number} scaleX
     * @param {number} scaleY
     * @param {vector} point
     */
    Vertices.scale = function(vertices, scaleX, scaleY, point) {
        if (scaleX === 1 && scaleY === 1)
            return vertices;

        point = point || Vertices.centre(vertices);

        var vertex,
            delta;

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            delta = Vector.sub(vertex, point);
            vertices[i].x = point.x + delta.x * scaleX;
            vertices[i].y = point.y + delta.y * scaleY;
        }

        return vertices;
    };

    /**
     * Chamfers a set of vertices by giving them rounded corners, returns a new set of vertices.
     * The radius parameter is a single number or an array to specify the radius for each vertex.
     * @method chamfer
     * @param {vertices} vertices
     * @param {number[]} radius
     * @param {number} quality
     * @param {number} qualityMin
     * @param {number} qualityMax
     */
    Vertices.chamfer = function(vertices, radius, quality, qualityMin, qualityMax) {
        radius = radius || [8];

        if (!radius.length)
            radius = [radius];

        // quality defaults to -1, which is auto
        quality = (typeof quality !== 'undefined') ? quality : -1;
        qualityMin = qualityMin || 2;
        qualityMax = qualityMax || 14;

        var centre = Vertices.centre(vertices),
            newVertices = [];

        for (var i = 0; i < vertices.length; i++) {
            var prevVertex = vertices[i - 1 >= 0 ? i - 1 : vertices.length - 1],
                vertex = vertices[i],
                nextVertex = vertices[(i + 1) % vertices.length],
                currentRadius = radius[i < radius.length ? i : radius.length - 1];

            if (currentRadius === 0) {
                newVertices.push(vertex);
                continue;
            }

            var prevNormal = Vector.normalise({ 
                x: vertex.y - prevVertex.y, 
                y: prevVertex.x - vertex.x
            });

            var nextNormal = Vector.normalise({ 
                x: nextVertex.y - vertex.y, 
                y: vertex.x - nextVertex.x
            });

            var diagonalRadius = Common.sqrt(2 * Math.pow(currentRadius, 2)),
                radiusVector = Vector.mult(Common.clone(prevNormal), currentRadius),
                midNormal = Vector.normalise(Vector.mult(Vector.add(prevNormal, nextNormal), 0.5)),
                scaledVertex = Vector.sub(vertex, Vector.mult(midNormal, diagonalRadius));

            var precision = quality;

            if (quality === -1) {
                // automatically decide precision
                precision = Math.pow(currentRadius, 0.32) * 1.75;
            }

            precision = Common.clamp(precision, qualityMin, qualityMax);

            // use an even value for precision, more likely to reduce axes by using symmetry
            if (precision % 2 === 1)
                precision += 1;

            var alpha = Math.acos(Vector.dot(prevNormal, nextNormal)),
                theta = alpha / precision;

            for (var j = 0; j < precision; j++) {
                newVertices.push(Vector.add(Vector.rotate(radiusVector, theta * j), scaledVertex));
            }
        }

        return newVertices;
    };

})();

;   // End src/geometry/Vertices.js


// Begin ../../Project/Source/Physics/matter-js-hype-extensions/src/render/Render.js

var Render = {};

(function() {
    Render.create = function(options) {
        var defaults = {
            controller: Render,
            element: null,
            options: { width: 800, height: 600, enabled: true },
            renderCallback: null
        };

        var render = Common.extend(defaults, options);

        return render;
    };

    /**
     * Clears the renderer. In this implementation, this is a noop.
     * @method clear
     * @param {RenderPixi} render
     */
    Render.clear = function(render) {
        // nothing required to clear this renderer implentation
        // if a scene graph is required, clear it here (see RenderPixi.js)
    };

    /**
     * Description
     * @method world
     * @param {engine} engine
     */
    Render.world = function(engine) {
        engine.render.controller.renderCallback(engine);
    };
})();

;   // End ../../Project/Source/Physics/matter-js-hype-extensions/src/render/Render.js


// Begin ../../Project/Source/Physics/matter-js-hype-extensions/src/core/Metrics.js

/**
* _Internal Class_, not generally used outside of the engine's internals.
*
* @class Metrics
*/

var Metrics = {};

(function() {

    /**
     * Description
     * @method create
     * @return {metrics} A new metrics
     */
    Metrics.create = function() {
        return {

        };
    };

    /**
     * Description
     * @method reset
     * @param {metrics} metrics
     */
    Metrics.reset = function(metrics) {

    };

    /**
     * Description
     * @method update
     * @param {metrics} metrics
     * @param {engine} engine
     */
    Metrics.update = function(metrics, engine) {

    };

})();

;   // End ../../Project/Source/Physics/matter-js-hype-extensions/src/core/Metrics.js


// aliases

World.add = Composite.add;
World.remove = Composite.remove;
World.addComposite = Composite.addComposite;
World.addBody = Composite.addBody;
World.addConstraint = Composite.addConstraint;
World.clear = Composite.clear;

// exports

Matter.Body = Body;
Matter.Composite = Composite;
Matter.World = World;
Matter.Contact = Contact;
Matter.Detector = Detector;
Matter.Grid = Grid;
Matter.Pairs = Pairs;
Matter.Pair = Pair;
Matter.Resolver = Resolver;
Matter.SAT = SAT;
Matter.Constraint = Constraint;
//Matter.MouseConstraint = MouseConstraint;
Matter.Common = Common;
Matter.Engine = Engine;
Matter.Metrics = Metrics;
//Matter.Mouse = Mouse;
Matter.Sleeping = Sleeping;
//Matter.Bodies = Bodies;
//Matter.Composites = Composites;
Matter.Axes = Axes;
Matter.Bounds = Bounds;
Matter.Vector = Vector;
Matter.Vertices = Vertices;
//Matter.Gui = Gui;
Matter.Render = Render;
//Matter.RenderPixi = RenderPixi;
Matter.Events = Events;

return Matter;

})();


	

	
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