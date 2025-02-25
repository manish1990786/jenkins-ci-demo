pipeline {
    agent any

    environment {
        NODE_VERSION = '16'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-username/jenkins-ci-app.git'
            }
        }
        
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                bat 'docker build -t your-dockerhub-username/jenkins-ci-app:latest .'
                bat 'echo "%DOCKER_PASSWORD%" | docker login -u "%DOCKER_USERNAME%" --password-stdin'
                bat 'docker push your-dockerhub-username/jenkins-ci-app:latest'
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                bat 'echo Deploying to Staging...'
            }
        }

        stage('Deploy to Production') {
            steps {
                bat 'echo Deploying to Production...'
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
