//
//  XPCUtilities.h
//  XPCKit
//
//  Created by Jörg Jacobsen on 7/3/12. Copyright 2012 XPCKit.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

#import <Cocoa/Cocoa.h>
#import "XPCMessage.h"
#import "XPCConnection.h"

enum _XPCLogLevel
{
    XPCLogLevelNone = 0,    // Nothing is logged
	XPCLogLevelErrors,      // Only errors are logged (default)
	XPCLogLevelWarnings,    // Errors and warnings are logged
	XPCLogLevelDebug,       // Errors and warnings and information are/is logged
    XPCLogLevelAll          // Everything is logged
};
typedef enum _XPCLogLevel XPCLogLevel;

XPCLogLevel XPCGetLogLevel(void);
void XPCSetLogLevel(XPCLogLevel inLogLevel);

#define XPCLogLevel(level, format, args...) if (XPCGetLogLevel() >= level) NSLog(format, ##args)

#define XPCLogError(format, args...)   XPCLogLevel(XPCLogLevelErrors, format, ##args)
#define XPCLogWarning(format, args...) XPCLogLevel(XPCLogLevelWarnings, format, ##args)
#define XPCLogDebug(format, args...)   XPCLogLevel(XPCLogLevelDebug, format, ##args)
#define XPCLogAll(format, args...)     XPCLogLevel(XPCLogLevelAll, format, ##args)

#define XPCSendLogLevel(connection, level, str) if (XPCGetLogLevel() >= level) [connection sendLog:str]

#define XPCSendLogError(connection, str)   XPCSendLogLevel(connection, XPCLogLevelErrors, str)
#define XPCSendLogWarning(connection, str) XPCSendLogLevel(connection, XPCLogLevelWarnings, str)
#define XPCSendLogDebug(connection, str)   XPCSendLogLevel(connection, XPCLogLevelDebug, str)
#define XPCSendLogAll(connection, str)     XPCSendLogLevel(connection, XPCLogLevelAll, str)



// Dispatch a message with optional argument object to a target object asynchronously.
// When XPConnection is not nil the message will be transfered to XPC service for execution
//     (i.e. target and object must conform to NSCoding when connection is not nil).
// When XPCConnection is nil (e.g. running on Snow Leopard) message will be dispatched asynchronously via GCD.

void XPCPerformSelectorAsync(XPCConnection *inConnection,
                             id inTarget, SEL inSelector, id inObject,
                             XPCReturnValueHandler inCompletionHandler);
