# nodejs-google-speech-to-text-api

This repository contains a Node.js project that demonstrates how to use the Google Cloud Speech-to-Text API for speech recognition. Follow the steps below to set up and use the project.

## Installation

1. Clone this repository to your local machine.

2. Download and install the Google Cloud SDK:

   - Option 1: Download the Google Cloud CLI installer from the official website and follow the installation prompts.
   
   - Option 2 (PowerShell): Open a PowerShell terminal and run the following commands:
   
     ```
     (New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")
     & $env:Temp\GoogleCloudSDKInstaller.exe
     ```

   Make sure to follow any additional instructions provided during the installation process. The installer is signed by Google LLC.

   **Note:** If you are using a screen reader, you can enable screen reader mode during installation for better accessibility.

3. Ensure that you have Python installed on your system. Cloud SDK requires Python 3 (3.5 to 3.9). The Windows version of Cloud SDK comes bundled with Python 3 by default.

   If you have an existing Python installation, you can use it with Cloud SDK by unchecking the option to install bundled Python during the installation process. Refer to the `gcloud` documentation for more details on using an existing Python installation.

4. After the installation is complete, the installer provides options to create Start Menu and Desktop shortcuts, start the Google Cloud CLI shell, and configure the `gcloud` CLI. Make sure to select the options to start the shell and configure your installation. The installer automatically starts a terminal window and runs the `gcloud init` command.

5. If you plan to deploy applications using `gcloud` commands, you might need to install additional components. Use the `gcloud` CLI component manager to install the required App Engine extensions.

6. Install Node.js if you haven't done so already. You can download the installer from the official Node.js website and follow the installation instructions specific to your operating system.

7. Install the `@google-cloud/speech` library by running the following command in the project directory:
```
  npm install --save @google-cloud/speech
```

## Configuration

To use the Google Cloud Speech-to-Text API, you need to configure the project by updating the `config` and `gcsUri` constant variables. Modify them according to your needs:

- `config`: This variable holds the configuration settings for the speech recognition. Update it with your desired configuration options.

- `gcsUri`: This variable represents the Google Cloud Storage URI of the audio file you want to transcribe. Replace it with the appropriate URI for your audio file.

## Usage

After completing the installation and configuration steps, you are ready to use the project. Run the appropriate commands to execute the Node.js script and perform speech recognition on the specified audio file.

Make sure that you have authenticated with your Google Cloud account by running `gcloud auth login` or `gcloud auth application-default login` in the terminal before executing the script.

That's it! You're good to go. Happy transcribing!
