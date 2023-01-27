import { OneToHundredStream } from "./streams.js";


// Fake upload
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream()
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})
