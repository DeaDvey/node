const fs = require('fs');

// Create a new Date object to get the current time
const currentDate = new Date();

// Format the date as "dd/mm/yy hh:mm:ss:mi"
const formattedDate = currentDate.toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3, // Include milliseconds
});

// Format the JavaScript code
const fileContent = `let lastupdated = "${formattedDate}";
if (typeof module !== 'undefined' && module.exports) {
	module.exports = lastupdated;
}
`;

// Specify the file path
const filePath = '/srv/www/htdocs/lastupdated.js';

// Write the content to the file
fs.writeFileSync(filePath, fileContent);

console.log(`Current time (${formattedDate}) has been written to ${filePath}.`);

