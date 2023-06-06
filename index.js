// Imports the required modules
require('dotenv').config();
const fs = require('fs');
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');

// Creates a speech-to-text client
const speechClient = new speech.SpeechClient();

// Creates a text-to-speech client
const ttsClient = new textToSpeech.TextToSpeechClient();

async function transcribeAndSynthesize() {
  // The path to the local audio file
  const filePath = process.env.FILE_PATH + 'looking for service advisor.mp3';
  // const filePath = process.env.FILE_PATH + 'tongue twister 1.mp3'

  // Read the audio file
  const file = fs.readFileSync(filePath);
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'MP3',
    sampleRateHertz: 48000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await speechClient.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  console.log(`Transcription: ${transcription}`);

  // if (transcription.includes('I am looking for service advisor')) {
    if (/service\sadvisor/i.test(transcription)) {
    // User is looking for a service advisor
    console.log('Sure, I can assist you with that! Please provide me with some more details about your requirements.');
    
    // Synthesize the response into an audio file
    const text = 'Sure, I can assist you with that! Please provide me with some more details about your requirements.';
    const ttsRequest = {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);

    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(process.env.FILE_PATH + 'success-answer-advisor.mp3', ttsResponse.audioContent, 'binary');
    console.log('Audio content written to file: success-answer-advisor.mp3');
  } else {
    // User input does not match the expected phrase
    console.log("I'm sorry, I couldn't understand your request. Could you please rephrase it?");

    const text = "I'm sorry, I couldn't understand your request. Could you please rephrase it?";
    const ttsRequest = {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    const [ttsResponse] = await ttsClient.synthesizeSpeech(ttsRequest);

    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(process.env.FILE_PATH + 'failed-to-understand.mp3', ttsResponse.audioContent, 'binary');
    console.log('Audio content written to file: failed-to-understand.mp3');
  }
}

transcribeAndSynthesize();
