pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/manish1990786/jenkins-ci-demo'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                bat 'npm install'  // If using Node.js
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test' // Run tests
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
