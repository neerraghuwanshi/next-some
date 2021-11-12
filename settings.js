let debug = true

let graphqlEndpoint = 'http://localhost:8000/graphql'

if (!debug) {
    graphqlEndpoint = 'https://so-me.com/graphql'
}


export const gqlEndpoint = graphqlEndpoint