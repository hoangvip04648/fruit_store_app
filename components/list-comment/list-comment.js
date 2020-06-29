import React, { Component,useState,useEffect,useMemo,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import useGlobal from '../../store';
import CommentItem from '../comment-item/comment-item'
import axios from 'axios';
import {rootUrl} from '../../config';

export default function ListComment(props) {

    const [comments,setComment]=useState([]);
    const [pageComment,setPage] = useState(props.pageComment || "");
    const [idPage,setIdPage] = useState(props.idPage)
    const [globalState,globalAction] = useGlobal();
    const [content,setContent] = useState("");
    function addComment(){
        axios.post(`${rootUrl}/binh-luan/them-binh-luan`,{
            idUser:globalState.user._id,
            idPageComment:idPage,
            pageComment : pageComment,
            content:content
        },
        {headers:{
            "x-access-token":globalState.user.token
        }})
        .then(res => {
            if(res.data.data != null)
            {
                setComment([{
                    idUser:{
                    name:globalState.user.name,
                    avatar:globalState.user.avatar
                    },
                    idPageComment:idPage,
                    pageComment : pageComment,
                    content:content,
                    date: JSON.stringify(new Date())},...comments]);

            }
           setContent('');
        })
        .catch(err => {
            console.log(err);
        })
    }

    function getComment()
    {
        axios.get(`${rootUrl}/binh-luan?id=${idPage}&page=${pageComment}`)
        .then(res => {
         
            if(res.data.success)
            {
              
                const data = res.data.data;
                data.forEach(element => {
                    element.idUser.avatar = `${rootUrl}/upload/avatar/${element.idUser.avatar}`
                });
               
                setComment(data);
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    useMemo(()=>{
        if(comments.length == 0)
        {
            getComment();
        }
        
    },[])

    return(
        <View>
            <View style={styles.commentHeadingContainer}>
                <Text style={styles.commentText}>Comments:</Text>
            </View>
            <View style={styles.commentBoxContainer}>
                <TextInput style={styles.commentBox} value={content} onChangeText={(text) => setContent(text)} placeholder="Comment..."/>
                <TouchableOpacity onPress = {addComment}><Text style={styles.btnComment}>Bình luận</Text></TouchableOpacity>
            </View>
            <View style={styles.commentItemContainer}>
                {comments.map((comment,index)=>(
                    <View>
                        <CommentItem key={index} comment={comment}/>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    commentHeadingContainer:{
        paddingTop:17,
        paddingBottom:4,
        paddingLeft:10,
       
    },
    commentText:{
        fontSize:18
    },
    commentBox:{
        borderRadius:5,
        shadowColor: '#000',
        borderWidth:0.8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,  
        elevation: 5,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,1)',
        paddingLeft:10
    },
    commentBoxContainer:{
        paddingRight:15,
       paddingLeft:10,
    },
    commentItemContainer:{
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10
    },
    btnComment:{
        marginTop:8,
        textAlign:"center",
        width:80,
        fontWeight:'bold',
        color:'white',
        padding:5,
        borderRadius:10,
        backgroundColor:'#00BCD4',
        alignSelf:'flex-end'
    }
});