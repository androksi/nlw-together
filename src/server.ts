import express from 'express'

const app = express()

app.get('/test', (req, res) => {
    return res.send('Olá, GET.')
})

app.post('/test-post', (req, res) => {
    return res.send('Olá, POST.')
})

app.listen(5000, () => console.log('• NLW Valoriza: Server online.'))