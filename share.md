# Share Tool


**A Community-Driven Rental and Sharing Platform**

---


### Description
 - This tool is an innovative rental and sharing platform designed to foster trust, convenience, and community-driven collaboration. With this tool , users can create or join vibrant communities where they can post products for rent or share resources.

 - **Post Products for Rentals**   
      Easily list items you own, from tools and appliances to gadgets and furniture, for others to rent. Earn passive income while contributing to a sustainable sharing economy.
 - **Control Your Communities**  
   Build private or public communities tailored to specific interests or needs. Manage community rules,  members, and postings to ensure a smooth and secure experience.
 - **Discover Opportunities**   
  Search for rental options near you, explore items shared by your communities, and reduce unnecessary purchases.
 - **Safe & Transparent**   
  Benefit from secure transactions, verified profiles, and a reliable rating system to ensure trust among users.
Join ShareSpace and turn your unused assets into opportunities while building meaningful connections.



## Features

### Core Features:
- **Product Rentals:**
  - Users can post products for rental in private or public communities.
  - Categories include general items and specialized options, such as products for kids.

- **Community Management:**
  - Create and control private communities with proper channels for organized postings.
  - Public communities provide access to a diverse range of rental options.
  - **Collaborate Privately:**
    - Create your own communities to collaborate with friends in a secure and private space.

- **Search Functionality:**
  - Advanced search capabilities to identify products based on various parameters such as category, price, and location.

- **Special Promotions and Offers:**
  - Encourages the use of sustainable and ethical products through targeted promotions.

- **Secure Transactions:**
  - Powered by Stripe for seamless rental purchases and secure payment handling.

- **Chatbot Assistance:**
  - Leveraging the Retrieval-Augmented Generation (RAG) system to create AI-powered chatbots.
  - Provides personalized assistance for purchases and queries related to the platform.




## Tech Stack

### Frontend:
- **React.js**
  - Component-based architecture for a dynamic and responsive user interface.

### Backend:
- **Node.js**
  - Handles API requests and backend logic for a robust and scalable application.

### Database:
- **Firebase**
  - Reliable and fast data storage for user profiles, product listings, and community data.

### Payments:
- **Stripe**
  - Enables secure and efficient payment transactions for product rentals.

### Infrastructure:
- **Docker**
  - All features are dockerized into images for streamlined deployment and scalability.

### AI Integration:
- **RAG System**
  - Provides intelligent chatbots for data retrieval and user assistance.

---

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd share-space
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Docker Containers:**
   Ensure Docker is installed and running, then build and start the containers:
   ```bash
   docker-compose up --build
   ```

5. **Start the Application:**
   Access the platform at `http://localhost:<port>`.

---

Here’s a markdown documentation for the provided Express.js API routes:

---

# API Documentation

## Overview

This document outlines the API endpoints for managing communities and items in the application. The application interacts with Firestore to store and retrieve data about communities and items.

## Base URL
The base URL for the API is:

```
http://localhost:3001
```

---

## Endpoints

### 1. **Add a Community**
- **Endpoint**: `/addCommunity`
- **Method**: `POST`
- **Description**: Adds a new community to the system.
- **Request Body**:
  ```json
  {
    "name": "string",         // The name of the community (required)
    "description": "string",  // A brief description of the community (required)
    "isPrivate": "boolean",   // Whether the community is private (required)
    "createdBy": "string"     // The user ID of the creator (required)
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "message": "Community added successfully.",
      "id": "string",  // The name used as the ID
      "data": {        // Community data
        "name": "string",
        "description": "string",
        "isPrivate": "boolean",
        "createdBy": "string",
        "createdAt": "string",
        "members": []    // List of community members (initially empty)
      }
    }
    ```
  - **400 Bad Request** (Invalid input or community already exists):
    ```json
    {
      "message": "Invalid input data."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Internal server error."
    }
    ```

---

### 2. **Add an Item**
- **Endpoint**: `/addItems`
- **Method**: `POST`
- **Description**: Adds a new item to the system, optionally associating it with a community.
- **Request Body**:
  ```json
  {
    "title": "string",            // The title of the item (required)
    "description": "string",      // A brief description of the item (required)
    "imageUrl": "string",         // URL for the item image (optional)
    "PricePerDay": "number",      // Price per day for the item (optional)
    "isFree": "boolean",          // Whether the item is free (required)
    "OwnerId": "string",          // The ID of the item owner (required)
    "CommunityId": "string",      // The ID of the community (optional)
    "status": "string"            // The status of the item (optional, default: "available")
  }
  ```
