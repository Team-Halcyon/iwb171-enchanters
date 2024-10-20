import ballerinax/mysql;
import ballerina/sql;
import ballerina/http;
import ballerinax/mysql.driver as _;
import ballerina/time;

configurable DataBaseConfig databaseConfig = ?;
final mysql:Client fundraisingDb = check initDbClient();

function initDbClient() returns mysql:Client|error => 
    new (...databaseConfig);

listener http:Listener fundraisingListener = new (9090);


@http:ServiceConfig {
        cors: {
            allowOrigins: ["http://localhost:3000"], 
            allowHeaders: ["content-type", "authorization"], 
            allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "UPDATE"], 
            allowCredentials: false,
            exposeHeaders: [],
            maxAge: 3600 
        }
    }
service /fundraising on fundraisingListener {

    @http:ResourceConfig {
        cors: {
            allowOrigins: ["http://localhost:3000"]
        }
    }
    resource function post newProject(NewProject payload) returns http:Created|error {
        // Insert into Project table
        _ = check fundraisingDb->execute(`INSERT INTO Project (user_id, project_type, create_timestamp, account_no, bank, branch, account_name, phone_number)
                VALUES (${payload.owner}, ${payload.projectType}, ${payload.createdDate}, ${payload.bankDetails.accNumber}, ${payload.bankDetails.bank}, ${payload.bankDetails.branch}, ${payload.bankDetails.bankHolder}, ${payload.phone});`);

        // Fetch last inserted project ID
        int result = check fundraisingDb->queryRow(`SELECT LAST_INSERT_ID() AS project_id`, int);
        

        // Insert into the relevant project type table
        if payload.projectType == "healthcare" {
            _ = check fundraisingDb->execute(`INSERT INTO Healthcare (project_id, project_name, image, evidence, description, goal_amount, deadline)
                VALUES (${result}, ${payload.projectName}, ${payload.images[0]}, ${payload.evidence[0]}, ${payload.description}, ${payload.amount}, ${payload.deadline});`);
        } else if payload.projectType == "disaster relief" {
            _ = check fundraisingDb->execute(`INSERT INTO DisasterRelief (project_id, project_name, image, description, goal_amount, deadline)
                VALUES (${result}, ${payload.projectName}, ${payload.images[0]}, ${payload.description}, ${payload.amount}, ${payload.deadline});`);
        } 

        return http:CREATED;
    }

    resource function post newHomeProject(NewHomeProject payload) returns http:Created|error {
        // Insert into Project table
        _ = check fundraisingDb->execute(`INSERT INTO Project (user_id, project_type, create_timestamp, account_no, bank, branch, account_name, phone_number)
                VALUES (${payload.owner}, ${payload.projectType}, ${payload.createdDate}, ${payload.bankDetails.accNumber}, ${payload.bankDetails.bank}, ${payload.bankDetails.branch}, ${payload.bankDetails.bankHolder}, ${payload.phone});`);

        // Fetch last inserted project ID
        int result = check fundraisingDb->queryRow(`SELECT LAST_INSERT_ID() AS project_id`, int);
        

        if payload.projectType == "children" || payload.projectType == "adults" {
            _ = check fundraisingDb->execute(`INSERT INTO Home (project_id, home_name, hometype, description, address, city, district, phone_number_home)
                VALUES (${result}, ${payload.projectName}, ${payload.projectType}, ${payload.description}, ${payload.address}, ${payload.city}, ${payload.district}, ${payload.phone});`);
        }

        return http:CREATED;
    }

    resource function get projects/[int id]() returns NewProject|ProjectNotFound|error {
        NewProject|error result = fundraisingDb->queryRow(`SELECT * FROM projects WHERE project_id = ${id}`);
        if result is sql:NoRowsError {
            ErrorDetails errorDetails = buildErrorPayload(string `id: ${id}`, string `projects/${id}`);
            ProjectNotFound projectNotFound = {
                body: errorDetails
            };
            return projectNotFound;
        } else {
            return result;
        }
    }

    resource function get healthcare() returns Project[]|error {
        stream<Project, sql:Error?> projectStream = fundraisingDb->query(`SELECT * FROM healthcare join project on healthcare.project_id = project.project_id`);
        return from Project project in projectStream
            select project;
    }

    resource function get disaster() returns Project[]|error {
        stream<Project, sql:Error?> projectStream = fundraisingDb->query(`SELECT * FROM disaster join project on disaster.project_id = project.project_id`);
        return from Project project in projectStream
            select project;
    }

    resource function get childrenHomes() returns HomeProject[]|error {
        stream<HomeProject, sql:Error?> projectStream = fundraisingDb->query(`SELECT * FROM home join project on home.project_id = project.project_id where type = "children"`);
        return from HomeProject project in projectStream
            select project;
    }

    resource function get adultHomes() returns HomeProject[]|error {
        stream<HomeProject, sql:Error?> projectStream = fundraisingDb->query(`SELECT * FROM home join project on home.project_id = project.project_id where type = "adults"`);
        return from HomeProject project in projectStream
            select project;
    }
}

function buildErrorPayload(string msg, string path) returns ErrorDetails {
    return {
        message: msg,
        timeStamp: time:utcNow(),
        details: string `uri=${path}`
    };
}
