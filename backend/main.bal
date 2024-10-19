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

service /fundraising on fundraisingListener {

     @http:ResourceConfig {
        cors: {
            allowOrigins: ["http://localhost:3000"]
        }
    }

    resource function post .(NewProject payload) returns http:Created|error {
        _ = check fundraisingDb->execute(`
            INSERT INTO Project (user_id, project_type, account_no, bank, branch, account_name, phone_number)
            VALUES (${payload.owner}, ${payload.projectType}, ${payload.bank.accNumber}, ${payload.bank.bank}, ${payload.bank.branch}, ${payload.bank.bankHolder}, ${payload.phone});`);

        int projectId = check fundraisingDb->queryRow(`SELECT LAST_INSERT_ID() AS project_id`);

        if payload.projectType == "healthcare" {
            _ = check fundraisingDb->execute(`
                INSERT INTO Healthcare (project_id, project_name, image, evidence, description, goal_amount, deadline)
                VALUES (${projectId}, ${payload.projectName}, ${payload.images[0]}, ${payload.evidence[0]}, ${payload.description}, ${payload.amount}, ${payload.deadline});`);
        } else if payload.projectType == "disaster relief" {
            _ = check fundraisingDb->execute(`
                INSERT INTO DisasterRelief (project_id, project_name, image, description, goal_amount, deadline)
                VALUES (${projectId}, ${payload.projectName}, ${payload.images[0]}, ${payload.description}, ${payload.amount}, ${payload.deadline});`);
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

    
    resource function get healthcare() returns NewProject[]|error {
        stream<NewProject, sql:Error?> projectStream = fundraisingDb->query(`SELECT * FROM healthcare`);
        return from NewProject project in projectStream
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

