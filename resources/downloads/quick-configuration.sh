#!/bin/sh
############################################################################
# Copyright 2014 Linagora, Université Joseph Fourier, Floralis
# 
# The present code is developed in the scope of the joint LINAGORA -
# Université Joseph Fourier - Floralis research program and is designated
# as a "Result" pursuant to the terms and conditions of the LINAGORA
# - Université Joseph Fourier - Floralis research program. Each copyright
# holder of Results enumerated here above fully & independently holds complete
# ownership of the complete Intellectual Property rights applicable to the whole
# of said Results, and may freely exploit it in any manner which does not infringe
# the moral rights of the other copyright holders.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
############################################################################

# The script was written for Ubuntu 14.x.
# Update these parameters.
IP_RMQ=
IP_AGENT=
PEM_LOC=~/.ssh/vzurczak.pem

DM_NAME=roboconf-karaf-dist-dm-0.2-SNAPSHOT
DM_TAR_DIR=~/.m2/repository/net/roboconf/roboconf-karaf-dist-dm/0.2-SNAPSHOT/

AGENT_NAME=roboconf-karaf-dist-agent-0.2-SNAPSHOT
AGENT_TAR_LOC=~/.m2/repository/net/roboconf/roboconf-karaf-dist-agent/0.2-SNAPSHOT/$AGENT_NAME.tar.gz

# Tested targets: EC2, openstack
TARGET_ID=EC2



# Do not edit further, unless you know exactly what to change.
# Connect to the RabbitMQ VM, install RMQ and configure it.
SSH_OPTIONS="-i $PEM_LOC -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
ssh -t $SSH_OPTIONS ubuntu@$IP_RMQ '

sudo echo deb http://www.rabbitmq.com/debian/ testing main >> /etc/apt/sources.list
wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc
sudo apt-get install rabbitmq-server -y

sudo rabbitmqctl add_user roboconf roboconf
sudo rabbitmqctl set_permissions roboconf ".*" ".*" ".*"
sudo rabbitmqctl delete_user guest
exit
'

echo "Installation and configuration of RabbitMQ are complete."



# Upload the agent on the agent VM.
scp $SSH_OPTIONS $AGENT_TAR_LOC ubuntu@$IP_AGENT:
echo "The agent was successfully uploaded."



# Connect to the agent VM, install Java, the agent, and configure everything.
ssh -t $SSH_OPTIONS ubuntu@$IP_AGENT bash <<ENDOFSCRIPT

sudo apt-get update -y
sudo apt-get install openjdk-7-jdk -y

rm -rf $AGENT_NAME
tar -xf $AGENT_NAME.tar.gz

cd $AGENT_NAME/etc
sed -i "s/target-id = /target-id = $TARGET_ID/g" net.roboconf.agent.configuration.cfg
sed -i "s/message-server-ip = localhost/message-server-ip = $IP_RMQ/g" net.roboconf.agent.configuration.cfg
sed -i 's/message-server-username = guest/message-server-username = roboconf/g' net.roboconf.agent.configuration.cfg
sed -i 's/message-server-password = guest/message-server-password = roboconf/g' net.roboconf.agent.configuration.cfg

cd ../bin
echo "export JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/jre" >> setenv

echo "Starting Karaf..."
./start
sleep 20

echo "Trying to configure Karaf..."
./client -u karaf "feature:install service-wrapper"
./client -u karaf "wrapper:install -n roboconf-agent"

./stop
sleep 20

sudo ln -s /home/ubuntu/roboconf-karaf-dist-agent-0.2-SNAPSHOT/bin/roboconf-agent-service /etc/init.d/
sudo update-rc.d roboconf-agent-service defaults

exit
ENDOFSCRIPT

echo "Installation and configuration of the agent are complete."



# Configure the local DM
cd $DM_TAR_DIR
rm -rf $DM_NAME
tar -xf $DM_NAME.tar.gz

cd $DM_NAME/etc
sed -i "s/message-server-ip = localhost/message-server-ip = $IP_RMQ/g" net.roboconf.dm.configuration.cfg
sed -i 's/message-server-username = guest/message-server-username = roboconf/g' net.roboconf.dm.configuration.cfg
sed -i 's/message-server-password = guest/message-server-password = roboconf/g' net.roboconf.dm.configuration.cfg

echo "Installation and configuration of the DM are complete."
echo "Now..."
echo "1. Create an image from the agent in the cloud infrastructure (if any)."
echo "2. Update your application settings (target.properties) to reference the new image."
