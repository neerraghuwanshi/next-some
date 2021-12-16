let debug = process.env.PRODUCTION

export let gqlEndpoint = 'http://localhost:8000/graphql'
export let socketEndpoint = 'http://localhost:8000'

if (!debug) {
    gqlEndpoint = 'https://express-graphql-some.herokuapp.com/graphql'
    socketEndpoint = 'https://express-graphql-some.herokuapp.com'
}