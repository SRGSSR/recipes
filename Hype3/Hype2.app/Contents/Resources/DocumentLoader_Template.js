(function HYPE_DocumentLoader() {
	var resourcesFolderName = "${resourcesFolderName}";
	var documentName = "${documentName}";
	var documentLoaderFilename = "${documentLoaderFilename}";
	var mainContainerID = "${mainContainerID}";
	var hasPhysics = "${unquote hasPhysics}";

	// find the URL for this script's absolute path and set as the resourceFolderName
	if("${unquote quickLookPreview}" == false) {
		try {
			var scripts = document.getElementsByTagName('script');
			for(var i = 0; i < scripts.length; i++) {
				var scriptSrc = scripts[i].src;
				var documentLoaderFilenameIndex = (scriptSrc != null) ? scriptSrc.indexOf("/" + documentLoaderFilename) : -1;
				if(documentLoaderFilenameIndex != -1) {
					resourcesFolderName = scriptSrc.substr(0, documentLoaderFilenameIndex);
					break;
				}
			}
		} catch(err) {	}
	}

	var loadScriptIfNecessary = function(windowObjectVariableName, documentsToLoadKey, scriptName) {
		var waitForResourcesToLoad = false;
		if (window[windowObjectVariableName] == null) {
			if (window[documentsToLoadKey] == null) {
				window[documentsToLoadKey] = Array();
				window[documentsToLoadKey].push(HYPE_DocumentLoader);

				var headElement = document.getElementsByTagName('head')[0];
				var scriptElement = document.createElement('script');
				var scriptContainingPath = resourcesFolderName;
				if("${unquote useExternalRuntime}" == true) {
					scriptContainingPath = "${externalRuntimeURL}";
				}
				scriptElement.type = 'text/javascript';
				scriptElement.src = (scriptContainingPath + '/' + scriptName);
				headElement.appendChild(scriptElement);
			} else {
				window[documentsToLoadKey].push(HYPE_DocumentLoader);
			}
			waitForResourcesToLoad = true;
		}
		return waitForResourcesToLoad;
	}

	if("${unquote inlineHypeJS}" == false) {
		var browserMatches = navigator.userAgent.match(/MSIE (\d+\.\d+)/);
		var ieVersion = (parseFloat(browserMatches && browserMatches[1]) || null);
		var useExtendedRuntime = ((ieVersion != null && ieVersion < 10) || hasPhysics == true);

		var waitForResourcesToLoad = loadScriptIfNecessary('HYPE_596', 'HYPE_dtl_596', (useExtendedRuntime == true ? "${hypeRuntimeFilenameExtended}" : "${hypeRuntimeFilenameStandard}"));
		if ("${unquote loadWaypoints}" == true) {
			waitForResourcesToLoad = waitForResourcesToLoad || loadScriptIfNecessary('HYPE_w_596', 'HYPE_wdtl_596', '${hypeWaypointsFilename}');
		}

		if (waitForResourcesToLoad) {
			return;
		}
	}
	
	var globalHypeDocuments = window['HYPE']['documents'];
	
	// handle attempting to load multiple times
	if(globalHypeDocuments[documentName] != null) {
		var index = 1;
		var originalDocumentName = documentName;
		do {
			documentName = "" + originalDocumentName + "-" + (index++);
		} while(globalHypeDocuments[documentName] != null);
		
		var allDivs = document.getElementsByTagName("div");
		var foundEligibleContainer = false;
		for(var i = 0; i < allDivs.length; i++) {
			if(allDivs[i].id == mainContainerID && allDivs[i].getAttribute("HYP_dn") == null) {
				var index = 1;
				var originalMainContainerID = mainContainerID;
				do {
					mainContainerID = "" + originalMainContainerID + "-" + (index++);
				} while(document.getElementById(mainContainerID) != null);
				
				allDivs[i].id = mainContainerID;
				foundEligibleContainer = true;
				break;
			}
		}
		
		if(foundEligibleContainer == false) {
			return;
		}
	}

	var resources = "${unquote resources}";

	var headAdditions = "${unquote headAdditions}";

	var sceneContainers = "${unquote sceneContainers}"
 
	var scenes = "${unquote scenes}";
 
	var persistentSymbolDescendants = "${unquote persistentSymbolDescendants}";
	
	var loadingScreenFunction = "${unquote loadingScreenFunction}";

	var javascripts = Array() /* for minifier */, javascripts = "${unquote javascripts}";

	var functions = {};
	var javascriptMapping = {};
	for(var i = 0; i < javascripts.length; i++) {
		try {
			javascriptMapping[javascripts[i].identifier] = javascripts[i].name;
			functions[javascripts[i].name] = eval("(function(){return " + javascripts[i].source + "})();");
		} catch (e) {
			if(window.console) {
				window.console.log(e);
			}
			functions[javascripts[i].name] = (function () {});
		}
	}
 
 	var timingFunctions = "${unquote timingFunctions}";

	var hypeDoc = new HYPE_596(	documentName,
										mainContainerID,
										resources,
										resourcesFolderName,
										headAdditions,
										functions,
									    sceneContainers,
										scenes,
									    persistentSymbolDescendants,
										javascriptMapping,
									    timingFunctions,
										loadingScreenFunction,
										hasPhysics,
										"${unquote drawSceneBackgrounds}",
										"${unquote initialSceneIndex}",
										"${unquote useGraphicsAcceleration}",
										"${unquote useCSSReset}",
										"${unquote useCSSPositioning}",
										"${unquote useTouchEvents}");

	globalHypeDocuments[documentName] = hypeDoc['API'];
	document.getElementById(mainContainerID).setAttribute("HYP_dn", documentName);

	hypeDoc['z_o'](this.body);
}());

