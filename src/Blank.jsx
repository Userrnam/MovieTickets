import React from 'react';

class Blank extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Фамилия",
            count: 0
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEditField = this.onEditField.bind(this);
        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.onEditField = this.onEditField.bind(this);
    }

    cleanInput = ({ target }) => {
        let ch = -1;
        
        if(target.className.includes("client-info"))
            ch = 0;
        if(target.className.includes("session-ticket-count-input"))
            ch = 1;

        const elem = document
            .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
            .children[ch];
        elem.lastChild.style.display = "none";
        elem.lastChild.value = "";

        elem.firstChild.style.display = "inherit";
    }

    onApplyField = ({ target }) => {
        let ch = -1;

        if(target.className.includes("client-info"))
            ch = 0;
        if(target.className.includes("session-ticket-count-input"))
            ch = 1;

        const val = document
        .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
        .children[ch].lastChild.value;
        
        if(val)
        {
            if(ch === 0)
                this.setState({name: val})
            else if(ch === 1 && val >= 0) {
                const iVal = parseInt(val)
                this.props.parent.state.seatsLeft += this.state.count
                if (this.props.parent.state.seatsLeft - iVal > 0) {
                    this.props.parent.state.seatsLeft -= iVal;
                    this.setState({count: iVal})
                } else {
                    this.setState({count: this.props.parent.state.seatsLeft})
                    this.props.parent.state.seatsLeft = 0;
                }
                this.props.setSeatsLeft(this.props.parent.state.seatsLeft)
            }
        }
        this.cleanInput({ target });
    }

    onInputKeyDown = ({ key, target }) => {
        if (key === "Enter") {
            this.onApplyField({ target });
        }
        if (key === "Escape") {
            this.cleanInput({ target });
        }
    }

    onEditField = ({target}) => {
        let ch = -1;

        if(target.className.includes("sb-supplylist-supply-text-field"))
            ch = 0;
        if(target.className.includes("session-ticket-count-field"))
            ch = 1;
        
        const input = document
            .getElementById(`supply-${this.props.parent.props.id}-${this.props.id}`)
            .children[ch].lastChild;
        target.style.display = 'none';
        input.style.display = "inherit";
        input.focus();
    }

    onDelete = () => {
        const p = this.props.parent;
        let blanks = p.state.blanks.filter((blank) => blank.id !== this.props.id);
        let bCount = 0;
        blanks.forEach((blank) => {
            blank.id = bCount;
            bCount += 1;
        })

        p.setState({
            blanks: blanks,
            blankCount: bCount
        }); 
            
    }

    render() {
        const myId = `supply-${this.props.parent.props.id}-${this.props.id}`;
        return (
            <li class="sb-supplylist-supply" id={myId}>
                <div class="sb-supplylist-supply-text sb-supplylist-supply-clickable">
                    <span class="sb-supplylist-supply-text-field" onClick={this.onEditField}>
                        {this.state.name}
                    </span>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        class="client-info sb-supply-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                        // maxLength="10"
                    />
                </div>
                <span class="session-ticket-count sb-supplylist-supply-clickable">
                    <span class="session-ticket-count-field" onClick={this.onEditField}>
                        {this.state.count}
                    </span>
                    <input
                        type="number"
                        placeholder=""
                        class="session-ticket-count-input sb-supply-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                        // maxLength="4"
                    />
                </span>
                <div class="sb-supplylist-supply-controls">
                  <button type="button" class="sb-supplylist-supply-controls-button del-button" onClick={this.onDelete}></button>
                </div>
            </li>
        );
    }
}


export default Blank;