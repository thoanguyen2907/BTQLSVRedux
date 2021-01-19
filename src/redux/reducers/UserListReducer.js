
import * as types from '../types/UserListTypes';
import Swal from 'sweetalert2';
const initialState = {
    users: [
        {
            id: 5, account: '324dfasd', email: "thoanguyen@gmail.com",
            password: "324a342", name: "Thoa Nguyen", phone: "2e343242", value: "customer"
        },
        {
            id: 4, account: 'fieqr3232', email: "trucnguyen@gmail.com",
            password: "323dd22", name: "Truc Nguyen", phone: "32355222", value: "customer"
        },

        {
            id: 3, account: '44577555', email: "tamnguyen@gmail.com",
            password: "435366633", name: "Tam Nguyen", phone: "6633366", value: "customer"
        }
    ],
    sort: "desc", 
    userEdit: {
        id: -1, account: '', email: "", password: "", name: "", phone: "", value: ""
    }

}

export default (state = initialState, action) => {
    let updateUsers;
    let index = -1;
    switch (action.type) {
        case types.add_user :
            let { newUser } = action;
            updateUsers = [...state.users];
            index = updateUsers.findIndex((user => user.account === newUser.account));
            if (index !== -1) {
                Swal.fire('User ID exists already !! ')
            } else {
                updateUsers.push(newUser);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Add New User Successfully ! ',
                  })
            }
            state.users = updateUsers;
            return { ...state }
        case types.delete_user:
            updateUsers = [...state.users];
            index = updateUsers.findIndex((user => user.id === action.userID));
            if(index !== -1){
                updateUsers.splice(index, 1);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Delete Successfully ! ',
                  });
            }
            state.users = updateUsers;
            return { ...state }
        case types.edit_user:
            return { ...state, userEdit: action.userEdit };
        case types.update_user:
            state.userEdit = { ...state.userEdit, userEdit: action.userEdit };
            updateUsers = [...state.users];
            index = updateUsers.findIndex(user => user.id === state.userEdit.id);
            if (index !== -1) {
                updateUsers[index] = action.userEdit;
            }
            state.users = updateUsers;
            return { ...state }; 
        case types.sort_stt: 
        let {sort, column} = action; 
        sort = sort === "desc"? "asc": "desc"; 
        state.sort = sort; ; 
          updateUsers = [...state.users];
          if(state.sort === "desc"){
            updateUsers =  updateUsers.sort((a,b)=>{
                if(a[column] > b[column]) {
                    return 1; 
                } else if (b[column] > a[column]){
                    return -1; 
                } else return 0; 
             }); 
          } else {
            updateUsers =  updateUsers.sort((a,b)=>{
                if(a[column] > b[column]) {
                    return -1; 
                } else if (b[column] > a[column]){
                    return 1; 
                } else return 0; 
             }); 
          }
         state.users = updateUsers; 
      
        return { ...state }; 
        default:
            break;
    }
    return { ...state }

}
