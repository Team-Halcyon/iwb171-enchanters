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
    Bank bankDetails;
    boolean verified;
    string owner;
    time:Date createdDate;
    string? city;
    string? district;
    string? address;
|};

type Project record {| 
    string projectName;
    string description;
    decimal amount;
    time:Date deadline;
    string phone;
    string[] images;
    Bank bank;
    boolean verified;
    string owner;
    decimal raised;
|};

type HomeProject record {|
    boolean verified;                       
    decimal raised;              
    Bank bank;                                 
    string homeName;                       
    string address;                       
    string city;                
    string district;            
    string phoneNumberHome;     
    string description;         
    string image;               
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