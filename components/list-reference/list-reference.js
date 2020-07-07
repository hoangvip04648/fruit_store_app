import React,{useState,useEffect} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import ReferenceItem from '../reference-item/reference-item';
import {styles} from './stylesheet'

export default function ListReference(props){ 
    const [references,setReferences]=useState(props.references);
    const {navigate} = props.navigation
    useEffect(()=>{
        setReferences(props.references);

    },[props.references])
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Bài viết nổi bật</Text>
            </View>
            <View>
                {
                    references.map((reference,index)=>(
                        <TouchableOpacity onPress={() =>{navigate('ReferenceDetail',{reference:reference})}}>
                            <View style={styles.productItemContainer}>
                                <ReferenceItem key={index} navigation={props.navigation} key={index} reference={reference}/> 
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
}

