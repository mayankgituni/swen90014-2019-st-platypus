# Installation Guide

This is a build and deployment system of the stimuli website and web application. 
This script can be used to deploy the latest software created by the team ST-Platypus 
from the docker hub; or make changes, build and deploy the system when ready for production.

## Requirements
1. Install docker using - "https://docs.docker.com/v17.09/docker-for-mac/install/"
2. Install docker-compose using - "https://docs.docker.com/compose/install/"
3. Make sure that the host machine can run shell commands.

## Additional options to setup security for Ubuntu operating system
The user can use the system to setup the Nginx and SSL certificate to secure the system and 
provide reverse proxy to direct the traffic from http to https. However the installation is 
only valid for the linux based system(Ubuntu). User with any other operating system should
manage the securiy and routing of the port according to their convenience and Requirements;
the system without the security will run on the localhost:50000.

## Steps to Build/Deploy the Stimuli system
Notes: Make sure the Requirements of the system is fullfiled before proceeding.

1. run "git clone https://bitbucket.cis.unimelb.edu.au:8445/scm/swen900142019stplatypus/swen90014-2019-st-platypus.git"
2. Disconnect from the VPN server if connected.
3. cd swen90014-2019-st-platypus
4. run "./system-manager.sh"
5. Follow the instructions to deploy, build and manage the stimuli server.

## Test code is under the "test" branch
1. clone the test code : run "git clone -b test https://bitbucket.cis.unimelb.edu.au:8445/scm/swen900142019stplatypus/swen90014-2019-st-platypus.git"

**[Note]: The user can deploy the whole system with just 2 files(docker-compose.yml and system-manager.sh). However,
to build a new image of the system and launch it on the host server, user is required to git clone the whole swen900142019stplatypus
directory from the bitbucket.

**[Note]: In the current virsion the system webApp is not linked to the website therefore you can not launch the webApp from the website. However, you can launch the webApp by following the instructions on the /app/backend/stimuli/README to check the functionality of the webApp.

Credits:
Team ST_Platypus
