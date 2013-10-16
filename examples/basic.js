
"use strict";

var mumble = require('../');
var fs = require('fs');

var options = {
	//username: 'mumbot',
	//password: 'coolio'
    //key: fs.readFileSync( 'private.pem' ),
    //cert: fs.readFileSync( 'public.pem' )
	pfx: fs.readFileSync( 'MumbleCert.p12' ),
}

var output;

console.log( 'Connecting' );
mumble.connect( 'mumble://psyjnir.net/-%20Lobby', options, function ( error, connection ) {
    if( error ) { throw new Error( error ); }

    console.log( 'Connected' );
	
	// Authenticate and initialize
    connection.authenticate( 'mumbot', 'coolio' );
    connection.on( 'initialized', function() {
		output = connection;
		console.log( 'Connection initialized' );
	} );
	
	// Set up callbacks
    connection.on( 'user-update', onUserUpdate );
	connection.on( 'user-remove', onUserRemove );
});

var onInit = function() {
	
	
    // Connection is authenticated and usable.
};

var onUserUpdate = function( user ) {
	console.log( 'User update:', user );
	console.log( 'Connection:', output);
	//console.log( 'All users:', mumble.users)
}

var onUserRemove = function ( user ) {
	console.log( 'User removed:', user );
	output.sendMessage( 'UserState', {session: user.session, actor: user.session, channelId:5})
}

var onVoice = function( event ) {
    console.log( 'Mixed voice' );

    var pcmData = voice.data;
}

process.on('exit', function() {
  console.log('About to exit.');
});
