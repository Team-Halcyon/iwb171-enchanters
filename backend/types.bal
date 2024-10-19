import ballerina/time;
import ballerina/http;

type DataBaseConfig record {| 
    string host; 
    int port; 
    string user; 
    string password; 
    string database; 
|};

type Bank record {| 
    string bank; 
    string accNumber; 
    string bankHolder; 
    string branch;      
|};

type NewProject record {| 
    string projectName;
    string description;
    decimal amount;
    time:Date deadline;
    string phone;
    string[] images;
    string[] evidence;
    string projectType;
    Bank bank;
    boolean verified;
    string owner;
|};

type ProjectNotFound record {| 
    *http:NotFound; 
    ErrorDetails body; 
|};

type ErrorDetails record {| 
    time:Utc timeStamp; 
    string message; 
    string details; 
|};