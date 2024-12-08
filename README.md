# GoHalf-CA

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
- [Features](#features)


## Introduction
This project is designed to help solve the problem of splitting expenses when in a group trip. This web-application will allo users to create trips, invite friends and add expenses where they are devided upon the members who are on the trip.

<br>

## Setup
To install the project, follow these steps:

<br>

**ENV Files**:
  - For backend you will need this variables, only variables that is not present is clerk variables:
  
  **Back End ENV:**
  
      DATABASE_URL=postgres://postgres:password@127.0.0.1:5432/gohalf
      APP_PORT=8000
      APP_ENVIRONMENT=local # local, production 
      APP_WEB_URL=http://localhost:3000
      APP_DATABASE_USERNAME=postgres
      APP_DATABASE_PASSWORD=password
      APP_DATABASE_HOST=127.0.0.1
      APP_DATABASE_PORT=5432
      APP_DATABASE_NAME=gohalf
      CLERK_PUBLISHABLE_KEY=                //Go to clerk.com to get personal keys 
      CLERK_SECRET_KEY=                     //Go to clerk.com to get personal keys 

<br>

  **Front End ENV:**

    VITE_CLERK_PUBLISHABLE_KEY=          //Go to clerk.com to get personal keys 
    VITE_API_URL=http://localhost:8000


<br><br>

**-- Backend Setup:**
1. Clone the repository for backend: `git clone https://github.com/gohalf-ca/api-gohalf-ca.git`
2. Install Docker on your device
3. In the container section, open to terminal
4. Navigate to the cloned repository folder using CD <Folder_Location>
5. Once in folder, run this command: "npm run compose"
   
    If sucessfull, container will be show that it is running: ![image](https://github.com/user-attachments/assets/3834b60b-1044-4848-a786-5a08d459e073)

6. Enter into the device command line, and navigate to folder location
7. Once in the folder run: "npm install"
      This command will download all dependeces
8. Go back towards the docker terminal (Still in repository folder) and run: "npm run migrate up"
      It will setup database tables

      When sucessfull docker terminal will display: Migrations complete!
  
9. Enter regular command prompt and run: "npm run dev" to start back end

<br>

**-- Front End:**
1. Clone the repository for frontend: `git clone https://github.com/gohalf-ca/gohalf-ca.git`
2. Navigate in cammnd line towards cloned frontend and run: "npm install" , this will download all dependeces
3. Once dependences installed run: "npm run dev" to run the website locally

<br><br><br>

## Features

- User Signup & Login via Clerk
      ![image](https://github.com/user-attachments/assets/47d0b458-2bdc-4459-ba4a-961f9f32f8bf)
- Users can create trips & View them
      ![Image showing trip creation](https://github.com/user-attachments/assets/81e4c032-d44e-4486-bc8d-aa3f120d0198)
- Users can create & delete expenses  
  ![Image showing expense deletion](https://github.com/user-attachments/assets/4899da9b-cd07-4d0c-ace7-71b78f9ee55c)




