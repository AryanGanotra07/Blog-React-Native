import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';

const IndexScreen =({navigation}) => {
    const {state, addBlogPost, deleteBlogPost} = useContext(Context);

    return (
        <View>
            <Text>Index Screen</Text>
            <Button
            onPress={()=>{
                addBlogPost();
            }}
            title="Add Post"/>
            <FlatList
            data={state}
            keyExtractor={(blogPost)=>{blogPost.title}}
            renderItem={({item})=>{
                return <TouchableOpacity
                onPress={()=> navigation.navigate('Show',{id: item.id})}
                >
                <View style={styles.row}>
                    <Text style={styles.title}>{item.title}-{item.id}</Text>
                    <TouchableOpacity onPress={()=> deleteBlogPost(item.id)}>
                    <Feather style={styles.icon} name="trash"/>
                    </TouchableOpacity>

                    
                    </View>
                    </TouchableOpacity>
            }}
            >

            </FlatList>
        </View>
        
    );
};

const styles = StyleSheet.create({

    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        borderTopWidth:1,
        borderColor:'gray',
        padding:10
    },
    title: {
        fontSize:18
    },
    icon:{
        fontSize:20
    }

});

export default IndexScreen;