pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repo/JenkinsProject.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'npm install'  // If using Node.js
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test' // Run tests
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to Staging...'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to Production...'
            }
        }
    }

    post {
        failure {
            echo 'Build failed! Sending notification...'
        }
    }
}