- **Responses**:
  - **200 OK**:
    ```json
    {
      "message": "Item added successfully.",
      "id": "string",  // The ID of the new item
      "data": {        // Item data
        "title": "string",
        "description": "string",
        "imageUrl": "string",   // null if not provided
        "PricePerDay": "number",// null if not provided
        "isFree": "boolean",
        "OwnerId": "string",
        "CommunityId": "string",// null if not provided
        "status": "string",
        "createdAt": "string"
      }
    }
    ```
  - **400 Bad Request** (Invalid input, or invalid CommunityId):
    ```json
    {
      "message": "Invalid input data."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "message": "Internal server error."
    }
    ```

---

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request:

- **400**: Bad Request – Returned when the input data is invalid or missing.
- **500**: Internal Server Error – Returned when there is a server error processing the request.

---

## Example Requests

### 1. **Add a Community Example Request**:

```bash
curl -X POST http://localhost:3001/addCommunity \
-H "Content-Type: application/json" \
-d '{
  "name": "Tech Enthusiasts",
  "description": "A community for tech lovers.",
  "isPrivate": true,
  "createdBy": "user123"
}'
```

### 2. **Add an Item Example Request**:

```bash
curl -X POST http://localhost:3001/addItems \
-H "Content-Type: application/json" \
-d '{
  "title": "Laptop",
  "description": "A high-performance laptop.",
  "imageUrl": "http://example.com/laptop.jpg",
  "PricePerDay": 50,
  "isFree": false,
  "OwnerId": "user123",
  "CommunityId": "Tech Enthusiasts",
  "status": "available"
}'
```

---

## Notes

- The **name** field is used as the unique identifier for communities. This means you cannot have two communities with the same name.
- The **CommunityId** in the "Add Item" route is optional. If provided, the item will be associated with a community. However, it must reference an existing community.

---



---
## Usage

### Posting Products:
- Navigate to your desired community.
- Post products in relevant channels (private communities) or general listings (public communities).

### Searching for Products:
- Use the search bar to find items based on category, price range, or location.

### Promotions:
- Explore the "Special Offers" section to find discounted and ethical products.


This documentation provides a comprehensive overview of the API endpoints for adding communities and items. Feel free to refer to this for constructing requests and understanding the responses.


Here’s a stepwise markdown documentation for deploying a Dockerized application on AWS using ECS Fargate, including creating necessary resources like security groups, load balancers, and a private repository.

# AWS Docker Image Deployment Using ECS Fargate

This guide provides a stepwise process for deploying a Dockerized application service on AWS using the ECR and  ECS -Launch Type- Fargate. The process includes creating a security group, configuring a load balancer, setting up a private repository in AWS ECR, and deploying the application via an ECS cluster.

---

## Prerequisites

- AWS CLI installed and configured.
- Docker installed on your local machine.
- IAM user with necessary permissions for ECS, ECR, EC2, and Load Balancer.

---

Here’s a revised version of the instructions that consolidates the security group creation in Step 1 and references it appropriately in Step 2:  

---

### **Step 1: Create Security Groups**  

1. Open the AWS Management Console and navigate to the **VPC** service.  
2. Select **Security Groups** and click **Create Security Group**.  
3. Create the following security groups:  

   **Security Group 1 (For ECS Tasks):**  
   - **Name**: `share-space-ecs`  
   - **Description**: `Security group for ECS tasks`  
   - **VPC**: Select the appropriate VPC.  
   - **Inbound Rules**:  
     - **Custom TCP**: Port `3001` (or your application port), Source `0.0.0.0/0`.  
   - **Outbound Rules**:  
     - **All Traffic**: Destination `0.0.0.0/0`.  

   **Security Group 2 (For Load Balancer):**  
   - **Name**: `share-space-sg`  
   - **Description**: `Security group for the Load Balancer`  
   - **VPC**: Select the appropriate VPC.  
   - **Inbound Rules**:  
     - **HTTP**: Port `80`, Source `0.0.0.0/0` (or your specific IP range for security).  
   - **Outbound Rules**:  
     - **All Traffic**: Destination `0.0.0.0/0`.  

