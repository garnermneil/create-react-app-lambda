import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { GraphQLTest } from './GraphQLTest'

const client = new ApolloClient({
    uri: '/.netlify/functions/graphql'
})
console.log('​client', client)

class LambdaDemo extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false, msg: null }
    }

    handleClick = api => e => {
        e.preventDefault()

        this.setState({ loading: true })
        fetch('/.netlify/functions/' + api)
            .then(response => response.json())
            .then(json => this.setState({ loading: false, msg: json.msg }))
    }

    render() {
        const { loading, msg } = this.state

        return (
            <ApolloProvider client={client}>
                <button onClick={this.handleClick('hello')}>{loading ? 'Loading...' : 'Call Lambda'}</button>
                <button onClick={this.handleClick('async-dadjoke')}>
                    {loading ? 'Loading...' : 'Call Async Lambda'}
                </button>
                <br />
                <span>{msg}</span>
                <GraphQLTest />
            </ApolloProvider>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <LambdaDemo />
                </header>
            </div>
        )
    }
}

export default App
