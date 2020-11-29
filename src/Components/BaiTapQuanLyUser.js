import React, { Component } from 'react';
import DanhSach from './DanhSach';
import Form from './Form';
class BaiTapQuanLyUser extends Component {

    render() {
        return (
            <div className="border py-0 px-0">
                <Form />
                <DanhSach />
            </div>
        );
    }
}

export default BaiTapQuanLyUser;
