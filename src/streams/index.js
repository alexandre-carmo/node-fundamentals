import { InverseNumberStream, MultiByTenStream, OneToHundredStream } from "./streams.js";

// Read -> Transform -> Process
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiByTenStream())
