#!/bin/bash

printf "*************************************************************************************\n"
printf "***************************Welcome to the Stimuli solutions**************************\n"
printf "*************************************************************************************\n\n"

printf "This is a build and deployment system of the stimuli website and web application. 
This script can be used to deploy the latest software created by the team ST-Platypus 
from the docker hub; or make changes, build and deploy the system when ready for production.\n"

printf '**[Note]: Make sure that the requirements[docker, docker-compose and a shell 
environment] are installed before we launch the server.\n\n'

# Exiting
function ExitSystem(){
printf "***********************************************************"
  printf "\nThank you for using the Stimuli System; Come back soon!\n"
  exit 1
}

# Deploy the system
function DeploySystem(){
  sudo docker-compose down
  sudo docker-compose pull
  printf "Docker-compose latest image pulled from the docker hub and ready to be deployed.\n"
  sudo docker-compose up -d
  printf "System is running and ready to be used at [localhost:50000] or \n"
  printf "If you have installed the security of the system then you can visit your websire at [https://yourhostname.com]"
  printf "*********************************************************************************\n"
  printf "\n****>Server running at: \"localhost:50000\"\n\n"
  printf "\"https://yourhostname.com\" if the security is installed.\n.\n.\n.\n"
  echo "**[Note]: If the server doesn't respond then wait for few seconds before start using."
}

# Run the system
function RunDockerCompose() {
  sudo docker-compose down
  sudo docker-compose up -d
  echo "System running..."
}

# Building the system.
function BuildSystem(){
  printf "To build the system we requires the application code intside the \"/app\" forder and Dockerfile.\n"
  printf "If you do not have the required code then you can git clone https://bitbucket.cis.unimelb.edu.au:8445/scm/swen900142019stplatypus/swen90014-2019-st-platypus.git\n"
  printf "System Building...\n"
  sudo docker-compose build
  
  read -p "Would you like to push the docker-compose to the dockerhub? [y/n] " input

  if [[ $input = y ]]; then
    sudo docker login
    sudo docker-compose push
    printf "Done Pushing the system in the!!\n"
  fi

  printf "Done Building!!\n"
}

# Installing packages for the ubuntu
function InstallPackagesForUbuntu(){
  printf "**[Note]: This install is made for Ubuntu only.If your Operating systen is any other than Ubuntu then please exit.\n"
  printf "**[Note]: This install is requires the user to have a hostname. If the user don't have hostname then please exit.\n\n"
  read -p "Exit now? [y/n] " input
  if [[ $input = "n" ]]; then
    printf "Welcome to security installion system for stimuli system. We will install the following\n\n"
    read -p "Enter the hostName of your server: " hostname

    # Installing Nginx
    printf "1. Installing Nginx"
    sudo apt-get update
    sudo apt-get install nginx
    sudo nginx -t

    printf "Nginx installed..\n"
  
    #Enabling the Nginx in firewall.
    sudo ufw allow 'Nginx Full'

    #installing the SSL certificate and configuring the nginx for reverse proxy
    printf "2. Installing SSL certification\n"
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install python-certbot-nginx

    printf "3. Configure the Nginx to perform reverse proxy so you could use the hostname without the port attached to it.\n"
    sudo certbot --nginx -d $hostname -d www.$hostname

    # Testing the installation of the SSL certificate and reload/reboot the system
    sudo certbot renew --dry-run
    sudo systemctl reload nginx
    sudo systemctl restart nginx
    printf "Installation complete...\n"
  fi
}

# Checking if the dependecies were installed before we proceed.
read -p "If you have installed the dependecies and ready to build/deploy the stimuli system? [y/n] " input
if [[ $input = "n" ]]; then
  ExitSystem
fi

# System control commands
while true
do
  printf "\n___________________________________________________________\n"
  read -p "Enter control option [-h for help] => " input

  if [[ $input = "1" ]]; then
    DeploySystem
  elif [[ $input = "2" ]]; then
    BuildSystem
    read -p "Would you like to run the build? [y/n] " input
    if [[ $input = "y" ]]; then
      RunDockerCompose
    fi
  elif [[ $input = "3" ]]; then
    BuildSystem
    RunDockerCompose
  elif [[ $input = "4" ]]; then
    sudo docker-compose down
  elif [[ $input = "5" ]]; then
    sudo docker system prune -a
  elif [[ $input = "6" ]]; then
    InstallPackagesForUbuntu
  elif [[ $input = "7" ]]; then
    git clone https://bitbucket.cis.unimelb.edu.au:8445/scm/swen900142019stplatypus/swen90014-2019-st-platypus.git
  elif [[ $input = "8" ]]; then
    sudo docker ps -a
  elif [[ $input = "9" ]]; then
    ExitSystem
  elif [[ $input = "-h" ]]; then
  printf "Pick from the options [deploy=1 | build=2 | build and deploy=3 | shutdown=4 | Clear docker images=5 | Install Security=6 | Clone the app code=7 | System Info=8 | exit=9 ]:"
  else
    printf "Retry!! Enter the correct input from the options.\n"
  fi

done