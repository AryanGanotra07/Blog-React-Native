
import createDataContext from '../context/createDataContext';
import jsonserver from '../api/jsonserver';



const blogReducer = (state, action) => {
    switch(action.type){
        case 'add_blogpost':
            return [...state, {id: Math.floor(Math.random()*99999),title: action.payload.title, content:action.payload.content}];
        case 'delete_blogpost':
            return state.filter((blogPost)=>blogPost.id!==action.payload);
        case 'edit_blogpost':
            return state.map((blogPost)=> {
                if(blogPost.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return blogPost
                }
            });
        case 'get_blogpost':
            return action.payload;


        default:
            return state;
    }

};

const getBlogPosts = dispatch => {
    return async () => {
       const response = await jsonserver.get('/blogposts');
       dispatch({type:'get_blogpost', payload:response.data})
    };
};

const addBlogPost = (dispatch ) => {
    return async (title, content, callback)=> {
        await jsonserver.post('/blogposts',{title, content});
   // dispatch({type: 'add_blogpost',payload: {title, content}});
   if(callback){
    callback();
   }
    }
};

const deleteBlogPost = dispatch => {
    return (id)=> {
        dispatch({type:'delete_blogpost', payload:id})
    };
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'edit_blogpost',
         payload: {id: id, title: title, content: content}});
         callback();
    };
}

export const {Context, Provider} = createDataContext(
    blogReducer,
     {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
     []
     );