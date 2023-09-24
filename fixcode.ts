import fs from 'fs';

const list = [
  "./node_modules/form-data/lib/form_data.js",
];
const replacer = [
  ["new Buffer.alloc", "Buffer.alloc"],
];

for (let i = 0; i < list.length; i++) {
  const path = list[i];
  console.log(`path ${path} is being modified`);
  const replacements = replacer[i];

  // Read the file content
  const content = fs.readFileSync(path, 'utf8');

  // Replace all occurrences of the first element in the replacements array with the second element
  const updatedContent = content.replaceAll(replacements[0], replacements[1]);

  // Write the updated content back to the file
  fs.writeFileSync(path, updatedContent, 'utf8');
}

// remove line 68 - 87 from "./node_modules/@ethersproject/web/lib/geturl.js"
// and replace it with XXX
const paths = ["./node_modules/@ethersproject/web/lib/geturl.js"];

for (let i = 0; i < paths.length; i++) {
  const path = paths[i];
  console.log(`path ${path} is being modified`);
  const fs = require('fs');
  let data = fs.readFileSync(path, 'utf8');

  // remove line 68 - 87 & replace it with XXX
  const lines = data.split("\n");
  lines.splice(67, 20, `
            // ***** MODIFIED *****
            let chunks = [];
              //resp.setEncoding("utf8");
              resp.on("data", function (chunk) {
                  chunks.push(chunk);
              });
              resp.on("end", function () {
                  response.body = Buffer.concat(chunks);
              
                  if (response.headers["content-encoding"] === "gzip") {
                      try {
                          response.body = (0, bytes_1.arrayify)(zlib_1.gunzipSync(response.body));
                      } catch (error) {
                          console.error("Failed to gunzip:", response.body.toString('utf8'));
                          throw error;
                      }
                  }
                  resolve(response);
                });
              // ***** MODIFIED *****`);
  const updatedContent = lines.join("\n");

  // Write the updated content back to the file
  Bun.write(path, updatedContent);

}