import { animateCSS } from "../services/util.service.js";
const { useRef } = React

export function Home() {

    const h1Ref = useRef()

    function onActivate() {
        animateCSS(h1Ref.current, 'rubberBand')
    }

    return (
        <article>
            <h1 ref={h1Ref} onClick={onActivate}>Hi</h1>
        </article>
    )
}
