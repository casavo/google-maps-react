type Props = {
  container: HTMLElement
  coordinates: google.maps.LatLng
  pane: keyof google.maps.MapPanes
}

export const createOverlay = ({ container, coordinates, pane }: Props) => {
  class Overlay extends google.maps.OverlayView {
    private container: HTMLElement
    private coordinates: google.maps.LatLng
    private pane: keyof google.maps.MapPanes

    constructor(props: Props) {
      super()
      this.container = props.container
      this.coordinates = props.coordinates
      this.pane = props.pane
    }

    onAdd(): void {
      const panes = this.getPanes()
      if (panes) {
        const pane = panes[this.pane]
        pane.classList.add("google-maps-marker-overlay")
        pane.append(this.container)
      }
    }

    draw(): void {
      const projection = this.getProjection()
      const coordinates = projection.fromLatLngToDivPixel(this.coordinates)
      this.container.style.transform = `translate(${coordinates?.x}px, ${coordinates?.y}px)`
    }

    onRemove(): void {
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container)
      }
    }
  }

  return new Overlay({ container, coordinates, pane })
}
