node {
    stage("Clone repo"){
         checkout scm
    }
    stage("upload Back"){
        sh "cd /backend/"
        sh "python uploadBack.py"
    }
}
