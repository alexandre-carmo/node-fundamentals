import http from 'node:http'
import { InverseNumberStream } from './streams.js'

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
    const buffers = [];

    // loading full stream content
    for await (const chuck of req) {
        buffers.push(chuck)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()


    return res.end(fullStreamContent)


    // return req
    //     .pipe(new InverseNumberStream())
    //     .pipe(res)

})


server.listen(3334)