import React, { Component } from 'react'
import {connect} from 'react-redux'; 
import {deleteUserAction,editUserAction} from '../redux/actions/UserListActions'; 

 class DanhSach extends Component {

    onDelete = (userID) =>{
        this.props.onDelete(userID)
    }
    editUser = (user) =>{
        this.props.editUser(user); 
    }
    
     renderDanhSach = () =>{
       return this.props.danhSach.map((user, index)=>{
            return <tr key={index}>
            <th scope="row">{user.id}</th>
            <td>{user.account}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.value}</td>
            <td> <button onClick={()=>{this.editUser(user)}} className="btn btn-primary">Chỉnh sửa</button></td>
            <td> <button onClick={()=>{this.onDelete(user.id)}} className="btn btn-danger">Xoá</button></td>
        </tr>
        })
     }
    render() {
        
        return (
            <div className="mt-4">
            <div className="bg-dark text-light px-4 py-2">
                <div className="form__title">
                    <h3>Danh sách người dùng</h3>
                </div>
                </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tài khoản</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Loại người dùng</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.renderDanhSach()}

                        </tbody>
                    </table>
                </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        danhSach: state.UserListReducer.users,
        userEdit: state.UserListReducer.userEdit
    }
}
const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        onDelete: (userID) =>{
            dispatch(deleteUserAction(userID)); 
        },
        editUser: (userEdit) =>{
            dispatch(editUserAction(userEdit)); 
        }
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach); 
