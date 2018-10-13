import * as React from "react"
import {THEME} from "./theme"

interface LayoutProps {
  children: {
    selectedLocations: React.ReactNode
    map: React.ReactNode
    recommendedLocations: React.ReactNode
  }
}
export function Layout(props: LayoutProps) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: THEME.paddingBase * 4,
          borderBottomColor: THEME.borderColor,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
      >
        <Header />
      </div>
      <div
        style={{
          flexGrow: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Column>{props.children.selectedLocations}</Column>
        <Column>{props.children.recommendedLocations}</Column>
        <div
          style={{
            flexGrow: 1,
            padding: THEME.paddingBase,
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            {props.children.map}
          </div>
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div
      style={{
        fontSize: 20,
      }}
    >
      Meet in the Middle
    </div>
  )
}

function Column(props: {children: React.ReactNode}) {
  return (
    <div
      style={{
        height: "100%",
        width: 300,
        padding: THEME.paddingBase,
        overflowY: "hidden",
      }}
    >
      {props.children}
    </div>
  )
}
