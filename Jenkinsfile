pipeline {
    agent { label 'Slave-Node' }
    

    environment {
        DOCKER_IMAGE = 'manish1990786/jenkins-ci-demo:latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "Checking out branch: ${env.BRANCH_NAME}"
                    git branch: "${env.BRANCH_NAME}", url: 'https://github.com/manish1990786/jenkins-ci-demo'
                }
            }
        }

        stage('Build') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test --runInBand --forceExit'
            }
        }

        stage('Docker Build & Push') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker build -t ${DOCKER_IMAGE} ."
                        bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                expression { env.BRANCH_NAME == 'feature-test' }
            }
            steps {
                bat "docker run -d -p 3000:3000 ${DOCKER_IMAGE}"
            }
        }

        stage('Deploy to Production') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                bat "docker run -d -p 80:3000 ${DOCKER_IMAGE}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
