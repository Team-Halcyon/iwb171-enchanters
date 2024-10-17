import ballerina/http;

service /api on new http:Listener(8080) {
    
    resource function get hello() returns string {
        return "Hello from Ballerina!";
    }

    resource function post data(http:Caller caller, http:Request req) returns error? {
        json requestData = check req.getJsonPayload();
        // Process the data and respond
        json responseData = { message: "Data received", data: requestData };
        check caller->respond(responseData);
    }
}

