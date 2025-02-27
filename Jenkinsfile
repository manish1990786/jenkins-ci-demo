pipeline {
    agent { label 'Slave-Node' }

    environment {
        DOCKER_IMAGE = "manish1990786/jenkins-ci-demo:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME ?: 'main'  // Dynamically get the branch name
                    echo "Building branch: ${branchName}"
                    git branch: branchName, url: 'https://github.com/manish1990786/jenkins-ci-demo'
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
                expression { env.BRANCH_NAME == 'main' }
            }
            script {
                    echo "Pulling latest image from Docker Hub for Staging"
                    bat "docker pull ${DOCKER_IMAGE}"
                    echo "Stopping existing Staging container if running..."
                    bat "docker stop staging || echo 'Staging container not running'"
                    bat "docker rm staging || echo 'No Staging container to remove'"
                    
                    echo "Running Staging environment on port 3000..."
                    bat "docker run -d --name staging -p 3000:3000 ${DOCKER_IMAGE}"
                }
        }

        stage('Deploy to Production') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                echo "Pulling latest image from Docker Hub for Production"
                    bat "docker pull ${DOCKER_IMAGE}"
                    echo "Stopping existing Production container if running..."
                    bat "docker stop production || echo 'Production container not running'"
                    bat "docker rm production || echo 'No Production container to remove'"
                    
                    echo "Running Production environment on port 80..."
                    bat "docker run -d --name production -p 80:3000 ${DOCKER_IMAGE}"
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
