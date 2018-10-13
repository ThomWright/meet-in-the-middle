import {THEME} from "./theme"

interface Props {
  children: React.ReactNode
}
export function Card(props: Props) {
  return (
    <div
      style={{
        padding: THEME.paddingBase,
        borderWidth: 1,
        borderColor: THEME.borderColor,
        borderStyle: "solid",
        borderRadius: 4,
      }}
    >
      {props.children}
    </div>
  )
}