4. Click **Create Security Group** for both.  

---

### **Step 2: Create a Load Balancer**  

1. Navigate to the **EC2** service and select **Load Balancers**.  
2. Click **Create Load Balancer** and select **Application Load Balancer**.  
3. Provide the following details:  
   - **Name**: `ecs-load-balancer`.  
   - **Scheme**: `Internet-facing`.  
   - **IP Address Type**: `IPv4`.  
   - **Listeners**: Add a listener for HTTP (port `80`).  
4. Configure **Availability Zones**:  
   - Select your VPC and associated subnets.  
5. Configure **Security Group**:  
   - Attach the security group created in **Step 1** (`ecs-load-balancer-sg`).  
6. Configure **Target Group**:  
   - **Target Type**: `IP`.  
   - **Name**: `ecs-target-group`.  
   - **Protocol**: `HTTP`.  
   - **Port**: `3001` (or your application port).  
7. Register Targets:  
   - Leave empty for now (targets will be added dynamically by ECS).  
8. Review and create the load balancer.  

--- 

This structure ensures that all security groups are clearly defined in Step 1 and referenced accordingly in Step 2.

## Step 3: **Push Docker Image to AWS ECR**

1. Navigate to the **ECR** service and click **Create Repository**.
2. Provide the following details:
   - **Name**: `your-repository-name`.
   - **Visibility**: Private.
3. Click **Create** to create the repository.
4. Authenticate Docker to ECR:
   ```bash
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
   ```
5. Build and tag your Docker image:
   ```bash
   docker build -t your-repository-name .
   docker tag your-repository-name:latest <account-id>.dkr.ecr.<region>.amazonaws.com/your-repository-name:latest
   ```
6. Push the Docker image to ECR:
   ```bash
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/your-repository-name:latest
   ```

---

## Step 4: **Create an ECS Cluster**

1. Navigate to the **ECS** service and click **Clusters**.
2. Click **Create Cluster** and select **Networking only (Fargate)**.
3. Provide the following details:
   - **Cluster Name**: `your-cluster-name`.
   - **VPC and Subnets**: Select your existing VPC and public subnets.
4. Click **Create**.

---

## Step 5: **Create a Task Definition**

1. Navigate to **Task Definitions** and click **Create new task definition**.
2. Select **Fargate** and click **Next Step**.
3. Configure the task definition:
   - **Task Name**: `your-task-name`.
   - **Execution Role**: Select an existing role or create a new ECS Task Execution Role.
   - **Task Size**: Allocate appropriate CPU and memory (e.g., 512 CPU, 1024 MB Memory).
4. Add a Container:
   - **Name**: `your-container-name`.
   - **Image**: `<account-id>.dkr.ecr.<region>.amazonaws.com/your-repository-name:latest`.
   - **Port Mapping**: `3001` (or your application port).
5. Configure Logging:
   - Select **awslogs** as the logging driver.
   - Configure a log group (e.g., `/ecs/your-task-name`).
6. Save and create the task definition.

---

## Step 6: **Create a Service**

1. Navigate to **Services** and click **Create**.
2. Select the following options:
   - **Launch Type**: Fargate.
   - **Cluster**: Select your cluster.
   - **Service Name**: `your-service-name`.
   - **Number of Tasks**: Set to the desired number (e.g., 1).
3. Configure Networking:
   - Select your VPC and subnets.
   - Attach the security group created in Step 1.
4. Configure Load Balancing:
   - Enable **Application Load Balancer**.
   - Select the target group created in Step 2.
5. Click **Create Service**.

---

## Step 7: **Verify Deployment**

1. Navigate to the **Tasks** tab in your cluster and check the status of the task.
2. Ensure the task is in the **RUNNING** state.
3. Open the DNS name of the load balancer (found in the Load Balancer details) in a browser to access your application.

---

## Troubleshooting

1. **Task Fails to Start**:
   - Check logs in the ECS task details.
   - Verify the image URL in the task definition.
2. **Load Balancer Shows No Targets**:
   - Ensure the service is correctly associated with the target group.
3. **Security Group Issues**:
   - Verify inbound and outbound rules.

---

This documentation provides all the necessary steps to deploy a Dockerized application on AWS ECS Fargate.


