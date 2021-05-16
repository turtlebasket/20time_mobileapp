import React, { Component } from 'react';
import { gql, useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import { Button, ScrollView, Text } from 'react-native';
import { apolloGet, } from '../data/GqlUtil';
import styles from '../styles/Styles';

export default function ConceptDemo2() {
  // let data = apolloGet(`
  // query {
  //   userMany(filter: { name: "Michael" }) {
  //     name
  //     _id
  //     todoLists {
  //       title
  //       _id
  //     }
  //   }
  // }
  // `);


  let { data, refetch } = useQuery(gql(`
  query {
    userById(_id:"60858ea0867120002d8f8c80") {
      name _id 
      todoLists {
        title _id
      }
    }
  }
  `))

  console.log(data);
  return (
    <ScrollView>
      <Text style={styles.pageText}>{JSON.stringify(data)}</Text>
    </ScrollView>
  );
}