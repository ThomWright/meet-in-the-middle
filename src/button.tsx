import * as React from "react"
import {THEME} from "./theme"

interface Props {
  children: React.ReactNode
  onClick: () => void
}
interface State {
  active: boolean
  hover: boolean
}

export class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      active: false,
      hover: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  private handleMouseEnter() {
    this.setState(() => ({
      hover: true,
    }))
  }
  private handleMouseLeave() {
    this.setState(() => ({
      hover: false,
    }))
  }

  private handleMouseDown() {
    this.setState(() => ({
      active: true,
    }))
  }
  private handleMouseUp() {
    this.setState(() => ({
      active: false,
    }))
  }

  public render() {
    return (
      <button
        style={{
          width: "100%",
          height: 40,
          padding: 0,
          margin: 0,
          border: 1,
          borderStyle: "solid",
          borderRadius: 4,

          ...(this.state.hover
            ? {borderColor: THEME.lightGrey}
            : {borderColor: THEME.borderColor}),

          ...(this.state.active
            ? {backgroundColor: THEME.lighterGrey}
            : {backgroundColor: "white"}),
        }}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        {this.props.children}
      </button>
    )
  }
}
