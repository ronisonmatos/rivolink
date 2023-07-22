import React, { Component } from "react";

class ComboBoxForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                value: ""
            },
            showError: false
        };
    }

    updateField(event) {
        const { name, value } = event.target;
        const user = { ...this.state.user, [name]: value };
    
        this.setState({
          user,
          showError: ComboBoxForm.isEmptyInput(user.name),
        });
      }

    render() {
        return (
            <div className="col-12 col-md-3">
                <div className="form-group">
                    <label> Profissional Responsável:</label>
                    <select value={this.props.value}
                        className="form-control form-control-sm"
                        name={this.props.name}
                        onChange={(e) => this.updateField(e)}>
                        <option value="">-- Select --</option>
                        <option value="option1">Fulando da Silva Sauro</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>
            </div>
        )
    }

}

export default ComboBoxForm;