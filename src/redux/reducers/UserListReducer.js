
import * as types from '../types/UserListTypes';
import Swal from 'sweetalert2';
const initialState = {
    users: [
        {
            id: 1, account: '324dfasd', email: "thoanguyen@gmail.com",
            password: "324a342", name: "Thoa Nguyen", phone: "2e343242", value: "customer"
        },

    ],
    userEdit: {
        id: -1, account: '', email: "", password: "", name: "", phone: "", value: ""
    }

}

export default (state = initialState, action) => {
    let updateUsers;
    let index = -1;
    switch (action.type) {
        case "add_user":
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
        case "delete_user":
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
        case "edit_user":
            return { ...state, userEdit: action.userEdit };
        case "update_user":
            state.userEdit = { ...state.userEdit, userEdit: action.userEdit };

            updateUsers = [...state.users];
            index = updateUsers.findIndex(user => user.id === state.userEdit.id);
            if (index !== -1) {
                updateUsers[index] = action.userEdit;
            }
            state.users = updateUsers;
            return { ...state }; 
  
        default:
            break;
    }
    return { ...state }

}
