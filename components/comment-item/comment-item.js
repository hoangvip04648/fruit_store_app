import React, { Component,useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default function CommentItem(props) {

    const [comment,setComment]=useState(props.comment)
    const [visible,setVisible] = useState(false);
    useEffect(()=>{
        setComment(props.comment);
    },[props.comment])

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
        height:100,
        borderRadius:10,
        marginBottom:5,
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:10,
        paddingLeft:10,
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
        bottom:0,
        right:0,
        position:'absolute'
    }

});