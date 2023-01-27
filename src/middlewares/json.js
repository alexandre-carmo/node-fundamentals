export async function json(req, res) {
  const buffers = []

  // load full stream
  for await (const chuck of req) {
    return buffers.push(chuck)
  }

  try {
    const jsonString = Buffer.concat(buffers).toString();

    req.body = JSON.parse(jsonString)
  } catch (err) {
    req.body = null
  }

  // convert all res in json
  res.setHeader('Content-type', 'application/json')
}
