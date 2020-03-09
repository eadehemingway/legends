# Legends for vizzuality

This project uses create react app with typescript and D3 to build four different types of legend:

- basic
- choropleth
- gradient
- timeline

### features

- the gradient legend has the ability to add a text note, which is stored in local storage and persists if you refresh the page
- the legends can be reordered using drag and drop both on desktop and mobile (and still works if you resize the screen without having to refresh the page)
- the window size can be resized and the content will resize accordingly without having to refresh the page
- each icon has a tooltip that is positioned differently depending on the location of the icon
- the collapse button makes the visual legend slide in / out of view with a smooth transition
- the info icon opens a responsive modal
- the timeline has a minimum and maximum handle that are draggable that use a smooth transition and the speed, step and label format specified by the data.
- I also added labels to the timeline handles so that the user could see what values the handles were on.

### decisions

I chose to style my components using styled components as I find them easy to use as a project scales.
I have tried to make my components be as small as possible, as I think the smaller a component the easier it is to identify areas that can be refactored.
I have used react hooks so that I can avoid having to switch between functional and class based components. I chose to use the native DOMParser to parse the html received from the api to avoid installing unnecessary packages.
I thought a lot about how to organise the code in the timeline file, as I was aware a lot was happening in the second useEffect. I played around with separating the functions out using the useCallback hook but I found it harder to read this way so I left it all inside the one useEffect.
