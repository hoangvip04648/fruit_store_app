import React, { Component,useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';

export default function CommentItem(props) {

    const [comment,setComment]=useState(props.comment)
    const [visible,setVisible] = useState(false);
    useEffect(()=>{
        setComment(props.comment);
    })

    function deleteComment(){
        setVisible(false);
    }

    function parseDate(str)
    {

        const date = str.substr(1,10).split('-');
        return `${date[2]}/${date[1]}/${date[0]}`
    }

    return(
        <TouchableOpacity style={styles.ItemCommentContainer} onLongPress={()=>{setVisible(true)}} >
            <View style={styles.AvatarCommenterContainer}>
                <Image style={styles.AvatarCommenter} source={{uri:comment.idUser.avatar}}/>
            </View>
          
                <View style={styles.CommentContentContainer}>
                    <Text style={styles.CommentHeading}>{comment.idUser.name}</Text>
                    <Text style={styles.CommentContent}>{comment.content}</Text>
                    <Text style={styles.subContent}>{parseDate(comment.date)}</Text>
                </View>
              
        </TouchableOpacity>   
    )
}

const styles=StyleSheet.create({
    ItemCommentContainer:{
        
        paddingBottom:5,
        display:"flex",
        flexDirection:"row",
        height:80,
        borderRadius:10,
        marginBottom:10,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 1,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,1)'
    },
    AvatarCommenterContainer:{
        flex:1,
    },
    CommentContentContainer:{
        flex:5.2,
       
    },
    AvatarCommenter:{
        height:"100%",
        borderRadius:55,
        resizeMode:'contain'
    },
    CommentHeading:{
        paddingLeft:10,
        paddingTop:5,
        fontSize:17,
        color:"#00BFFF"
    },
    CommentContent:{
        fontSize:14,
        paddingTop:2,
        paddingLeft:10
    },
    subContent:{
        fontSize:12,
        color:'gray',
        textAlign:"right",
        paddingRight:10,
    }

});