properties properties: [
        [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

timeout(60) {
    node('nativescript') {
        def buildNumber = env.BUILD_NUMBER
        def branchName = env.BRANCH_NAME
        def workspace = env.WORKSPACE
        def buildUrl = env.BUILD_URL

        // PRINT ENVIRONMENT TO JOB
        echo "workspace directory is $workspace"
        echo "build URL is $buildUrl"
        echo "build Number is $buildNumber"
        echo "branch name is $branchName"
        echo "PATH is $env.PATH"

        try {
            stage('Checkout') {
                checkout scm
            }

            stage('Build') {
                sh "npm run clean && npm run build"
            }

            stage('Test') {
                sh "cd src && npm i .. && tns build android && tns build ios"
            }

            stage('Publish NPM snapshot') {
                nodeJS.publishSnapshot('.', buildNumber, branchName)
            }

        } catch (e) {
            mail subject: "${env.JOB_NAME} (${buildNumber}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${buildUrl}."
            throw e
        }
    }
}
