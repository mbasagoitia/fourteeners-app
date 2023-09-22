import backgroundImage from "../images/mountain-bg.svg";
import pineTree from "../images/pine-tree.svg";
import pineTree2 from "../images/pine-tree-2.svg";

function Home () {
    return (
        <>
        <div className="background">
            <img src={backgroundImage} alt="mountain background" id="mountain-bg" />
        </div>
        <div className="overlay">
            <img src={pineTree2} alt="pine tree" />
            <img src={pineTree2} alt="pine tree" />
            <img src={pineTree2} alt="pine tree" />
            <img src={pineTree} alt="pine tree" />
            <img src={pineTree2} alt="pine tree" />
        </div>
        </>
    )
}

export default Home;