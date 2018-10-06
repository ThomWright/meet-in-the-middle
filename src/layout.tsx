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
      <div
        style={{
          // overflowY: "scroll",
          height: "100%",
          width: 300,
        }}
      >
        {props.children.selectedLocations}
      </div>
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
      <div
        style={{
          // overflowY: "scroll",
          height: "100%",
          width: 300,
        }}
      >
        {props.children.recommendedLocations}
      </div>
    </div>
  )
}
