import {add_user, delete_user, check_task, edit_user, update_user} from '../types/UserListTypes'; 
export const addUserAction = (newUser) => ({
    type: add_user,
    newUser
})
export const deleteUserAction = (userID) => ({
    type: delete_user,
    userID
})

export const checkTaskAction = (taskID) => ({
    type: check_task,
    taskID
}); 
export const editUserAction = (userEdit) => ({
    type: edit_user,
    userEdit
});
export const updateUserAction = (userEdit) => ({
    type: update_user,
    userEdit
})



