import { Readable, Transform, Writable } from 'node:stream'

// Readable -> Writable

export class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        // run every 1s
        setTimeout(() => {
            if (i > 100) {
                // send data to consumer
                this.push(null)
            } else {
                // convert data to buff
                const buff = Buffer.from(String(i))

                // send data-buff 
                this.push(buff)
            }
        }, 1000)
    }
}

export class MultiByTenStream extends Writable {
    /**
     * chuck: data 
     * callback: execute at the end callback
     */
    _write(chuck, encoding, callback) {
        // convert buff in string
        const str = chuck.toString()

        // convert string in number
        const num = Number(str)

        const multi = num * 10
        console.log(`Multi => ${multi}`)

        // end
        callback()
    }
}

export class InverseNumberStream extends Transform {
    error = null
    
    _transform(chuck, encoding, callback) {
        const transformed = Number(chuck.toString()) * -1

        // convert in buffer
        const buff = Buffer.from(String(transformed))

        callback(this.error, buff)
    }
}