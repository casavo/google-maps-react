import { PropsWithChildren, useMemo } from "react"
import { createPortal } from "react-dom"
import { createOverlay } from "./createOverlay"

type Props = {
  coordinates: google.maps.LatLng | google.maps.LatLngLiteral
  pane?: keyof google.maps.MapPanes
}

export const Overlay: React.FC<PropsWithChildren<Props>> = ({ children, coordinates, pane = "floatPane" }) => {
  const container = useMemo(() => {
    const div = document.createElement("div")
    div.style.position = "absolute"
    return div
  }, [])

  const overlay = useMemo(() => {
    return createOverlay({ container, coordinates, pane })
  }, [container, pane, coordinates])

  return createPortal(children, container)
}
