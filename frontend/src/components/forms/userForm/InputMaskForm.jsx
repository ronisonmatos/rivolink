import React, { Component } from "react";
import InputMask from 'react-input-mask';

class InputMaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                type: "",
                value: "",
                placeholder: "",
                label: "",
                id: "",
                mask: ""
            },
            showError: false
        };
    }

    updateField(event) {
        const { name, value } = event.target;
        const user = { ...this.state.user, [name]: value };

        this.setState({
            user,
            showErrorPhoneNumber: InputMaskForm.isEmptyInput(user.value)
        });
    }

    static isEmptyInput(currentInput) {
        return currentInput === '';
    }

    render() {
        return (
            <div className="col-12 col-md-3">
                <div className="form-group">
                    <label>{this.props.label}:</label>
                    <InputMask
                        className="form-control form-control-sm"
                        mask={this.props.mask}
                        value={this.props.value}
                        id={this.props.name}
                        name={this.props.name}
                        type={this.props.type}
                        onChange={(e) => this.updateField(e)}
                        placeholder={this.props.placeholder}
                    />
                    {this.state.showErrorPhoneNumber && <p className="text-danger">Campo obrigatório</p>}
                </div>
            </div>
        )
    }

}

export default InputMaskForm;