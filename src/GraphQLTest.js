import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const QUERY = gql`
  {
    lettings
  }
`;

export const GraphQLTest = () => {
    const { loading, error, data } = useQuery(QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
        
    console.log("​GraphQLTest -> data", data)

    return (
        <>
            <p>{data && data.lettings}</p>
        </>
    )
}