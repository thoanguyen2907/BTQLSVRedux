import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { addUserAction, updateUserAction } from '../redux/actions/UserListActions';
import { connect } from 'react-redux';
class Form extends Component {
    state = {
        values: {
            account: '',
            name: '',
            phone: '',
            email: '',
            password: '',
            value: 'customer'
        },
        errors: {
            account: '',
            name: '',
            phone: '',
            email: '',
            password: '',
            value: ''
        }
    }
    handleChange = (event) => {
        let { name, value, type } = event.target;
        let newValue = { ...this.state.values, [name]: value };
        let newErrors = { ...this.state.errors };
        if (value.trim() === "") {
            newErrors[name] = name + " is required";
        } else {
            newErrors[name] = "";
        }
        if (type === "email") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(value).toLowerCase())) {
                newErrors[name] = name + " is invalid"
            } else {
                newErrors[name] = "";
            }
        }
        if (name === "phone") {
            let regexNumber = /^[0-9]+$/;
            if (!regexNumber.test(value) || value.trim().length < 7 || value.trim().length > 12) {
                newErrors[name] = name + " must be only number and range from 7 to 12 letters";
            } else {
                newErrors[name] = "";
            }

        }
        if (name === "name") {
            let regexAllLetter = /^[A-Za-z ]+$/;
            if (!regexAllLetter.test(value)) {
                newErrors[name] = name + " must be only alphabet letters";
            } else {
                newErrors[name] = "";
            }
        }
        this.setState({
            values: newValue,
            errors: newErrors
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        let { values, errors } = this.state;
        let valid = true;
        let profileContent = "";
        let errorsContent = "";
        for (let key in values) {
            if (values[key] === "") {
                valid = false
            }
            profileContent += `
            <p className = "text-left"> <b className="text-danger">  ${key} </b> ${values[key]}   </p>
            `
        }
        for (let key in errors) {
            if (errors[key] !== "") {
                errorsContent += `<p className = "text-left"> <b>  ${key} is invalid </b> </p>`;
                valid = false;
            }

        }
        if (!valid) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Dữ liệu không hợp lệ !!!',
                html: errorsContent
            })
            return false;
        }
        else {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                html: profileContent,
                title: 'Dữ liệu hợp lệ',
            })
        }
        let newUser = {
            id: Date.now(),
            account: values.account,
            email: values.email,
            password: values.password,
            name: values.name,
            phone: values.phone,
            value: values.value
        }

        this.props.addUser(newUser);  
    }
    componentDidUpdate(prevProps, preState){
        let {userEdit} = this.props; 
        if(prevProps.userEdit.id !== this.props.userEdit.id){
            this.setState({
                values: userEdit
            })
        }
    }
    onUpdateUser = (userEdit) =>{
       this.props.onUpdateUser(userEdit); 

    }
    render() { 
        return (
            <div>
                <div className="bg-dark text-light px-4 py-2">
                    <div className="form__title">
                        <h3>Form đăng ký</h3>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className="px-4 py-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Tài khoản</label>
                                <input type="text" name="account" value={this.state.values.account} onChange={this.handleChange} className="form-control" placeholder="FI 038 5022 " />
                                <span className="text text-danger">{this.state.errors.account}</span>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" value={this.state.values.email} onChange={this.handleChange} className="form-control" placeholder="thoanguyen@gmail.com" />
                                <span className="text text-danger">{this.state.errors.email}</span>
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input type="password" name="password" className="form-control" value={this.state.values.password}
                                    onChange={this.handleChange} />
                                <span className="text text-danger">{this.state.errors.password}</span>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input type="text" name="name" value={this.state.values.name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Nguyen Thanh Thoa" />
                                <span className="text text-danger">{this.state.errors.name}</span>
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input type="text" name="phone"
                                    onChange={this.handleChange}
                                    value={this.state.values.phone} className="form-control" placeholder="0937 733 662" />
                                <span className="text text-danger">{this.state.errors.phone}</span>
                            </div>
                            <div className="form-group">
                                <label>Mã loại người dùng</label>
                                <select value={this.state.values.value} name="value" className="form-control" onChange={this.handleChange}>
                                    <option defaultValue value="customer" name="customer" >Khách Hàng</option>
                                    <option value="business" name="business">Doanh Nghiệp</option>
                                </select>
                                <span className="text text-danger">{this.state.errors.value}</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-success mr-2" type="submit">Đăng ký</button>
                    <button onClick={()=>{this.onUpdateUser(this.state.values)}} className="btn btn-primary" type="button">Cập nhật</button>
                </form>
            </div>

        )
    }
}
const mapStateToProps = (state) =>{
    return {
        userEdit: state.UserListReducer.userEdit
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addUser: (newUser) => {
            dispatch(addUserAction(newUser))

        },
        onUpdateUser: (userEdit) =>{
            dispatch(updateUserAction(userEdit))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Form); 
