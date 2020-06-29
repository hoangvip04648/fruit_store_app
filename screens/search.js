import React , {useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import axios from 'axios';
import ListSearch from '../components/list-search/list-search';
import {rootUrl} from '../config';
export const SearchScreen = (props) => {
    const [results,setResults] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    function fetchSearchData(text)
    {
       setIsLoading(true);
        axios.get(`${rootUrl}/san-pham/search-by-string/${text}`)
        .then(res => {
            setIsLoading(false);
            if(res.data.products == null)
            {
                setResults([]);
            }
            else
            {
                setResults(res.data.products)
            }
            
        })
        .catch(err => {
            setIsLoading(false);
            console.log(err);
        })
    }
    return(
        
            <ListSearch isLoading={isLoading} results={results} fetchData={fetchSearchData} navigation={props.navigation}/>

   )
}