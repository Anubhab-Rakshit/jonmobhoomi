import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register plugins once — safe to call multiple times
gsap.registerPlugin(ScrollTrigger, TextPlugin)

export { gsap, ScrollTrigger }
export default gsap
