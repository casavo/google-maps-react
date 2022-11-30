import { Children, isValidElement, PropsWithChildren, useMemo } from "react"
import { Overlay } from "./Overlay"

type Props = {}

export const Marker: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const marker = useMemo(() => {
    return Children.map(children, (child) => {
      if (isValidElement(child)) {
        const latLng = { lat: child.props.lat, lng: child.props.lng }
        return <Overlay coordinates={latLng}>{child}</Overlay>
      }
    })
  }, [children])

  return <div>{marker}</div>
}
