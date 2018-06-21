node {
    stage("Clone repo"){
         checkout scm
    }
    stage("upload Back"){
        sh "ls -la"
        dir ("backend"){
          sh "python uploadBack.py"
        }
    }
}
