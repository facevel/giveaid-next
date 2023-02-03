import {useState, useContext, createContext} from 'react';
import Confetti from "react-confetti";
const ConfettiContext = createContext(null);

export const useConfetti = () => useContext(ConfettiContext);

const ConfettiProvider = (props) => {
    const [showConfetti, setShowConfetti] = useState(false);

    const confetti = {
        start: () => setShowConfetti(true),
        stop: () => setShowConfetti(false),
    }

    return (
        <ConfettiContext.Provider value={{confetti}} {...props}>
            {
                showConfetti &&
                <div className={"fixed top-20 left-0 select-none z-[9999]"}>
                <Confetti
                    width={window.innerWidth-20}
                    height={window.innerHeight+100}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                    initialVelocityY={20}
                    onConfettiComplete={() => confetti.stop()}
                />
                </div>
            }

        {props.children}
        </ConfettiContext.Provider>
    );
}

export default ConfettiProvider;