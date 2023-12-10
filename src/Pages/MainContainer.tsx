import { FpsView } from "react-fps"
import {Container} from "../components"
import { motion } from "framer-motion"

const MainContainer = () => {

  return (
    <div className="main-container w-full h-full flex relative items-center justify-center">
             <FpsView />
       <div className=" w-[75%] h-[75%]">
        <p>Container</p>
       <Container
        //   isVirtualizationEnabled={isVirtualizationEnabled}
          rowHeight={60}
        >
          {new Array(16000)
            .fill({})
            .map((_, index) => ({ id: index }))
            .map((it) => (
              <motion.li
                animate={{
                  scale: [0.89, 1]
                }}
                className="text-white w-full h-full row bg-green-950 rounded-[5px] flex p-5"
                key={it.id}
              >
                {it.id}
              </motion.li>
            ))}
        </Container>
       </div>
    </div>
  )
}

export default MainContainer