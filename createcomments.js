const fs = require("fs")
let jsonString = fs.readFileSync('/srv/www/htdocs/blog/comments-database.js', 'utf8');

jsonString=`comments=${jsonString}              
if (typeof module !== "undefined" && module.exports) {             
                module.exports = comments;                         
}`        

fs.writeFile("/srv/www/htdocs/blog/comments.js", jsonString, (err) => {         
            if (err) {
                console.error('Error creating file:', err);  
            } else {  
                console.log('File created rewritten: Comments.js');  
            }
        });
