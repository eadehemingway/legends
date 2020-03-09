# Legends for vizzuality

This project uses create react app with typescript and D3 to build four different types of legend:

- basic
- choropleth
- gradient
- timeline

### features

- the gradient legend has the ability to add text note, which is stored in local storage and persists if you refresh the page
- the legends can be reordered using drag and drop
- the window size can be resized and the content will resize accordingly without having to refresh the page
- each icon has a tooltip that is positioned differently depending on the location of the icon
- the collapse button makes the visual legend slide in / out of view with a smooth transition
- the info icon opens a responsive modal
- the timeline has a minimum and maximum handle that are draggable that use a smooth transition at the speed, step and label format specified by the data

### decisions

I have recently been introduced to the merits of a flat file structure which leads to long file names (as each file name is prefaced with its parent component) but is extremely user friendly, so I chose to implement that here. I chose to style my components using styled components as I find them easy to use as a project scales. I have tried to make my components be as small as possible, as I think the smaller a component the easier it is to identify areas that can be refactored. I have used react hooks so that I can avoid having to switch between functional and class based components. I chose to use the native DOMParser to parse the html received from the api.

i decided to add extra labels on the timeline because it felt like information that the user would need to have.

### challenges

The most challenging part of this project was creating the timeline legend, and making it draggable.
Making react drag and drop work both on mobile and desktop (and work when screen resized without refreshing the page). solved by using touchBackend (originally could only get it to work for mobile, then added the options param to make it work for desktop too...)

- TIMELINE DRAG sticky ON MOBILE
