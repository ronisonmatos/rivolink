import React, { Component } from "react";

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
            },
            showError: false
        };
    }

    updateField(event) {
        const { name, value } = event.target;
        const user = { ...this.state.user, [name]: value };

        this.setState({
            user,
            showError: InputForm.isEmptyInput(user.name),
        });
    }

    static isEmptyInput(currentInput) {
        return currentInput === '';
    }


    render() {
        return (
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label>{this.props.label}:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        name={this.props.name}
                        value={this.props.value}
                        onChange={(e) => this.updateField(e)}
                        placeholder={this.props.placeholderInput}
                    />
                    {this.state.showError && <p className="text-danger">Campo obrigatório</p>}
                </div>
            </div>
        );
    }

}

export default InputForm;