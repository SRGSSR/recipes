//
//  XPCMessage+XPCKitInternal.h
//  XPCKit
//
//  Created by Jörg Jacobsen on 15/2/12. Copyright 2012 XPCKit.
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

#import "XPCMessage.h"
#import "XPCUtilities.h"

@interface XPCMessage (XPCKitInternal)

+ (NSError *) errorForXPCObject:(xpc_object_t)object;
- (xpc_object_t) XPCDictionary;
- (BOOL) needsDirectReply;
- (void) setNeedsDirectReply:(BOOL)inDirectReply;
- (XPCLogLevel) logLevel;
- (void) setLogLevel:(XPCLogLevel) inLogLevel;
- (id) invocationReturnValue:(NSError **)outError;

@end
