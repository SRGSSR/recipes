//
//  XPCConnection.h
//  XPCKit
//
//  Created by Steve Streza on 7/25/11. Copyright 2012 XPCKit.
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

#import <Foundation/Foundation.h>
#import <dispatch/dispatch.h>
#import "XPCTypes.h"

@interface XPCConnection : NSObject
{
    XPCEventHandler _eventHandler;
    xpc_connection_t _connection;
	dispatch_queue_t _dispatchQueue;
}

- (id)initWithServiceName:(NSString *)serviceName;
- (id)initWithConnection: (xpc_connection_t)connection;

@property (nonatomic, copy)   XPCEventHandler eventHandler;

@property (nonatomic, readonly)   xpc_connection_t connection;
@property (nonatomic, assign)     dispatch_queue_t dispatchQueue;

// connection properties
@property (nonatomic, readonly) NSString *connectionName;
@property (nonatomic, readonly) NSNumber *connectionEUID;
@property (nonatomic, readonly) NSNumber *connectionEGID;
@property (nonatomic, readonly) NSNumber *connectionProcessID;
@property (nonatomic, readonly) NSString *connectionAuditSessionID;

-(void)sendMessage:(XPCMessage *)message;

// Sends a message to the associated connection in the XPC service and invokes the reply handler
// on the dispatch queue of self once the associated connection sends a reply.
// Logs an error message to the console if the connection does not reply for whatever reasons.

-(void)sendMessage:(XPCMessage *)message withReply:(XPCReplyHandler)replyHandler;

// Sends a message to the associated connection in the XPC service and invokes the reply handler
// on the dispatch queue of self once the associated connection sends a reply.
// Invokes the error handler if the associated connection does not reply for whatever reasons.

-(void)sendMessage:(XPCMessage *)message withReply:(XPCReplyHandler)replyHandler errorHandler:(XPCErrorHandler)errorHandler;

// Sends a selector and a target and an optional object argument to the associated connection in the XPC service
// which will invoke the selector on the (copied) target with the optional (copied) argument. Invokes the
// return value handler on the dispatch queue of self with the (copied) return value and possibly
// a (copied) error object supplied.

-(void)sendSelector:(SEL)inSelector withTarget:(id)inTarget object:(id)inObject returnValueHandler:(XPCReturnValueHandler)inReturnHandler;

-(void)suspend;
-(void)resume;

// handling connections
-(void)receiveConnection:(xpc_connection_t)connection;

-(void)sendLog:(NSString *)string;

@end
