import React from 'react';

class Blank extends React.Component {
    constructor(props) {
        super(props);

        const id = this.props.parent.props.id + "." + this.props.id

        const state = window.localStorage.getItem(id)
        this.state = JSON.parse(state) || {
            name: "Фамилия",
            count: 1
        };

        // save the state, otherwise it will be forgotten!
        if (!state) {
            window.localStorage.setItem(id, JSON.stringify(this.state))
            this.props.setSeatsLeft(this.props.parent.state.seatsLeft-1)
        }

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
            .getElementById(`session-${this.props.parent.props.id}-${this.props.id}`)
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
        .getElementById(`session-${this.props.parent.props.id}-${this.props.id}`)
        .children[ch].lastChild.value;

        // react is async. This is junk
        const stateCopy = this.state
        
        if(val) {
            if(ch === 0) {
                this.setState({name: val})
                stateCopy.name = val
            }
            else if(ch === 1 && val >= 0) {
                const iVal = parseInt(val)
                var seatsLeft = this.props.parent.state.seatsLeft + this.state.count
                if (seatsLeft - iVal > 0) {
                    seatsLeft -= iVal;
                    this.setState({count: iVal})
                    stateCopy.count = iVal
                } else {
                    this.setState({count: seatsLeft})
                    stateCopy.count = seatsLeft
                    seatsLeft = 0;
                }
                this.props.setSeatsLeft(seatsLeft)
            }
            const id = this.props.parent.props.id + "." + this.props.id
            window.localStorage.setItem(id, JSON.stringify(stateCopy))
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

        if(target.className.includes("sessionlist-client-text-field"))
            ch = 0;
        if(target.className.includes("session-ticket-count-field"))
            ch = 1;
        
        const input = document
            .getElementById(`session-${this.props.parent.props.id}-${this.props.id}`)
            .children[ch].lastChild;
        target.style.display = 'none';
        input.style.display = "inherit";
        input.focus();
    }

    onDelete = () => {
        const p = this.props.parent;

        this.props.setSeatsLeft(p.state.seatsLeft + this.state.count)

        let blanks = p.state.blanks.filter((blank) => blank.id !== this.props.id);

        p.setState({
            blanks: blanks,
        });
    }

    render() {
        const myId = `session-${this.props.parent.props.id}-${this.props.id}`;
        return (
            <li class="sessionlist-client" id={myId}>
                <div class="sessionlist-client-text sessionlist-client-clickable">
                    <span class="sessionlist-client-text-field" onClick={this.onEditField}>
                        {this.state.name}
                    </span>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        class="client-info client-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                    />
                </div>
                <span class="session-ticket-count sessionlist-client-clickable">
                    <span class="session-ticket-count-field" onClick={this.onEditField}>
                        {this.state.count}
                    </span>
                    <input
                        type="number"
                        placeholder=""
                        class="session-ticket-count-input client-field"
                        onKeyDown={this.onInputKeyDown}
                        onBlur={this.onApplyField}
                    />
                </span>
                <div class="sessionlist-client-controls">
                  <button type="button" class="sessionlist-client-controls-button del-button" onClick={this.onDelete}></button>
                </div>
            </li>
        );
    }
}


export default Blank;