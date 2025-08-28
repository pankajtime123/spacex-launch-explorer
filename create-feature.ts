const fs = require('fs');
const path = require('path');
const readline = require('readline');

const baseFeaturePath = path.join(__dirname, 'src', 'features');

const subFolders = ['components', 'hooks', 'models', 'services', "screens"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the name of the new feature: ', (featureName: string) => {
  if (!featureName.trim()) {
    console.log('Feature name cannot be empty.');
    rl.close();
    return;
  }

  const featurePath = path.join(baseFeaturePath, featureName);

  if (!fs.existsSync(featurePath)) {
    fs.mkdirSync(featurePath, { recursive: true });
    console.log(`Created feature folder: ${featurePath}`);
  } else {
    console.log(`Feature folder "${featureName}" already exists.`);
  }

  subFolders.forEach((folder) => {
    const fullPath = path.join(featurePath, folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
      console.log(`Created subfolder: ${fullPath}`);
    } else {
      console.log(`Subfolder "${folder}" already exists in "${featureName}".`);
    }
  });

  rl.close();
});
