
    var net = require( "net" );
    var connections = [];

function client(username,room,sockets) { 
	this.username=username;
	this.room=room;
	this.sockets;
}; 

var server = net.createServer( function(conn) {
   	
    var client1= new client(null,null,null); // built a object of "client"
    client1.sockets=conn;

   conn.write("Welcome, please input your username:"); 
   conn.on( 'data', function( data ) {
	function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}
		
	if(client1.username==null){
		 client1.username=cleanInput(data.toString());
		 conn.write("Please input your room:"); 
		 return;
	}
	
	if(client1.room==null){
		client1.room= cleanInput(data.toString());
		connections.push(client1);	
		console.log(client1.username+" has joined.(from"+conn.remoteAddress+")");

		for(var i= 0,len=connections.length;i<len;i++){
			if((connections[i] != client1 ) &&(String(connections[i].room)== String(client1.room))) {			    
		 	   connections[i].sockets.write(client1.username+" has joined.\n");
			}
		}	
		
		return;
	}       
/*function sendAll(){
}*/
	//connections.forEach(function(connection){
	
		for(var i= 0,len=connections.length;i<len;i++){		
			if((connections[i] != client1 ) &&(String(connections[i].room)== String(client1.room))) {	
				 if( data.toString().trim() === "exit" ) {
		       			 conn.end( "goodbye!\n" );
					console.log(client1.username+" left the chat. (room:"+client1.room+")");
					//connections.forEach(function(connection){
					//if( connections[i] != client1 ) {
			   		connections[i].sockets.write( client1.username+" has left\n" );
					// }			   	 	
		   		 } else {
			   		//var message = client1.username+ + "  says : " + data;			     		
						//if( String(connections[i].room)== String(client1.room)) {
				   			connections[i].sockets.write(client1.username+  " says: " + data);
						// }		
		   		 }
			}
		    
		 }
        conn.on( 'end', function() {
            connections.splice( connections.indexOf( conn ), 1 );
        } );
    }); /////////
});
    server.listen(62038, 'localhost' );
  //  console.log( "Server Start ..." );
 	var sys = require("sys");  
    sys.puts("chat server runnung at 62038"); 

      
