// Removes the preload class from the __gatsby element once the page loads
// This is to get rid of any preload animation flashes
// References:
// - https://www.gatsbyjs.com/docs/custom-html/
// https://curtistimson.co.uk/post/gatsbyjs/add-body-class-gatsbyjs-fouc/
export const onClientEntry = () => {
  window.addEventListener('load', () => {
    document.querySelector("#___gatsby").classList.remove("preload");
  });
}