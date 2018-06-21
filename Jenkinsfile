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
    stage("upload Back"){
        sh "ls -la"
        dir ("backend"){
          sh "python uploadBack.py"
        }
    }
}
