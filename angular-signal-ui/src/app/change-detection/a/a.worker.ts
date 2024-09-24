/// <reference lib="webworker" />

addEventListener('message', () => {
  const response = generateFile();
  postMessage(response);
});

function generateFile(): string {
  console.log('Started generating file.');
  for (let index = 0; index < 5000; index++) {
    console.log('generating file.');
  }
  return 'Completed generating file.';
}
