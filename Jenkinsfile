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
                echo $imagen           
                python uploadBack.py
              '''
            }
        }
    }
    stage("build docker Front image"){
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
            dir ("frontend"){
              sh '''
                ls -la
                sudo docker build --no-cache -t front:dockerfile .
                sudo docker images -q | grep -m 1 \"\" > imagen.txt
                imagen=$(<imagen.txt)
                echo $imagen           
                python uploadFront.py
              '''
            }
        }
    }
    stage("acceso al Front"){
        withCredentials([sshUserPrivateKey(credentialsId: 'ssh_privada', 
                                           keyFileVariable: 'private_key', 
                                           passphraseVariable: ', 
                                           usernameVariable: ')]){          
                      sh "ssh -i ${private_key} 10.1.3.75 ls -la"}
    }
}
