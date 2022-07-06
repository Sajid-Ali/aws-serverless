import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { SwnDatabase } from "./database";
import { SwnApiGateway } from "./gateway";
import { SwnMicroservices } from "./microservice";

export class AwsMicroservicesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const database = new SwnDatabase(this, "Database");

    const microservices = new SwnMicroservices(this, "Microservices", {
      productTable: database.productTable,
    });

    const apiGateway = new SwnApiGateway(this, "ApiGateway", {
      productMicroservice: microservices.productMicroservice,
    });
  }
}
