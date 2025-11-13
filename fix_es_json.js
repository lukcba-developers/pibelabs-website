const fs = require('fs');
const path = require('path');

const esJsonPath = path.join(__dirname, 'src/lib/i18n/locales/es.json');
const esJson = JSON.parse(fs.readFileSync(esJsonPath, 'utf8'));

// Convert projects features and achievements from objects to arrays
if (esJson.projects) {
  Object.keys(esJson.projects).forEach(projectKey => {
    const project = esJson.projects[projectKey];
    
    // Convert features object to array
    if (project.features && typeof project.features === 'object' && !Array.isArray(project.features)) {
      const featuresArray = [];
      Object.keys(project.features).sort((a, b) => Number(a) - Number(b)).forEach(key => {
        featuresArray.push(project.features[key]);
      });
      project.features = featuresArray;
    }
    
    // Convert achievements object to array
    if (project.achievements && typeof project.achievements === 'object' && !Array.isArray(project.achievements)) {
      const achievementsArray = [];
      Object.keys(project.achievements).sort((a, b) => Number(a) - Number(b)).forEach(key => {
        achievementsArray.push(project.achievements[key]);
      });
      project.achievements = achievementsArray;
    }
  });
}

fs.writeFileSync(esJsonPath, JSON.stringify(esJson, null, 2) + '\n', 'utf8');
console.log('✅ Fixed es.json - converted objects to arrays');
