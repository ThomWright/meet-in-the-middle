import {THEME} from "./theme"

interface Props {
  children: React.ReactNode
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  highlight?: boolean
}
export function Card(props: Props) {
  return (
    <div
      style={{
        padding: THEME.paddingBase,
        borderWidth: 1,
        borderColor: props.highlight ? THEME.highlightColor : THEME.borderColor,
        borderStyle: "solid",
        borderRadius: 4,
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </div>
  )
}
