import * as React from "react"

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
        flexDirection: "row",
      }}
    >
      <Column>{props.children.selectedLocations}</Column>
      <div
        style={{
          flexGrow: 1,
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
      <Column>{props.children.recommendedLocations}</Column>
    </div>
  )
}

function Column(props: {children: React.ReactNode}) {
  return (
    <div
      style={{
        height: "100%",
        width: 300,
        padding: 8,
        overflowY: "hidden",
      }}
    >
      {props.children}
    </div>
  )
}
