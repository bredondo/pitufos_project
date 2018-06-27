node {
    
    stage("Clone repo"){
         checkout scm
    }
    
    stage("Dockerhub login"){
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub-login', 
                          usernameVariable: 'USERNAME', 
                          passwordVariable: 'PASSWORD']]) {           
                                    sh 'sudo docker login -u $USERNAME -p $PASSWORD'}
    }
    
    stage("build docker Back image"){
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
            dir ("backend"){
              sh '''
                ls -la
                sudo docker build --no-cache -t back:dockerfile .
                sudo docker images -q | grep -m 1 \"\" > imagen.txt
                imagen=$(<imagen.txt)
              '''
              imagen_back= sh(returnStdout: true, script: 'cat imagen.txt') 
              //print imagen_back
               sh "python uploadBack.py"
            }
        }
    }
    
    stage("build docker Front image"){
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
            dir ("frontend"){
              sh '''
                ls -la
                sudo docker build --no-cache -t front:dockerfile .
                sudo docker images -q | grep -m 1 \"\" > imagen2.txt
                imagen2=$(<imagen2.txt)
                echo $imagen2  
              '''
              imagen_front= sh(returnStdout: true, script: 'cat imagen2.txt') 
              //print imagen_front
               sh "python uploadFront.py"  
            }
        }
    }
    
    stage("acceso a la Base de Datos"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            //NO HACE FALTA///sh "ssh ec2-user@10.1.3.168 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.3.168 sudo docker rmi -f \$(sudo docker images -q)"
            //NO HACE FALTA////sh "ssh ec2-user@10.1.3.168 sudo docker rm -f \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.3.168 sudo docker volume prune -f
            
            //NO BORRA LAS IMAGENES//sh "ssh ec2-user@10.1.3.168 sudo docker image prune -f
              sh "ssh ec2-user@10.1.3.168 sudo service docker restart"
              sh "ssh ec2-user@10.1.3.168 sudo docker container prune -f"
              sh "ssh ec2-user@10.1.3.168 sudo docker pull mongo:3.6.4"
              sh "ssh ec2-user@10.1.3.168 sudo docker run -d -p 27017:27017 mongo:3.6.4"
        }    
    }
    
    stage("acceso al Back"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub-login', 
                          usernameVariable: 'USERNAME', 
                          passwordVariable: 'PASSWORD']]) {           
                                    sh 'sudo docker login -u $USERNAME -p $PASSWORD'}
            //sh "ssh ec2-user@10.1.3.128 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.3.128 sudo docker rmi -f \$(sudo docker images -q)"
            //sh "ssh ec2-user@10.1.3.128 sudo docker rm -f \$(sudo docker ps -a -q)"
            sh "ssh ec2-user@10.1.3.128 sudo docker pull pitufosgraduates/${imagen_back}"
            sh "ssh ec2-user@10.1.3.128 sudo docker run -d -p 8000:8000 pitufosgraduates/${imagen_back}"
        }       
    }
    
    stage("acceso al Front"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub-login', 
                          usernameVariable: 'USERNAME', 
                          passwordVariable: 'PASSWORD']]) {           
                                    sh 'sudo docker login -u $USERNAME -p $PASSWORD'}
            //sh "ssh ec2-user@10.1.3.75 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.3.75 sudo docker rmi -f \$(sudo docker images -q)"
            //sh "ssh ec2-user@10.1.3.75 sudo docker rm -f \$(sudo docker ps -a -q)"
            sh "ssh ec2-user@10.1.3.75 sudo docker pull pitufosgraduates/${imagen_front}"
            sh "ssh ec2-user@10.1.3.75 sudo docker run -d -p 80:3001 pitufosgraduates/${imagen_front}"
        }
    }

    ///////ZONA DE DISPONIBILIDAD C ///////////
    stage("acceso a la DB HA"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            //sh "ssh ec2-user@10.1.5.103 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.5.103 sudo docker rmi -f \$(sudo docker images -q)"
            //sh "ssh ec2-user@10.1.5.103 sudo docker rm -f \$(sudo docker ps -a -q)"
              sh "ssh ec2-user@10.1.5.103 sudo docker pull mongo:3.6.4"
              sh "ssh ec2-user@10.1.5.103 sudo docker run -d -p 27017:27017 mongo:3.6.4"
        }    
    }
 
    stage("Acceso al Back HA"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub-login', 
                          usernameVariable: 'USERNAME', 
                          passwordVariable: 'PASSWORD']]) {           
                                    sh 'sudo docker login -u $USERNAME -p $PASSWORD'}
            //sh "ssh ec2-user@10.1.5.186 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.5.186 sudo docker rmi -f \$(sudo docker images -q)"
            //sh "ssh ec2-user@10.1.5.186 sudo docker rm -f \$(sudo docker ps -a -q)"
              sh "ssh ec2-user@10.1.5.186 sudo docker pull pitufosgraduates/${imagen_back}"
              sh "ssh ec2-user@10.1.5.186 sudo docker run -d -p 8000:8000 pitufosgraduates/${imagen_back}"
        }       
     }
    
    stage("Acceso al Front HA"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: '', 
                                           usernameVariable: '')]){ 
                      sh "sudo cp ${private_key} ~/.ssh/id_rsa"
                      //sh "sudo cp ${private_key} /home/ec2-user/.ssh/id_rsa"
                      sh 'echo "Host * \n' + 'StrictHostKeyChecking no" >> ~/.ssh/config'
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub-login', 
                          usernameVariable: 'USERNAME', 
                          passwordVariable: 'PASSWORD']]) {           
                sh 'sudo docker login -u $USERNAME -p $PASSWORD'
            }
            //sh "ssh ec2-user@10.1.5.32 sudo docker stop \$(sudo docker ps -a -q)"
            //sh "ssh ec2-user@10.1.5.32 sudo docker rmi -f \$(sudo docker images -q)"
            //sh "ssh ec2-user@10.1.5.32 sudo docker rm -f \$(sudo docker ps -a -q)"
              sh "ssh ec2-user@10.1.5.32 sudo docker pull pitufosgraduates/${imagen_front}"
              sh "ssh ec2-user@10.1.5.32 sudo docker run -d -p 80:3001 pitufosgraduates/${imagen_front}"
        }
    }
}
