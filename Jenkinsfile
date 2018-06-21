node {
    stage("Clone repo"){
         checkout scm
    }
    stage("upload Back"){
        sh "cd /back/"
        sh "python uploadBack.py"
    }
}
